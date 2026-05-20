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
      <p>当サイト「KumiFont」は、共感デザイン研究所（Kyo-kan Design Inc.）が運営しています。当サイトでは、利用者の利便性向上、サイト改善、広告配信のために、Cookie等の技術を使用する場合があります。</p>

      <h2>広告配信について</h2>
      <p>当サイトでは、第三者配信の広告サービス「Google AdSense」を利用する場合があります。Googleを含む第三者配信事業者は、Cookieを使用して、利用者が当サイトや他のサイトに過去にアクセスした情報に基づいて広告を配信することがあります。</p>
      <p>Googleによる広告Cookieの使用により、利用者に適した広告が表示されます。利用者は、Googleの広告設定ページでパーソナライズ広告を無効にできます。</p>
      <p>詳細については、Googleの広告に関するポリシーをご確認ください。</p>
      <p><a href="https://policies.google.com/technologies/ads?hl=ja">Googleの広告に関するポリシー</a></p>

      <h2>アクセス解析について</h2>
      <p>当サイトでは、サイトの利用状況を把握し、コンテンツ改善に役立てるためにGoogle Analyticsを使用しています。Google AnalyticsはCookieを使用して匿名のトラフィックデータを収集します。収集される情報によって個人を特定するものではありません。</p>

      <h2>Cookieについて</h2>
      <p>Cookieとは、利用者のブラウザに保存される小さな情報ファイルです。利用者はブラウザの設定によりCookieを無効にできます。ただし、Cookieを無効にした場合、当サイトの一部機能が正しく動作しない場合があります。</p>

      <h2>個人情報の取り扱いについて</h2>
      <p>当サイトでは、お問い合わせ等を通じて取得した個人情報を、回答や連絡のために必要な範囲で利用します。法令に基づく場合を除き、本人の同意なく第三者に提供することはありません。</p>

      <h2>お問い合わせ</h2>
      <p>本ポリシーに関するお問い合わせは、共感デザイン研究所の公式サイトよりご連絡ください。</p>
      <p><a href="https://kyo-kan-design.com/">共感デザイン研究所 公式サイト</a></p>

      <p>制定日: 2026年5月20日</p>
      <p>最終更新日: 2026年5月20日</p>
    </section>
  `),
  'プライバシーポリシー | KumiFont',
  'KumiFontのプライバシーポリシー、Google AdSense、Google Analytics、Cookie、個人情報の取り扱いについて説明します。'
);

writeHtml(
  '/contact',
  renderLayout(`
    <section>
      <h1>お問い合わせ</h1>

      <h2>KumiFontについて</h2>
      <p>KumiFontは、日本語フォントの組み合わせをブラウザ上で確認できるWebデザイン支援ツールです。Webサイト制作、ブランド設計、UIデザインにおける日本語タイポグラフィの検討を支援するために公開しています。</p>

      <h2>運営者情報</h2>
      <dl>
        <dt>サイト名</dt>
        <dd>KumiFont</dd>
        <dt>運営者</dt>
        <dd>共感デザイン研究所（Kyo-kan Design Inc.）</dd>
        <dt>運営内容</dt>
        <dd>日本語フォント、Webタイポグラフィ、Webデザインに関するツールおよび情報コンテンツの提供</dd>
        <dt>サイトURL</dt>
        <dd><a href="https://www.kumifont.com/">https://www.kumifont.com/</a></dd>
      </dl>

      <h2>お問い合わせ先</h2>
      <p>KumiFontに関するご意見、ご質問、取材のご相談、掲載内容に関するお問い合わせは、共感デザイン研究所の公式サイトよりご連絡ください。</p>
      <p><a href="https://kyo-kan-design.com/">共感デザイン研究所 公式サイト</a></p>

      <h2>免責事項</h2>
      <p>当サイトに掲載している情報は、可能な限り正確な内容を提供するよう努めていますが、情報の完全性、正確性、最新性を保証するものではありません。掲載内容や外部リンク先の利用によって生じた損害等について、当サイトは責任を負いかねます。</p>
    </section>
  `),
  'お問い合わせ・運営者情報 | KumiFont',
  'KumiFontのお問い合わせ先、運営者情報、サイトの運営内容について掲載しています。'
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