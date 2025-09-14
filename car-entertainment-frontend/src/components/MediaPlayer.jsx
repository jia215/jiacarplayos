import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Slider } from '@/components/ui/slider.jsx'
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Volume2, 
  VolumeX,
  Maximize,
  Minimize
} from 'lucide-react'

const MediaPlayer = ({ content, onClose, isPlaying, onTogglePlay }) => {
  if (!content) return null;

  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const mediaRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const media = mediaRef.current
    if (!media) return

    const updateTime = () => setCurrentTime(media.currentTime)
    const updateDuration = () => setDuration(media.duration)
    const handleEnded = () => setIsPlaying(false)

    media.addEventListener('timeupdate', updateTime)
    media.addEventListener('loadedmetadata', updateDuration)
    media.addEventListener('ended', handleEnded)

    return () => {
      media.removeEventListener('timeupdate', updateTime)
      media.removeEventListener('loadedmetadata', updateDuration)
      media.removeEventListener('ended', handleEnded)
    }
  }, [content])

  useEffect(() => {
    const media = mediaRef.current;
    if (!media) return;

    if (isPlaying) {
      media.play();
    } else {
      media.pause();
    }
  }, [isPlaying]);

  const handleTogglePlayPause = () => {
    onTogglePlay();
  }

  const handleSeek = (value) => {
    const media = mediaRef.current
    if (!media) return

    const newTime = (value[0] / 100) * duration
    media.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handleVolumeChange = (value) => {
    const media = mediaRef.current
    const newVolume = value[0] / 100
    setVolume(newVolume)
    if (media) {
      media.volume = newVolume
    }
    setIsMuted(newVolume === 0)
  }

  const toggleMute = () => {
    const media = mediaRef.current
    if (!media) return

    if (isMuted) {
      media.volume = volume
      setIsMuted(false)
    } else {
      media.volume = 0
      setIsMuted(true)
    }
  }

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
    setIsFullscreen(!isFullscreen)
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 bg-black z-50 flex flex-col ${isFullscreen ? 'p-0' : 'p-4'}`}
    >
      {/* 关闭按钮 */}
      <div className="absolute top-4 right-4 z-10">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onClose}
          className="text-white hover:bg-white/20"
        >
          ✕
        </Button>
      </div>

      {/* 媒体内容区域 */}
      <div className="flex-1 flex items-center justify-center">
        {content.content_type === 'video' ? (
          <video
            ref={mediaRef}
            className="max-w-full max-h-full"
            controls={false}
            poster={content.thumbnail_url}
          >
            <source src={`http://localhost:5002/api/stream/${content.id}`} type="video/mp4" />
            {t("browserNotSupportVideo")}

          </video>
        ) : (
          <div className="text-center text-white">
            <audio
              ref={mediaRef}
              controls={false}
            >
              <source src={`http://localhost:5002/api/stream/${content.id}`} type="audio/mpeg" />
              {t("browserNotSupportAudio")}
            </audio>
            <div className="w-64 h-64 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-6">
              <div className="text-6xl">🎵</div>
            </div>
            <h2 className="text-2xl font-bold mb-2">{content.title}</h2>
            <p className="text-gray-300">{content.artist}</p>
          </div>
        )}
      </div>

      {/* 控制栏 */}
      <Card className="bg-black/80 border-gray-700">
        <CardContent className="p-4">
          {/* 进度条 */}
          <div className="mb-4">
            <Slider
              value={[progressPercentage]}
              onValueChange={handleSeek}
              max={100}
              step={0.1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-400 mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* 控制按钮 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <h3 className="text-white font-medium">{content.title}</h3>
              <span className="text-gray-400">-</span>
              <span className="text-gray-400">{content.artist}</span>
            </div>

            <div className="flex items-center space-x-4">
              <Button size="sm" variant="ghost" className="text-white">
                <SkipBack className="h-4 w-4" />
              </Button>
              
              <Button size="sm" onClick={togglePlayPause} className="bg-white text-black hover:bg-gray-200">
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              
              <Button size="sm" variant="ghost" className="text-white">
                <SkipForward className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <Button size="sm" variant="ghost" onClick={toggleMute} className="text-white">
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
              
              <div className="w-20">
                <Slider
                  value={[isMuted ? 0 : volume * 100]}
                  onValueChange={handleVolumeChange}
                  max={100}
                  step={1}
                />
              </div>

              {content.content_type === 'video' && (
                <Button size="sm" variant="ghost" onClick={toggleFullscreen} className="text-white">
                  {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default MediaPlayer

