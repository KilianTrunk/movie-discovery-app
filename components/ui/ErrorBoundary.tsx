'use client';

import { ErrorMessage } from './ErrorMessage';

interface ErrorBoundaryProps {
  message: string;
  onRetry: () => void;
}

export function ErrorBoundary({ message, onRetry }: ErrorBoundaryProps) {
  return (
    <ErrorMessage
      message={message}
      action={{ label: 'Try Again', onClick: onRetry }}
    />
  );
}
