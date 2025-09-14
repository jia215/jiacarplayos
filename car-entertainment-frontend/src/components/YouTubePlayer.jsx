import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Play, X, ExternalLink } from 'lucide-react';

const YouTubePlayer = ({ isOpen, onClose }) => {
  const [videoUrl, setVideoUrl] = useState('');
  const [videoId, setVideoId] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  // 从YouTube URL中提取视频ID
  const extractVideoId = (url) => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handlePlayVideo = () => {
    const id = extractVideoId(videoUrl);
    if (id) {
      setVideoId(id);
      setIsPlaying(true);
    } else {
      alert('请输入有效的YouTube视频链接');
    }
  };

  const handleStop = () => {
    setIsPlaying(false);
    setVideoId('');
  };

  const openInNewTab = () => {
    if (videoUrl) {
      window.open(videoUrl, '_blank');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-4xl mx-4 max-h-[90vh] overflow-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-bold">YouTube 播放器</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder="输入YouTube视频链接..."
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handlePlayVideo} disabled={!videoUrl}>
              <Play className="h-4 w-4 mr-2" />
              播放
            </Button>
            <Button variant="outline" onClick={openInNewTab} disabled={!videoUrl}>
              <ExternalLink className="h-4 w-4 mr-2" />
              新窗口打开
            </Button>
          </div>

          {isPlaying && videoId && (
            <div className="space-y-4">
              <div className="aspect-video w-full">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg"
                ></iframe>
              </div>
              <div className="flex justify-center">
                <Button variant="outline" onClick={handleStop}>
                  停止播放
                </Button>
              </div>
            </div>
          )}

          <div className="text-sm text-gray-600 space-y-2">
            <p><strong>使用说明：</strong></p>
            <ul className="list-disc list-inside space-y-1">
              <li>复制YouTube视频链接并粘贴到输入框中</li>
              <li>点击"播放"按钮在当前页面播放视频</li>
              <li>点击"新窗口打开"在新标签页中打开YouTube</li>
              <li>支持标准YouTube链接格式（youtube.com 和 youtu.be）</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default YouTubePlayer;

