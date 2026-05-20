import React from 'react';
import { Mail, ExternalLink } from 'lucide-react';

const PRIMARY_COLOR = '#6B8EAD';

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto w-full px-4 mb-24 space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-white shadow-sm border border-slate-100">
            <Mail className="w-8 h-8" style={{ color: PRIMARY_COLOR }} />
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-slate-900">お問い合わせ</h1>
        </div>
        <div className="h-1 w-20 rounded-full" style={{ backgroundColor: PRIMARY_COLOR }}></div>
      </div>

      <section className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6 text-slate-700 leading-relaxed">
        <p>
          KumiFont に関するご意見・ご質問・取材のご相談は、共感デザイン研究所の公式サイトよりお問い合わせください。
        </p>
        <a
          href="https://kyo-kan-design.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-bold hover:underline"
          style={{ color: PRIMARY_COLOR }}
        >
          共感デザイン研究所の問い合わせページへ
          <ExternalLink className="w-4 h-4" />
        </a>
      </section>
    </div>
  );
}
