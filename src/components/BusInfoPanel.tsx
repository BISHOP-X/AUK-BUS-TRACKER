import { X, Heart, Clock, MapPin, Navigation, Route } from 'lucide-react';
import { Button } from './ui/button';

interface BusInfoPanelProps {
  item: {
    id: string;
    name: string;
    eta: string;
    distance: string;
    route?: string;
    nextStop?: string;
  };
  isBus: boolean;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onClose: () => void;
}

export const BusInfoPanel = ({ 
  item, 
  isBus, 
  isFavorite, 
  onToggleFavorite, 
  onClose 
}: BusInfoPanelProps) => {
  return (
    <>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className="absolute bottom-0 left-0 right-0 z-50 animate-slide-up">
        <div className="bg-white/95 backdrop-blur-md rounded-t-3xl shadow-floating border-t border-white/20 p-6 mx-4 mb-4">
          {/* Handle */}
          <div className="w-12 h-1 bg-muted-foreground/30 rounded-full mx-auto mb-6"></div>
          
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  isBus ? 'bg-gradient-primary' : 'bg-gradient-accent'
                }`}>
                  {isBus ? (
                    <Navigation className="w-5 h-5 text-white" />
                  ) : (
                    <MapPin className="w-5 h-5 text-white" />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">{item.name}</h3>
                  {isBus && item.route && (
                    <p className="text-sm text-muted-foreground flex items-center">
                      <Route className="w-3 h-3 mr-1" />
                      {item.route}
                    </p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggleFavorite}
                className={`transition-all duration-300 ${
                  isFavorite 
                    ? 'text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100' 
                    : 'text-muted-foreground hover:text-red-500 hover:bg-red-50'
                }`}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Information Grid */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-3 border border-primary/10">
              <div className="flex items-center space-x-2 mb-1">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-xs font-medium text-primary">ETA</span>
              </div>
              <p className="text-lg font-bold text-foreground">{item.eta}</p>
            </div>
            
            <div className="bg-gradient-to-br from-accent/5 to-accent/10 rounded-xl p-3 border border-accent/10">
              <div className="flex items-center space-x-2 mb-1">
                <MapPin className="w-4 h-4 text-accent" />
                <span className="text-xs font-medium text-accent">Distance</span>
              </div>
              <p className="text-lg font-bold text-foreground">{item.distance}</p>
            </div>
          </div>

          {/* Additional Info for Buses */}
          {isBus && item.nextStop && (
            <div className="bg-gradient-to-r from-muted/30 to-muted/10 rounded-xl p-3 border border-muted">
              <div className="flex items-center space-x-2 mb-1">
                <Navigation className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs font-medium text-muted-foreground">Next Stop</span>
              </div>
              <p className="font-semibold text-foreground">{item.nextStop}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3 mt-6">
            <Button 
              className="flex-1 bg-gradient-primary hover:shadow-soft transition-all duration-300"
              size="lg"
            >
              <MapPin className="w-4 h-4 mr-2" />
              Get Directions
            </Button>
            <Button 
              variant="outline" 
              className="flex-1 border-primary/20 hover:bg-primary/5 transition-all duration-300"
              size="lg"
            >
              <Clock className="w-4 h-4 mr-2" />
              Set Alert
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};