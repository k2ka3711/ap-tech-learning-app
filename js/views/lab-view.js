// AP Tech Master - ビジュアル・ラボ画面コントローラ
// 6大シミュレータの選択とマウントを制御

import { renderPipelineSimulator } from "../simulators/pipeline.js";
import { renderMemoryPageSimulator } from "../simulators/memory-page.js";
import { renderSubnetCalculator } from "../simulators/subnet-calc.js";
import { renderCryptoFlowSimulator } from "../simulators/crypto-flow.js";
import { renderAvailabilityRaidSimulator } from "../simulators/availability-raid.js";
import { renderDbNormalizeSimulator } from "../simulators/db-normalize.js";

export function renderLabView(container, state, onNavigate) {
  const labItems = [
    {
      id: "pipeline",
      title: "パイプライン＆フォワーディング",
      sub: "CPU内部の5段分業とRAWハザード解消",
      icon: "⚡",
      category: "processor",
      render: renderPipelineSimulator
    },
    {
      id: "memory",
      title: "仮想記憶 LRU / FIFO ページ置換",
      sub: "時間的局所性とキャッシュ置換アルゴリズム",
      icon: "🧠",
      category: "os",
      render: renderMemoryPageSimulator
    },
    {
      id: "subnet",
      title: "サブネットマスク＆CIDRビット計算機",
      sub: "32ビット解剖・VLSM・ホスト範囲計算",
      icon: "🌐",
      category: "network",
      render: renderSubnetCalculator
    },
    {
      id: "crypto",
      title: "公開鍵・署名・ハイブリッド暗号",
      sub: "「誰の鍵で何をする？」TLS通信の完全攻略",
      icon: "🔐",
      category: "security",
      render: renderCryptoFlowSimulator
    },
    {
      id: "raid",
      title: "システム稼働率＆RAID 5復元",
      sub: "直並列の確率計算とXORパリティの奇跡",
      icon: "💾",
      category: "system",
      render: renderAvailabilityRaidSimulator
    },
    {
      id: "normalize",
      title: "DB正規化ステップパズル",
      sub: "更新時異状の悲劇と第1〜第3正規化の分離",
      icon: "🗄️",
      category: "database",
      render: renderDbNormalizeSimulator
    }
  ];

  let selectedLabId = state.currentLabId || "pipeline";

  function render() {
    const curLab = labItems.find((l) => l.id === selectedLabId) || labItems[0];

    container.innerHTML = `
      <div class="space-y-4 pb-20">
        <!-- ラボセレクター（横スクロールチップ） -->
        <div class="overflow-x-auto pb-1 -mx-4 px-4 scrollbar-none">
          <div class="flex gap-2 min-w-max">
            ${labItems
              .map(
                (item) => `
              <button data-lab-id="${item.id}" class="btn-select-lab px-3 py-2 rounded-xl text-left border transition flex items-center gap-2 ${
                  item.id === selectedLabId
                    ? "bg-indigo-600 text-white border-indigo-700 shadow-md ring-2 ring-indigo-200"
                    : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                }">
                <span class="text-lg">${item.icon}</span>
                <div>
                  <div class="text-xs font-bold whitespace-nowrap">${item.title}</div>
                  <div class="text-[9px] ${item.id === selectedLabId ? "text-indigo-100" : "text-slate-400"} truncate max-w-[140px]">
                    ${item.sub}
                  </div>
                </div>
              </button>
            `
              )
              .join("")}
          </div>
        </div>

        <!-- シミュレータマウント領域 -->
        <div id="simulator-mount-target" class="transition-all"></div>
      </div>
    `;

    // イベントバインド
    container.querySelectorAll(".btn-select-lab").forEach((btn) => {
      btn.onclick = () => {
        selectedLabId = btn.getAttribute("data-lab-id");
        state.currentLabId = selectedLabId;
        render();
      };
    });

    // 選択されたシミュレータをマウント
    const target = container.querySelector("#simulator-mount-target");
    if (target && curLab) {
      curLab.render(target);
    }
  }

  render();
}
