// AP Tech Master - 午後対策シナリオ・クエスト画面コントローラ
// 現場トラブルシューティングを通じて、午後問題の論理的推論力を鍛える

import { questData } from "../data/quest-data.js";

export function renderQuestView(container, state, onUpdateState) {
  let activeQuestId = state.activeQuestId || null;
  let currentStepIdx = 0;
  let selectedChoiceIdx = null;
  let isAnswered = false;

  function renderList() {
    container.innerHTML = `
      <div class="space-y-4 pb-20">
        <!-- バナー -->
        <div class="bg-gradient-to-r from-indigo-900 to-slate-900 text-white p-4 rounded-2xl shadow-sm space-y-1.5">
          <div class="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
            <span>⚔️</span> 午後対策トラブルシュート・クエスト
          </div>
          <h2 class="text-base font-black">現場の障害をエンジニアとして救え！</h2>
          <p class="text-[11px] text-slate-300 leading-relaxed">
            長文読解と論理的推論力が試されるAP午後試験。実際のシステムトラブルの文脈の中で「なぜ障害が起きたのか」「どう設計変更すべきか」を追体験します。
          </p>
        </div>

        <!-- クエスト一覧カード -->
        <div class="space-y-3">
          ${questData
            .map((q) => {
              const isCleared = state.clearedQuests && state.clearedQuests.includes(q.id);
              return `
              <div class="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 space-y-3 transition hover:border-indigo-300">
                <div class="flex items-start justify-between gap-2">
                  <div>
                    <span class="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isCleared ? "bg-emerald-100 text-emerald-800" : "bg-indigo-50 text-indigo-700"
                    } mb-1">
                      ${isCleared ? "✓ 解決済み" : q.difficulty}
                    </span>
                    <h3 class="text-sm font-bold text-slate-800">${q.title}</h3>
                  </div>
                  <span class="text-xl">${isCleared ? "🏆" : "🚨"}</span>
                </div>

                <p class="text-xs text-slate-600 leading-relaxed">
                  ${q.summary}
                </p>

                <div class="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span class="text-[11px] font-bold text-slate-400">全 ${q.steps.length} ステップ</span>
                  <button data-quest-id="${q.id}" class="btn-start-quest px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-sm transition">
                    ${isCleared ? "もう一度挑戦" : "任務開始 ▶"}
                  </button>
                </div>
              </div>
            `;
            })
            .join("")}
        </div>
      </div>
    `;

    container.querySelectorAll(".btn-start-quest").forEach((btn) => {
      btn.onclick = () => {
        activeQuestId = btn.getAttribute("data-quest-id");
        currentStepIdx = 0;
        selectedChoiceIdx = null;
        isAnswered = false;
        renderDetail();
      };
    });
  }

  function renderDetail() {
    const quest = questData.find((q) => q.id === activeQuestId);
    if (!quest) return renderList();

    const isLastStep = currentStepIdx === quest.steps.length - 1;
    const step = quest.steps[currentStepIdx];
    const isStepCleared = isAnswered && selectedChoiceIdx !== null && step.choices[selectedChoiceIdx].correct;

    container.innerHTML = `
      <div class="space-y-4 pb-20">
        <!-- ヘッダー戻るバー -->
        <div class="flex items-center justify-between">
          <button id="btn-back-to-quests" class="text-xs font-bold text-slate-600 hover:text-indigo-600 flex items-center gap-1">
            ◀ クエスト一覧に戻る
          </button>
          <span class="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
            Step ${currentStepIdx + 1} / ${quest.steps.length}
          </span>
        </div>

        <!-- クエストタイトル -->
        <div class="bg-white rounded-xl p-3.5 shadow-sm border border-slate-200">
          <div class="text-[10px] font-bold text-indigo-600 mb-0.5">${quest.categoryLabel}</div>
          <h2 class="text-sm font-bold text-slate-800">${quest.title}</h2>
        </div>

        <!-- 現場状況カード -->
        <div class="bg-slate-900 text-white rounded-2xl p-4 shadow-sm space-y-2">
          <div class="flex items-center gap-1.5 text-rose-400 text-xs font-bold">
            <span class="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
            <span>${step.title}</span>
          </div>
          <div class="text-xs text-slate-200 leading-relaxed font-sans whitespace-pre-line bg-slate-800/80 p-3 rounded-xl border border-slate-700">
            ${step.situation}
          </div>
        </div>

        <!-- 設問 -->
        <div class="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 space-y-3">
          <div class="font-bold text-xs text-slate-800 leading-snug">
            ❓ ${step.question}
          </div>

          <!-- 選択肢リスト -->
          <div class="space-y-2">
            ${step.choices
              .map((c, idx) => {
                let btnStyle = "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100";
                if (isAnswered) {
                  if (c.correct) {
                    btnStyle = "bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-300 font-bold";
                  } else if (idx === selectedChoiceIdx) {
                    btnStyle = "bg-rose-50 border-rose-400 text-rose-800";
                  } else {
                    btnStyle = "bg-slate-50 border-slate-200 text-slate-400 opacity-60";
                  }
                }
                return `
                <button data-choice-idx="${idx}" class="btn-quest-choice w-full text-left p-3 rounded-xl border text-xs leading-relaxed transition ${btnStyle} ${
                  isAnswered ? "cursor-default" : ""
                }">
                  <div class="flex items-start gap-2">
                    <span class="w-5 h-5 rounded-full bg-white border border-slate-300 flex-shrink-0 flex items-center justify-center font-mono font-bold text-[10px]">
                      ${idx + 1}
                    </span>
                    <span class="flex-1">${c.text}</span>
                  </div>
                </button>
              `;
              })
              .join("")}
          </div>

          <!-- フィードバック表示 -->
          ${
            isAnswered
              ? `
            <div class="p-3 rounded-xl text-xs space-y-2 ${
              step.choices[selectedChoiceIdx].correct
                ? "bg-emerald-50 text-emerald-900 border border-emerald-200"
                : "bg-rose-50 text-rose-900 border border-rose-200"
            }">
              <div class="font-bold flex items-center gap-1.5">
                <span>${step.choices[selectedChoiceIdx].correct ? "🎉 正解！" : "💥 調査失敗..."}</span>
              </div>
              <div class="text-[11px] leading-relaxed">
                ${step.choices[selectedChoiceIdx].feedback}
              </div>

              <!-- 次へボタン -->
              <div class="pt-1 flex justify-end">
                ${
                  isStepCleared
                    ? isLastStep
                      ? `<button id="btn-finish-quest" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md animate-bounce">
                          🏆 クエスト完全解決！
                        </button>`
                      : `<button id="btn-next-step" class="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-sm">
                          次の調査ステップへ進む ▶
                        </button>`
                    : `<button id="btn-retry-step" class="px-3 py-1.5 bg-slate-700 text-white rounded-xl text-xs font-bold">
                        考え直して再挑戦
                      </button>`
                }
              </div>
            </div>
          `
              : ""
          }
        </div>
      </div>
    `;

    // イベントバインド
    container.querySelector("#btn-back-to-quests").onclick = () => renderList();

    if (!isAnswered) {
      container.querySelectorAll(".btn-quest-choice").forEach((btn) => {
        btn.onclick = () => {
          selectedChoiceIdx = parseInt(btn.getAttribute("data-choice-idx"), 10);
          isAnswered = true;
          renderDetail();
        };
      });
    }

    const btnNext = container.querySelector("#btn-next-step");
    if (btnNext) {
      btnNext.onclick = () => {
        currentStepIdx++;
        selectedChoiceIdx = null;
        isAnswered = false;
        renderDetail();
      };
    }

    const btnRetry = container.querySelector("#btn-retry-step");
    if (btnRetry) {
      btnRetry.onclick = () => {
        selectedChoiceIdx = null;
        isAnswered = false;
        renderDetail();
      };
    }

    const btnFinish = container.querySelector("#btn-finish-quest");
    if (btnFinish) {
      btnFinish.onclick = () => {
        // クリア処理
        if (!state.clearedQuests) state.clearedQuests = [];
        if (!state.clearedQuests.includes(quest.id)) {
          state.clearedQuests.push(quest.id);
          state.exp = (state.exp || 0) + 100;
          onUpdateState(state);
        }
        renderCompletionModal(quest);
      };
    }
  }

  function renderCompletionModal(quest) {
    container.innerHTML = `
      <div class="space-y-4 pb-20 text-center py-6">
        <div class="text-6xl animate-bounce">🏆</div>
        <h2 class="text-xl font-black text-slate-800">QUEST COMPLETE!</h2>
        <p class="text-xs font-bold text-emerald-600">現場トラブルを無事に完全解決しました！ (+100 EXP)</p>

        <!-- 本質まとめカード -->
        <div class="bg-indigo-50 border border-indigo-200 rounded-2xl p-4 text-left space-y-2 mx-auto max-w-sm">
          <div class="text-xs font-bold text-indigo-800 flex items-center gap-1.5">
            <span>📝</span> 午後試験の重要テイクアウェイ
          </div>
          <p class="text-xs text-indigo-950 leading-relaxed font-sans">
            ${quest.takeaway}
          </p>
        </div>

        <div class="pt-4">
          <button id="btn-return-list" class="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md">
            クエスト一覧に戻る
          </button>
        </div>
      </div>
    `;

    container.querySelector("#btn-return-list").onclick = () => renderList();
  }

  renderList();
}
