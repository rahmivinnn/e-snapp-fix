import { Menu, Bell, Plus } from "lucide-react";
import logoImage from "@assets/e snapp logo 1 (1)_1754149374420.png";

interface HeaderProps {
  onMenuClick?: () => void;
  onNotificationClick?: () => void;
  onPlusClick?: () => void;
}

export default function Header({ onMenuClick, onNotificationClick, onPlusClick }: HeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
      {/* Menu hamburger */}
      <button 
        onClick={onMenuClick}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <Menu className="h-5 w-5 text-gray-700" />
      </button>

      {/* Logo */}
      <div className="flex items-center">
        <img 
          src={logoImage} 
          alt="e-snapp" 
          className="h-8 w-auto"
        />
      </div>

      {/* Right icons */}
      <div className="flex items-center gap-2">
        <button 
          onClick={onNotificationClick}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
        >
          <Bell className="h-5 w-5 text-gray-700" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
        </button>
        
        <button 
          onClick={onPlusClick}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <div className="w-5 h-5 border border-gray-700 rounded-full flex items-center justify-center">
            <Plus className="h-3 w-3 text-gray-700" />
          </div>
        </button>
      </div>
    </div>
  );
}