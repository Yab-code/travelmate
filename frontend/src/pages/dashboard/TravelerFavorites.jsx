import React from 'react';
import { useNavigate } from 'react-router-dom';

const TravelerFavorites = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-container-max mx-auto space-y-8">
      <div><h2 className="text-3xl font-bold text-on-surface">My Wishlist</h2><p className="text-sm text-on-surface-variant mt-1">Wishlist records will appear here when a favorites table is available in the database.</p></div>
      <div className="bg-white rounded-xl border border-border-subtle p-12 text-center max-w-md mx-auto space-y-4"><span className="material-symbols-outlined text-4xl text-outline opacity-60">heart_broken</span><h3 className="text-lg font-bold text-on-surface">Your wishlist is empty</h3><p className="text-sm text-on-surface-variant">No favorite package records were found in the database.</p><button onClick={() => navigate('/dashboard/explore-packages')} className="bg-primary text-white text-xs font-semibold px-4 py-2.5 rounded-lg hover:brightness-110 active:scale-95 transition-all">Explore Packages</button></div>
    </div>
  );
};

export default TravelerFavorites;
