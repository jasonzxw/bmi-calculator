"use client";

import { useState } from "react";
import { useI18n } from "@/locales";

type Status = "idle" | "submitting" | "success" | "error";

export default function FeedbackForm() {
  const { t } = useI18n();
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

  if (status === "success") {
    return (
      <section className="max-w-2xl mx-auto px-4 pb-8">
        <div className="bg-green-50 border-2 border-green-200 rounded-3xl p-8 text-center">
          <div className="text-4xl mb-3">🎉</div>
          <h3 className="text-lg font-bold text-green-700 mb-1">
            {f.successTitle}
          </h3>
          <p className="text-sm text-green-600">{f.successDesc}</p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-4 text-sm text-green-600 underline underline-offset-2"
          >
            {t.result.recalculate.replace("重新计算", "再次反馈").replace("Recalculate", "Submit another")}
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-2xl mx-auto px-4 pb-8">
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">{f.title}</h2>
          <p className="text-sm text-gray-400 mt-1">{f.subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {f.emailLabel}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={f.emailPlaceholder}
              className={`w-full px-4 py-3 rounded-2xl border-2 bg-white text-gray-800 text-sm focus:outline-none transition-colors placeholder:text-gray-300 ${
                errors.email
                  ? "border-red-300 focus:border-red-400"
                  : "border-gray-200 focus:border-green-500"
              }`}
            />
            {errors.email && (
              <p className="mt-1.5 text-xs text-red-500">⚠️ {errors.email}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {f.messageLabel}
              <span className="text-red-400 ml-0.5">*</span>
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={f.messagePlaceholder}
              rows={4}
              className={`w-full px-4 py-3 rounded-2xl border-2 bg-white text-gray-800 text-sm focus:outline-none transition-colors placeholder:text-gray-300 resize-none ${
                errors.message
                  ? "border-red-300 focus:border-red-400"
                  : "border-gray-200 focus:border-green-500"
              }`}
            />
            <div className="flex justify-between items-center mt-1.5">
              {errors.message ? (
                <p className="text-xs text-red-500">⚠️ {errors.message}</p>
              ) : (
                <span />
              )}
              <span className="text-xs text-gray-300">{message.length}</span>
            </div>
          </div>

          {/* Error Banner */}
          {status === "error" && (
            <div className="bg-red-50 border border-red-200 rounded-2xl px-4 py-3 text-sm text-red-600">
              ⚠️ {f.errorTitle}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-sm shadow-lg shadow-green-200 hover:shadow-green-300 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
          >
            {status === "submitting" ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                {f.submitting}
              </span>
            ) : (
              `✉️ ${f.submit}`
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
