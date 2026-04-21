'use client';
import { useState, useEffect } from 'react';
import { FiFrown, FiMeh, FiSmile } from 'react-icons/fi';

export default function SmileySurvey() {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('voted')) {
      setSubmitted(true);
    }
  }, []);

  const handleVote = async (score: number) => {
    if (localStorage.getItem('voted')) return;

    setSelected(score);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/feedback/v1/vote`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ score }),
        }
      );

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        localStorage.setItem('voted', 'true');
      }
    } catch (err) {
      console.error('Feedback submission failed', err);
    }
  };

  if (submitted) return null;

  const satisfactionLevels = [
    {
      value: 1,
      label: 'Very Bad',
      icon: FiFrown,
      color: 'text-red-500',
      bgColor: 'bg-red-50',
      hoverBg: 'hover:bg-red-100',
      selectedBg: 'bg-red-500',
    },
    {
      value: 2,
      label: 'Bad',
      icon: FiFrown,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
      hoverBg: 'hover:bg-orange-100',
      selectedBg: 'bg-orange-500',
    },
    {
      value: 3,
      label: 'Okay',
      icon: FiMeh,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50',
      hoverBg: 'hover:bg-yellow-100',
      selectedBg: 'bg-yellow-500',
    },
    {
      value: 4,
      label: 'Good',
      icon: FiSmile,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
      hoverBg: 'hover:bg-green-100',
      selectedBg: 'bg-green-500',
    },
    {
      value: 5,
      label: 'Excellent',
      icon: FiSmile,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-50',
      hoverBg: 'hover:bg-emerald-100',
      selectedBg: 'bg-emerald-500',
    },
  ];

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-4 border border-slate-200">
      <h3 className="text-base font-bold text-slate-800 text-center mb-1">
        How satisfied are you with our website?
      </h3>

      <p className="text-slate-600 text-center mb-3 text-[10px]">
        Your feedback helps us improve the GoLake Lab experience
      </p>

      <div className="grid grid-cols-5 gap-1.5 md:gap-2">
        {satisfactionLevels.map((level) => {
          const Icon = level.icon;
          const isSelected = selected === level.value;

          return (
            <button
              key={level.value}
              onClick={() => handleVote(level.value)}
              className={`
                relative flex flex-col items-center justify-center p-2 rounded-lg
                transition-all duration-300 transform hover:scale-105
                ${
                  isSelected
                    ? `${level.selectedBg} text-white shadow-lg scale-105`
                    : `${level.bgColor} ${level.hoverBg} border border-slate-200 hover:border-slate-300`
                }
              `}
            >
              <Icon
                className={`size-4 mb-1 ${
                  isSelected ? 'text-white' : level.color
                }`}
              />

              <span
                className={`text-[9px] font-medium text-center leading-tight ${
                  isSelected ? 'text-white' : 'text-slate-700'
                }`}
              >
                {level.label}
              </span>

              {isSelected && (
                <div className="absolute -top-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                  <svg
                    className="size-2.5 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {selected && (
        <div className="mt-2 text-center">
          <p className="text-green-600 font-medium text-[10px]">
            ✓ Thank you for your feedback!
          </p>
        </div>
      )}
    </div>
  );
}