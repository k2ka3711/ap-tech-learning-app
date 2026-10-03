// AP Tech Master - サブネットマスク＆CIDRビット計算機
// 2進数ビットの境界線（/24〜/30）をスライダーで動かし、アドレス範囲とホスト数を直感体感

export function renderSubnetCalculator(container) {
  let ipStr = "192.168.10.75";
  let prefix = 26;

  function parseIp(ip) {
    const parts = ip.split(".").map(Number);
    if (parts.length !== 4 || parts.some(n => isNaN(n) || n < 0 || n > 255)) {
      return [192, 168, 10, 0];
    }
    return parts;
  }

  function to32Bit(parts) {
    return ((parts[0] << 24) >>> 0) | ((parts[1] << 16) >>> 0) | ((parts[2] << 8) >>> 0) | (parts[3] >>> 0);
  }

  function from32Bit(num) {
    return [
      (num >>> 24) & 255,
      (num >>> 16) & 255,
      (num >>> 8) & 255,
      num & 255
    ].join(".");
  }

  function toBinString(num) {
    return (num >>> 0).toString(2).padStart(32, "0");
  }

  function calculateSubnet() {
    const parts = parseIp(ipStr);
    const ipNum = to32Bit(parts);
    const maskNum = prefix === 0 ? 0 : (~0 << (32 - prefix)) >>> 0;
    const netNum = (ipNum & maskNum) >>> 0;
    const bcastNum = (netNum | (~maskNum >>> 0)) >>> 0;

    const hostBits = 32 - prefix;
    const totalAddresses = Math.pow(2, hostBits);
    const usableHosts = hostBits <= 1 ? 0 : totalAddresses - 2;

    const firstUsable = usableHosts > 0 ? from32Bit(netNum + 1) : "なし";
    const lastUsable = usableHosts > 0 ? from32Bit(bcastNum - 1) : "なし";

    return {
      ipStr: from32Bit(ipNum),
      maskStr: from32Bit(maskNum),
      netStr: from32Bit(netNum),
      bcastStr: from32Bit(bcastNum),
      usableRange: usableHosts > 0 ? `${firstUsable} 〜 ${lastUsable}` : "なし (対向専用)",
      hostBits,
      totalAddresses,
      usableHosts,
      ipBin: toBinString(ipNum),
      maskBin: toBinString(maskNum)
    };
  }

  function updateView() {
    const res = calculateSubnet();

    container.innerHTML = `
      <div class="space-y-4">
        <!-- 語源バナー -->
        <div class="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs leading-relaxed text-blue-900">
          <div class="font-bold flex items-center gap-1.5 text-blue-700 mb-1">
            <span class="text-base">🔤</span> CIDR (サイダー) の語源
          </div>
          <b>Classless Inter-Domain Routing</b>（クラスの縛りを無くした経路制御）。<br>
          昔は「クラスC＝254台固定」で融通が利きませんでしたが、CIDRのおかげで「/26（62台）」や「/28（14台）」など、会社の規模に合わせてハサミで自由に切り分けられるようになりました！
        </div>

        <!-- 入力コントロール -->
        <div class="bg-white rounded-xl p-4 shadow-sm border border-slate-200 space-y-3">
          <div>
            <label class="text-xs font-bold text-slate-700 block mb-1">基準IPアドレス:</label>
            <div class="flex gap-2">
              <input id="input-ip" type="text" value="${ipStr}" class="flex-1 px-3 py-1.5 text-xs font-mono border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <button id="btn-ip-apply" class="px-3 py-1.5 bg-slate-800 text-white text-xs font-bold rounded-lg hover:bg-slate-700">更新</button>
            </div>
          </div>

          <div>
            <div class="flex justify-between items-center mb-1">
              <label class="text-xs font-bold text-slate-700">プレフィックス長 (CIDR):</label>
              <span class="text-sm font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                /${prefix}
              </span>
            </div>
            <input id="slider-prefix" type="range" min="16" max="30" value="${prefix}" class="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600">
            <div class="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>/16 (大企業向け)</span>
              <span>/24 (標準LAN)</span>
              <span>/30 (ルータ間1対1)</span>
            </div>
          </div>
        </div>

        <!-- 32ビット視覚化バー -->
        <div class="bg-white rounded-xl p-4 shadow-sm border border-slate-200 space-y-2">
          <div class="flex justify-between items-center text-xs font-bold">
            <span class="text-slate-700">32ビットの境界線（ビット解剖）</span>
            <div class="flex items-center gap-2 text-[10px]">
              <span class="flex items-center gap-1 text-blue-700 font-bold"><span class="w-2 h-2 rounded-full bg-blue-600 inline-block"></span> ネットワーク部 (${prefix}bit)</span>
              <span class="flex items-center gap-1 text-amber-700 font-bold"><span class="w-2 h-2 rounded-full bg-amber-500 inline-block"></span> ホスト部 (${res.hostBits}bit)</span>
            </div>
          </div>

          <!-- ビットストリップ -->
          <div class="p-2 bg-slate-900 rounded-lg font-mono text-[11px] tracking-wider text-center select-none overflow-x-auto">
            <div class="inline-flex">
              ${res.ipBin
                .split("")
                .map((bit, idx) => {
                  const isNet = idx < prefix;
                  const isOctetBorder = (idx + 1) % 8 === 0 && idx !== 31;
                  return `
                    <span class="${isNet ? "text-blue-400 font-bold" : "text-amber-400 font-bold"} ${
                      idx === prefix - 1 ? "border-r-2 border-rose-500 pr-0.5 mr-0.5" : ""
                    }">
                      ${bit}${isOctetBorder ? `<span class="text-slate-600 mx-1">.</span>` : ""}
                    </span>
                  `;
                })
                .join("")}
            </div>
          </div>
          <div class="text-[10px] text-slate-500 text-center">
            赤線が <b>/${prefix}</b> の境界！左側が固定される住所、右側が端末に自由に配れる番号です。
          </div>
        </div>

        <!-- 計算結果カード -->
        <div class="bg-white rounded-xl p-4 shadow-sm border border-slate-200 space-y-2.5 text-xs">
          <div class="font-bold text-slate-800 border-b border-slate-100 pb-2 flex items-center justify-between">
            <span>サブネット計算結果</span>
            <span class="text-[11px] text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded font-bold">
              マスク: ${res.maskStr}
            </span>
          </div>

          <div class="grid grid-cols-2 gap-2">
            <div class="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              <div class="text-[10px] text-slate-400 font-bold">ネットワークアドレス (ホスト部全0)</div>
              <div class="text-xs font-mono font-bold text-blue-700">${res.netStr}</div>
              <div class="text-[9px] text-slate-400 mt-0.5">※ネットワーク自身を指すため端末割当不可</div>
            </div>

            <div class="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              <div class="text-[10px] text-slate-400 font-bold">ブロードキャスト (ホスト部全1)</div>
              <div class="text-xs font-mono font-bold text-rose-700">${res.bcastStr}</div>
              <div class="text-[9px] text-slate-400 mt-0.5">※全端末への一斉送信専用のため割当不可</div>
            </div>
          </div>

          <div class="bg-emerald-50 border border-emerald-200 p-2.5 rounded-lg">
            <div class="flex justify-between items-center mb-1">
              <span class="text-[10px] font-bold text-emerald-800">利用可能な端末（ホスト）アドレス範囲:</span>
              <span class="text-xs font-black text-emerald-700">最大 ${res.usableHosts} 台</span>
            </div>
            <div class="font-mono text-xs font-bold text-emerald-900">${res.usableRange}</div>
          </div>
        </div>
      </div>
    `;

    // イベントバインド
    const inputIp = container.querySelector("#input-ip");
    const slider = container.querySelector("#slider-prefix");

    container.querySelector("#btn-ip-apply").onclick = () => {
      ipStr = inputIp.value.trim();
      updateView();
    };

    slider.oninput = (e) => {
      prefix = parseInt(e.target.value, 10);
      updateView();
    };
  }

  updateView();
}
