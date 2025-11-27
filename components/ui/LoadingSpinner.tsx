interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-4',
    lg: 'h-12 w-12 border-4'
  };

  return (
    <div className="relative">
      {/* Outer glow ring */}
      <div className={`absolute inset-0 rounded-full border-4 border-primary/20 animate-pulse ${sizeClasses[size]}`} />

      {/* Main spinner */}
      <div className={`animate-spin rounded-full border-border border-t-primary shadow-lg shadow-primary/20 ${sizeClasses[size]} ${className}`}></div>

      {/* Inner accent */}
      <div className={`absolute inset-2 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 animate-pulse ${size === 'sm' ? 'inset-1' : size === 'md' ? 'inset-2' : 'inset-3'}`}></div>
    </div>
  );
}
