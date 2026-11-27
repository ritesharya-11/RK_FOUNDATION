import React, { useState, useRef } from 'react';
import api from '../services/api';
import { UploadCloud, CheckCircle2, AlertCircle, X, Image as ImageIcon } from 'lucide-react';

export const ImageUploader = ({ value, onChange, label = 'Upload Image (ImageKit CDN or URL)' }) => {
  const [uploading, setUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileUpload = async (file) => {
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please upload a valid image file (JPEG, PNG, WEBP, SVG).');
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg('File size exceeds 5MB limit.');
      return;
    }

    setErrorMsg('');
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('image', file);

      // Call our API endpoint which uploads to ImageKit (or fallback)
      const token = localStorage.getItem('rk_token');
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || '/api'}/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || !data.imageUrl) {
        throw new Error(data.message || 'Image upload failed');
      }

      onChange(data.imageUrl);
    } catch (err) {
      setErrorMsg(err.message || 'Error uploading image to ImageKit.');
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-[#374151] font-semibold text-xs">{label}</label>

      {/* Preview Box */}
      {value ? (
        <div className="relative rounded-sm overflow-hidden bg-slate-100 border border-[#E5E7EB] h-36 flex items-center justify-center group">
          <img
            src={value}
            alt="Uploaded preview"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 rounded-sm bg-[#14382C] text-white text-xs font-bold hover:bg-[#1B4D3E] cursor-pointer"
            >
              Replace
            </button>
            <button
              type="button"
              onClick={() => onChange('')}
              className="px-3 py-1.5 rounded-sm bg-rose-600 text-white text-xs font-bold hover:bg-rose-500 cursor-pointer"
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-sm p-5 text-center cursor-pointer transition flex flex-col items-center justify-center space-y-2 ${
            isDragOver
              ? 'border-[#14382C] bg-[#EAF3EE]'
              : 'border-slate-300 bg-[#F9FAFB] hover:border-[#14382C]/50'
          }`}
        >
          <UploadCloud className="w-8 h-8 text-[#14382C]" />
          <div className="space-y-0.5">
            <p className="text-xs font-semibold text-[#111827]">
              {uploading ? 'Uploading to ImageKit Cloud...' : 'Click to upload or drag & drop'}
            </p>
            <p className="text-[11px] text-[#6B7280]">PNG, JPG, WEBP or SVG up to 5MB</p>
          </div>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files?.[0]) {
            handleFileUpload(e.target.files[0]);
          }
        }}
        className="hidden"
      />

      {/* URL Direct Input */}
      <div className="flex gap-2 pt-1">
        <input
          type="text"
          placeholder="Or paste direct ImageKit / image CDN URL..."
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-3 py-2 rounded-sm bg-white border border-[#E5E7EB] text-[#111827] text-xs focus:outline-none focus:border-[#14382C] focus:ring-2 focus:ring-[#14382C]/15"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="p-2 rounded-sm bg-slate-100 text-[#6B7280] hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {errorMsg && (
        <p className="text-[11px] text-rose-600 font-medium flex items-center gap-1 mt-1">
          <AlertCircle className="w-3 h-3 shrink-0" />
          <span>{errorMsg}</span>
        </p>
      )}
    </div>
  );
};

