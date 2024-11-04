import { Radio } from 'lucide-react';

export const Header = () => (
  <header className="bg-black text-white p-6 shadow-lg">
    <div className="container mx-auto flex items-center gap-4">
      <Radio className="w-8 h-8 text-blue-400" />
      <h1 className="text-2xl font-bold tracking-tight">KEXP Playlist</h1>
    </div>
  </header>
);