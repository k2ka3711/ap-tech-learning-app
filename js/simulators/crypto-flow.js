// AP Tech Master - 公開鍵暗号・デジタル署名・ハイブリッド暗号シミュレータ
// 「誰のどの鍵を使うのか？」を色分けとステップアニメーションで完全に腹落ちさせる

export function renderCryptoFlowSimulator(container) {
  let mode = "hybrid"; // 'public_enc', 'digital_sig', 'hybrid'
  let step = 1;

  const modes = [
    { id: "hybrid", name: "ハイブリッド暗号 (TLS/SSL)", sub: "実務・Webの標準！速度と安全性の両立" },
    { id: "public_enc", name: "公開鍵暗号（機密性）", sub: "盗聴を防ぐ（ボブの鍵）" },
    { id: "digital_sig", name: "デジタル署名（真正性）", sub: "改ざん・なりすましを防ぐ（アリスの鍵）" }
  ];

  function getStepInfo() {
    if (mode === "hybrid") {
      const steps = [
        {
          num: 1,
          title: "① アリス：共通鍵（セッション鍵）の生成",
          desc: "アリスは今回限りの使い捨ての『共通鍵（セッション鍵🔑）』を1個生成します。この共通鍵で重い本文（メッセージ）を高速に暗号化します。",
          visual: "Alice ➔ [本文] ＋ 🔑共通鍵 ➔ [暗号化された本文📦]"
        },
        {
          num: 2,
          title: "② アリス：共通鍵をボブの『公開鍵』でロック",
          desc: "共通鍵🔑をそのまま送ると盗聴されるので、相手である『ボブの公開鍵🔒』で共通鍵だけを暗号化（二重ロック）します。",
          visual: "🔑共通鍵 ＋ 🔒ボブの公開鍵 ➔ [暗号化された共通鍵✉️]"
        },
        {
          num: 3,
          title: "③ 送信：2つの荷物をインターネット経由で配送",
          desc: "アリスは『暗号化された本文📦』と『暗号化された共通鍵✉️』をボブへ送ります。途中の盗聴者イブはボブの秘密鍵を持っていないため中身を見られません！",
          visual: "Alice ➔ 📦 ＆ ✉️ ➔ (Internet) ➔ Bob"
        },
        {
          num: 4,
          title: "④ ボブ：自分の『秘密鍵』で共通鍵を取り出す",
          desc: "ボブは世界で自分しか持っていない『ボブの秘密鍵🗝️』を使って、暗号化された共通鍵✉️を復号し、🔑共通鍵を取り出します。",
          visual: "[暗号化された共通鍵✉️] ＋ 🗝️ボブの秘密鍵 ➔ 🔑共通鍵"
        },
        {
          num: 5,
          title: "⑤ ボブ：取り出した共通鍵で本文を高速復号！",
          desc: "取り出した🔑共通鍵を使って、暗号化された本文📦を復号し、元のメッセージを安全に読み取ります。これで大容量通信も爆速かつ安全です！",
          visual: "[暗号化された本文📦] ＋ 🔑共通鍵 ➔ [元の本文📖] 読取完了！"
        }
      ];
      return { steps, max: 5 };
    } else if (mode === "public_enc") {
      const steps = [
        {
          num: 1,
          title: "① ボブが鍵ペアを用意",
          desc: "ボブは『ボブの公開鍵（誰に配ってもOK）』と『ボブの秘密鍵（ボブだけが持つ）』のペアを作ります。公開鍵をアリスに渡します。",
          visual: "Bob ➔ 🔒ボブの公開鍵 ➔ Aliceへ配布"
        },
        {
          num: 2,
          title: "② アリスがボブの公開鍵で暗号化",
          desc: "アリスはメッセージを『ボブの公開鍵🔒』でロックして送信します。このロックはボブの秘密鍵でしか開けられません。",
          visual: "Alice: [メッセージ] ＋ 🔒ボブの公開鍵 ➔ [暗号文📦] ➔ 送信"
        },
        {
          num: 3,
          title: "③ ボブが秘密鍵で復号",
          desc: "ボブは自分の『秘密鍵🗝️』で暗号文を開きます。盗聴者イブは秘密鍵がないので絶対に読めません。",
          visual: "Bob: [暗号文📦] ＋ 🗝️ボブの秘密鍵 ➔ [メッセージ📖]"
        }
      ];
      return { steps, max: 3 };
    } else {
      // digital_sig
      const steps = [
        {
          num: 1,
          title: "① アリス：本文のハッシュ値を計算",
          desc: "アリスは本文から一意の要約値（ダイジェスト/ハッシュ値）をSHA-256などで計算します。",
          visual: "Alice: [本文] ➔ SHA-256 ➔ [ハッシュ値 #a1b2]"
        },
        {
          num: 2,
          title: "② アリス：自分の『秘密鍵』で署名（暗号化）",
          desc: "アリスは自分しか持っていない『アリスの秘密鍵🗝️』でハッシュ値を暗号化します。これが『デジタル署名（印鑑）』です！",
          visual: "[ハッシュ値] ＋ 🗝️アリスの秘密鍵 ➔ [デジタル署名✍️]"
        },
        {
          num: 3,
          title: "③ 送信：本文とデジタル署名をセットで送信",
          desc: "アリスは『本文』と『デジタル署名✍️』を一緒にボブに送ります（本文自体は暗号化しなくても改ざん検知は可能）。",
          visual: "Alice ➔ [本文] ＋ [デジタル署名✍️] ➔ Bob"
        },
        {
          num: 4,
          title: "④ ボブ：『アリスの公開鍵』で署名を検証",
          desc: "ボブは『アリスの公開鍵🔒』で署名を復号してハッシュ値Aを取り出します。さらに届いた本文から自力でハッシュ値Bを計算します。AとBが完全に一致すれば『改ざんなし・確実にアリス本人が書いた』と証明されます！",
          visual: "復号したハッシュA === 自力計算したハッシュB ➔ 署名検証成功！"
        }
      ];
      return { steps, max: 4 };
    }
  }

  function updateView() {
    const { steps, max } = getStepInfo();
    const currentStep = steps[step - 1];

    container.innerHTML = `
      <div class="space-y-4">
        <!-- 黄金ルールバナー -->
        <div class="bg-indigo-50 border border-indigo-200 rounded-xl p-3 text-xs leading-relaxed text-indigo-900">
          <div class="font-bold flex items-center gap-1.5 text-indigo-700 mb-1">
            <span class="text-base">🔑</span> 暗号と署名の黄金ルール（これだけで試験クリア！）
          </div>
          ・<b>暗号化</b>: 「相手（ボブ）の<b>公開鍵</b>」でロック ➔ 相手（ボブ）の<b>秘密鍵</b>でしか開かない（機密性）<br>
          ・<b>署名</b>: 「自分（アリス）の<b>秘密鍵</b>」で印を押す ➔ 自分の<b>公開鍵</b>で誰でも本物だと確認できる（真正性）
        </div>

        <!-- モード切替タブ -->
        <div class="flex rounded-xl bg-slate-100 p-1 border border-slate-200">
          ${modes
            .map(
              (m) => `
            <button id="btn-mode-${m.id}" class="flex-1 py-1.5 px-2 text-[11px] font-bold rounded-lg transition text-center ${
                mode === m.id ? "bg-white text-indigo-700 shadow-sm" : "text-slate-600 hover:text-slate-900"
              }">
              <div>${m.name}</div>
            </button>
          `
            )
            .join("")}
        </div>

        <!-- ステップ操作バー -->
        <div class="bg-white rounded-xl p-4 shadow-sm border border-slate-200 space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-slate-700">${currentStep.title}</span>
            <span class="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
              Step ${step} / ${max}
            </span>
          </div>

          <!-- アニメーション・図解カード -->
          <div class="bg-slate-900 text-white rounded-xl p-4 text-center space-y-2">
            <div class="text-[10px] text-slate-400 font-mono">FLOW VISUALIZER</div>
            <div class="py-3 text-sm md:text-base font-bold text-emerald-400 font-mono tracking-wide">
              ${currentStep.visual}
            </div>
            <div class="text-[11px] text-slate-300 leading-relaxed text-left bg-slate-800/80 p-2.5 rounded-lg border border-slate-700">
              ${currentStep.desc}
            </div>
          </div>

          <!-- ボタン群 -->
          <div class="flex items-center justify-between pt-1">
            <button id="btn-crypto-prev" class="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 text-xs font-bold ${
              step === 1 ? "opacity-50 cursor-not-allowed" : ""
            }">
              ◀ 前のステップ
            </button>
            <button id="btn-crypto-next" class="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold ${
              step === max ? "opacity-50 cursor-not-allowed" : ""
            }">
              次のステップ ▶
            </button>
          </div>
        </div>

        <!-- キャラクタ相関図 -->
        <div class="grid grid-cols-2 gap-2 text-xs">
          <div class="bg-white p-3 rounded-xl border border-slate-200">
            <div class="font-bold text-slate-800 flex items-center gap-1 mb-1">
              <span>👩‍💻 送信者: アリス</span>
            </div>
            <div class="text-[11px] text-slate-500 space-y-0.5">
              <div>・アリスの秘密鍵 (アリス専用)</div>
              <div>・アリスの公開鍵 (世界に公開)</div>
            </div>
          </div>

          <div class="bg-white p-3 rounded-xl border border-slate-200">
            <div class="font-bold text-slate-800 flex items-center gap-1 mb-1">
              <span>👨‍💻 受信者: ボブ</span>
            </div>
            <div class="text-[11px] text-slate-500 space-y-0.5">
              <div>・ボブの秘密鍵 (ボブ専用)</div>
              <div>・ボブの公開鍵 (世界に公開)</div>
            </div>
          </div>
        </div>
      </div>
    `;

    // イベントバインド
    modes.forEach((m) => {
      const btn = container.querySelector(`#btn-mode-${m.id}`);
      if (btn) {
        btn.onclick = () => {
          mode = m.id;
          step = 1;
          updateView();
        };
      }
    });

    container.querySelector("#btn-crypto-next").onclick = () => {
      if (step < max) {
        step++;
        updateView();
      }
    };
    container.querySelector("#btn-crypto-prev").onclick = () => {
      if (step > 1) {
        step--;
        updateView();
      }
    };
  }

  updateView();
}
