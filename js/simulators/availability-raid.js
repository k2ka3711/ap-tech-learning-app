// AP Tech Master - システム稼働率サンドボックス＆RAID 5パリティ復元シミュレータ
// 「直列で下がり並列で跳ね上がる理由」と「RAID 5のXOR復元の仕組み」を目撃する

export function renderAvailabilityRaidSimulator(container) {
  let activeTab = "raid"; // 'avail' or 'raid'
  
  // 稼働率ステート
  let r1 = 0.90;
  let r2 = 0.90;

  // RAID 5 ステート
  // 4台構成: Disk A, Disk B, Disk C, Disk P (Parity)
  // 初期データビット列 (4bit)
  const diskData = {
    A: [1, 0, 1, 1],
    B: [1, 1, 0, 0],
    C: [0, 1, 1, 0]
  };
  // P = A ^ B ^ C
  function calculateParity(a, b, c) {
    return a.map((val, idx) => val ^ b[idx] ^ c[idx]);
  }

  let brokenDisk = null; // 'A', 'B', 'C', 'P' or null
  let recoveredData = null;

  function updateView() {
    const parity = calculateParity(diskData.A, diskData.B, diskData.C);
    const disks = {
      A: { label: "Disk 1 (Data A)", data: diskData.A },
      B: { label: "Disk 2 (Data B)", data: diskData.B },
      C: { label: "Disk 3 (Data C)", data: diskData.C },
      P: { label: "Disk 4 (Parity P)", data: parity }
    };

    // 稼働率計算
    const seriesR = r1 * r2;
    const parallelR = 1 - (1 - r1) * (1 - r2);

    container.innerHTML = `
      <div class="space-y-4">
        <!-- サブタブ切替 -->
        <div class="flex rounded-xl bg-slate-100 p-1 border border-slate-200">
          <button id="btn-tab-raid" class="flex-1 py-1.5 text-xs font-bold rounded-lg transition ${
            activeTab === "raid" ? "bg-white text-indigo-700 shadow-sm" : "text-slate-600"
          }">
            🛠️ RAID 5 パリティ復元体験
          </button>
          <button id="btn-tab-avail" class="flex-1 py-1.5 text-xs font-bold rounded-lg transition ${
            activeTab === "avail" ? "bg-white text-indigo-700 shadow-sm" : "text-slate-600"
          }">
            📈 稼働率（直列・並列）サンドボックス
          </button>
        </div>

        ${
          activeTab === "raid"
            ? `
          <!-- RAID 5 画面 -->
          <div class="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs leading-relaxed text-amber-900">
            <div class="font-bold flex items-center gap-1.5 text-amber-700 mb-1">
              <span class="text-base">🔤</span> RAIDの語源とXORの魔法
            </div>
            <b>Redundant Array of Inexpensive Disks</b>（安価なディスクの冗長配列）。<br>
            RAID 5のパリティは「排他的論理和（XOR: 1の個数が奇数なら1）」。どれか1台が壊れても、<b>残りの3台のビットをXORするだけで元のデータが100%蘇ります！</b>
          </div>

          <!-- 4台のHDDビジュアル -->
          <div class="bg-white rounded-xl p-4 shadow-sm border border-slate-200 space-y-3">
            <div class="flex justify-between items-center text-xs">
              <span class="font-bold text-slate-700">RAID 5 ストレージプール (4台構成)</span>
              <span class="text-[10px] text-slate-400">1台故障まで耐用</span>
            </div>

            <div class="grid grid-cols-4 gap-2">
              ${Object.keys(disks)
                .map((key) => {
                  const d = disks[key];
                  const isBroken = brokenDisk === key;
                  return `
                    <div class="rounded-xl border-2 p-2 flex flex-col items-center justify-between text-center transition-all ${
                      isBroken
                        ? "border-rose-500 bg-rose-50 text-rose-800 ring-2 ring-rose-300"
                        : key === "P"
                        ? "border-amber-400 bg-amber-50/50 text-slate-800"
                        : "border-slate-300 bg-slate-50 text-slate-800"
                    }">
                      <div class="text-[10px] font-bold truncate w-full">${key === "P" ? "パリティ" : `Disk ${key}`}</div>
                      <div class="my-2">
                        ${isBroken ? "💥 故障" : key === "P" ? "🛡️ 正常" : "💾 正常"}
                      </div>
                      <div class="font-mono text-xs font-black tracking-widest ${isBroken ? "line-through text-rose-400" : ""}">
                        ${isBroken && !recoveredData ? "????" : isBroken && recoveredData ? recoveredData.join("") : d.data.join("")}
                      </div>
                      <button data-disk="${key}" class="btn-break-disk mt-2 w-full py-1 text-[10px] font-bold rounded ${
                        isBroken ? "bg-slate-300 text-slate-600" : "bg-rose-100 text-rose-700 hover:bg-rose-200"
                      }">
                        ${isBroken ? "故障中" : "壊す!"}
                      </button>
                    </div>
                  `;
                })
                .join("")}
            </div>

            <!-- アクション操作 -->
            <div class="pt-2 border-t border-slate-100 flex items-center justify-between">
              <div class="text-xs">
                ${
                  !brokenDisk
                    ? "いずれかの「壊す!」ボタンを押してディスク障害を起こしてください。"
                    : recoveredData
                    ? "🎉 <b class='text-emerald-600'>復元完了！</b> 残りの3台からデータが完全に再現されました！"
                    : `⚠️ <b>Disk ${brokenDisk}</b> がクラッシュしました！データが欠損しています。`
                }
              </div>
              <div class="flex gap-2">
                ${
                  brokenDisk && !recoveredData
                    ? `<button id="btn-recover-raid" class="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold animate-bounce shadow">
                        🛠️ XORで復元
                      </button>`
                    : ""
                }
                ${
                  brokenDisk
                    ? `<button id="btn-reset-raid" class="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 text-xs font-bold">
                        元に戻す
                      </button>`
                    : ""
                }
              </div>
            </div>
          </div>
        `
            : `
          <!-- 稼働率画面 -->
          <div class="bg-indigo-50 border border-indigo-200 rounded-xl p-3 text-xs leading-relaxed text-indigo-900">
            <div class="font-bold flex items-center gap-1.5 text-indigo-700 mb-1">
              <span class="text-base">📈</span> 直列と並列の本質
            </div>
            ・<b>直列</b>: 1台でも死んだら全滅 ➔ かけ算するので<b>必ず単体より下がる</b>（0.9 × 0.9 = 0.81）<br>
            ・<b>並列</b>: 両方同時に死なない限り動く ➔ 1から全滅確率を引くので<b>劇的に跳ね上がる</b>（1 - 0.1×0.1 = 0.99）
          </div>

          <!-- スライダー調整 -->
          <div class="bg-white rounded-xl p-4 shadow-sm border border-slate-200 space-y-3">
            <div>
              <div class="flex justify-between text-xs font-bold text-slate-700 mb-1">
                <span>サーバ1の稼働率 (R1):</span>
                <span class="text-indigo-600 font-mono">${(r1 * 100).toFixed(1)}%</span>
              </div>
              <input id="slider-r1" type="range" min="80" max="99" value="${Math.round(r1 * 100)}" class="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600">
            </div>

            <div>
              <div class="flex justify-between text-xs font-bold text-slate-700 mb-1">
                <span>サーバ2の稼働率 (R2):</span>
                <span class="text-indigo-600 font-mono">${(r2 * 100).toFixed(1)}%</span>
              </div>
              <input id="slider-r2" type="range" min="80" max="99" value="${Math.round(r2 * 100)}" class="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600">
            </div>
          </div>

          <!-- 比較カード -->
          <div class="grid grid-cols-2 gap-3">
            <div class="bg-white p-3.5 rounded-xl border border-slate-200 text-center space-y-1">
              <div class="text-[10px] font-bold text-slate-400">直列接続 (1台停止で即死)</div>
              <div class="text-xl font-black text-rose-600 font-mono">${(seriesR * 100).toFixed(2)}%</div>
              <div class="text-[9px] text-slate-500 font-mono">R = R1 × R2</div>
              <div class="text-[10px] text-rose-500 font-bold mt-1">📉 単体より低下</div>
            </div>

            <div class="bg-white p-3.5 rounded-xl border border-slate-200 text-center space-y-1">
              <div class="text-[10px] font-bold text-slate-400">並列接続 (冗長化・待機系)</div>
              <div class="text-xl font-black text-emerald-600 font-mono">${(parallelR * 100).toFixed(2)}%</div>
              <div class="text-[9px] text-slate-500 font-mono">1 - (1 - R1)(1 - R2)</div>
              <div class="text-[10px] text-emerald-600 font-bold mt-1">🚀 圧倒的な高信頼性</div>
            </div>
          </div>
        `
        }
      </div>
    `;

    // イベントバインド
    container.querySelector("#btn-tab-raid").onclick = () => {
      activeTab = "raid";
      updateView();
    };
    container.querySelector("#btn-tab-avail").onclick = () => {
      activeTab = "avail";
      updateView();
    };

    if (activeTab === "raid") {
      container.querySelectorAll(".btn-break-disk").forEach((btn) => {
        btn.onclick = () => {
          brokenDisk = btn.getAttribute("data-disk");
          recoveredData = null;
          updateView();
        };
      });

      const btnRecover = container.querySelector("#btn-recover-raid");
      if (btnRecover) {
        btnRecover.onclick = () => {
          // 復元ロジック: 壊れていない3台のXOR
          const remaining = Object.keys(disks).filter((k) => k !== brokenDisk);
          const d1 = disks[remaining[0]].data;
          const d2 = disks[remaining[1]].data;
          const d3 = disks[remaining[2]].data;
          recoveredData = d1.map((v, i) => v ^ d2[i] ^ d3[i]);
          updateView();
        };
      }

      const btnReset = container.querySelector("#btn-reset-raid");
      if (btnReset) {
        btnReset.onclick = () => {
          brokenDisk = null;
          recoveredData = null;
          updateView();
        };
      }
    } else {
      const s1 = container.querySelector("#slider-r1");
      const s2 = container.querySelector("#slider-r2");
      s1.oninput = (e) => {
        r1 = parseInt(e.target.value, 10) / 100;
        updateView();
      };
      s2.oninput = (e) => {
        r2 = parseInt(e.target.value, 10) / 100;
        updateView();
      };
    }
  }

  updateView();
}
