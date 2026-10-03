// AP Tech Master - 語源・誕生ストーリー事典 ＆ 午後記述ロジック画面コントローラ
// 丸暗記を排除し、語源の分解・誕生ドラマ・30字記述フレーズ・公式早見表を網羅

import { etymologyData, categories } from "../data/etymology-data.js";
import { logicData } from "../data/logic-data.js";

export function renderLogicView(container, state, initialTab = "etymology", targetEtyId = null) {
  let activeTab = initialTab; // 'etymology' or 'logic'
  let searchQuery = "";
  let selectedCategory = "all";
  let openedEtyId = targetEtyId;

  function render() {
    container.innerHTML = `
      <div class="space-y-4 pb-20">
        <!-- 2大タブ切替 -->
        <div class="flex rounded-xl bg-slate-100 p-1 border border-slate-200">
          <button id="btn-tab-ety" class="flex-1 py-2 text-xs font-bold rounded-lg transition flex items-center justify-center gap-1.5 ${
            activeTab === "etymology" ? "bg-white text-indigo-700 shadow-sm" : "text-slate-600 hover:text-slate-900"
          }">
            <span>🔤 語源・誕生ストーリー事典</span>
          </button>
          <button id="btn-tab-descriptive" class="flex-1 py-2 text-xs font-bold rounded-lg transition flex items-center justify-center gap-1.5 ${
            activeTab === "logic" ? "bg-white text-indigo-700 shadow-sm" : "text-slate-600 hover:text-slate-900"
          }">
            <span>📝 午後記述＆公式チートシート</span>
          </button>
        </div>

        ${activeTab === "etymology" ? renderEtymologySection() : renderLogicSection()}
      </div>
    `;

    // タブ切替イベント
    container.querySelector("#btn-tab-ety").onclick = () => {
      activeTab = "etymology";
      render();
    };
    container.querySelector("#btn-tab-descriptive").onclick = () => {
      activeTab = "logic";
      render();
    };

    if (activeTab === "etymology") {
      bindEtymologyEvents();
    }
  }

  function renderEtymologySection() {
    let list = etymologyData;
    if (selectedCategory !== "all") {
      list = list.filter((item) => item.category === selectedCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (item) =>
          item.term.toLowerCase().includes(q) ||
          item.fullName.toLowerCase().includes(q) ||
          item.essence.toLowerCase().includes(q) ||
          item.story.toLowerCase().includes(q)
      );
    }

    return `
      <div class="space-y-3">
        <!-- 検索バー -->
        <div class="relative">
          <input id="input-ety-search" type="text" placeholder="略称・英単語・キーワードで検索（例: RAID, CIDR）..." value="${searchQuery}" class="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <span class="absolute left-3 top-2.5 text-slate-400 text-xs">🔍</span>
        </div>

        <!-- カテゴリフィルタ -->
        <div class="overflow-x-auto pb-1 -mx-4 px-4 scrollbar-none">
          <div class="flex gap-1.5 min-w-max">
            ${categories
              .map(
                (c) => `
              <button data-cat="${c.id}" class="btn-ety-cat px-3 py-1 rounded-full text-[11px] font-bold border transition ${
                  selectedCategory === c.id
                    ? "bg-slate-800 text-white border-slate-900"
                    : "bg-white text-slate-600 border-slate-200"
                }">
                ${c.label}
              </button>
            `
              )
              .join("")}
          </div>
        </div>

        <!-- 用語カード一覧 -->
        <div class="space-y-3 pt-1">
          ${
            list.length === 0
              ? `<div class="bg-white rounded-2xl p-6 text-center text-slate-400 text-xs font-bold">一致する用語が見つかりませんでした</div>`
              : list
                  .map((item) => {
                    const isExpanded = openedEtyId === item.id;
                    return `
                <div class="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 space-y-2 transition ${
                  isExpanded ? "ring-2 ring-indigo-500 border-indigo-400" : ""
                }">
                  <div class="flex items-start justify-between">
                    <div>
                      <div class="flex items-center gap-2">
                        <h3 class="text-base font-black text-indigo-700">${item.term}</h3>
                        <span class="text-[10px] text-slate-400 font-bold bg-slate-100 px-2 py-0.5 rounded-full">
                          ${item.categoryLabel}
                        </span>
                      </div>
                      <div class="text-xs font-mono font-bold text-slate-600 mt-0.5">
                        ${item.fullName}
                      </div>
                    </div>
                    <button data-ety-id="${item.id}" class="btn-toggle-ety text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg hover:bg-indigo-100">
                      ${isExpanded ? "閉じる ▲" : "ストーリーを読む ▼"}
                    </button>
                  </div>

                  <!-- 一言本質 -->
                  <div class="text-xs text-slate-700 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    💡 <b>本質:</b> ${item.essence}
                  </div>

                  <!-- 展開詳細 -->
                  ${
                    isExpanded
                      ? `
                    <div class="space-y-3 pt-2 border-t border-slate-100 mt-2 text-xs">
                      <!-- 単語ごとの意味分解 -->
                      <div class="space-y-1">
                        <div class="text-[10px] font-bold text-indigo-800 flex items-center gap-1">
                          <span>🔤</span> 単語ごとの直訳・意味分解
                        </div>
                        <div class="grid grid-cols-1 gap-1">
                          ${item.breakdown
                            .map(
                              (b) => `
                            <div class="flex items-baseline gap-2 bg-indigo-50/50 px-2 py-1 rounded border border-indigo-100/50">
                              <span class="font-mono font-bold text-indigo-700 text-[11px] min-w-[90px]">${b.word}</span>
                              <span class="text-slate-600 text-[11px]">${b.meaning}</span>
                            </div>
                          `
                            )
                            .join("")}
                        </div>
                      </div>

                      <!-- 誕生ストーリー -->
                      <div class="bg-amber-50/70 border border-amber-200/70 rounded-xl p-3 space-y-1">
                        <div class="font-bold text-amber-800 text-[11px] flex items-center gap-1">
                          <span>📜</span> 誕生した歴史的背景とドラマ
                        </div>
                        <p class="text-[11px] text-amber-950 leading-relaxed font-sans">
                          ${item.story}
                        </p>
                      </div>

                      <!-- AP試験でのポイント -->
                      <div class="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-1">
                        <div class="font-bold text-slate-800 text-[11px] flex items-center gap-1">
                          <span>🎯</span> AP午前・午後の出題ポイント
                        </div>
                        <p class="text-[11px] text-slate-600 leading-relaxed">
                          ${item.examTip}
                        </p>
                      </div>
                    </div>
                  `
                      : ""
                  }
                </div>
              `;
                  })
                  .join("")}
        </div>
      </div>
    `;
  }

  function renderLogicSection() {
    return `
      <div class="space-y-4">
        <!-- バナー -->
        <div class="bg-indigo-50 border border-indigo-200 rounded-xl p-3 text-xs leading-relaxed text-indigo-900">
          <div class="font-bold flex items-center gap-1.5 text-indigo-700 mb-1">
            <span class="text-base">📝</span> 午後記述で30字〜40字で言い切る黄金ロジック
          </div>
          非エンジニアが午後問題で勝つための最大の武器は、採点者が求める<b>「キーワードを過不足なく含めた理由説明」</b>です。丸暗記ではなく、メカニズムの必然性から記述を導き出しましょう。
        </div>

        <!-- 記述ロジック一覧 -->
        <div class="space-y-3">
          <h3 class="text-xs font-bold text-slate-700">午後記述フレーズ集</h3>
          ${logicData.descriptivePhrases
            .map(
              (p) => `
            <div class="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 space-y-2.5">
              <div class="flex items-center justify-between">
                <span class="text-[10px] font-bold px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100">
                  ${p.categoryLabel}
                </span>
                <span class="text-[10px] font-bold text-slate-400">文字数: ${p.length}字</span>
              </div>

              <div class="text-xs font-bold text-slate-800">
                ❓ ${p.question}
              </div>

              <div class="p-3 bg-emerald-50 border border-emerald-300 rounded-xl space-y-1">
                <div class="text-[10px] font-bold text-emerald-800">模範解答フレーズ:</div>
                <div class="text-xs font-bold text-emerald-950 font-sans leading-relaxed">
                  「${p.modelAnswer}」
                </div>
              </div>

              <!-- 必須キーワード -->
              <div class="flex flex-wrap items-center gap-1 text-[10px]">
                <span class="text-slate-400 font-bold">必須キーワード:</span>
                ${p.pointKeywords
                  .map(
                    (kw) => `
                  <span class="bg-slate-100 text-slate-700 font-bold px-1.5 py-0.5 rounded border border-slate-200">
                    ${kw}
                  </span>
                `
                  )
                  .join("")}
              </div>

              <div class="text-[11px] text-slate-500 leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                💡 <b>背景ロジック:</b> ${p.background}
              </div>
            </div>
          `
            )
            .join("")}
        </div>

        <!-- 公式チートシート -->
        <div class="space-y-3 pt-2">
          <h3 class="text-xs font-bold text-slate-700">テクノロジ重要計算公式</h3>
          ${logicData.cheatSheets
            .map(
              (f) => `
            <div class="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 space-y-2">
              <h4 class="text-xs font-bold text-slate-800">${f.title}</h4>
              <div class="bg-slate-900 text-amber-400 p-2.5 rounded-xl font-mono text-xs font-bold whitespace-pre-line text-center">
                ${f.formula}
              </div>
              <div class="text-[11px] text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-100 whitespace-pre-line">
                ${f.sample}
              </div>
              <div class="text-[10px] text-indigo-700 font-bold">
                💡 ${f.essence}
              </div>
            </div>
          `
            )
            .join("")}
        </div>

        <!-- サブネット早見表 -->
        <div class="space-y-2 pt-2">
          <h3 class="text-xs font-bold text-slate-700">サブネットマスク＆ホスト数 早見表</h3>
          <div class="bg-white rounded-2xl p-3 shadow-sm border border-slate-200 overflow-x-auto">
            <table class="w-full text-left text-[10px] font-mono border-collapse">
              <thead class="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
                <tr>
                  <th class="p-1.5">CIDR</th>
                  <th class="p-1.5">サブネットマスク</th>
                  <th class="p-1.5">利用可能ホスト</th>
                  <th class="p-1.5">典型用途</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                ${logicData.subnetTable
                  .map(
                    (row) => `
                  <tr>
                    <td class="p-1.5 font-bold text-indigo-700">${row.prefix}</td>
                    <td class="p-1.5">${row.mask}</td>
                    <td class="p-1.5 font-bold text-emerald-600">${row.usableHosts}台</td>
                    <td class="p-1.5 text-slate-500 font-sans text-[9px]">${row.usage}</td>
                  </tr>
                `
                  )
                  .join("")}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }

  function bindEtymologyEvents() {
    const inputSearch = container.querySelector("#input-ety-search");
    if (inputSearch) {
      inputSearch.oninput = (e) => {
        searchQuery = e.target.value;
        render();
        const newIn = container.querySelector("#input-ety-search");
        if (newIn) {
          newIn.focus();
          newIn.setSelectionRange(searchQuery.length, searchQuery.length);
        }
      };
    }

    container.querySelectorAll(".btn-ety-cat").forEach((btn) => {
      btn.onclick = () => {
        selectedCategory = btn.getAttribute("data-cat");
        render();
      };
    });

    container.querySelectorAll(".btn-toggle-ety").forEach((btn) => {
      btn.onclick = () => {
        const id = btn.getAttribute("data-ety-id");
        openedEtyId = openedEtyId === id ? null : id;
        render();
      };
    });
  }

  render();
}
