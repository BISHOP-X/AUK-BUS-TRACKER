import { useState, useEffect, useRef } from 'react';
import { MapPin, Navigation, Clock, Heart } from 'lucide-react';
import { BusInfoPanel } from './BusInfoPanel';

interface BusStop {
  id: string;
  name: string;
  lat: number;
  lng: number;
  eta: string;
  distance: string;
}

interface Bus {
  id: string;
  name: string;
  route: string;
  lat: number;
  lng: number;
  eta: string;
  distance: string;
  nextStop: string;
}

const busStops: BusStop[] = [
  { id: '1', name: 'University Main Gate', lat: 40.7128, lng: -74.0060, eta: '3 min', distance: '0.2 km' },
  { id: '2', name: 'Student Center', lat: 40.7150, lng: -74.0040, eta: '7 min', distance: '0.5 km' },
  { id: '3', name: 'Library Plaza', lat: 40.7170, lng: -74.0020, eta: '12 min', distance: '0.8 km' },
  { id: '4', name: 'Sports Complex', lat: 40.7190, lng: -74.0000, eta: '15 min', distance: '1.2 km' },
  { id: '5', name: 'Medical Center', lat: 40.7210, lng: -73.9980, eta: '18 min', distance: '1.5 km' },
];

const buses: Bus[] = [
  { id: 'bus-1', name: 'Campus Express', route: 'Route A', lat: 40.7140, lng: -74.0050, eta: '5 min', distance: '0.3 km', nextStop: 'Student Center' },
  { id: 'bus-2', name: 'Medical Shuttle', route: 'Route B', lat: 40.7180, lng: -74.0010, eta: '8 min', distance: '0.7 km', nextStop: 'Sports Complex' },
];

export const BusMap = () => {
  const [selectedItem, setSelectedItem] = useState<(BusStop | Bus) | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const mapRef = useRef<HTMLDivElement>(null);

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('bus-tracker-favorites');
    if (savedFavorites) {
      setFavorites(new Set(JSON.parse(savedFavorites)));
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('bus-tracker-favorites', JSON.stringify([...favorites]));
  }, [favorites]);

  const toggleFavorite = (id: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const handleItemClick = (item: BusStop | Bus) => {
    setSelectedItem(item);
  };

  const handleClosePanel = () => {
    setSelectedItem(null);
  };

  const isBus = (item: BusStop | Bus): item is Bus => {
    return 'route' in item;
  };

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-blue-50 to-blue-100 overflow-hidden">
      {/* Map Container */}
      <div 
        ref={mapRef}
        className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(249, 115, 22, 0.05) 0%, transparent 50%),
            linear-gradient(135deg, rgba(59, 130, 246, 0.02) 0%, rgba(249, 115, 22, 0.02) 100%)
          `
        }}
      >
        {/* Simulated Street Grid */}
        <div className="absolute inset-0 opacity-10">
          {/* Horizontal lines */}
          {[20, 35, 50, 65, 80].map((top) => (
            <div 
              key={`h-${top}`} 
              className="absolute w-full h-px bg-gray-400" 
              style={{ top: `${top}%` }}
            />
          ))}
          {/* Vertical lines */}
          {[15, 30, 45, 60, 75].map((left) => (
            <div 
              key={`v-${left}`} 
              className="absolute h-full w-px bg-gray-400" 
              style={{ left: `${left}%` }}
            />
          ))}
        </div>

        {/* Bus Route Line */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <path
            d="M 10% 70% Q 30% 40% 50% 50% T 90% 30%"
            fill="none"
            stroke="hsl(var(--bus-route))"
            strokeWidth="3"
            strokeDasharray="10,5"
            className="animate-pulse"
          />
        </svg>

        {/* Bus Stops */}
        {busStops.map((stop, index) => (
          <div
            key={stop.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            style={{
              left: `${20 + index * 15}%`,
              top: `${60 - index * 8}%`
            }}
            onClick={() => handleItemClick(stop)}
          >
            <div className="relative">
              <div className="w-4 h-4 bg-accent rounded-full shadow-soft border-2 border-white group-hover:scale-125 transition-all duration-300">
                <div className="absolute inset-0 bg-accent rounded-full animate-ping opacity-30"></div>
              </div>
              <MapPin className="absolute -top-1 -left-1 w-6 h-6 text-accent drop-shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md shadow-soft text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
                {stop.name}
              </div>
            </div>
          </div>
        ))}

        {/* Moving Buses */}
        {buses.map((bus, index) => (
          <div
            key={bus.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            style={{
              left: `${25 + index * 25}%`,
              top: `${50 + index * 10}%`,
              animation: `bus-move 20s linear infinite`,
              animationDelay: `${index * 10}s`
            }}
            onClick={() => handleItemClick(bus)}
          >
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg shadow-elegant border-2 border-white flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                <Navigation className="w-4 h-4 text-white" />
                <div className="absolute inset-0 bg-primary/20 rounded-lg animate-pulse"></div>
              </div>
              <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-elegant text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
                <div className="font-semibold text-primary">{bus.name}</div>
                <div className="text-muted-foreground">{bus.route}</div>
              </div>
            </div>
          </div>
        ))}

        {/* Floating Header */}
        <div className="absolute top-4 left-4 right-4 bg-white/80 backdrop-blur-md rounded-2xl shadow-elegant p-4 border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-foreground">AUK Bus Tracker</h1>
              <p className="text-muted-foreground text-sm">Real-time bus locations</p>
            </div>
            <div className="flex items-center space-x-2 text-primary">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Live</span>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-md rounded-xl shadow-soft p-3 border border-white/20">
          <div className="flex items-center space-x-4 text-xs">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-accent rounded-full"></div>
              <span>Bus Stop</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-primary rounded"></div>
              <span>Bus</span>
            </div>
          </div>
        </div>
      </div>

      {/* Information Panel */}
      {selectedItem && (
        <BusInfoPanel
          item={selectedItem}
          isBus={isBus(selectedItem)}
          isFavorite={favorites.has(selectedItem.id)}
          onToggleFavorite={() => toggleFavorite(selectedItem.id)}
          onClose={handleClosePanel}
        />
      )}
    </div>
  );
};