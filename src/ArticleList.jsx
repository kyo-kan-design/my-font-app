// src/ArticleList.jsx
import React from 'react';
import { ArrowLeft, Lightbulb, Calendar, ArrowRight } from 'lucide-react';
import { articles } from './articles';

const PRIMARY_COLOR = '#6B8EAD';

export default function ArticleList({ navigateTo, backLabel }) {
  return (
    <div className="max-w-5xl mx-auto w-full px-4 mb-24 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button
        onClick={() => navigateTo('home', '/')}
        className="flex items-center gap-2 text-xs font-black text-slate-400 hover:text-slate-900 transition-all uppercase tracking-widest group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        {backLabel}
      </button>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-white shadow-sm border border-slate-100">
            <Lightbulb className="w-8 h-8" style={{ color: PRIMARY_COLOR }} />
          </div>
          <h2 className="text-4xl font-black tracking-tighter text-slate-900">専門家コラム</h2>
        </div>
        <div className="h-1 w-20 rounded-full" style={{ backgroundColor: PRIMARY_COLOR }}></div>
        <p className="text-slate-500 max-w-2xl text-lg leading-relaxed pt-2">
          日本語Webタイポグラフィの実践知を、現役UXデザイナーが解説します。フォント選定、字間・行間設計、ブランディングまで、現場で使える知見をお届けします。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((a) => (
          <button
            key={a.slug}
            onClick={() => navigateTo('article', `/article/${a.slug}`)}
            className="text-left bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all group"
          >
            <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
              <Calendar className="w-3 h-3" />
              <time>{a.date}</time>
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-3 leading-snug group-hover:underline">
              {a.title}
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed mb-6 line-clamp-3">
              {a.description}
            </p>
            <span
              className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest"
              style={{ color: PRIMARY_COLOR }}
            >
              続きを読む
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}