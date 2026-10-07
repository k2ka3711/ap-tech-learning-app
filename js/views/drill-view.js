// AP Tech Master - 午前テクノロジ完全攻略ドリル画面コントローラ
// 【データベース＆ネットワーク特化型・全37問】
// サブトピック絞り込み、問題パレットジャンプ、シャッフル演習、正答率分析

import { drillData } from "../data/drill-data.js";
import { etymologyData, categories } from "../data/etymology-data.js";

export function renderDrillView(container, state, onUpdateState, onOpenEtymology) {
  let selectedCategory = "database"; // デフォルトで一番苦手なデータベースを選択！
  let selectedSubTopic = "all";
  let filterNeedsReview = false;
  let filterBookmarked = false;
  let isShuffled = false;
  let showQuestionPalette = false;

  let currentQuestionIdx = 0;
  let selectedKey = null;
  let showExplanation = false;

  // 履歴ステートの初期化
  if (!state.drillHistory) {
    state.drillHistory = {};
  }

  function getBaseList() {
    let list = [...drillData];

    // カテゴリフィルタ
    if (selectedCategory !== "all") {
      list = list.filter((q) => q.category === selectedCategory);
    }

    // サブトピックフィルタ
    if (selectedSubTopic !== "all") {
      list = list.filter((q) => q.subTopic === selectedSubTopic);
    }

    // 要復習フィルタ
    if (filterNeedsReview) {
      const reviewIds = state.needsReviewQuestionIds || [];
      list = list.filter((q) => reviewIds.includes(q.id));
    }

    // ブックマークフィルタ
    if (filterBookmarked) {
      const bms = state.bookmarkedQuestionIds || [];
      list = list.filter((q) => bms.includes(q.id));
    }

    return list;
  }

  // カテゴリ内の利用可能サブトピック一覧の取得
  function getSubTopicsForCategory(catId) {
    const list = catId === "all" ? drillData : drillData.filter((q) => q.category === catId);
    const subTopics = Array.from(new Set(list.map((q) => q.subTopic).filter(Boolean)));
    return ["all", ...subTopics];
  }

  // 正答率統計計算
  function calculateStats() {
    const dbQuestions = drillData.filter((q) => q.category === "database");
    const nwQuestions = drillData.filter((q) => q.category === "network");

    const history = state.drillHistory || {};

    const dbAnswered = dbQuestions.filter((q) => history[q.id]);
    const dbCorrect = dbQuestions.filter((q) => history[q.id]?.isCorrect);
    const dbRate = dbAnswered.length > 0 ? Math.round((dbCorrect.length / dbAnswered.length) * 100) : null;

    const nwAnswered = nwQuestions.filter((q) => history[q.id]);
    const nwCorrect = nwQuestions.filter((q) => history[q.id]?.isCorrect);
    const nwRate = nwAnswered.length > 0 ? Math.round((nwCorrect.length / nwAnswered.length) * 100) : null;

    return {
      db: { total: dbQuestions.length, answered: dbAnswered.length, correct: dbCorrect.length, rate: dbRate },
      nw: { total: nwQuestions.length, answered: nwAnswered.length, correct: nwCorrect.length, rate: nwRate }
    };
  }

  function render() {
    const questions = getBaseList();
    const totalCount = questions.length;

    // インデックスの境界チェック
    if (currentQuestionIdx >= totalCount && totalCount > 0) {
      currentQuestionIdx = 0;
    }
    const q = questions[currentQuestionIdx];

    const reviewIds = state.needsReviewQuestionIds || [];
    const bookmarks = state.bookmarkedQuestionIds || [];
    const history = state.drillHistory || {};

    const isBookmarked = q ? bookmarks.includes(q.id) : false;
    const isNeedsReview = q ? reviewIds.includes(q.id) : false;
    const pastRecord = q ? history[q.id] : null;

    const availableSubTopics = getSubTopicsForCategory(selectedCategory);
    const stats = calculateStats();

    // 関連語源データの取得
    const relatedEty = q && q.etymologyRef ? etymologyData.find((e) => e.id === q.etymologyRef) : null;

    container.innerHTML = `
      <div class="space-y-4 pb-20">

        <!-- 苦手分野フォーカスバナー＆正答率ステータス -->
        <div class="bg-gradient-to-r from-indigo-900 to-slate-900 text-white rounded-2xl p-3.5 shadow-sm space-y-2.5">
          <div class="flex items-center justify-between">
            <div class="text-xs font-black tracking-wide flex items-center gap-1.5 text-indigo-200">
              <span>🎯</span>
              <span>午前テクノロジ集中特訓（全${drillData.length}問）</span>
            </div>
            <button id="btn-toggle-palette" class="text-[11px] font-bold bg-white/10 hover:bg-white/20 text-white px-2.5 py-1 rounded-lg transition border border-white/15 flex items-center gap-1">
              <span>📋 問題一覧</span>
              <span class="text-[9px]">${showQuestionPalette ? "▲" : "▼"}</span>
            </button>
          </div>

          <!-- DBとNWの2大苦手克服メーター -->
          <div class="grid grid-cols-2 gap-2 text-[11px]">
            <div class="bg-white/10 rounded-xl p-2 border border-white/10 flex flex-col justify-between">
              <div class="flex justify-between items-center text-slate-300">
                <span class="font-bold flex items-center gap-1">🗄️ データベース</span>
                <span class="font-mono font-bold ${stats.db.rate >= 70 ? "text-emerald-400" : "text-amber-300"}">
                  ${stats.db.rate !== null ? `${stats.db.rate}%` : "--%"}
                </span>
              </div>
              <div class="w-full bg-black/30 h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div class="bg-indigo-400 h-full rounded-full transition-all" style="width: ${(stats.db.correct / stats.db.total) * 100}%"></div>
              </div>
              <div class="text-[9px] text-slate-400 mt-1">正解 ${stats.db.correct} / 演習 ${stats.db.answered} (全${stats.db.total}問)</div>
            </div>

            <div class="bg-white/10 rounded-xl p-2 border border-white/10 flex flex-col justify-between">
              <div class="flex justify-between items-center text-slate-300">
                <span class="font-bold flex items-center gap-1">🌐 ネットワーク</span>
                <span class="font-mono font-bold ${stats.nw.rate >= 70 ? "text-emerald-400" : "text-amber-300"}">
                  ${stats.nw.rate !== null ? `${stats.nw.rate}%` : "--%"}
                </span>
              </div>
              <div class="w-full bg-black/30 h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div class="bg-cyan-400 h-full rounded-full transition-all" style="width: ${(stats.nw.correct / stats.nw.total) * 100}%"></div>
              </div>
              <div class="text-[9px] text-slate-400 mt-1">正解 ${stats.nw.correct} / 演習 ${stats.nw.answered} (全${stats.nw.total}問)</div>
            </div>
          </div>
        </div>

        <!-- 問題パレット（展開時） -->
        ${
          showQuestionPalette
            ? `
          <div class="bg-white rounded-2xl p-4 shadow-md border border-slate-200 space-y-3 animate-fade-in">
            <div class="flex items-center justify-between border-b border-slate-100 pb-2">
              <span class="text-xs font-black text-slate-800">問題パレット（現在の絞り込み: ${totalCount}問）</span>
              <div class="flex items-center gap-2 text-[10px] text-slate-500 font-bold">
                <span class="inline-block w-2 h-2 rounded-full bg-emerald-500"></span> 正解
                <span class="inline-block w-2 h-2 rounded-full bg-rose-500"></span> 不正解
                <span class="inline-block w-2 h-2 rounded-full bg-slate-200"></span> 未着手
              </div>
            </div>

            <div class="grid grid-cols-6 sm:grid-cols-8 gap-1.5 max-h-48 overflow-y-auto pr-1">
              ${questions
                .map((item, idx) => {
                  const rec = history[item.id];
                  const inReview = reviewIds.includes(item.id);
                  let stateColor = "bg-slate-100 text-slate-600 hover:bg-slate-200 border-slate-200";
                  if (rec) {
                    stateColor = rec.isCorrect
                      ? "bg-emerald-100 text-emerald-800 border-emerald-300 font-bold"
                      : "bg-rose-100 text-rose-800 border-rose-300 font-bold";
                  }
                  const isCurrent = idx === currentQuestionIdx;
                  return `
                  <button data-palette-idx="${idx}" class="btn-jump-palette relative py-2 rounded-xl text-xs border text-center transition flex flex-col items-center justify-center ${stateColor} ${
                    isCurrent ? "ring-2 ring-indigo-600 shadow-sm" : ""
                  }">
                    <span>${idx + 1}</span>
                    ${inReview ? `<span class="absolute -top-1 -right-1 text-[8px]">⚠️</span>` : ""}
                  </button>
                `;
                })
                .join("")}
            </div>
          </div>
        `
            : ""
        }

        <!-- フィルタ操作エリア -->
        <div class="space-y-2">
          <!-- 大カテゴリ選択タブ -->
          <div class="overflow-x-auto pb-1 -mx-4 px-4 scrollbar-none">
            <div class="flex gap-1.5 min-w-max">
              <button data-cat="database" class="btn-cat-filter px-3.5 py-1.5 rounded-full text-xs font-bold border transition ${
                selectedCategory === "database"
                  ? "bg-indigo-600 text-white border-indigo-700 shadow-sm"
                  : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
              }">
                🗄️ データベース (${drillData.filter((q) => q.category === "database").length}問)
              </button>

              <button data-cat="network" class="btn-cat-filter px-3.5 py-1.5 rounded-full text-xs font-bold border transition ${
                selectedCategory === "network"
                  ? "bg-indigo-600 text-white border-indigo-700 shadow-sm"
                  : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
              }">
                🌐 ネットワーク (${drillData.filter((q) => q.category === "network").length}問)
              </button>

              <button data-cat="all" class="btn-cat-filter px-3.5 py-1.5 rounded-full text-xs font-bold border transition ${
                selectedCategory === "all"
                  ? "bg-indigo-600 text-white border-indigo-700 shadow-sm"
                  : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
              }">
                すべて (${drillData.length}問)
              </button>
            </div>
          </div>

          <!-- サブトピックタグチップ -->
          ${
            availableSubTopics.length > 2
              ? `
            <div class="overflow-x-auto pb-1 -mx-4 px-4 scrollbar-none">
              <div class="flex gap-1 min-w-max">
                ${availableSubTopics
                  .map(
                    (st) => `
                  <button data-subtopic="${st}" class="btn-subtopic-filter px-2.5 py-1 rounded-lg text-[10px] font-bold border transition ${
                      selectedSubTopic === st
                        ? "bg-slate-800 text-white border-slate-900"
                        : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"
                    }">
                    ${st === "all" ? "全トピック" : st}
                  </button>
                `
                  )
                  .join("")}
              </div>
            </div>
          `
              : ""
          }

          <!-- サブコントロールバー（要復習・ブックマーク・シャッフル） -->
          <div class="flex items-center justify-between px-1 text-xs">
            <div class="flex items-center gap-1.5">
              <button id="btn-toggle-review" class="px-2.5 py-1 rounded-lg border font-bold text-[11px] transition flex items-center gap-1 ${
                filterNeedsReview
                  ? "bg-rose-50 text-rose-700 border-rose-300 ring-1 ring-rose-200"
                  : "bg-white text-slate-600 border-slate-200"
              }">
                <span>⚠️ 要復習 (${reviewIds.length})</span>
              </button>

              <button id="btn-toggle-bookmark-filter" class="px-2.5 py-1 rounded-lg border font-bold text-[11px] transition flex items-center gap-1 ${
                filterBookmarked
                  ? "bg-amber-50 text-amber-700 border-amber-300 ring-1 ring-amber-200"
                  : "bg-white text-slate-600 border-slate-200"
              }">
                <span>⭐ 保存 (${bookmarks.length})</span>
              </button>
            </div>

            <div class="text-[11px] text-slate-500 font-bold font-mono">
              ${totalCount > 0 ? `${currentQuestionIdx + 1} / ${totalCount} 問` : "0 問"}
            </div>
          </div>
        </div>

        ${
          !q
            ? `
          <div class="bg-white rounded-2xl p-8 text-center text-slate-400 border border-slate-200 space-y-2">
            <div class="text-4xl">🎉</div>
            <div class="text-xs font-bold text-slate-600">該当する問題がありません</div>
            <div class="text-[11px]">フィルタ条件（要復習やサブトピックなど）を解除してお試しください。</div>
            <button id="btn-reset-filters" class="mt-2 px-3 py-1.5 bg-indigo-50 text-indigo-700 font-bold text-xs rounded-xl border border-indigo-200">
              フィルタをリセット
            </button>
          </div>
        `
            : `
          <!-- 問題カード -->
          <div class="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 space-y-3">
            <div class="flex items-center justify-between text-xs">
              <div class="flex items-center gap-1.5">
                <span class="font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100 text-[10px]">
                  ${q.categoryLabel}
                </span>
                ${
                  q.subTopic
                    ? `<span class="font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded text-[10px]">${q.subTopic}</span>`
                    : ""
                }
              </div>
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
            <div class="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 space-y-3 animate-fade-in">
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
                <button id="btn-prev-q" class="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold ${
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
    const btnTogglePalette = container.querySelector("#btn-toggle-palette");
    if (btnTogglePalette) {
      btnTogglePalette.onclick = () => {
        showQuestionPalette = !showQuestionPalette;
        render();
      };
    }

    container.querySelectorAll(".btn-jump-palette").forEach((btn) => {
      btn.onclick = () => {
        const idx = parseInt(btn.getAttribute("data-palette-idx"), 10);
        currentQuestionIdx = idx;
        selectedKey = null;
        showExplanation = false;
        showQuestionPalette = false;
        render();
      };
    });

    container.querySelectorAll(".btn-cat-filter").forEach((btn) => {
      btn.onclick = () => {
        selectedCategory = btn.getAttribute("data-cat");
        selectedSubTopic = "all";
        currentQuestionIdx = 0;
        selectedKey = null;
        showExplanation = false;
        render();
      };
    });

    container.querySelectorAll(".btn-subtopic-filter").forEach((btn) => {
      btn.onclick = () => {
        selectedSubTopic = btn.getAttribute("data-subtopic");
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

    const btnToggleBookmarkFilter = container.querySelector("#btn-toggle-bookmark-filter");
    if (btnToggleBookmarkFilter) {
      btnToggleBookmarkFilter.onclick = () => {
        filterBookmarked = !filterBookmarked;
        currentQuestionIdx = 0;
        selectedKey = null;
        showExplanation = false;
        render();
      };
    }

    const btnResetFilters = container.querySelector("#btn-reset-filters");
    if (btnResetFilters) {
      btnResetFilters.onclick = () => {
        filterNeedsReview = false;
        filterBookmarked = false;
        selectedSubTopic = "all";
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

            // 履歴の更新
            if (!state.drillHistory) state.drillHistory = {};
            state.drillHistory[q.id] = {
              isCorrect: !!isCorrect,
              selectedKey,
              answeredAt: new Date().toISOString()
            };

            if (isCorrect) {
              state.exp = (state.exp || 0) + 20;
              revs = revs.filter((id) => id !== q.id);
            } else {
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
