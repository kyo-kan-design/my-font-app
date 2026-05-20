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
      <p>KumiFontは、WebサイトやUIデザインで使う日本語フォントの組み合わせを、ブラウザ上で確認できる無料ツールです。見出しと本文に異なるフォントを指定し、文字サイズ、行間、字間、色、太さを調整しながら、実際のWebページに近い見た目を比較できます。</p>

      <h2>KumiFontでできること</h2>
      <p>日本語Webデザインでは、フォントの選び方によって読みやすさ、信頼感、親しみやすさ、上品さが大きく変わります。KumiFontでは、Noto Sans JP、Noto Serif JP、M PLUS 1p、Shippori Mincho、Sawarabi Gothicなど、Web制作でよく使われる日本語フォントを組み合わせて確認できます。</p>
      <ul>
        <li>見出しと本文のフォント組み合わせを比較できます。</li>
        <li>本文の行間や字間を調整して、読みやすさを確認できます。</li>
        <li>PC表示とスマートフォン表示の印象を切り替えて確認できます。</li>
        <li>作成したフォント設定のCSSをコピーして、Web制作に活用できます。</li>
      </ul>

      <h2>こんな人に向いています</h2>
      <p>KumiFontは、Webデザイナー、フロントエンドエンジニア、個人サイト運営者、ブログ運営者、ノーコードツールでサイトを作る方に向けて制作しています。特に、日本語フォントの組み合わせに迷う場面や、ブランドイメージに合う書体を短時間で比較したい場面で役立ちます。</p>

      <h2>日本語フォント選びが重要な理由</h2>
      <p>日本語は漢字、ひらがな、カタカナ、英数字が混在するため、欧文フォントよりも画面上の密度が高くなりやすい特徴があります。そのため、フォントの種類だけでなく、行間、字間、太さ、見出しと本文の役割分担を合わせて考える必要があります。KumiFontでは、こうした日本語特有の読みやすさを実際の表示に近い形で検討できます。</p>

      <h2>おすすめの読み物</h2>
      <ul>
        <li><a href="/article/noto-sans-vs-serif">Noto Sans JPとNoto Serif JPの使い分け完全ガイド</a></li>
        <li><a href="/article/font-pairing-7-patterns">失敗しないWebサイトのフォント組み合わせ7パターン</a></li>
        <li><a href="/article/line-height-guide">行間(line-height)1.5/1.7/2.0の違いと使いどころ</a></li>
        <li><a href="/article/letter-spacing-japanese">字間(letter-spacing)が日本語Webの可読性に与える影響</a></li>
      </ul>
    </section>
  `),
  'KumiFont | 日本語フォント組み合わせシミュレーター',
  'KumiFontは、日本語フォントの組み合わせ、行間、字間、太さ、色をブラウザ上で比較できるWebデザイン支援ツールです。'
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
      <p>このページでは、日本語Webフォントを選ぶときの基本的な考え方をまとめています。フォントは単なる装飾ではなく、読みやすさ、ブランドイメージ、情報の伝わり方に影響する重要な設計要素です。</p>

      <h2>ゴシック体と明朝体の違い</h2>
      <p>ゴシック体は線の太さが比較的均一で、画面上で読みやすく、UIや本文、ナビゲーションに向いています。Noto Sans JPやZen Kaku Gothic Newのようなフォントは、情報をすばやく正確に伝えたいサイトに適しています。</p>
      <p>明朝体は線に強弱があり、上品さや知的な印象を出しやすい書体です。Noto Serif JPやShippori Minchoのようなフォントは、コラム、ブランドストーリー、読み物系のコンテンツに向いています。ただし、小さすぎるサイズでは細い線が読みにくくなるため注意が必要です。</p>

      <h2>見出しと本文の役割を分ける</h2>
      <p>Webページでは、見出しは内容を素早く理解させる役割、本文はストレスなく読み進めてもらう役割を持ちます。見出しに個性のあるフォントを使い、本文には読みやすいフォントを使うと、デザイン性と可読性のバランスを取りやすくなります。</p>

      <h2>行間と字間の考え方</h2>
      <p>日本語の本文では、行間を少し広めに設定すると読みやすくなります。短いUIテキストでは line-height 1.5 前後、通常の本文では 1.7 から 1.9 程度、長文記事では 2.0 前後が検討しやすい目安です。字間は広げすぎると読みにくくなるため、本文では 0 から 0.05em 程度に収めると自然です。</p>

      <h2>サイトの目的に合わせて選ぶ</h2>
      <p>コーポレートサイトでは信頼感と読みやすさ、メディアサイトでは長文の読み心地、ECサイトでは商品情報の見やすさが重要です。フォント選びでは、自分の好みだけでなく、訪問者がどのような情報をどのような気持ちで読むのかを考えることが大切です。</p>

      <h2>KumiFontで確認できること</h2>
      <p>KumiFontでは、フォント名だけを見て選ぶのではなく、実際の見出しと本文の組み合わせとして表示を確認できます。フォント、太さ、サイズ、色、行間、字間を変えながら、サイトの目的に合う組み合わせを探してください。</p>

      <h2>関連コラム</h2>
      <ul>
        <li><a href="/article/mincho-vs-gothic">明朝体とゴシック体──ブランド印象を決める選び方</a></li>
        <li><a href="/article/mplus1p-friendly">M PLUS 1pが「親しみやすさ」を生む3つの理由</a></li>
        <li><a href="/article/shippori-mincho-layout">Shippori Minchoで作る上品な記事レイアウト</a></li>
        <li><a href="/article/font-display-swap">font-display: swap と日本語Webフォント表示最適化</a></li>
      </ul>
    </section>
  `),
  'フォントガイド | KumiFont',
  '日本語Webフォントの選び方、ゴシック体と明朝体の違い、行間や字間の考え方を解説するガイドです。'
);

writeHtml(
  '/about',
  renderLayout(`
    <section>
      <h1>KumiFontについて</h1>
      <p>KumiFontは、共感デザイン研究所が運営する日本語フォント組み合わせシミュレーターです。WebサイトやUIを制作する人が、日本語フォントの見え方を実際の画面に近い形で比較できるようにすることを目的に公開しています。</p>

      <h2>運営目的</h2>
      <p>日本語のWebデザインでは、フォント選びがサイト全体の印象を大きく左右します。しかし、フォント名だけを見ても、見出しや本文に使ったときの雰囲気、読みやすさ、ブランドとの相性は判断しにくいものです。KumiFontは、こうしたフォント選びの不安を減らし、制作前の検討をしやすくするために作られました。</p>

      <h2>提供している内容</h2>
      <p>当サイトでは、日本語フォントの組み合わせを試せるシミュレーターと、日本語タイポグラフィに関する解説記事を提供しています。記事では、ゴシック体と明朝体の使い分け、フォントペアリング、行間、字間、Webフォント表示の最適化など、実務で役立つテーマを扱っています。</p>

      <h2>コンテンツ制作方針</h2>
      <p>KumiFontでは、Web制作やUIデザインの実務で使いやすい情報を、できるだけ具体的な例とともに掲載することを大切にしています。単にフォントを紹介するだけでなく、どのようなサイトに向いているのか、どのような印象を与えるのか、どの設定に注意すべきかを整理して伝えることを目指しています。</p>

      <h2>運営者</h2>
      <p>運営者は共感デザイン研究所（Kyo-kan Design Inc.）です。デザイン、Web制作、ユーザー体験に関する知見をもとに、制作者がよりよい表現を選びやすくなるための情報とツールを提供しています。</p>

      <h2>お問い合わせ</h2>
      <p>サイトに関するご意見、ご質問、取材のご相談は、お問い合わせページをご確認ください。</p>
      <p><a href="/contact">お問い合わせ・運営者情報を見る</a></p>
    </section>
  `),
  'KumiFontについて',
  'KumiFontの運営目的、提供内容、コンテンツ制作方針、運営者情報について紹介します。'
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