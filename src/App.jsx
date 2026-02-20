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
  X
} from 'lucide-react';

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
    body: "私たちは、ユーザー体験を第一に考えたUI/UXデザインを提供します。最新の技術と深い洞察に基づき、あなたのビジネスが直面する課題を解決へと導きます。まずは気軽にご相談ください。"
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
  const [modalType, setModalType] = useState(null); // 'about' or 'privacy'

  const sendGAEvent = (action, params) => {
    if (window.gtag) {
      window.gtag('event', action, params);
    }
  };

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
    sendGAEvent('copy_css', { heading_font: headingFont.name, body_font: bodyFont.name });
    const css = `/* 見出し */\nh1 {\n  font-family: ${headingFont.value};\n  font-weight: ${headingWeight};\n  font-size: ${headingSize}px;\n  color: ${headingColor};\n  letter-spacing: ${letterSpacing}em;\n}\n\n/* 本文 */\nbody {\n  font-family: ${bodyFont.value};\n  font-weight: ${bodyWeight};\n  font-size: ${bodySize}px;\n  color: ${bodyColor};\n  line-height: ${lineHeight};\n  letter-spacing: ${letterSpacing}em;\n}`;
    try { await navigator.clipboard.writeText(css); } catch (err) { /* Fallback */ }
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const randomize = () => {
    sendGAEvent('shuffle_fonts', { action: 'click' });
    setHeadingFont(GOOGLE_FONTS[Math.floor(Math.random() * GOOGLE_FONTS.length)]);
    setBodyFont(GOOGLE_FONTS[Math.floor(Math.random() * GOOGLE_FONTS.length)]);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans p-4 md:p-8 flex flex-col">
      <div className="max-w-7xl mx-auto w-full mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tighter leading-none text-black">KumiFont</h1>
          <p className="text-slate-500 text-[11px] font-medium mt-2">日本語フォントの最適な組み合わせをデザインする</p>
        </div>
        <div className="flex bg-white p-1 rounded-xl shadow-sm border border-slate-200 w-fit">
          {[{ id: 'pc', icon: Monitor }, { id: 'mobile', icon: Smartphone }].map(({ id, icon: Icon }) => (
            <button key={id} onClick={() => setPreviewMode(id)} className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${previewMode === id ? 'text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`} style={{ backgroundColor: previewMode === id ? PRIMARY_COLOR : 'transparent' }}><Icon className="w-4 h-4" /><span>{VIEWPORT_SIZES[id].label}</span></button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start flex-grow">
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

      {/* Footer Area for AdSense/SEO */}
      <footer className="max-w-7xl mx-auto w-full mt-20 pt-12 pb-20 border-t border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4">About KumiFont</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              KumiFont（クミフォント）は、Webデザイナーが日本語フォントの最適な「組み合わせ（和組み）」を直感的にシミュレーションするためのツールです。Google Fontsで提供されている高品質なフォントを厳選し、実際の実装に近い形でプレビューできます。
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-2">Information</h3>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => setModalType('about')} className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"><Info className="w-4 h-4" /> このツールについて</button>
              <button onClick={() => setModalType('privacy')} className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"><ShieldCheck className="w-4 h-4" /> プライバシーポリシー</button>
            </div>
            <p className="text-[10px] text-slate-400 mt-4">© 2026 KumiFont. Designed by Kyo-kan Design.</p>
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
                <p className="text-slate-600 mb-4">Webサイト制作において、フォントの選定はブランドの印象を決定づける重要な要素です。しかし、日本語フォントはウェイトや明朝・ゴシックの組み合わせによって可読性が大きく変わります。</p>
                <p className="text-slate-600 mb-4">KumiFontは、現場のデザイナーが「サクッと」最適なペアリングを見つけ、そのままCSSをコピーして開発に活かせるよう設計されています。</p>
                <h3 className="font-bold mt-6 mb-2">対応フォント一覧</h3>
                <div className="flex flex-wrap gap-2">
                  {GOOGLE_FONTS.map(f => <span key={f.name} className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-bold text-slate-500">{f.name}</span>)}
                </div>
              </article>
            ) : (
              <article className="prose prose-slate">
                <h2 className="text-2xl font-black mb-6">プライバシーポリシー</h2>
                <div className="text-slate-600 text-sm space-y-4">
                  <p><strong>広告の配信について:</strong> 当サイトでは、第三者配信の広告サービス（Googleアドセンス）を利用しています。Cookieを使用することで、お客様の過去のアクセス情報に基づいた適切な広告を表示します。</p>
                  <p><strong>アクセス解析ツールについて:</strong> 当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。トラフィックデータは匿名で収集されており、個人を特定するものではありません。</p>
                  <p><strong>免責事項:</strong> 当サイトのシミュレーション結果により生じたトラブルや損失、損害等につきましては、一切責任を負いかねます。最終的なフォント選定は自己責任でお願いいたします。</p>
                </div>
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