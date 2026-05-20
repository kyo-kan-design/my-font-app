import fs from 'node:fs';
import path from 'node:path';
import { articles } from '../src/articles.js';

const distDir = path.resolve('dist');
const indexPath = path.join(distDir, 'index.html');

const template = fs.readFileSync(indexPath, 'utf8');

const escapeHtml = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

const writeHtml = (route, bodyHtml, title, description) => {
  const outputPath =
    route === '/'
      ? path.join(distDir, 'index.html')
      : path.join(distDir, route, 'index.html');

  const html = template
    .replace(
      /<title>.*?<\/title>/,
      `<title>${escapeHtml(title)}</title>`
    )
    .replace(
      /<meta name="description" content=".*?" \/>/,
      `<meta name="description" content="${escapeHtml(description)}" />`
    )
    .replace(
      '<div id="root"></div>',
      `<div id="root">${bodyHtml}</div>`
    );

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, html);
};

const renderLayout = (mainHtml) => `
  <div class="min-h-screen bg-[#f8fafc] text-slate-900 font-sans p-4 md:p-8 flex flex-col">
    <header class="max-w-7xl mx-auto w-full mb-12">
      <h1>KumiFont</h1>
      <nav>
        <a href="/">ホーム</a>
        <a href="/column">コラム</a>
        <a href="/guide">ガイド</a>
        <a href="/about">このサイトについて</a>
        <a href="/privacy">プライバシーポリシー</a>
        <a href="/contact">お問い合わせ</a>
      </nav>
    </header>
    <main>${mainHtml}</main>
    <footer>
      <p>© 2026 共感デザイン研究所 (Kyo-kan Design Inc.)</p>
    </footer>
  </div>
`;

const renderArticle = (article) => renderLayout(`
  <article>
    <header>
      <p>KumiFont Column</p>
      <h1>${escapeHtml(article.title)}</h1>
      <p>${escapeHtml(article.description)}</p>
      <time>${escapeHtml(article.date)}</time>
    </header>
    ${article.sections.map((section) => `
      <section>
        <h2>${escapeHtml(section.heading)}</h2>
        ${section.body
          .split('\n\n')
          .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
          .join('\n')}
      </section>
    `).join('\n')}
  </article>
`);

writeHtml(
  '/',
  renderLayout(`
    <section>
      <h1>日本語フォント組み合わせシミュレーター</h1>
      <p>Webデザインに適した日本語フォントの組み合わせを、ブラウザ上で確認できるツールです。</p>
    </section>
  `),
  'KumiFont | 日本語フォント組み合わせシミュレーター',
  'KumiFontは、日本語フォントの組み合わせを試せるWebデザイン向けシミュレーターです。'
);

writeHtml(
  '/column',
  renderLayout(`
    <section>
      <h1>コラム</h1>
      <p>日本語フォント、Webタイポグラフィ、フォントペアリングに関する解説記事です。</p>
      <ul>
        ${articles.map((article) => `
          <li>
            <a href="/article/${article.slug}">${escapeHtml(article.title)}</a>
            <p>${escapeHtml(article.description)}</p>
          </li>
        `).join('\n')}
      </ul>
    </section>
  `),
  'コラム | KumiFont',
  '日本語フォント、Webタイポグラフィ、フォントペアリングに関する解説記事一覧です。'
);

writeHtml(
  '/guide',
  renderLayout(`
    <section>
      <h1>フォントガイド</h1>
      <p>日本語Webフォントの特徴や使いどころを解説します。</p>
    </section>
  `),
  'フォントガイド | KumiFont',
  '日本語Webフォントの特徴や使いどころを解説するガイドです。'
);

writeHtml(
  '/about',
  renderLayout(`
    <section>
      <h1>KumiFontについて</h1>
      <p>KumiFontは、共感デザイン研究所が運営する日本語フォント組み合わせシミュレーターです。</p>
      <p>Webサイト制作やブランド設計における日本語タイポグラフィの検討を支援するために公開しています。</p>
    </section>
  `),
  'KumiFontについて',
  'KumiFontの運営者、目的、提供内容について紹介します。'
);

writeHtml(
  '/privacy',
  renderLayout(`
    <section>
      <h1>プライバシーポリシー</h1>
      <p>当サイトは、共感デザイン研究所（Kyo-kan Design Inc.）が運営しています。</p>
      <h2>広告配信について</h2>
      <p>当サイトでは、第三者配信の広告サービスであるGoogle AdSenseを利用する場合があります。広告配信事業者は、ユーザーの興味に応じた広告を表示するためにCookie、ウェブビーコン、IPアドレス、その他の識別子を使用することがあります。</p>
      <p>Googleを含む第三者配信事業者は、Cookieを使用して、ユーザーが当サイトや他のサイトに過去にアクセスした情報に基づいて広告を配信することがあります。</p>
      <h2>アクセス解析について</h2>
      <p>当サイトでは、サイト改善のためGoogle Analyticsを使用しています。Google AnalyticsはCookieを使用して利用状況を収集します。</p>
      <h2>お問い合わせ</h2>
      <p>本ポリシーに関するお問い合わせは、共感デザイン研究所の公式サイトよりご連絡ください。</p>
    </section>
  `),
  'プライバシーポリシー | KumiFont',
  'KumiFontのプライバシーポリシー、広告配信、アクセス解析、Cookieの利用について説明します。'
);

writeHtml(
  '/contact',
  renderLayout(`
    <section>
      <h1>お問い合わせ</h1>
      <p>KumiFontに関するご意見、ご質問、取材のご相談は、共感デザイン研究所までお問い合わせください。</p>
      <p><a href="https://kyo-kan-design.com/">共感デザイン研究所 公式サイト</a></p>
    </section>
  `),
  'お問い合わせ | KumiFont',
  'KumiFontに関するお問い合わせ先を掲載しています。'
);

for (const article of articles) {
  writeHtml(
    `/article/${article.slug}`,
    renderArticle(article),
    `${article.title} | KumiFont`,
    article.description
  );
}

console.log('Static HTML prerender complete.');