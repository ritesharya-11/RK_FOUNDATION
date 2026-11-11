import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';
import api from '../services/api';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';

export const News = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await api.get('/news');
        if (res?.articles) {
          setArticles(res.articles);
        }
      } catch (err) {
        console.warn('Error fetching news:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="bg-[#F7F7F5] min-h-screen">
      {/* Standardized Hero */}
      <PageHero
        badge="Press & Dispatches"
        title="Latest News & Impact Stories"
        subtitle="Read inspiring field dispatches directly from our educators, medical camps, and community beneficiaries across India."
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'News & Stories' },
        ]}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        {loading ? (
          <div className="py-24 text-center text-[#A0A4AE] font-medium">Loading articles...</div>
        ) : articles.length === 0 ? (
          <div className="py-24 text-center text-[#697386]">No news articles published yet.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 border border-[#E8E8E5] flex flex-col group hover:-translate-y-1"
              >
                <div className="h-56 overflow-hidden relative">
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[#0B0D17]/85 backdrop-blur-md text-[#FFC43D] border border-white/10 text-xs font-bold px-3 py-1 rounded-full">
                    {item.category}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-xs text-[#697386]">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#0B0D17]" />
                        {new Date(item.publishedAt).toLocaleDateString('en-IN', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-[#0B0D17]" />
                        {item.author?.split(' ')[0] || 'Team'}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-[#151A2D] group-hover:text-[#0B0D17] transition-colors line-clamp-2 leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-xs text-[#697386] line-clamp-3 leading-relaxed">
                      {item.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E8E8E5] flex items-center justify-between">
                    <Link
                      to={`/news/${item.slug}`}
                      className="text-xs font-bold text-[#0B0D17] hover:text-[#FFC43D] flex items-center gap-1.5 transition-colors group/link"
                    >
                      <span>Read Story</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#FFC43D] group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
