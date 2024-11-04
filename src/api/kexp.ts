export interface Play {
  id: string;
  airdate: string;
  artist: string;
  song: string;
  album: string;
  label: string;
  release_date?: string;
  show: string;
  thumbnail_uri?: string;
}

export interface Show {
  id: string;
  program_name: string;
  host_names: string[];
  start_time: string;
  end_time: string;
}

export interface PlayResponse {
  results: Play[];
  count: number;
  next: string | null;
  previous: string | null;
}

export interface ShowResponse {
  results: Show[];
  count: number;
  next: string | null;
  previous: string | null;
}

const getTodayDateString = () => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return now.toISOString();
};

export const fetchPlays = async (params: Record<string, string> = {}): Promise<PlayResponse> => {
  const searchParams = new URLSearchParams({
    exclude_airbreaks: 'true',
    exclude_non_songs: 'true',
    limit: '250',
    airdate_after: getTodayDateString(),
    ...params,
  });

  const response = await fetch(`https://api.kexp.org/v2/plays/?${searchParams}`);
  if (!response.ok) throw new Error('Failed to fetch plays');
  return response.json();
};

export const fetchShows = async (): Promise<ShowResponse> => {
  const searchParams = new URLSearchParams({
    start_time_after: getTodayDateString(),
  });

  const response = await fetch(`https://api.kexp.org/v2/shows/?${searchParams}`);
  if (!response.ok) throw new Error('Failed to fetch shows');
  return response.json();
};