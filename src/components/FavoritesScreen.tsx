import { useState } from 'react';
import { Heart, MapPin, Clock, Route as RouteIcon, Star, Trash2, Bell } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

interface FavoritesScreenProps {
  onBack: () => void;
  onSelectFavorite: (favorite: any) => void;
}

interface Favorite {
  id: string;
  type: 'stop' | 'route';
  name: string;
  subtitle: string;
  eta?: string;
  distance: string;
  routes?: string[];
  lastUsed: string;
  notifications: boolean;
}

export const FavoritesScreen = ({ onBack, onSelectFavorite }: FavoritesScreenProps) => {
  const [favorites, setFavorites] = useState<Favorite[]>([
    {
      id: '1',
      type: 'stop',
      name: 'University Main Gate',
      subtitle: 'Most frequently used stop',
      eta: '3 min',
      distance: '0.2 km',
      routes: ['Route A', 'Route B', 'Route C'],
      lastUsed: '2 hours ago',
      notifications: true
    },
    {
      id: '2',
      type: 'route',
      name: 'Route A - Campus Express',
      subtitle: 'Your daily commute route',
      distance: '45 min journey',
      routes: ['Route A'],
      lastUsed: 'Yesterday',
      notifications: true
    },
    {
      id: '3',
      type: 'stop',
      name: 'Student Center',
      subtitle: 'Weekend favorite',
      eta: '7 min',
      distance: '0.5 km',
      routes: ['Route A', 'Route C'],
      lastUsed: '3 days ago',
      notifications: false
    },
    {
      id: '4',
      type: 'stop',
      name: 'Medical Center',
      subtitle: 'Emergency services',
      eta: '18 min',
      distance: '1.5 km',
      routes: ['Route B'],
      lastUsed: '1 week ago',
      notifications: true
    }
  ]);

  const removeFavorite = (id: string) => {
    setFavorites(prev => prev.filter(fav => fav.id !== id));
  };

  const toggleNotifications = (id: string) => {
    setFavorites(prev => prev.map(fav => 
      fav.id === id ? { ...fav, notifications: !fav.notifications } : fav
    ));
  };

  const getIcon = (type: string) => {
    return type === 'stop' ? MapPin : RouteIcon;
  };

  const getIconColor = (type: string) => {
    return type === 'stop' ? 'text-accent' : 'text-primary';
  };

  const getBgColor = (type: string) => {
    return type === 'stop' ? 'bg-accent/10' : 'bg-primary/10';
  };

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
              <h1 className="text-xl font-bold">Favorites</h1>
              <p className="text-sm text-muted-foreground">{favorites.length} saved items</p>
            </div>
          </div>
          <Heart className="w-6 h-6 text-red-500 fill-current" />
        </div>
      </div>

      <div className="p-4 space-y-4 pb-20">
        {favorites.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mb-4">
              <Heart className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No Favorites Yet</h3>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Add your frequently used stops and routes to access them quickly
            </p>
            <Button onClick={onBack}>
              <MapPin className="w-4 h-4 mr-2" />
              Explore Map
            </Button>
          </div>
        ) : (
          /* Favorites List */
          <>
            {/* Quick Stats */}
            <Card className="bg-gradient-to-r from-red-50 to-pink-50 border-red-100">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-red-900">Quick Access</h3>
                    <p className="text-sm text-red-700">Your most used locations</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-red-900">{favorites.length}</div>
                    <div className="text-xs text-red-700">Favorites</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Favorites List */}
            <div className="space-y-3">
              {favorites.map((favorite) => {
                const IconComponent = getIcon(favorite.type);
                return (
                  <Card key={favorite.id} className="shadow-soft hover:shadow-elegant transition-all">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${getBgColor(favorite.type)}`}>
                          <IconComponent className={`w-5 h-5 ${getIconColor(favorite.type)}`} />
                        </div>
                        
                        <div className="flex-1" onClick={() => onSelectFavorite(favorite)}>
                          <div className="flex items-center justify-between cursor-pointer">
                            <div>
                              <div className="flex items-center space-x-2">
                                <h3 className="font-semibold text-foreground">{favorite.name}</h3>
                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              </div>
                              <p className="text-sm text-muted-foreground">{favorite.subtitle}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center space-x-4 text-xs">
                              {favorite.eta && (
                                <div className="flex items-center space-x-1 text-primary">
                                  <Clock className="w-3 h-3" />
                                  <span>{favorite.eta}</span>
                                </div>
                              )}
                              <div className="flex items-center space-x-1 text-muted-foreground">
                                <MapPin className="w-3 h-3" />
                                <span>{favorite.distance}</span>
                              </div>
                              <div className="text-muted-foreground">
                                Last used: {favorite.lastUsed}
                              </div>
                            </div>
                          </div>
                          
                          {favorite.routes && (
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex space-x-1">
                                {favorite.routes.slice(0, 3).map((route) => (
                                  <Badge key={route} variant="secondary" className="text-xs">
                                    {route}
                                  </Badge>
                                ))}
                                {favorite.routes.length > 3 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{favorite.routes.length - 3}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex flex-col space-y-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleNotifications(favorite.id)}
                            className={`p-2 ${favorite.notifications ? 'text-primary' : 'text-muted-foreground'}`}
                          >
                            <Bell className={`w-4 h-4 ${favorite.notifications ? 'fill-current' : ''}`} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFavorite(favorite.id)}
                            className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Add More Section */}
            <Card className="shadow-soft border-dashed border-2 border-muted">
              <CardContent className="p-6 text-center">
                <Heart className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Add More Favorites</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Tap the heart icon on any stop or route to add it to your favorites
                </p>
                <Button variant="outline" onClick={onBack}>
                  <MapPin className="w-4 h-4 mr-2" />
                  Browse Map
                </Button>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};