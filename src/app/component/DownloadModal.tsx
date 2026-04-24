'use client'
import { X, Download, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  journal: any;
}

export function DownloadModal({ isOpen, onClose, journal }: DownloadModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    affiliation: '',
    purpose: '',
    newsletter: false,
  });
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => {
    if (!isOpen || !journal?.id) return;

    const key = `viewed-${journal.id}`;
    if (sessionStorage.getItem(key)) return;

    sessionStorage.setItem(key, "true");

    fetch(
      `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/custom/v1/track-view/${journal.id}`,
      { method: "POST" }
    )
      .then(async (res) => {
        console.log("VIEW STATUS:", res.status);

        if (!res.ok) {
          const text = await res.text();
          console.error("VIEW ERROR BODY:", text);
        } else {
          const data = await res.json().catch(() => null);
          console.log("VIEW SUCCESS:", data);
        }
      })
      .catch((err) => {
        console.error("VIEW FETCH ERROR:", err);
      });

  }, [isOpen, journal?.id]); // ✅ fixed


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Submit form
      const submitRes = await fetch(
        `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/custom/v1/download-submit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            affiliation: formData.affiliation,
            purpose: formData.purpose,
            newsletter: formData.newsletter,
            file_id: journal.id,
            file_name: journal.title?.rendered,
          }),
        }
      );

      console.log("SUBMIT STATUS:", submitRes.status);

      const submitData = await submitRes.json().catch(() => null);
      console.log("SUBMIT RESPONSE:", submitData);

      // Track download
      const downloadRes = await fetch(
        `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/custom/v1/track-download/${journal.id}`,
        { method: "POST" }
      );

      console.log("DOWNLOAD STATUS:", downloadRes.status);

      // IMPORTANT: Read the response data
      const downloadData = await downloadRes.json();
      console.log("DOWNLOAD RESPONSE DATA:", downloadData);

      if (downloadData.success) {
        console.log(`✅ Download counted! New total: ${downloadData.downloads}`);
        console.log(`📊 WPDM downloads: ${downloadData.wpdm_downloads}`);
      }

      // Open file
      window.open(journal.download_url, "_blank");
      setSubmitted(true);

    } catch (error) {
      console.error("DOWNLOAD ERROR:", error);
      window.open(journal.download_url, "_blank");
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
        >
          {/* Header */}
          <div className="bg-linear-to-r from-slate-600 to-slate-700 p-6 text-white relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="size-5" />
            </button>
            <div className="flex items-center gap-3">
              <Download className="size-6" />
              <div>
                <h2 className="font-bold text-xl">Download Data</h2>
                <p className="text-sm text-sky-100">{journal?.title?.rendered}</p>
              </div>
            </div>
          </div>

          {/* Form */}
          {!submitted ? (
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <p className="text-sm text-slate-600 mb-4">
                Please provide the following information to access the lake data.
              </p>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Affiliation *
                </label>
                <input
                  type="text"
                  required
                  value={formData.affiliation}
                  onChange={(e) => setFormData({ ...formData, affiliation: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  placeholder="University, Organization, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Purpose of Data Use *
                </label>
                <textarea
                  required
                  value={formData.purpose}
                  onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent resize-none"
                  placeholder="Research, education, conservation planning, etc."
                />
              </div>

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="newsletter"
                  checked={formData.newsletter}
                  onChange={(e) => setFormData({ ...formData, newsletter: e.target.checked })}
                  className="mt-1"
                />
                <label htmlFor="newsletter" className="text-sm text-slate-600">
                  Subscribe to newsletter for updates on lake research and conservation
                </label>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2.5 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-lg hover:from-slate-700 hover:to-slate-800 transition-all font-medium"
                >
                  Download
                </button>
              </div>
            </form>
          ) : (
            <div className="p-12 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <CheckCircle className="size-16 text-emerald-500 mx-auto mb-4" />
              </motion.div>
              <h3 className="font-bold text-xl text-slate-900 mb-2">Download Starting!</h3>
              <p className="text-slate-600">Thank you for your interest in lake data.</p>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}