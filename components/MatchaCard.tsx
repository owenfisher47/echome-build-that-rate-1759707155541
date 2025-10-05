'use client';

import { MapPin, Trash2 } from 'lucide-react';
import { Matcha } from '@/types/matcha';
import StarRating from './StarRating';

interface MatchaCardProps {
  matcha: Matcha;
  onDelete: (id: string) => void;
}

export default function MatchaCard({ matcha, onDelete }: MatchaCardProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="bg-white rounded-2xl card-shadow hover-lift overflow-hidden">
      <div className="relative h-48 overflow-hidden">
        <img
          src={matcha.image}
          alt={matcha.name}
          className="w-full h-full object-cover"
        />
        <button
          onClick={() => onDelete(matcha.id)}
          className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-red-50 hover:text-red-500 transition-colors"
          title="Delete review"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-semibold text-gray-800 truncate flex-1">
            {matcha.name}
          </h3>
        </div>
        
        <div className="mb-3">
          <StarRating rating={matcha.rating} size="md" />
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {matcha.description}
        </p>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-matcha-600">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="truncate">{matcha.location}</span>
          </div>
          <span className="text-gray-500 text-xs">
            {formatDate(matcha.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
}