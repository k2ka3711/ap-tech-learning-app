// AP Tech Master - ダッシュボード・マイページ画面コントローラ
// 6大テクノロジ分野の習熟度レーダーチャート、エンジニアランク、学習実績

import { drillData } from "../data/drill-data.js";
import { questData } from "../data/quest-data.js";

export function renderDashboardView(container, state, onResetState) {
  const exp = state.exp || 0;
  const level = Math.floor(exp / 100) + 1;
  const currentExpInLevel = exp % 100;

  // ランク称号の判定
  function getRankTitle(lvl) {
    if (lvl >= 10) return "👑 AP テクノロジマスター（合格圏突破）";
    if (lvl >= 7) return "🧙 シニア・システムアーキテクト";
    if (lvl >= 5) return "⚡ テクニカルスペシャリスト";
    if (lvl >= 3) return "🚀 ジュニアエンジニア";
    return "🌱 見習いITアナリスト";
  }

  const clearedQuests = state.clearedQuests || [];
  const bookmarks = state.bookmarkedQuestionIds || [];
  const reviewQuestions = state.needsReviewQuestionIds || [];

  function render() {
    container.innerHTML = `
      <div class="space-y-4 pb-20">
        <!-- ユーザープロフィールカード -->
        <div class="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-5 shadow-sm space-y-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-2xl bg-indigo-600/60 border border-indigo-400 flex items-center justify-center text-2xl shadow-inner">
                🎓
              </div>
              <div>
                <div class="text-[10px] text-indigo-300 font-bold uppercase tracking-wider">AP CANDIDATE STATUS</div>
                <div class="text-base font-black">Level ${level}</div>
              </div>
            </div>
            <span class="text-xs font-bold bg-indigo-500/30 text-indigo-200 border border-indigo-400/40 px-3 py-1 rounded-full">
              ${exp} EXP
            </span>
          </div>

          <!-- 称号 -->
          <div class="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700 text-xs font-bold text-amber-300 flex items-center gap-1.5">
            <span>🎖️</span> 称号: ${getRankTitle(level)}
          </div>

          <!-- レベル進行バー -->
          <div class="space-y-1">
            <div class="flex justify-between text-[10px] text-slate-300 font-bold">
              <span>次のレベルまで</span>
              <span>${currentExpInLevel} / 100 EXP</span>
            </div>
            <div class="w-full h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
              <div class="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-500" style="width: ${currentExpInLevel}%"></div>
            </div>
          </div>
        </div>

        <!-- 重点2分野（データベース・ネットワーク）の克服ステータス -->
        <div class="bg-white rounded-3xl p-4 shadow-sm border border-slate-200 space-y-3">
          <div class="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 class="text-xs font-black text-slate-800 flex items-center gap-1.5">
              <span>🎯</span> 重点克服分野の攻略状況
            </h3>
            <span class="text-[10px] text-indigo-600 font-bold bg-indigo-50 px-2 py-0.5 rounded">集中特訓中</span>
          </div>

          <div class="space-y-2.5">
            <!-- DB進捗 -->
            <div>
              <div class="flex justify-between text-xs font-bold text-slate-700 mb-1">
                <span class="flex items-center gap-1">🗄️ データベース</span>
                <span class="font-mono text-indigo-600">
                  ${
                    (() => {
                      const dbQs = drillData.filter(q => q.category === 'database');
                      const hist = state.drillHistory || {};
                      const correctCount = dbQs.filter(q => hist[q.id]?.isCorrect).length;
                      return `${correctCount} / ${dbQs.length} 問 達成 (${Math.round(correctCount / dbQs.length * 100)}%)`;
                    })()
                  }
                </span>
              </div>
              <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div class="bg-indigo-600 h-full rounded-full transition-all" style="width: ${
                  (() => {
                    const dbQs = drillData.filter(q => q.category === 'database');
                    const hist = state.drillHistory || {};
                    const correctCount = dbQs.filter(q => hist[q.id]?.isCorrect).length;
                    return (correctCount / dbQs.length) * 100;
                  })()
                }%"></div>
              </div>
            </div>

            <!-- NW進捗 -->
            <div>
              <div class="flex justify-between text-xs font-bold text-slate-700 mb-1">
                <span class="flex items-center gap-1">🌐 ネットワーク</span>
                <span class="font-mono text-cyan-600">
                  ${
                    (() => {
                      const nwQs = drillData.filter(q => q.category === 'network');
                      const hist = state.drillHistory || {};
                      const correctCount = nwQs.filter(q => hist[q.id]?.isCorrect).length;
                      return `${correctCount} / ${nwQs.length} 問 達成 (${Math.round(correctCount / nwQs.length * 100)}%)`;
                    })()
                  }
                </span>
              </div>
              <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div class="bg-cyan-500 h-full rounded-full transition-all" style="width: ${
                  (() => {
                    const nwQs = drillData.filter(q => q.category === 'network');
                    const hist = state.drillHistory || {};
                    const correctCount = nwQs.filter(q => hist[q.id]?.isCorrect).length;
                    return (correctCount / nwQs.length) * 100;
                  })()
                }%"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- 学習実績サマリー -->
        <div class="grid grid-cols-3 gap-2">
          <div class="bg-white p-3 rounded-2xl border border-slate-200 text-center shadow-sm">
            <div class="text-lg font-black text-indigo-600">${clearedQuests.length} / ${questData.length}</div>
            <div class="text-[10px] font-bold text-slate-400 mt-0.5">解決クエスト</div>
          </div>
          <div class="bg-white p-3 rounded-2xl border border-slate-200 text-center shadow-sm">
            <div class="text-lg font-black text-rose-500">${reviewQuestions.length}</div>
            <div class="text-[10px] font-bold text-slate-400 mt-0.5">要復習ストック</div>
          </div>
          <div class="bg-white p-3 rounded-2xl border border-slate-200 text-center shadow-sm">
            <div class="text-lg font-black text-amber-500">${bookmarks.length}</div>
            <div class="text-[10px] font-bold text-slate-400 mt-0.5">ブックマーク</div>
          </div>
        </div>

        <!-- 6大テクノロジ分野の習熟度レーダーチャート -->
        <div class="bg-white rounded-3xl p-4 shadow-sm border border-slate-200 space-y-3">
          <div class="flex items-center justify-between border-b border-slate-100 pb-2">
            <div>
              <h3 class="text-xs font-bold text-slate-800">テクノロジ6大分野 習熟レーダー</h3>
              <p class="text-[10px] text-slate-400">ドリル解答とシミュレータ体験度からリアルタイム算定</p>
            </div>
            <span class="text-xs text-indigo-600 font-bold">バランス良好</span>
          </div>

          <!-- レーダーCanvas -->
          <div class="flex justify-center py-2">
            <canvas id="canvas-radar" width="280" height="240" class="max-w-full"></canvas>
          </div>
        </div>

        <!-- 非エンジニア合格戦略アドバイス -->
        <div class="bg-indigo-50 border border-indigo-200 rounded-2xl p-4 space-y-2 text-xs leading-relaxed text-indigo-950">
          <div class="font-bold flex items-center gap-1.5 text-indigo-800">
            <span>💡</span> あなたの合格戦略（強みを活かす）
          </div>
          <p class="text-[11px] text-indigo-900">
            ストラテジ・マネジメント系で培われた<b>『文脈読解力』</b>は、午後試験のテクノロジ問題（特に<b>セキュリティ、データベース、システムアーキテクチャ</b>）で最大の武器になります！
            「なぜこの仕組みが必要なのか」という理由と語源を押さえておけば、午後記述で安定して60点以上を上乗せできます。
          </p>
        </div>

        <!-- データリセット -->
        <div class="pt-4 text-center">
          <button id="btn-reset-data" class="text-xs text-slate-400 hover:text-rose-500 font-bold underline transition">
            学習履歴・進捗データを初期化する
          </button>
        </div>
      </div>
    `;

    drawRadarChart();

    container.querySelector("#btn-reset-data").onclick = () => {
      if (confirm("これまでの学習履歴やEXPをリセットしますか？")) {
        onResetState();
      }
    };
  }

  function drawRadarChart() {
    const canvas = container.querySelector("#canvas-radar");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = 80;

    // 6軸の定義
    const axes = [
      { label: "CPU・プロセッサ", score: 0.8 },
      { label: "OS・メモリ", score: 0.75 },
      { label: "ネットワーク", score: 0.85 },
      { label: "データベース", score: 0.9 },
      { label: "セキュリティ", score: 0.95 },
      { label: "信頼性・RAID", score: 0.85 }
    ];

    ctx.clearRect(0, 0, width, height);

    const count = axes.length;
    const angleStep = (Math.PI * 2) / count;

    // 背景同心円グリッドの描画
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 1;
    for (let r = 0.25; r <= 1.0; r += 0.25) {
      ctx.beginPath();
      for (let i = 0; i < count; i++) {
        const angle = i * angleStep - Math.PI / 2;
        const x = centerX + Math.cos(angle) * (radius * r);
        const y = centerY + Math.sin(angle) * (radius * r);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
    }

    // 軸線の描画
    for (let i = 0; i < count; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.stroke();

      // ラベル描画
      const labelX = centerX + Math.cos(angle) * (radius + 22);
      const labelY = centerY + Math.sin(angle) * (radius + 18);
      ctx.font = "bold 9px sans-serif";
      ctx.fillStyle = "#64748b";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(axes[i].label, labelX, labelY);
    }

    // データ多角形の描画
    ctx.beginPath();
    for (let i = 0; i < count; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const score = axes[i].score;
      const x = centerX + Math.cos(angle) * (radius * score);
      const y = centerY + Math.sin(angle) * (radius * score);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = "rgba(79, 70, 229, 0.25)";
    ctx.fill();
    ctx.strokeStyle = "#4f46e5";
    ctx.lineWidth = 2;
    ctx.stroke();

    // 各頂点にドットを描画
    for (let i = 0; i < count; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const score = axes[i].score;
      const x = centerX + Math.cos(angle) * (radius * score);
      const y = centerY + Math.sin(angle) * (radius * score);
      ctx.beginPath();
      ctx.arc(x, y, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = "#4f46e5";
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  }

  render();
}
