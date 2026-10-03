// AP Tech Master - 午後記述ロジック集＆公式・早見表データ
// 午後の記述式問題で頻出の「なぜ？」「どう対策する？」を論理的に30〜40字で書くための黄金フレーズ集

export const logicData = {
  // 午後記述フレーズ集
  descriptivePhrases: [
    {
      id: "logic-crypto-hybrid",
      category: "security",
      categoryLabel: "セキュリティ・暗号",
      question: "なぜ通信の暗号化に公開鍵暗号方式単体ではなく、ハイブリッド暗号方式を用いるのか？（35字以内）",
      modelAnswer: "共通鍵暗号の処理の高速性と、公開鍵暗号の鍵配送の安全性を両立させるため。",
      length: 38,
      pointKeywords: ["処理の高速性", "鍵配送の安全性", "両立"],
      background: "公開鍵暗号（RSA等）は数学的に非常に重い計算を伴うため、大容量データの暗号化には向きません。一方、共通鍵暗号（AES等）は爆速ですが、事前に安全に鍵を送る手段がありません。そこで『データの暗号化は共通鍵で行い、その共通鍵の受け渡しだけを公開鍵で行う』ハイブリッド暗号が考案されました。"
    },
    {
      id: "logic-deadlock-prevention",
      category: "database",
      categoryLabel: "データベース・排他制御",
      question: "トランザクションのデッドロックを防止するために、アプリケーション設計において徹底すべき原則は何か？（45字以内）",
      modelAnswer: "複数の資源をロックする際、全トランザクションであらかじめ定めた同一の順序でロックを獲得する。",
      length: 42,
      pointKeywords: ["同一の順序", "ロックを獲得", "全トランザクション"],
      background: "デッドロックは『トランザクションAが資源1をロックして資源2を待ち、トランザクションBが資源2をロックして資源1を待つ』という循環待ち（閉路）で発生します。すべての処理が必ず『資源1 → 資源2』の決まった順序でしかロックを要求しないルールを徹底すれば、循環待ちは構造的に発生しなくなります。"
    },
    {
      id: "logic-dnssec",
      category: "security",
      categoryLabel: "ネットワーク・セキュリティ",
      question: "DNSキャッシュポイズニングの根本的な防止策としてDNSSECを導入する理由は何か？（40字以内）",
      modelAnswer: "DNS応答レコードに電子署名を付与し、送信元の真正性とデータの非改ざん性を検証するため。",
      length: 39,
      pointKeywords: ["電子署名", "送信元の真正性", "データの非改ざん性"],
      background: "攻撃者が偽のDNS応答（偽のIPアドレス）をキャッシュサーバに送り込む攻撃です。送信元ポート番号をランダム化（ソースポートランダマイゼーション）しても攻撃試行回数を増やせば突破される危険があります。DNSSECではゾーン情報に電子署名（RRSIG）を付与し、公開鍵暗号で検証するため、偽装応答を確実に弾くことができます。"
    },
    {
      id: "logic-db-normalization",
      category: "database",
      categoryLabel: "データベース設計",
      question: "関係データベースにおいて、第3正規化までテーブルを分割する目的は何か？（40字以内）",
      modelAnswer: "データの重複を排除し、データの追加・更新・削除に伴う不整合や更新時異状を防止するため。",
      length: 38,
      pointKeywords: ["データの重複を排除", "不整合", "更新時異状の防止"],
      background: "1つのテーブルに社員情報と部署名が同居していると、部署名が変わったときに全レコードを更新する必要が生じ（更新異状）、途中で失敗するとデータに矛盾が生じます。また社員が0人の部署を登録できない（挿入異状）、社員が退職したら部署情報まで消える（削除異状）が起きます。正規化はこれらの保守リスクをゼロにするための作業です。"
    },
    {
      id: "logic-salt-hash",
      category: "security",
      categoryLabel: "認証・セキュリティ",
      question: "パスワードをハッシュ化して保存する際、ソルト（Salt）を付加する目的は何か？（40字以内）",
      modelAnswer: "同一パスワードのハッシュ値同一化を防ぎ、レインボーテーブル攻撃を無効化するため。",
      length: 38,
      pointKeywords: ["同一パスワード", "レインボーテーブル攻撃", "無効化"],
      background: "ただハッシュ化（SHA-256など）するだけだと、同じパスワードを使っているユーザーのハッシュ値が全く同じになってしまいます。また、事前に計算されたハッシュ値の逆引き辞書（レインボーテーブル）を使えば即座にパスワードを特定されてしまいます。ユーザーごとにランダムな文字列（ソルト）をくっつけてからハッシュ化することで、辞書攻撃を完全に無力化できます。"
    },
    {
      id: "logic-vlan-segmentation",
      category: "network",
      categoryLabel: "ネットワーク設計",
      question: "企業ネットワークにおいて、スイッチでVLANを構成してセグメントを分割する利点は何か？（35字以内）",
      modelAnswer: "ブロードキャストフレームの到達範囲を限定し、トラフィック軽減とセキュリティを向上させる。",
      length: 37,
      pointKeywords: ["ブロードキャスト", "到達範囲を限定", "トラフィック軽減", "セキュリティ向上"],
      background: "フラットな1つのネットワークだと、ARPなどのブロードキャストパケットが全PCに届いて帯域を圧迫します。また、営業部と開発部のパケットが盗聴・覗き見されるリスクがあります。VLAN（Virtual LAN）で論理的に分割すれば、物理配線を変えずにブロードキャストドメインを閉じ込め、通信を安全に分離できます。"
    }
  ],

  // 重要計算公式＆チートシート
  cheatSheets: [
    {
      id: "formula-effective-access-time",
      title: "キャッシュメモリの実効アクセス時間",
      category: "processor",
      formula: "T = h × Tc + (1 - h) × Tm",
      variables: [
        { symbol: "T", name: "実効アクセス時間" },
        { symbol: "h", name: "キャッシュのヒット率 (0 ≦ h ≦ 1)" },
        { symbol: "Tc", name: "キャッシュメモリのアクセス時間" },
        { symbol: "Tm", name: "主記憶（メインメモリ）のアクセス時間" }
      ],
      sample: "例: ヒット率 80% (0.8)、キャッシュ 10ns、主記憶 60ns の場合\nT = 0.8 × 10 + (1 - 0.8) × 60 = 8 + 12 = 20ns",
      essence: "「ヒットしたときはキャッシュの速さで済み、外れたときは主記憶まで取りに行く」という期待値（加重平均）の計算です。"
    },
    {
      id: "formula-availability",
      title: "システムの稼働率（直列・並列）",
      category: "system",
      formula: "直列: R = R1 × R2\n並列: R = 1 - (1 - R1) × (1 - R2)",
      variables: [
        { symbol: "R", name: "システム全体の稼働率" },
        { symbol: "R1, R2", name: "各サブシステムの稼働率" }
      ],
      sample: "例: 稼働率 0.9 のサーバ2台の場合\n直列: 0.9 × 0.9 = 0.81 (1台でも落ちたらアウトなので下がる)\n並列: 1 - (0.1 × 0.1) = 0.99 (両方同時に落ちない限り動くので劇的に上がる)",
      essence: "直列は「かけ算（下がる）」、並列は「1から全滅確率を引く（上がる）」と覚えると絶対に忘れません。"
    },
    {
      id: "formula-transmission-time",
      title: "データ伝送時間と回線利用率",
      category: "network",
      formula: "伝送時間 = データ量(bit) ÷ (回線速度(bps) × 回線利用率)",
      variables: [
        { symbol: "データ量", name: "Byte を bit に直すため 8倍 することを忘れない！" },
        { symbol: "回線速度", name: "bps (bits per second)。1Mbps = 10^6 bps" },
        { symbol: "回線利用率", name: "実効効率 (例: 50% なら 0.5 を掛ける)" }
      ],
      sample: "例: 2Mバイトのファイルを 10Mbps (利用率 40%) の回線で送る時間\n2MB = 2 × 10^6 × 8 = 16,000,000 bit\n実効速度 = 10,000,000 × 0.4 = 4,000,000 bps\n時間 = 16,000,000 ÷ 4,000,000 = 4秒",
      essence: "試験の最大の引っ掛けは「バイト（B）とビット（b）の換算（8倍）忘れ」です！"
    }
  ],

  // サブネットマスク＆ホスト数 早見表
  subnetTable: [
    { prefix: "/24", mask: "255.255.255.0", hostBits: 8, totalHosts: 256, usableHosts: 254, usage: "標準的な小規模フロアLAN" },
    { prefix: "/25", mask: "255.255.255.128", hostBits: 7, totalHosts: 128, usableHosts: 126, usage: "100人規模の部署" },
    { prefix: "/26", mask: "255.255.255.192", hostBits: 6, totalHosts: 64, usableHosts: 62, usage: "50人規模の課・チーム" },
    { prefix: "/27", mask: "255.255.255.224", hostBits: 5, totalHosts: 32, usableHosts: 30, usage: "20〜30人規模の会議室" },
    { prefix: "/28", mask: "255.255.255.240", hostBits: 4, totalHosts: 16, usableHosts: 14, usage: "DMZやサーバ設置セグメント" },
    { prefix: "/29", mask: "255.255.255.248", hostBits: 3, totalHosts: 8, usableHosts: 6, usage: "小規模ルータ間接続・テスト環境" },
    { prefix: "/30", mask: "255.255.255.252", hostBits: 2, totalHosts: 4, usableHosts: 2, usage: "ルータ間の1対1対向接続（Point-to-Point）" }
  ]
};
