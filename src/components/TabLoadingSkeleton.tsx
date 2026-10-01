import React from 'react';

export const TabLoadingSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 animate-pulse" role="status" aria-label="Loading tab content">
      {/* Top Banner Skeleton */}
      <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl h-28 flex flex-col justify-center space-y-3">
        <div className="h-4 bg-slate-800 rounded w-1/4" />
        <div className="h-3 bg-slate-800/60 rounded w-2/3" />
      </div>

      {/* Grid Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl h-36 flex flex-col justify-between">
            <div className="flex justify-between items-center">
              <div className="h-3 bg-slate-800 rounded w-8" />
              <div className="h-5 w-5 bg-slate-800 rounded" />
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-slate-800 rounded w-3/4" />
              <div className="h-3 bg-slate-800/60 rounded w-full" />
            </div>
            <div className="h-2 bg-slate-800/40 rounded w-1/2" />
          </div>
        ))}
      </div>

      {/* Detail Pane Skeleton */}
      <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl h-64 flex flex-col justify-between">
        <div className="flex justify-between items-center">
          <div className="h-6 bg-slate-800 rounded w-1/3" />
          <div className="h-5 bg-slate-800 rounded w-20" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-32 bg-slate-950/80 rounded-xl" />
          <div className="h-32 bg-slate-950/80 rounded-xl" />
        </div>
      </div>
    </div>
  );
};
