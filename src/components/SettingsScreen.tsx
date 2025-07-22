import { useState } from 'react';
import { 
  Bell, 
  Moon, 
  Sun, 
  Volume2, 
  VolumeX, 
  Smartphone, 
  MapPin, 
  Clock,
  Palette,
  Shield,
  Download,
  Trash2,
  ChevronRight,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';

interface SettingsScreenProps {
  onBack: () => void;
}

export const SettingsScreen = ({ onBack }: SettingsScreenProps) => {
  const [settings, setSettings] = useState({
    notifications: true,
    sound: true,
    vibration: true,
    darkMode: false,
    locationSharing: true,
    realTimeUpdates: true,
    favoriteRoutes: true,
    arrivalAlerts: true,
    delayNotifications: true,
    lowBatteryMode: false,
    autoRefresh: true,
    offlineMode: false,
    fontSize: [16],
    refreshInterval: [30],
  });

  const toggleSetting = (key: keyof typeof settings) => {
    if (typeof settings[key] === 'boolean') {
      setSettings(prev => ({
        ...prev,
        [key]: !prev[key]
      }));
    }
  };

  const updateSliderSetting = (key: keyof typeof settings, value: number[]) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const settingSections = [
    {
      title: 'Notifications',
      icon: Bell,
      items: [
        { key: 'notifications', label: 'Push Notifications', description: 'Receive alerts and updates' },
        { key: 'arrivalAlerts', label: 'Arrival Alerts', description: 'Get notified when bus arrives' },
        { key: 'delayNotifications', label: 'Delay Notifications', description: 'Alert for service delays' },
        { key: 'sound', label: 'Sound Alerts', description: 'Audio notifications' },
        { key: 'vibration', label: 'Vibration', description: 'Haptic feedback' },
      ]
    },
    {
      title: 'Display & Interface',
      icon: Smartphone,
      items: [
        { key: 'darkMode', label: 'Dark Mode', description: 'Switch to dark theme' },
        { key: 'lowBatteryMode', label: 'Battery Saver', description: 'Reduce background activity' },
      ]
    },
    {
      title: 'Location & Tracking',
      icon: MapPin,
      items: [
        { key: 'locationSharing', label: 'Location Services', description: 'Enable GPS for better accuracy' },
        { key: 'realTimeUpdates', label: 'Real-time Tracking', description: 'Live bus locations' },
        { key: 'autoRefresh', label: 'Auto Refresh', description: 'Automatically update data' },
      ]
    },
    {
      title: 'Data & Storage',
      icon: Download,
      items: [
        { key: 'offlineMode', label: 'Offline Mode', description: 'Cache data for offline use' },
        { key: 'favoriteRoutes', label: 'Sync Favorites', description: 'Save favorites to cloud' },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-border/20">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={onBack}>
              ←
            </Button>
            <div>
              <h1 className="text-xl font-bold">Settings</h1>
              <p className="text-sm text-muted-foreground">Customize your experience</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6 pb-20">
        {/* User Stats Card */}
        <Card className="bg-gradient-primary text-white border-0">
          <CardHeader>
            <CardTitle className="text-white">Your Transit Stats</CardTitle>
            <CardDescription className="text-white/80">
              This month's activity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">47</div>
                <div className="text-xs text-white/80">Trips</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">12.3</div>
                <div className="text-xs text-white/80">Hours Saved</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">85%</div>
                <div className="text-xs text-white/80">On Time</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Settings Sections */}
        {settingSections.map((section) => (
          <Card key={section.title} className="shadow-soft">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-base">
                <section.icon className="w-5 h-5 text-primary" />
                <span>{section.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {section.items.map((item) => (
                <div key={item.key} className="flex items-center justify-between py-2">
                  <div className="flex-1">
                    <div className="font-medium text-sm">{item.label}</div>
                    <div className="text-xs text-muted-foreground">{item.description}</div>
                  </div>
                  <Switch
                    checked={settings[item.key as keyof typeof settings] as boolean}
                    onCheckedChange={() => toggleSetting(item.key as keyof typeof settings)}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        ))}

        {/* Slider Settings */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-base">
              <Clock className="w-5 h-5 text-primary" />
              <span>Preferences</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="font-medium text-sm">Font Size</div>
                  <div className="text-xs text-muted-foreground">Adjust text readability</div>
                </div>
                <span className="text-sm font-medium">{settings.fontSize[0]}px</span>
              </div>
              <Slider
                value={settings.fontSize}
                onValueChange={(value) => updateSliderSetting('fontSize', value)}
                max={24}
                min={12}
                step={1}
                className="w-full"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="font-medium text-sm">Refresh Interval</div>
                  <div className="text-xs text-muted-foreground">Auto-update frequency</div>
                </div>
                <span className="text-sm font-medium">{settings.refreshInterval[0]}s</span>
              </div>
              <Slider
                value={settings.refreshInterval}
                onValueChange={(value) => updateSliderSetting('refreshInterval', value)}
                max={120}
                min={10}
                step={5}
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-base">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-between" size="lg">
              <div className="flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Download Offline Maps</span>
              </div>
              <ChevronRight className="w-4 h-4" />
            </Button>

            <Button variant="outline" className="w-full justify-between" size="lg">
              <div className="flex items-center space-x-2">
                <Palette className="w-4 h-4" />
                <span>Customize Theme</span>
              </div>
              <ChevronRight className="w-4 h-4" />
            </Button>

            <Button variant="outline" className="w-full justify-between" size="lg">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>Privacy Settings</span>
              </div>
              <ChevronRight className="w-4 h-4" />
            </Button>

            <Button variant="destructive" className="w-full justify-start" size="lg">
              <div className="flex items-center space-x-2">
                <Trash2 className="w-4 h-4" />
                <span>Clear Cache & Data</span>
              </div>
            </Button>
          </CardContent>
        </Card>

        {/* App Info */}
        <Card className="shadow-soft">
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <div className="text-sm font-medium">AUK Bus Tracker</div>
              <div className="text-xs text-muted-foreground">Version 2.1.0 (Build 1247)</div>
              <div className="text-xs text-muted-foreground">
                Last updated: December 2024
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};