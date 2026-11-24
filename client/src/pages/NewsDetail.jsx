import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';
import api from '../services/api';
import { Calendar, User, ArrowLeft, Tag, Share2 } from 'lucide-react';

export const NewsDetail = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await api.get(`/news/${slug}`);
        if (res?.article) {
          setArticle(res.article);
        }
      } catch (err) {
        console.warn('Error fetching article:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="bg-white min-h-screen py-36 text-center text-slate-400 font-medium">
        Loading article...
      </div>
    );
  }

  if (!article) {
    return (
      <div className="bg-white min-h-screen py-36 text-center space-y-4">
        <h2 className="text-2xl font-bold text-[#121316]">Article Not Found</h2>
        <Link to="/news" className="text-[#121316] font-semibold underline hover:text-[#121316]">
          Back to all articles
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Standardized Hero */}
      <PageHero
        badge={article.category}
        title={article.title}
        subtitle={article.summary}
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'News & Stories', path: '/news' },
          { label: article.title },
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 space-y-8">
        <Link
          to="/news"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#121316] transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to News & Stories</span>
        </Link>

        {/* Metadata Bar */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pb-4 border-b border-slate-200">
          <span className="flex items-center gap-1.5">
            <User className="w-4 h-4 text-[#121316]" />
            <span>By {article.author}</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-[#121316]" />
            <span>
              {new Date(article.publishedAt).toLocaleDateString('en-IN', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </span>
          <span>•</span>
          <span>{article.viewsCount || 1} views</span>
        </div>

        {/* Cover Image */}
        <div className="rounded-3xl overflow-hidden shadow-card border border-slate-200 h-72 sm:h-96">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Body */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-card space-y-6 text-[#121316] leading-relaxed text-sm sm:text-base whitespace-pre-line">
          {article.content}
        </div>

        {/* Tags */}
        {article.tags?.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <Tag className="w-4 h-4 text-slate-400" />
            {article.tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-white text-slate-600 border border-slate-200 text-xs font-medium px-3 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
