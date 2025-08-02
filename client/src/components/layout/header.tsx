interface HeaderProps {
  onNotificationsClick: () => void;
}

export default function Header({ onNotificationsClick }: HeaderProps) {
  return (
    <header className="fixed top-8 left-0 right-0 bg-white z-40 px-4 py-4 flex justify-between items-center shadow-sm">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-sm">e</span>
        </div>
        <span className="text-primary font-bold text-lg">e-snapp</span>
      </div>
      <div className="flex items-center space-x-3">
        <button 
          className="relative p-2 hover:bg-gray-100 rounded-full transition-colors" 
          onClick={onNotificationsClick}
        >
          <i className="fas fa-bell text-gray-600"></i>
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
        </button>
      </div>
    </header>
  );
}
