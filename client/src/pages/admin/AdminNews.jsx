import React, { useState, useEffect } from 'react';
import { useWebsite } from '../../context/WebsiteContext';
import api from '../../services/api';
import { Plus, Edit2, Trash2, X, Newspaper, Calendar } from 'lucide-react';

export const AdminNews = () => {
  const { showToast } = useWebsite();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingArticle, setEditingArticle] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    title: '',
    category: 'Field Stories',
    summary: '',
    content: '',
    author: 'RK Foundation Editorial Team',
    coverImage: '',
    tags: 'Child Education, Slum School',
    isPublished: true,
  });

  const fetchNews = async () => {
    try {
      const res = await api.get('/news?all=true');
      if (res?.articles) {
        setArticles(res.articles);
      }
    } catch (err) {
      showToast('Error loading articles', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleOpenModal = (art = null) => {
    if (art) {
      setEditingArticle(art);
      setForm({
        title: art.title,
        category: art.category,
        summary: art.summary,
        content: art.content,
        author: art.author,
        coverImage: art.coverImage,
        tags: (art.tags || []).join(', '),
        isPublished: art.isPublished ?? true,
      });
    } else {
      setEditingArticle(null);
      setForm({
        title: '',
        category: 'Field Stories',
        summary: '',
        content: '',
        author: 'RK Foundation Editorial Team',
        coverImage: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=800',
        tags: 'Empowerment, Education',
        isPublished: true,
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      };

      if (editingArticle) {
        await api.put(`/news/${editingArticle._id}`, payload);
        showToast('Article updated', 'success');
      } else {
        await api.post('/news', payload);
        showToast('Article published', 'success');
      }
      setShowModal(false);
      fetchNews();
    } catch (err) {
      showToast(err.message || 'Operation failed', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this article?')) return;
    try {
      await api.delete(`/news/${id}`);
      showToast('Article deleted', 'info');
      fetchNews();
    } catch (err) {
      showToast(err.message || 'Delete failed', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">News & Stories Manager</h2>
          <p className="text-xs text-slate-400">Publish articles, impact reports, and press updates</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-500 shadow-md transition flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Write New Article</span>
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="p-4 font-semibold">Article</th>
                <th className="p-4 font-semibold">Category</th>
                <th className="p-4 font-semibold">Author</th>
                <th className="p-4 font-semibold">Published Date</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {articles.map((item) => (
                <tr key={item._id} className="hover:bg-slate-800/40">
                  <td className="p-4 flex items-center gap-3">
                    <img
                      src={item.coverImage}
                      alt={item.title}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div>
                      <strong className="text-white block font-semibold">{item.title}</strong>
                      <span className="text-[11px] text-slate-500 line-clamp-1">{item.summary}</span>
                    </div>
                  </td>
                  <td className="p-4">{item.category}</td>
                  <td className="p-4">{item.author}</td>
                  <td className="p-4">{new Date(item.publishedAt).toLocaleDateString('en-IN')}</td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => handleOpenModal(item)}
                      className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">
                {editingArticle ? 'Edit Article' : 'Write New Article'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Article Title *</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Field Stories">Field Stories</option>
                    <option value="Press Release">Press Release</option>
                    <option value="Annual Report">Annual Report</option>
                    <option value="Community Updates">Community Updates</option>
                    <option value="Awareness & Advocacy">Awareness & Advocacy</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Author</label>
                  <input
                    type="text"
                    value={form.author}
                    onChange={(e) => setForm({ ...form, author: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Short Excerpt / Summary *</label>
                <input
                  type="text"
                  required
                  value={form.summary}
                  onChange={(e) => setForm({ ...form, summary: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Full Article Body *</label>
                <textarea
                  rows={5}
                  required
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Cover Image URL</label>
                <input
                  type="text"
                  value={form.coverImage}
                  onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Tags (comma separated)</label>
                <input
                  type="text"
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
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
                  Save Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

