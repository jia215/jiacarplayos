// 语言管理工具
export const LANGUAGES = {
  zh: 'zh',
  en: 'en'
}

// 翻译文本
export const translations = {
  zh: {
    // 导航和标题
    appTitle: '车载娱乐系统',
    home: '首页',
    music: '音乐',
    video: '视频',
    playlists: '播放列表',
    youtube: 'YouTube',
    minecraft: 'Minecraft',
    moreFeatures: '更多功能',
    online: '在线',
    
    // 首页内容
    welcomeBack: '欢迎回来！',
    welcomeSubtitle: '享受您的音乐和视频之旅',
    quickAccess: '快速访问',
    recommendedContent: '推荐内容',
    
    // 内容浏览
    searchContent: '搜索内容...',
    allCategories: '全部分类',
    audio: '音频',
    popularMusic: '流行音乐',
    westernPop: '欧美流行',
    actionMovies: '动作电影',
    sciFiMovies: '科幻电影',
    addContent: '添加内容',
    
    // 播放列表
    myPlaylists: '我的播放列表',
    createPlaylist: '新建播放列表',
    songs: '首歌曲',
    
    // 媒体播放器
    play: '播放',
    pause: '暂停',
    close: '关闭',
    browserNotSupportAudio: '您的浏览器不支持音频播放',
    
    // 添加内容
    addContentTitle: '添加内容',
    fileUpload: '文件上传',
    urlLink: 'URL链接',
    title: '标题',
    artist: '艺术家',
    category: '分类',
    selectFile: '选择文件',
    fileUrl: '文件URL',
    contentType: '内容类型',
    duration: '时长（秒）',
    cancel: '取消',
    add: '添加',
    
    // YouTube播放器
    youtubeTitle: 'YouTube播放器',
    enterYoutubeUrl: '输入YouTube视频链接',
    openInNewWindow: '在新窗口打开',
    
    // Minecraft指南
    minecraftGuide: 'Minecraft访问指南',
    overview: '概述',
    minecraftOverviewDescription: '通过cpolar内网穿透服务，您可以在美国访问位于中国的Minecraft服务器，实现跨地域游戏体验。本指南将详细说明如何配置和连接。',
    serverConfigurationChina: '服务器端配置（中国）',
    ensureMinecraftServerRunning: '确保Minecraft服务器运行',
    defaultPort: '默认端口',
    ensureServerConfig: '确保服务器配置文件中 server-ip= 为空或设置为 0.0.0.0',
    configureCpolarTunnel: '配置cpolar隧道',
    cpolarTunnelDescription: '执行后，cpolar会分配一个公网地址和端口，例如：tcp://xxx.cpolar.io:12345',
    firewallSettings: '防火墙设置',
    allowMinecraftThroughFirewall: '确保Windows防火墙允许Minecraft服务器通过',
    allowPort25565: '允许端口25565的入站连接',
    portForwardingNeeded: '如果使用路由器，可能需要端口转发设置',
    clientConnectionUSA: '客户端连接（美国）',
    getConnectionInfo: '获取连接信息',
    cpolarAddressFormat: '从cpolar获得的地址格式：tcp://xxx.cpolar.io:12345',
    addServerInMinecraft: '在Minecraft中添加服务器',
    openMinecraftClient: '打开Minecraft客户端',
    selectMultiplayer: '选择"多人游戏"',
    clickAddServer: '点击"添加服务器"',
    serverNameCustom: '服务器名称：自定义名称',
    serverAddressCpolar: '服务器地址',
    removeTcpPrefix: '去掉tcp://前缀',
    clickDone: '点击"完成"',
    connectToServer: '连接服务器',
    selectAndJoinServer: '在服务器列表中选择刚添加的服务器，点击"加入服务器"',
    networkOptimization: '网络优化',
    useWiredNetwork: '使用有线网络连接',
    closeOtherApps: '关闭其他占用带宽的应用',
    chooseGoodNetworkTime: '选择网络状况良好的时间段',
    gameSettings: '游戏设置',
    lowerRenderDistance: '降低渲染距离',
    disableUnnecessaryVisualEffects: '关闭不必要的视觉效果',
    useLowerGraphicsSettings: '使用较低的图形设置',
    precautions: '注意事项',
    latencyIssues: '延迟问题',
    latencyDescription: '跨国连接会有较高延迟（通常200-400ms），可能影响游戏体验',
    stability: '稳定性',
    stabilityDescription: '网络连接可能不如本地稳定，建议定期保存游戏进度',
    bandwidthConsumption: '带宽消耗',
    bandwidthDescription: '长时间游戏会消耗较多网络流量',
    timezoneDifferences: '时区差异',
    timezoneDescription: '注意中美时区差异，合理安排游戏时间',
    security: '安全性',
    securityDescription: 'cpolar隧道是公开的，建议设置服务器白名单',
    cannotConnectToServer: '无法连接服务器',
    checkCpolarTunnel: '检查cpolar隧道是否正常运行',
    confirmServerAddressPort: '确认服务器地址和端口正确',
    checkMinecraftServerStatus: '检查Minecraft服务器是否启动',
    frequentDisconnections: '连接频繁断开',
    checkNetworkStability: '检查网络连接稳定性',
    tryRestartCpolarClient: '尝试重启cpolar客户端',
    adjustMinecraftNetworkSettings: '调整Minecraft客户端网络设置',
    serverSetup: '服务器端配置（中国）',
    clientConnection: '客户端连接（美国）',
    performanceOptimization: '性能优化建议',
    troubleshooting: '常见问题排除',
    
    // 更多功能
    moreFeaturesTitle: '更多功能',
    basicMathCalculations: '基础数学计算',
    currentTimeDisplay: '当前时间显示',
    weatherInfoQuery: '天气信息查询',
    mapNavigationFunction: '地图导航功能',
    quickNoteTaking: '快速记录笔记',
    viewSystemStatus: '查看系统状态',
    systemSettingsOptions: '系统设置选项',
    useHelpDocumentation: '使用帮助文档',
    plus: '加',
    equals: '等于',
    locale: 'zh-CN',
    weatherInfo: '天气信息',
    currentLocation: '当前位置',
    beijing: '北京市',
    currentTemperature: '当前温度',
    weatherCondition: '天气状况',
    weatherDisclaimer: '这是模拟数据，实际使用需要接入天气API',
    navigationFunction: '导航功能',
    openMapNavigation: '打开地图导航',
    favoritePlaces: '收藏的地点',
    recentNavigation: '最近导航',
    navigationIntegrationDisclaimer: '导航功能需要集成第三方地图服务',
    quickNotes: '快速笔记',
    enterYourNotes: '输入您的笔记...',
    saveNote: '保存笔记',
    savedNotes: '已保存的笔记',
    noNotesYet: '暂无笔记',
    batteryStatus: '电池状态',
    networkConnection: '网络连接',
    connected: '已连接',
    volume: '音量',
    screenBrightness: '屏幕亮度',
    systemSettings: '系统设置',
    audioSettings: '音频设置',
    displaySettings: '显示设置',
    networkSettings: '网络设置',
    downloadSettings: '下载设置',
    shareSettings: '分享设置',
    helpAndSupport: '帮助与支持',
    quickStart: '快速入门',
    quickStartDescription: '了解如何使用车载娱乐系统的基本功能',
    faq: '常见问题',
    faqDescription: '查看常见问题的解决方案',
    contactSupport: '联系支持',
    contactSupportDescription: '获取技术支持和帮助',
    versionInfo: '版本信息',
    carEntertainmentSystem: '车载娱乐系统',
    selectFeature: '选择您需要的功能：',
    back: '返回',
    calculator: '计算器',
    clock: '时钟',
    weather: '天气',
    navigation: '导航',
    notes: '笔记',
    systemInfo: '系统信息',
    settings: '设置',
    help: '帮助',
    backToFeatures: '返回功能选择',
    
    // 设置
    language: '语言',
    chinese: '中文',
    english: 'English',
    
    // 通用
    save: '保存',
    delete: '删除',
    edit: '编辑',
    back: '返回',
    next: '下一步',
    previous: '上一步',
    loading: '加载中...',
    error: '错误',
    success: '成功',
    confirm: '确认',
    
    // 时间格式
    currentTime: '当前时间',
    
    // 系统信息
    battery: '电池',
    network: '网络',
    volume: '音量',
    connected: '已连接',
    disconnected: '未连接',
    
    // 笔记功能
    addNote: '添加笔记',
    noteTitle: '笔记标题',
    noteContent: '笔记内容',
    saveNote: '保存笔记',
    deleteNote: '删除笔记',
    myNotes: '我的笔记'
  },
  en: {
    // Navigation and titles
    appTitle: 'Car Entertainment System',
    home: 'Home',
    music: 'Music',
    video: 'Video',
    playlists: 'Playlists',
    youtube: 'YouTube',
    minecraft: 'Minecraft',
    moreFeatures: 'More Features',
    online: 'Online',
    
    // Home content
    welcomeBack: 'Welcome Back!',
    welcomeSubtitle: 'Enjoy your music and video journey',
    quickAccess: 'Quick Access',
    recommendedContent: 'Recommended Content',
    
    // Content browsing
    searchContent: 'Search content...',
    allCategories: 'All Categories',
    audio: 'Audio',
    popularMusic: 'Popular Music',
    westernPop: 'Western Pop',
    actionMovies: 'Action Movies',
    sciFiMovies: 'Sci-Fi Movies',
    addContent: 'Add Content',
    
    // Playlists
    myPlaylists: 'My Playlists',
    createPlaylist: 'Create Playlist',
    songs: ' songs',
    
    // Media player
    play: 'Play',
    pause: 'Pause',
    close: 'Close',
    browserNotSupportAudio: 'Your browser does not support audio playback',
    
    // Add content
    addContentTitle: 'Add Content',
    fileUpload: 'File Upload',
    urlLink: 'URL Link',
    title: 'Title',
    artist: 'Artist',
    category: 'Category',
    selectFile: 'Select File',
    fileUrl: 'File URL',
    contentType: 'Content Type',
    duration: 'Duration (seconds)',
    cancel: 'Cancel',
    add: 'Add',
    
    // YouTube player
    youtubeTitle: 'YouTube Player',
    enterYoutubeUrl: 'Enter YouTube video link',
    openInNewWindow: 'Open in New Window',
    
    // Minecraft guide
    minecraftGuide: 'Minecraft Access Guide',
    overview: 'Overview',
    minecraftOverviewDescription: 'Through the cpolar intranet penetration service, you can access Minecraft servers located in China from the United States, achieving a cross-regional gaming experience. This guide will detail how to configure and connect.',
    serverConfigurationChina: 'Server-side Configuration (China)',
    ensureMinecraftServerRunning: '1. Ensure Minecraft server is running',
    defaultPort: 'Default Port',
    ensureServerConfig: 'Ensure server-ip= is empty or set to 0.0.0.0 in the server configuration file',
    configureCpolarTunnel: '2. Configure cpolar tunnel',
    cpolarTunnelDescription: 'After execution, cpolar will assign a public network address and port, e.g., tcp://xxx.cpolar.io:12345',
    firewallSettings: '3. Firewall Settings',
    allowMinecraftThroughFirewall: 'Ensure Windows Firewall allows Minecraft server',
    allowPort25565: 'Allow inbound connections on port 25565',
    portForwardingNeeded: 'If using a router, port forwarding settings may be required',
    clientConnectionUSA: 'Client-side Connection (USA)',
    getConnectionInfo: '1. Get Connection Information',
    cpolarAddressFormat: 'Address format obtained from cpolar: tcp://xxx.cpolar.io:12345',
    addServerInMinecraft: '2. Add Server in Minecraft',
    openMinecraftClient: 'Open Minecraft client',
    selectMultiplayer: 'Select "Multiplayer"',
    clickAddServer: 'Click "Add Server"',
    serverNameCustom: 'Server Name: Custom Name',
    serverAddressCpolar: 'Server Address',
    removeTcpPrefix: 'Remove tcp:// prefix',
    clickDone: 'Click "Done"',
    connectToServer: '3. Connect to Server',
    selectAndJoinServer: 'Select the newly added server from the server list and click "Join Server"',
    networkOptimization: 'Network Optimization',
    useWiredNetwork: 'Use wired network connection',
    closeOtherApps: 'Close other bandwidth-consuming applications',
    chooseGoodNetworkTime: 'Choose a time with good network conditions',
    gameSettings: 'Game Settings',
    lowerRenderDistance: 'Lower render distance',
    disableUnnecessaryVisualEffects: 'Disable unnecessary visual effects',
    useLowerGraphicsSettings: 'Use lower graphics settings',
    precautions: 'Precautions',
    latencyIssues: 'Latency Issues',
    latencyDescription: 'Cross-border connections will have higher latency (usually 200-400ms), which may affect gaming experience',
    stability: 'Stability',
    stabilityDescription: 'Network connection may be less stable than local, it is recommended to save game progress regularly',
    bandwidthConsumption: 'Bandwidth Consumption',
    bandwidthDescription: 'Long-term gaming will consume more network traffic',
    timezoneDifferences: 'Time Zone Differences',
    timezoneDescription: 'Pay attention to time zone differences between China and the US, arrange game time reasonably',
    security: 'Security',
    securityDescription: 'cpolar tunnel is public, it is recommended to set up a server whitelist',
    cannotConnectToServer: 'Cannot Connect to Server',
    checkCpolarTunnel: 'Check if cpolar tunnel is running properly',
    confirmServerAddressPort: 'Confirm server address and port are correct',
    checkMinecraftServerStatus: 'Check if Minecraft server is started',
    frequentDisconnections: 'Frequent Disconnections',
    checkNetworkStability: 'Check network connection stability',
    tryRestartCpolarClient: 'Try restarting cpolar client',
    adjustMinecraftNetworkSettings: 'Adjust Minecraft client network settings',
    serverSetup: 'Server Setup (China)',
    clientConnection: 'Client Connection (USA)',
    performanceOptimization: 'Performance Optimization',
    troubleshooting: 'Troubleshooting',
    
    // More features
    moreFeaturesTitle: 'More Features',
    basicMathCalculations: 'Basic Math Calculations',
    currentTimeDisplay: 'Current Time Display',
    weatherInfoQuery: 'Weather Information Query',
    mapNavigationFunction: 'Map Navigation Function',
    quickNoteTaking: 'Quick Note Taking',
    viewSystemStatus: 'View System Status',
    systemSettingsOptions: 'System Settings Options',
    useHelpDocumentation: 'Use Help Documentation',
    plus: 'Plus',
    equals: 'Equals',
    locale: 'en-US',
    weatherInfo: 'Weather Information',
    currentLocation: 'Current Location',
    beijing: 'Beijing',
    currentTemperature: 'Current Temperature',
    weatherCondition: 'Weather Condition',
    weatherDisclaimer: 'This is simulated data, actual use requires weather API integration',
    navigationFunction: 'Navigation Function',
    openMapNavigation: 'Open Map Navigation',
    favoritePlaces: 'Favorite Places',
    recentNavigation: 'Recent Navigation',
    navigationIntegrationDisclaimer: 'Navigation function requires third-party map service integration',
    quickNotes: 'Quick Notes',
    enterYourNotes: 'Enter your notes...',
    saveNote: 'Save Note',
    savedNotes: 'Saved Notes',
    noNotesYet: 'No notes yet',
    batteryStatus: 'Battery Status',
    networkConnection: 'Network Connection',
    connected: 'Connected',
    volume: 'Volume',
    screenBrightness: 'Screen Brightness',
    systemSettings: 'System Settings',
    audioSettings: 'Audio Settings',
    displaySettings: 'Display Settings',
    networkSettings: 'Network Settings',
    downloadSettings: 'Download Settings',
    shareSettings: 'Share Settings',
    helpAndSupport: 'Help and Support',
    quickStart: 'Quick Start',
    quickStartDescription: 'Learn how to use the basic functions of the car entertainment system',
    faq: 'FAQ',
    faqDescription: 'View solutions to common problems',
    contactSupport: 'Contact Support',
    contactSupportDescription: 'Get technical support and help',
    versionInfo: 'Version Info',
    carEntertainmentSystem: 'Car Entertainment System',
    selectFeature: 'Select the function you need:',
    back: 'Back',
    calculator: 'Calculator',
    clock: 'Clock',
    weather: 'Weather',
    navigation: 'Navigation',
    notes: 'Notes',
    systemInfo: 'System Info',
    settings: 'Settings',
    help: 'Help',
    backToFeatures: 'Back to Features',
    
    // Settings
    language: 'Language',
    chinese: '中文',
    english: 'English',
    
    // Common
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    confirm: 'Confirm',
    
    // Time format
    currentTime: 'Current Time',
    
    // System info
    battery: 'Battery',
    network: 'Network',
    volume: 'Volume',
    connected: 'Connected',
    disconnected: 'Disconnected',
    
    // Notes functionality
    addNote: 'Add Note',
    noteTitle: 'Note Title',
    noteContent: 'Note Content',
    saveNote: 'Save Note',
    deleteNote: 'Delete Note',
    myNotes: 'My Notes'
  }
}

// Cookie 管理
export const getCookie = (name) => {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop().split(';').shift()
  return null
}

export const setCookie = (name, value, days = 365) => {
  const expires = new Date()
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000))
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`
}

// 语言管理
export const getStoredLanguage = () => {
  return getCookie('language') || LANGUAGES.zh
}

export const setStoredLanguage = (language) => {
  setCookie('language', language)
}

// 获取翻译文本
export const getTranslation = (key, language) => {
  return translations[language]?.[key] || translations[LANGUAGES.zh][key] || key
}

// 语言切换Hook
export const useLanguage = () => {
  const [currentLanguage, setCurrentLanguage] = React.useState(getStoredLanguage())
  
  const changeLanguage = (language) => {
    setCurrentLanguage(language)
    setStoredLanguage(language)
  }
  
  const t = (key) => getTranslation(key, currentLanguage)
  
  return {
    currentLanguage,
    changeLanguage,
    t
  }
}

