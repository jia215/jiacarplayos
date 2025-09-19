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
            {t("minecraftGuide")}
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 概述 */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">{t("overview")}</h3>
            <p className="text-blue-700">
              {t("minecraftOverviewDescription")}
            </p>
          </div>

          {/* 服务器端配置 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Server className="h-5 w-5 mr-2" />
                {t("serverConfigurationChina")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h4 className="font-semibold">1. {t("ensureMinecraftServerRunning")}</h4>
                <div className="bg-gray-100 p-3 rounded font-mono text-sm">
                  <p>{t("defaultPort")}: 25565</p>
                  <p>{t("ensureServerConfig")}</p>
                </div>
                
                <h4 className="font-semibold">2. {t("configureCpolarTunnel")}</h4>
                <div className="bg-gray-100 p-3 rounded font-mono text-sm">
                  <p>cpolar tcp 25565</p>
                </div>
                <p className="text-sm text-gray-600">
                  {t("cpolarTunnelDescription")}
                </p>

                <h4 className="font-semibold">3. {t("firewallSettings")}</h4>
                <ul className="list-disc list-inside text-sm space-y-1">
                  <li>{t("allowMinecraftThroughFirewall")}</li>
                  <li>{t("allowPort25565")}</li>
                  <li>{t("portForwardingNeeded")}</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* 客户端连接 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Globe className="h-5 w-5 mr-2" />
                {t("clientConnectionUSA")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h4 className="font-semibold">1. {t("getConnectionInfo")}</h4>
                <p className="text-sm">{t("cpolarAddressFormat")}</p>
                
                <h4 className="font-semibold">2. {t("addServerInMinecraft")}</h4>
                <ol className="list-decimal list-inside text-sm space-y-1">
                  <li>{t("openMinecraftClient")}</li>
                  <li>{t("selectMultiplayer")}</li>
                  <li>{t("clickAddServer")}</li>
                  <li>{t("serverNameCustom")}</li>
                  <li>{t("serverAddressCpolar")}: xxx.cpolar.io:12345 ({t("removeTcpPrefix")})</li>
                  <li>{t("clickDone")}</li>
                </ol>

                <h4 className="font-semibold">3. {t("connectToServer")}</h4>
                <p className="text-sm">{t("selectAndJoinServer")}</p>
              </div>
            </CardContent>
          </Card>

          {/* 性能优化 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Settings className="h-5 w-5 mr-2" />
                {t("performanceOptimization")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">{t("networkOptimization")}</h4>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    <li>{t("useWiredNetwork")}</li>
                    <li>{t("closeOtherApps")}</li>
                    <li>{t("chooseGoodNetworkTime")}</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">{t("gameSettings")}</h4>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    <li>{t("lowerRenderDistance")}</li>
                    <li>{t("disableUnnecessaryVisualEffects")}</li>
                    <li>{t("useLowerGraphicsSettings")}</li>
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
                {t("precautions")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <ul className="list-disc list-inside text-sm space-y-2 text-yellow-800">
                  <li><strong>{t("latencyIssues")}:</strong> {t("latencyDescription")}</li>
                  <li><strong>{t("stability")}:</strong> {t("stabilityDescription")}</li>
                  <li><strong>{t("bandwidthConsumption")}:</strong> {t("bandwidthDescription")}</li>
                  <li><strong>{t("timezoneDifferences")}:</strong> {t("timezoneDescription")}</li>
                  <li><strong>{t("security")}:</strong> {t("securityDescription")}</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* 故障排除 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t("troubleshooting")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold">{t("cannotConnectToServer")}</h4>
                  <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                    <li>{t("checkCpolarTunnel")}</li>
                    <li>{t("confirmServerAddressPort")}</li>
                    <li>{t("checkMinecraftServerStatus")}</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold">{t("frequentDisconnections")}</h4>
                  <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                    <li>{t("checkNetworkStability")}</li>
                    <li>{t("tryRestartCpolarClient")}</li>
                    <li>{t("adjustMinecraftNetworkSettings")}</li>
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

