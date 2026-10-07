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
  },
  {
    id: "rdbms",
    term: "RDBMS",
    fullName: "Relational Database Management System",
    category: "database",
    categoryLabel: "データベースモデル",
    breakdown: [
      { word: "Relational", meaning: "関係（数学の集合論におけるリレーション＝二次元の『表』）" },
      { word: "Database", meaning: "データの基地・保管庫" },
      { word: "Management System", meaning: "管理・運用するためのシステム基盤" }
    ],
    essence: "データを複雑なポインタのクモの巣ではなく、誰もが直感的に理解できる『行と列の二次元テーブル』として表現し、数学の集合論（SQL）で操作できるようにした大発明。",
    story: "1960年代のデータベースは「階層型」や「ネットワーク型」と呼ばれ、データ同士が複雑なポインタ（矢印）で物理的につながれていました。そのため、データの構造を少し変えるだけでプログラム全体を書き直す必要があり、エンジニアは地獄を見ていました。そこで1970年、IBMの数学者エドガー・F・コッド（E. F. Codd）が「データを二次元の数学的な関係（Relation＝表）として扱えば、物理的な保存方法を意識せずに宣言的（SQL）にデータを抽出できる」という歴史的論文を発表しました。これが現在のOracle、MySQL、PostgreSQLに至るRDBMSの夜明けです。",
    examTip: "APでは「関係モデルにおける属性（列）、組（行、タプル）、次数（列数）、基数（行数、カージナリティ）」という数学用語の対応関係が頻出です。"
  },
  {
    id: "b-tree",
    term: "B+木インデックス",
    fullName: "Balanced Tree (B-Tree / B+ Tree)",
    category: "database",
    categoryLabel: "インデックス・検索高速化",
    breakdown: [
      { word: "Balanced", meaning: "均衡を保った、バランスの取れた（どの葉までの深さも同じ）" },
      { word: "Tree", meaning: "木構造（根から枝分かれして葉にたどり着くデータ構造）" },
      { word: "B+", meaning: "実データを最下層（葉ノード）のみに集め、葉同士を双方向リンクでつないだ改良版" }
    ],
    essence: "「どのデータを検索しても常に同じ回数のディスクアクセス（O(log N)）で到達できる」ように自動で背の高さを均等に整える神木。範囲検索（WHERE age BETWEEN 20 AND 30）に圧倒的に強い！",
    story: "1970年、ボーイング科学研究所（Boeing Scientific Research Laboratories）に在籍していたルドルフ・ベイヤー（Rudolf Bayer）とエドワード・M・マクレイト（Edward M. McCreight）が発表した論文が始まりです（ベイヤーはその後ミュンヘン工科大学の教授等を歴任）。二分探索木はデータを順に追加していくと、木が片側に偏って「ただの直線リスト」になってしまい、検索が激遅になる弱点がありました。B木は「どの葉（Leaf）までの深さも完全に同じになるように、ノードがいっぱいになったら自動で分裂して上に押し上げる（自己平衡）」仕組みを導入しました。さらにB+木では、最下層の葉ノード同士を左右の横ポインタで数珠繋ぎにすることで、「10から50まで順番に読む」といった範囲スキャンが爆速になりました。",
    examTip: "AP午前では「B+木の根から葉までの段数は均等」「主キーや等値検索だけでなく範囲検索に適する」が出題。ハッシュインデックス（等値検索はO(1)だが範囲検索不可）との対比が鉄板です。"
  },
  {
    id: "bcnf",
    term: "BCNF",
    fullName: "Boyce-Codd Normal Form（ボイス・コッド正規形）",
    category: "database",
    categoryLabel: "データベース正規化",
    breakdown: [
      { word: "Boyce", meaning: "レイモンド・ボイス（SQLの共同開発者）" },
      { word: "Codd", meaning: "エドガー・コッド（リレーショナルモデルの父）" },
      { word: "Normal Form", meaning: "正規形（データの冗長性と更新異常を排した形）" }
    ],
    essence: "「すべての決定従属子（矢印の左側）が候補キーである」状態。第3正規形（3NF）でもわずかに残る『主キーの一部が他の非キーに決定されてしまう隙』を完全に塞いだ究極の正規形。",
    story: "コッドが第1〜第3正規形を定義したあと、IBMの同僚レイモンド・ボイスと共に実務データを検証していたところ、「第3正規形の条件（主キーに推移従属しない）を満たしているのに、候補キーが複数絡むとまだ更新異常が発生する特殊なケースがある！」と気づきました。そこで『決定項（X→YのX）は、いかなる場合も必ず候補キーでなければならない』という、第3正規形よりも厳格で美しいルールを打ち立てました。これが2人の名を冠したボイス・コッド正規形です。",
    examTip: "「第3正規形であるがBCNFではない例」として、複数の複合候補キーが互いに一部の属性を共有しているケースが出題されます。「決定従属子がすべて候補キー」というキーワードを暗記しましょう。"
  },
  {
    id: "2pc",
    term: "2PC",
    fullName: "Two-Phase Commit Protocol（2相コミットプロトコル）",
    category: "database",
    categoryLabel: "分散データベース",
    breakdown: [
      { word: "Two-Phase", meaning: "2段階（準備フェーズと確定フェーズ）" },
      { word: "Commit", meaning: "コミット（変更の確定）" },
      { word: "Protocol", meaning: "通信手順・取り決め" }
    ],
    essence: "複数の離れたDBサーバーにまたがる更新で、1台でも失敗したら全員道連れでロールバックさせるための「結婚式の誓い（異議のある人はいますか？→全員OKなら誓約）」。",
    story: "銀行送金などで、東京の口座DBから引き落とし、ニューヨークの口座DBに入金する場合、通信障害で片方だけ成功すると大惨事になります。そこで考案されたのが2PCです。リーダー（調停者）が全員に『書き込み準備はできたか？（Prepare）』と問いかけ、全員から『YES』が返ってきた時だけ『確定せよ（Commit）』と命令します。1人でも『NO』や無応答なら即座に全員に『取り消せ（Abort/Rollback）』を出します。",
    examTip: "AP午前では「第1相（セキュア／コミット準備）と第2相（コミット／ロールバック）の流れ」「調停者がコミット通知を出した後に参加者がダウンした場合、参加者は再起動後にロールフォワードしてコミットを完了させる」が出題されます。"
  },
  {
    id: "cap",
    term: "CAP定理",
    fullName: "Consistency, Availability, Partition tolerance",
    category: "database",
    categoryLabel: "分散システム・NoSQL",
    breakdown: [
      { word: "Consistency", meaning: "一貫性（どのサーバーを読んでも常に最新で同じデータが返る）" },
      { word: "Availability", meaning: "可用性（障害があっても常にリクエストに応答が返る）" },
      { word: "Partition tolerance", meaning: "分断耐性（サーバー間のネットワークが寸断されてもシステム全体が動き続ける）" }
    ],
    essence: "「分散システムにおいては、C・A・Pの3つのうち同時に最大2つまでしか満たすことができない」という冷徹なトレードオフの真理。",
    story: "2000年、UCバークレーのエリック・ブリュワー教授が提唱しました。世界中に散らばるサーバー群で、もし太平洋海底ケーブルが切断（P: ネットワーク分断）されたらどうするか？両方のサーバーでデータを同期し続ける（C）なら、通信が回復するまで書き込みを拒否して可用性（A）を犠牲にするしかない。逆にいつでも応答する（A）なら、日米でデータのズレを許容して一貫性（C）を諦めるしかない。この定理が、従来のRDBMS（CA志向）から、結果整合性を許容するNoSQL（AP志向やCP志向）への爆発的進化の理論的根拠となりました。",
    examTip: "AP午前では「CAP定理の3要素の意味」と「ネットワーク分断（P）が発生した環境では、一貫性（C）と可用性（A）のどちらかをトレードオフとして選択せざるを得ない」という論理が問われます。"
  },

  // ==========================================
  // 6. ネットワーク追加用語
  // ==========================================
  {
    id: "arp",
    term: "ARP",
    fullName: "Address Resolution Protocol",
    category: "network",
    categoryLabel: "ネットワーク・アドレス解決",
    breakdown: [
      { word: "Address", meaning: "アドレス（IPアドレスとMACアドレス）" },
      { word: "Resolution", meaning: "解決（対応付けを見つけ出すこと）" },
      { word: "Protocol", meaning: "プロトコル（通信規約）" }
    ],
    essence: "「相手のIPアドレスは分かっているのに、LANカード固有の物理番号（MACアドレス）が分からない」ときに、教室全体に『〇〇君、手挙げて！』と叫ぶ校内放送。",
    story: "イーサネット（LAN）の世界では、パケットを隣の機器に届けるために必ず48ビットの「MACアドレス」が必要です。しかし私たちが手入力したりDNSで引くのは「IPアドレス（論理番号）」だけです。そこで1982年に作られたのがARPです。送信元は『IP 192.168.1.5 の人、MACアドレスを教えて！』とLAN内の全員にブロードキャスト（ARP要求）します。該当する端末だけが『私のMACは AA:BB:CC:... です』と1対1で返事（ARP応答）します。一度知った相手はARPテーブル（キャッシュ）にメモしておきます。",
    examTip: "AP午前では「ARP要求はブロードキャスト（FF:FF:FF:FF:FF:FF）、ARP応答はユニキャスト」「ルータを超えてARP要求は届かない（ブロードキャストドメイン内のみ）」が超頻出です。"
  },
  {
    id: "icmp",
    term: "ICMP",
    fullName: "Internet Control Message Protocol",
    category: "network",
    categoryLabel: "ネットワーク・障害診断",
    breakdown: [
      { word: "Internet Control", meaning: "インターネット制御・管理のための" },
      { word: "Message", meaning: "メッセージ（通信状態やエラーの通知）" },
      { word: "Protocol", meaning: "プロトコル" }
    ],
    essence: "IPプロトコルは荷物を届けるだけでエラーを教えてくれない（投げっぱなし）。そこで『宛先が見つかりません』『時間切れです』とエラー報告してくれるIPの相棒。",
    story: "IPパケットは配送の信頼性を保証しない（ベストエフォート）ため、途中のルータで宛先不明や混雑でパケットが捨てられても、送信元には何も伝わりません。これではネットワークの障害調査ができません。そこで作られたのがICMPです。ネットワークエンジニアが毎日使う『ping』はICMPのエコー要求/応答（Type 8 / 0）を使い、『traceroute』はパケットの寿命（TTL）を1ずつ増やして途中のルータに『時間超過エラー（Type 11: Time Exceeded）』を返させることで経路を暴き出しています。",
    examTip: "AP午前では「ネットワーク層（L3）で動作する」「ping（Echo Request/Reply）やtraceroute（TTL切れ通知）で利用される」「Path MTU Discoveryでパケット分割不可（DFビット）と通知する」が問われます。"
  },
  {
    id: "nat-napt",
    term: "NAT / NAPT",
    fullName: "Network Address Translation / Network Address Port Translation",
    category: "network",
    categoryLabel: "ネットワーク・IP変換",
    breakdown: [
      { word: "Network Address", meaning: "IPアドレス" },
      { word: "Port", meaning: "ポート番号（アプリケーションの識別番号）" },
      { word: "Translation", meaning: "変換・翻訳" }
    ],
    essence: "社内のプライベートIPを、インターネットで通じるグローバルIPに変換する関所。ポート番号も一緒に使って1個のグローバルIPを数百台で共有するのがNAPT（IPマスカレード）。",
    story: "プライベートIPアドレス（192.168.x.xなど）はインターネット上ではルーティングできません。世界中で重複しているからです。インターネットに出るには世界で唯一のグローバルIPが必要です。しかしグローバルIPは数が足りません。そこで『パケットがルータを通過する瞬間に、送信元IPアドレスをルータ自身のグローバルIPにすり替え、ポート番号（例: 10001番、10002番）で社内のどのPCからの通信かを台帳に記録しておく』NAPTが開発されました。返信が来たらポート番号を見て社内PCへ戻します。",
    examTip: "APでは「静的NATは1対1変換（ポートは見ない）」「NAPTは1対多（IPアドレス＋ポート番号を変換、LinuxではIPマスカレードと呼ぶ）」「外側から社内PCへ自発的に接続を開始できない（セッションテーブルにエントリがないため）」が頻出です。"
  },
  {
    id: "tcp-udp",
    term: "TCP / UDP",
    fullName: "Transmission Control Protocol / User Datagram Protocol",
    category: "network",
    categoryLabel: "トランスポート層・信頼性",
    breakdown: [
      { word: "Transmission Control", meaning: "伝送を厳密にコントロールする（順序・再送・流量を管理）" },
      { word: "User Datagram", meaning: "ユーザーの生データのかたまり（Datagram）をそのまま運ぶ" },
      { word: "Protocol", meaning: "プロトコル" }
    ],
    essence: "TCPは「受領印をもらう書留郵便（遅くても1文字も漏らさない）」。UDPは「ラジオ生放送（途中でノイズが入っても止まらず次の音を届ける）」。",
    story: "Webサイトの閲覧やファイル転送では、1ビットでも欠けたらファイルが壊れます。だからTCPは『3ウェイハンドシェイクで接続を確立し、届くたびにACK（確認応答）を返し、届かなければ自動再送し、相手がパンクしないようウィンドウ制御で流量調整する』という至れり尽くせりの重装備にしました。一方、オンラインゲームやZoom会議、DNSの問い合わせでそれをやると、1コマの遅れで会話が止まってしまいます。そこで『確認も再送も一切しない！とにかくヘッダを極小（8バイト）にしてすぐ投げる！』という究極の身軽さを追求したのがUDPです。",
    examTip: "AP午前では「コネクション型 vs コネクションレス型」「ヘッダサイズ（TCPは20B〜、UDPは8B固定）」「TCPのウィンドウ制御（スライディングウィンドウによるフロー制御）と輻輳制御」「UDPを使う代表例：DNS、DHCP、NTP、VoIP、QUIC(HTTP/3)」が出題されます。"
  },
  {
    id: "ospf-rip",
    term: "OSPF / RIP",
    fullName: "Open Shortest Path First / Routing Information Protocol",
    category: "network",
    categoryLabel: "ルーティング・経路制御",
    breakdown: [
      { word: "Open", meaning: "オープンな（標準規格の）" },
      { word: "Shortest Path First", meaning: "最短経路優先（ダイクストラ法で一番コストが低い道を選ぶ）" },
      { word: "Routing Information", meaning: "経路情報（どっちに行けば目的地か）" }
    ],
    essence: "RIPは「経由するルータの数（ホップ数）しか見ないおバカなカーナビ（超低速な細道でも近道なら選ぶ）」。OSPFは「回線速度や混雑（コスト）を考慮した賢いGoogleマップ」。",
    story: "初期のルーティングプロトコルRIPは、『目的地までに通るルータの台数（ホップ数）』だけでルートを決めていました。しかし『10Mbpsの高速回線（ルータ2台経由）』と『64kbpsの超低速回線（ルータ1台直行）』があった場合、RIPは迷わず超低速回線を選んで大渋滞を引き起こしました。さらに最大15ホップまでしか届かず大規模網で使えませんでした。そこで開発されたOSPFは、ネットワーク全体のトポロジ（地図）を全ルータで共有し、回線帯域に基づいた『コスト（重み）』を計算して真の最短ルートを自律的に選び出します。",
    examTip: "APでは「RIPはディスタンスベクター型（距離と方向、ホップ数上限15）」「OSPFはリンクステート型（ダイクストラのSPFアルゴリズム、エリア分割機能あり）」「自律システム（AS）内部で動くIGPである」という分類が超定番です。"
  },
  {
    id: "dns",
    term: "DNS",
    fullName: "Domain Name System",
    category: "network",
    categoryLabel: "ネットワーク・名前解決",
    breakdown: [
      { word: "Domain Name", meaning: "ドメイン名（人間が読める住所: example.com）" },
      { word: "System", meaning: "仕組み・階層型分散データベース" }
    ],
    essence: "世界中のコンピュータの名前とIPアドレスを紐付ける巨大な電話帳。1台の親分サーバーに集めず、世界中にツリー構造で管理を任せる分散の最高傑作。",
    story: "インターネットの黎明期、全世界のコンピュータ名とIPの対応表はスタンフォード研究所が管理する「HOSTS.TXT」という1枚のテキストファイルでした。毎晩各大学がダウンロードしていましたが、ネットが拡大するとダウンロードがパンクし、更新が追いつかなくなりました。そこで1983年、ポール・モカペトリスが「`.`（ドット）で区切った木構造（ルート → .jp → .co.jp → example）にして、各階層の管理者に台帳の管理権限を分散委譲しよう！」と考案したのがDNSです。",
    examTip: "AP午前では「ルートDNSサーバを頂点とする階層型構造」「Aレコード（IPv4）、AAAA（IPv6）、MX（メール配送先）、CNAME（別名）、NS（権威DNS）、PTR（逆引き）」「再帰的問合せ（キャッシュサーバへの依頼）と反復問合せ（権威サーバへの順次問い合わせ）」の違いが頻出です。"
  },
  {
    id: "vlan",
    term: "VLAN",
    fullName: "Virtual Local Area Network",
    category: "network",
    categoryLabel: "ネットワーク・仮想化",
    breakdown: [
      { word: "Virtual", meaning: "仮想の（物理的な配線に縛られない）" },
      { word: "Local Area Network", meaning: "構内ネットワーク（LAN）" }
    ],
    essence: "1台の物理的なネットワークスイッチの中に、仕切り壁を作って「まるで何台もの別々のスイッチがあるかのように」論理的にグループ分けする技術。",
    story: "オフィスで総務部と営業部のネットワークを分けたい場合、昔は総務部用スイッチと営業部用スイッチを別々に購入し、それぞれ天井裏にLANケーブルを張り巡らせていました。席替えのたびに配線工事が必要で莫大なコストがかかりました。そこで生まれたVLANは、スイッチのポート単位（ポートVLAN）や、パケットにIDタグを挟み込む（タグVLAN: IEEE 802.1Q）ことで、1本のケーブルや1台のスイッチを複数の部署で安全に相乗りできるようにしました。",
    examTip: "AP午後ネットワークの最重要テーマ。「ブロードキャストドメインの分割」「IEEE 802.1QタグVLANによるトランクリンク（複数VLANの相乗り伝送）」「異なるVLAN間の通信にはL3スイッチまたはルータが必要」が合否を分ける知識です。"
  }
];

// カテゴリ一覧定義（データベースとネットワークを先頭に配置）
export const categories = [
  { id: "all", label: "すべて" },
  { id: "database", label: "🗄️ データベース" },
  { id: "network", label: "🌐 ネットワーク" },
  { id: "security", label: "🔒 セキュリティ" },
  { id: "processor", label: "⚡ プロセッサ・CPU" },
  { id: "os", label: "💻 OS・メモリ" },
  { id: "system", label: "🏗️ システム構成・信頼性" }
];
