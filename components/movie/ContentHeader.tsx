'use client';

import { Star } from 'lucide-react';

interface MetadataItem {
  label: string;
  value: string | number;
  icon?: 'star';
}

interface Badge {
  id: string | number;
  label: string;
}

interface ContentHeaderProps {
  title: string;
  subtitle?: string;
  metadata?: MetadataItem[];
  badges?: Badge[];
}

export function ContentHeader({ title, subtitle, metadata = [], badges = [] }: ContentHeaderProps) {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-2">{title}</h1>
      {subtitle && (
        <p className="text-xl text-gray-300 italic mb-4">{subtitle}</p>
      )}

      {(metadata.length > 0 || badges.length > 0) && (
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-4">
          {metadata.map((item, index) => (
            <div key={index} className="flex items-center gap-1">
              {item.icon === 'star' && <Star className="w-4 h-4 text-primary fill-current" />}
              <span>{item.value}</span>
            </div>
          ))}

          {badges.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {badges.map((badge) => (
                <span
                  key={badge.id}
                  className="px-3 py-1 bg-gray-700 rounded-full text-sm text-gray-300"
                >
                  {badge.label}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
