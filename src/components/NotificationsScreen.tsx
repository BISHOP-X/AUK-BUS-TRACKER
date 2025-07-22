import { useState } from 'react';
import { Bell, X, Clock, MapPin, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

interface NotificationsScreenProps {
  onBack: () => void;
}

interface Notification {
  id: string;
  type: 'delay' | 'arrival' | 'service' | 'info';
  title: string;
  message: string;
  time: string;
  route?: string;
  stop?: string;
  isRead: boolean;
  priority: 'high' | 'medium' | 'low';
}

export const NotificationsScreen = ({ onBack }: NotificationsScreenProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'delay',
      title: 'Route A Delayed',
      message: 'Bus running 8 minutes late due to traffic congestion on Queen Street',
      time: '5 minutes ago',
      route: 'Route A',
      stop: 'University Main Gate',
      isRead: false,
      priority: 'high'
    },
    {
      id: '2',
      type: 'arrival',
      title: 'Bus Arriving Soon',
      message: 'Campus Express arriving at Student Center in 2 minutes',
      time: '10 minutes ago',
      route: 'Route A',
      stop: 'Student Center',
      isRead: false,
      priority: 'medium'
    },
    {
      id: '3',
      type: 'service',
      title: 'Service Update',
      message: 'Route B will have reduced frequency this weekend due to maintenance',
      time: '2 hours ago',
      route: 'Route B',
      isRead: true,
      priority: 'medium'
    },
    {
      id: '4',
      type: 'info',
      title: 'New Route Available',
      message: 'Route D now serves the new Science Building. Check updated schedules.',
      time: '1 day ago',
      route: 'Route D',
      isRead: true,
      priority: 'low'
    },
    {
      id: '5',
      type: 'delay',
      title: 'Temporary Stop Closure',
      message: 'Library Plaza stop closed until 3 PM due to construction',
      time: '2 days ago',
      stop: 'Library Plaza',
      isRead: true,
      priority: 'high'
    }
  ]);

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === id ? { ...notif, isRead: true } : notif
    ));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, isRead: true })));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'delay':
        return AlertTriangle;
      case 'arrival':
        return Clock;
      case 'service':
        return Info;
      case 'info':
        return Info;
      default:
        return Bell;
    }
  };

  const getNotificationColor = (type: string, priority: string) => {
    if (priority === 'high') return 'text-red-500';
    if (type === 'arrival') return 'text-green-500';
    if (type === 'delay') return 'text-orange-500';
    return 'text-blue-500';
  };

  const getNotificationBg = (type: string, priority: string) => {
    if (priority === 'high') return 'bg-red-50 border-red-200';
    if (type === 'arrival') return 'bg-green-50 border-green-200';
    if (type === 'delay') return 'bg-orange-50 border-orange-200';
    return 'bg-blue-50 border-blue-200';
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

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
              <h1 className="text-xl font-bold">Notifications</h1>
              <p className="text-sm text-muted-foreground">
                {unreadCount > 0 ? `${unreadCount} unread messages` : 'All caught up!'}
              </p>
            </div>
          </div>
          <div className="relative">
            <Bell className="w-6 h-6 text-primary" />
            {unreadCount > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold">{unreadCount}</span>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        {notifications.length > 0 && (
          <div className="px-4 pb-4">
            <div className="flex space-x-2">
              {unreadCount > 0 && (
                <Button variant="outline" size="sm" onClick={markAllAsRead}>
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Mark All Read
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={clearAllNotifications}>
                <X className="w-4 h-4 mr-1" />
                Clear All
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 space-y-4 pb-20">
        {notifications.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mb-4">
              <Bell className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No Notifications</h3>
            <p className="text-muted-foreground mb-6 max-w-sm">
              You're all caught up! We'll notify you of any important updates about your routes and stops.
            </p>
            <Button onClick={onBack}>
              <MapPin className="w-4 h-4 mr-2" />
              Back to Map
            </Button>
          </div>
        ) : (
          /* Notifications List */
          <div className="space-y-3">
            {notifications.map((notification) => {
              const IconComponent = getNotificationIcon(notification.type);
              return (
                <Card 
                  key={notification.id} 
                  className={`shadow-soft transition-all ${
                    !notification.isRead ? getNotificationBg(notification.type, notification.priority) : ''
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        notification.priority === 'high' ? 'bg-red-100' :
                        notification.type === 'arrival' ? 'bg-green-100' :
                        notification.type === 'delay' ? 'bg-orange-100' : 'bg-blue-100'
                      }`}>
                        <IconComponent className={`w-5 h-5 ${getNotificationColor(notification.type, notification.priority)}`} />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className={`font-semibold ${!notification.isRead ? 'text-foreground' : 'text-muted-foreground'}`}>
                                {notification.title}
                              </h3>
                              {!notification.isRead && (
                                <div className="w-2 h-2 bg-primary rounded-full"></div>
                              )}
                              {notification.priority === 'high' && (
                                <Badge variant="destructive" className="text-xs">
                                  Urgent
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {notification.message}
                            </p>
                            
                            <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                              <span>{notification.time}</span>
                              {notification.route && (
                                <Badge variant="outline" className="text-xs">
                                  {notification.route}
                                </Badge>
                              )}
                              {notification.stop && (
                                <div className="flex items-center space-x-1">
                                  <MapPin className="w-3 h-3" />
                                  <span>{notification.stop}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex space-x-1 ml-2">
                            {!notification.isRead && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => markAsRead(notification.id)}
                                className="p-1 h-8 w-8"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteNotification(notification.id)}
                              className="p-1 h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Notification Settings */}
        <Card className="shadow-soft border-dashed border-2 border-muted">
          <CardHeader>
            <CardTitle className="text-base flex items-center">
              <Bell className="w-5 h-5 mr-2 text-primary" />
              Notification Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Customize which notifications you receive and how you're alerted
            </p>
            <Button variant="outline" className="w-full">
              Manage Notification Preferences
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};