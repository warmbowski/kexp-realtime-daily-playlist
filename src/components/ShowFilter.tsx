import { format, parseISO } from 'date-fns';
import type { Show } from '../api/kexp';

interface ShowFilterProps {
  shows: Show[];
  selectedShowId: string | null;
  selectedHost: string | null;
  onShowSelect: (showId: string | null) => void;
  onHostSelect: (host: string | null) => void;
}

export const ShowFilter = ({
  shows,
  selectedShowId,
  selectedHost,
  onShowSelect,
  onHostSelect,
}: ShowFilterProps) => {
  const allHosts = Array.from(
    new Set(shows.flatMap(show => show.host_names))
  ).sort();

  const formatTime = (time: string) => {
    try {
      return format(parseISO(time), 'h:mm a');
    } catch {
      return time;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Filter by Show or Host</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Shows
          </label>
          <div className="flex flex-wrap gap-2">
            {selectedShowId && (
              <button
                onClick={() => onShowSelect(null)}
                className="text-sm px-2 py-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              >
                Clear show filter
              </button>
            )}
            {shows.map((show) => (
              <button
                key={show.id}
                onClick={() => onShowSelect(show.id)}
                className={`
                  px-3 py-1.5 rounded-full text-sm transition-colors
                  ${selectedShowId === show.id
                    ? 'bg-blue-100 text-blue-800 ring-2 ring-blue-500'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }
                `}
              >
                {show.program_name}
                <span className="text-xs text-gray-500 ml-1">
                  ({formatTime(show.start_time)})
                </span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hosts
          </label>
          <div className="flex flex-wrap gap-2">
            {selectedHost && (
              <button
                onClick={() => onHostSelect(null)}
                className="text-sm px-2 py-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              >
                Clear host filter
              </button>
            )}
            {allHosts.map((host) => (
              <button
                key={host}
                onClick={() => onHostSelect(host)}
                className={`
                  px-3 py-1.5 rounded-full text-sm transition-colors
                  ${selectedHost === host
                    ? 'bg-purple-100 text-purple-800 ring-2 ring-purple-500'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }
                `}
              >
                {host}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};