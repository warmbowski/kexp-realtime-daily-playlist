import { parseISO } from 'date-fns';
import type { Play } from '../api/kexp';

interface YearDistributionProps {
  plays: Play[];
  selectedDecade: string | null;
  onDecadeSelect: (decade: string) => void;
}

export const YearDistribution = ({ plays, selectedDecade, onDecadeSelect }: YearDistributionProps) => {
  const decadeCounts = plays.reduce((acc, play) => {
    if (!play.release_date) return acc;
    try {
      const year = parseISO(play.release_date).getFullYear();
      const decade = `${Math.floor(year / 10) * 10}s`;
      acc[decade] = (acc[decade] || 0) + 1;
      return acc;
    } catch {
      return acc;
    }
  }, {} as Record<string, number>);

  const sortedDecades = Object.entries(decadeCounts)
    .sort(([decadeA], [decadeB]) => {
      const yearA = parseInt(decadeA);
      const yearB = parseInt(decadeB);
      return yearA - yearB;
    });

  const total = Object.values(decadeCounts).reduce((sum, count) => sum + count, 0);

  const getColor = (index: number, isSelected: boolean) => {
    const colors = [
      'bg-blue-600', 'bg-indigo-600', 'bg-violet-600', 'bg-purple-600',
      'bg-fuchsia-600', 'bg-pink-600', 'bg-rose-600', 'bg-red-600'
    ];
    const baseColor = colors[index % colors.length];
    return isSelected ? baseColor.replace('-600', '-400') : baseColor;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Music by Decade</h2>
      <div className="space-y-4">
        <div className="h-10 flex rounded-lg overflow-hidden">
          {sortedDecades.map(([decade, count], index) => {
            const width = (count / total) * 100;
            const isSelected = selectedDecade === decade;
            return (
              <div
                key={decade}
                onClick={() => onDecadeSelect(decade)}
                className={`
                  ${getColor(index, isSelected)} 
                  relative group cursor-pointer transition-all duration-200 
                  hover:brightness-110 hover:z-10
                  ${isSelected ? 'ring-2 ring-offset-2 ring-blue-500' : ''}
                `}
                style={{ width: `${width}%` }}
              >
                <div className="opacity-0 group-hover:opacity-100 absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-1.5 rounded text-sm whitespace-nowrap shadow-lg z-20">
                  <div className="font-medium">{decade}</div>
                  <div className="text-gray-200 text-xs">
                    {count} {count === 1 ? 'song' : 'songs'} ({Math.round(width)}%)
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex flex-wrap gap-4 justify-center">
          {sortedDecades.map(([decade, count], index) => {
            const isSelected = selectedDecade === decade;
            return (
              <button
                key={decade}
                onClick={() => onDecadeSelect(decade)}
                className={`
                  flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors
                  ${isSelected 
                    ? 'bg-gray-100 ring-2 ring-blue-500' 
                    : 'bg-gray-50 hover:bg-gray-100'
                  }
                `}
              >
                <div className={`w-3 h-3 rounded-full ${getColor(index, isSelected)}`} />
                <span className="text-sm text-gray-700 font-medium">
                  {decade}
                </span>
                <span className="text-sm text-gray-500">
                  ({count})
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}