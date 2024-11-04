import { useEffect, useState } from 'react';
import { fetchPlays, fetchShows, type Play, type Show } from './api/kexp';
import { Header } from './components/Header';
import { LoadingSpinner } from './components/LoadingSpinner';
import { PlayList } from './components/PlayList';
import { ShowFilter } from './components/ShowFilter';
import { YearDistribution } from './components/YearDistribution';

export function App() {
  const [plays, setPlays] = useState<Play[]>([]);
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDecade, setSelectedDecade] = useState<string | null>(null);
  const [selectedShowId, setSelectedShowId] = useState<string | null>(null);
  const [selectedHost, setSelectedHost] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [playsData, showsData] = await Promise.all([
          fetchPlays(),
          fetchShows()
        ]);
        setPlays(playsData.results);
        setShows(showsData.results);
      } catch (err) {
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredPlays = plays.filter(play => {
    // Filter by decade if selected
    if (selectedDecade) {
      if (!play.release_date) return false;
      try {
        const year = new Date(play.release_date).getFullYear();
        const decade = `${Math.floor(year / 10) * 10}s`;
        if (decade !== selectedDecade) return false;
      } catch {
        return false;
      }
    }

    // Filter by show if selected
    if (selectedShowId && play.show !== selectedShowId) {
      return false;
    }

    // Filter by host if selected
    if (selectedHost) {
      const show = shows.find(s => s.id === play.show);
      if (!show?.host_names.includes(selectedHost)) {
        return false;
      }
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {error ? (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg">
            {error}
          </div>
        ) : loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <ShowFilter
              shows={shows}
              selectedShowId={selectedShowId}
              selectedHost={selectedHost}
              onShowSelect={setSelectedShowId}
              onHostSelect={setSelectedHost}
            />
            <YearDistribution 
              plays={plays} 
              selectedDecade={selectedDecade}
              onDecadeSelect={setSelectedDecade}
            />
            {(selectedDecade || selectedShowId || selectedHost) && (
              <div className="mb-4 flex items-center justify-between bg-white rounded-lg shadow-sm p-4">
                <span className="text-gray-700">
                  {selectedDecade && `Songs from the ${selectedDecade}`}
                  {selectedShowId && (shows.find(s => s.id === selectedShowId)?.program_name)}
                  {selectedHost && ` with ${selectedHost}`}
                </span>
                <div className="space-x-2">
                  {selectedDecade && (
                    <button
                      onClick={() => setSelectedDecade(null)}
                      className="text-sm px-3 py-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                    >
                      Clear decade
                    </button>
                  )}
                  {selectedShowId && (
                    <button
                      onClick={() => setSelectedShowId(null)}
                      className="text-sm px-3 py-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                    >
                      Clear show
                    </button>
                  )}
                  {selectedHost && (
                    <button
                      onClick={() => setSelectedHost(null)}
                      className="text-sm px-3 py-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                    >
                      Clear host
                    </button>
                  )}
                </div>
              </div>
            )}
            <PlayList plays={filteredPlays} />
          </>
        )}
      </main>
    </div>
  );
}