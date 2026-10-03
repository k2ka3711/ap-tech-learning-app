// AP Tech Master - 仮想記憶 LRU / FIFO ページ置換シミュレータ
// 「なぜLRUが一番賢いのか？」「FIFOだとどういう無駄が起きるのか？」を目撃する

export function renderMemoryPageSimulator(container) {
  let frameCount = 3;
  let algorithm = "LRU"; // 'LRU' or 'FIFO'
  const referenceSequence = [1, 2, 3, 2, 4, 1, 5, 2, 3, 4];
  let stepIndex = 0; // 0 to referenceSequence.length

  // シミュレーション状態の履歴計算
  function calculateHistory() {
    const history = [];
    let frames = []; // 現在のフレーム内容 (LRUの場合は末尾が最も古い、FIFOの場合はキュー順)
    let fifoQueue = []; // FIFO用の投入順
    let faults = 0;
    let hits = 0;

    for (let i = 0; i < referenceSequence.length; i++) {
      const page = referenceSequence[i];
      let isHit = false;
      let evicted = null;

      if (algorithm === "LRU") {
        const foundIdx = frames.indexOf(page);
        if (foundIdx !== -1) {
          // ヒット: 見つかったページを「最も最近使われた」先頭に移動
          isHit = true;
          hits++;
          frames.splice(foundIdx, 1);
          frames.unshift(page);
        } else {
          // ページフォールト
          faults++;
          if (frames.length >= frameCount) {
            // 最も使われていない（末尾）を追い出す
            evicted = frames.pop();
          }
          frames.unshift(page);
        }
      } else {
        // FIFO
        const found = frames.includes(page);
        if (found) {
          isHit = true;
          hits++;
        } else {
          faults++;
          if (frames.length >= frameCount) {
            evicted = fifoQueue.shift();
            frames = frames.filter(p => p !== evicted);
          }
          frames.push(page);
          fifoQueue.push(page);
        }
      }

      history.push({
        page,
        frames: [...frames],
        isHit,
        evicted,
        faults,
        hits
      });
    }

    return history;
  }

  function updateView() {
    const history = calculateHistory();
    const current = stepIndex > 0 ? history[stepIndex - 1] : null;
    const currentFaults = current ? current.faults : 0;
    const currentHits = current ? current.hits : 0;

    container.innerHTML = `
      <div class="space-y-4">
        <!-- 語源バナー -->
        <div class="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs leading-relaxed text-amber-900">
          <div class="font-bold flex items-center gap-1.5 text-amber-700 mb-1">
            <span class="text-base">🔤</span> 語源から本質を直感する
          </div>
          ・<b class="text-indigo-700">LRU</b>: <u>L</u>east <u>R</u>ecently <u>U</u>sed（最も最近使われていないものから捨てる）<br>
          ・<b class="text-indigo-700">FIFO</b>: <u>F</u>irst-<u>I</u>n <u>F</u>irst-<u>O</u>ut（最初に入れたものから順に捨てる）<br>
          人の頭と同じで「直近で読んだ本は机の上に残す（LRU）」のが一番効率的です！
        </div>

        <!-- コントロールバー -->
        <div class="bg-white rounded-xl p-4 shadow-sm border border-slate-200 space-y-3">
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="text-[11px] font-bold text-slate-500 block mb-1">アルゴリズム:</label>
              <div class="flex rounded-lg bg-slate-100 p-0.5 border border-slate-200">
                <button id="btn-algo-lru" class="flex-1 py-1 text-xs font-bold rounded-md transition ${
                  algorithm === "LRU" ? "bg-white text-indigo-700 shadow-sm" : "text-slate-600"
                }">LRU (最長未使用)</button>
                <button id="btn-algo-fifo" class="flex-1 py-1 text-xs font-bold rounded-md transition ${
                  algorithm === "FIFO" ? "bg-white text-indigo-700 shadow-sm" : "text-slate-600"
                }">FIFO (先入れ先出し)</button>
              </div>
            </div>

            <div>
              <label class="text-[11px] font-bold text-slate-500 block mb-1">主記憶フレーム枠数:</label>
              <div class="flex rounded-lg bg-slate-100 p-0.5 border border-slate-200">
                <button id="btn-frame-3" class="flex-1 py-1 text-xs font-bold rounded-md transition ${
                  frameCount === 3 ? "bg-white text-indigo-700 shadow-sm" : "text-slate-600"
                }">3 枠</button>
                <button id="btn-frame-4" class="flex-1 py-1 text-xs font-bold rounded-md transition ${
                  frameCount === 4 ? "bg-white text-indigo-700 shadow-sm" : "text-slate-600"
                }">4 枠</button>
              </div>
            </div>
          </div>

          <!-- ステップ操作ボタン -->
          <div class="flex items-center justify-between pt-2 border-t border-slate-100">
            <div class="flex items-center gap-1.5">
              <span class="text-xs text-slate-500">進捗:</span>
              <span class="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                ${stepIndex} / ${referenceSequence.length} ステップ
              </span>
            </div>
            <div class="flex items-center gap-1.5">
              <button id="btn-prev-step" class="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 text-xs font-bold">
                ◀ 前へ
              </button>
              <button id="btn-next-step" class="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold">
                次へ ▶
              </button>
              <button id="btn-reset-step" class="p-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-600 text-xs">
                ↺
              </button>
            </div>
          </div>
        </div>

        <!-- 参照列ストリップ表示 -->
        <div class="bg-white rounded-xl p-3 shadow-sm border border-slate-200">
          <div class="text-[11px] font-bold text-slate-500 mb-2">ページ参照列（アクセス要求順）</div>
          <div class="flex items-center gap-1.5 overflow-x-auto pb-1">
            ${referenceSequence
              .map((p, idx) => {
                const isCurrent = idx === stepIndex - 1;
                const isPast = idx < stepIndex - 1;
                const itemHistory = history[idx];
                let badgeClass = "bg-slate-100 text-slate-600 border-slate-200";
                if (isCurrent) {
                  badgeClass = itemHistory.isHit
                    ? "bg-emerald-500 text-white border-emerald-600 ring-2 ring-emerald-300 scale-110"
                    : "bg-rose-500 text-white border-rose-600 ring-2 ring-rose-300 scale-110";
                } else if (isPast) {
                  badgeClass = itemHistory.isHit
                    ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                    : "bg-rose-50 text-rose-700 border-rose-300";
                }
                return `
                  <div class="flex-shrink-0 w-8 h-8 rounded-lg border flex flex-col items-center justify-center font-bold text-xs ${badgeClass} transition-transform">
                    <span>${p}</span>
                  </div>
                `;
              })
              .join("")}
          </div>
        </div>

        <!-- メインフレーム枠アニメーション表示 -->
        <div class="bg-white rounded-xl p-4 shadow-sm border border-slate-200 space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-slate-700">主記憶（RAM）の物理フレーム枠</span>
            <div class="flex items-center gap-3 text-xs">
              <span class="text-emerald-600 font-bold">🎯 ヒット: ${currentHits}</span>
              <span class="text-rose-600 font-bold">💥 ページフォールト: ${currentFaults}</span>
            </div>
          </div>

          <!-- 枠のビジュアル -->
          <div class="grid grid-cols-${frameCount} gap-2 py-2">
            ${Array.from({ length: frameCount }, (_, i) => {
              const currentFrames = current ? current.frames : [];
              const pageVal = currentFrames[i] !== undefined ? currentFrames[i] : null;
              const isNewlyAdded = current && !current.isHit && pageVal === current.page;
              return `
                <div class="h-20 rounded-xl border-2 ${
                  pageVal !== null
                    ? isNewlyAdded
                      ? "border-indigo-500 bg-indigo-50 shadow-md ring-2 ring-indigo-300"
                      : "border-slate-300 bg-slate-50"
                    : "border-dashed border-slate-200 bg-slate-50/50"
                } flex flex-col items-center justify-center transition-all">
                  <div class="text-[10px] text-slate-400 font-bold">枠 ${i + 1}</div>
                  <div class="text-2xl font-black ${pageVal !== null ? "text-indigo-700" : "text-slate-300"}">
                    ${pageVal !== null ? `P${pageVal}` : "空き"}
                  </div>
                  ${
                    algorithm === "LRU" && pageVal !== null
                      ? `<div class="text-[9px] text-slate-400">${i === 0 ? "直近使用" : i === frameCount - 1 ? "最古(次追放)" : ""}</div>`
                      : ""
                  }
                </div>
              `;
            }).join("")}
          </div>

          <!-- ステップ結果フィードバック -->
          <div class="p-2.5 rounded-lg text-xs ${
            !current
              ? "bg-slate-50 text-slate-500"
              : current.isHit
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : "bg-rose-50 text-rose-800 border border-rose-200"
          }">
            ${
              !current
                ? "「次へ」ボタンを押してページ参照を開始してください。"
                : current.isHit
                ? `🎯 <b>キャッシュヒット！</b> ページ <b>P${current.page}</b> はすでに主記憶内に存在しました！高速アクセス成功！`
                : `💥 <b>ページフォールト発生！</b> 主記憶にないためストレージから <b>P${current.page}</b> を読み込みました。${
                    current.evicted ? ` 空き枠がないため <b>P${current.evicted}</b> を追い出しました（置換）。` : ""
                  }`
            }
          </div>
        </div>
      </div>
    `;

    // イベントバインド
    container.querySelector("#btn-algo-lru").onclick = () => {
      algorithm = "LRU";
      updateView();
    };
    container.querySelector("#btn-algo-fifo").onclick = () => {
      algorithm = "FIFO";
      updateView();
    };
    container.querySelector("#btn-frame-3").onclick = () => {
      frameCount = 3;
      updateView();
    };
    container.querySelector("#btn-frame-4").onclick = () => {
      frameCount = 4;
      updateView();
    };
    container.querySelector("#btn-next-step").onclick = () => {
      if (stepIndex < referenceSequence.length) {
        stepIndex++;
        updateView();
      }
    };
    container.querySelector("#btn-prev-step").onclick = () => {
      if (stepIndex > 0) {
        stepIndex--;
        updateView();
      }
    };
    container.querySelector("#btn-reset-step").onclick = () => {
      stepIndex = 0;
      updateView();
    };
  }

  updateView();
}
