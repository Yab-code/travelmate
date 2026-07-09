import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { eventService } from '../../services/api';

const CATEGORIES = ['All', 'Religious', 'Cultural', 'Sports', 'Music', 'Food'];

const readFileAsDataUrl = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => resolve(reader.result);
  reader.onerror = reject;
  reader.readAsDataURL(file);
});

const PlannerCreateEditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', date: '', location: '', price: '', category: 'All', description: '', organizer: '', image: '', featured: false });
  const [featuredPending, setFeaturedPending] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(Boolean(id));

  useEffect(() => {
    const loadEvent = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const event = await eventService.getEvent(id);
        if (!event) throw new Error('Event not found');
        setForm({
          title: event.title || '',
          date: event.date ? event.date.slice(0, 10) : '',
          location: event.location || '',
          price: event.price || '',
          category: CATEGORIES.includes(event.category || '') ? event.category : 'All',
          description: event.description || '',
          organizer: event.organizer || '',
          image: event.image || '',
          featured: Boolean(event.featured || event.featuredRequested),
        });
        setFeaturedPending(Boolean(event.featuredRequested && !event.featured));
      } catch (err) {
        setError(err.message || 'Failed to load event.');
      } finally {
        setLoading(false);
      }
    };
    loadEvent();
  }, [id]);

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file.');
      return;
    }
    const dataUrl = await readFileAsDataUrl(file);
    update('image', dataUrl);
  };

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
    <div className="max-w-container-max mx-auto space-y-8">
      <button onClick={() => navigate('/dashboard/event-management')} className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"><span className="material-symbols-outlined text-[18px]">arrow_back</span><span>Back to Events</span></button>
      <div><h2 className="text-3xl font-bold text-on-surface">{id ? 'Edit Event' : 'Create Event'}</h2><p className="text-sm text-on-surface-variant mt-1">Save event data directly to the database.</p></div>
      {error && <div className="p-4 bg-error-container/30 text-error rounded-xl">{error}</div>}
      {featuredPending && <div className="p-4 bg-accent-yellow/10 border border-accent-yellow/20 text-on-surface rounded-xl text-sm font-semibold">Featured event request is pending Super Admin approval.</div>}
      <div className="bg-white p-8 rounded-xl border border-border-subtle shadow-sm max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2"><label className="text-xs font-bold text-on-surface-variant uppercase block">Event Name</label><input type="text" value={form.title} onChange={(e) => update('title', e.target.value)} required className="w-full bg-surface-container-low border border-border-subtle rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" /></div>
            <div className="space-y-2"><label className="text-xs font-bold text-on-surface-variant uppercase block">Date</label><input type="date" value={form.date} onChange={(e) => update('date', e.target.value)} required className="w-full bg-surface-container-low border border-border-subtle rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" /></div>
            <div className="space-y-2"><label className="text-xs font-bold text-on-surface-variant uppercase block">Location</label><input type="text" value={form.location} onChange={(e) => update('location', e.target.value)} required className="w-full bg-surface-container-low border border-border-subtle rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" /></div>
            <div className="space-y-2"><label className="text-xs font-bold text-on-surface-variant uppercase block">Price (USD)</label><input type="number" min="0" value={form.price} onChange={(e) => update('price', e.target.value)} required className="w-full bg-surface-container-low border border-border-subtle rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" /></div>
            <div className="space-y-2"><label className="text-xs font-bold text-on-surface-variant uppercase block">Category</label><select value={form.category} onChange={(e) => update('category', e.target.value)} required className="w-full bg-surface-container-low border border-border-subtle rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">{CATEGORIES.map((category) => <option key={category} value={category}>{category}</option>)}</select></div>
            <div className="space-y-2"><label className="text-xs font-bold text-on-surface-variant uppercase block">Organizer</label><input type="text" value={form.organizer} onChange={(e) => update('organizer', e.target.value)} className="w-full bg-surface-container-low border border-border-subtle rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" /></div>
            <div className="space-y-2"><label className="text-xs font-bold text-on-surface-variant uppercase block">Event Image</label><input type="file" accept="image/*" onChange={handleImageChange} className="w-full bg-surface-container-low border border-border-subtle rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" /></div>
            <label className="flex items-center gap-3 text-sm font-semibold text-on-surface-variant self-end pb-3"><input type="checkbox" checked={form.featured} onChange={(e) => update('featured', e.target.checked)} className="text-primary" />Featured Event</label>
          </div>
          {form.image && <img src={form.image} alt="Event preview" className="w-full h-56 object-cover rounded-xl border border-border-subtle" />}
          {form.featured && <p className="text-xs text-on-surface-variant bg-surface-container-low rounded-lg px-4 py-3">Featured events require Super Admin approval before appearing as featured on the homepage.</p>}
          <div className="space-y-2"><label className="text-xs font-bold text-on-surface-variant uppercase block">Description</label><textarea rows="5" value={form.description} onChange={(e) => update('description', e.target.value)} required className="w-full bg-surface-container-low border border-border-subtle rounded-lg p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"></textarea></div>
          <div className="flex gap-4 pt-4"><button type="submit" className="bg-primary text-white px-6 py-3 rounded-xl text-sm font-semibold hover:brightness-110 active:scale-95 transition-all shadow-sm">{id ? 'Update Event' : 'Publish Event'}</button><button type="button" onClick={() => navigate('/dashboard/event-management')} className="border border-border-subtle text-on-surface-variant px-6 py-3 rounded-xl text-sm font-semibold hover:bg-surface-container-low transition-all">Cancel</button></div>
        </form>
      </div>
    </div>
  );
};

export default PlannerCreateEditEvent;
