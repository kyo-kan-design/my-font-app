import React, { useState, useEffect } from 'react';
import { Copy, RefreshCcw, Settings2, CheckCircle2, Smartphone, Monitor, Edit3, Info, ShieldCheck, X, ExternalLink, BookOpen, MousePointer2, Zap, Languages, ArrowLeft } from 'lucide-react';
import { articles } from './articles';
import { fontGuide } from './guideContent';
import Article from './Article';
import ArticleList from './ArticleList';
import AboutPage from './AboutPage';
import { TRANSLATIONS, PRESET_TEXTS, GOOGLE_FONTS } from './Translations';

// 𝕏 (Twitter) icon
const XIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
  </svg>
);

const VIEWPORT_SIZES = { mobile: { width: '375px' }, pc: { width: '100%' } };
const PRIMARY_COLOR = '#6B8EAD';

export default function App() {
  // 言語・画面遷移
  const [lang, setLang] = useState('ja');
  const [view, setView] = useState('home'); // 'home' | 'column' | 'article' | 'guide' | 'about'
  const [currentSlug, setCurrentSlug] = useState(null);

  // フォント・タイポ設定
  const [headingFont, setHeadingFont] = useState(GOOGLE_FONTS[1]);
  const [bodyFont, setBodyFont] = useState(GOOGLE_FONTS[0]);
  const [headingSize] = useState(48);
  const [bodySize] = useState(16);
  const [lineHeight] = useState(1.8);
  const [letterSpacing] = useState(0.05);
  const [headingColor] = useState('#0f172a');
  const [bodyColor] = useState('#334155');
  const [headingWeight] = useState(700);
  const [bodyWeight] = useState(400);

  // テキスト・UI状態
  const [previewMode, setPreviewMode] = useState('pc');
  const [headingText, setHeadingText] = useState(PRESET_TEXTS[0].heading);
  const [bodyText, setBodyText] = useState(PRESET_TEXTS[0].body);
  const [activePresetIndex, setActivePresetIndex] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [modalType, setModalType] = useState(null);

  const t = TRANSLATIONS[lang];

  // URLからviewを復元
  useEffect(() => {
    const path = window.location.pathname;
    if (path.startsWith('/article/')) {
      setCurrentSlug(path.replace('/article/', ''));
      setView('article');
    } else if (path === '/column') {
      setView('column');
    } else if (path === '/guide') {
      setView('guide');
    } else if (path === '/about') {
      setView('about');
    } else {
      setView('home');
    }
  }, []);

  // ナビゲーション関数
  const navigate = (newView, slug = null) => {
    setView(newView);
    setCurrentSlug(slug);
    let path = '/';
    if (newView === 'column') path = '/column';
    else if (newView === 'guide') path = '/guide';
    else if (newView === 'about') path = '/about';
    else if (newView === 'article' && slug) path = `/article/${slug}`;
    window.history.pushState({}, '', path);
    window.scrollTo(0, 0);
  };

  // Google Fonts読み込み
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

  // 言語切替
  const toggleLang = () => setLang(lang === 'ja' ? 'en' : 'ja');

  // CSSコピー
  const copyCSS = async () => {
    const css = `/* Heading */\nh1 {\n  font-family: ${headingFont.value};\n  font-weight: ${headingWeight};\n  font-size: ${headingSize}px;\n  color: ${headingColor};\n  letter-spacing: ${letterSpacing}em;\n}\n\n/* Body */\nbody {\n  font-family: ${bodyFont.value};\n  font-weight: ${bodyWeight};\n  font-size: ${bodySize}px;\n  color: ${bodyColor};\n  line-height: ${lineHeight};\n  letter-spacing: ${letterSpacing}em;\n}`;
    try { await navigator.clipboard.writeText(css); } catch (err) { /* noop */ }
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  // フォントランダム
  const randomize = () => {
    setHeadingFont(GOOGLE_FONTS[Math.floor(Math.random() * GOOGLE_FONTS.length)]);
    setBodyFont(GOOGLE_FONTS[Math.floor(Math.random() * GOOGLE_FONTS.length)]);
  };
  // 共通ヘッダー
  const renderHeader = () => (
    <header className="max-w-7xl mx-auto w-full mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div className="flex items-center gap-6 flex-wrap">
        <div className="cursor-pointer" onClick={() => navigate('home')}>
          <h1 className="text-3xl font-black tracking-tighter leading-none text-black">KumiFont</h1>
          <p className="text-slate-500 text-[10px] font-medium mt-2 uppercase tracking-tighter">
            {t.producedBy} <a href="https://kyo-kan-design.com/" target="_blank" rel="noopener noreferrer" className="text-slate-700 font-bold hover:underline">共感デザイン研究所</a>
          </p>
        </div>
        <div className="h-8 w-px bg-slate-200 hidden md:block"></div>
        <div className="flex items-center gap-3 flex-wrap">
          <button onClick={() => navigate('column')} className="text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors">{t.column}</button>
          <button onClick={() => navigate('guide')} className="text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors">{t.guide}</button>
          <a href="https://x.com/kumifont" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full text-xs font-bold hover:opacity-80 transition-all shadow-sm">
            <XIcon className="w-3.5 h-3.5" /> <span>{t.followUs}</span>
          </a>
          <button onClick={toggleLang} className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded-lg text-[10px] font-black hover:bg-white transition-all text-slate-500">
            <Languages className="w-3.5 h-3.5" /> {lang === 'ja' ? 'EN' : 'JA'}
          </button>
        </div>
      </div>
      {view === 'home' && (
        <nav className="flex bg-white p-1 rounded-xl shadow-sm border border-slate-200 w-fit">
          {[{ id: 'pc', icon: Monitor, label: t.viewportPc }, { id: 'mobile', icon: Smartphone, label: t.viewportMobile }].map(({ id, icon: Icon, label }) => (
            <button key={id} onClick={() => setPreviewMode(id)} className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${previewMode === id ? 'text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`} style={{ backgroundColor: previewMode === id ? PRIMARY_COLOR : 'transparent' }}>
              <Icon className="w-4 h-4" /> <span>{label}</span>
            </button>
          ))}
        </nav>
      )}
    </header>
  );

  // 共通フッター
  const renderFooter = () => (
    <footer className="max-w-7xl mx-auto w-full pt-12 pb-20 border-t border-slate-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4">KumiFont</h3>
            <p className="text-sm text-slate-500 leading-relaxed mb-8">{t.footerDesc}</p>
          </div>
          <p className="text-[10px] text-slate-400">© 2026 共感デザイン研究所 (Kyo-kan Design Inc.)</p>
        </div>
        <div className="flex flex-col gap-6">
          <div>
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4">Information</h3>
            <nav className="flex flex-wrap gap-4">
              <button onClick={() => navigate('about')} className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"><Info className="w-4 h-4" /> {t.about}</button>
              <button onClick={() => setModalType('privacy')} className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"><ShieldCheck className="w-4 h-4" /> {t.privacy}</button>
              <a href="https://kyo-kan-design.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"><ExternalLink className="w-4 h-4" /> {t.operator}</a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://x.com/kumifont" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-black px-5 py-2.5 bg-slate-100 hover:bg-black hover:text-white rounded-lg transition-all">
              <XIcon className="w-4 h-4" /> <span>Follow on 𝕏</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );

  // モーダル＆トースト
  const renderOverlays = () => (
    <>
      {modalType && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[80vh] overflow-y-auto p-8 relative shadow-2xl">
            <button onClick={() => setModalType(null)} className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-colors"><X className="w-6 h-6 text-slate-400" /></button>
            <article className="prose prose-slate">
              <h2 className="text-2xl font-black mb-6">{t.privacy}</h2>
              <p className="text-slate-600 text-sm">This site is operated by Kyo-kan Design Inc.</p>
              <div className="mt-8 space-y-4 text-xs text-slate-500">
                <p><strong>Ads</strong>: This site may use third-party advertising services (Google AdSense).</p>
                <p><strong>Analytics</strong>: This site uses Google Analytics to collect traffic information anonymously.</p>
              </div>
            </article>
          </div>
        </div>
      )}
      {showToast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 text-white px-10 py-5 rounded-2xl shadow-2xl flex items-center gap-3 z-50" style={{ backgroundColor: PRIMARY_COLOR }}>
          <CheckCircle2 className="w-5 h-5 text-green-400" />
          <span className="text-sm font-bold tracking-tight">{t.copied}</span>
        </div>
      )}
    </>
  );

  // 記事詳細ページ
  if (view === 'article' && currentSlug) {
    const article = articles.find(a => a.slug === currentSlug);
    return (
      <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans p-4 md:p-8 flex flex-col">
        {renderHeader()}
        <div className="max-w-3xl mx-auto w-full mb-8">
          <button onClick={() => navigate('column')} className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 mb-6">
            <ArrowLeft className="w-4 h-4" /> {t.column}
          </button>
        </div>
        <Article article={article} />
        {renderFooter()}
        {renderOverlays()}
      </div>
    );
  }

  // コラム一覧ページ
  if (view === 'column') {
    return (
      <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans p-4 md:p-8 flex flex-col">
        {renderHeader()}
        <div className="max-w-5xl mx-auto w-full mb-8 px-4">
          <h2 className="text-3xl font-black mb-3">{t.column}</h2>
          <p className="text-sm text-slate-500">{t.columnIntro}</p>
        </div>
        <ArticleList articles={articles} onSelect={(slug) => navigate('article', slug)} />
        {renderFooter()}
        {renderOverlays()}
      </div>
    );
  }

  // Aboutページ
  if (view === 'about') {
    return (
      <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans p-4 md:p-8 flex flex-col">
        {renderHeader()}
        <AboutPage />
        {renderFooter()}
        {renderOverlays()}
      </div>
    );
  }

  // ガイドページ
  if (view === 'guide') {
    return (
      <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans p-4 md:p-8 flex flex-col">
        {renderHeader()}
        <div className="max-w-3xl mx-auto w-full mb-8 px-4">
          <h2 className="text-3xl font-black mb-3">{t.guide}</h2>
          <p className="text-sm text-slate-500">{t.guideIntro}</p>
        </div>
        <section className="max-w-3xl mx-auto w-full px-4 space-y-8 mb-24">
          {fontGuide.map((g, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
              <h3 className="text-xl font-black mb-2">{g.name}</h3>
              <p className="text-xs text-slate-400 mb-4">{g.category}</p>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">{g.description}</p>
            </div>
          ))}
        </section>
        {renderFooter()}
        {renderOverlays()}
      </div>
    );
  }
  // ===== ホーム画面（シミュレーター） =====
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans p-4 md:p-8 flex flex-col">
      {renderHeader()}

      <main className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-24">
        {/* コントロール */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-white p-7 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-4">
              <Edit3 className="w-5 h-5" style={{ color: PRIMARY_COLOR }} />
              <h2 className="text-lg font-bold">{t.textEdit}</h2>
            </div>
            <div className="space-y-4">
              <section>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">{t.heading}</label>
                <input type="text" value={headingText} onChange={(e) => setHeadingText(e.target.value)} className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 transition-all" style={{ '--tw-ring-color': PRIMARY_COLOR }} />
              </section>
              <section>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">{t.body}</label>
                <textarea rows="4" value={bodyText} onChange={(e) => setBodyText(e.target.value)} className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 transition-all resize-none" style={{ '--tw-ring-color': PRIMARY_COLOR }} />
              </section>
              <div className="grid grid-cols-2 gap-2">
                {PRESET_TEXTS.map((p, idx) => (
                  <button key={idx} onClick={() => { setHeadingText(p.heading); setBodyText(p.body); setActivePresetIndex(idx); }}
                    className={`py-2 text-xs rounded-lg border transition-all ${activePresetIndex === idx ? 'text-white font-bold border-transparent' : 'bg-white border-slate-200 text-slate-400 hover:border-slate-300'}`}
                    style={{ backgroundColor: activePresetIndex === idx ? PRIMARY_COLOR : '' }}>
                    {p.title[lang]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white p-7 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
              <Settings2 className="w-5 h-5" style={{ color: PRIMARY_COLOR }} />
              <h2 className="text-lg font-bold">{t.typography}</h2>
            </div>
            <div className="space-y-6">
              <section>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">{t.headingFont}</label>
                <select value={headingFont.name} onChange={(e) => setHeadingFont(GOOGLE_FONTS.find(f => f.name === e.target.value))} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2" style={{ '--tw-ring-color': PRIMARY_COLOR }}>
                  {GOOGLE_FONTS.map(f => <option key={f.name} value={f.name}>{f.name}</option>)}
                </select>
              </section>
              <section>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">{t.bodyFont}</label>
                <select value={bodyFont.name} onChange={(e) => setBodyFont(GOOGLE_FONTS.find(f => f.name === e.target.value))} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2" style={{ '--tw-ring-color': PRIMARY_COLOR }}>
                  {GOOGLE_FONTS.map(f => <option key={f.name} value={f.name}>{f.name}</option>)}
                </select>
              </section>
              <div className="flex flex-col gap-3 pt-6 border-t border-slate-100">
                <button onClick={randomize} className="flex items-center justify-center gap-2 w-full py-4 bg-slate-50 hover:bg-slate-100 text-slate-500 rounded-xl font-black transition-all border border-slate-200">
                  <RefreshCcw className="w-4 h-4" /> {t.shuffle}
                </button>
                <button onClick={copyCSS} className="flex items-center justify-center gap-2 w-full py-4 text-white rounded-xl font-black transition-all shadow-xl active:scale-95" style={{ backgroundColor: PRIMARY_COLOR }}>
                  <Copy className="w-4 h-4" /> {t.copyCss}
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* プレビュー */}
        <article className="lg:col-span-8">
          <div className="lg:sticky lg:top-8 flex flex-col items-center">
            <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden transition-all duration-500 w-full" style={{ width: VIEWPORT_SIZES[previewMode].width, maxWidth: '100%' }}>
              <div className="p-8 md:p-16 min-h-[500px] flex flex-col justify-center bg-white text-center md:text-left">
                <h1 className="mb-8 leading-[1.3]" style={{ fontFamily: headingFont.value, fontWeight: headingWeight, fontSize: `${headingSize}px`, color: headingColor, letterSpacing: `${letterSpacing}em` }}>{headingText}</h1>
                <p style={{ fontFamily: bodyFont.value, fontWeight: bodyWeight, fontSize: `${bodySize}px`, color: bodyColor, lineHeight: lineHeight, letterSpacing: `${letterSpacing}em` }}>{bodyText}</p>
              </div>
            </div>
          </div>
        </article>
      </main>

      {/* コラム・ガイドへの導線 */}
      <section className="max-w-5xl mx-auto w-full mb-24 grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
        <button onClick={() => navigate('column')} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all text-left">
          <BookOpen className="w-6 h-6 mb-4" style={{ color: PRIMARY_COLOR }} />
          <h3 className="font-black text-lg mb-2">{t.column}</h3>
          <p className="text-sm text-slate-500 leading-relaxed">{t.columnIntro}</p>
        </button>
        <button onClick={() => navigate('guide')} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all text-left">
          <MousePointer2 className="w-6 h-6 mb-4" style={{ color: PRIMARY_COLOR }} />
          <h3 className="font-black text-lg mb-2">{t.guide}</h3>
          <p className="text-sm text-slate-500 leading-relaxed">{t.guideIntro}</p>
        </button>
      </section>

      {/* AdSense用バリュアブルコンテンツ */}
      <section className="max-w-4xl mx-auto w-full mb-24 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm px-4">
        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
          <Zap className="w-6 h-6 mb-4" style={{ color: PRIMARY_COLOR }} />
          <h3 className="font-black text-lg mb-3">{lang === 'ja' ? '1秒でシミュレート' : 'Simulate in 1 Second'}</h3>
          <p className="text-slate-500 leading-relaxed">{lang === 'ja' ? 'FigmaやPhotoshopを立ち上げる必要はありません。ブラウザ上でフォントの組み合わせを即座に検証し、最適な「和組み」を見つけ出します。' : 'No need to launch Figma or Photoshop. Instantly verify font pairings in your browser.'}</p>
        </div>
        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
          <MousePointer2 className="w-6 h-6 mb-4" style={{ color: PRIMARY_COLOR }} />
          <h3 className="font-black text-lg mb-3">{lang === 'ja' ? 'デザイナーの直感に寄り添う' : 'Intuitive for Designers'}</h3>
          <p className="text-slate-500 leading-relaxed">{lang === 'ja' ? 'UXデザイナーとしての20年の経験を活かし、最も「面倒」だと感じていたプロセスを自動化。' : 'Built on 20 years of UX design experience to automate the tedious parts of font selection.'}</p>
        </div>
        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
          <BookOpen className="w-6 h-6 mb-4" style={{ color: PRIMARY_COLOR }} />
          <h3 className="font-black text-lg mb-3">{lang === 'ja' ? '実務に即したコード出力' : 'Production-Ready CSS'}</h3>
          <p className="text-slate-500 leading-relaxed">{lang === 'ja' ? 'ウェイトや行間、字間などの数値をCSSとしてワンクリックでコピーし、そのまま実装へ繋げられます。' : 'Copy weights, line heights, and letter spacing as CSS with one click.'}</p>
        </div>
      </section>

      {renderFooter()}
      {renderOverlays()}
    </div>
  );
}