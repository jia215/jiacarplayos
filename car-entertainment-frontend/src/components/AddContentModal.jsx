import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Label } from './ui/label';
import { X, Upload, Link, Music, Video, Plus } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage.js';

const AddContentModal = ({ isOpen, onClose, onContentAdded }) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('file');
  const [isUploading, setIsUploading] = useState(false);
  
  // 文件上传表单状态
  const [fileForm, setFileForm] = useState({
    file: null,
    title: '',
    artist: '',
    category: '',
    description: ''
  });

  // URL内容表单状态
  const [urlForm, setUrlForm] = useState({
    title: '',
    artist: '',
    url: '',
    content_type: 'audio',
    category: '',
    description: '',
    duration: ''
  });

  const API_BASE = 'http://localhost:5002/api';

  const resetForms = () => {
    setFileForm({
      file: null,
      title: '',
      artist: '',
      category: '',
      description: ''
    });
    setUrlForm({
      title: '',
      artist: '',
      url: '',
      content_type: 'audio',
      category: '',
      description: '',
      duration: ''
    });
  };

  const handleClose = () => {
    resetForms();
    onClose();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileForm(prev => ({
        ...prev,
        file: file,
        title: prev.title || file.name.replace(/\.[^/.]+$/, '') // 如果没有标题，使用文件名
      }));
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    
    if (!fileForm.file) {
      alert('请选择文件');
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', fileForm.file);
      formData.append('title', fileForm.title);
      formData.append('artist', fileForm.artist);
      formData.append('category', fileForm.category);
      formData.append('description', fileForm.description);

      const response = await fetch(`${API_BASE}/add-content`, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        alert('文件上传成功！');
        onContentAdded && onContentAdded();
        handleClose();
      } else {
        alert(`上传失败: ${data.message}`);
      }
    } catch (error) {
      console.error('上传错误:', error);
      alert('上传失败，请检查网络连接');
    } finally {
      setIsUploading(false);
    }
  };

  const handleUrlSubmit = async (e) => {
    e.preventDefault();
    
    if (!urlForm.title || !urlForm.url) {
      alert('请填写标题和URL');
      return;
    }

    setIsUploading(true);

    try {
      const response = await fetch(`${API_BASE}/add-content`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...urlForm,
          duration: urlForm.duration ? parseInt(urlForm.duration) : 0
        })
      });

      const data = await response.json();

      if (data.success) {
        alert('URL内容添加成功！');
        onContentAdded && onContentAdded();
        handleClose();
      } else {
        alert(`添加失败: ${data.message}`);
      }
    } catch (error) {
      console.error('添加错误:', error);
      alert('添加失败，请检查网络连接');
    } finally {
      setIsUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl mx-4 max-h-[90vh] overflow-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-bold flex items-center">
            <Plus className="h-6 w-6 mr-2" />
            {t('addContentTitle')}
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={handleClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="file" className="flex items-center">
                <Upload className="h-4 w-4 mr-2" />
                {t('fileUpload')}
              </TabsTrigger>
              <TabsTrigger value="url" className="flex items-center">
                <Link className="h-4 w-4 mr-2" />
                {t('urlLink')}
              </TabsTrigger>
            </TabsList>

            {/* 文件上传标签页 */}
            <TabsContent value="file" className="space-y-4">
              <form onSubmit={handleFileUpload} className="space-y-4">
                <div>
                  <Label htmlFor="file-upload">{t('selectFile')}</Label>
                  <Input
                    id="file-upload"
                    type="file"
                    accept="audio/*,video/*"
                    onChange={handleFileChange}
                    className="mt-1"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    支持的格式：MP3, WAV, FLAC, M4A, AAC, OGG, MP4, AVI, MKV, MOV, WMV, FLV, WebM
                  </p>
                </div>

                <div>
                  <Label htmlFor="file-title">{t('title')} *</Label>
                  <Input
                    id="file-title"
                    value={fileForm.title}
                    onChange={(e) => setFileForm(prev => ({ ...prev, title: e.target.value }))}
                    placeholder={t('title')}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="file-artist">{t('artist')}</Label>
                  <Input
                    id="file-artist"
                    value={fileForm.artist}
                    onChange={(e) => setFileForm(prev => ({ ...prev, artist: e.target.value }))}
                    placeholder={t('artist')}
                  />
                </div>

                <div>
                  <Label htmlFor="file-category">{t('category')}</Label>
                  <Input
                    id="file-category"
                    value={fileForm.category}
                    onChange={(e) => setFileForm(prev => ({ ...prev, category: e.target.value }))}
                    placeholder={t('category')}
                  />
                </div>

                <div>
                  <Label htmlFor="file-description">描述</Label>
                  <Textarea
                    id="file-description"
                    value={fileForm.description}
                    onChange={(e) => setFileForm(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="输入内容描述（可选）"
                    rows={3}
                  />
                </div>

                <Button type="submit" disabled={isUploading || !fileForm.file} className="w-full">
                  {isUploading ? t('loading') : t('add')}
                </Button>
              </form>
            </TabsContent>

            {/* URL链接标签页 */}
            <TabsContent value="url" className="space-y-4">
              <form onSubmit={handleUrlSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="url-title">{t('title')} *</Label>
                  <Input
                    id="url-title"
                    value={urlForm.title}
                    onChange={(e) => setUrlForm(prev => ({ ...prev, title: e.target.value }))}
                    placeholder={t('title')}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="url-url">{t('fileUrl')} *</Label>
                  <Input
                    id="url-url"
                    value={urlForm.url}
                    onChange={(e) => setUrlForm(prev => ({ ...prev, url: e.target.value }))}
                    placeholder={t('fileUrl')}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="url-type">{t('contentType')} *</Label>
                  <select
                    id="url-type"
                    value={urlForm.content_type}
                    onChange={(e) => setUrlForm(prev => ({ ...prev, content_type: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="audio">{t('audio')}</option>
                    <option value="video">{t('video')}</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="url-artist">{t('artist')}</Label>
                  <Input
                    id="url-artist"
                    value={urlForm.artist}
                    onChange={(e) => setUrlForm(prev => ({ ...prev, artist: e.target.value }))}
                    placeholder={t('artist')}
                  />
                </div>

                <div>
                  <Label htmlFor="url-category">{t('category')}</Label>
                  <Input
                    id="url-category"
                    value={urlForm.category}
                    onChange={(e) => setUrlForm(prev => ({ ...prev, category: e.target.value }))}
                    placeholder={t('category')}
                  />
                </div>

                <div>
                  <Label htmlFor="url-duration">{t('duration')}</Label>
                  <Input
                    id="url-duration"
                    type="number"
                    value={urlForm.duration}
                    onChange={(e) => setUrlForm(prev => ({ ...prev, duration: e.target.value }))}
                    placeholder={t('duration')}
                    min="0"
                  />
                </div>

                <div>
                  <Label htmlFor="url-description">描述</Label>
                  <Textarea
                    id="url-description"
                    value={urlForm.description}
                    onChange={(e) => setUrlForm(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="输入内容描述（可选）"
                    rows={3}
                  />
                </div>

                <Button type="submit" disabled={isUploading || !urlForm.title || !urlForm.url} className="w-full">
                  {isUploading ? t('loading') : t('add')}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">使用说明：</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• <strong>文件上传</strong>：上传本地音频或视频文件到服务器</li>
              <li>• <strong>URL链接</strong>：添加网络上的媒体文件链接（如网盘分享链接）</li>
              <li>• 上传的文件将存储在服务器上，可以通过串流播放</li>
              <li>• URL链接内容需要确保链接有效且可访问</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddContentModal;

