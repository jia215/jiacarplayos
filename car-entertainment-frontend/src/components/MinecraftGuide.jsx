import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { X, Server, Globe, Gamepad2, Settings, Shield } from 'lucide-react';

const MinecraftGuide = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-4xl mx-4 max-h-[90vh] overflow-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-bold flex items-center">
            <Gamepad2 className="h-6 w-6 mr-2" />
            Minecraft 访问指南
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 概述 */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">概述</h3>
            <p className="text-blue-700">
              通过cpolar内网穿透服务，您可以在美国访问位于中国的Minecraft服务器，实现跨地域游戏体验。
              本指南将详细说明如何配置和连接。
            </p>
          </div>

          {/* 服务器端配置 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Server className="h-5 w-5 mr-2" />
                服务器端配置（中国）
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h4 className="font-semibold">1. 确保Minecraft服务器运行</h4>
                <div className="bg-gray-100 p-3 rounded font-mono text-sm">
                  <p>默认端口：25565</p>
                  <p>确保服务器配置文件中 server-ip= 为空或设置为 0.0.0.0</p>
                </div>
                
                <h4 className="font-semibold">2. 配置cpolar隧道</h4>
                <div className="bg-gray-100 p-3 rounded font-mono text-sm">
                  <p>cpolar tcp 25565</p>
                </div>
                <p className="text-sm text-gray-600">
                  执行后，cpolar会分配一个公网地址和端口，例如：tcp://xxx.cpolar.io:12345
                </p>

                <h4 className="font-semibold">3. 防火墙设置</h4>
                <ul className="list-disc list-inside text-sm space-y-1">
                  <li>确保Windows防火墙允许Minecraft服务器通过</li>
                  <li>允许端口25565的入站连接</li>
                  <li>如果使用路由器，可能需要端口转发设置</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* 客户端连接 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Globe className="h-5 w-5 mr-2" />
                客户端连接（美国）
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h4 className="font-semibold">1. 获取连接信息</h4>
                <p className="text-sm">从cpolar获得的地址格式：tcp://xxx.cpolar.io:12345</p>
                
                <h4 className="font-semibold">2. 在Minecraft中添加服务器</h4>
                <ol className="list-decimal list-inside text-sm space-y-1">
                  <li>打开Minecraft客户端</li>
                  <li>选择"多人游戏"</li>
                  <li>点击"添加服务器"</li>
                  <li>服务器名称：自定义名称</li>
                  <li>服务器地址：xxx.cpolar.io:12345（去掉tcp://前缀）</li>
                  <li>点击"完成"</li>
                </ol>

                <h4 className="font-semibold">3. 连接服务器</h4>
                <p className="text-sm">在服务器列表中选择刚添加的服务器，点击"加入服务器"</p>
              </div>
            </CardContent>
          </Card>

          {/* 性能优化 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Settings className="h-5 w-5 mr-2" />
                性能优化建议
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">网络优化</h4>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    <li>使用有线网络连接</li>
                    <li>关闭其他占用带宽的应用</li>
                    <li>选择网络状况良好的时间段</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">游戏设置</h4>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    <li>降低渲染距离</li>
                    <li>关闭不必要的视觉效果</li>
                    <li>使用较低的图形设置</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 注意事项 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Shield className="h-5 w-5 mr-2" />
                注意事项
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <ul className="list-disc list-inside text-sm space-y-2 text-yellow-800">
                  <li><strong>延迟问题：</strong>跨国连接会有较高延迟（通常200-400ms），可能影响游戏体验</li>
                  <li><strong>稳定性：</strong>网络连接可能不如本地稳定，建议定期保存游戏进度</li>
                  <li><strong>带宽消耗：</strong>长时间游戏会消耗较多网络流量</li>
                  <li><strong>时区差异：</strong>注意中美时区差异，合理安排游戏时间</li>
                  <li><strong>安全性：</strong>cpolar隧道是公开的，建议设置服务器白名单</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* 故障排除 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">常见问题排除</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold">无法连接服务器</h4>
                  <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                    <li>检查cpolar隧道是否正常运行</li>
                    <li>确认服务器地址和端口正确</li>
                    <li>检查Minecraft服务器是否启动</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold">连接频繁断开</h4>
                  <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                    <li>检查网络连接稳定性</li>
                    <li>尝试重启cpolar客户端</li>
                    <li>调整Minecraft客户端网络设置</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default MinecraftGuide;

