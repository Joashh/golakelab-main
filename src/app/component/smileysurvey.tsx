'use client';
import { useState, useEffect } from 'react';
import { FiFrown, FiMeh, FiSmile } from 'react-icons/fi';

export default function SmileySurvey() {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // Check localStorage on mount
  useEffect(() => {
    if (localStorage.getItem('voted')) {
      setSubmitted(true);
    }
  }, []);

  const handleVote = async (score: number) => {
    if (localStorage.getItem('voted')) {
      return; // silently ignore if already voted
    }

    setSelected(score);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_WP_URL}/wp-json/feedback/v1/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ score }),
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        localStorage.setItem('voted', 'true');
      }
    } catch (err) {
      console.error('Feedback submission failed', err);
    }
  };

  // Map 1–5 to icons
  const icons = [<FiFrown />, <FiFrown />, <FiMeh />, <FiSmile />, <FiSmile />];

  // Hide the survey completely if already submitted
  if (submitted) return null;

  return (
    <div className="flex flex-col items-center gap-4 p-6 mt-8 max-w-md mx-auto">
      <h3 className="md:text-base text-black/40 dark:text-white/70 text-center text-sm">
        How satisfied are you with our site?
      </h3>
      <div className="flex gap-3">
        {[1, 2, 3, 4, 5].map((score, i) => (
          <button
            key={score}
            onClick={() => handleVote(score)}
            className={`text-3xl transition-transform hover:scale-125 ${
              selected === score ? 'scale-125 text-blue-600' : 'text-black/40 dark:text-white/70'
            }`}
          >
            {icons[i]}
          </button>
        ))}
      </div>
    </div>
  );
}