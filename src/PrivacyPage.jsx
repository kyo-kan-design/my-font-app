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
          <h1 className="text-4xl font-black tracking-tighter text-slate-900">プライバシーポリシー</h1>
        </div>
        <div className="h-1 w-20 rounded-full" style={{ backgroundColor: PRIMARY_COLOR }}></div>
      </div>

      <section className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6 text-slate-700 leading-relaxed">
        <p>当サイトは、共感デザイン研究所（Kyo-kan Design Inc.）が運営しています。</p>
        <div>
          <h2 className="text-xl font-black text-slate-900 mb-3">広告配信について</h2>
          <p>
            当サイトでは、第三者配信の広告サービス（Google AdSense）を利用する場合があります。広告配信事業者は、ユーザーの興味に応じた広告を表示するためにCookieを使用することがあります。
          </p>
        </div>
        <div>
          <h2 className="text-xl font-black text-slate-900 mb-3">アクセス解析について</h2>
          <p>
            当サイトでは、サイト改善のためGoogle Analyticsを使用しています。収集されるデータは匿名であり、個人を特定するものではありません。
          </p>
        </div>
      </section>
    </div>
  );
}
