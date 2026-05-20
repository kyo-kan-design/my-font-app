import React from 'react';
import { Mail, ExternalLink } from 'lucide-react';

const PRIMARY_COLOR = '#6B8EAD';

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto w-full px-4 mb-24 space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-white shadow-sm border border-slate-100">
            <Mail className="w-8 h-8" style={{ color: PRIMARY_COLOR }} />
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-slate-900">お問い合わせ</h1>
        </div>
        <div className="h-1 w-20 rounded-full" style={{ backgroundColor: PRIMARY_COLOR }}></div>
      </div>

      <section className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-8 text-slate-700 leading-relaxed">
        <div>
          <h2 className="text-xl font-black text-slate-900 mb-3">KumiFontについて</h2>
          <p>
            KumiFontは、日本語フォントの組み合わせをブラウザ上で確認できるWebデザイン支援ツールです。
            Webサイト制作、ブランド設計、UIデザインにおける日本語タイポグラフィの検討を支援するために公開しています。
          </p>
        </div>

        <div>
          <h2 className="text-xl font-black text-slate-900 mb-3">運営者情報</h2>
          <dl className="space-y-3 text-sm">
            <div>
              <dt className="font-bold text-slate-900">サイト名</dt>
              <dd>KumiFont</dd>
            </div>
            <div>
              <dt className="font-bold text-slate-900">運営者</dt>
              <dd>共感デザイン研究所（Kyo-kan Design Inc.）</dd>
            </div>
            <div>
              <dt className="font-bold text-slate-900">運営内容</dt>
              <dd>日本語フォント、Webタイポグラフィ、Webデザインに関するツールおよび情報コンテンツの提供</dd>
            </div>
            <div>
              <dt className="font-bold text-slate-900">サイトURL</dt>
              <dd>
                <a
                  href="https://www.kumifont.com/"
                  className="font-bold hover:underline"
                  style={{ color: PRIMARY_COLOR }}
                >
                  https://www.kumifont.com/
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <div>
          <h2 className="text-xl font-black text-slate-900 mb-3">お問い合わせ先</h2>
          <p>
            KumiFontに関するご意見、ご質問、取材のご相談、掲載内容に関するお問い合わせは、
            共感デザイン研究所の公式サイトよりご連絡ください。
          </p>

          <a
            href="https://kyo-kan-design.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-sm font-bold hover:underline"
            style={{ color: PRIMARY_COLOR }}
          >
            共感デザイン研究所 公式サイトへ
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        <div>
          <h2 className="text-xl font-black text-slate-900 mb-3">免責事項</h2>
          <p>
            当サイトに掲載している情報は、可能な限り正確な内容を提供するよう努めていますが、
            情報の完全性、正確性、最新性を保証するものではありません。
            掲載内容や外部リンク先の利用によって生じた損害等について、当サイトは責任を負いかねます。
          </p>
        </div>
      </section>
    </div>
  );
}