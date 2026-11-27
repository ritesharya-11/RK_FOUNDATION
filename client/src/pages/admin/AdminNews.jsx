import React, { useState, useEffect } from 'react';
import { useWebsite } from '../../context/WebsiteContext';
import api from '../../services/api';
import { AdminPageHeader } from '../../components/admin/AdminUI';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

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
    <div className="space-y-5 w-full min-w-0 font-sans">
      <AdminPageHeader
        breadcrumb="News & Stories"
        badge={`${articles.length} Articles`}
        title="News & Stories Manager"
        subtitle="Publish articles, institutional impact reports, and grassroots community press updates."
        actions={
          <button
            onClick={() => handleOpenModal()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-sm font-bold text-xs text-white bg-[#14382C] hover:bg-[#1B4D3E] shadow-sm transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-[#F2D869]" />
            <span>Write New Article</span>
          </button>
        }
      />

      <div className="bg-white border border-[#E5E7EB] rounded-sm overflow-hidden shadow-sm">
        <div className="overflow-x-auto custom-admin-scrollbar">
          <table className="w-full text-left text-xs min-w-[760px]">
            <thead className="bg-[#F9FAFB] text-[#14382C] border-b border-[#E5E7EB]">
              <tr>
                <th className="px-4 py-3 font-bold text-[11px] uppercase tracking-wider">Article</th>
                <th className="px-4 py-3 font-bold text-[11px] uppercase tracking-wider">Category</th>
                <th className="px-4 py-3 font-bold text-[11px] uppercase tracking-wider">Author</th>
                <th className="px-4 py-3 font-bold text-[11px] uppercase tracking-wider">Published Date</th>
                <th className="px-4 py-3 font-bold text-[11px] uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {articles.length === 0 && !loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-[#9CA3AF]">
                    No news articles published yet.
                  </td>
                </tr>
              ) : (
                articles.map((item) => (
                  <tr key={item._id} className="hover:bg-[#F9FAFB]/70 transition-colors">
                    <td className="px-4 py-3.5 flex items-center gap-3">
                      <img
                        src={item.coverImage}
                        alt={item.title}
                        className="w-11 h-11 rounded-sm object-cover border border-[#E5E7EB] shrink-0"
                      />
                      <div className="min-w-0">
                        <strong className="text-[#111827] block font-bold text-xs sm:text-sm">{item.title}</strong>
                        <span className="text-xs text-[#6B7280] line-clamp-1">{item.summary}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="inline-block px-2.5 py-1 rounded-sm bg-[#EAF3EE] text-[#14382C] border border-[#14382C]/15 font-semibold text-[11px]">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-[#374151] font-medium">{item.author}</td>
                    <td className="px-4 py-3.5 text-[#4B5563] font-medium">
                      {new Date(item.publishedAt).toLocaleDateString('en-IN')}
                    </td>
                    <td className="px-4 py-3.5 text-right whitespace-nowrap space-x-2">
                      <button
                        onClick={() => handleOpenModal(item)}
                        className="p-2 rounded-sm bg-[#EAF3EE] text-[#14382C] hover:bg-[#14382C] hover:text-white border border-[#14382C]/15 transition cursor-pointer"
                        title="Edit article"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="p-2 rounded-sm bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200/80 transition cursor-pointer"
                        title="Delete article"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-[#0E241C]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-[#E5E7EB] rounded-sm max-w-xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto shadow-2xl custom-admin-scrollbar">
            <div className="flex justify-between items-center pb-3 border-b border-[#F1F5F9]">
              <h3 className="text-lg font-sans font-semibold text-[#111827]">
                {editingArticle ? 'Edit Article' : 'Write New Article'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-sm bg-[#F9FAFB] text-[#6B7280] hover:text-[#111827] flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-xs text-[#374151] font-bold mb-1.5">Article Title *</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-sm bg-[#F9FAFB] border border-[#E5E7EB] text-[#111827] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#14382C]/15 focus:border-[#14382C]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-[#374151] font-bold mb-1.5">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-sm bg-[#F9FAFB] border border-[#E5E7EB] text-[#111827] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#14382C]/15 focus:border-[#14382C]"
                  >
                    <option value="Field Stories">Field Stories</option>
                    <option value="Press Release">Press Release</option>
                    <option value="Annual Report">Annual Report</option>
                    <option value="Community Updates">Community Updates</option>
                    <option value="Awareness & Advocacy">Awareness & Advocacy</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-[#374151] font-bold mb-1.5">Author</label>
                  <input
                    type="text"
                    value={form.author}
                    onChange={(e) => setForm({ ...form, author: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-sm bg-[#F9FAFB] border border-[#E5E7EB] text-[#111827] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#14382C]/15 focus:border-[#14382C]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-[#374151] font-bold mb-1.5">Short Excerpt / Summary *</label>
                <input
                  type="text"
                  required
                  value={form.summary}
                  onChange={(e) => setForm({ ...form, summary: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-sm bg-[#F9FAFB] border border-[#E5E7EB] text-[#111827] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#14382C]/15 focus:border-[#14382C]"
                />
              </div>

              <div>
                <label className="block text-xs text-[#374151] font-bold mb-1.5">Full Article Body *</label>
                <textarea
                  rows={5}
                  required
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-sm bg-[#F9FAFB] border border-[#E5E7EB] text-[#111827] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#14382C]/15 focus:border-[#14382C]"
                />
              </div>

              <div>
                <label className="block text-xs text-[#374151] font-bold mb-1.5">Cover Image URL</label>
                <input
                  type="text"
                  value={form.coverImage}
                  onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-sm bg-[#F9FAFB] border border-[#E5E7EB] text-[#111827] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#14382C]/15 focus:border-[#14382C]"
                />
              </div>

              <div>
                <label className="block text-xs text-[#374151] font-bold mb-1.5">Tags (comma separated)</label>
                <input
                  type="text"
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-sm bg-[#F9FAFB] border border-[#E5E7EB] text-[#111827] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#14382C]/15 focus:border-[#14382C]"
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-3 border-t border-[#F1F5F9]">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-sm bg-[#F9FAFB] text-[#374151] hover:bg-slate-200 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-sm bg-[#14382C] hover:bg-[#1B4D3E] text-white font-bold text-xs cursor-pointer"
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

