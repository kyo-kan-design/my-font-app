// src/App.jsx
import React, { useState, useEffect } from 'react';
import { Copy, RefreshCcw, Settings2, CheckCircle2, Smartphone, Monitor, Edit3, ShieldCheck, X, ExternalLink, ArrowLeft, Mail, History, Scale, FileText, Lightbulb, Type } from 'lucide-react';
import { articles } from './articles';
import { fontGuide } from './guideContent';
import ArticleList from './ArticleList';
import Article from './Article';

const XIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
  </svg>
);

const GOOGLE_FONTS = [
  { name: 'Noto Sans JP', value: "'Noto Sans JP', sans-serif" },
  { name: 'Noto Serif JP', value: "'Noto Serif JP', serif" },
  { name: 'M PLUS 1p', value: "'M PLUS 1p', sans-serif" },
  { name: 'Sawarabi Mincho', value: "'Sawarabi Mincho', serif" },
  { name: 'Sawarabi Gothic', value: "'Sawarabi Gothic', sans-serif" },
  { name: 'Shippori Mincho', value: "'Shippori Mincho', serif" },
  { name: 'Zen Kaku Gothic New', value: "'Zen Kaku Gothic New', sans-serif" },
  { name: 'Kaisei Opti', value: "'Kaisei Opti', serif" },
];

const PRESET_TEXTS = [
  { title: { ja: "サービス紹介", en: "Service Intro" }, heading: "デザインの力で、ビジネスを加速させる。", body: "私たちは、ユーザー体験を第一に考えたUI/UXデザインを提供します。最新の技術と深い洞察に基づき、あなたのビジネスが直面する課題を解決へと導きます。まずは気軽にご相談ください。" },
  { title: { ja: "ニュース記事", en: "News Article" }, heading: "最新のAIデザインツール、現場への導入が加速", body: "近年、AIを活用したデザイン制作が急速に普及しています。特にプロトタイピングの高速化において、従来のワークフローを大幅に改善する事例が増えており、多くのデザイナーがその恩恵を受けています。" }
];

const VIEWPORT_SIZES = { mobile: { width: '375px' }, pc: { width: '100%' } };
const PRIMARY_COLOR = '#6B8EAD';

export default function App() {
  const [view, setView] = useState('home');
  const [articleSlug, setArticleSlug] = useState(null);
  const [headingFont, setHeadingFont] = useState(GOOGLE_FONTS[1]);
  const [bodyFont, setBodyFont] = useState(GOOGLE_FONTS[0]);
  const [headingSize] = useState(48);
  const [bodySize] = useState(16);
  const [lineHeight] = useState(1.8);
  const [letterSpacing] = useState(0.05);
  const [previewMode, setPreviewMode] = useState('pc');
  const [headingColor] = useState('#0f172a');
  const [bodyColor] = useState('#334155');
  const [headingWeight] = useState(700);
  const [bodyWeight] = useState(400);
  const [headingText, setHeadingText] = useState(PRESET_TEXTS[0].heading);
  const [bodyText, setBodyText] = useState(PRESET_TEXTS[0].body);
  const [activePresetIndex, setActivePresetIndex] = useState(0);
  const [showToast, setShowToast] = useState(false);

  // ルーティング
  useEffect(() => {
    const handleLocation = () => {
      try {
        const path = window.location.pathname;
        if (path.startsWith('/article/')) {
          const slug = path.replace('/article/', '');
          setArticleSlug(slug);
          setView('article');
        } else if (path === '/guide') setView('guide');
        else if (path === '/column') setView('column');
        else if (path === '/privacy') setView('privacy');
        else if (path === '/contact') setView('contact');
        else setView('home');
      } catch (e) { setView('home'); }
    };
    handleLocation();
    window.addEventListener('popstate', handleLocation);
    return () => window.removeEventListener('popstate', handleLocation);
  }, []);

  // フォント読み込み
  useEffect(() => {
    const fontId = 'google-fonts-link';
    let link = document.getElementById(fontId);
    if (!link) {
      link = document.createElement('link');
      link.id = fontId;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
    const fontFamilies = GOOGLE_FONTS.map(f => `family=${f.name.replace(/ /g, '+')}:wght@300;400;500;700;900`).join('&');
    link.href = `https://fonts.googleapis.com/css2?${fontFamilies}&display=swap`;
  }, []);

  const copyCSS = async () => {
    const css = `h1 { font-family: ${headingFont.value}; font-weight: ${headingWeight}; font-size: ${headingSize}px; }\nbody { font-family: ${bodyFont.value}; font-weight: ${bodyWeight}; font-size: ${bodySize}px; line-height: ${lineHeight}; letter-spacing: ${letterSpacing}em; }`;
    try { await navigator.clipboard.writeText(css); } catch (err) {}
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const randomize = () => {
    setHeadingFont(GOOGLE_FONTS[Math.floor(Math.random() * GOOGLE_FONTS.length)]);
    setBodyFont(GOOGLE_FONTS[Math.floor(Math.random() * GOOGLE_FONTS.length)]);
  };

  const navigateTo = (newView, path) => {
    if (newView === 'article') {
      const slug = path.replace('/article/', '');
      setArticleSlug(slug);
    }
    setView(newView);
    try { window.history.pushState({}, '', path); } catch (e) {}
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const PageWrapper = ({ children, title, icon: Icon, backLabel }) => (
    <div className="max-w-5xl mx-auto w-full px-4 mb-24 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button onClick={() => navigateTo('home', '/')} className="flex items-center gap-2 text-xs font-black text-slate-400 hover:text-slate-900 transition-all uppercase tracking-widest group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        {backLabel}
      </button>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-white shadow-sm border border-slate-100">
            <Icon className="w-8 h-8" style={{ color: PRIMARY_COLOR }} />
          </div>
          <h2 className="text-4xl font-black tracking-tighter text-slate-900">{title}</h2>
        </div>
        <div className="h-1 w-20 rounded-full" style={{ backgroundColor: PRIMARY_COLOR }}></div>
      </div>
      {children}
    </div>
  );

  const renderSimulator = () => (
    <main id="simulator" className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-24">
      <aside className="lg:col-span-4 space-y-6">
        <div className="bg-white p-7 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-4">
            <Edit3 className="w-5 h-5" style={{ color: PRIMARY_COLOR }} />
            <h2 className="text-lg font-bold">テキスト編集</h2>
          </div>
          <div className="space-y-4">
            <section>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">見出し</label>
              <input type="text" value={headingText} onChange={(e) => setHeadingText(e.target.value)} className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none" />
            </section>
            <section>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">本文</label>
              <textarea rows="4" value={bodyText} onChange={(e) => setBodyText(e.target.value)} className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none resize-none" />
            </section>
            <div className="grid grid-cols-2 gap-2">
              {PRESET_TEXTS.map((p, idx) => (
                <button key={idx} onClick={() => { setHeadingText(p.heading); setBodyText(p.body); setActivePresetIndex(idx); }} className={`py-2 text-xs rounded-lg border ${activePresetIndex === idx ? 'text-white font-bold border-transparent' : 'bg-white border-slate-200 text-slate-400'}`} style={{ backgroundColor: activePresetIndex === idx ? PRIMARY_COLOR : '' }}>
                  {p.title.ja}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white p-7 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
            <Settings2 className="w-5 h-5" style={{ color: PRIMARY_COLOR }} />
            <h2 className="text-lg font-bold">タイポグラフィ</h2>
          </div>
          <div className="space-y-6">
            <section>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">見出しフォント</label>
              <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm" value={headingFont.name} onChange={(e) => setHeadingFont(GOOGLE_FONTS.find(f => f.name === e.target.value))}>
                {GOOGLE_FONTS.map(f => <option key={f.name} value={f.name}>{f.name}</option>)}
              </select>
            </section>
            <section>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">本文フォント</label>
              <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm" value={bodyFont.name} onChange={(e) => setBodyFont(GOOGLE_FONTS.find(f => f.name === e.target.value))}>
                {GOOGLE_FONTS.map(f => <option key={f.name} value={f.name}>{f.name}</option>)}
              </select>
            </section>
            <div className="flex flex-col gap-3 pt-6 border-t border-slate-100">
              <button onClick={randomize} className="flex items-center justify-center gap-2 w-full py-4 bg-slate-50 hover:bg-slate-100 text-slate-500 rounded-xl font-black border border-slate-200">
                <RefreshCcw className="w-4 h-4" /> シャッフル
              </button>
              <button onClick={copyCSS} className="flex items-center justify-center gap-2 w-full py-4 text-white rounded-xl font-black shadow-xl active:scale-95" style={{ backgroundColor: PRIMARY_COLOR }}>
                <Copy className="w-4 h-4" /> CSSをコピー
              </button>
            </div>
          </div>
        </div>
      </aside>

      <article className="lg:col-span-8">
        <div className="lg:sticky lg:top-8 flex flex-col items-center">
          <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden w-full" style={{ width: VIEWPORT_SIZES[previewMode].width, maxWidth: '100%' }}>
            <div className="p-8 md:p-16 min-h-[500px] flex flex-col justify-center bg-white">
              <h1 className="mb-8 leading-[1.3]" style={{ fontFamily: headingFont.value, fontWeight: headingWeight, fontSize: `${headingSize}px`, color: headingColor, letterSpacing: `${letterSpacing}em` }}>{headingText}</h1>
              <p style={{ fontFamily: bodyFont.value, fontWeight: bodyWeight, fontSize: `${bodySize}px`, color: bodyColor, lineHeight, letterSpacing: `${letterSpacing}em` }}>{bodyText}</p>
            </div>
          </div>
        </div>
      </article>
    </main>
  );

  const renderGuide = () => (
    <PageWrapper title="実践:日本語フォント比較ガイド" icon={FileText} backLabel="シミュレーターに戻る">
      <p className="text-slate-500 max-w-2xl text-lg leading-relaxed">
        日本語フォント選定で重要なのは、各フォントが持つ「情緒的価値」を理解することです。Google Fontsの代表的な8書体について、特徴と適した用途を解説します。
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fontGuide.map((f, i) => (
          <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow