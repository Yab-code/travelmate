import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { eventService } from '../../services/api';

const PlannerCreateEditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', date: '', location: '', price: '', category: '', description: '', organizer: '', image: '', featured: false });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(Boolean(id));

  useEffect(() => {
    const loadEvent = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const event = await eventService.getEvent(id);
        if (!event) throw new Error('Event not found');
        setForm({ title: event.title || '', date: event.date ? event.date.slice(0, 10) : '', location: event.location || '', price: event.price || '', category: event.category || '', description: event.description || '', organizer: event.organizer || '', image: event.image || '', featured: Boolean(event.featured) });
      } catch (err) {
        setError(err.message || 'Failed to load event.');
      } finally {
        setLoading(false);
      }
    };
    loadEvent();
  }, [id]);

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const payload = { ...form, price: Number(form.price) };
      if (id) await eventService.updateEvent(id, payload);
      else await eventService.createEvent(payload);
      navigate('/dashboard/event-management');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save event.');
    }
  };

  if (loading) return <div className="flex items-center justify-center p-12"><div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div></div>;

  return (
    <div className="max-w-container-max mx-auto space-y-8"><button onClick={() => navigate('/dashboard/event-management')} className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"><span className="material-symbols-outlined text-[18px]">arrow_back</span><span>Back to Events</span></button><div><h2 className="text-3xl font-bold text-on-surface">{id ? 'Edit Event' : 'Create Event'}</h2><p className="text-sm text-on-surface-variant mt-1">Save event data directly to the database.</p></div>{error && <div className="p-4 bg-error-container/30 text-error rounded-xl">{error}</div>}<div className="bg-white p-8 rounded-xl border border-border-subtle shadow-sm max-w-3xl"><form onSubmit={handleSubmit} className="space-y-6"><div className="grid grid-cols-1 md:grid-cols-2 gap-6">{[['title', 'Event Name', 'text'], ['date', 'Date', 'date'], ['location', 'Location', 'text'], ['price', 'Price (USD)', 'number'], ['category', 'Category', 'text'], ['organizer', 'Organizer', 'text'], ['image', 'Image URL', 'url']].map(([key, label, type]) => <div key={key} className="space-y-2"><label className="text-xs font-bold text-on-surface-variant uppercase block">{label}</label><input type={type} value={form[key]} onChange={(e) => update(key, e.target.value)} required={!['image', 'organizer'].includes(key)} className="w-full bg-surface-container-low border border-border-subtle rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" /></div>)}<label className="flex items-center gap-3 text-sm font-semibold text-on-surface-variant"><input type="checkbox" checked={form.featured} onChange={(e) => update('featured', e.target.checked)} className="text-primary" />Featured event</label></div><div className="space-y-2"><label className="text-xs font-bold text-on-surface-variant uppercase block">Description</label><textarea rows="5" value={form.description} onChange={(e) => update('description', e.target.value)} required className="w-full bg-surface-container-low border border-border-subtle rounded-lg p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"></textarea></div><div className="flex gap-4 pt-4"><button type="submit" className="bg-primary text-white px-6 py-3 rounded-xl text-sm font-semibold hover:brightness-110 active:scale-95 transition-all shadow-sm">{id ? 'Update Event' : 'Publish Event'}</button><button type="button" onClick={() => navigate('/dashboard/event-management')} className="border border-border-subtle text-on-surface-variant px-6 py-3 rounded-xl text-sm font-semibold hover:bg-surface-container-low transition-all">Cancel</button></div></form></div></div>
  );
};

export default PlannerCreateEditEvent;
