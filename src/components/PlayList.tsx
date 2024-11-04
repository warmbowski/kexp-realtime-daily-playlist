import { format, parseISO } from 'date-fns';
import { Music } from 'lucide-react';
import type { Play } from '../api/kexp';

interface PlayListProps {
  plays: Play[];
}

const formatHour = (date: string) => {
  try {
    const parsedDate = parseISO(date);
    return format(parsedDate, 'h a').replace(':00', '') + ' Hour';
  } catch {
    return 'Unknown Time';
  }
};

const getDecadeColor = (date: string | undefined) => {
  if (!date) return '';
  try {
    const year = parseISO(date).getFullYear();
    const decadeIndex = Math.floor((year % 2000) / 10);
    const colors = [
      'bg-blue-600',
      'bg-indigo-600',
      'bg-violet-600',
      'bg-purple-600',
      'bg-fuchsia-600',
      'bg-pink-600',
      'bg-rose-600',
      'bg-red-600'
    ];
    return colors[decadeIndex % colors.length];
  } catch {
    return '';
  }
};

const formatYear = (date: string | undefined) => {
  if (!date) return null;
  try {
    return format(parseISO(date), 'yyyy');
  } catch {
    return null;
  }
};

export const PlayList = ({ plays }: PlayListProps) => {
  const playsByHour = plays.reduce((acc, play) => {
    const hour = formatHour(play.airdate);
    if (!acc[hour]) acc[hour] = [];
    acc[hour].push(play);
    return acc;
  }, {} as Record<string, Play[]>);

  return (
    <div className="space-y-8">
      {Object.entries(playsByHour).map(([hour, hourPlays]) => (
        <div key={hour} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">{hour}</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {hourPlays.map((play) => (
              <div key={play.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex gap-6">
                  {play.thumbnail_uri ? (
                    <img
                      src={play.thumbnail_uri}
                      alt={`${play.artist} - ${play.song}`}
                      className="w-20 h-20 object-cover rounded-lg shadow-sm flex-shrink-0"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Music className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <h3 className="text-lg font-medium text-gray-900 truncate">{play.song}</h3>
                        <p className="text-gray-600">{play.artist}</p>
                        <p className="text-sm text-gray-500">
                          {play.album} • {play.label}
                        </p>
                      </div>
                      {play.release_date && (
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <div className={`w-3 h-3 rounded-full ${getDecadeColor(play.release_date)}`} />
                          <span className="text-sm text-gray-500">
                            Released: {formatYear(play.release_date)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};