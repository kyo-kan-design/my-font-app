import React from 'react';
import { ShieldCheck } from 'lucide-react';

const PRIMARY_COLOR = '#6B8EAD';

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto w-full px-4 mb-24 space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-white shadow-sm border border-slate-100">
            <ShieldCheck className="w-8 h-8" style={{ color: PRIMARY_COLOR }} />
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-slate-900">
            プライバシーポリシー
          </h1>
        </div>
        <div className="h-1 w-20 rounded-full" style={{ backgroundColor: PRIMARY_COLOR }}></div>
      </div>

      <section className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-8 text-slate-700 leading-relaxed">
        <p>
          当サイト「KumiFont」は、共感デザイン研究所（Kyo-kan Design Inc.）が運営しています。
          当サイトでは、利用者の利便性向上、サイト改善、広告配信のために、Cookie等の技術を使用する場合があります。
        </p>

        <div>
          <h2 className="text-xl font-black text-slate-900 mb-3">広告配信について</h2>
          <p>
            当サイトでは、第三者配信の広告サービス「Google AdSense」を利用する場合があります。
            Googleを含む第三者配信事業者は、Cookieを使用して、利用者が当サイトや他のサイトに過去にアクセスした情報に基づいて広告を配信することがあります。
          </p>
          <p className="mt-3">
            Googleによる広告Cookieの使用により、利用者に適した広告が表示されます。
            利用者は、Googleの広告設定ページでパーソナライズ広告を無効にできます。
          </p>
          <p className="mt-3">
            詳細については、
            <a
              href="https://policies.google.com/technologies/ads?hl=ja"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold hover:underline"
              style={{ color: PRIMARY_COLOR }}
            >
              Googleの広告に関するポリシー
            </a>
            をご確認ください。
          </p>
        </div>

        <div>
          <h2 className="text-xl font-black text-slate-900 mb-3">アクセス解析について</h2>
          <p>
            当サイトでは、サイトの利用状況を把握し、コンテンツ改善に役立てるためにGoogle Analyticsを使用しています。
            Google AnalyticsはCookieを使用して匿名のトラフィックデータを収集します。
            収集される情報によって個人を特定するものではありません。
          </p>
        </div>

        <div>
          <h2 className="text-xl font-black text-slate-900 mb-3">Cookieについて</h2>
          <p>
            Cookieとは、利用者のブラウザに保存される小さな情報ファイルです。
            利用者はブラウザの設定によりCookieを無効にできます。
            ただし、Cookieを無効にした場合、当サイトの一部機能が正しく動作しない場合があります。
          </p>
        </div>

        <div>
          <h2 className="text-xl font-black text-slate-900 mb-3">個人情報の取り扱いについて</h2>
          <p>
            当サイトでは、お問い合わせ等を通じて取得した個人情報を、回答や連絡のために必要な範囲で利用します。
            法令に基づく場合を除き、本人の同意なく第三者に提供することはありません。
          </p>
        </div>

        <div>
          <h2 className="text-xl font-black text-slate-900 mb-3">お問い合わせ</h2>
          <p>
            本ポリシーに関するお問い合わせは、共感デザイン研究所の公式サイトよりご連絡ください。
          </p>
          <p className="mt-3">
            <a
              href="https://kyo-kan-design.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold hover:underline"
              style={{ color: PRIMARY_COLOR }}
            >
              共感デザイン研究所 公式サイト
            </a>
          </p>
        </div>

        <div className="border-t border-slate-100 pt-6 text-sm text-slate-500">
          <p>制定日: 2026年5月20日</p>
          <p>最終更新日: 2026年5月20日</p>
        </div>
      </section>
    </div>
  );
}