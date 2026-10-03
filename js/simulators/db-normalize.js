// AP Tech Master - DB正規化ステップパズル（第1〜第3正規化）
// 「なぜテーブルを分けるのか？」「分けないとどんな更新異状が起きるのか？」を体感

export function renderDbNormalizeSimulator(container) {
  let stage = 0; // 0: 非正規形, 1: 第1正規形, 2: 第2正規形, 3: 第3正規形完成！
  let anomalyTriggered = false;

  const stages = [
    {
      title: "【初期状態】非正規形テーブル",
      badge: "未正規化",
      badgeClass: "bg-rose-100 text-rose-800",
      desc: "1つの伝票の中に複数の商品（繰り返し項目）が含まれており、関係データベースに格納できません。",
      problem: "1行の中に複数の商品が入っているため、SQLで集計や検索ができません！"
    },
    {
      title: "【第1正規形】繰り返し項目の排除",
      badge: "第1正規形",
      badgeClass: "bg-amber-100 text-amber-800",
      desc: "すべてのマス目を単一値（アトミック）に展開し、主キーを【注文番号 ＋ 商品コード】の複合主キーに設定しました。",
      problem: "【部分関数従属の罠】主キーの一部（商品コード）だけで『商品名』が決まってしまうため、データの重複が酷いです！"
    },
    {
      title: "【第2正規形】部分関数従属の排除",
      badge: "第2正規形",
      badgeClass: "bg-blue-100 text-blue-800",
      desc: "商品コードに従属する【商品テーブル】を別テーブルに切り離しました。残りは完全関数従属のみです。",
      problem: "【推移的関数従属の罠】主キー以外の項目（社員番号 ➔ 部署コード ➔ 部署名）という数珠つなぎの依存が残っています！"
    },
    {
      title: "【第3正規形】推移的関数従属の排除（完成！）",
      badge: "第3正規形（完了）",
      badgeClass: "bg-emerald-100 text-emerald-800",
      desc: "部署情報を【部署テーブル】として完全に独立させました。すべての非キー属性が主キーにのみ直結する美しい構造です！",
      problem: "🎉 完璧です！重複がゼロになり、更新時異状・挿入異状・削除異状が根絶されました。"
    }
  ];

  function updateView() {
    const cur = stages[stage];

    container.innerHTML = `
      <div class="space-y-4">
        <!-- 語源・意義バナー -->
        <div class="bg-indigo-50 border border-indigo-200 rounded-xl p-3 text-xs leading-relaxed text-indigo-900">
          <div class="font-bold flex items-center gap-1.5 text-indigo-700 mb-1">
            <span class="text-base">💡</span> 正規化の真の目的（午後の記述で問われる！）
          </div>
          「データの重複を排除し、<b>追加・更新・削除に伴う不整合や異状（更新時異状）を防止する</b>こと」。<br>
          綺麗に分けることで、社員が0人の部署でも登録でき（挿入異状防止）、部署名を変えても1箇所直すだけで済みます！
        </div>

        <!-- ステージ進捗インジケータ -->
        <div class="bg-white rounded-xl p-4 shadow-sm border border-slate-200 space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-slate-800">${cur.title}</span>
            <span class="text-xs font-bold px-2.5 py-0.5 rounded-full ${cur.badgeClass}">${cur.badge}</span>
          </div>

          <div class="flex items-center gap-1">
            ${[0, 1, 2, 3]
              .map(
                (s) => `
              <div class="flex-1 h-1.5 rounded-full transition-all ${
                s <= stage ? "bg-indigo-600" : "bg-slate-200"
              }"></div>
            `
              )
              .join("")}
          </div>

          <div class="text-[11px] text-slate-600 leading-relaxed">
            ${cur.desc}
          </div>
        </div>

        <!-- テーブル表示エリア -->
        <div class="bg-white rounded-xl p-3 shadow-sm border border-slate-200 overflow-x-auto space-y-3">
          ${getTableRenderHtml(stage, anomalyTriggered)}
        </div>

        <!-- 課題とアクション -->
        <div class="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-2 text-xs">
          <div class="font-bold text-slate-800 flex items-center gap-1.5">
            <span>⚠️ 現在の問題点と次のステップ:</span>
          </div>
          <div class="text-slate-700 leading-relaxed text-[11px]">
            ${cur.problem}
          </div>

          <!-- アクションボタン -->
          <div class="pt-2 flex items-center justify-between">
            ${
              stage === 1
                ? `<button id="btn-trigger-anomaly" class="px-3 py-1.5 ${
                    anomalyTriggered ? "bg-slate-200 text-slate-600" : "bg-rose-600 text-white animate-pulse"
                  } rounded-lg text-xs font-bold">
                    💥 更新時異状を起こしてみる
                  </button>`
                : "<div></div>"
            }
            <div class="flex gap-2">
              ${
                stage > 0
                  ? `<button id="btn-prev-norm" class="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 text-xs font-bold">
                      ◀ 戻る
                    </button>`
                  : ""
              }
              ${
                stage < 3
                  ? `<button id="btn-next-norm" class="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold">
                      次の正規化へ進む ▶
                    </button>`
                  : `<button id="btn-reset-norm" class="px-3 py-1.5 bg-slate-800 text-white rounded-lg text-xs font-bold">
                      最初からやり直す
                    </button>`
              }
            </div>
          </div>
        </div>
      </div>
    `;

    // イベントバインド
    const btnNext = container.querySelector("#btn-next-norm");
    if (btnNext) {
      btnNext.onclick = () => {
        stage++;
        anomalyTriggered = false;
        updateView();
      };
    }
    const btnPrev = container.querySelector("#btn-prev-norm");
    if (btnPrev) {
      btnPrev.onclick = () => {
        stage--;
        anomalyTriggered = false;
        updateView();
      };
    }
    const btnReset = container.querySelector("#btn-reset-norm");
    if (btnReset) {
      btnReset.onclick = () => {
        stage = 0;
        anomalyTriggered = false;
        updateView();
      };
    }
    const btnAnomaly = container.querySelector("#btn-trigger-anomaly");
    if (btnAnomaly) {
      btnAnomaly.onclick = () => {
        anomalyTriggered = !anomalyTriggered;
        updateView();
      };
    }
  }

  function getTableRenderHtml(s, anomaly) {
    if (s === 0) {
      // 非正規形
      return `
        <div class="text-[10px] font-bold text-slate-400 mb-1">非正規伝票データ（繰り返し配列を含む）</div>
        <table class="w-full text-left text-[11px] border border-slate-200 rounded-lg overflow-hidden">
          <thead class="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
            <tr>
              <th class="p-1.5">注文番号</th>
              <th class="p-1.5">商品（配列）</th>
              <th class="p-1.5">担当社員</th>
              <th class="p-1.5">部署名</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr>
              <td class="p-1.5 font-mono font-bold">1001</td>
              <td class="p-1.5 bg-amber-50 text-amber-800">[ノートPC (¥120,000), マウス (¥3,000)]</td>
              <td class="p-1.5">佐藤 (E01)</td>
              <td class="p-1.5">第一営業部</td>
            </tr>
            <tr>
              <td class="p-1.5 font-mono font-bold">1002</td>
              <td class="p-1.5 bg-amber-50 text-amber-800">[キーボード (¥8,000), マウス (¥3,000)]</td>
              <td class="p-1.5">田中 (E02)</td>
              <td class="p-1.5">システム開発部</td>
            </tr>
          </tbody>
        </table>
      `;
    } else if (s === 1) {
      // 第1正規形
      return `
        <div class="text-[10px] font-bold text-slate-400 mb-1">【第1正規形】平坦化（主キー: 注文番号 ＋ 商品コード）</div>
        <table class="w-full text-left text-[10px] border border-slate-200 rounded-lg overflow-hidden font-mono">
          <thead class="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
            <tr>
              <th class="p-1.5 underline decoration-indigo-500">注文番号*</th>
              <th class="p-1.5 underline decoration-indigo-500">商品CD*</th>
              <th class="p-1.5">商品名</th>
              <th class="p-1.5">単価</th>
              <th class="p-1.5">社員番号</th>
              <th class="p-1.5">部署名</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 text-[10px]">
            <tr>
              <td class="p-1.5 font-bold">1001</td>
              <td class="p-1.5 font-bold">P01</td>
              <td class="p-1.5 ${anomaly ? "bg-rose-100 text-rose-700 font-bold" : ""}">ノートPC</td>
              <td class="p-1.5">¥120,000</td>
              <td class="p-1.5">E01</td>
              <td class="p-1.5">第一営業部</td>
            </tr>
            <tr>
              <td class="p-1.5 font-bold">1001</td>
              <td class="p-1.5 font-bold">P02</td>
              <td class="p-1.5 ${anomaly ? "bg-amber-100 text-amber-700 font-bold" : ""}">マウスPro (改名)</td>
              <td class="p-1.5">¥3,500</td>
              <td class="p-1.5">E01</td>
              <td class="p-1.5">第一営業部</td>
            </tr>
            <tr>
              <td class="p-1.5 font-bold">1002</td>
              <td class="p-1.5 font-bold">P02</td>
              <td class="p-1.5 ${anomaly ? "bg-rose-200 text-rose-800 font-bold ring-2 ring-rose-500" : ""}">
                ${anomaly ? "マウス (未更新のまま矛盾！)" : "マウス"}
              </td>
              <td class="p-1.5">¥3,000</td>
              <td class="p-1.5">E02</td>
              <td class="p-1.5">システム開発部</td>
            </tr>
          </tbody>
        </table>
        ${
          anomaly
            ? `<div class="p-2 bg-rose-50 border border-rose-200 rounded text-rose-800 text-[10px] leading-tight">
                ⚠️ <b>更新時異状発生！</b> P02の商品名を「マウスPro」に変更した際、1001行だけ更新して1002行を更新し忘れたため、同じ商品なのに名前と単価が食い違うデータ破壊（不整合）が起きました！
               </div>`
            : ""
        }
      `;
    } else if (s === 2) {
      // 第2正規形
      return `
        <div class="space-y-2">
          <div>
            <div class="text-[10px] font-bold text-slate-400 mb-1">【注文明細テーブル】（部分関数従属を切り離した後）</div>
            <table class="w-full text-left text-[10px] border border-slate-200 rounded font-mono">
              <thead class="bg-slate-100 text-slate-600 font-bold">
                <tr><th class="p-1">注文番号*</th><th class="p-1">商品CD*</th><th class="p-1">数量</th><th class="p-1">社員番号</th><th class="p-1">部署名</th></tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                <tr><td class="p-1 font-bold">1001</td><td class="p-1 font-bold">P01</td><td class="p-1">1</td><td class="p-1">E01</td><td class="p-1">第一営業部</td></tr>
                <tr><td class="p-1 font-bold">1001</td><td class="p-1 font-bold">P02</td><td class="p-1">1</td><td class="p-1">E01</td><td class="p-1">第一営業部</td></tr>
              </tbody>
            </table>
          </div>
          <div>
            <div class="text-[10px] font-bold text-indigo-600 mb-1">【商品テーブル（独立！）】</div>
            <table class="w-full text-left text-[10px] border border-indigo-200 rounded font-mono bg-indigo-50/30">
              <thead class="bg-indigo-50 text-indigo-700 font-bold">
                <tr><th class="p-1">商品CD*</th><th class="p-1">商品名</th><th class="p-1">単価</th></tr>
              </thead>
              <tbody class="divide-y divide-indigo-100">
                <tr><td class="p-1 font-bold">P01</td><td class="p-1">ノートPC</td><td class="p-1">¥120,000</td></tr>
                <tr><td class="p-1 font-bold">P02</td><td class="p-1">マウス</td><td class="p-1">¥3,000</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      `;
    } else {
      // 第3正規形
      return `
        <div class="space-y-2">
          <div class="grid grid-cols-2 gap-2">
            <div>
              <div class="text-[9px] font-bold text-slate-500 mb-0.5">① 注文明細テーブル</div>
              <table class="w-full text-[9px] border border-slate-200 rounded font-mono">
                <thead class="bg-slate-100 text-slate-600 font-bold">
                  <tr><th class="p-1">注文No*</th><th class="p-1">商品CD*</th><th class="p-1">社員CD</th></tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                  <tr><td class="p-1 font-bold">1001</td><td class="p-1">P01</td><td class="p-1">E01</td></tr>
                  <tr><td class="p-1 font-bold">1001</td><td class="p-1">P02</td><td class="p-1">E01</td></tr>
                </tbody>
              </table>
            </div>
            <div>
              <div class="text-[9px] font-bold text-indigo-600 mb-0.5">② 商品テーブル</div>
              <table class="w-full text-[9px] border border-indigo-200 rounded font-mono bg-indigo-50/20">
                <thead class="bg-indigo-50 text-indigo-700 font-bold">
                  <tr><th class="p-1">商品CD*</th><th class="p-1">商品名</th></tr>
                </thead>
                <tbody class="divide-y divide-indigo-100">
                  <tr><td class="p-1 font-bold">P01</td><td class="p-1">ノートPC</td></tr>
                  <tr><td class="p-1 font-bold">P02</td><td class="p-1">マウス</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-2">
            <div>
              <div class="text-[9px] font-bold text-emerald-600 mb-0.5">③ 社員テーブル</div>
              <table class="w-full text-[9px] border border-emerald-200 rounded font-mono bg-emerald-50/20">
                <thead class="bg-emerald-50 text-emerald-700 font-bold">
                  <tr><th class="p-1">社員CD*</th><th class="p-1">氏名</th><th class="p-1">部署CD</th></tr>
                </thead>
                <tbody class="divide-y divide-emerald-100">
                  <tr><td class="p-1 font-bold">E01</td><td class="p-1">佐藤</td><td class="p-1">D01</td></tr>
                  <tr><td class="p-1 font-bold">E02</td><td class="p-1">田中</td><td class="p-1">D02</td></tr>
                </tbody>
              </table>
            </div>
            <div>
              <div class="text-[9px] font-bold text-amber-600 mb-0.5">④ 部署テーブル（独立！）</div>
              <table class="w-full text-[9px] border border-amber-200 rounded font-mono bg-amber-50/20">
                <thead class="bg-amber-50 text-amber-700 font-bold">
                  <tr><th class="p-1">部署CD*</th><th class="p-1">部署名</th></tr>
                </thead>
                <tbody class="divide-y divide-amber-100">
                  <tr><td class="p-1 font-bold">D01</td><td class="p-1">第一営業部</td></tr>
                  <tr><td class="p-1 font-bold">D02</td><td class="p-1">システム開発部</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      `;
    }
  }

  updateView();
}
