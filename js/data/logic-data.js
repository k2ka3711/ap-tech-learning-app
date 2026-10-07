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
    },
    {
      id: "logic-b-tree-range",
      category: "database",
      categoryLabel: "データベース・インデックス",
      question: "B+木インデックスにおいて、範囲検索（BETWEEN等）が高速に行える構造上の理由は何か？（40字以内）",
      modelAnswer: "最下層の全葉ノードがキー順にポインタで双方向チェーン状に連結されているため。",
      length: 37,
      pointKeywords: ["葉ノード", "ポインタで連結", "双方向チェーン", "キー順"],
      background: "通常の二分木では範囲検索をする際に親や兄弟ノードを行き来するバックトラックが必要ですが、B+木は実データを持つ葉（Leaf）ノード同士が横方向のポインタで数珠繋ぎになっているため、開始キーを一度特定したら、あとは葉を横に流れるように連続読み出しできます。"
    },
    {
      id: "logic-two-phase-locking",
      category: "database",
      categoryLabel: "データベース・並行処理",
      question: "2相ロッキングプロトコル（2PL）を適用することで保証される性質は何か？（25字以内）",
      modelAnswer: "並行実行されるトランザクションの直列可能性が保証される。",
      length: 25,
      pointKeywords: ["直列可能性", "保証"],
      background: "ロックを獲得するだけの「成長相」と、ロックを解放するだけの「縮小相」に分けることで、複数のトランザクションが同時に走っても、まるで1つずつ順番に直列実行したかのような一貫した状態を保証します。ただしデッドロックは防止できない点に注意が必要です。"
    },
    {
      id: "logic-tcp-sliding-window",
      category: "network",
      categoryLabel: "トランスポート層・TCP",
      question: "TCPのスライディングウィンドウ制御が伝送スループットを向上させる理由は何か？（40字以内）",
      modelAnswer: "確認応答（ACK）の受信を待たずに、ウィンドウサイズ分のデータを連続送信できるため。",
      length: 40,
      pointKeywords: ["確認応答の受信を待たずに", "ウィンドウサイズ分", "連続送信"],
      background: "1個パケットを送るたびに相手からのACKを待っていると、往復遅延時間（RTT）のせいで回線帯域のほとんどが無駄になります。ウィンドウ制御では、相手が受信可能なバッファ容量（ウィンドウサイズ）の範囲内であれば、ACKを待たずに一気にまとめてパイプライン送信するため、高遅延な回線でも最大スループットが出せます。"
    },
    {
      id: "logic-nat-inbound-block",
      category: "network",
      categoryLabel: "ネットワーク・NAT/NAPT",
      question: "NAPT環境において、インターネット外部から社内PCへ直接通信を開始できない理由は何か？（40字以内）",
      modelAnswer: "ルータのポート変換テーブルに社内端末と紐付く事前の対応エントリが存在しないため。",
      length: 39,
      pointKeywords: ["ポート変換テーブル", "対応エントリが存在しない", "社内端末"],
      background: "社内PCから外へ出て行く通信があれば、ルータが『グローバルIPの〇番ポート ⇔ 社内IPの△番ポート』という対応表（セッションテーブル）を動的に作成します。しかし外部からいきなり通信が来ても、どの社内PC宛てなのか変換表に対応がないため、ルータはパケットを破棄するしかありません。"
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
    },
    {
      id: "table-isolation-levels",
      title: "トランザクション分離レベルと並行処理異常",
      category: "database",
      formula: "直列可能性 ＞ 反復可能読み ＞ 読取確定 ＞ 読取未確定",
      variables: [
        { symbol: "Dirty Read", name: "未コミットの更新途中データを他者が読めてしまう現象" },
        { symbol: "Non-repeatable Read", name: "同じ行を2回読んだとき、他者のコミットによって値が変わる現象" },
        { symbol: "Phantom Read", name: "同じ条件で2回範囲検索したとき、他者の挿入によって行数が増減する現象" }
      ],
      sample: "【分離レベルと発生マトリクス】\n・Read Uncommitted: Dirty(発生) / Non-rep(発生) / Phantom(発生)\n・Read Committed: Dirty(防止) / Non-rep(発生) / Phantom(発生) ※多くのDBのデフォルト\n・Repeatable Read: Dirty(防止) / Non-rep(防止) / Phantom(発生)\n・Serializable: Dirty(防止) / Non-rep(防止) / Phantom(防止) ※完全直列化",
      essence: "上に行くほど安全（データ整合性◎）だがロック待ちが増えて遅くなる（並行性×）。実務と試験ではこのトレードオフが最重要！"
    },
    {
      id: "table-tcp-udp",
      title: "TCP と UDP の決定的対比チートシート",
      category: "network",
      formula: "TCP: 信頼性・順序保証（重厚） vs UDP: 高速・リアルタイム（軽量）",
      variables: [
        { symbol: "通信方式", name: "TCP: コネクション型（3ウェイハンドシェイク） / UDP: コネクションレス型" },
        { symbol: "ヘッダ長", name: "TCP: 20バイト〜60バイト / UDP: 8バイト固定（超軽量）" },
        { symbol: "再送・順序", name: "TCP: シーケンス番号＋ACKで再送・並べ替え / UDP: なし（投げっぱなし）" }
      ],
      sample: "【代表的な利用プロトコル】\n・TCPを使うもの: HTTP/HTTPS, FTP, SMTP/POP3, SSH（1文字も落とせない通信）\n・UDPを使うもの: DNS問合せ, DHCP, NTP, VoIP（音声通話）, QUIC(HTTP/3), 映像配信",
      essence: "「ファイルやWebページ＝TCP」「リアルタイム音声や名指し問い合わせ＝UDP」とイメージすれば迷いません。"
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
