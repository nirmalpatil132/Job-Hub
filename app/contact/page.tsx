"use client";

import React, { useState } from "react";
import { useToast } from "@/lib/context/ToastContext";
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const { success } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    success("Message Sent", "Thank you! We will get back to you shortly.");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-primary-50 text-primary-700 inline-block">
          Get in Touch
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-mainText">Contact the JobHub Team</h1>
        <p className="text-sm text-subText">
          Have a question about employer partnerships, student registration, or technical feedback? Send us a message.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto items-start">
        {/* Contact Info Card */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 space-y-8 shadow-xl">
          <div>
            <h3 className="text-xl font-bold">Contact Information</h3>
            <p className="text-xs text-slate-400 mt-1">
              JobHub Headquarters & Academic Inquiries.
            </p>
          </div>

          <div className="space-y-5 text-sm">
            <div className="flex items-start gap-3.5">
              <MapPin className="w-5 h-5 text-primary-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">Pune Campus</p>
                <p className="text-xs text-slate-400">Shivajinagar, Pune, Maharashtra 411005</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <Mail className="w-5 h-5 text-primary-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">Email Address</p>
                <p className="text-xs text-slate-400">support@jobhub.edu</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <Phone className="w-5 h-5 text-primary-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">Helpline</p>
                <p className="text-xs text-slate-400">+91 (020) 2560-1234</p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300">
            <p className="font-semibold text-white mb-1">Academic Notice</p>
            <p className="text-slate-400 leading-relaxed">
              Inquiries regarding BCA project evaluation and demonstration can be scheduled directly with project coordinators.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-borderLine shadow-subtle">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-4 py-2.5 rounded-xl border border-borderLine text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-borderLine text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Subject *
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Recruiter Account Inquiry"
                  className="w-full px-4 py-2.5 rounded-xl border border-borderLine text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Message Content *
                </label>
                <textarea
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Write your question or feedback..."
                  className="w-full px-4 py-3 rounded-xl border border-borderLine text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-primary-600 hover:bg-primary-700 shadow-md transition flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>
            </form>
          ) : (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-mainText">Message Received!</h3>
              <p className="text-sm text-subText max-w-sm mx-auto">
                Thank you for contacting JobHub. We will review your inquiry and get in touch with you shortly.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: "", email: "", subject: "", message: "" });
                }}
                className="px-6 py-2 rounded-xl text-xs font-bold text-primary-600 bg-primary-50 hover:bg-primary-100"
              >
                Send Another Message
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
