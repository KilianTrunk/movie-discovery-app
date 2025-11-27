'use client';

import { AlertTriangle } from 'lucide-react';

interface ErrorMessageProps {
  title?: string;
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function ErrorMessage({
  title = 'Oops! Something went wrong',
  message,
  action,
  className = ''
}: ErrorMessageProps) {
  return (
    <div className={`text-center text-text ${className}`}>
      <div className="mb-6">
        <AlertTriangle className="mx-auto h-24 w-24 text-red-400" />
      </div>

      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <p className="text-text-muted mb-6">{message}</p>

      {action && (
        <button
          onClick={action.onClick}
          className="bg-primary hover:bg-primary-hover px-6 py-3 rounded-lg font-medium transition-colors text-bg"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
