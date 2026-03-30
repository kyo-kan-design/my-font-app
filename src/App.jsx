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
  Languages,
  ChevronDown,
  Layout,
  Type,
  FileText,
  Lightbulb,
  Layers,
  ArrowLeft,
  Home,
  Mail,
  History,
  Scale
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
    contact: "お問い合わせ",
    menuSimulator: "シミュレーター",
    menuGuide: "活用ガイド",
    menuColumn: "専門家コラム",
    backToSim: "シミュレーターに戻る",
    clear: "消去",
    // 審査用長文コンテンツ
    mainHeading: "KumiFontが、Webデザインの「和組み」を変える。",
    conceptTitle: "日本語タイポグラフィの深淵を探る",
    conceptDesc: "日本語は、漢字、ひらがな、カタカナ、そして英数字という四種類の文字体系が混在する、世界でも稀有な複雑さを持つ言語です。Webデザインにおいて、これらをいかに調和させるか（＝和組み）は、サイトの信頼性とユーザー体験を決定づける最重要課題です。KumiFontは、その複雑な選定プロセスを直感的なシミュレーションによって民主化します。",
    benefit1Title: "1秒でシミュレート",
    benefit1Desc: "FigmaやPhotoshopを立ち上げる必要はありません。ブラウザ上でフォントの組み合わせを即座に検証し、最適な「和組み」を見つけ出します。制作初期段階での迅速な意思決定をサポートします。",
    benefit2Title: "デザイナーの直感に寄り添う",
    benefit2Desc: "UXデザイナーとしての20年の経験を活かし、制作現場で最も「面倒」だと感じていたプロセスを自動化。文字間や行間の微細な調整が、ブランドの「声」をどう変えるかをリアルタイムで体感できます。",
    benefit3Title: "実務に即したコード出力",
    benefit3Desc: "シミュレーションして終わりではありません。ウェイトや行間、字間などの数値をCSSとしてワンクリックでコピーし、そのまま実装へ繋げられます。デザインと開発のギャップをゼロにします。",
    guideTitle: "実践：日本語フォント比較ガイド",
    guideDesc: "日本語フォント選定において重要なのは、そのフォントが持つ「情緒的価値」を理解することです。以下に代表的なGoogle Fontsの特性を整理しました。",
    font1Name: "Noto Sans JP",
    font1Text: "AdobeとGoogleが共同開発した、現代のWeb標準とも言えるフォント。どのウェイトでも視認性が高く、情報の重要度を伝えるのに最適です。誠実でクリーンな印象を与えます。",
    font2Name: "Shippori Mincho",
    font2Text: "東京築地活版製造所の名作活字をベースにした、優雅で情緒的な明朝体。本文に使用することで、文学的で高級感のあるデザインを演出できます。",
    extraArticleTitle: "UXデザインにおける「フォント選定」の本質",
    extraArticleContent: "デジタルプロダクトにおいて、フォントは単なる文字情報ではありません。それはブランドがユーザーに語りかける「声」そのものです。信頼感を伝えたいのか、親しみやすさを演出したいのか。KumiFontは、その意図を視覚化するための最強のパートナーです。",
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
    contact: "Contact",
    menuSimulator: "Simulator",
    menuGuide: "Guide",
    menuColumn: "Column",
    backToSim: "Back to Simulator",
    clear: "Clear",
    mainHeading: "KumiFont Revolutionizes Japanese Web Typography.",
    conceptTitle: "Deep Dive into Japanese Typography",
    conceptDesc: "Japanese is a unique language that mixes four writing systems. Balancing them in web design is crucial for credibility and UX. KumiFont democratizes this complex selection process through intuitive simulation.",
    benefit1Title: "Simulate in 1 Second",
    benefit1Desc: "Instantly verify font pairings in your browser without Figma. Speed up your decision-making in the early stages of production.",
    benefit2Title: "Built for Designers",
    benefit2Desc: "Built on 20 years of UX expertise to automate tedious tasks. Experience how small adjustments in spacing change the brand's 'voice'.",
    benefit3Title: "Production Ready",
    benefit3Desc: "Copy weights, line heights, and letter spacing as CSS with one click. Close the gap between design and development.",
    guideTitle: "Practical Guide: Japanese Fonts",
    guideDesc: "Understanding the 'emotional value' of a font is key. Here are the characteristics of popular Google Fonts.",
    font1Name: "Noto Sans JP",
    font1Text: "The modern standard. High legibility across all weights, ideal for conveying hierarchy with a clean, sincere impression.",
    font2Name: "Shippori Mincho",
    font2Text: "An elegant serif based on classic metal type. Perfect for sophisticated, literary, or high-end luxury designs.",
    extraArticleTitle: "The Essence of Font Selection in UX",
    extraArticleContent: "In digital products, fonts are more than info; they are your brand's voice. KumiFont is your partner in visualizing that intent.",
  }
};

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
  const [view, setView] = useState('home'); // 'home', 'guide', 'column', 'privacy', 'contact'
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

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const handleLocation = () => {
      try {
        const path = window.location.pathname;
        if (path === '/guide') setView('guide');
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
    const css = `/* Heading */\nh1 {\n  font-family: ${headingFont.value};\n  font-weight: ${headingWeight};\n  font-size: ${headingSize}px;\n  color: ${headingColor};\n  letter-spacing: ${letterSpacing}em;\n}\n\n/* Body */\nbody {\n  font-family: ${bodyFont.value};\n  font-weight: ${bodyWeight};\n  font-size: ${bodySize}px;\n  color: ${bodyColor};\n  line-height: ${lineHeight};\n  letter-spacing: ${letterSpacing}em;\n}`;
    try { await navigator.clipboard.writeText(css); } catch (err) {}
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const randomize = () => {
    setHeadingFont(GOOGLE_FONTS[Math.floor(Math.random() * GOOGLE_FONTS.length)]);
    setBodyFont(GOOGLE_FONTS[Math.floor(Math.random() * GOOGLE_FONTS.length)]);
  };

  const navigateTo = (newView, path) => {
    setView(newView);
    try { window.history.pushState({}, '', path); } catch (e) {}
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const PageWrapper = ({ children, title, icon: Icon, backLabel }) => (
    <div className="max-w-5xl mx-auto w-full px-4 mb-24 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button onClick={() => navigateTo('home', '/')} className="flex items-center gap-2 text-xs font-black text-slate-400 hover:text-slate-900 transition-all uppercase tracking-widest group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> {backLabel}
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
    <>
      <main id="simulator" className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-24">
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-white p-7 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-4">
              <Edit3 className="w-5 h-5" style={{ color: PRIMARY_COLOR }} />
              <h2 className="text-lg font-bold">{t.textEdit}</h2>
            </div>
            <div className="space-y-4">
              <section>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">{t.heading}</label>
                <div className="relative group">
                  <input type="text" value={headingText} onChange={(e) => setHeadingText(e.target.value)} className="w-full p-3.5 pr-10 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 transition-all" style={{ '--tw-ring-color': PRIMARY_COLOR }} />
                  {headingText && (
                    <button onClick={() => setHeadingText('')} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-300 hover:text-slate-600 transition-colors"><X className="w-4 h-4" /></button>
                  )}
                </div>
              </section>
              <section>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">{t.body}</label>
                <div className="relative group">
                  <textarea rows="4" value={bodyText} onChange={(e) => setBodyText(e.target.value)} className="w-full p-3.5 pr-10 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 transition-all resize-none" style={{ '--tw-ring-color': PRIMARY_COLOR }} />
                  {bodyText && (
                    <button onClick={() => setBodyText('')} className="absolute right-3 top-3 p-1 text-slate-300 hover:text-slate-600 transition-colors"><X className="w-4 h-4" /></button>
                  )}
                </div>
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
        </aside>

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

      {/* 審査対策：トップページに長文テキストを直接配置 */}
      <section className="max-w-4xl mx-auto w-full mb-32 space-y-24 px-4 border-t border-slate-100 pt-24">
        <div className="text-center space-y-6">
          <h2 className="text-4xl font-black tracking-tight text-slate-900">{t.mainHeading}</h2>
          <p className="text-xl text-slate-500 leading-relaxed font-medium max-w-2xl mx-auto">{t.conceptDesc}</p>
          <div className="h-1.5 w-24 bg-slate-200 mx-auto rounded-full" style={{ backgroundColor: PRIMARY_COLOR }}></div>
        </div>

        {/* 教育的コンテンツセクション 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-slate-400 font-black uppercase tracking-widest text-xs">
              <History className="w-4 h-4" /> Background
            </div>
            <h3 className="text-2xl font-black text-slate-900">日本語タイポグラフィの「組み」の歴史</h3>
            <p className="text-slate-600 leading-loose">
              活版印刷の時代から、日本語の美しさは「詰め」と「アキ」のバランスによって守られてきました。デジタルフォントが主流となった現代でも、その本質は変わりません。KumiFontは、伝統的な「和組み」の美学を、現代のWebフォント環境に合わせてシミュレーションできる次世代のツールです。
            </p>
          </div>
          <div className="bg-slate-100 rounded-[2.5rem] p-12 flex items-center justify-center aspect-square md:aspect-auto">
            <Type className="w-32 h-32 text-slate-300" />
          </div>
        </div>

        {/* 教育的コンテンツセクション 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="bg-slate-900 rounded-[2.5rem] p-12 text-white order-2 md:order-1">
             <div className="space-y-8">
               <div className="flex gap-4">
                 <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center font-bold text-blue-400">1</div>
                 <div><h4 className="font-bold mb-2 text-lg">可読性の向上</h4><p className="text-slate-400 text-sm">本文の行間を1.7倍以上に保つことで、長文の読みやすさが劇的に向上します。</p></div>
               </div>
               <div className="flex gap-4">
                 <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center font-bold text-purple-400">2</div>
                 <div><h4 className="font-bold mb-2 text-lg">ブランドの強調</h4><p className="text-slate-400 text-sm">見出しにウェイトの重いフォントを配することで、サイトのトーンを定義します。</p></div>
               </div>
             </div>
          </div>
          <div className="space-y-6 order-1 md:order-2">
            <div className="flex items-center gap-3 text-slate-400 font-black uppercase tracking-widest text-xs">
              <Scale className="w-4 h-4" /> Best Practice
            </div>
            <h3 className="text-2xl font-black text-slate-900">失敗しないフォント選定の三原則</h3>
            <p className="text-slate-600 leading-loose">
              1. コントラストを強調する。 2. 余白を恐れない。 3. ユーザーのデバイス環境を意識する。これらの原則をKumiFont上で試行錯誤することで、誰でもプロフェッショナルな品質のタイポグラフィを実現できます。
            </p>
          </div>
        </div>
      </section>
    </>
  );

  const renderContact = () => (
    <PageWrapper title={t.contact} icon={Mail} backLabel={t.backToSim}>
      <article className="prose prose-slate max-w-none bg-white p-10 md:p-16 rounded-[3rem] shadow-sm border border-slate-100">
        <div className="max-w-3xl mx-auto text-slate-600 leading-loose">
          <h2 className="text-2xl font-black mb-8 text-slate-900">{t.contact}</h2>
          <p className="mb-6 text-lg">KumiFontに関するご意見・ご要望は、運営会社である株式会社共感デザイン研究所までお問い合わせください。</p>
          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 space-y-4">
            <p className="font-bold flex items-center gap-2"><ExternalLink className="w-4 h-4 text-blue-500" /> <a href="https://kyo-kan-design.com/contact/" target="_blank" rel="noopener noreferrer" className="hover:underline">お問い合わせフォーム（公式サイト）</a></p>
            <p className="text-sm text-slate-400">※通常3営業日以内にご返信いたします。ツールのバグ報告などは、SNSのDMでも受け付けております。</p>
          </div>
        </div>
      </article>
    </PageWrapper>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans p-4 md:p-8 flex flex-col">
      <header className="max-w-7xl mx-auto w-full mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="cursor-pointer" onClick={() => navigateTo('home', '/')}>
            <h1 className="text-3xl font-black tracking-tighter leading-none text-black">KumiFont</h1>
            <p className="text-slate-500 text-[10px] font-medium mt-2 uppercase tracking-tighter">{t.producedBy} <a href="https://kyo-kan-design.com/" target="_blank" rel="noopener noreferrer" className="text-slate-700 font-bold hover:underline">共感デザイン研究所</a></p>
          </div>
          <div className="h-8 w-px bg-slate-200 hidden md:block"></div>
          <nav className="flex items-center gap-6 text-[11px] font-black uppercase tracking-widest">
            <button onClick={() => navigateTo('home', '/')} className={`transition-all ${view === 'home' ? 'text-black border-b-2 border-black' : 'text-slate-400'}`}>{t.menuSimulator}</button>
            <button onClick={() => navigateTo('guide', '/guide')} className={`transition-all ${view === 'guide' ? 'text-black border-b-2 border-black' : 'text-slate-400'}`}>{t.menuGuide}</button>
            <button onClick={() => navigateTo('column', '/column')} className={`transition-all ${view === 'column' ? 'text-black border-b-2 border-black' : 'text-slate-400'}`}>{t.menuColumn}</button>
          </nav>
          <div className="flex items-center gap-4">
            <a href="https://x.com/kumifont" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full text-xs font-bold hover:opacity-80 transition-all shadow-sm"><XIcon className="w-3.5 h-3.5" /></a>
            <button onClick={() => setLang(lang === 'ja' ? 'en' : 'ja')} className="px-3 py-1.5 border border-slate-200 rounded-lg text-[10px] font-black hover:bg-white transition-all text-slate-500 uppercase">{lang === 'ja' ? 'EN' : 'JA'}</button>
          </div>
        </div>
        {view === 'home' && (
          <div className="flex bg-white p-1 rounded-xl shadow-sm border border-slate-200 w-fit">
            {[{ id: 'pc', icon: Monitor, label: t.viewportPc }, { id: 'mobile', icon: Smartphone, label: t.viewportMobile }].map(({ id, icon: Icon, label }) => (
              <button key={id} onClick={() => setPreviewMode(id)} className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${previewMode === id ? 'text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`} style={{ backgroundColor: previewMode === id ? PRIMARY_COLOR : 'transparent' }}><Icon className="w-4 h-4" /><span>{label}</span></button>
            ))}
          </div>
        )}
      </header>

      {view === 'home' ? renderSimulator() : view === 'guide' ? (
        <PageWrapper title={t.guideTitle} icon={FileText} backLabel={t.backToSim}>
          <p className="text-slate-500 max-w-2xl text-lg leading-relaxed">{t.guideDesc}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[{ name: t.font1Name, text: t.font1Text, dot: 'bg-blue-500' }, { name: 'M PLUS 1p', text: '明るくモダンな印象を与えるフォント。やや丸みを帯びた形状が、サービスに親しみやすさをもたらします。', dot: 'bg-cyan-400' }, { name: t.font2Name, text: t.font2Text, dot: 'bg-purple-500' }].map((f, i) => (
              <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm"><h4 className="text-xl font-black mb-4 flex items-center gap-2"><div className={`w-2 h-2 rounded-full ${f.dot}`}></div>{f.name}</h4><p className="text-sm text-slate-500 leading-loose">{f.text}</p></div>
            ))}
          </div>
        </PageWrapper>
      ) : view === 'column' ? (
        <PageWrapper title={t.menuColumn} icon={Lightbulb} backLabel={t.backToSim}>
          <article className="prose prose-slate max-w-none bg-slate-900 text-slate-300 p-10 md:p-16 rounded-[4rem] shadow-xl relative overflow-hidden">
            <div className="max-w-3xl mx-auto relative z-10">
              <h2 className="text-3xl font-black mb-8 text-white">{t.extraArticleTitle}</h2>
              <p className="text-xl leading-relaxed mb-10 text-slate-100 font-medium">{t.extraArticleContent}</p>
            </div>
          </article>
        </PageWrapper>
      ) : view === 'privacy' ? (
        <PageWrapper title={t.privacy} icon={ShieldCheck} backLabel={t.backToSim}>
          <article className="prose prose-slate max-w-none bg-white p-10 md:p-16 rounded-[3rem] shadow-sm border border-slate-100">
            <div className="max-w-3xl mx-auto text-slate-600 leading-loose">
              <h2 className="text-2xl font-black mb-8 text-slate-900">{t.privacy}</h2>
              <p>当サイトは、GoogleアドセンスおよびGoogleアナリティクスを利用しています。詳細はCookieポリシーをご確認ください。</p>
            </div>
          </article>
        </PageWrapper>
      ) : renderContact()}

      <footer className="max-w-7xl mx-auto w-full pt-12 pb-20 border-t border-slate-200 mt-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex flex-col justify-between space-y-8">
            <div><h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4">KumiFont</h3><p className="text-sm text-slate-500 leading-relaxed max-w-md">Webデザイナーが日本語フォントの最適な「組み合わせ」を直感的にシミュレーションするための教育メディア兼ツールです。</p></div>
            <p className="text-[10px] text-slate-400">© 2026 共感デザイン研究所 (Kyo-kan Design Inc.)</p>
          </div>
          <div className="flex flex-col gap-6">
            <nav className="flex flex-wrap gap-x-8 gap-y-4">
              <button onClick={() => navigateTo('home', '/')} className="text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors">{t.menuSimulator}</button>
              <button onClick={() => navigateTo('guide', '/guide')} className="text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors">{t.menuGuide}</button>
              <button onClick={() => navigateTo('contact', '/contact')} className="text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors">{t.contact}</button>
              <button onClick={() => navigateTo('privacy', '/privacy')} className="text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors">{t.privacy}</button>
            </nav>
            <div className="flex gap-4"><a href="https://x.com/kumifont" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-black px-5 py-2.5 bg-slate-100 hover:bg-black hover:text-white rounded-lg transition-all"><XIcon className="w-4 h-4" /><span>Follow on 𝕏</span></a></div>
          </div>
        </div>
      </footer>

      {showToast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 text-white px-10 py-5 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300 z-50" style={{ backgroundColor: PRIMARY_COLOR }}>
          <CheckCircle2 className="w-5 h-5 text-green-400" /> <span className="text-sm font-bold tracking-tight">{t.copied}</span>
        </div>
      )}
    </div>
  );
}