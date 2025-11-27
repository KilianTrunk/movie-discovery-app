interface MovieOverviewProps {
  overview: string;
}

export function MovieOverview({ overview }: MovieOverviewProps) {
  if (!overview) return null;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Overview</h2>
      <p className="text-gray-300 leading-relaxed">{overview}</p>
    </div>
  );
}
