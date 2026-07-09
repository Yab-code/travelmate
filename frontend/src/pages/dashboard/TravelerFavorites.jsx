import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { interestService } from '../../services/api';

const TravelerFavorites = () => {
  const navigate = useNavigate();
  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadInterests = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await interestService.getInterests();
      setInterests(data || []);
    } catch (err) {
      console.error('Failed to load interests:', err);
      setError(err.response?.data?.message || 'Unable to load your wishlist.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInterests();
  }, []);

  const removeInterest = async (interestId) => {
    try {
      await interestService.removeInterest(interestId);
      loadInterests();
    } catch (err) {
      alert(err.response?.data?.message || 'Unable to remove this item.');
    }
  };

  return (
    <div className="max-w-container-max mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-on-surface">My Wishlist</h2>
        <p className="text-sm text-on-surface-variant mt-1">Saved packages and events you want to revisit later.</p>
      </div>
      {error && <div className="p-4 bg-error-container/30 text-error rounded-xl">{error}</div>}
      {loading ? (
        <div className="bg-white rounded-xl border border-border-subtle p-12 text-center text-on-surface-variant">Loading your wishlist…</div>
      ) : interests.length === 0 ? (
        <div className="bg-white rounded-xl border border-border-subtle p-12 text-center max-w-md mx-auto space-y-4">
          <span className="material-symbols-outlined text-4xl text-outline opacity-60">heart_broken</span>
          <h3 className="text-lg font-bold text-on-surface">Your wishlist is empty</h3>
          <p className="text-sm text-on-surface-variant">Save packages and events from the explore pages to keep track of them.</p>
          <button onClick={() => navigate('/dashboard/explore-packages')} className="bg-primary text-white text-xs font-semibold px-4 py-2.5 rounded-lg hover:brightness-110 active:scale-95 transition-all">Explore Packages</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {interests.map((interest) => (
            <div key={interest.id} className="bg-white rounded-xl border border-border-subtle shadow-sm p-5 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary">{interest.type === 'TRAVEL_PACKAGE' ? 'Package' : 'Event'}</p>
                  <h3 className="font-bold text-on-surface">{interest.itemName}</h3>
                </div>
                <button onClick={() => removeInterest(interest.id)} className="text-sm text-error hover:underline">Remove</button>
              </div>
              {interest.companyName && <p className="text-sm text-on-surface-variant">{interest.companyName}</p>}
              {interest.price != null && <p className="text-sm font-semibold text-on-surface">${Number(interest.price).toLocaleString()}</p>}
              <p className="text-xs text-on-surface-variant">Saved {new Date(interest.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TravelerFavorites;
