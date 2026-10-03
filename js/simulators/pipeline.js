// AP Tech Master - パイプライン＆ハザード・フォワーディング シミュレータ
// 非エンジニア向け「ハンバーガー工場の分業」アナロジーと、CPU内部の5段パイプラインの動作を視覚化

export function renderPipelineSimulator(container) {
  let clock = 1;
  let forwardingEnabled = false;
  let isPlaying = false;
  let playInterval = null;

  // 命令セット（RAW: Read After Write ハザードの例）
  // 命令1: ADD R1, R2, R3 (R1に結果を書き込む。WB完了は第5クロック)
  // 命令2: SUB R4, R1, R5 (R1を読み取って計算したい。フォワーディング無しだとR1のWBを待たねばならない)
  // 命令3: AND R6, R7, R8
  // 命令4: OR  R9, R10, R11

  const STAGES = ["IF (命令読出)", "ID (命令解読)", "EX (実行・演算)", "MEM (メモリアクセス)", "WB (書込み)"];
  const STAGE_SHORT = ["IF", "ID", "EX", "MEM", "WB"];

  function getPipelineGrid(maxClock, hasForwarding) {
    // タイムチャートの生成
    // 返り値: instructionsごとの各クロックのステージ配列
    if (hasForwarding) {
      // フォワーディングあり:
      // Inst 1: IF(1), ID(2), EX(3), MEM(4), WB(5)
      // Inst 2:   - , IF(2), ID(3), EX(4: forwarding受け取り), MEM(5), WB(6)
      // Inst 3:   - ,   - , IF(3), ID(4), EX(5), MEM(6), WB(7)
      // Inst 4:   - ,   - ,   - , IF(4), ID(5), EX(6), MEM(7), WB(8)
      return [
        { name: "① ADD R1, R2, R3", stages: ["IF", "ID", "EX", "MEM", "WB", "", "", ""] },
        { name: "② SUB R4, R1, R5 (R1依存)", stages: ["", "IF", "ID", "EX⚡", "MEM", "WB", "", ""] },
        { name: "③ AND R6, R7, R8", stages: ["", "", "IF", "ID", "EX", "MEM", "WB", ""] },
        { name: "④ OR  R9, R10, R11", stages: ["", "", "", "IF", "ID", "EX", "MEM", "WB"] }
      ];
    } else {
      // フォワーディングなし (2サイクルのストール/バブル発生):
      // Inst 1: IF(1), ID(2), EX(3), MEM(4), WB(5)
      // Inst 2:   - , IF(2), ID(3), [STALL], [STALL], EX(6: WB完了後), MEM(7), WB(8)
      // Inst 3:   - ,   - , IF(3), [STALL], [STALL], ID(6), EX(7), MEM(8), WB(9)
      return [
        { name: "① ADD R1, R2, R3", stages: ["IF", "ID", "EX", "MEM", "WB", "", "", "", ""] },
        { name: "② SUB R4, R1, R5 (R1依存)", stages: ["", "IF", "ID", "🛑", "🛑", "EX", "MEM", "WB", ""] },
        { name: "③ AND R6, R7, R8", stages: ["", "", "IF", "🛑", "🛑", "ID", "EX", "MEM", "WB"] }
      ];
    }
  }

  function updateView() {
    const gridData = getPipelineGrid(8, forwardingEnabled);
    const maxClocks = forwardingEnabled ? 8 : 9;

    container.innerHTML = `
      <div class="space-y-4">
        <!-- 説明バナー -->
        <div class="bg-indigo-50 border border-indigo-200 rounded-xl p-3 text-xs leading-relaxed text-indigo-900">
          <div class="font-bold flex items-center gap-1.5 text-indigo-700 mb-1">
            <span class="text-base">💡</span> 非エンジニアのための直感アナロジー（分業の力）
          </div>
          ハンバーガー店で1人が「バンズ焼き→パティ焼き→具材挟み→包装→会計」を全部やると次の客を待たせます。5人で分業（パイプライン）すれば、毎クロック1個ずつ完成品が出ます！<br>
          しかし「前の人がパティを焼き終えないと挟めない！」という依存が起きるのが**データハザード**です。
        </div>

        <!-- コントロールパネル -->
        <div class="bg-white rounded-xl p-4 shadow-sm border border-slate-200 space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-slate-700">フォワーディング（短絡バイパス）:</span>
            <button id="btn-toggle-forwarding" class="px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              forwardingEnabled ? "bg-emerald-600 text-white shadow-sm" : "bg-slate-200 text-slate-700"
            }">
              <span>${forwardingEnabled ? "⚡ ON (バイパス有効)" : "🛑 OFF (ストール発生)"}</span>
            </button>
          </div>

          <div class="flex items-center justify-between pt-2 border-t border-slate-100">
            <div class="flex items-center gap-2">
              <span class="text-xs text-slate-500">現在クロック:</span>
              <span class="text-sm font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                Clock ${clock} / ${maxClocks}
              </span>
            </div>
            <div class="flex items-center gap-1.5">
              <button id="btn-prev-clk" class="p-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 text-xs font-bold px-2.5">
                ◀ 戻る
              </button>
              <button id="btn-next-clk" class="p-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold px-3">
                進む ▶
              </button>
              <button id="btn-reset-clk" class="p-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-600 text-xs">
                ↺
              </button>
            </div>
          </div>
        </div>

        <!-- パイプラインタイムチャート -->
        <div class="bg-white rounded-xl p-3 shadow-sm border border-slate-200 overflow-x-auto">
          <div class="text-xs font-bold text-slate-700 mb-2 flex items-center justify-between">
            <span>パイプライン進行チャート</span>
            <span class="text-[10px] text-slate-400">横軸: 時間(Clock) / 縦軸: 命令</span>
          </div>

          <div class="min-w-[340px]">
            <!-- クロックヘッダー -->
            <div class="grid grid-cols-10 gap-1 text-[11px] font-bold text-center text-slate-500 pb-1 border-b border-slate-200">
              <div class="col-span-3 text-left pl-1">命令</div>
              ${Array.from({ length: 7 }, (_, i) => {
                const c = i + 1;
                const isCurrent = c === clock;
                return `<div class="${isCurrent ? "bg-indigo-600 text-white rounded font-black shadow-sm" : ""} p-0.5">C${c}</div>`;
              }).join("")}
            </div>

            <!-- 命令行 -->
            <div class="space-y-1.5 pt-2">
              ${gridData
                .map((row, rIdx) => {
                  return `
                    <div class="grid grid-cols-10 gap-1 items-center text-[11px]">
                      <div class="col-span-3 font-mono text-[10px] truncate text-slate-700 pr-1" title="${row.name}">
                        ${row.name}
                      </div>
                      ${Array.from({ length: 7 }, (_, cIdx) => {
                        const stage = row.stages[cIdx] || "";
                        const isCurrentCol = cIdx + 1 === clock;
                        let bg = "bg-slate-50 text-slate-300";
                        if (stage.includes("⚡")) {
                          bg = "bg-amber-400 text-slate-900 font-bold border border-amber-500 animate-pulse";
                        } else if (stage.includes("🛑")) {
                          bg = "bg-rose-100 text-rose-700 font-bold border border-rose-300";
                        } else if (stage) {
                          bg = "bg-indigo-100 text-indigo-800 font-semibold border border-indigo-200";
                        }
                        if (isCurrentCol && stage) {
                          bg += " ring-2 ring-indigo-500";
                        }
                        return `
                          <div class="h-7 rounded flex items-center justify-center ${bg} text-[10px] transition-all">
                            ${stage}
                          </div>
                        `;
                      }).join("")}
                    </div>
                  `;
                })
                .join("")}
            </div>
          </div>
        </div>

        <!-- 状態の深掘り解説 -->
        <div class="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs space-y-2">
          <div class="font-bold text-slate-800 flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full ${forwardingEnabled ? "bg-emerald-500" : "bg-rose-500"}"></span>
            <span>Clock ${clock} の動作解説</span>
          </div>
          <div class="text-slate-600 leading-relaxed text-[11px]">
            ${getClockExplanation(clock, forwardingEnabled)}
          </div>
        </div>
      </div>
    `;

    // イベントリスナー
    container.querySelector("#btn-toggle-forwarding").onclick = () => {
      forwardingEnabled = !forwardingEnabled;
      updateView();
    };
    container.querySelector("#btn-next-clk").onclick = () => {
      if (clock < maxClocks) {
        clock++;
        updateView();
      }
    };
    container.querySelector("#btn-prev-clk").onclick = () => {
      if (clock > 1) {
        clock--;
        updateView();
      }
    };
    container.querySelector("#btn-reset-clk").onclick = () => {
      clock = 1;
      updateView();
    };
  }

  function getClockExplanation(c, fwd) {
    if (fwd) {
      if (c === 1) return "命令①が読み出されます（IF）。パイプラインの第1歩です。";
      if (c === 2) return "命令①が解読（ID）され、同時に命令②が読み出されます（IF）。";
      if (c === 3) return "命令①がALUで加算演算（EX）を実行します。この演算完了直後に R1 の最新値が確定します！";
      if (c === 4) return "【⚡フォワーディング発動】命令②がEXステージで R1 を必要とします。本来なら命令①の書き込み（WB）完了を待つ必要がありますが、EX出力から直接バイパス回路で命令②へR1の値をワープ転送したため、**ストールなし**で直ちに計算を開始できました！";
      if (c === 5) return "命令①がWB完了し、命令②はMEM、命令③がEXへ。淀みなく全命令が前進します。";
      return "パイプラインがフル稼働し、毎クロック1命令が次々と完了します。これがRISCプロセッサの高速性の秘密です！";
    } else {
      if (c <= 3) return "命令①が順調に進みますが、命令②は解読（ID）で『R1の値が必要』だと気づきます。しかし命令①の書き込み（WB）はまだ先です。";
      if (c === 4 || c === 5) return "【🛑 ストール（バブル挿入）】命令①が主記憶アクセス（MEM）やレジスタ書き込み（WB）を終えるまで、命令②は次のEXに進めず『待ちぼうけ』状態になります。パイプラインに空洞（無駄なクロック）が生じています。";
      if (c === 6) return "命令①がWBを完了したことでようやくR1が確定し、命令②が遅れてEXステージへ進みます。合計2クロックのロスが発生しました。";
      return "命令の依存関係によって生じた2クロックの遅延。これをハードウェア回路の工夫でゼロにするのがフォワーディングです。";
    }
  }

  updateView();
}
