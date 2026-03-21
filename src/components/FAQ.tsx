"use client";

import { useState } from "react";
import { useI18n } from "@/locales";

export default function FAQ() {
  const { t } = useI18n();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="max-w-2xl mx-auto px-4 pb-8">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">{t.faq.title}</h2>
        <p className="text-sm text-gray-400 mt-1">{t.faq.subtitle}</p>
      </div>

      <div className="space-y-3">
        {t.faq.items.map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
          >
            <button
              onClick={() => toggle(i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left gap-3"
            >
              <span className="text-sm font-semibold text-gray-800 leading-snug">
                {item.q}
              </span>
              <span
                className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 ${
                  openIndex === i
                    ? "bg-green-500 text-white rotate-45"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    d="M6 1v10M1 6h10"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </button>

            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                openIndex === i ? "max-h-96" : "max-h-0"
              }`}
            >
              <p className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-50 pt-3">
                {item.a}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
