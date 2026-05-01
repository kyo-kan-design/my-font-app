// src/App.jsx
import React, { useState, useEffect } from 'react';
import {
  Copy, RefreshCcw, Settings2, CheckCircle2, Smartphone, Monitor,
  Edit3, ShieldCheck, X, ExternalLink, ArrowLeft, Mail,
  FileText, Lightbulb, Type
} from 'lucide-react';
import { articles } from './articles';
import { fontGuide } from './guideContent';
import ArticleList from './ArticleList';
import Article from './Article';

const XIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
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
  {
    title: 'サービス紹介',
    heading: 'デザインの力で、ビジネスを加速させる。',
    body: '私たちは、ユーザー体験を第一に考えたUI/UXデザインを提供します。最新の技術と深い洞察に基づき、あなたのビジネスが直面する課題を解決へと導きます。まずは気軽にご相談ください。'
  },
  {
    title: 'ニュース記事',
    heading: '最新のAIデザインツール、現場への導入が加速',
    body: '近年、AIを活用したデザイン制作が急速に普及しています。特にプロトタイピングの高速化において、従来のワークフローを大幅に改善する事例が増えており、多くのデザイナーがその恩恵を受けています。'
  }
];

const VIEWPORT_SIZES = { mobile: '375px', pc: '100%' };
const PRIMARY_COLOR = '#6B8EAD';

export default function App() {
  const [view, setView] = useState('home');
  const [articleSlug, setArticleSlug] = useState(null);
  const [headingFont, setHeadingFont] = useState(GOOGLE_FONTS[1]);
  const [bodyFont, setBodyFont] = useState(GOOGLE_FONTS[0]);
  const [previewMode, setPreviewMode] = useState('pc');
  const [headingText, setHeadingText] = useState(PRESET_TEXTS[0].heading);
  const [bodyText, setBodyText] = useState(PRESET_TEXTS[0].body);
  const [activePreset, setActivePreset] = useState(0);
  const [showToast, setShowToast] = useState(false);

  // ルーティング
  useEffect(() => {
    const handleLocation = () => {
      const path = window.location.pathname;
      if (path.startsWith('/article/')) {
        setArticleSlug(path.replace('/article/', ''));
        setView('article');
      } else if (path === '/guide') setView('guide');
      else if (path === '/column') setView('column');
      else if (path === '/privacy') setView('privacy');
      else if (path === '/contact') setView('contact');
      else setView('home');
    };
    handleLocation();
    window.addEventListener('popstate', handleLocation);
    return () => window.removeEventListener('popstate', handleLocation);
  }, []);

  // フォント読み込み
  useEffect(() => {
    const id = 'google-fonts-link';
    let link = document.getElementById(id);
    if (!link) {
      link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
    const families = GOOGLE_FONTS
      .map(f => `family=${f.name.replace(/ /g, '+')}:wght@300;400;500;700;900`)
      .join('&');
    link.href = `https://fonts.googleapis.com/css2?${families}&display=swap`;
  }, []);

  const navigateTo = (newView, path) => {
    if (newView === 'article') {
      setArticleSlug(path.replace('/article/', ''));
    }
    setView(newView);
    window.history.pushState({}, '', path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyCSS = async () => {
    const css = `h1 { font-family: ${headingFont.value}; font-weight: 700; font-size: 48px; letter-spacing: 0.05em; }
body { font-family: ${bodyFont.value}; font-weight: 400; font-size: 16px; line-height: 1.8; letter-spacing: 0.05em; }`;
    try { await navigator.clipboard.writeText(css); } catch (e) {}
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const shuffle = () => {
    setHeadingFont(GOOGLE_FONTS[Math.floor(Math.random() * GOOGLE_FONTS.length)]);
    setBodyFont(GOOGLE_FONTS[Math.floor(Math.random() * GOOGLE_FONTS.length)]);
  };

  const Header = () => (
    <header className="max-w-7xl mx-auto w-full mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div className="flex items-center gap-6">
        <div className="cursor-pointer" onClick={() => navigateTo('home', '/')}>
          <h1 className="text-3xl font-black tracking-tighter leading-none text-black">KumiFont</h1>
          <p className="text-slate-500 text-[10px] font-medium mt-2 uppercase tracking-tighter">
            produced by{' '}
            <a href="https://kyo-kan-design.com/" target="_blank" rel="noopener noreferrer" className="text-slate-700 font-bold hover:underline">
              共感デザイン研究所
            </a>
          </p>
        </div>
        <div className="h-8 w-px bg-slate-200 hidden md:block" />
        <nav className="flex items-center gap-6 text-[11px] font-black uppercase tracking-widest">
          <button onClick={() => navigateTo('home', '/')} className={view === 'home' ? 'text-black border-b-2 border-black' : 'text-slate-400'}>
            シミュレーター
          </button>
          <button onClick={() => navigateTo('guide', '/guide')} className={view === 'guide' ? 'text-black border-b-2 border-black' : 'text-slate-400'}>
            活用ガイド
          </button>
          <button onClick={() => navigateTo('column', '/column')} className={view === 'column' || view === 'article' ? 'text-black border-b-2 border-black' : 'text-slate-400'}>
            専門家コラム
          </button>
        </nav>
        <a href="https://x.com/kumifont" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full text-xs font-bold hover:opacity-80 shadow-sm">
          <XIcon className="w-3.5 h-3.5" />
        </a>
      </div>
      {view === 'home' && (
        <div className="flex bg-white p-1 rounded-xl shadow-sm border border-slate-200 w-fit">
          {[
            { id: 'pc', icon: Monitor, label: 'PC' },
            { id: 'mobile', icon: Smartphone, label: 'スマホ' }
          ].map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setPreviewMode(id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold ${previewMode === id ? 'text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}
              style={{ backgroundColor: previewMode === id ? PRIMARY_COLOR : 'transparent' }}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      )}
    </header>
  );

  const Footer = () => (
    <footer className="max-w-7xl mx-auto w-full pt-12 pb-20 border-t border-slate-200 mt-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">KumiFont</h3>
          <p className="text-sm text-slate-500 leading-relaxed max-w-md">
            Webデザイナーが日本語フォントの最適な「組み合わせ」を直感的にシミュレーションするための教育メディア兼ツールです。
          </p>
          <p className="text-[10px] text-slate-400">© 2026 共感デザイン研究所 (Kyo-kan Design Inc.)</p>
        </div>
        <nav className="flex flex-wrap gap-x-8 gap-y-4 items-start">
          <button onClick={() => navigateTo('home', '/')} className="text-xs font-bold text-slate-600 hover:text-slate-900">シミュレーター</button>
          <button onClick={() => navigateTo('guide', '/guide')} className="text-xs font-bold text-slate-600 hover:text-slate-900">活用ガイド</button>
          <button onClick={() => navigateTo('column', '/column')} className="text-xs font-bold text-slate-600 hover:text-slate-900">専門家コラム</button>
          <button onClick={() => navigateTo('contact', '/contact')} className="text-xs font-bold text-slate-600 hover:text-slate-900">お問い合わせ</button>
          <button onClick={() => navigateTo('privacy', '/privacy')} className="text-xs font-bold text-slate-600 hover:text-slate-900">プライバシーポリシー</button>
        </nav>
      </div>
    </footer>
  );

  const PageWrapper = ({ children, title, icon: Icon }) => (
    <div className="max-w-5xl mx-auto w-full px-4 mb-24 space-y-12">
      <button onClick={() => navigateTo('home', '/')} className="flex items-center gap-2 text-xs font-black text-slate-400 hover:text-slate-900 uppercase tracking-widest">
        <ArrowLeft className="w-4 h-4" />
        シミュレーターに戻る
      </button>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-white shadow-sm border border-slate-100">
            <Icon className="w-8 h-8" style={{ color: PRIMARY_COLOR }} />
          </div>
          <h2 className="text-4xl font-black tracking-tighter text-slate-900">{title}</h2>
        </div>
        <div className="h-1 w-20 rounded-full" style={{ backgroundColor: PRIMARY_COLOR }} />
      </div>
      {children}
    </div>
  );

  const Simulator = () => (
    <main className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-24">
      <aside className="lg:col-span-4 space-y-6">
        <div className="bg-white p-7 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-4">
            <Edit3 className="w-5 h-5" style={{ color: PRIMARY_COLOR }} />
            <h2 className="text-lg font-bold">テキスト編集</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">見出し</label>
              <div className="relative">
                <input type="text" value={headingText} onChange={(e) => setHeadingText(e.target.value)} className="w-full p-3.5 pr-10 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none" />
                {headingText && (
                  <button onClick={() => setHeadingText('')} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">本文</label>
              <textarea rows="4" value={bodyText} onChange={(e) => setBodyText(e.target.value)} className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none resize-none" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              {PRESET_TEXTS.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => { setHeadingText(p.heading); setBodyText(p.body); setActivePreset(idx); }}
                  className={`py-2 text-xs rounded-lg border ${activePreset === idx ? 'text-white font-bold border-transparent' : 'bg-white border-slate-200 text-slate-400'}`}
                  style={{ backgroundColor: activePreset === idx ? PRIMARY_COLOR : '' }}
                >
                  {p.title}
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
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">見出しフォント</label>
              <select value={headingFont.name} onChange={(e) => setHeadingFont(GOOGLE_FONTS.find(f => f.name === e.target.value))} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm">
                {GOOGLE_FONTS.map(f => <option key={f.name} value={f.name}>{f.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">本文フォント</label>
              <select value={bodyFont.name} onChange={(e) => setBodyFont(GOOGLE_FONTS.find(f => f.name === e.target.value))} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm">
                {GOOGLE_FONTS.map(f => <option key={f.name} value={f.name}>{f.name}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-3 pt-6 border-t border-slate-100">
              <button onClick={shuffle} className="flex items-center justify-center gap-2 w-full py-4 bg-slate-50 hover:bg-slate-100 text-slate-500 rounded-xl font-black border border-slate-200">
                <RefreshCcw className="w-4 h-4" /> シャッフル
              </button>
              <button onClick={copyCSS} className="flex items-center justify-center gap-2 w-full py-4 text-white rounded-xl font-black shadow-xl active:scale-95" style={{ backgroundColor: PRIMARY_COLOR }}>
                <Copy className="w-4 h-4" /> CSSをコピー
              </button>
            </div>
          </div>
        </div>
      </aside>

      <div className="lg:col-span-8">
        <div className="lg:sticky lg:top-8 flex flex-col items-center">
          <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden w-full" style={{ width: VIEWPORT_SIZES[previewMode], maxWidth: '100%' }}>
            <div className="p-8 md:p-16 min-h-[500px] flex flex-col justify-center bg-white">
              <h1 className="mb-8 leading-[1.3]" style={{ fontFamily: headingFont.value, fontWeight: 700, fontSize: '48px', color: '#0f172a', letterSpacing: '0.05em' }}>
                {headingText}
              </h1>
              <p style={{ fontFamily: bodyFont.value, fontWeight: 400, fontSize: '16px', color: '#334155', lineHeight: 1.8, letterSpacing: '0.05em' }}>
                {bodyText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );

  const Guide = () => (
    <PageWrapper title="実践:日本語フォント比較ガイド" icon={FileText}>
      <p className="text-slate-500 max-w-2xl text-lg leading-relaxed">
        日本語フォント選定で重要なのは、各フォントが持つ「情緒的価値」を理解することです。Google Fontsの代表的な8書体について、特徴と適した用途を解説します。
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fontGuide.map((f, i) => (
          <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-2 h-2 rounded-full ${f.dot}`} />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{f.category}</span>
            </div>
            <h4 className="text-2xl font-black mb-4 text-slate-900">{f.name}</h4>
            <p className="text-sm text-slate-600 leading-loose whitespace-pre-line">{f.description}</p>
          </div>
        ))}
      </div>
    </PageWrapper>
  );

  const Privacy = () => (
    <PageWrapper title="プライバシーポリシー" icon={ShieldCheck}>
      <article className="bg-white p-10 md:p-16 rounded-3xl shadow-sm border border-slate-100 space-y-6 text-slate-600 leading-loose">
        <section>
          <h3 className="text-xl font-black text-slate-900 mb-3">1. 個人情報の取り扱いについて</h3>
          <p>当サイトKumiFont(以下「当サイト」)は、ユーザーのプライバシーを尊重し、適切に個人情報を取り扱います。当サイトは、サービス提供のために必要な範囲でのみ情報を取得・利用します。</p>
        </section>
        <section>
          <h3 className="text-xl font-black text-slate-900 mb-3">2. アクセス解析ツールについて</h3>
          <p>当サイトでは、Googleが提供するアクセス解析ツール「Google Analytics」を利用しています。Google Analyticsはトラフィックデータの収集のためにCookieを使用しています。このトラフィックデータは匿名で収集されており、個人を特定するものではありません。Cookieはブラウザ設定で無効にできます。</p>
        </section>
        <section>
          <h3 className="text-xl font-black text-slate-900 mb-3">3. 広告配信について</h3>
          <p>当サイトでは、第三者配信の広告サービス「Google AdSense」を利用しています。広告配信事業者は、ユーザーの興味に応じた商品・サービスの広告を表示するためにCookieを使用することがあります。Cookieを無効にする方法、Google AdSenseに関する詳細は<a href="https://policies.google.com/technologies/ads" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">Googleのポリシーと規約</a>をご確認ください。</p>
        </section>
        <section>
          <h3 className="text-xl font-black text-slate-900 mb-3">4. 免責事項</h3>
          <p>当サイトに掲載する情報は正確性を期すよう努めますが、内容の正確性・完全性を保証するものではありません。当サイトの利用により生じたいかなる損害についても、当サイトは責任を負いません。</p>
        </section>
        <section>
          <h3 className="text-xl font-black text-slate-900 mb-3">5. 著作権について</h3>
          <p>当サイトに掲載するコンテンツの著作権は、運営元または各権利者に帰属します。無断転載・複製を禁じます。</p>
        </section>
        <section>
          <h3 className="text-xl font-black text-slate-900 mb-3">6. プライバシーポリシーの変更</h3>
          <p>本ポリシーの内容は、必要に応じて変更することがあります。変更後のプライバシーポリシーは、当サイトに掲載した時点から効力を生じるものとします。</p>
        </section>
        <section>
          <h3 className="text-xl font-black text-slate-900 mb-3">7. お問い合わせ</h3>
          <p>本ポリシーに関するお問い合わせは、運営元である共感デザイン研究所までご連絡ください。</p>
        </section>
        <p className="text-xs text-slate-400 pt-6 border-t border-slate-100">施行日: 2026年5月1日</p>
      </article>
    </PageWrapper>
  );

  const Contact = () => (
    <PageWrapper title="お問い合わせ" icon={Mail}>
      <article className="bg-white p-10 md:p-16 rounded-3xl shadow-sm border border-slate-100 text-slate-600 leading-loose space-y-6">
        <p>KumiFontに関するご意見・ご要望・バグ報告は、運営会社である株式会社共感デザイン研究所までお問い合わせください。</p>
        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 space-y-4">
          <p className="font-bold flex items-center gap-2">
            <ExternalLink className="w-4 h-4 text-blue-500" />
            <a href="https://kyo-kan-design.com/contact/" target="_blank" rel="noopener noreferrer" className="hover:underline">お問い合わせフォーム(公式サイト)</a>
          </p>
          <p className="text-sm text-slate-400">通常3営業日以内にご返信いたします。ツールのバグ報告などは、SNSのDMでも受け付けております。</p>
        </div>
      </article>
    </PageWrapper>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans p-4 md:p-8 flex flex-col">
      <Header />
      {view === 'home' && <Simulator />}
      {view === 'guide' && <Guide />}
      {view === 'column' && <ArticleList navigateTo={navigateTo} backLabel="シミュレーターに戻る" />}
      {view === 'article' && <Article slug={articleSlug} navigateTo={navigateTo} />}
      {view === 'privacy' && <Privacy />}
      {view === 'contact' && <Contact />}
      <Footer />
      {showToast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 text-white px-10 py-5 rounded-2xl shadow-2xl flex items-center gap-3 z-50" style={{ backgroundColor: PRIMARY_COLOR }}>
          <CheckCircle2 className="w-5 h-5 text-green-400" />
          <span className="text-sm font-bold">CSSをクリップボードにコピーしました</span>
        </div>
      )}
    </div>
  );
}