import { Loader2 } from 'lucide-react';

export const LoadingSpinner = () => (
  <div className="flex items-center justify-center w-full p-8">
    <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
  </div>
);