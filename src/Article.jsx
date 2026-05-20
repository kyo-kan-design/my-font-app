// src/Article.jsx
import React from 'react';
import { ArrowLeft, BookOpen, Calendar } from 'lucide-react';

const PRIMARY_COLOR = '#6B8EAD';

export default function Article({ article, navigateTo }) {
  if (!article) {
    return (
      <div className="max-w-3xl mx-auto w-full px-4 mb-24 text-center py-20">
        <p className="text-slate-500 mb-6">記事が見つかりませんでした。</p>
        <button
          onClick={() => navigateTo('column')}
          className="px-6 py-3 rounded-xl text-white font-bold"
          style={{ backgroundColor: PRIMARY_COLOR }}
        >
          コラム一覧に戻る
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto w-full px-4 mb-24 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button
        onClick={() => navigateTo('column')}
        className="flex items-center gap-2 text-xs font-black text-slate-400 hover:text-slate-900 transition-all uppercase tracking-widest group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        コラム一覧に戻る
      </button>

      <header className="space-y-6 border-b border-slate-200 pb-10">
        <div className="flex items-center gap-3 text-slate-400 font-black uppercase tracking-widest text-xs">
          <BookOpen className="w-4 h-4" />
          KumiFont Column
        </div>

        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 leading-tight">
          {article.title}
        </h1>

        <p className="text-lg text-slate-500 leading-relaxed">
          {article.description}
        </p>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Calendar className="w-3.5 h-3.5" />
          <time>{article.date}</time>
        </div>
      </header>

      <article className="prose prose-slate max-w-none space-y-12 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100">
        {article.sections.map((section, idx) => (
          <section key={idx} className="space-y-4">
            <h2
              className="text-2xl font-black text-slate-900 border-l-4 pl-4"
              style={{ borderColor: PRIMARY_COLOR }}
            >
              {section.heading}
            </h2>

            {section.body.split('\n\n').map((para, i) => (
              <p key={i} className="text-slate-700 leading-loose whitespace-pre-line">
                {para}
              </p>
            ))}
          </section>
        ))}
      </article>

      <div className="pt-8 border-t border-slate-200 text-center">
        <button
          onClick={() => navigateTo('column')}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold shadow-lg active:scale-95 transition-all"
          style={{ backgroundColor: PRIMARY_COLOR }}
        >
          <ArrowLeft className="w-4 h-4" />
          コラム一覧へ
        </button>
      </div>
    </div>
  );
}