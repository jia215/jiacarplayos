import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import MediaPlayer from './components/MediaPlayer.jsx'
import YouTubePlayer from './components/YouTubePlayer.jsx'
import MinecraftGuide from './components/MinecraftGuide.jsx'
import AddContentModal from './components/AddContentModal.jsx'
import MoreFeaturesModal from './components/MoreFeaturesModal.jsx'
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Volume2, 
  Search, 
  Music, 
  Video, 
  List,
  Home,
  Settings,
  User,
  Heart,
  Shuffle,
  Repeat,
  Youtube,
  Gamepad2,
  Plus
} from 'lucide-react'
import './App.css'
import './styles/ios26-theme.css'

// 模拟API调用
const API_BASE = 'http://localhost:5002/api'

function App() {
  const [currentView, setCurrentView] = useState('home')
  const [contents, setContents] = useState([])
  const [playlists, setPlaylists] = useState([])
  const [currentPlaying, setCurrentPlaying] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showPlayer, setShowPlayer] = useState(false)
  const [showYouTubePlayer, setShowYouTubePlayer] = useState(false)
  const [showMinecraftGuide, setShowMinecraftGuide] = useState(false)
  const [showAddContentModal, setShowAddContentModal] = useState(false)
  const [showMoreFeatures, setShowMoreFeatures] = useState(false)

  // 获取内容列表
  useEffect(() => {
    fetchContents()
    fetchPlaylists()
  }, [])

  const fetchContents = async () => {
    try {
      const response = await fetch(`${API_BASE}/contents`)
      const data = await response.json()
      if (data.success) {
        setContents(data.data.contents)
      }
    } catch (error) {
      console.error('获取内容失败:', error)
    }
  }

  const fetchPlaylists = async () => {
    try {
      const response = await fetch(`${API_BASE}/playlists`)
      const data = await response.json()
      if (data.success) {
        setPlaylists(data.data.playlists)
      }
    } catch (error) {
      console.error('获取播放列表失败:', error)
    }
  }

  const playContent = (content) => {
    setCurrentPlaying(content)
    setIsPlaying(true)
    setShowPlayer(true)
  }

  const closePlayer = () => {
    setShowPlayer(false)
    setCurrentPlaying(null)
    setIsPlaying(false)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleContentAdded = () => {
    // 重新获取内容列表
    fetchContents()
  }

  const filteredContents = contents.filter(content => {
    const matchesSearch = content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         content.artist?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || 
                           content.content_type === selectedCategory ||
                           content.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // 主页组件
  const HomePage = () => (
    <div className="space-y-6">
      {/* 欢迎区域 */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg">
        <h1 className="text-3xl font-bold mb-2">欢迎使用车载娱乐系统</h1>
        <p className="text-blue-100">享受您的旅程，发现精彩内容</p>
      </div>

      {/* 快速访问 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setCurrentView('music')}>
          <CardContent className="flex flex-col items-center p-6">
            <Music className="h-8 w-8 text-blue-600 mb-2" />
            <span className="font-medium">音乐</span>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setCurrentView('video')}>
          <CardContent className="flex flex-col items-center p-6">
            <Video className="h-8 w-8 text-red-600 mb-2" />
            <span className="font-medium">视频</span>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setCurrentView('playlists')}>
          <CardContent className="flex flex-col items-center p-6">
            <List className="h-8 w-8 text-green-600 mb-2" />
            <span className="font-medium">播放列表</span>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setShowYouTubePlayer(true)}>
          <CardContent className="flex flex-col items-center p-6">
            <Youtube className="h-8 w-8 text-red-500 mb-2" />
            <span className="font-medium">YouTube</span>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setShowMinecraftGuide(true)}>
          <CardContent className="flex flex-col items-center p-6">
            <Gamepad2 className="h-8 w-8 text-green-500 mb-2" />
            <span className="font-medium">Minecraft</span>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setShowMoreFeatures(true)}>
          <CardContent className="flex flex-col items-center p-6">
            <Settings className="h-8 w-8 text-gray-600 mb-2" />
            <span className="font-medium">更多功能</span>
          </CardContent>
        </Card>
      </div>

      {/* 推荐内容 */}
      <div>
        <h2 className="text-2xl font-bold mb-4">推荐内容</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {contents.slice(0, 6).map(content => (
            <ContentCard key={content.id} content={content} onPlay={playContent} />
          ))}
        </div>
      </div>
    </div>
  )

  // 内容卡片组件
  const ContentCard = ({ content, onPlay }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            {content.content_type === 'audio' ? 
              <Music className="h-6 w-6 text-white" /> : 
              <Video className="h-6 w-6 text-white" />
            }
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium truncate">{content.title}</h3>
            <p className="text-sm text-gray-500 truncate">{content.artist}</p>
            <div className="flex items-center space-x-2 mt-1">
              <Badge variant="secondary" className="text-xs">
                {content.category}
              </Badge>
              <span className="text-xs text-gray-400">
                {Math.floor(content.duration / 60)}:{(content.duration % 60).toString().padStart(2, '0')}
              </span>
            </div>
          </div>
          <Button size="sm" onClick={() => onPlay(content)}>
            <Play className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  // 内容浏览组件
  const ContentBrowser = ({ contentType }) => (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="搜索内容..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <select 
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 border rounded-md"
        >
          <option value="all">全部分类</option>
          <option value="audio">音频</option>
          <option value="video">视频</option>
          <option value="流行音乐">流行音乐</option>
          <option value="欧美流行">欧美流行</option>
          <option value="动作电影">动作电影</option>
          <option value="科幻电影">科幻电影</option>
        </select>
        <Button onClick={() => setShowAddContentModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          添加内容
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {filteredContents
          .filter(content => !contentType || content.content_type === contentType)
          .map(content => (
            <ContentCard key={content.id} content={content} onPlay={playContent} />
          ))}
      </div>
    </div>
  )

  // 播放列表组件
  const PlaylistsView = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">播放列表</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {playlists.map(playlist => (
          <Card key={playlist.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <List className="h-5 w-5" />
                <span>{playlist.name}</span>
              </CardTitle>
              <CardDescription>{playlist.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {playlist.content_count} 首歌曲
                </span>
                <Button size="sm">
                  <Play className="h-4 w-4 mr-1" />
                  播放
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  // 播放控制栏
  const PlayerControls = () => {
    if (!currentPlaying) return null

    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            {currentPlaying.content_type === 'audio' ? 
              <Music className="h-6 w-6 text-white" /> : 
              <Video className="h-6 w-6 text-white" />
            }
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium truncate">{currentPlaying.title}</h3>
            <p className="text-sm text-gray-500 truncate">{currentPlaying.artist}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button size="sm" variant="ghost">
              <Shuffle className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost">
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button size="sm" onClick={togglePlayPause}>
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button size="sm" variant="ghost">
              <SkipForward className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost">
              <Repeat className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost">
              <Volume2 className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost">
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    )
  }  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 ios-animate-fade-in">
      {/* 顶部导航栏 - iOS 26 风格 */}
      <div className="ios-navbar sticky top-0 z-40">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                车载娱乐系统
              </h1>
              <div className="hidden md:flex items-center space-x-2">
                <Button 
                  variant="ghost"
                  onClick={() => setShowYouTubePlayer(true)}
                  className="ios-button-secondary"
                >
                  <Youtube className="h-4 w-4 mr-2 text-red-500" />
                  YouTube
                </Button>
                <Button 
                  variant="ghost"
                  onClick={() => setShowMinecraftGuide(true)}
                  className="ios-button-secondary"
                >
                  <Gamepad2 className="h-4 w-4 mr-2 text-green-500" />
                  Minecraft
                </Button>
                <Button 
                  variant="ghost"
                  onClick={() => setShowMoreFeatures(true)}
                  className="ios-button-secondary"
                >
                  <Settings className="h-4 w-4 mr-2 text-gray-600" />
                  更多功能
                </Button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="ios-badge">在线</Badge>
              <Button variant="ghost" size="sm" className="ios-button-secondary">
                <User className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>host'}
                  onClick={() => setCurrentView('playlists')}
                >
                  <List className="h-4 w-4 mr-2" />
                  播放列表
                </Button>
                <Button 
                  variant="ghost"
                  onClick={() => setShowYouTubePlayer(true)}
                >
                  <Youtube className="h-4 w-4 mr-2" />
                  YouTube
                </Button>
                <Button 
                  variant="ghost"
                  onClick={() => setShowMinecraftGuide(true)}
                >
                  <Gamepad2 className="h-4 w-4 mr-2" />
                  Minecraft
                </Button>
                <Button 
                  variant="ghost"
                  onClick={() => setShowMoreFeatures(true)}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  更多功能
                </Button>
              </div>
            </div>
            <div className="flex items-center">
              <Button variant="ghost" size="sm">
                <User className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* 主内容区域 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24">
        {currentView === 'home' && <HomePage />}
        {currentView === 'music' && <ContentBrowser contentType="audio" />}
        {currentView === 'video' && <ContentBrowser contentType="video" />}
        {currentView === 'playlists' && <PlaylistsView />}
      </main>

      {/* 播放控制栏 */}
      <PlayerControls />

      {/* 媒体播放器 */}
      {showPlayer && currentPlaying && (
        <MediaPlayer 
          content={currentPlaying} 
          onClose={closePlayer}
        />
      )}

      {/* YouTube播放器 */}
      <YouTubePlayer 
        isOpen={showYouTubePlayer}
        onClose={() => setShowYouTubePlayer(false)}
      />

      {/* Minecraft访问指南 */}
      <MinecraftGuide 
        isOpen={showMinecraftGuide}
        onClose={() => setShowMinecraftGuide(false)}
      />

      {/* 添加内容模态框 */}
      <AddContentModal 
        isOpen={showAddContentModal}
        onClose={() => setShowAddContentModal(false)}
        onContentAdded={handleContentAdded}
      />

      {/* 更多功能模态框 */}
      <MoreFeaturesModal 
        isOpen={showMoreFeatures}
        onClose={() => setShowMoreFeatures(false)}
      />
    </div>
  )
}

export default App

