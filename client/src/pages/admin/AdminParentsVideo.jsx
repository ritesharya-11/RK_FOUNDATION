import React, { useState } from 'react';
import { useWebsite } from '../../context/WebsiteContext';
import api from '../../services/api';
import {
  Video,
  Plus,
  Save,
  Trash2,
  Play,
  ExternalLink,
  MapPin,
  UserCheck,
  X,
  Eye,
  Film,
} from 'lucide-react';

export const AdminParentsVideo = () => {
  const { settings, refreshSettings, showToast } = useWebsite();

  const initialVideos = settings.parentsVideos?.length > 0 ? settings.parentsVideos : [
    {
      _id: 'vid-1',
      title: 'Our Work in Action | Child Food Distribution & Healthcare Camp',
      parentName: 'Sunita Devi (Mother of Aarav)',
      location: 'Nand Nagri Slum Cluster, Delhi',
      youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      thumbnailUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop',
      testimonialQuote:
        'Because of the evening non-formal coaching and nutritional meals, my son Aarav is now back in school and tops his class.',
      isFeatured: true,
    },
    {
      _id: 'vid-2',
      title: 'Vocational Tailoring Center Graduation & Single Mother Stories',
      parentName: 'Kavita Verma (Beneficiary)',
      location: 'Loni Border Community Center, Ghaziabad',
      youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      thumbnailUrl: 'https://images.unsplash.com/photo-1594708767771-a7502209ff51?q=80&w=800&auto=format&fit=crop',
      testimonialQuote:
        'After receiving free sewing training and my own commercial sewing machine, I earn independently and provide for my two daughters.',
      isFeatured: true,
    },
  ];

  const [videos, setVideos] = useState(initialVideos);
  const [modalOpen, setModalOpen] = useState(false);
  const [previewVideo, setPreviewVideo] = useState(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    parentName: '',
    location: '',
    youtubeUrl: '',
    thumbnailUrl: '',
    testimonialQuote: '',
    isFeatured: true,
  });

  const handleOpenAdd = () => {
    setFormData({
      title: '',
      parentName: '',
      location: '',
      youtubeUrl: '',
      thumbnailUrl: '',
      testimonialQuote: '',
      isFeatured: true,
    });
    setModalOpen(true);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.youtubeUrl) {
      showToast('Title and YouTube URL are required.', 'error');
      return;
    }
    const newVid = { ...formData, _id: `vid-${Date.now()}` };
    setVideos([...videos, newVid]);
    setModalOpen(false);
    showToast('Video added to queue. Click "Publish Videos" to commit.', 'info');
  };

  const handleDelete = (id) => {
    setVideos(videos.filter((v) => v._id !== id));
    showToast('Video removed. Remember to publish changes.', 'info');
  };

  const handleSaveAll = async () => {
    setSaving(true);
    try {
      const res = await api.put('/settings', {
        parentsVideos: videos,
      });
      if (res?.success) {
        showToast('Parents video reviews updated successfully!', 'success');
        refreshSettings();
      }
    } catch (err) {
      showToast(err.message || 'Failed to save videos.', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-red-600/10 text-red-500">
              <Video className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">Parents Video & Documentary CMS</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Curate verified on-ground documentary videos, parent testimonial reels, and YouTube video embeds linked in Footer and About page.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleOpenAdd}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 transition flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Video</span>
          </button>

          <button
            onClick={handleSaveAll}
            disabled={saving}
            className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-red-600 hover:bg-red-500 shadow-lg shadow-red-900/30 transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Publishing...' : 'Publish Videos'}</span>
          </button>
        </div>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {videos.map((vid) => (
          <div
            key={vid._id}
            className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-slate-700 transition"
          >
            <div>
              {/* Thumbnail / Player Preview */}
              <div
                className="h-48 relative overflow-hidden bg-slate-950 cursor-pointer group"
                onClick={() => setPreviewVideo(vid)}
              >
                <img
                  src={vid.thumbnailUrl || '/video-thumbnail.jpg'}
                  alt={vid.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop';
                  }}
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  </div>
                </div>

                <span className="absolute top-3 left-3 px-2 py-0.5 rounded-md text-[10px] font-bold bg-black/70 backdrop-blur-xs text-white border border-white/20">
                  YouTube Documentary
                </span>
              </div>

              <div className="p-5 space-y-3">
                <h3 className="text-base font-bold text-white line-clamp-2 leading-snug">
                  {vid.title}
                </h3>

                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <span className="font-semibold text-slate-200">{vid.parentName}</span>
                  {vid.location && (
                    <span className="flex items-center gap-1 text-[11px] text-slate-400">
                      <MapPin className="w-3 h-3 text-[#FFC43D]" />
                      <span>{vid.location}</span>
                    </span>
                  )}
                </div>

                {vid.testimonialQuote && (
                  <p className="text-xs text-slate-300 italic bg-slate-950/70 p-3 rounded-xl border border-slate-800 leading-relaxed">
                    "{vid.testimonialQuote}"
                  </p>
                )}
              </div>
            </div>

            <div className="p-4 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between">
              <a
                href={vid.youtubeUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-red-400 hover:text-red-300 flex items-center gap-1"
              >
                <span>Watch on YouTube</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <button
                onClick={() => handleDelete(vid._id)}
                className="text-slate-500 hover:text-rose-400 p-1.5 rounded-lg hover:bg-slate-800 transition cursor-pointer"
                title="Remove Video"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Video Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Film className="w-5 h-5 text-red-500" />
                <span>Add Parents Documentary / Review Video</span>
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Video Documentary Title
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Ground Relief & Nutrition Drive Documentary"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-hidden focus:border-red-500 font-bold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Parent / Beneficiary Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.parentName}
                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                    placeholder="e.g. Sunita Devi (Mother of Aarav)"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-hidden focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Location / Community
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Nand Nagri, Delhi"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-hidden focus:border-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  YouTube Video URL or Video ID
                </label>
                <input
                  type="text"
                  required
                  value={formData.youtubeUrl}
                  onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-hidden focus:border-red-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Thumbnail Image URL (Optional)
                </label>
                <input
                  type="text"
                  value={formData.thumbnailUrl}
                  onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/... or left blank for YouTube default"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-hidden focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Parent's Spoken Quote / Feedback
                </label>
                <textarea
                  rows={2}
                  value={formData.testimonialQuote}
                  onChange={(e) => setFormData({ ...formData, testimonialQuote: e.target.value })}
                  placeholder="What the parent or guardian shared about the foundation's impact..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-300 focus:outline-hidden focus:border-red-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-500 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Add Video</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Video Player Modal */}
      {previewVideo && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-3xl overflow-hidden p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white line-clamp-1">
                {previewVideo.title}
              </h3>
              <button
                onClick={() => setPreviewVideo(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-video bg-black rounded-2xl overflow-hidden">
              <iframe
                title={previewVideo.title}
                src={previewVideo.youtubeUrl.replace('watch?v=', 'embed/')}
                className="w-full h-full"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

