import React, { useState, useEffect } from 'react';
import { useWebsite } from '../context/WebsiteContext';
import { PageHero } from '../components/PageHero';
import api from '../services/api';
import { Calendar, MapPin, Users, CheckCircle2 } from 'lucide-react';

export const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await api.get('/activities');
        if (res?.activities) {
          setActivities(res.activities);
        }
      } catch (err) {
        console.warn('Error fetching activities:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  return (
    <div className="bg-[#F7F7F5] min-h-screen">
      {/* Standardized Hero */}
      <PageHero
        badge="Field Reports & Operations"
        title="Our On-Ground Relief Drives"
        subtitle="Documenting weekly pediatric health camps, winter quilt distributions, nutrition ration handovers, and community development missions across India."
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Field Activities' },
        ]}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        {loading ? (
          <div className="py-24 text-center text-[#A0A4AE] font-medium">Loading field activities...</div>
        ) : activities.length === 0 ? (
          <div className="py-24 text-center text-[#697386]">No field activities recorded yet.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activities.map((act) => (
              <div
                key={act._id}
                className="bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 border border-[#E8E8E5] flex flex-col group hover:-translate-y-1"
              >
                <div className="h-56 overflow-hidden relative">
                  <img
                    src={act.coverImage}
                    alt={act.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[#0B0D17]/85 backdrop-blur-md text-[#FFC43D] border border-white/10 text-xs font-bold px-3 py-1 rounded-full">
                    {act.category}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-xs text-[#697386]">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#0B0D17]" />
                        {new Date(act.date).toLocaleDateString('en-IN', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#0B0D17]" />
                        {act.location}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-[#151A2D] group-hover:text-[#0B0D17] transition-colors leading-snug">
                      {act.title}
                    </h3>

                    <p className="text-xs text-[#697386] leading-relaxed whitespace-pre-line line-clamp-3">
                      {act.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E8E8E5] flex items-center justify-between text-xs">
                    <span className="text-[#697386]">People Reached:</span>
                    <strong className="text-[#0B0D17] font-bold">
                      {act.beneficiariesCount} Beneficiaries
                    </strong>
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
