import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { useLanguage } from '../hooks/useLanguage.js';
import { 
  X, 
  Calculator, 
  Clock, 
  MapPin, 
  Thermometer, 
  Wifi, 
  Battery, 
  Volume2,
  SunDim,
  Navigation,
  Phone,
  MessageSquare,
  Camera,
  FileText,
  Download,
  Share2,
  Settings,
  Info,
  HelpCircle,
  Star,
  Heart,
  Bookmark
} from 'lucide-react';

const MoreFeaturesModal = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const [activeFeature, setActiveFeature] = useState(null);
  const [calculatorInput, setCalculatorInput] = useState('');
  const [calculatorResult, setCalculatorResult] = useState('');
  const [noteText, setNoteText] = useState('');
  const [savedNotes, setSavedNotes] = useState([]);

  if (!isOpen) return null;

  // 计算器功能
  const handleCalculatorInput = (value) => {
    if (value === '=') {
      try {
        const result = eval(calculatorInput);
        setCalculatorResult(result.toString());
      } catch (error) {
        setCalculatorResult('错误');
      }
    } else if (value === 'C') {
      setCalculatorInput('');
      setCalculatorResult('');
    } else {
      setCalculatorInput(prev => prev + value);
    }
  };

  // 笔记功能
  const saveNote = () => {
    if (noteText.trim()) {
      const newNote = {
        id: Date.now(),
        text: noteText,
        timestamp: new Date().toLocaleString()
      };
      setSavedNotes(prev => [newNote, ...prev]);
      setNoteText('');
    }
  };

  const deleteNote = (id) => {
    setSavedNotes(prev => prev.filter(note => note.id !== id));
  };

  // 功能列表
  const features = [
    {
      id: 'calculator',
      title: '计算器',
      icon: Calculator,
      color: 'text-blue-600',
      description: '基础数学计算'
    },
    {
      id: 'clock',
      title: '时钟',
      icon: Clock,
      color: 'text-green-600',
      description: '当前时间显示'
    },
    {
      id: 'weather',
      title: '天气',
      icon: Thermometer,
      color: 'text-orange-600',
      description: '天气信息查询'
    },
    {
      id: 'navigation',
      title: '导航',
      icon: Navigation,
      color: 'text-purple-600',
      description: '地图导航功能'
    },
    {
      id: 'notes',
      title: '笔记',
      icon: FileText,
      color: 'text-yellow-600',
      description: '快速记录笔记'
    },
    {
      id: 'system',
      title: '系统信息',
      icon: Info,
      color: 'text-gray-600',
      description: '查看系统状态'
    },
    {
      id: 'settings',
      title: '设置',
      icon: Settings,
      color: 'text-indigo-600',
      description: '系统设置选项'
    },
    {
      id: 'help',
      title: '帮助',
      icon: HelpCircle,
      color: 'text-pink-600',
      description: '使用帮助文档'
    }
  ];

  // 渲染功能详情
  const renderFeatureDetail = () => {
    switch (activeFeature) {
      case 'calculator':
        return (
          <div className="space-y-4">
            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="text-right text-sm text-gray-600 mb-2">{calculatorInput}</div>
              <div className="text-right text-2xl font-bold">{calculatorResult || '0'}</div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {['C', '/', '*', '-', '7', '8', '9', '+', '4', '5', '6', '+', '1', '2', '3', '=', '0', '0', '.', '='].map((btn, index) => (
                <Button
                  key={index}
                  variant={['C', '/', '*', '-', '+', '='].includes(btn) ? 'default' : 'outline'}
                  onClick={() => handleCalculatorInput(btn)}
                  className={btn === '0' && index === 16 ? 'col-span-2' : ''}
                >
                  {btn}
                </Button>
              ))}
            </div>
          </div>
        );

      case 'clock':
        return (
          <div className="text-center space-y-4">
            <div className="text-6xl font-bold text-blue-600">
              {new Date().toLocaleTimeString()}
            </div>
            <div className="text-xl text-gray-600">
              {new Date().toLocaleDateString('zh-CN', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                weekday: 'long'
              })}
            </div>
          </div>
        );

      case 'weather':
        return (
          <div className="space-y-4">
            <div className="text-center">
              <Thermometer className="h-16 w-16 mx-auto text-orange-500 mb-4" />
              <h3 className="text-2xl font-bold">天气信息</h3>
              <p className="text-gray-600">当前位置：北京市</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-3xl font-bold text-blue-600">22°C</div>
                  <div className="text-sm text-gray-600">当前温度</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-lg font-bold">晴朗</div>
                  <div className="text-sm text-gray-600">天气状况</div>
                </CardContent>
              </Card>
            </div>
            <p className="text-sm text-gray-500 text-center">
              * 这是模拟数据，实际使用需要接入天气API
            </p>
          </div>
        );

      case 'navigation':
        return (
          <div className="space-y-4">
            <div className="text-center">
              <Navigation className="h-16 w-16 mx-auto text-purple-500 mb-4" />
              <h3 className="text-2xl font-bold">导航功能</h3>
            </div>
            <div className="space-y-3">
              <Button className="w-full" variant="outline">
                <MapPin className="h-4 w-4 mr-2" />
                打开地图导航
              </Button>
              <Button className="w-full" variant="outline">
                <Star className="h-4 w-4 mr-2" />
                收藏的地点
              </Button>
              <Button className="w-full" variant="outline">
                <Clock className="h-4 w-4 mr-2" />
                最近导航
              </Button>
            </div>
            <p className="text-sm text-gray-500 text-center">
              * 导航功能需要集成第三方地图服务
            </p>
          </div>
        );

      case 'notes':
        return (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-bold mb-2">快速笔记</h3>
              <Textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="输入您的笔记..."
                rows={3}
              />
              <Button onClick={saveNote} className="mt-2" disabled={!noteText.trim()}>
                保存笔记
              </Button>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">已保存的笔记</h4>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {savedNotes.length === 0 ? (
                  <p className="text-gray-500 text-sm">暂无笔记</p>
                ) : (
                  savedNotes.map(note => (
                    <Card key={note.id}>
                      <CardContent className="p-3">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <p className="text-sm">{note.text}</p>
                            <p className="text-xs text-gray-500 mt-1">{note.timestamp}</p>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => deleteNote(note.id)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </div>
        );

      case 'system':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-bold">系统信息</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Battery className="h-5 w-5 mr-2 text-green-600" />
                  <span>电池状态</span>
                </div>
                <Badge variant="secondary">85%</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Wifi className="h-5 w-5 mr-2 text-blue-600" />
                  <span>网络连接</span>
                </div>
                <Badge variant="secondary">已连接</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Volume2 className="h-5 w-5 mr-2 text-purple-600" />
                  <span>音量</span>
                </div>
                <Badge variant="secondary">75%</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Brightness4 className="h-5 w-5 mr-2 text-yellow-600" />
                  <span>屏幕亮度</span>
                </div>
                <Badge variant="secondary">60%</Badge>
              </div>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-bold">系统设置</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Volume2 className="h-4 w-4 mr-2" />
                音频设置
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Brightness4 className="h-4 w-4 mr-2" />
                显示设置
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Wifi className="h-4 w-4 mr-2" />
                网络设置
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Download className="h-4 w-4 mr-2" />
                下载设置
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Share2 className="h-4 w-4 mr-2" />
                分享设置
              </Button>
            </div>
          </div>
        );

      case 'help':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-bold">帮助与支持</h3>
            <div className="space-y-3">
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">快速入门</h4>
                  <p className="text-sm text-gray-600">了解如何使用车载娱乐系统的基本功能</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">常见问题</h4>
                  <p className="text-sm text-gray-600">查看常见问题的解决方案</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">联系支持</h4>
                  <p className="text-sm text-gray-600">获取技术支持和帮助</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">版本信息</h4>
                  <p className="text-sm text-gray-600">车载娱乐系统 v1.0.0</p>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-4xl mx-4 max-h-[90vh] overflow-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-bold">更多功能</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          {!activeFeature ? (
            <div>
              <p className="text-gray-600 mb-6">选择您需要的功能：</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {features.map(feature => {
                  const IconComponent = feature.icon;
                  return (
                    <Card 
                      key={feature.id}
                      className="cursor-pointer hover:shadow-lg transition-shadow"
                      onClick={() => setActiveFeature(feature.id)}
                    >
                      <CardContent className="p-6 text-center">
                        <IconComponent className={`h-8 w-8 mx-auto mb-3 ${feature.color}`} />
                        <h3 className="font-semibold mb-1">{feature.title}</h3>
                        <p className="text-xs text-gray-500">{feature.description}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center mb-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setActiveFeature(null)}
                  className="mr-2"
                >
                  ← 返回
                </Button>
                <h3 className="text-lg font-bold">
                  {features.find(f => f.id === activeFeature)?.title}
                </h3>
              </div>
              {renderFeatureDetail()}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MoreFeaturesModal;

