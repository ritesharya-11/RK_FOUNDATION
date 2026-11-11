import React, { useState, useEffect } from 'react';
import { useWebsite } from '../../context/WebsiteContext';
import api from '../../services/api';
import { Plus, Trash2, X, Image as ImageIcon } from 'lucide-react';
import { ImageUploader } from '../../components/ImageUploader';

export const AdminGallery = () => {
  const { showToast } = useWebsite();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    title: '',
    category: 'Child Education',
    imageUrl: '',
    caption: '',
    location: 'Delhi-NCR',
  });

  const fetchGallery = async () => {
    try {
      const res = await api.get('/gallery');
      if (res?.items) {
        setItems(res.items);
      }
    } catch (err) {
      showToast('Error loading gallery', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/gallery', form);
      showToast('Photo added to gallery', 'success');
      setShowModal(false);
      setForm({
        title: '',
        category: 'Child Education',
        imageUrl: '',
        caption: '',
        location: 'Delhi-NCR',
      });
      fetchGallery();
    } catch (err) {
      showToast(err.message || 'Operation failed', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this photo from gallery?')) return;
    try {
      await api.delete(`/gallery/${id}`);
      showToast('Photo removed', 'info');
      fetchGallery();
    } catch (err) {
      showToast(err.message || 'Delete failed', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">Media Gallery Manager</h2>
          <p className="text-xs text-slate-400">Upload and curate on-ground field photographs</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-500 shadow-md transition flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Photo</span>
        </button>
      </div>

      {/* Grid of Photos */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div
            key={item._id}
            className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 aspect-square flex flex-col justify-end p-3 text-white"
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

            <div className="relative z-10 space-y-1">
              <span className="text-[10px] font-bold text-emerald-400 block uppercase">
                {item.category}
              </span>
              <p className="text-xs font-semibold line-clamp-1">{item.title}</p>
            </div>

            <button
              onClick={() => handleDelete(item._id)}
              className="absolute top-2 right-2 z-10 p-1.5 rounded-lg bg-black/60 text-rose-400 hover:bg-rose-600 hover:text-white transition opacity-0 group-hover:opacity-100"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">Add Photo to Gallery</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Photo Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Slum bridge school math class"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Child Education">Child Education</option>
                  <option value="Healthcare Relief">Healthcare Relief</option>
                  <option value="Food & Ration Drives">Food & Ration Drives</option>
                  <option value="Women Empowerment">Women Empowerment</option>
                  <option value="Community Events">Community Events</option>
                </select>
              </div>

              <div>
                <ImageUploader
                  value={form.imageUrl}
                  onChange={(url) => setForm({ ...form, imageUrl: url })}
                  label="Gallery Image (ImageKit Cloud Upload or URL)"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Location</label>
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-500"
                >
                  Add Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

