import React, { useState, useEffect } from 'react'
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
import LanguageSwitcher from './components/LanguageSwitcher.jsx'
import { useLanguage } from './hooks/useLanguage.js'
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  Search, 
  Home, 
  Music, 
  Video, 
  List, 
  Clock, 
  User,
  Heart,
  Shuffle,
  Repeat,
  Youtube,
  Gamepad2,
  Plus,
  Settings
} from 'lucide-react'
import './App.css'
import './styles/ios26-theme.css'

// 模拟API调用
const API_BASE = 'http://localhost:5002/api'

function App() {
  const { t } = useLanguage()
  const [contents, setContents] = useState([])
  const [playlists, setPlaylists] = useState([])
  const [playHistory, setPlayHistory] = useState([])
  const [currentView, setCurrentView] = useState('home')
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
    fetchPlayHistory()
  }, [])

  const fetchContents = async () => {
    try {
      const response = await fetch(`${API_BASE}/contents`)
      const data = await response.json()
      setContents(data)
    } catch (error) {
      console.error('获取内容失败:', error)
    }
  }

  const fetchPlaylists = async () => {
    try {
      const response = await fetch(`${API_BASE}/playlists`)
      const data = await response.json()
      setPlaylists(data)
    } catch (error) {
      console.error('获取播放列表失败:', error)
    }
  }

  const fetchPlayHistory = async () => {
    try {
      const response = await fetch(`${API_BASE}/play-history`)
      const data = await response.json()
      setPlayHistory(data)
    } catch (error) {
      console.error('获取播放历史失败:', error)
    }
  }

  const playContent = (content) => {
    setCurrentPlaying(content)
    setIsPlaying(true)
    setShowPlayer(true)
  }

  const stopPlayback = () => {
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
                         content.artist.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || 
                           content.content_type === selectedCategory ||
                           content.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // 内容卡片组件 - iOS 26 风格
  const ContentCard = ({ content, onPlay }) => (
    <div className="ios-card ios-list-item group cursor-pointer" onClick={() => onPlay(content)}>
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
          {content.content_type === 'audio' ? (
            <Music className="h-8 w-8 text-white" />
          ) : (
            <Video className="h-8 w-8 text-white" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg text-gray-900 truncate group-hover:text-blue-600 transition-colors">
            {content.title}
          </h3>
          <p className="text-gray-600 truncate">{content.artist}</p>
          <div className="flex items-center space-x-2 mt-1">
            <Badge className="ios-badge-secondary text-xs">{content.category}</Badge>
            {content.duration && (
              <span className="text-xs text-gray-500">{Math.floor(content.duration / 60)}:{(content.duration % 60).toString().padStart(2, '0')}</span>
            )}
          </div>
        </div>
        <Button size="sm" className="ios-button opacity-0 group-hover:opacity-100 transition-opacity">
          <Play className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )

  // 内容浏览组件 - iOS 26 风格
  const ContentBrowser = ({ contentType }) => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            placeholder={t("searchContent")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="ios-input pl-12 h-12"
          />
        </div>
        <select 
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="ios-input h-12 min-w-[140px]"
        >
          <option value="all">{t("allCategories")}</option>
          <option value="audio">{t("audio")}</option>
          <option value="video">{t("video")}</option>
          <option value="流行音乐">{t("popularMusic")}</option>
          <option value="欧美流行">{t("westernPop")}</option>
          <option value="动作电影">{t("actionMovies")}</option>
          <option value="科幻电影">{t("sciFiMovies")}</option>
        </select>
        <Button onClick={() => setShowAddContentModal(true)} className="ios-button h-12">
          <Plus className="h-4 w-4 mr-2" />
          {t("addContent")}
        </Button>
      </div>

      <div className="space-y-3">
        {filteredContents
          .filter(content => !contentType || content.content_type === contentType)
          .map(content => (
            <ContentCard key={content.id} content={content} onPlay={playContent} />
          ))}
      </div>
    </div>
  )

  // 播放列表组件 - iOS 26 风格
  const PlaylistsView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">{t("myPlaylists")}</h2>
        <Button className="ios-button">
          <Plus className="h-4 w-4 mr-2" />
          {t("createPlaylist")}
        </Button>
      </div>
      <div className="ios-grid ios-grid-2">
        {playlists.map(playlist => (
          <div key={playlist.id} className="ios-card p-6 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl mx-auto mb-4 flex items-center justify-center">
              <List className="h-8 w-8 text-white" />
            </div>
            <h3 className="font-semibold text-lg mb-2">{playlist.name}</h3>
            <p className="text-gray-600 text-sm">{playlist.content_count || 0} {t("songs")}</p>
          </div>
        ))}
      </div>
    </div>
  )

  // 主页视图 - iOS 26 风格
  const HomeView = () => (
    <div className="space-y-8">
      {/* 欢迎区域 */}
      <div className="ios-card p-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <h2 className="text-3xl font-bold mb-2">{t('welcomeBack')}</h2>
        <p className="text-white text-lg opacity-90">{t("welcomeSubtitle")}</p>
      </div>

      {/* 快速访问 */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-gray-900">{t('quickAccess')}</h3>
        <div className="ios-grid ios-grid-5">
          <div className="ios-card cursor-pointer group" onClick={() => setCurrentView('music')}>
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Music className="h-8 w-8 text-white" />
              </div>
              <span className="font-semibold text-lg">{t('music')}</span>
            </CardContent>
          </div>
          <div className="ios-card cursor-pointer group" onClick={() => setCurrentView('video')}>
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Video className="h-8 w-8 text-white" />
              </div>
              <span className="font-semibold text-lg">{t('video')}</span>
            </CardContent>
          </div>
          <div className="ios-card cursor-pointer group" onClick={() => setShowYouTubePlayer(true)}>
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-xl mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Youtube className="h-8 w-8 text-white" />
              </div>
              <span className="font-semibold text-lg">{t('youtube')}</span>
            </CardContent>
          </div>
          <div className="ios-card cursor-pointer group" onClick={() => setShowMinecraftGuide(true)}>
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-lime-600 rounded-xl mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Gamepad2 className="h-8 w-8 text-white" />
              </div>
              <span className="font-semibold text-lg">{t('minecraft')}</span>
            </CardContent>
          </div>
          <div className="ios-card cursor-pointer group" onClick={() => setShowMoreFeatures(true)}>
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-600 to-slate-700 rounded-xl mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Settings className="h-8 w-8 text-white" />
              </div>
              <span className="font-semibold text-lg">{t('moreFeatures')}</span>
            </CardContent>
          </div>
        </div>
      </div>

      {/* 推荐内容 */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-gray-900">{t('recommendedContent')}</h3>
        <div className="space-y-3">
          {contents.slice(0, 3).map(content => (
            <ContentCard key={content.id} content={content} onPlay={playContent} />
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 ios-animate-fade-in">
      {/* 顶部导航栏 - iOS 26 风格 */}
      <div className="ios-navbar sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {t('appTitle')}
              </h1>
              <div className="hidden md:flex items-center space-x-2">
                <Button 
                  variant="ghost"
                  onClick={() => setShowYouTubePlayer(true)}
                  className="ios-button-secondary"
                >
                  <Youtube className="h-4 w-4 mr-2 text-red-500" />
                  {t('youtube')}
                </Button>
                <Button 
                  variant="ghost"
                  onClick={() => setShowMinecraftGuide(true)}
                  className="ios-button-secondary"
                >
                  <Gamepad2 className="h-4 w-4 mr-2 text-green-500" />
                  {t('minecraft')}
                </Button>
                <Button 
                  variant="ghost"
                  onClick={() => setShowMoreFeatures(true)}
                  className="ios-button-secondary"
                >
                  <Settings className="h-4 w-4 mr-2 text-gray-600" />
                  {t('moreFeatures')}
                </Button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="ios-badge">{t('online')}</Badge>
              <LanguageSwitcher />
              <Button variant="ghost" size="sm" className="ios-button-secondary">
                <User className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* 导航标签 - iOS 26 风格 */}
        <div className="ios-tabs mb-4 max-w-md mx-auto">
          <div className="flex">
            <button 
              className={`ios-tab flex-1 ${currentView === 'home' ? 'active' : ''}`}
              onClick={() => setCurrentView('home')}
            >
              <Home className="h-4 w-4 mr-2" />
              {t('home')}
            </button>
            <button 
              className={`ios-tab flex-1 ${currentView === 'music' ? 'active' : ''}`}
              onClick={() => setCurrentView('music')}
            >
              <Music className="h-4 w-4 mr-2" />
              {t('music')}
            </button>
            <button 
              className={`ios-tab flex-1 ${currentView === 'video' ? 'active' : ''}`}
              onClick={() => setCurrentView('video')}
            >
              <Video className="h-4 w-4 mr-2" />
              {t('video')}
            </button>
            <button 
              className={`ios-tab flex-1 ${currentView === 'playlists' ? 'active' : ''}`}
              onClick={() => setCurrentView('playlists')}
            >
              <List className="h-4 w-4 mr-2" />
              {t('playlists')}
            </button>
          </div>
        </div>

        {/* 内容区域 */}
        <div className="ios-animate-fade-in">
          {currentView === 'home' && <HomeView />}
          {currentView === 'music' && <ContentBrowser contentType="audio" />}
          {currentView === 'video' && <ContentBrowser contentType="video" />}
          {currentView === 'playlists' && <PlaylistsView />}
        </div>
      </div>

      {/* 媒体播放器 */}
      <MediaPlayer 
        isOpen={showPlayer}
        content={currentPlaying}
        isPlaying={isPlaying}
        onClose={stopPlayback}
        onTogglePlay={togglePlayPause}
      />

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

