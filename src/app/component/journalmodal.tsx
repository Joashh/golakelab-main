"use client";

import { useEffect, useRef, useState } from "react";
import { LuDownload, LuX } from "react-icons/lu";
import { getWpNonce } from "../lib/getWpNonce";

export default function JournalModal({ journal, onClose, onDownload }: any) {
  const [isDownloading, setIsDownloading] = useState(false);
  const hasTrackedView = useRef(false); // Prevent multiple view tracking

  useEffect(() => {
    // Only track view once when modal opens
    if (!hasTrackedView.current) {
      hasTrackedView.current = true;
      
      fetch(
        `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wpdm/v1/track-view/${journal.id}`,
        { method: "POST" }
      ).catch(error => console.error("View tracking failed:", error));
    }
  }, [journal.id]); // Remove dependency that might cause re-runs

  const handleDownload = async () => {
    if (isDownloading) return;
    
    setIsDownloading(true);
    
    try {
        // Get nonce (you'll need to expose this from WordPress)
        const nonce = await getWpNonce(); // Implement this function
        
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wpdm/v1/track-download/${journal.id}`,
            {
                method: "POST",
                headers: {
                    'X-WP-Nonce': nonce,
                    'Content-Type': 'application/json'
                }
            }
        );

        if (response.ok) {
            const data = await response.json();
            
            if (onDownload) {
                onDownload();
            }
            
            window.open(journal.download_url, "_blank");
        } else {
            console.error("Download tracking failed");
            window.open(journal.download_url, "_blank");
        }
    } catch (error) {
        console.error("Download error:", error);
        window.open(journal.download_url, "_blank");
    } finally {
        setIsDownloading(false);
    }
};

  // Rest of your component remains the same...
  const featured = journal._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  const category = journal._embedded?.["wp:term"]?.[0]?.[0]?.name;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white dark:bg-gray-900 rounded-xl max-w-lg w-full p-6 pt-10 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-black"
        >
          <LuX size={20}/>
        </button>

        {featured && (
          <img
            src={featured}
            className="rounded-lg mb-4 w-full"
            alt={journal.title.rendered}
          />
        )}

        <h2
          className="text-lg font-semibold "
          dangerouslySetInnerHTML={{ __html: journal.title.rendered }}
        />

        <div className="flex gap-2 items-center">
           <p className="text-xs text-gray-500 ">
          {new Date(journal.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
        </p>
                        <h1 className="font-light text-black/20 dark:text-white/50">|</h1>
        <p className="text-xs text-teal-600 ">
          {category}
        </p> 
        </div>
        

        <div
          className="text-sm text-gray-700 dark:text-gray-300 mb-4"
          dangerouslySetInnerHTML={{
            __html: journal.excerpt?.rendered || "No description available",
          }}
        />

        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="flex items-center gap-2 text-sm text-teal-600 font-semibold hover:underline disabled:opacity-50"
        >
          <LuDownload />
          {isDownloading ? "Processing..." : "Download"}
        </button>
      </div>
    </div>
  );
}