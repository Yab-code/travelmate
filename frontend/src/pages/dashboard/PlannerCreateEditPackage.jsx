import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { packageService } from '../../services/api';

const TOUR_TYPES = ['Business Tour', 'Escorted Tour', 'Adventure Tour', 'Family Tour', 'Cultural Tour', 'Religious Tour', 'Eco Tour'];

const PlannerCreateEditPackage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', price: '', duration: '', description: '', location: '', type: TOUR_TYPES[0], customType: '', groupSize: 'Max 10', difficulty: 'Easy', language: 'English', image: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(Boolean(id));
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const loadPackage = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const pkg = await packageService.getPackage(id);
        if (!pkg) throw new Error('Package not found');
        const knownType = TOUR_TYPES.includes(pkg.type || '');
        setForm({
          title: pkg.title || '',
          price: pkg.price || '',
          duration: pkg.duration || '',
          description: pkg.description || '',
          location: pkg.location || '',
          type: knownType ? pkg.type : 'Other',
          customType: knownType ? '' : pkg.type || '',
          groupSize: pkg.groupSize || 'Max 10',
          difficulty: pkg.difficulty || 'Easy',
          language: pkg.language || 'English',
          image: pkg.image || '',
        });
      } catch (err) {
        setError(err.message || 'Failed to load package.');
      } finally {
        setLoading(false);
      }
    };
    loadPackage();
  }, [id]);

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file.');
      return;
    }
    setSelectedImage(file);
    update('image', '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const finalType = form.type === 'Other' ? form.customType.trim() : form.type;
    if (!finalType) {
      setError('Please select or enter a tour type.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('description', form.description);
      formData.append('location', form.location);
      formData.append('type', finalType);
      formData.append('price', String(Number(form.price)));
      formData.append('duration', String(Number(form.duration)));
      formData.append('tags', JSON.stringify([]));
      formData.append('itinerary', JSON.stringify([]));
      formData.append('difficulty', form.difficulty);
      formData.append('groupSize', form.groupSize);
      formData.append('language', form.language);
      if (selectedImage) {
        formData.append('image', selectedImage);
      } else if (form.image) {
        formData.append('image', form.image);
      }
      if (id) await packageService.updatePackage(id, formData);
      else await packageService.createPackage(formData);
      navigate('/dashboard/package-management');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save package.');
    }
  };

  if (loading) return <div className="flex items-center justify-center p-12"><div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div></div>;

  return (
    <div className="max-w-container-max mx-auto space-y-8">
      <button onClick={() => navigate('/dashboard/package-management')} className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"><span className="material-symbols-outlined text-[18px]">arrow_back</span><span>Back to Packages</span></button>
      <div><h2 className="text-3xl font-bold text-on-surface">{id ? 'Edit Travel Package' : 'Create Travel Package'}</h2><p className="text-sm text-on-surface-variant mt-1">Save package data directly to the database.</p></div>
      {error && <div className="p-4 bg-error-container/30 text-error rounded-xl">{error}</div>}
      <div className="bg-white p-8 rounded-xl border border-border-subtle shadow-sm max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2"><label className="text-xs font-bold text-on-surface-variant uppercase block">Package Name</label><input type="text" value={form.title} onChange={(e) => update('title', e.target.value)} required className="w-full bg-surface-container-low border border-border-subtle rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" /></div>
            <div className="space-y-2"><label className="text-xs font-bold text-on-surface-variant uppercase block">Location</label><input type="text" value={form.location} onChange={(e) => update('location', e.target.value)} required className="w-full bg-surface-container-low border border-border-subtle rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" /></div>
            <div className="space-y-2"><label className="text-xs font-bold text-on-surface-variant uppercase block">Type</label><select value={form.type} onChange={(e) => update('type', e.target.value)} required className="w-full bg-surface-container-low border border-border-subtle rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">{TOUR_TYPES.map((type) => <option key={type} value={type}>{type}</option>)}<option value="Other">Other</option></select></div>
            {form.type === 'Other' && <div className="space-y-2"><label className="text-xs font-bold text-on-surface-variant uppercase block">Additional Tour Type</label><input type="text" value={form.customType} onChange={(e) => update('customType', e.target.value)} required className="w-full bg-surface-container-low border border-border-subtle rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" /></div>}
            <div className="space-y-2"><label className="text-xs font-bold text-on-surface-variant uppercase block">Price (USD)</label><input type="number" min="0" value={form.price} onChange={(e) => update('price', e.target.value)} required className="w-full bg-surface-container-low border border-border-subtle rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" /></div>
            <div className="space-y-2"><label className="text-xs font-bold text-on-surface-variant uppercase block">Duration (days)</label><input type="number" min="1" value={form.duration} onChange={(e) => update('duration', e.target.value)} required className="w-full bg-surface-container-low border border-border-subtle rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" /></div>
            <div className="space-y-2"><label className="text-xs font-bold text-on-surface-variant uppercase block">Group Size</label><input type="text" value={form.groupSize} onChange={(e) => update('groupSize', e.target.value)} required className="w-full bg-surface-container-low border border-border-subtle rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" /></div>
            <div className="space-y-2"><label className="text-xs font-bold text-on-surface-variant uppercase block">Package Image</label><input type="file" accept="image/*" onChange={handleImageChange} className="w-full bg-surface-container-low border border-border-subtle rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" /></div>
          </div>
          {form.image && <img src={form.image} alt="Package preview" className="w-full h-56 object-cover rounded-xl border border-border-subtle" />}
          <div className="space-y-2"><label className="text-xs font-bold text-on-surface-variant uppercase block">Description</label><textarea rows="5" value={form.description} onChange={(e) => update('description', e.target.value)} required className="w-full bg-surface-container-low border border-border-subtle rounded-lg p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"></textarea></div>
          <div className="flex gap-4 pt-4"><button type="submit" className="bg-primary text-white px-6 py-3 rounded-xl text-sm font-semibold hover:brightness-110 active:scale-95 transition-all shadow-sm">{id ? 'Update Package' : 'Publish Package'}</button><button type="button" onClick={() => navigate('/dashboard/package-management')} className="border border-border-subtle text-on-surface-variant px-6 py-3 rounded-xl text-sm font-semibold hover:bg-surface-container-low transition-all">Cancel</button></div>
        </form>
      </div>
    </div>
  );
};

export default PlannerCreateEditPackage;
