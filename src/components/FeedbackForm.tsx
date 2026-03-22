"use client";

import { useState } from "react";
import { useI18n } from "@/locales";

type Status = "idle" | "submitting" | "success" | "error";

export default function FeedbackForm() {
  const { t, locale } = useI18n();
  const f = t.feedback;

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<{ email?: string; message?: string }>({});

  const validate = () => {
    const errs: { email?: string; message?: string } = {};
    if (!message.trim()) {
      errs.message = f.errors.messageRequired;
    } else if (message.trim().length < 10) {
      errs.message = f.errors.messageTooShort;
    } else if (message.trim().length > 2000) {
      errs.message = f.errors.messageTooLong;
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = f.errors.emailInvalid;
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), message: message.trim() }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section className="max-w-2xl mx-auto px-4 pb-12">
      <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">

        {/* 渐变顶部装饰区 */}
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 px-6 pt-6 pb-8 text-white text-center relative overflow-hidden">
          {/* 背景装饰圆 */}
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-white/10 rounded-full" />
          <div className="absolute -bottom-8 -left-4 w-24 h-24 bg-white/10 rounded-full" />

          <div className="relative">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-3">
              💬
            </div>
            <h2 className="text-lg font-bold">{f.title}</h2>
            <p className="text-sm text-green-100 mt-1">{f.subtitle}</p>
          </div>
        </div>

        {/* 表单区 / 成功状态 */}
        <div className="bg-white px-6 py-6">
          {status === "success" ? (
            <div className="py-6 text-center space-y-3 animate-fadeIn">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-3xl mx-auto">
                🎉
              </div>
              <h3 className="text-base font-bold text-gray-800">{f.successTitle}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.successDesc}</p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-2 inline-flex items-center gap-1.5 text-sm text-green-600 font-medium hover:text-green-700 transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M11 7H3M6 4L3 7l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {locale === "zh" ? "再次反馈" : "Submit another"}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 mb-2">
                  <span className="w-5 h-5 rounded-md bg-green-50 flex items-center justify-center text-xs">📧</span>
                  {f.emailLabel}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={f.emailPlaceholder}
                  className={`w-full px-4 py-3 rounded-2xl border-2 bg-gray-50 text-gray-800 text-sm focus:outline-none focus:bg-white transition-all placeholder:text-gray-300 ${
                    errors.email
                      ? "border-red-300 focus:border-red-400"
                      : "border-gray-100 focus:border-green-400"
                  }`}
                />
                {errors.email && (
                  <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                    <span>⚠️</span>{errors.email}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 mb-2">
                  <span className="w-5 h-5 rounded-md bg-green-50 flex items-center justify-center text-xs">✏️</span>
                  {f.messageLabel}
                  <span className="text-red-400 text-xs">*</span>
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={f.messagePlaceholder}
                  rows={4}
                  maxLength={2000}
                  className={`w-full px-4 py-3 rounded-2xl border-2 bg-gray-50 text-gray-800 text-sm focus:outline-none focus:bg-white transition-all placeholder:text-gray-300 resize-none ${
                    errors.message
                      ? "border-red-300 focus:border-red-400"
                      : "border-gray-100 focus:border-green-400"
                  }`}
                />
                <div className="flex justify-between items-center mt-1.5">
                  {errors.message ? (
                    <p className="text-xs text-red-500 flex items-center gap-1">
                      <span>⚠️</span>{errors.message}
                    </p>
                  ) : <span />}
                  <span className={`text-xs tabular-nums ${
                    message.length > 1800 ? "text-orange-400 font-medium" : "text-gray-300"
                  }`}>
                    {message.length} / 2000
                  </span>
                </div>
              </div>

              {/* Error Banner */}
              {status === "error" && (
                <div className="bg-red-50 border border-red-200 rounded-2xl px-4 py-3 text-sm text-red-600 flex items-center gap-2">
                  <span>⚠️</span>{f.errorTitle}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-bold shadow-lg shadow-green-200 hover:shadow-green-300 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
              >
                {status === "submitting" ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                    {f.submitting}
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M14 2L7 9M14 2L10 14l-3-5-5-3 12-4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {f.submit}
                  </span>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
