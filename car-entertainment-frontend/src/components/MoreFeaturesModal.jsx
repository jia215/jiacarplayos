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
        setCalculatorResult(t("error"));
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
      title: t('calculator'),
      icon: Calculator,
      color: 'text-blue-600',
      description: t('basicMathCalculations')
    },
    {
      id: 'clock',
      title: t('clock'),
      icon: Clock,
      color: 'text-green-600',
      description: t('currentTimeDisplay')
    },
    {
      id: 'weather',
      title: t('weather'),
      icon: Thermometer,
      color: 'text-orange-600',
      description: t('weatherInfoQuery')
    },
    {
      id: 'navigation',
      title: t('navigation'),
      icon: Navigation,
      color: 'text-purple-600',
      description: t('mapNavigationFunction')
    },
    {
      id: 'notes',
      title: t('notes'),
      icon: FileText,
      color: 'text-yellow-600',
      description: t('quickNoteTaking')
    },
    {
      id: 'system',
      title: t('systemInfo'),
      icon: Info,
      color: 'text-gray-600',
      description: t('viewSystemStatus')
    },
    {
      id: 'settings',
      title: t('settings'),
      icon: Settings,
      color: 'text-indigo-600',
      description: t('systemSettingsOptions')
    },
    {
      id: 'help',
      title: t('help'),
      icon: HelpCircle,
      color: 'text-pink-600',
      description: t('useHelpDocumentation')
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
              {['C', '/', '*', '-', '7', '8', '9', '+', '4', '5', '6', t('plus'), '1', '2', '3', t('equals'), '0', '0', '.', t('equals')].map((btn, index) => (
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
              {new Date().toLocaleDateString(t("locale"), { 
                year: "numeric", 
                month: "long", 
                day: "numeric",
                weekday: "long"
              })}
            </div>
          </div>
        );

      case 'weather':
        return (
          <div className="space-y-4">
            <div className="text-center">
              <Thermometer className="h-16 w-16 mx-auto text-orange-500 mb-4" />
              <h3 className="text-2xl font-bold">{t("weatherInfo")}</h3>
              <p className="text-gray-600">{t("currentLocation")}: {t("beijing")}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-3xl font-bold text-blue-600">22°C</div>
                  <div className="text-sm text-gray-600">{t("currentTemperature")}</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-lg font-bold">晴朗</div>
                  <div className="text-sm text-gray-600">{t("weatherCondition")}</div>
                </CardContent>
              </Card>
            </div>
            <p className="text-sm text-gray-500 text-center">
              * {t("weatherDisclaimer")}
            </p>
          </div>
        );

      case 'navigation':
        return (
          <div className="space-y-4">
            <div className="text-center">
              <Navigation className="h-16 w-16 mx-auto text-purple-500 mb-4" />
              <h3 className="text-2xl font-bold">{t("navigationFunction")}</h3>
            </div>
            <div className="space-y-3">
              <Button className="w-full" variant="outline">
                <MapPin className="h-4 w-4 mr-2" />
                {t("openMapNavigation")}
              </Button>
              <Button className="w-full" variant="outline">
                <Star className="h-4 w-4 mr-2" />
                {t("favoritePlaces")}
              </Button>
              <Button className="w-full" variant="outline">
                <Clock className="h-4 w-4 mr-2" />
                {t("recentNavigation")}
              </Button>
            </div>
            <p className="text-sm text-gray-500 text-center">
              * {t("navigationIntegrationDisclaimer")}
            </p>
          </div>
        );

      case 'notes':
        return (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-bold mb-2">{t("quickNotes")}</h3>
              <Textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder={t("enterYourNotes")}
                rows={3}
              />
              <Button onClick={saveNote} className="mt-2" disabled={!noteText.trim()}>
                {t("saveNote")}
              </Button>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">{t("savedNotes")}</h4>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {savedNotes.length === 0 ? (
                  <p className="text-gray-500 text-sm">{t("noNotesYet")}</p>
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
            <h3 className="text-lg font-bold">{t("systemInfo")}</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Battery className="h-5 w-5 mr-2 text-green-600" />
                  <span>{t("batteryStatus")}</span>
                </div>
                <Badge variant="secondary">85%</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Wifi className="h-5 w-5 mr-2 text-blue-600" />
                  <span>{t("networkConnection")}</span>
                </div>
                <Badge variant="secondary">{t("connected")}</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Volume2 className="h-5 w-5 mr-2 text-purple-600" />
                  <span>{t("volume")}</span>
                </div>
                <Badge variant="secondary">75%</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Brightness4 className="h-5 w-5 mr-2 text-yellow-600" />
                  <span>{t("screenBrightness")}</span>
                </div>
                <Badge variant="secondary">60%</Badge>
              </div>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-bold">{t("systemSettings")}</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Volume2 className="h-4 w-4 mr-2" />
                {t("audioSettings")}
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Brightness4 className="h-4 w-4 mr-2" />
                {t("displaySettings")}
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Wifi className="h-4 w-4 mr-2" />
                {t("networkSettings")}
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Download className="h-4 w-4 mr-2" />
                {t("downloadSettings")}
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Share2 className="h-4 w-4 mr-2" />
                {t("shareSettings")}
              </Button>
            </div>
          </div>
        );

      case 'help':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-bold">{t("helpAndSupport")}</h3>
            <div className="space-y-3">
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">{t("quickStart")}</h4>
                  <p className="text-sm text-gray-600">{t("quickStartDescription")}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">{t("faq")}</h4>
                  <p className="text-sm text-gray-600">{t("faqDescription")}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">{t("contactSupport")}</h4>
                  <p className="text-sm text-gray-600">{t("contactSupportDescription")}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">{t("versionInfo")}</h4>
                  <p className="text-sm text-gray-600">{t("carEntertainmentSystem")} v1.0.0</p>
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
          <CardTitle className="text-xl font-bold">{t('moreFeatures')}</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          {!activeFeature ? (
            <div>
              <p className="text-gray-600 mb-6">{t("selectFeature")}</p>
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
                  ← {t("back")}
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

