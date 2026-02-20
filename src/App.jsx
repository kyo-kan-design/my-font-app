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
  Edit3
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

  // GA4 へのイベント送信
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
    // 解析イベント：コピー
    sendGAEvent('copy_css', {
      heading_font: headingFont.name,
      body_font: bodyFont.name
    });

    const css = `/* 見出し */
h1 {
  font-family: ${headingFont.value};
  font-weight: ${headingWeight};
  font-size: ${headingSize}px;
  color: ${headingColor};
  letter-spacing: ${letterSpacing}em;
}

/* 本文 */
body {
  font-family: ${bodyFont.value};
  font-weight: ${bodyWeight};
  font-size: ${bodySize}px;
  color: ${bodyColor};
  line-height: ${lineHeight};
  letter-spacing: ${letterSpacing}em;
}`;
    
    try {
      await navigator.clipboard.writeText(css);
    } catch (err) {
      const textArea = document.createElement("textarea");
      textArea.value = css;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
    
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const randomize = () => {
    // 解析イベント：シャッフル
    sendGAEvent('shuffle_fonts', { action: 'click' });
    setHeadingFont(GOOGLE_FONTS[Math.floor(Math.random() * GOOGLE_FONTS.length)]);
    setBodyFont(GOOGLE_FONTS[Math.floor(Math.random() * GOOGLE_FONTS.length)]);
  };

  const applyPreset = (preset) => {
    setHeadingText(preset.heading);
    setBodyText(preset.body);
    setActivePreset(preset.title);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans p-4 md:p-8">
      <div className="max-w-7xl mx-auto mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tighter leading-none text-black">
            KumiFont
          </h1>
          <p className="text-slate-500 text-[11px] font-medium mt-2">
            日本語フォントの最適な組み合わせをデザインする
          </p>
        </div>

        <div className="flex bg-white p-1 rounded-xl shadow-sm border border-slate-200 w-fit">
          {[
            { id: 'pc', icon: Monitor },
            { id: 'mobile', icon: Smartphone }
          ].map(({ id, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setPreviewMode(id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
                previewMode === id 
                ? 'text-white shadow-lg' 
                : 'text-slate-400 hover:bg-slate-50'
              }`}
              style={{ backgroundColor: previewMode === id ? PRIMARY_COLOR : 'transparent' }}
            >
              <Icon className="w-4 h-4" />
              <span>{VIEWPORT_SIZES[id].label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-7 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-4">
              <Edit3 className="w-5 h-5" style={{ color: PRIMARY_COLOR }} />
              <h2 className="text-lg font-bold">テキスト編集</h2>
            </div>
            <div className="space-y-4">
              <section>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">見出し</label>
                <input 
                  type="text"
                  value={headingText}
                  onChange={(e) => setHeadingText(e.target.value)}
                  className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 transition-all"
                  style={{ '--tw-ring-color': PRIMARY_COLOR }}
                />
              </section>
              <section>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">本文</label>
                <textarea 
                  rows="4"
                  value={bodyText}
                  onChange={(e) => setBodyText(e.target.value)}
                  className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 transition-all resize-none"
                  style={{ '--tw-ring-color': PRIMARY_COLOR }}
                />
              </section>
              <div className="pt-2">
                <div className="grid grid-cols-2 gap-2">
                  {PRESET_TEXTS.map((t, idx) => (
                    <button
                      key={idx}
                      onClick={() => applyPreset(t)}
                      className={`py-2 text-xs rounded-lg border transition-all ${
                        activePreset === t.title 
                        ? 'text-white font-bold border-transparent' 
                        : 'bg-white border-slate-200 text-slate-400 hover:border-slate-300'
                      }`}
                      style={{ backgroundColor: activePreset === t.title ? PRIMARY_COLOR : '' }}
                    >
                      {t.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-7 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
              <Settings2 className="w-5 h-5" style={{ color: PRIMARY_COLOR }} />
              <h2 className="text-lg font-bold">タイポグラフィ</h2>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                <section>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">見出しフォント</label>
                  <select 
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2"
                    style={{ '--tw-ring-color': PRIMARY_COLOR }}
                    value={headingFont.name}
                    onChange={(e) => setHeadingFont(GOOGLE_FONTS.find(f => f.name === e.target.value))}
                  >
                    {GOOGLE_FONTS.map(f => <option key={f.name} value={f.name}>{f.name}</option>)}
                  </select>
                </section>
                <section>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">本文フォント</label>
                  <select 
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2"
                    style={{ '--tw-ring-color': PRIMARY_COLOR }}
                    value={bodyFont.name}
                    onChange={(e) => setBodyFont(GOOGLE_FONTS.find(f => f.name === e.target.value))}
                  >
                    {GOOGLE_FONTS.map(f => <option key={f.name} value={f.name}>{f.name}</option>)}
                  </select>
                </section>
              </div>

              <div className="pt-4 border-t border-slate-50 space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Bold className="w-4 h-4 text-slate-400" />
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">ウェイト (太さ)</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">見出し: {headingWeight}</label>
                    <input type="range" min="300" max="900" step="100" value={headingWeight} onChange={(e) => setHeadingWeight(parseInt(e.target.value))} className="w-full" style={{ accentColor: PRIMARY_COLOR }} />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">本文: {bodyWeight}</label>
                    <input type="range" min="300" max="900" step="100" value={bodyWeight} onChange={(e) => setBodyWeight(parseInt(e.target.value))} className="w-full" style={{ accentColor: PRIMARY_COLOR }} />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-50 space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Palette className="w-4 h-4 text-slate-400" />
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">カラー</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                    <input type="color" value={headingColor} onChange={(e) => setHeadingColor(e.target.value)} className="w-8 h-8 rounded cursor-pointer bg-transparent border-none" />
                    <span className="text-[10px] font-mono">{headingColor.toUpperCase()}</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                    <input type="color" value={bodyColor} onChange={(e) => setBodyColor(e.target.value)} className="w-8 h-8 rounded cursor-pointer bg-transparent border-none" />
                    <span className="text-[10px] font-mono">{bodyColor.toUpperCase()}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-50 space-y-5">
                <div className="space-y-5">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Heading Size</span>
                      <span className="text-[10px] font-mono" style={{ color: PRIMARY_COLOR }}>{headingSize}px</span>
                    </div>
                    <input type="range" min="10" max="80" value={headingSize} onChange={(e) => setHeadingSize(e.target.value)} className="w-full" style={{ accentColor: PRIMARY_COLOR }} />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Body Size</span>
                      <span className="text-[10px] font-mono" style={{ color: PRIMARY_COLOR }}>{bodySize}px</span>
                    </div>
                    <input type="range" min="10" max="24" value={bodySize} onChange={(e) => setBodySize(e.target.value)} className="w-full" style={{ accentColor: PRIMARY_COLOR }} />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Line</span>
                        <span className="text-[10px] font-mono">{lineHeight}</span>
                      </div>
                      <input type="range" min="1.2" max="2.4" step="0.1" value={lineHeight} onChange={(e) => setLineHeight(e.target.value)} className="w-full" style={{ accentColor: PRIMARY_COLOR }} />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Letter</span>
                        <span className="text-[10px] font-mono">{letterSpacing}</span>
                      </div>
                      <input type="range" min="-0.05" max="0.3" step="0.01" value={letterSpacing} onChange={(e) => setLetterSpacing(parseFloat(e.target.value))} className="w-full" style={{ accentColor: PRIMARY_COLOR }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-8 mt-6 border-t border-slate-100">
              <button 
                onClick={randomize}
                className="flex items-center justify-center gap-2 w-full py-4 bg-slate-50 hover:bg-slate-100 text-slate-500 rounded-xl font-black transition-all active:scale-95 border border-slate-200"
              >
                <RefreshCcw className="w-4 h-4" /> シャッフル
              </button>
              <button 
                onClick={copyCSS}
                className="flex items-center justify-center gap-2 w-full py-4 text-white rounded-xl font-black transition-all shadow-xl active:scale-95"
                style={{ backgroundColor: PRIMARY_COLOR }}
              >
                <Copy className="w-4 h-4" /> CSSをコピー
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8">
          <div className="lg:sticky lg:top-8 flex justify-center">
            <div 
              className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden transition-all duration-500 ease-in-out"
              style={{ width: VIEWPORT_SIZES[previewMode].width, maxWidth: '100%' }}
            >
              {previewMode !== 'pc' && (
                <div className="h-12 bg-slate-100 flex items-center justify-center gap-1.5 border-b border-slate-200">
                  <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                  <div className="w-12 h-1.5 rounded-full bg-slate-300"></div>
                </div>
              )}

              <div className="p-8 md:p-16 min-h-[600px] flex flex-col justify-center relative bg-white transition-all text-center md:text-left">
                <div className="relative z-10">
                  <h1 
                    className="mb-8 leading-[1.3] transition-all duration-500"
                    style={{ 
                      fontFamily: headingFont.value,
                      fontWeight: headingWeight,
                      fontSize: `${headingSize}px`,
                      color: headingColor,
                      letterSpacing: `${letterSpacing}em`
                    }}
                  >
                    {headingText}
                  </h1>
                  <p 
                    className="transition-all duration-500"
                    style={{ 
                      fontFamily: bodyFont.value,
                      fontWeight: bodyWeight,
                      fontSize: `${bodySize}px`,
                      color: bodyColor,
                      lineHeight: lineHeight,
                      letterSpacing: `${letterSpacing}em`
                    }}
                  >
                    {bodyText}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showToast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 text-white px-10 py-5 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300 z-50" style={{ backgroundColor: PRIMARY_COLOR }}>
          <CheckCircle2 className="w-5 h-5 text-green-400" /> 
          <span className="text-sm font-bold tracking-tight">CSSをクリップボードにコピーしました</span>
        </div>
      )}
    </div>
  );
}