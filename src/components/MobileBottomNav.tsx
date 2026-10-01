import React from 'react';
import { TabType, Language } from '../types';
import { Code2, GitFork, BookOpen, FolderTree, PackageCheck } from 'lucide-react';

interface MobileBottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  language: Language;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  onTabChange,
  language
}) => {
  const tabs: { id: TabType; labelEn: string; labelMy: string; icon: React.ReactNode }[] = [
    {
      id: 'studio',
      labelEn: 'Studio',
      labelMy: 'စတူဒီယို',
      icon: <Code2 width={20} height={20} className="w-5 h-5" aria-hidden="true" />
    },
    {
      id: 'agentloop',
      labelEn: 'Loop',
      labelMy: '၈ ဆင့်',
      icon: <GitFork width={20} height={20} className="w-5 h-5" aria-hidden="true" />
    },
    {
      id: 'manual',
      labelEn: 'Manual',
      labelMy: 'လက်စွဲ',
      icon: <BookOpen width={20} height={20} className="w-5 h-5" aria-hidden="true" />
    },
    {
      id: 'explorer',
      labelEn: 'Tree',
      labelMy: 'ဖွဲ့စည်းပုံ',
      icon: <FolderTree width={20} height={20} className="w-5 h-5" aria-hidden="true" />
    },
    {
      id: 'packaging',
      labelEn: 'Zip Guide',
      labelMy: 'Zip လမ်းညွှန်',
      icon: <PackageCheck width={20} height={20} className="w-5 h-5" aria-hidden="true" />
    }
  ];

  return (
    <nav
      aria-label="Mobile viewport navigation"
      className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-lg border-t border-slate-800/90 pb-safe md:hidden shadow-2xl"
    >
      <div role="tablist" aria-label="Mobile skill studio views" className="grid grid-cols-5 items-center h-14">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`mobtab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              aria-label={`Switch to ${tab.labelEn} tab (${tab.labelMy})`}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center min-h-[44px] py-1 transition-colors relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-inset ${
                isActive
                  ? 'text-cyan-400 font-semibold'
                  : 'text-slate-300 hover:text-slate-100'
              }`}
            >
              {isActive && (
                <span className="absolute top-0 w-8 h-0.5 bg-cyan-400 rounded-full" aria-hidden="true" />
              )}
              <span className="shrink-0">{tab.icon}</span>
              <span className="text-[10px] mt-0.5 truncate max-w-[60px]">
                {language === 'my' ? tab.labelMy : tab.labelEn}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
