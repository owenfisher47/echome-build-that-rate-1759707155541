'use client';

import { useState, useEffect } from 'react';
import { Plus, Sparkles } from 'lucide-react';
import { Matcha, MatchaFormData } from '@/types/matcha';
import { getMatchaRatings, saveMatchaRating, deleteMatchaRating } from '@/utils/storage';
import MatchaCard from '@/components/MatchaCard';
import AddMatchaForm from '@/components/AddMatchaForm';

export default function Home() {
  const [matcharatings, setMatchaRatings] = useState<Matcha[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadRatings = () => {
      const ratings = getMatchaRatings();
      setMatchaRatings(ratings);
      setIsLoading(false);
    };

    loadRatings();
  }, []);

  const handleAddMatcha = async (formData: MatchaFormData) => {
    if (!formData.image) return;

    // Convert image to base64 for storage
    const reader = new FileReader();
    reader.onloadend = () => {
      const newMatcha: Matcha = {
        id: Date.now().toString(),
        name: formData.name,
        rating: formData.rating,
        description: formData.description,
        location: formData.location,
        image: reader.result as string,
        createdAt: new Date()
      };

      saveMatchaRating(newMatcha);
      setMatchaRatings(prev => [newMatcha, ...prev]);
      setShowAddForm(false);
    };
    reader.readAsDataURL(formData.image);
  };

  const handleDeleteMatcha = (id: string) => {
    if (window.confirm('Are you sure you want to delete this matcha review?')) {
      deleteMatchaRating(id);
      setMatchaRatings(prev => prev.filter(matcha => matcha.id !== id));
    }
  };

  const averageRating = matcharatings.length > 0 
    ? matcharatings.reduce((sum, matcha) => sum + matcha.rating, 0) / matcharatings.length 
    : 0;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-matcha-200 border-t-matcha-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your matcha reviews...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-4 bg-white rounded-2xl card-shadow mb-6">
            <Sparkles className="w-8 h-8 text-matcha-500 mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold gradient-bg bg-clip-text text-transparent">
              Matcha Rater
            </h1>
          </div>
          <p className="text-gray-600 text-lg mb-6">
            Discover and rate the finest matcha experiences ✨
          </p>
          
          {matcharatings.length > 0 && (
            <div className="inline-flex items-center gap-6 bg-white rounded-2xl px-6 py-3 card-shadow">
              <div className="text-center">
                <p className="text-2xl font-bold text-matcha-600">{matcharatings.length}</p>
                <p className="text-sm text-gray-600">Reviews</p>
              </div>
              <div className="w-px h-8 bg-gray-200"></div>
              <div className="text-center">
                <p className="text-2xl font-bold text-pink-500">{averageRating.toFixed(1)}</p>
                <p className="text-sm text-gray-600">Avg Rating</p>
              </div>
            </div>
          )}
        </div>

        {/* Add Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-matcha-400 to-matcha-500 text-white px-6 py-3 rounded-2xl font-medium hover:from-matcha-500 hover:to-matcha-600 hover-lift transition-all"
          >
            <Plus className="w-5 h-5" />
            Add Matcha Review
          </button>
        </div>

        {/* Matcha Grid */}
        {matcharatings.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-matcha-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-12 h-12 text-matcha-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No matcha reviews yet
            </h3>
            <p className="text-gray-600 mb-6">
              Start your matcha journey by adding your first review!
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-matcha-400 to-matcha-500 text-white px-6 py-3 rounded-2xl font-medium hover:from-matcha-500 hover:to-matcha-600 transition-all"
            >
              <Plus className="w-5 h-5" />
              Add Your First Review
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matcharatings.map((matcha) => (
              <MatchaCard
                key={matcha.id}
                matcha={matcha}
                onDelete={handleDeleteMatcha}
              />
            ))}
          </div>
        )}

        {/* Add Form Modal */}
        {showAddForm && (
          <AddMatchaForm
            onSubmit={handleAddMatcha}
            onCancel={() => setShowAddForm(false)}
          />
        )}
      </div>
    </main>
  );
}