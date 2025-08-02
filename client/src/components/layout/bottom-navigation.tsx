import { useLocation } from "wouter";
import { Home, TrendingUp, Clock, Euro, Menu } from "lucide-react";

export default function BottomNavigation() {
  const [location, setLocation] = useLocation();

  const navItems = [
    { path: "/home", icon: Home, label: "Home" },
    { path: "/trends", icon: TrendingUp, label: "Trend" },
    { path: "/realtime", icon: Clock, label: "Realtime" },
    { path: "/economics", icon: Euro, label: "Economics" },
    { path: "/menu", icon: Menu, label: "Menu" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 max-w-md mx-auto">
      <div className="flex justify-around items-center px-2 py-1">
        {navItems.map(({ path, icon: Icon, label }) => (
          <button
            key={path}
            className={`tab-button flex flex-col items-center py-2 px-2 min-w-0 flex-1 ${
              location === path ? "active" : ""
            }`}
            onClick={() => setLocation(path)}
          >
            <Icon className="h-5 w-5 mb-1" />
            <span className="text-xs whitespace-nowrap">{label}</span>
          </button>
        ))}
      </div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gray-800 rounded-full"></div>
    </nav>
  );
}
