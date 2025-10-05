import { Matcha } from '@/types/matcha';

const STORAGE_KEY = 'matcha-ratings';

export const getMatchaRatings = (): Matcha[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    
    const parsed = JSON.parse(stored);
    return parsed.map((matcha: any) => ({
      ...matcha,
      createdAt: new Date(matcha.createdAt)
    }));
  } catch (error) {
    console.error('Error loading matcha ratings:', error);
    return [];
  }
};

export const saveMatchaRating = (matcha: Matcha): void => {
  if (typeof window === 'undefined') return;
  
  try {
    const existing = getMatchaRatings();
    const updated = [matcha, ...existing];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Error saving matcha rating:', error);
  }
};

export const deleteMatchaRating = (id: string): void => {
  if (typeof window === 'undefined') return;
  
  try {
    const existing = getMatchaRatings();
    const updated = existing.filter(matcha => matcha.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Error deleting matcha rating:', error);
  }
};