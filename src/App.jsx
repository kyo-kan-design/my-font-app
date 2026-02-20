import React, { useState, useEffect } from 'react';
import { 
  Copy, 
  RefreshCcw, 
  Settings2, 
  CheckCircle2, 
  Smartphone, 
  Monitor, 
  Palette,
  Bold, 
  Edit3,
  Info,
  ShieldCheck,
  X,
  ExternalLink
} from 'lucide-react';

// 最新のXロゴコンポーネント
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
  {
    title: "サービス紹介",
    heading: "デザインの力で、ビジネスを加速させる。",
    body: "私たちは、ユーザー体験を第一に考えたUI/UXデザインを提供します。最新の技術と深い洞察に基づき, あなたのビジネスが直面する課題を解決へと導きます。まずは気軽にご相談ください。"
  },
  {
    title: "ニュース記事",
    heading: "最新のAIデザインツール、現場への導入が加速",
    body: "近年、AIを活用したデザイン制作が急速に普及しています。特にプロトタイピングの高速化において、従来のワークフローを大幅に改善する事例が増えており、多くのデザイナーがその恩恵を受けています。"
  }
];

const VIEWPORT_SIZES = {
  mobile: { width: '375px', label: 'スマホ' },
  pc: { width: '100%', label: 'PC' }
};

const PRIMARY_COLOR = '#6B8EAD'; 

export default function App() {
  const [headingFont, setHeadingFont] = useState(GOOGLE_FONTS[1]);
  const [bodyFont, setBodyFont] = useState(GOOGLE_FONTS[0]);
  const [headingSize, setHeadingSize] = useState(48);
  const [bodySize, setBodySize] = useState(16);
  const [lineHeight, setLineHeight] = useState(1.8);
  const [letterSpacing, setLetterSpacing] = useState(0.05);
  
  const [previewMode, setPreviewMode] = useState('pc');
  const [headingColor, setHeadingColor] = useState('#0f172a'); 
  const [bodyColor, setBodyColor] = useState('#334155');    
  const [headingWeight, setHeadingWeight] = useState(700);
  const [bodyWeight, setBodyWeight] = useState(400);

  const [headingText, setHeadingText] = useState(PRESET_TEXTS[0].heading);
  const [bodyText, setBodyText] = useState(PRESET_TEXTS[0].body);
  const [activePreset, setActivePreset] = useState(PRESET_TEXTS[0].title);

  const [showToast, setShowToast] = useState(false);
  const [modalType, setModalType] = useState(null); 

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
    const css = `/* 見出し */\nh1 {\n  font-family: ${headingFont.value};\n  font-weight: ${headingWeight};\n  font-size: ${headingSize}px;\n  color: ${headingColor};\n  letter-spacing: ${letterSpacing}em;\n}\n\n/* 本文 */\nbody {\n  font-family: ${bodyFont.value};\n  font-weight: ${bodyWeight};\n  font-size: ${bodySize}px;\n  color: ${bodyColor};\n  line-height: ${lineHeight};\n  letter-spacing: ${letterSpacing}em;\n}`;
    try { await navigator.clipboard.writeText(css); } catch (err) { /* fallback */ }
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const randomize = () => {
    setHeadingFont(GOOGLE_FONTS[Math.floor(Math.random() * GOOGLE_FONTS.length)]);
    setBodyFont(GOOGLE_FONTS[Math.floor(Math.random() * GOOGLE_FONTS.length)]);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans p-4 md:p-8 flex flex-col">
      {/* Header Area */}
      <div className="max-w-7xl mx-auto w-full mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div>
            <h1 className="text-3xl font-black tracking-tighter leading-none text-black">KumiFont</h1>
            <p className="text-slate-500 text-[10px] font-medium mt-2">
              produced by <a href="https://kyo-kan-design.com/" target="_blank" rel="noopener noreferrer" className="text-slate-700 font-bold hover:underline">共感デザイン研究所</a>
            </p>
          </div>
          <div className="h-8 w-px bg-slate-200 hidden md:block"></div>
          {/* X (Twitter) Link */}
          <a 
            href="https://x.com/kumifont" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full text-xs font-bold hover:opacity-80 transition-all shadow-sm"
          >
            <XIcon className="w-3.5 h-3.5" />
            <span>Follow us</span>
          </a>
        </div>

        <div className="flex bg-white p-1 rounded-xl shadow-sm border border-slate-200 w-fit">
          {[{ id: 'pc', icon: Monitor }, { id: 'mobile', icon: Smartphone }].map(({ id, icon: Icon }) => (
            <button key={id} onClick={() => setPreviewMode(id)} className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${previewMode === id ? 'text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`} style={{ backgroundColor: previewMode === id ? PRIMARY_COLOR : 'transparent' }}><Icon className="w-4 h-4" /><span>{VIEWPORT_SIZES[id].label}</span></button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start flex-grow">
        {/* Controls Column */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-7 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-4">
              <Edit3 className="w-5 h-5" style={{ color: PRIMARY_COLOR }} />
              <h2 className="text-lg font-bold">テキスト編集</h2>
            </div>
            <div className="space-y-4">
              <section><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">見出し</label>
                <input type="text" value={headingText} onChange={(e) => setHeadingText(e.target.value)} className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 transition-all" style={{ '--tw-ring-color': PRIMARY_COLOR }} />
              </section>
              <section><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">本文</label>
                <textarea rows="4" value={bodyText} onChange={(e) => setBodyText(e.target.value)} className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 transition-all resize-none" style={{ '--tw-ring-color': PRIMARY_COLOR }} />
              </section>
              <div className="grid grid-cols-2 gap-2">
                {PRESET_TEXTS.map((t, idx) => (
                  <button key={idx} onClick={() => { setHeadingText(t.heading); setBodyText(t.body); setActivePreset(t.title); }} className={`py-2 text-xs rounded-lg border transition-all ${activePreset === t.title ? 'text-white font-bold border-transparent' : 'bg-white border-slate-200 text-slate-400 hover:border-slate-300'}`} style={{ backgroundColor: activePreset === t.title ? PRIMARY_COLOR : '' }}>{t.title}</button>
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
              <section><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">見出しフォント</label>
                <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2" style={{ '--tw-ring-color': PRIMARY_COLOR }} value={headingFont.name} onChange={(e) => setHeadingFont(GOOGLE_FONTS.find(f => f.name === e.target.value))}>
                  {GOOGLE_FONTS.map(f => <option key={f.name} value={f.name}>{f.name}</option>)}
                </select>
              </section>
              <section><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">本文フォント</label>
                <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2" style={{ '--tw-ring-color': PRIMARY_COLOR }} value={bodyFont.name} onChange={(e) => setBodyFont(GOOGLE_FONTS.find(f => f.name === e.target.value))}>
                  {GOOGLE_FONTS.map(f => <option key={f.name} value={f.name}>{f.name}</option>)}
                </select>
              </section>
              <div className="flex flex-col gap-3 pt-6 border-t border-slate-100">
                <button onClick={randomize} className="flex items-center justify-center gap-2 w-full py-4 bg-slate-50 hover:bg-slate-100 text-slate-500 rounded-xl font-black transition-all border border-slate-200"><RefreshCcw className="w-4 h-4" /> シャッフル</button>
                <button onClick={copyCSS} className="flex items-center justify-center gap-2 w-full py-4 text-white rounded-xl font-black transition-all shadow-xl active:scale-95" style={{ backgroundColor: PRIMARY_COLOR }}><Copy className="w-4 h-4" /> CSSをコピー</button>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Column */}
        <div className="lg:col-span-8">
          <div className="lg:sticky lg:top-8 flex flex-col items-center">
            <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden transition-all duration-500 w-full" style={{ width: VIEWPORT_SIZES[previewMode].width, maxWidth: '100%' }}>
              <div className="p-8 md:p-16 min-h-[500px] flex flex-col justify-center bg-white text-center md:text-left">
                <h1 className="mb-8 leading-[1.3]" style={{ fontFamily: headingFont.value, fontWeight: headingWeight, fontSize: `${headingSize}px`, color: headingColor, letterSpacing: `${letterSpacing}em` }}>{headingText}</h1>
                <p style={{ fontFamily: bodyFont.value, fontWeight: bodyWeight, fontSize: `${bodySize}px`, color: bodyColor, lineHeight: lineHeight, letterSpacing: `${letterSpacing}em` }}>{bodyText}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Area */}
      <footer className="max-w-7xl mx-auto w-full mt-20 pt-12 pb-20 border-t border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Column: Description & Copyright */}
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4">KumiFont</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-8">
                KumiFont（クミフォント）は、Webデザイナーが日本語フォントの最適な「組み合わせ（和組み）」を直感的にシミュレーションするためのツールです。Google Fontsで提供されている高品質なフォントを厳選し、実際の実装に近い形でプレビューできます。
              </p>
            </div>
            <p className="text-[10px] text-slate-400">© 2026 共感デザイン研究所 (Kyo-kan Design Inc.)</p>
          </div>

          {/* Right Column: Info & X Link */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-2">Information</h3>
            <div className="flex flex-wrap gap-4 mb-4">
              <button onClick={() => setModalType('about')} className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"><Info className="w-4 h-4" /> KumiFontについて</button>
              <button onClick={() => setModalType('privacy')} className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"><ShieldCheck className="w-4 h-4" /> プライバシーポリシー</button>
              <a href="https://kyo-kan-design.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"><ExternalLink className="w-4 h-4" /> 運営会社</a>
            </div>
            
            <div className="flex items-center gap-4">
              <a href="https://x.com/kumifont" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-black px-5 py-2.5 bg-slate-100 hover:bg-black hover:text-white rounded-lg transition-all">
                <XIcon className="w-4 h-4" />
                <span>最新情報をXでチェック</span>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {modalType && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[80vh] overflow-y-auto p-8 relative shadow-2xl">
            <button onClick={() => setModalType(null)} className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-colors"><X className="w-6 h-6 text-slate-400" /></button>
            {modalType === 'about' ? (
              <article className="prose prose-slate">
                <h2 className="text-2xl font-black mb-6">KumiFontについて</h2>
                <p className="text-slate-600 mb-4">共感デザイン研究所が提供するKumiFontは、Web制作の現場で最も重要かつ時間の掛かる「和文フォントのペアリング」を支援します。</p>
              </article>
            ) : (
              <article className="prose prose-slate">
                <h2 className="text-2xl font-black mb-6">プライバシーポリシー</h2>
                <p className="text-slate-600 text-sm">当サイトは、共感デザイン研究所が運営しています。詳細は公式サイトをご確認ください。</p>
              </article>
            )}
          </div>
        </div>
      )}

      {showToast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 text-white px-10 py-5 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300 z-50" style={{ backgroundColor: PRIMARY_COLOR }}>
          <CheckCircle2 className="w-5 h-5 text-green-400" /> <span className="text-sm font-bold tracking-tight">CSSをクリップボードにコピーしました</span>
        </div>
      )}
    </div>
  );
}