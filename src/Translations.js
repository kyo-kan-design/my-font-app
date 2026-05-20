// src/Translations.js
export const TRANSLATIONS = {
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
    contact: "お問い合わせ",
    operator: "運営元",
    column: "コラム",
    guide: "フォントガイド",
    backToTop: "トップへ戻る",
    columnIntro: "日本語Webタイポグラフィの実践知。デザイナーのための10本の記事。",
    guideIntro: "Google Fontsから厳選した日本語フォントの特徴と使い分け。",
    footerDesc: "KumiFont（クミフォント）は、Webデザイナーが日本語フォントの最適な「組み合わせ（和組み）」を直感的にシミュレーションするためのツールです。",
    recommendedUsage: "推奨用途",
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
    contact: "Contact",
    operator: "Operator",
    column: "Column",
    guide: "Font Guide",
    backToTop: "Back to Top",
    columnIntro: "Practical insights on Japanese web typography. (Japanese only)",
    guideIntro: "Curated Japanese fonts from Google Fonts. (Japanese only)",
    footerDesc: "KumiFont is an intuitive simulator for Web Designers to discover the perfect pairings and typesetting for Japanese fonts.",
    recommendedUsage: "Recommended",
  }
};

export const PRESET_TEXTS = [
  {
    title: { ja: "サービス紹介", en: "Service Intro" },
    heading: "デザインの力で、ビジネスを加速させる。",
    body: "私たちは、ユーザー体験を第一に考えたUI/UXデザインを提供します。最新の技術と深い洞察に基づき、あなたのビジネスが直面する課題を解決へと導きます。まずは気軽にご相談ください。"
  },
  {
    title: { ja: "ニュース記事", en: "News Article" },
    heading: "最新のAIデザインツール、現場への導入が加速",
    body: "近年、AIを活用したデザイン制作が急速に普及しています。特にプロトタイピングの高速化において、従来のワークフローを大幅に改善する事例が増えており、多くのデザイナーがその恩恵を受けています。"
  }
];

export const GOOGLE_FONTS = [
  // ===== ゴシック / Sans =====
  { name: 'Noto Sans JP', value: "'Noto Sans JP', sans-serif" },
  { name: 'M PLUS 1p', value: "'M PLUS 1p', sans-serif" },
  { name: 'M PLUS Rounded 1c', value: "'M PLUS Rounded 1c', sans-serif" },
  { name: 'Zen Kaku Gothic New', value: "'Zen Kaku Gothic New', sans-serif" },
  { name: 'Zen Kaku Gothic Antique', value: "'Zen Kaku Gothic Antique', sans-serif" },
  { name: 'Zen Maru Gothic', value: "'Zen Maru Gothic', sans-serif" },
  { name: 'Sawarabi Gothic', value: "'Sawarabi Gothic', sans-serif" },
  { name: 'BIZ UDPGothic', value: "'BIZ UDPGothic', sans-serif" },
  { name: 'IBM Plex Sans JP', value: "'IBM Plex Sans JP', sans-serif" },
  // ===== 明朝 / Serif =====
  { name: 'Noto Serif JP', value: "'Noto Serif JP', serif" },
  { name: 'Shippori Mincho', value: "'Shippori Mincho', serif" },
  { name: 'Sawarabi Mincho', value: "'Sawarabi Mincho', serif" },
  { name: 'Zen Old Mincho', value: "'Zen Old Mincho', serif" },
  { name: 'Kaisei Opti', value: "'Kaisei Opti', serif" },
  // ===== 個性派 / Display =====
  { name: 'Klee One', value: "'Klee One', serif" },
  { name: 'Yusei Magic', value: "'Yusei Magic', sans-serif" },
  { name: 'Kiwi Maru', value: "'Kiwi Maru', serif" },
  { name: 'RocknRoll One', value: "'RocknRoll One', sans-serif" },
];