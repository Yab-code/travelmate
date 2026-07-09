import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { packageService } from '../../services/api';

const PlannerCreateEditPackage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', price: '', duration: '', description: '', location: '', type: '', lodging: '', groupSize: 'Max 10', difficulty: 'Easy', language: 'English', image: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(Boolean(id));

  useEffect(() => {
    const loadPackage = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const pkg = await packageService.getPackage(id);
        if (!pkg) throw new Error('Package not found');
        setForm({ title: pkg.title || '', price: pkg.price || '', duration: pkg.duration || '', description: pkg.description || '', location: pkg.location || '', type: pkg.type || '', lodging: pkg.lodging || '', groupSize: pkg.groupSize || 'Max 10', difficulty: pkg.difficulty || 'Easy', language: pkg.language || 'English', image: pkg.image || '' });
      } catch (err) {
        setError(err.message || 'Failed to load package.');
      } finally {
        setLoading(false);
      }
    };
    loadPackage();
  }, [id]);

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const payload = { ...form, price: Number(form.price), duration: Number(form.duration), tags: [], itinerary: [] };
      if (id) await packageService.updatePackage(id, payload);
      else await packageService.createPackage(payload);
      navigate('/dashboard/package-management');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save package.');
    }
  };

  if (loading) return <div className="flex items-center justify-center p-12"><div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div></div>;

  return (
    <div className="max-w-container-max mx-auto space-y-8"><button onClick={() => navigate('/dashboard/package-management')} className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"><span className="material-symbols-outlined text-[18px]">arrow_back</span><span>Back to Packages</span></button><div><h2 className="text-3xl font-bold text-on-surface">{id ? 'Edit Travel Package' : 'Create Travel Package'}</h2><p className="text-sm text-on-surface-variant mt-1">Save package data directly to the database.</p></div>{error && <div className="p-4 bg-error-container/30 text-error rounded-xl">{error}</div>}<div className="bg-white p-8 rounded-xl border border-border-subtle shadow-sm max-w-3xl"><form onSubmit={handleSubmit} className="space-y-6"><div className="grid grid-cols-1 md:grid-cols-2 gap-6">{[['title', 'Package Name', 'text'], ['location', 'Location', 'text'], ['type', 'Type', 'text'], ['lodging', 'Lodging', 'text'], ['price', 'Price (USD)', 'number'], ['duration', 'Duration (days)', 'number'], ['groupSize', 'Group Size', 'text'], ['image', 'Image URL', 'url']].map(([key, label, type]) => <div key={key} className="space-y-2"><label className="text-xs font-bold text-on-surface-variant uppercase block">{label}</label><input type={type} value={form[key]} onChange={(e) => update(key, e.target.value)} required={!['image'].includes(key)} className="w-full bg-surface-container-low border border-border-subtle rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" /></div>)}</div><div className="space-y-2"><label className="text-xs font-bold text-on-surface-variant uppercase block">Description</label><textarea rows="5" value={form.description} onChange={(e) => update('description', e.target.value)} required className="w-full bg-surface-container-low border border-border-subtle rounded-lg p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"></textarea></div><div className="flex gap-4 pt-4"><button type="submit" className="bg-primary text-white px-6 py-3 rounded-xl text-sm font-semibold hover:brightness-110 active:scale-95 transition-all shadow-sm">{id ? 'Update Package' : 'Publish Package'}</button><button type="button" onClick={() => navigate('/dashboard/package-management')} className="border border-border-subtle text-on-surface-variant px-6 py-3 rounded-xl text-sm font-semibold hover:bg-surface-container-low transition-all">Cancel</button></div></form></div></div>
  );
};

export default PlannerCreateEditPackage;
