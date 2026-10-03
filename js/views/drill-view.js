// AP Tech Master - 午前テクノロジ厳選ドリル画面コントローラ
// FEとの差分・誤答選択肢解剖・午後接続・語源連携

import { drillData } from "../data/drill-data.js";
import { etymologyData, categories } from "../data/etymology-data.js";

export function renderDrillView(container, state, onUpdateState, onOpenEtymology) {
  let selectedCategory = "all";
  let filterNeedsReview = false;
  let currentQuestionIdx = 0;
  let selectedKey = null;
  let showExplanation = false;

  function getFilteredQuestions() {
    let list = drillData;
    if (selectedCategory !== "all") {
      list = list.filter((q) => q.category === selectedCategory);
    }
    if (filterNeedsReview) {
      const reviewIds = state.needsReviewQuestionIds || [];
      list = list.filter((q) => reviewIds.includes(q.id));
    }
    return list;
  }

  function render() {
    const questions = getFilteredQuestions();
    const totalCount = questions.length;
    const q = questions[currentQuestionIdx];

    const reviewIds = state.needsReviewQuestionIds || [];
    const bookmarks = state.bookmarkedQuestionIds || [];
    const isBookmarked = q ? bookmarks.includes(q.id) : false;
    const isNeedsReview = q ? reviewIds.includes(q.id) : false;

    // 関連語源データの取得
    const relatedEty = q && q.etymologyRef ? etymologyData.find((e) => e.id === q.etymologyRef) : null;

    container.innerHTML = `
      <div class="space-y-4 pb-20">
        <!-- フィルタ操作バー -->
        <div class="space-y-2">
          <!-- カテゴリ横スクロール -->
          <div class="overflow-x-auto pb-1 -mx-4 px-4 scrollbar-none">
            <div class="flex gap-1.5 min-w-max">
              ${categories
                .map(
                  (c) => `
                <button data-cat="${c.id}" class="btn-cat-filter px-3 py-1 rounded-full text-xs font-bold border transition ${
                    selectedCategory === c.id
                      ? "bg-indigo-600 text-white border-indigo-700 shadow-sm"
                      : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                  }">
                  ${c.label}
                </button>
              `
                )
                .join("")}
            </div>
          </div>

          <!-- 要復習トグル -->
          <div class="flex items-center justify-between px-1">
            <button id="btn-toggle-review" class="text-xs font-bold px-3 py-1 rounded-lg border transition flex items-center gap-1.5 ${
              filterNeedsReview
                ? "bg-rose-50 text-rose-700 border-rose-300 ring-1 ring-rose-200"
                : "bg-white text-slate-600 border-slate-200"
            }">
              <span>⚠️ 要復習のみ (${reviewIds.length}問)</span>
            </button>
            <div class="text-[11px] text-slate-400 font-bold">
              ${totalCount > 0 ? `${currentQuestionIdx + 1} / ${totalCount} 問` : "0 問"}
            </div>
          </div>
        </div>

        ${
          !q
            ? `
          <div class="bg-white rounded-2xl p-8 text-center text-slate-400 border border-slate-200 space-y-2">
            <div class="text-4xl">🎉</div>
            <div class="text-xs font-bold">該当する問題はありません</div>
            <div class="text-[11px]">要復習リストが空か、フィルタ条件に合致する問題がありません。</div>
          </div>
        `
            : `
          <!-- 問題カード -->
          <div class="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 space-y-3">
            <div class="flex items-center justify-between text-xs">
              <span class="font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                ${q.categoryLabel}
              </span>
              <div class="flex items-center gap-2">
                <button id="btn-bookmark" class="text-base p-1 hover:scale-110 transition" title="ブックマーク">
                  ${isBookmarked ? "⭐" : "☆"}
                </button>
                <span class="text-[10px] text-slate-400 font-mono">${q.source}</span>
              </div>
            </div>

            <h3 class="text-xs md:text-sm font-bold text-slate-800 leading-snug">
              ${q.question}
            </h3>

            <!-- 選択肢 -->
            <div class="space-y-2 pt-2">
              ${q.options
                .map((opt) => {
                  let btnClass = "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100";
                  if (showExplanation) {
                    if (opt.correct) {
                      btnClass = "bg-emerald-50 border-emerald-500 text-emerald-900 font-bold ring-2 ring-emerald-300";
                    } else if (opt.key === selectedKey) {
                      btnClass = "bg-rose-50 border-rose-400 text-rose-800 font-bold";
                    } else {
                      btnClass = "bg-slate-50 border-slate-200 text-slate-400 opacity-60";
                    }
                  }
                  return `
                  <button data-key="${opt.key}" class="btn-option w-full text-left p-3 rounded-xl border text-xs transition ${btnClass} ${
                    showExplanation ? "cursor-default" : ""
                  }">
                    <div class="flex items-start gap-2.5">
                      <span class="w-5 h-5 rounded-full bg-white border border-slate-300 flex-shrink-0 flex items-center justify-center font-bold text-[10px] text-slate-700">
                        ${opt.key}
                      </span>
                      <div class="flex-1">
                        <div>${opt.text}</div>
                        ${
                          showExplanation
                            ? `<div class="text-[10px] mt-1 text-slate-500 leading-tight">${opt.note}</div>`
                            : ""
                        }
                      </div>
                    </div>
                  </button>
                `;
                })
                .join("")}
            </div>
          </div>

          <!-- 詳細解説エリア -->
          ${
            showExplanation
              ? `
            <div class="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 space-y-3">
              <div class="flex items-center justify-between border-b border-slate-100 pb-2">
                <span class="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                  <span>📖</span> 解説＆本質ロジック
                </span>
                <span class="text-xs font-bold ${
                  q.options.find((o) => o.key === selectedKey)?.correct
                    ? "text-emerald-600"
                    : "text-rose-600"
                }">
                  ${
                    q.options.find((o) => o.key === selectedKey)?.correct
                      ? "正解！ (+20 EXP)"
                      : "不正解（要復習に追加）"
                  }
                </span>
              </div>

              <!-- 解答ロジック -->
              <div class="text-xs text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50 p-3 rounded-xl border border-slate-200">
                ${q.explanation.logic}
              </div>

              <!-- FEとの差分 -->
              <div class="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs leading-relaxed text-amber-900 space-y-1">
                <div class="font-bold flex items-center gap-1 text-amber-800 text-[11px]">
                  <span>⚡</span> 基本情報（FE）との決定的な違い
                </div>
                <div class="text-[11px] text-amber-950">${q.explanation.feDiff}</div>
              </div>

              <!-- 午後への接続 -->
              <div class="bg-indigo-50 border border-indigo-200 rounded-xl p-3 text-xs leading-relaxed text-indigo-900 space-y-1">
                <div class="font-bold flex items-center gap-1 text-indigo-800 text-[11px]">
                  <span>🎯</span> 午後試験の得点に直結するポイント
                </div>
                <div class="text-[11px] text-indigo-950">${q.explanation.pmBridge}</div>
              </div>

              <!-- 関連語源へのリンク -->
              ${
                relatedEty
                  ? `
                <div class="pt-1">
                  <button id="btn-open-related-ety" class="w-full py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition">
                    <span>🔤</span> 「${relatedEty.term}」の語源と誕生ストーリーを読む ▶
                  </button>
                </div>
              `
                  : ""
              }

              <!-- 次へボタン -->
              <div class="pt-2 flex justify-between items-center border-t border-slate-100">
                <button id="btn-prev-q" class="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold ${
                  currentQuestionIdx === 0 ? "opacity-40 cursor-not-allowed" : ""
                }">
                  ◀ 前の問題
                </button>
                <button id="btn-next-q" class="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-sm">
                  ${currentQuestionIdx === totalCount - 1 ? "最初の問題へ ↺" : "次の問題 ▶"}
                </button>
              </div>
            </div>
          `
              : ""
          }
        `
        }
      </div>
    `;

    // イベントバインド
    container.querySelectorAll(".btn-cat-filter").forEach((btn) => {
      btn.onclick = () => {
        selectedCategory = btn.getAttribute("data-cat");
        currentQuestionIdx = 0;
        selectedKey = null;
        showExplanation = false;
        render();
      };
    });

    const btnToggleReview = container.querySelector("#btn-toggle-review");
    if (btnToggleReview) {
      btnToggleReview.onclick = () => {
        filterNeedsReview = !filterNeedsReview;
        currentQuestionIdx = 0;
        selectedKey = null;
        showExplanation = false;
        render();
      };
    }

    if (q) {
      const btnBookmark = container.querySelector("#btn-bookmark");
      if (btnBookmark) {
        btnBookmark.onclick = () => {
          let bms = state.bookmarkedQuestionIds || [];
          if (bms.includes(q.id)) {
            bms = bms.filter((id) => id !== q.id);
          } else {
            bms.push(q.id);
          }
          state.bookmarkedQuestionIds = bms;
          onUpdateState(state);
          render();
        };
      }

      if (!showExplanation) {
        container.querySelectorAll(".btn-option").forEach((btn) => {
          btn.onclick = () => {
            selectedKey = btn.getAttribute("data-key");
            showExplanation = true;

            const isCorrect = q.options.find((o) => o.key === selectedKey)?.correct;
            let revs = state.needsReviewQuestionIds || [];

            if (isCorrect) {
              state.exp = (state.exp || 0) + 20;
              // 正解した場合は要復習から除外
              revs = revs.filter((id) => id !== q.id);
            } else {
              // 不正解の場合は要復習に追加
              if (!revs.includes(q.id)) {
                revs.push(q.id);
              }
            }
            state.needsReviewQuestionIds = revs;
            onUpdateState(state);
            render();
          };
        });
      }

      const btnNextQ = container.querySelector("#btn-next-q");
      if (btnNextQ) {
        btnNextQ.onclick = () => {
          if (currentQuestionIdx < totalCount - 1) {
            currentQuestionIdx++;
          } else {
            currentQuestionIdx = 0;
          }
          selectedKey = null;
          showExplanation = false;
          render();
        };
      }

      const btnPrevQ = container.querySelector("#btn-prev-q");
      if (btnPrevQ) {
        btnPrevQ.onclick = () => {
          if (currentQuestionIdx > 0) {
            currentQuestionIdx--;
            selectedKey = null;
            showExplanation = false;
            render();
          }
        };
      }

      const btnOpenEty = container.querySelector("#btn-open-related-ety");
      if (btnOpenEty && relatedEty) {
        btnOpenEty.onclick = () => {
          onOpenEtymology(relatedEty.id);
        };
      }
    }
  }

  render();
}
