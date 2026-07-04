import React from 'react';

export default function SkeletonCartItem() {
  return (
    <div className="flex gap-4 py-4 border-b border-gray-100 dark:border-gray-700 last:border-b-0 animate-pulse">
      <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
      <div className="flex-1 space-y-2">
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mt-2"></div>
      </div>
    </div>
  );
}
