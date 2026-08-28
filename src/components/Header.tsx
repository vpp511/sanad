import React from 'react';
import { ArrowRight, ArrowLeft, User, Smartphone, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  title: string;
  onBack?: () => void;
  showBack?: boolean;
  onProfileClick: () => void;
  activeTab: string;
  onTabChange: (tab: 'pairing' | 'dashboard') => void;
  deviceCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  onBack,
  showBack = true,
  onProfileClick,
  activeTab,
  onTabChange,
  deviceCount,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 glass-header border-b border-[#e4e1ec]/60 shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
      <div className="h-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4">
        {/* Right side in RTL: Back or Navigation */}
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
          {showBack && onBack ? (
            <button
              onClick={onBack}
              className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center text-[#1b1b23] rounded-full hover:bg-[#eae6f2] active:scale-95 transition-all flex-shrink-0"
              title="رجوع"
              aria-label="رجوع"
            >
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-[#1b1b23]" />
            </button>
          ) : (
            <div className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full bg-[#e2dfff] text-[#4f4bce] flex-shrink-0">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
          )}
          
          <h1 className="font-tajawal text-lg sm:text-xl font-bold text-[#1b1b23] tracking-tight truncate">
            {title}
          </h1>
        </div>

        {/* Center / Navigation Pills */}
        <div className="flex items-center bg-[#eae6f2]/80 p-1 rounded-full border border-[#c7c4d6]/40 text-xs font-semibold">
          <button
            onClick={() => onTabChange('pairing')}
            className={`min-h-[36px] px-2.5 sm:px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
              activeTab === 'pairing'
                ? 'bg-[#4f4bce] text-white shadow-sm'
                : 'text-[#464554] hover:text-[#1b1b23]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="hidden xs:inline">إقران</span> QR
          </button>
          <button
            onClick={() => onTabChange('dashboard')}
            className={`min-h-[36px] px-2.5 sm:px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
              activeTab === 'dashboard'
                ? 'bg-[#4f4bce] text-white shadow-sm'
                : 'text-[#464554] hover:text-[#1b1b23]'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>الأجهزة ({deviceCount})</span>
          </button>
        </div>

        {/* Left side in RTL: Profile Button */}
        <button
          onClick={onProfileClick}
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#4f4bce] hover:bg-[#3630b6] text-white flex items-center justify-center shadow-xs active:scale-95 transition-all flex-shrink-0"
          title="الملف الشخصي وإعدادات ولي الأمر"
          aria-label="الملف الشخصي"
        >
          <User className="w-5 h-5 text-white" />
        </button>
      </div>
    </header>
  );
};
