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
  ExternalLink,
  BookOpen,
  MousePointer2,
  Zap,
  Languages
} from 'lucide-react';

// 最新の𝕏ロゴコンポーネント
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

const TRANSLATIONS = {
  ja: {
    producedBy: "produced by",
    followUs: "Follow us",
    textEdit: "テキスト編集",
    typography: "タイポグラフィ",
    heading: "見出し",
    body: "本文",
    headingFont: "見出しフォント",
    bodyFont: "本文フォント",
    shuffle: "シャッフル",
    copyCss: "CSSをコピー",
    copied: "CSSをクリップボードにコピーしました",
    viewportMobile: "スマホ",
    viewportPc: "PC",
    about: "KumiFontについて",
    privacy: "プライバシーポリシー",
    operator: "運営元",
    mainHeading: "KumiFontが、Webデザインの「和組み」を変える。",
    benefit1Title: "1秒でシミュレート",
    benefit1Desc: "FigmaやPhotoshopを立ち上げる必要はありません。ブラウザ上でフォントの組み合わせを即座に検証し、最適な「和組み」を見つけ出します。",
    benefit2Title: "デザイナーの直感に寄り添う",
    benefit2Desc: "UXデザイナーとしての20年の経験を活かし、制作現場で最も「面倒」だと感じていたプロセスを自動化。思考を止めずにデザインに没頭できます。",
    benefit3Title: "実務に即したコード出力",
    benefit3Desc: "シミュレーションして終わりではありません。ウェイトや行間、字間などの数値をCSSとしてワンクリックでコピーし、そのまま実装へ繋げられます。",
    articleTitle: "日本語タイポグラフィの「共感」をデザインする",
    articleP1: "なぜ、同じNoto Sansを使っていても、サイトによって受ける印象が異なるのでしょうか？",
    articleP2: "その答えは「組み合わせ（和組み）」にあります。日本語は、ひらがな・カタカナ・漢字という異なる要素が混ざり合う、世界でも稀な美しい言語です。",
    articleP3: "KumiFontは、Google Fontsを最大限に活かし、デザイナーがその「言語の美しさ」を引き出すためのキャンバスとして開発されました。",
    pointsTitle: "美しい和組みの3つのポイント",
    point1Title: "コントラストを意識する",
    point1Desc: "見出しと本文でウェイトの差を明確にすることで、情報の優先順位が伝わりやすくなります。",
    point2Title: "余白（行間）で呼吸させる",
    point2Desc: "日本語は四角い文字が多いため、行間を1.7〜1.9程度に広く取ることで、視線がスムーズに流れます。",
    point3Title: "字間で温度感を変える",
    point3Desc: "高級感を出したい時は広く、信頼感を出したい時はやや詰める。その「温度差」を体感してください。",
    footerDesc: "KumiFont（クミフォント）は、Webデザイナーが日本語フォントの最適な「組み合わせ（和組み）」を直感的にシミュレーションするためのツールです。",
  },
  en: {
    producedBy: "produced by",
    followUs: "Follow us",
    textEdit: "Edit Text",
    typography: "Typography",
    heading: "Heading",
    body: "Body",
    headingFont: "Heading Font",
    bodyFont: "Body Font",
    shuffle: "Shuffle",
    copyCss: "Copy CSS",
    copied: "CSS copied to clipboard",
    viewportMobile: "Mobile",
    viewportPc: "Desktop",
    about: "About KumiFont",
    privacy: "Privacy Policy",
    operator: "Operator",
    mainHeading: "KumiFont Revolutionizes Japanese Web Typography.",
    benefit1Title: "Simulate in 1 Second",
    benefit1Desc: "No need to launch Figma or Photoshop. Instantly verify font pairings in your browser to find the perfect Japanese typography set.",
    benefit2Title: "Intuitive for Designers",
    benefit2Desc: "Built on 20 years of UX design experience to automate the tedious parts of font selection. Stay focused on your creative flow.",
    benefit3Title: "Production-Ready CSS",
    benefit3Desc: "More than just a preview. Copy font weights, line heights, and letter spacing as CSS with one click and move straight to implementation.",
    articleTitle: "Designing 'Empathy' through Japanese Typography",
    articleP1: "Why do sites feel so different even when using the same Noto Sans?",
    articleP2: "The secret lies in the 'Pairing' (Wa-kumi). Japanese is a unique language where Hiragana, Katakana, and Kanji blend to create visual harmony.",
    articleP3: "KumiFont was developed as a canvas for designers to draw out the beauty of these characters using the power of Google Fonts.",
    pointsTitle: "3 Key Points for Beautiful Japanese Typesetting",
    point1Title: "Emphasize Contrast",
    point1Desc: "Defining a clear weight difference between heading and body helps users grasp information hierarchy instantly.",
    point2Title: "Let it Breathe with White Space",
    point2Desc: "Japanese characters are boxy; generous line heights (1.7–1.9) ensure a smooth and comfortable reading experience.",
    point3Title: "Control Mood with Spacing",
    point3Desc: "Wider spacing for luxury, tighter for reliability. Experience the 'emotional temperature' through our letter spacing slider.",
    footerDesc: "KumiFont is an intuitive simulator for Web Designers to discover the perfect pairings and typesetting for Japanese fonts.",
  }
};

// サンプルテキストは英語モードでも日本語を維持
const PRESET_TEXTS = [
  {
    title: { ja: "サービス紹介", en: "Service Intro" },
    heading: "デザインの力で、ビジネスを加速させる。",
    body: "私たちは、ユーザー体験を第一に考えたUI/UXデザインを提供します。最新の技術と深い洞察に基づき, あなたのビジネスが直面する課題を解決へと導きます。まずは気軽にご相談ください。"
  },
  {
    title: { ja: "ニュース記事", en: "News Article" },
    heading: "最新のAIデザインツール、現場への導入が加速",
    body: "近年、AIを活用したデザイン制作が急速に普及しています。特にプロトタイピングの高速化において、従来のワークフローを大幅に改善する事例が増えており、多くのデザイナーがその恩恵を受けています。"
  }
];

const VIEWPORT_SIZES = {
  mobile: { width: '375px' },
  pc: { width: '100%' }
};

const PRIMARY_COLOR = '#6B8EAD'; 

export default function App() {
  const [lang, setLang] = useState('ja');
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
  const [activePresetIndex, setActivePresetIndex] = useState(0);

  const [showToast, setShowToast] = useState(false);
  const [modalType, setModalType] = useState(null); 

  const t = TRANSLATIONS[lang];

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

  const toggleLang = () => {
    setLang(lang === 'ja' ? 'en' : 'ja');
  };

  const copyCSS = async () => {
    const css = `/* Heading */\nh1 {\n  font-family: ${headingFont.value};\n  font-weight: ${headingWeight};\n  font-size: ${headingSize}px;\n  color: ${headingColor};\n  letter-spacing: ${letterSpacing}em;\n}\n\n/* Body */\nbody {\n  font-family: ${bodyFont.value};\n  font-weight: ${bodyWeight};\n  font-size: ${bodySize}px;\n  color: ${bodyColor};\n  line-height: ${lineHeight};\n  letter-spacing: ${letterSpacing}em;\n}`;
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
      <header className="max-w-7xl mx-auto w-full mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div>
            <h1 className="text-3xl font-black tracking-tighter leading-none text-black">KumiFont</h1>
            <p className="text-slate-500 text-[10px] font-medium mt-2 uppercase tracking-tighter">
              {t.producedBy} <a href="https://kyo-kan-design.com/" target="_blank" rel="noopener noreferrer" className="text-slate-700 font-bold hover:underline">共感デザイン研究所</a>
            </p>
          </div>
          <div className="h-8 w-px bg-slate-200 hidden md:block"></div>
          
          <div className="flex items-center gap-4">
            <a href="https://x.com/kumifont" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full text-xs font-bold hover:opacity-80 transition-all shadow-sm">
              <XIcon className="w-3.5 h-3.5" />
              <span>{t.followUs}</span>
            </a>
            
            <button 
              onClick={toggleLang}
              className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded-lg text-[10px] font-black hover:bg-white transition-all text-slate-500"
            >
              <Languages className="w-3.5 h-3.5" />
              {lang === 'ja' ? 'EN' : 'JA'}
            </button>
          </div>
        </div>

        <div className="flex bg-white p-1 rounded-xl shadow-sm border border-slate-200 w-fit">
          {[{ id: 'pc', icon: Monitor, label: t.viewportPc }, { id: 'mobile', icon: Smartphone, label: t.viewportMobile }].map(({ id, icon: Icon, label }) => (
            <button key={id} onClick={() => setPreviewMode(id)} className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${previewMode === id ? 'text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`} style={{ backgroundColor: previewMode === id ? PRIMARY_COLOR : 'transparent' }}>
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-24">
        {/* Controls Column */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-7 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-4">
              <Edit3 className="w-5 h-5" style={{ color: PRIMARY_COLOR }} />
              <h2 className="text-lg font-bold">{t.textEdit}</h2>
            </div>
            <div className="space-y-4">
              <section><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">{t.heading}</label>
                <input type="text" value={headingText} onChange={(e) => setHeadingText(e.target.value)} className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 transition-all" style={{ '--tw-ring-color': PRIMARY_COLOR }} />
              </section>
              <section><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">{t.body}</label>
                <textarea rows="4" value={bodyText} onChange={(e) => setBodyText(e.target.value)} className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 transition-all resize-none" style={{ '--tw-ring-color': PRIMARY_COLOR }} />
              </section>
              <div className="grid grid-cols-2 gap-2">
                {PRESET_TEXTS.map((p, idx) => (
                  <button key={idx} onClick={() => { setHeadingText(p.heading); setBodyText(p.body); setActivePresetIndex(idx); }} className={`py-2 text-xs rounded-lg border transition-all ${activePresetIndex === idx ? 'text-white font-bold border-transparent' : 'bg-white border-slate-200 text-slate-400 hover:border-slate-300'}`} style={{ backgroundColor: activePresetIndex === idx ? PRIMARY_COLOR : '' }}>{p.title[lang]}</button>
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
              <section><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">{t.headingFont}</label>
                <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2" style={{ '--tw-ring-color': PRIMARY_COLOR }} value={headingFont.name} onChange={(e) => setHeadingFont(GOOGLE_FONTS.find(f => f.name === e.target.value))}>
                  {GOOGLE_FONTS.map(f => <option key={f.name} value={f.name}>{f.name}</option>)}
                </select>
              </section>
              <section><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">{t.bodyFont}</label>
                <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2" style={{ '--tw-ring-color': PRIMARY_COLOR }} value={bodyFont.name} onChange={(e) => setBodyFont(GOOGLE_FONTS.find(f => f.name === e.target.value))}>
                  {GOOGLE_FONTS.map(f => <option key={f.name} value={f.name}>{f.name}</option>)}
                </select>
              </section>
              <div className="flex flex-col gap-3 pt-6 border-t border-slate-100">
                <button onClick={randomize} className="flex items-center justify-center gap-2 w-full py-4 bg-slate-50 hover:bg-slate-100 text-slate-500 rounded-xl font-black transition-all border border-slate-200"><RefreshCcw className="w-4 h-4" /> {t.shuffle}</button>
                <button onClick={copyCSS} className="flex items-center justify-center gap-2 w-full py-4 text-white rounded-xl font-black transition-all shadow-xl active:scale-95" style={{ backgroundColor: PRIMARY_COLOR }}><Copy className="w-4 h-4" /> {t.copyCss}</button>
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
      </main>

      {/* Valuable Content Section (For AdSense) */}
      <section className="max-w-4xl mx-auto w-full mb-24 space-y-20 px-4">
        <div className="text-center">
          <h2 className="text-3xl font-black tracking-tight mb-4">{t.mainHeading}</h2>
          <div className="h-1.5 w-20 bg-slate-200 mx-auto rounded-full" style={{ backgroundColor: PRIMARY_COLOR }}></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
            <Zap className="w-6 h-6 mb-4" style={{ color: PRIMARY_COLOR }} />
            <h3 className="font-black text-lg mb-3">{t.benefit1Title}</h3>
            <p className="text-slate-500 leading-relaxed">{t.benefit1Desc}</p>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
            <MousePointer2 className="w-6 h-6 mb-4" style={{ color: PRIMARY_COLOR }} />
            <h3 className="font-black text-lg mb-3">{t.benefit2Title}</h3>
            <p className="text-slate-500 leading-relaxed">{t.benefit2Desc}</p>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
            <BookOpen className="w-6 h-6 mb-4" style={{ color: PRIMARY_COLOR }} />
            <h3 className="font-black text-lg mb-3">{t.benefit3Title}</h3>
            <p className="text-slate-500 leading-relaxed">{t.benefit3Desc}</p>
          </div>
        </div>

        <article className="prose prose-slate max-w-none bg-white p-10 md:p-16 rounded-[3rem] shadow-sm border border-slate-100">
          <div className="max-w-3xl mx-auto text-slate-600 leading-loose">
            <h2 className="text-2xl font-black mb-8 text-slate-900">{t.articleTitle}</h2>
            
            <p className="mb-6 text-lg font-medium text-slate-800">{t.articleP1}</p>
            <p className="mb-6">{t.articleP2}</p>
            <p className="mb-12">{t.articleP3}</p>

            <div className="mt-16 pt-12 border-t border-slate-100">
              <h3 className="text-xl font-black mb-8 text-slate-900 flex items-center gap-2">
                <span className="w-1.5 h-6 rounded-full" style={{ backgroundColor: PRIMARY_COLOR }}></span>
                {t.pointsTitle}
              </h3>
              <ul className="space-y-8 text-base list-none p-0">
                <li className="flex gap-4">
                  <span className="font-black text-lg shrink-0" style={{ color: PRIMARY_COLOR }}>01</span>
                  <div>
                    <strong className="text-slate-900 block mb-1">{t.point1Title}</strong>
                    <span className="text-slate-500">{t.point1Desc}</span>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="font-black text-lg shrink-0" style={{ color: PRIMARY_COLOR }}>02</span>
                  <div>
                    <strong className="text-slate-900 block mb-1">{t.point2Title}</strong>
                    <span className="text-slate-500">{t.point2Desc}</span>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="font-black text-lg shrink-0" style={{ color: PRIMARY_COLOR }}>03</span>
                  <div>
                    <strong className="text-slate-900 block mb-1">{t.point3Title}</strong>
                    <span className="text-slate-500">{t.point3Desc}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </article>
      </section>

      {/* Footer Area */}
      <footer className="max-w-7xl mx-auto w-full pt-12 pb-20 border-t border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Column */}
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4">KumiFont</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-8">{t.footerDesc}</p>
            </div>
            <p className="text-[10px] text-slate-400">© 2026 共感デザイン研究所 (Kyo-kan Design Inc.)</p>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4">Information</h3>
              <nav className="flex flex-wrap gap-4">
                <button onClick={() => setModalType('about')} className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"><Info className="w-4 h-4" /> {t.about}</button>
                <button onClick={() => setModalType('privacy')} className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"><ShieldCheck className="w-4 h-4" /> {t.privacy}</button>
                <a href="https://kyo-kan-design.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"><ExternalLink className="w-4 h-4" /> {t.operator}</a>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <a href="https://x.com/kumifont" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-black px-5 py-2.5 bg-slate-100 hover:bg-black hover:text-white rounded-lg transition-all">
                <XIcon className="w-4 h-4" />
                <span>Follow on 𝕏</span>
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
                <h2 className="text-2xl font-black mb-6">{t.about}</h2>
                <p className="text-slate-600 mb-4">Produced by Kyo-kan Design, KumiFont helps designers streamline the process of pairing Japanese typography, one of the most time-consuming parts of web production.</p>
              </article>
            ) : (
              <article className="prose prose-slate">
                <h2 className="text-2xl font-black mb-6">{t.privacy}</h2>
                <p className="text-slate-600 text-sm">This site is operated by Kyo-kan Design Inc.</p>
                <div className="mt-8 space-y-4 text-xs text-slate-500">
                  <p><strong>Ads</strong>: This site may use third-party advertising services (Google AdSense).</p>
                  <p><strong>Analytics</strong>: This site uses Google Analytics to collect traffic information anonymously.</p>
                </div>
              </article>
            )}
          </div>
        </div>
      )}

      {showToast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 text-white px-10 py-5 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300 z-50" style={{ backgroundColor: PRIMARY_COLOR }}>
          <CheckCircle2 className="w-5 h-5 text-green-400" /> <span className="text-sm font-bold tracking-tight">{t.copied}</span>
        </div>
      )}
    </div>
  );
}