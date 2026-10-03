// AP Tech Master - 語源・フルスペル・誕生背景ストーリー事典データ
// 丸暗記を排除し、「英単語本来の意味」と「先人の課題解決ドラマ」から本質を腹落ちさせるデータベース

export const etymologyData = [
  // ==========================================
  // 1. システム構成・ストレージ・ハードウェア
  // ==========================================
  {
    id: "raid",
    term: "RAID",
    fullName: "Redundant Array of Independent Disks（旧称: Inexpensive Disks）",
    category: "system",
    categoryLabel: "システム構成・ストレージ",
    breakdown: [
      { word: "Redundant", meaning: "余分な、冗長な（万一の故障に備えた予備がある）" },
      { word: "Array", meaning: "整列、配列（複数台をずらりと並べたもの）" },
      { word: "Independent", meaning: "独立した（現在の業界標準表記。各ディスクが独立して動作する）" },
      { word: "※旧: Inexpensive", meaning: "安価な（1987年の原論文での元の表記。試験では両表記を覚えておくと安心）" },
      { word: "Disks", meaning: "ハードディスク装置群" }
    ],
    essence: "「高価で壊れない1台」を目指すのを諦め、「安物を複数台並べて予備データを持たせる」ことで安さと信頼性を両立した発想の転換。",
    story: "1987年、カリフォルニア大学バークレー校の研究者たちが発表した論文が始まりです。当時、企業用のメインフレーム向け大容量ディスクは数千万円もする超高額機器でした。そこで「安価（Inexpensive）なPC用ディスクを並べて冗長化しよう」というアイデアが提唱されました。その後、業界標準化の過程でSniaやIEEEが「Independent（独立した）」に改訂しました。IPAの試験でも「Independent」が正式表記として使われるため、両方覚えておきましょう。",
    examTip: "AP午後ではRAID 0（ストライピング/高速化のみ）, RAID 1（ミラーリング/容量効率50%）, RAID 5（パリティ分散/n-1台分の容量/1台故障まで耐える）, RAID 6（ダブルパリティ/2台故障耐性）の比較と容量計算・XOR復元が頻出です。"
  },
  {
    id: "mtbf-mttr",
    term: "MTBF / MTTR",
    fullName: "Mean Time Between Failures / Mean Time To Repair",
    category: "system",
    categoryLabel: "システム信頼性",
    breakdown: [
      { word: "Mean", meaning: "平均の（算術平均）" },
      { word: "Time", meaning: "時間" },
      { word: "Between Failures", meaning: "故障（修復完了）と次の故障の『あいだ』の正常稼働時間" },
      { word: "To Repair", meaning: "修理完了『にいたるまで』のダウンタイム" }
    ],
    essence: "MTBFは「修復が完了してから次に壊れるまでの平均時間（信頼性）」、MTTRは「壊れたあとどれだけ早く直せるか（保守性）」。稼働率は MTBF / (MTBF + MTTR)。",
    story: "第二次世界大戦中、軍用電子機器（レーダーや真空管無線機）が頻繁に故障して作戦に支障をきたしたため、工学的に『機器の故障間隔を統計的に予測・管理する』信頼性工学が生まれました。MTBFは「**修復が完了した時点から次に故障するまで**の平均稼働時間」であり、修理中のダウンタイムは含みません。MTTRは「故障発生から修理完了までの平均ダウンタイム」です。Between（あいだ）＝正常に動いている時間、To（〜まで）＝修理にかかる時間、と前置詞で区別すると絶対に迷いません。",
    examTip: "稼働率 R = MTBF / (MTBF + MTTR)。AP午後では「保守要員を増強してMTTRを半分に短縮した場合のシステム稼働率の変化」など、直列・並列構成と絡めた計算問題がよく出ます。"
  },
  {
    id: "dma",
    term: "DMA",
    fullName: "Direct Memory Access",
    category: "processor",
    categoryLabel: "プロセッサ・入出力",
    breakdown: [
      { word: "Direct", meaning: "直接（誰の手も介さずに）" },
      { word: "Memory", meaning: "主記憶（メインメモリ）に" },
      { word: "Access", meaning: "アクセス（読み書き）する" }
    ],
    essence: "CPUを配達員にせず、ハードディスクやLANカードがメモリと直接大容量データをやり取りする専用高速レーン。",
    story: "初期のコンピュータでは、ストレージからメモリにデータを読み込む際、CPUが1バイトずつ「ストレージから読む→レジスタに置く→メモリに書く」という単純作業を延々と仲介していました。その間、頭脳であるCPUは他の高度な計算が一切できず、性能が大きく低下していました。そこで『専用のコントローラ（DMAC）を用意して、CPUを介さずにデバイスと主記憶の間で直接（Direct）転送させよう』と開発されたのがDMAです。CPUは『転送開始の指示』と『終わった後の報告（割り込み）』を受けるだけで済みます。",
    examTip: "AP午前では「入出力装置と主記憶との間でCPUを介さずに行われるデータ転送方式」として頻出。午後はOSの入出力バッファや割り込み処理の文脈で登場します。"
  },

  // ==========================================
  // 2. プロセッサ・OS・メモリ
  // ==========================================
  {
    id: "lru",
    term: "LRU",
    fullName: "Least Recently Used",
    category: "os",
    categoryLabel: "メモリ管理・OS",
    breakdown: [
      { word: "Least", meaning: "最も〜でない（最上級の否定形）" },
      { word: "Recently", meaning: "最近、近頃" },
      { word: "Used", meaning: "使われた" }
    ],
    essence: "「一番最近使われていないもの（＝最も過去に使われたきり放置されているもの）」から順にゴミ箱に捨てるページ置換アルゴリズム。",
    story: "仮想記憶では主記憶（RAM）の容量が限られているため、新しいページを読み込むには古いページを追い出す必要があります。当初は『最初に入れたものを捨てる FIFO (First-In First-Out)』が使われましたが、FIFOには『頻繁に使う重要ページでも、昔に入れたというだけで追い出されてしまい、性能が落ちる』という致命的な欠点（Beladyの逆説）がありました。そこで考案されたのが、『人間の机の上と同じで、直近で触ったものはまたすぐ使うはず（時間的局所性の原理）。逆に、一番長い間触っていない（Least Recently Used）ものこそ真っ先に片付けるべきだ』というLRUです。",
    examTip: "AP午後ではページ置換のシミュレーション表（参照列に対するフレーム内状態の推移）が出題されます。LFU (Least Frequently Used: 参照回数が最も少ない) や FIFO との明確な比較が問われます。"
  },
  {
    id: "cisc-risc",
    term: "CISC / RISC",
    fullName: "Complex Instruction Set Computer / Reduced Instruction Set Computer",
    category: "processor",
    categoryLabel: "プロセッサ設計",
    breakdown: [
      { word: "Complex", meaning: "複雑な、複合的な" },
      { word: "Reduced", meaning: "削減された、削ぎ落とされた" },
      { word: "Instruction Set", meaning: "命令セット（CPUが理解できる命令の集合）" },
      { word: "Computer", meaning: "計算機（プロセッサ）" }
    ],
    essence: "CISCは何でもできる多機能スイスアーミーナイフ（1命令が重い）。RISCは研ぎ澄まされた surgical knife（単純な命令だけを極限の超高速パイプラインで回す）。",
    story: "1970年代まで設計されていたCISC系CPUは、メモリが高価で容量が少なかったため、『1つの命令で複雑なメモリ演算まで全部済ませて、プログラムのバイト数を減らそう』と設計されました。しかし1980年代初頭、2つの独立した研究グループが革命を起こしました。スタンフォード大学のジョン・ヘネシーは「MIPS」プロジェクトで、カリフォルニア大学バークレー校のデビッド・パターソンは「RISC-I」プロジェクトで、それぞれ「実際のプログラムで使われる命令は全体の20〜30%に集中しており、残りの複雑命令はほとんど使われない」ことを証明しました。そこで『使わない複雑命令を削ぎ落とし（Reduced）、単純命令だけを1クロックで処理するパイプライン設計にしよう！』と生まれたのがRISC（ARMやApple Silicon、MIPSなど）です。",
    examTip: "APでは「命令語長が固定（RISC）vs 可変（CISC）」「パイプライン処理に適しているのはRISC」「RISCはロード・ストア命令でのみ主記憶にアクセスする（ロード/ストアアーキテクチャ）」が最重要論点です。"
  },

  // ==========================================
  // 3. ネットワーク
  // ==========================================
  {
    id: "cidr",
    term: "CIDR",
    fullName: "Classless Inter-Domain Routing",
    category: "network",
    categoryLabel: "ネットワーク・IPアドレス",
    breakdown: [
      { word: "Class-less", meaning: "クラスの縛りを無くした、階級のない" },
      { word: "Inter-Domain", meaning: "ドメイン（組織ネットワーク）間の" },
      { word: "Routing", meaning: "経路制御（パケットを届ける道案内）" }
    ],
    essence: "固定の「クラスA（1600万台）/B（6.5万台）/C（254台）」という極端な枠を廃止し、好きなビット位置（/26や/28など）で柔軟に切り分けられるようにした仕組み。",
    story: "1980年代、IPv4は組織規模に応じてクラスA（先頭8bitがNW部）、クラスB（先頭16bit）、クラスC（先頭24bit）という3種類の固定枠で割り当てられていました。しかし1990年代初頭にインターネットが爆発普及すると大問題が発生しました。多くの企業はクラスC（最大254台）では足りず、クラスB（最大65,534台）を欲しがりました。結果、わずか数百台しか使わない企業に6.5万台分のIPが割り当てられ、あっという間にIPv4枯渇危機に陥りました。そこで1993年、IETFが『クラスの垣根を撤廃しよう（Classless）！/22でも/26でも必要な分だけ切り出そう！』と導入したのがCIDRです。同時に複数の経路を1行にまとめる『経路集約（ルート集約）』も実現しました。",
    examTip: "AP午後のネットワーク選択問題では、VLSM（可変長サブネットマスク）を用いた社内IPアドレス設計・必要ホスト数からプレフィックス長（/24〜/30）を逆算する計算が頻出中の頻出です。"
  },
  {
    id: "dhcp",
    term: "DHCP",
    fullName: "Dynamic Host Configuration Protocol",
    category: "network",
    categoryLabel: "ネットワーク・プロトコル",
    breakdown: [
      { word: "Dynamic", meaning: "動的な、状況に応じて変化する" },
      { word: "Host", meaning: "端末（PC、スマホ、サーバー）" },
      { word: "Configuration", meaning: "設定（IPアドレス、サブネットマスク、DNS等の初期値）" },
      { word: "Protocol", meaning: "通信規約・お約束" }
    ],
    essence: "オフィスや家庭のWi-Fiに接続した瞬間、空いているIPアドレスやDNSの情報を「自動的（Dynamic）にレンタル設定」してくれる管理人さん。",
    story: "初期のLAN環境では、新しいPCをネットワークに繋ぐたび、管理者が手書きの台帳を見ながらPCの画面を開き、手作業でIPアドレス・デフォルトゲートウェイ・DNSサーバのIPを打ち込んでいました。当然、打ち間違いや重複設定（IPアドレスの衝突事故）が多発しました。そこで1993年、PCがネットワークに参加した瞬間にブロードキャストで『誰か私にIPをください！』と叫ぶと、サーバが空きアドレスを貸出期限（リース期間）付きで自動配布するDHCPが策定されました。",
    examTip: "AP午前ではDHCPの4ステップ「DISCOVER（探索）→ OFFER（提案）→ REQUEST（要求）→ ACK（承認）」のやり取りと、ルータを超えてDHCPパケットを転送する「DHCPリレーエージェント」が問われます。"
  },

  // ==========================================
  // 4. セキュリティ
  // ==========================================
  {
    id: "pki",
    term: "PKI / CA",
    fullName: "Public Key Infrastructure / Certificate Authority",
    category: "security",
    categoryLabel: "暗号・認証",
    breakdown: [
      { word: "Public Key", meaning: "公開鍵（誰に見せても良い鍵）" },
      { word: "Infrastructure", meaning: "社会基盤、インフラ（誰もが信頼して使える仕組み）" },
      { word: "Certificate", meaning: "証明書（身元保証書）" },
      { word: "Authority", meaning: "権威機関、認証局（信頼できる発行元）" }
    ],
    essence: "「この公開鍵は本当に相手のものか？」というなりすまし（中間者攻撃）を防ぐため、信頼できる第三者（CA）が実印（電子署名）を押して保証する社会基盤。",
    story: "公開鍵暗号は革命的でした。事前に秘密の鍵を共有しなくても安全に暗号通信ができるからです。しかし、致命的な落とし穴がありました。もし攻撃者イブが『私はボブです。これが私の公開鍵です』と偽って自分の鍵をアリスに渡したら（中間者攻撃）、アリスはイブの鍵で暗号化してしまい、筒抜けになってしまいます。この『公開鍵そのものの本物性はどうやって保証するのか？』という究極の課題を解決するために考案されたのが、公証人のような信頼できる認証局（CA）が公開鍵にデジタル署名を施した『電子証明書』を発行し、社会全体で信頼の連鎖（ルート証明書）を築くPKIです。",
    examTip: "AP午後セキュリティの超重要論点。サーバ証明書によるサーバの真正性確認、クライアント証明書による端末/利用者認証、CRL（証明書失効リスト）とOCSPによる失効確認の違いが頻出です。"
  },
  {
    id: "spf-dkim-dmarc",
    term: "SPF / DKIM / DMARC",
    fullName: "Sender Policy Framework / DomainKeys Identified Mail / DMARC",
    category: "security",
    categoryLabel: "メールセキュリティ",
    breakdown: [
      { word: "Sender Policy", meaning: "送信者の方針（うちの会社はこのIPからメールを送るという宣言）" },
      { word: "Framework", meaning: "枠組み、仕組み" },
      { word: "Identified", meaning: "識別された、特定された（電子署名で本人確認）" },
      { word: "Conformance", meaning: "適合・一致（認証失敗時にどう処分するかの方針）" }
    ],
    essence: "メールの差出人詐称（なりすまし）を防ぐ3重の防壁。IPアドレスで確認するのがSPF、電子署名で確認するのがDKIM、失敗時の対応（破棄や隔離）を指示するのがDMARC。",
    story: "インターネットの電子メール（SMTP）は1980年代に作られましたが、性善説で設計されていたため、差出人アドレス（From）を誰でも自由に書き換えることができました。これを利用したフィッシング詐欺やスパムが社会問題化しました。そこでまず作られたのが**SPF**（『DNSにうちの正規送信サーバーのIP一覧を公開しておくから、受信側はIPを照合してね』）。しかしメール転送されるとIPが変わって誤検知される弱点があったため、メール本文そのものに秘密鍵で署名を添える**DKIM**が生まれました。さらに、認証失敗したメールを受信者がどう処理すべきか（そのまま通す・迷惑メール隔離・完全破棄）を送信元ドメイン側がコントロールできるようにした決定打が**DMARC**です。",
    examTip: "近年のAP午後セキュリティで最もホットなテーマ。DNSのTXTレコードに記述する点、 envelope-from（MAIL FROM）と header-from（表示名）の違い、DMARCのポリシー（none, quarantine, reject）が問われます。"
  },
  {
    id: "waf",
    term: "WAF",
    fullName: "Web Application Firewall",
    category: "security",
    categoryLabel: "Webセキュリティ",
    breakdown: [
      { word: "Web Application", meaning: "Webアプリ（HTTP/HTTPSリクエストの内容、フォーム入力等）" },
      { word: "Firewall", meaning: "防火壁（危険な通信を遮断する装置）" }
    ],
    essence: "従来のファイアウォール（IP/ポート番号しか見ない）を素通りする「HTTPリクエストの中身（SQL文やスクリプト）」を検査し、SQLインジェクションやXSSを撃退する門番。",
    story: "従来のパケットフィルタリング型ファイアウォールは、『ポート80番（HTTP）と443番（HTTPS）を通す』と設定します。しかし、攻撃者はまさにその開いている80番/443番を通って、ログインフォームの入力欄に悪意あるSQL文（`' OR '1'='1`）やJavaScriptを送り込んできました。ルータや通常のFWから見れば『普通のHTTPパケット』に見えるため素通りしてしまいます。そこで『パケットの宛先だけでなく、HTTPペイロードの中身（パラメータ文字列）までディープに検査して、攻撃コード特有のパターンを検知・遮断しよう』と誕生したのがWAFです。",
    examTip: "ネットワークFW（L3/L4）、IDS/IPS（L4/L7のシグネチャ検査）、WAF（L7 Webアプリ特化）の監視対象レイヤーの違いが午前の定番。午後はシグネチャ更新や誤検知（フォールスポジティブ）対策が出題されます。"
  },

  // ==========================================
  // 5. データベース
  // ==========================================
  {
    id: "acid",
    term: "ACID",
    fullName: "Atomicity, Consistency, Isolation, Durability",
    category: "database",
    categoryLabel: "データベース・トランザクション",
    breakdown: [
      { word: "Atomicity (原子性)", meaning: "原子（Atom）のようにこれ以上分割できない＝『All or Nothing（全実行か全取消か）』" },
      { word: "Consistency (一貫性)", meaning: "処理の前と後で、データベースの整合性ルール（残高がマイナスにならない等）を常に保つ" },
      { word: "Isolation (独立性・隔離性)", meaning: "複数の処理が同時に走っても、まるで1人だけで順番に処理したかのように互いに邪魔されない" },
      { word: "Durability (永続性・耐久性)", meaning: "一度完了（コミット）したデータは、直後に電源が落ちても絶対に失われない" }
    ],
    essence: "銀行の振込で『引き落とされたのに相手に届いていない』『残高が狂う』といった大事故を絶対に起こさないための、トランザクションの4大鉄則。",
    story: "1970年代、ジム・グレイ（リレーショナルDBの父の一人、チューリング賞受賞）らによって提唱されました。化学の『酸（Acid）』になぞらえて、システムがどんな過酷な障害や並行処理に晒されても絶対にデータを腐敗させないための基準として名付けられました。例えばAさんの口座からBさんに1万円振り込むとき、Aから1万引き、Bに1万足す。途中で停電したらAだけ減ってBに届かない大惨事になります。これを防ぐのがAtomicity（全戻しロールバック）であり、停電復旧後に消えないのがDurability（WALログからのロールフォワード）です。",
    examTip: "AP午後では分離レベル（Read Uncommitted, Read Committed, Repeatable Read, Serializable）と発生する現象（ダーティリード、反復不能読み、ファントムリード）の対応表が超頻出です。"
  },
  {
    id: "wal",
    term: "WAL / チェックポイント",
    fullName: "Write-Ahead Logging",
    category: "database",
    categoryLabel: "障害回復・リカバリ",
    breakdown: [
      { word: "Write-Ahead", meaning: "前もって書く（先に書く）" },
      { word: "Logging", meaning: "台帳（ログファイル）に記録を残すこと" }
    ],
    essence: "本番の重いデータベースファイルを更新する『前に（Ahead）』、まず軽くて追記が超高速なログファイルに変更内容を書き留めておく仕組み。",
    story: "ハードディスクやSSDへのランダムなデータ書き込みは非常に低速です。もしトランザクションのたびに巨大なデータベース本体の全ページをディスクに書き込んでいたら、システムが激重になってしまいます。そこで考案されたのがWALです。『ディスクへの本体反映は後回し（メモリ上だけで更新）にして、まずはログの末尾に「これからこれを更新するよ」と1行追記（順次書込み＝爆速）した時点でコミット完了とみなそう！』という天才的工夫です。万が一停電しても、WALログさえディスクに残っていれば、起動時に再実行（ロールフォワード）して元通り復旧できます。",
    examTip: "AP午後では「チェックポイント以前にコミットされた処理は何もしない」「チェックポイント後にコミットされた処理はロールフォワード」「コミット前に障害発生した処理はロールバック」の判定問題が定番です。"
  }
];

// カテゴリ一覧定義
export const categories = [
  { id: "all", label: "すべて" },
  { id: "processor", label: "プロセッサ・CPU" },
  { id: "os", label: "OS・メモリ" },
  { id: "network", label: "ネットワーク" },
  { id: "security", label: "セキュリティ" },
  { id: "database", label: "データベース" },
  { id: "system", label: "システム構成・信頼性" }
];
