import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  type: 'bronze' | 'silver' | 'gold';
  unlockedAt?: Date;
}

interface PointsContextType {
  points: number;
  badges: Badge[];
  streak: number;
  level: number;
  addPoints: (amount: number) => void;
  unlockBadge: (badge: Badge) => void;
  updateStreak: () => void;
}

const PointsContext = createContext<PointsContextType | undefined>(undefined);

export const PointsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [points, setPoints] = useState(1250);
  const [badges, setBadges] = useState<Badge[]>([
    {
      id: '1',
      name: 'Eco Warrior',
      description: 'Completed 10 environmental tasks',
      icon: '🌱',
      type: 'bronze',
      unlockedAt: new Date(),
    },
    {
      id: '2',
      name: 'Water Saver',
      description: 'Learned about water conservation',
      icon: '💧',
      type: 'silver',
      unlockedAt: new Date(),
    }
  ]);
  const [streak, setStreak] = useState(7);
  const [level, setLevel] = useState(Math.floor(points / 500) + 1);

  const addPoints = (amount: number) => {
    const newPoints = points + amount;
    setPoints(newPoints);
    setLevel(Math.floor(newPoints / 500) + 1);
  };

  const unlockBadge = (badge: Badge) => {
    setBadges(prev => [...prev, { ...badge, unlockedAt: new Date() }]);
  };

  const updateStreak = () => {
    setStreak(prev => prev + 1);
  };

  const value = {
    points,
    badges,
    streak,
    level,
    addPoints,
    unlockBadge,
    updateStreak,
  };

  return (
    <PointsContext.Provider value={value}>
      {children}
    </PointsContext.Provider>
  );
};

export const usePoints = () => {
  const context = useContext(PointsContext);
  if (context === undefined) {
    throw new Error('usePoints must be used within a PointsProvider');
  }
  return context;
};