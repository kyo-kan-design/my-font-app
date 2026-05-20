// src/AboutPage.jsx
import React from 'react';
import { Info, ExternalLink } from 'lucide-react';

const PRIMARY_COLOR = '#6B8EAD';

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto w-full px-4 mb-24 space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-white shadow-sm border border-slate-100">
            <Info className="w-8 h-8" style={{ color: PRIMARY_COLOR }} />
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-slate-900">KumiFont について</h1>
        </div>
        <div className="h-1 w-20 rounded-full" style={{ backgroundColor: PRIMARY_COLOR }}></div>
      </div>

      <section className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6 text-slate-700 leading-relaxed">
        <div>
          <h2 className="text-xl font-black text-slate-900 mb-3">サイトの目的</h2>
          <p>
            KumiFont(クミフォント)は、Webデザイナー・エンジニア・ブログ運営者の方々が、日本語フォントの最適な「組み合わせ(和組み)」をブラウザ上で直感的に発見できるよう開発された、無料のフォントペアリングシミュレーターです。
          </p>
          <p className="mt-3">
            Google Fontsをはじめとする日本語Webフォントは年々充実してきましたが、見出しと本文にどのフォントを合わせれば読みやすく印象が良くなるかを実機で試すには手間がかかります。KumiFontはその試行錯誤を1画面で完結させ、完成したCSSをそのままコピーして実装に使える点が特徴です。
          </p>
        </div>

        <div>
          <h2 className="text-xl font-black text-slate-900 mb-3">運営者について</h2>
          <p>
            共感デザイン研究所(Kyo-kan Design Inc.)は、Webデザイン・UI/UX設計・タイポグラフィに関する制作および研究活動を行っているデザインスタジオです。日々のクライアントワークの中で日本語フォントの選定が最も時間を取られる工程であった経験から、その課題を解決するために本ツールを開発しました。
          </p>
          <p className="mt-3">
            <a
              href="https://kyo-kan-design.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold hover:underline"
              style={{ color: PRIMARY_COLOR }}
            >
              共感デザイン研究所の公式サイトを見る
              <ExternalLink className="w-4 h-4" />
            </a>
          </p>
        </div>

        <div>
          <h2 className="text-xl font-black text-slate-900 mb-3">提供している価値</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>主要な日本語Webフォントを一画面で比較できる環境</li>
            <li>実際のWebサイトに近い、見出しと本文のプレビュー表示</li>
            <li>選択したフォントの組み合わせをCSSコードとして即座に生成</li>
            <li>フォント選定に役立つ専門コラム10本と、フォント別の詳細ガイド</li>
            <li>PCとスマホ両方のレイアウトでの確認</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-black text-slate-900 mb-3">本サイトの編集方針</h2>
          <p>
            掲載しているコラム・ガイド記事は、すべて共感デザイン研究所の制作経験とリサーチに基づいた独自コンテンツです。商業的な紹介記事ではなく、現場のデザイナーが実務で本当に役立つと判断した内容のみを掲載しています。
          </p>
        </div>

        <div>
          <h2 className="text-xl font-black text-slate-900 mb-3">お問い合わせ</h2>
          <p>
            ご意見・ご質問・取材のご相談は、お問い合わせページよりお寄せください。
          </p>
        </div>
      </section>
    </div>
  );
}
