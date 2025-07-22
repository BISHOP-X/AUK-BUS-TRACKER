import { useState } from 'react';
import { Search, Clock, MapPin, Navigation, Star, Route as RouteIcon, Filter, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

interface SearchScreenProps {
  onBack: () => void;
  onSelectResult: (result: any) => void;
}

interface SearchResult {
  id: string;
  type: 'stop' | 'route' | 'address';
  name: string;
  subtitle: string;
  eta?: string;
  distance: string;
  routes?: string[];
  isFavorite?: boolean;
}

export const SearchScreen = ({ onBack, onSelectResult }: SearchScreenProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const recentSearches = [
    'University Main Gate',
    'Student Center',
    'Medical Center',
    'Sports Complex'
  ];

  const popularDestinations = [
    { name: 'Auckland CBD', subtitle: 'Downtown Area', distance: '12 km', routes: ['Route A', 'Route B'] },
    { name: 'Airport Terminal', subtitle: 'International & Domestic', distance: '25 km', routes: ['Airport Express'] },
    { name: 'Sylvia Park', subtitle: 'Shopping Centre', distance: '8 km', routes: ['Route C'] },
    { name: 'Newmarket', subtitle: 'Transport Hub', distance: '6 km', routes: ['Route A', 'Route D'] },
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length > 2) {
      setIsSearching(true);
      // Simulate search results
      setTimeout(() => {
        const mockResults: SearchResult[] = [
          {
            id: '1',
            type: 'stop',
            name: 'University Main Gate',
            subtitle: 'Bus Stop • 5 routes available',
            eta: '3 min',
            distance: '0.2 km',
            routes: ['Route A', 'Route B', 'Route C'],
            isFavorite: true
          },
          {
            id: '2',
            type: 'route',
            name: 'Route A - Campus Express',
            subtitle: 'University → CBD → Airport',
            distance: '45 min journey',
            routes: ['Route A']
          },
          {
            id: '3',
            type: 'address',
            name: '123 Queen Street, Auckland CBD',
            subtitle: 'Downtown Auckland',
            distance: '12 km',
            routes: ['Route A', 'Route B']
          },
          {
            id: '4',
            type: 'stop',
            name: 'Student Center Plaza',
            subtitle: 'Bus Stop • 3 routes available',
            eta: '7 min',
            distance: '0.5 km',
            routes: ['Route A', 'Route C']
          }
        ];
        setSearchResults(mockResults);
        setIsSearching(false);
      }, 800);
    } else {
      setSearchResults([]);
    }
  };

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'stop':
        return MapPin;
      case 'route':
        return RouteIcon;
      case 'address':
        return Navigation;
      default:
        return MapPin;
    }
  };

  const getResultColor = (type: string) => {
    switch (type) {
      case 'stop':
        return 'text-accent';
      case 'route':
        return 'text-primary';
      case 'address':
        return 'text-muted-foreground';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-border/20">
        <div className="p-4">
          <div className="flex items-center space-x-3 mb-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              ←
            </Button>
            <div>
              <h1 className="text-xl font-bold">Search & Plan</h1>
              <p className="text-sm text-muted-foreground">Find stops, routes & destinations</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search stops, routes, or addresses..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 pr-12 h-12 bg-muted/30 border-muted"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSearch('')}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
              >
                ×
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6 pb-20">
        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-lg font-semibold flex items-center">
              Search Results
              {isSearching && (
                <div className="ml-2 w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              )}
            </h2>
            
            {searchResults.map((result) => {
              const IconComponent = getResultIcon(result.type);
              return (
                <Card key={result.id} className="shadow-soft hover:shadow-elegant transition-all cursor-pointer">
                  <CardContent className="p-4" onClick={() => onSelectResult(result)}>
                    <div className="flex items-start space-x-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        result.type === 'stop' ? 'bg-accent/10' : 
                        result.type === 'route' ? 'bg-primary/10' : 'bg-muted/50'
                      }`}>
                        <IconComponent className={`w-5 h-5 ${getResultColor(result.type)}`} />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center space-x-2">
                              <h3 className="font-semibold text-foreground">{result.name}</h3>
                              {result.isFavorite && (
                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{result.subtitle}</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-muted-foreground" />
                        </div>
                        
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center space-x-4 text-xs">
                            {result.eta && (
                              <div className="flex items-center space-x-1 text-primary">
                                <Clock className="w-3 h-3" />
                                <span>{result.eta}</span>
                              </div>
                            )}
                            <div className="flex items-center space-x-1 text-muted-foreground">
                              <MapPin className="w-3 h-3" />
                              <span>{result.distance}</span>
                            </div>
                          </div>
                          
                          {result.routes && (
                            <div className="flex space-x-1">
                              {result.routes.slice(0, 2).map((route) => (
                                <Badge key={route} variant="secondary" className="text-xs">
                                  {route}
                                </Badge>
                              ))}
                              {result.routes.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{result.routes.length - 2}
                                </Badge>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Recent Searches */}
        {searchQuery === '' && (
          <>
            <div className="space-y-3">
              <h2 className="text-lg font-semibold flex items-center">
                <Clock className="w-5 h-5 mr-2 text-primary" />
                Recent Searches
              </h2>
              
              {recentSearches.map((search, index) => (
                <Card key={index} className="shadow-soft hover:shadow-elegant transition-all cursor-pointer">
                  <CardContent className="p-3" onClick={() => handleSearch(search)}>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-muted/50 rounded-lg flex items-center justify-center">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <span className="text-foreground">{search}</span>
                      <div className="flex-1"></div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Popular Destinations */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold flex items-center">
                <Star className="w-5 h-5 mr-2 text-accent" />
                Popular Destinations
              </h2>
              
              {popularDestinations.map((destination, index) => (
                <Card key={index} className="shadow-soft hover:shadow-elegant transition-all cursor-pointer">
                  <CardContent className="p-4" onClick={() => onSelectResult(destination)}>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
                        <Navigation className="w-5 h-5 text-accent" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-foreground">{destination.name}</h3>
                            <p className="text-sm text-muted-foreground">{destination.subtitle}</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-muted-foreground" />
                        </div>
                        
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            <span>{destination.distance}</span>
                          </div>
                          
                          <div className="flex space-x-1">
                            {destination.routes.slice(0, 2).map((route) => (
                              <Badge key={route} variant="secondary" className="text-xs">
                                {route}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <Card className="shadow-soft bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Route Planner</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Plan your journey with real-time schedules and transfers
                </p>
                <Button className="w-full" size="lg">
                  <RouteIcon className="w-4 h-4 mr-2" />
                  Plan My Journey
                </Button>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};