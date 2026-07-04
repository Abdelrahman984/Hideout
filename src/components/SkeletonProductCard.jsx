import React from 'react';

export default function SkeletonProductCard() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 p-4 animate-pulse">
      <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-xl mb-4"></div>
      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
      <div className="flex gap-2">
        <div className="h-9 bg-gray-200 dark:bg-gray-700 rounded-lg flex-1"></div>
        <div className="h-9 bg-gray-200 dark:bg-gray-700 rounded-lg flex-1"></div>
      </div>
    </div>
  );
}
