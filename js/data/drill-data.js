// AP Tech Master - 午前テクノロジ完全攻略ドリルデータ
// 【データベース＆ネットワーク徹底特化・網羅的37問】
// 非エンジニア向け：丸暗記を排し、誤答選択肢の完全解剖・語源リンク・午後への接続ポイントを全問に網羅

export const drillData = [
  // =========================================================================
  // 1. データベース分野 (16問) - AP午前最重要・午後頻出論点を完全網羅
  // =========================================================================
  {
    id: "q-db-1",
    category: "database",
    categoryLabel: "データベース・正規化",
    subTopic: "正規化",
    title: "第2正規形と第3正規形の違い",
    source: "AP午前 過去問最頻出",
    etymologyRef: "acid",
    question: "関係データベースの正規化において、主キーの一部に関数従属している非キー属性を別テーブルに分離し、「完全関数従属」のみにする操作はどれか。",
    options: [
      { key: "ア", text: "非正規形から第1正規形への変換", correct: false, note: "繰り返し項目（1マスに複数の値が入っている配列）を排除して単一値（アトミック）にする操作です" },
      { key: "イ", text: "第1正規形から第2正規形への変換", correct: true, note: "正解！複合主キーの一部に対する『部分関数従属』を排除し、完全関数従属のみにする操作です" },
      { key: "ウ", text: "第2正規形から第3正規形への変換", correct: false, note: "主キー以外の非キー属性同士の依存関係である『推移的関数従属（A→B→C）』を排除する操作です" },
      { key: "エ", text: "第3正規形からボイス・コッド正規形への変換", correct: false, note: "すべての決定従属子が候補キーであるようにする、さらに厳密な正規化です" }
    ],
    explanation: {
      logic: "正規化の各段階の違いを整理しましょう：\n・第1正規化: 繰り返し属性（リスト）を排除して1マス1値にする\n・第2正規化: 複合主キーの『一部』にぶら下がっている属性（部分関数従属）を別表に切り離す\n・第3正規化: 主キー以外の項目同士にぶら下がっている属性（推移的関数従属：社員番号→部署コード→部署名など）を切り離す。",
      feDiff: "基本情報（FE）では定義の暗記で解けましたが、応用情報（AP）午後では、伝票（注文書や請求書）から未正規化の表を自分で第2・第3正規形に分解し、外部キー線を結ぶ実践設計問題が毎回出題されます。",
      pmBridge: "正規化を怠ると「更新時異状」「挿入異状」「削除異状」が発生してデータが壊れます。業務リスクの観点から正規化の必然性を説明できるようにしましょう。"
    }
  },
  {
    id: "q-db-bcnf",
    category: "database",
    categoryLabel: "データベース・正規化",
    subTopic: "正規化",
    title: "ボイス・コッド正規形（BCNF）の条件",
    source: "AP午前 頻出論点",
    etymologyRef: "bcnf",
    question: "関係データベースのボイス・コッド正規形（BCNF）の定義として、適切なものはどれか。",
    options: [
      { key: "ア", text: "すべての非キー属性が主キーに対して完全関数従属している。", correct: false, note: "これは「第2正規形」の定義です" },
      { key: "イ", text: "第2正規形であり、かつ主キーから非キー属性への推移的関数従属が存在しない。", correct: false, note: "これは「第3正規形」の定義です" },
      { key: "ウ", text: "成立するすべての関数従属 X → Y において、X がスーパーキー（候補キーを含むキー）である。", correct: true, note: "正解！決定項（X）がすべて候補キーである状態がボイス・コッド正規形です" },
      { key: "エ", text: "すべての多値従属が排除されており、関数従属のみで構成されている。", correct: false, note: "これはさらに上位の「第4正規形（4NF）」の定義です" }
    ],
    explanation: {
      logic: "第3正規形（3NF）では「主キー以外の属性が主キーに推移従属しない」ことのみを求めます。しかし複数の候補キーが組み合わさっている場合、主キー『の一部』を決定する非キー属性が存在してしまい、更新異常が残ることがあります。\nボイス・コッド正規形（BCNF）は「矢印の左側（決定項 X）はすべて候補キーでなければならない」と定めることで、この隙を完全に排除します。",
      feDiff: "FEでは第3正規形までしか出題されませんが、APではBCNFと第3正規形の違い（候補キーが重複して重なり合っている場合の分解）が午前・午後共に出題されます。",
      pmBridge: "午後問では「なぜ第3正規形を満たしているのに更新異常が起きるのか」という問いに対し、「主キーの一部を決定する候補キー以外の属性が存在するため」と記述させる問題があります。"
    }
  },
  {
    id: "q-db-rel-algebra",
    category: "database",
    categoryLabel: "データベース・関係代数",
    subTopic: "関係代数",
    title: "関係代数演算（射影・選択・結合）",
    source: "AP午前 頻出パターン",
    etymologyRef: "rdbms",
    question: "関係代数の基本演算のうち、テーブルから「特定の条件を満たす行（タプル）のみを水平方向に抜き出す」演算と、「特定の列（属性）のみを垂直方向に抜き出す」演算の組合せとして正しいものはどれか。",
    options: [
      { key: "ア", text: "行を抜き出す: 射影（Projection） ／ 列を抜き出す: 選択（Selection）", correct: false, note: "射影と選択が逆になっています" },
      { key: "イ", text: "行を抜き出す: 選択（Selection） ／ 列を抜き出す: 射影（Projection）", correct: true, note: "正解！条件で行を絞るのが「選択（WHERE）」、必要な列を取り出すのが「射影（SELECT 列名）」です" },
      { key: "ウ", text: "行を抜き出す: 結合（Join） ／ 列を抜き出す: 射影（Projection）", correct: false, note: "結合は2つのテーブルを共通キーで横に繋げる演算です" },
      { key: "エ", text: "行を抜き出す: 選択（Selection） ／ 列を抜き出す: 直積（Cartesian Product）", correct: false, note: "直積は全行×全行の総当たりペアを作る演算です" }
    ],
    explanation: {
      logic: "SQLとの対応で覚えると一瞬で腹落ちします：\n・選択（Selection: σ）: WHERE 条件式（行を水平に選ぶ）\n・射影（Projection: π）: SELECT 列1, 列2（列を垂直に切り出す）\n・結合（Join: ⋈）: FROM 表A JOIN 表B ON 結合条件\n・直積（Product: ×）: FROM 表A, 表B（全組み合わせ、行数は掛け算）",
      feDiff: "FEではSQL文の穴埋めが中心ですが、APでは関係代数の記号（σ, π, ⋈）を用いた関係代数式を解読させる問題が出題されます。",
      pmBridge: "RDBMSのクエリオプティマイザは、SQLを実行する前に「結合の前に選択と射影を先に実行して行数・列数を小さくする（関係代数の等価変換）」ことで処理を高速化しています。"
    }
  },
  {
    id: "q-db-foreign-key",
    category: "database",
    categoryLabel: "データベース・制約",
    subTopic: "参照整合性",
    title: "外部キー制約とCASCADE削除",
    source: "AP午前・午後必須",
    etymologyRef: "rdbms",
    question: "テーブルAの主キーをテーブルBが外部キーとして参照している。テーブルAのある行を削除しようとした際、参照しているテーブルBの該当行も自動的に連動して削除されるオプション設定はどれか。",
    options: [
      { key: "ア", text: "ON DELETE RESTRICT", correct: false, note: "参照している子行が存在する場合、親行の削除をエラーにして拒否する設定です" },
      { key: "イ", text: "ON DELETE CASCADE", correct: true, note: "正解！親行の削除に連動（カスケード）して、参照している子行も自動的に一括削除されます" },
      { key: "ウ", text: "ON DELETE SET NULL", correct: false, note: "親行が削除されたとき、子行の外部キー列の値をNULLに置き換える設定です" },
      { key: "エ", text: "ON DELETE NO ACTION", correct: false, note: "RESTRICTと同様に削除を拒否します（制約チェックのタイミングが異なるのみ）" }
    ],
    explanation: {
      logic: "参照整合性制約（Referential Integrity）の動作オプション：\n1. CASCADE（連動）: 親が消えたら子も一緒に消える（例: 注文伝票を消したら注文明細も道連れで消す）\n2. RESTRICT（制限）: 子が存在する限り親の削除を禁止する（例: 社員が所属している部署は消せない）\n3. SET NULL: 親が消えたら子の外部キーをNULLにする（例: 部署が解散したら社員の所属部署を未定にする）。",
      feDiff: "FEでは外部キーの概念だけでしたが、APでは午後問題で「子テーブルの行が孤児（Orphan）にならないための設計」としてCASCADEやRESTRICTの選択理由が問われます。",
      pmBridge: "CASCADEを安易に設定すると、親を1行消したつもりが関連データ数万件が連鎖消去される事故につながるため、業務ルールに応じた適切な制約設計が求められます。"
    }
  },
  {
    id: "q-db-sql-groupby",
    category: "database",
    categoryLabel: "データベース・SQL",
    subTopic: "SQL",
    title: "GROUP BY と HAVING 句の評価順序",
    source: "AP午前 頻出",
    etymologyRef: "rdbms",
    question: "SQLにおいて、グループ化された結果に対して条件を指定し、特定のグループのみを抽出するために用いる句はどれか。",
    options: [
      { key: "ア", text: "WHERE 句", correct: false, note: "WHERE句はGROUP BYでグループ化する前の『個々の行』を絞り込むために使います" },
      { key: "イ", text: "HAVING 句", correct: true, note: "正解！GROUP BYで集計した後の『グループ全体に対する条件（例: COUNT(*) >= 5）』を指定します" },
      { key: "ウ", text: "ORDER BY 句", correct: false, note: "検索結果の並び替え（昇順ASC/降順DESC）を指定する句です" },
      { key: "エ", text: "DISTINCT 句", correct: false, note: "検索結果から重複した行を排除して一意にする句です" }
    ],
    explanation: {
      logic: "SQL文の内部実行順序を理解すると絶対に間違えません：\n1. FROM（対象テーブルの確定）\n2. WHERE（グループ化前の行の絞り込み ※集約関数は使えない！）\n3. GROUP BY（グループにまとめる）\n4. HAVING（グループごとの集約値で絞り込む ※COUNT, AVGなどが使える！）\n5. SELECT（取り出す列の決定）\n6. ORDER BY（並び替え）。",
      feDiff: "FEでは簡単なSELECT文が中心ですが、AP午前では「WHERE句に集約関数COUNT(*)を書いた構文エラー」を見抜かせる引っ掛け問題が頻出します。",
      pmBridge: "午後問では「売上合計が100万円以上の店舗一覧を抽出するSQL」など、HAVING句を用いた集計クエリの穴埋めが頻繁に登場します。"
    }
  },
  {
    id: "q-db-sql-exists",
    category: "database",
    categoryLabel: "データベース・SQL",
    subTopic: "SQL",
    title: "EXISTS 述語と相関副問合せ",
    source: "AP午前・午後頻出",
    etymologyRef: "rdbms",
    question: "SQLの EXISTS 述語に関する記述として、適切なものはどれか。",
    options: [
      { key: "ア", text: "副問合せの結果が1行以上存在する場合に真（TRUE）を返す。", correct: true, note: "正解！副問合せの結果行が1行でもあれば真、0行なら偽を返します" },
      { key: "イ", text: "副問合せの結果に NULL が含まれている場合は必ず偽（FALSE）を返す。", correct: false, note: "EXISTSは「行が存在するか」だけを見るため、列の値がNULLでも行が存在すれば真になります" },
      { key: "ウ", text: "主問合せと副問合せで同じテーブルを参照することはできない。", correct: false, note: "自己結合や同じテーブルを参照する相関副問合せでも頻繁に使われます" },
      { key: "エ", text: "副問合せのSELECT句に指定した列の値と主問合せの列の値を比較する。", correct: false, note: "EXISTSは列の値を比較しません（そのため副問合せは SELECT * や SELECT 1 で十分です）" }
    ],
    explanation: {
      logic: "EXISTS述語は「行が存在するかどうか（Exist）」だけを判定する論理述語です。\nIN述語（WHERE id IN (SELECT ...)）と異なり、EXISTSは該当する行が1件見つかった時点で即座に探索を打ち切るため、大量データにおいて高速に動作します。また、副問合せ内の値がNULLであっても行が存在すれば真となります。",
      feDiff: "APではNOT INとNOT EXISTSの違いが出題されます。副問合せの結果にNULLが1つでも含まれると、NOT INは全体がUNKNOWNとなり1行もヒットしなくなる罠がありますが、NOT EXISTSなら安全に動作します。",
      pmBridge: "午後のSQL問題では「過去1年間に一度も注文履歴がない会員を抽出する」といったNOT EXISTSを用いたクエリが定番です。"
    }
  },
  {
    id: "q-db-sql-outerjoin",
    category: "database",
    categoryLabel: "データベース・SQL",
    subTopic: "SQL",
    title: "左外部結合（LEFT OUTER JOIN）の特性",
    source: "AP午前 頻出",
    etymologyRef: "rdbms",
    question: "社員テーブルと部署テーブルを、部署コードを結合キーとして左外部結合（LEFT OUTER JOIN）した結果に関する記述として、適切なものはどれか。",
    options: [
      { key: "ア", text: "両方のテーブルで部署コードが一致した行のみが出力される。", correct: false, note: "これは「内部結合（INNER JOIN）」の動作です" },
      { key: "イ", text: "社員テーブルの全行が出力され、対応する部署がない社員の部署情報は NULL になる。", correct: true, note: "正解！左側のテーブル（社員）をすべて残し、右側に一致がない列はNULLで埋められます" },
      { key: "ウ", text: "部署テーブルの全行が出力され、所属社員がいない部署の社員情報は NULL になる。", correct: false, note: "これは「右外部結合（RIGHT OUTER JOIN）」の動作です" },
      { key: "エ", text: "両テーブルの全行が出力され、不一致の箇所はすべて NULL になる。", correct: false, note: "これは「完全外部結合（FULL OUTER JOIN）」の動作です" }
    ],
    explanation: {
      logic: "外部結合（OUTER JOIN）は「片方の表のデータを脱落させずに残す」結合です：\n・LEFT OUTER JOIN: 左の表の全行を死守。右に対応がなければNULLで埋める。\n・RIGHT OUTER JOIN: 右の表の全行を死守。\n・INNER JOIN: 両方に一致がある行だけ残す（片方にしかない行は消滅する）。",
      feDiff: "FEでは結合の構文暗記ですが、APでは「未配属の新入社員（部署コードNULL）が内部結合だと売上レポートから消えてしまうバグ」の解決策として左外部結合を選ばせます。",
      pmBridge: "午後問では「WHERE 右テーブル.主キー IS NULL」と組み合わせることで、「一度も購入したことがない顧客」を特定するアンチ結合パターンが出題されます。"
    }
  },
  {
    id: "q-db-acid",
    category: "database",
    categoryLabel: "データベース・トランザクション",
    subTopic: "ACID特性",
    title: "トランザクションのACID特性の判定",
    source: "AP午前 頻出",
    etymologyRef: "acid",
    question: "DBMSにおいて、「トランザクションが正常にコミットされた後は、直後にシステム障害や停電が発生しても、更新結果は失われずに永続的に保持される」という性質はACIDのどれか。",
    options: [
      { key: "ア", text: "Atomicity（原子性）", correct: false, note: "処理がすべて実行されるか、全く実行されないかのどちらか（All or Nothing）である性質です" },
      { key: "イ", text: "Consistency（一貫性）", correct: false, note: "トランザクション実行の前後で、DBの整合性制約（残高≧0など）が常に保たれる性質です" },
      { key: "ウ", text: "Isolation（分離性・独立性）", correct: false, note: "並行して実行されるトランザクション同士が互いに干渉しない性質です" },
      { key: "エ", text: "Durability（耐久性・永続性）", correct: true, note: "正解！コミット完了後は電源が落ちてもデータが消えない性質です（WALとログで実現）" }
    ],
    explanation: {
      logic: "ACIDの4文字の頭文字とメカニズム：\n・A (Atomicity): ロールバック（UNDOログ）で実現\n・C (Consistency): 整合性制約（主キー・外部キー・CHECK）で実現\n・I (Isolation): 排他制御（ロック・分離レベル・MVCC）で実現\n・D (Durability): ロールフォワード（REDOログ・WAL）で実現。",
      feDiff: "FEでは単語の意味一致問題ですが、APでは「障害回復のどの技術（REDO/UNDO）がどのACID特性を支えているか」の技術的裏付けまで踏み込まれます。",
      pmBridge: "午後問では、非同期コミットや分散DBを採用した際に「DurabilityやConsistencyがどのレベルまで犠牲になるか」をトレードオフとして考察させられます。"
    }
  },
  {
    id: "q-db-isolation",
    category: "database",
    categoryLabel: "データベース・並行処理",
    subTopic: "分離レベル",
    title: "トランザクション分離レベルと並行処理異常",
    source: "AP午前 最頻出",
    etymologyRef: "acid",
    question: "あるトランザクションがコミット前に行っている更新データを、他のトランザクションが読み取ってしまう現象（ダーティリード）を防止できる最低限の分離レベルはどれか。",
    options: [
      { key: "ア", text: "Read Uncommitted", correct: false, note: "ダーティリードが発生してしまう最低レベルです" },
      { key: "イ", text: "Read Committed", correct: true, note: "正解！コミット済みの確定データしか読まないため、ダーティリードを防止できます" },
      { key: "ウ", text: "Repeatable Read", correct: false, note: "ダーティリードに加え「反復不能読み」も防げますが、最低限のレベルではありません" },
      { key: "エ", text: "Serializable", correct: false, note: "すべての異常（ファントムリード含む）を防ぐ最高レベルです" }
    ],
    explanation: {
      logic: "SQL標準の4つの分離レベルと発生現象の対応表：\n1. Read Uncommitted: Dirty Read(発生) / Non-repeatable(発生) / Phantom(発生)\n2. Read Committed: Dirty Read(防止！) / Non-repeatable(発生) / Phantom(発生) ← 多くの商用DBのデフォルト\n3. Repeatable Read: Dirty Read(防止) / Non-repeatable(防止！) / Phantom(発生)\n4. Serializable: 全て防止！",
      feDiff: "基本情報では出ないか用語のみですが、AP午前ではこのマトリクス表の穴埋めが頻出中の頻出です。",
      pmBridge: "午後問では「Repeatable Readで防げないファントムリードとは具体的にどんな現象か（範囲検索で後から別トランザクションが行をINSERTして行数が増える）」を記述させられます。"
    }
  },
  {
    id: "q-db-lock",
    category: "database",
    categoryLabel: "データベース・排他制御",
    subTopic: "ロック",
    title: "共有ロックと排他ロックの互換性",
    source: "AP午前 頻出",
    etymologyRef: "acid",
    question: "関係データベースの排他制御における共有ロック（Sロック）と排他ロック（Xロック）に関する記述として、適切なものはどれか。",
    options: [
      { key: "ア", text: "共有ロックがかけられている資源に対して、別のトランザクションが排他ロックをかけることができる。", correct: false, note: "共有ロック中に排他ロックはかけられません（待たされます）" },
      { key: "イ", text: "排他ロックがかけられている資源に対して、別のトランザクションが共有ロックをかけることができる。", correct: false, note: "排他ロック中は共有ロックも排他ロックも一切かけられません" },
      { key: "ウ", text: "共有ロックがかけられている資源に対して、別のトランザクションが重ねて共有ロックをかけることができる。", correct: true, note: "正解！共有ロック同士（参照同士）は競合せず、複数トランザクションで同時に共有できます" },
      { key: "エ", text: "排他ロックがかけられている資源に対して、別のトランザクションが重ねて排他ロックをかけることができる。", correct: false, note: "排他ロック同士は完全に競合し、先にかけた方が解放するまで待機します" }
    ],
    explanation: {
      logic: "ロックの互換性マトリクス（Compatibility Matrix）：\n・Sロック（Shared: 読取り用）: 他者のSロックとは「共存OK（○）」。他者のXロックとは「拒否（×）」。\n・Xロック（Exclusive: 書込み用）: 他者のSロックともXロックとも「一切共存不可（×）」。\nつまり「読むだけなら何人同時でも構わないが、書く人がいたら誰も触らせない」という原則です。",
      feDiff: "FEではロックの用語だけですが、APではデッドロックの発生条件（お互いがSロックを持ったままXロックへ昇格しようとして衝突する等）のシミュレーションが出題されます。",
      pmBridge: "午後のデッドロック対策では「SELECT ... FOR UPDATE」で最初からXロックを明示的に取得し、ロック昇格によるデッドロックを防ぐ技法が問われます。"
    }
  },
  {
    id: "q-db-2pl",
    category: "database",
    categoryLabel: "データベース・並行処理",
    subTopic: "2相ロック",
    title: "2相ロッキングプロトコル（2PL）の特性",
    source: "AP午前 頻出論点",
    etymologyRef: "acid",
    question: "2相ロッキングプロトコル（2-Phase Locking Protocol）に関する記述として、適切なものはどれか。",
    options: [
      { key: "ア", text: "ロックを獲得する相（成長相）と解放する相（縮小相）に分けることで、デッドロックの発生を完全に防止できる。", correct: false, note: "2PLはデッドロックを防止できません！直列可能性を保証するプロトコルです" },
      { key: "イ", text: "すべてのトランザクションが2相ロッキングに従えば、トランザクションの直列可能性（シリアライザビリティ）が保証される。", correct: true, note: "正解！並行処理を行っても直列に1つずつ実行したのと等価な結果になることが数学的に保証されます" },
      { key: "ウ", text: "トランザクション開始時に必要なすべてのロックを一括で獲得する方式である。", correct: false, note: "これは「厳密な2相ロック」や「一括ロック方式」の説明であり、通常の2PLは必要に応じて順次獲得します" },
      { key: "エ", text: "コミット時まで一切のロックを解放しない方式のみを2相ロッキングと呼ぶ。", correct: false, note: "コミット時まで解放しないのは「厳格な2相ロッキング（Strict 2PL）」です" }
    ],
    explanation: {
      logic: "2相ロッキング（2PL）の核心：\n1. 成長相（Growing Phase）: ロックを獲得するだけで、解放はしないフェーズ\n2. 縮小相（Shrinking Phase）: 一度でもロックを解放したら、以降は新たなロック獲得を一切禁止するフェーズ\n★最大の引っかけ: 2PLは「直列可能性」を保証しますが、「デッドロック」は防げません！資源の獲得順序がバラバラだとデッドロックは起きます。",
      feDiff: "「2PLでデッドロックが防げるか？」はAP午前で最も受験生が引っかかる定番トラップです。「デッドロック防止＝資源獲得順序の統一」「2PL＝直列可能性の保証」と明確に区別しましょう。",
      pmBridge: "午後問では「直列可能（Serializable）なスケジュールとは何か」を判定する依存グラフ（有向グラフに閉路がないこと）の読解問題が出ます。"
    }
  },
  {
    id: "q-db-wal",
    category: "database",
    categoryLabel: "データベース・障害回復",
    subTopic: "障害回復",
    title: "WALとチェックポイントによる障害回復判定",
    source: "AP午前・午後超頻出",
    etymologyRef: "wal",
    question: "チェックポイント機能をもつDBMSにおいて、システム障害が発生した。ログを調査したところ以下のトランザクションが存在した。ロールフォワード（REDO）によって回復すべきトランザクションはどれか。\n・T1: チェックポイント前に開始し、チェックポイント前にコミット\n・T2: チェックポイント前に開始し、チェックポイント後にコミット\n・T3: チェックポイント後に開始し、障害発生前にコミット\n・T4: チェックポイント後に開始し、障害発生時に未コミット",
    options: [
      { key: "ア", text: "T1 と T2", correct: false, note: "T1はチェックポイント時点でディスクに書き戻し済みのため何もしません" },
      { key: "イ", text: "T2 と T3", correct: true, note: "正解！チェックポイント以後にコミットしたトランザクション（T2, T3）はロールフォワードで再実行します" },
      { key: "ウ", text: "T3 と T4", correct: false, note: "T4は未コミットなのでロールバック（UNDO）の対象です" },
      { key: "エ", text: "T4 のみ", correct: false, note: "T4はロールバックの対象です" }
    ],
    explanation: {
      logic: "チェックポイント障害回復の黄金判定ルール：\n1. 【チェックポイント前にコミット完了 (T1)】: チェックポイントでディスクに書き込み済みなので何もしない（NO ACTION）。\n2. 【障害発生前にコミット完了 (T2, T3)】: コミットされたのでDurabilityを守るため、ログを使ってディスクに反映させる＝「ロールフォワード（REDO）」。\n3. 【障害発生時に未コミット (T4)】: 処理途中なのでAtomicityを守るため、更新前の状態に戻す＝「ロールバック（UNDO）」。",
      feDiff: "FEでも出ますが、AP午後では「チェックポイントから障害発生点までのタイムライン図」が必ず出題され、各トランザクションの回復種別を表に記入させられます。",
      pmBridge: "「なぜロールフォワードできるのか？＝WALログ（REDOログ）がディスクに残っているから」という仕組みと紐付けて理解しましょう。"
    }
  },
  {
    id: "q-db-recovery",
    category: "database",
    categoryLabel: "データベース・障害回復",
    subTopic: "メディアリカバリ",
    title: "メディア障害（ディスククラッシュ）からの復元手順",
    source: "AP午前 頻出",
    etymologyRef: "wal",
    question: "データベースを格納したハードディスクが物理的に破損した（メディア障害）。この状態から最新の障害直前の状態までデータベースを復旧させるための正しい手順はどれか。",
    options: [
      { key: "ア", text: "直近のフルバックアップをリストアした後、ログファイルを用いてロールフォワードを行う。", correct: true, note: "正解！バックアップ磁気テープ等からデータを書き戻し、その後のWALログを最後まで再適用します" },
      { key: "イ", text: "直近のフルバックアップをリストアした後、ログファイルを用いてロールバックを行う。", correct: false, note: "ロールバックすると過去の状態に戻ってしまいます。必要なのはロールフォワードです" },
      { key: "ウ", text: "システムを再起動し、DBMSの自動ロールフォワード機能のみを実行する。", correct: false, note: "ディスクが物理破損しているため、バックアップからのリストアなしには復旧できません" },
      { key: "エ", text: "差分バックアップのみをリストアすれば、ログファイルを使わずに最新状態に復旧できる。", correct: false, note: "差分バックアップ採取から障害発生までの更新分を反映するにはログファイルのロールフォワードが不可欠です" }
    ],
    explanation: {
      logic: "メディア障害の復元ステップ：\n1. 壊れたハードディスクを新品に交換する。\n2. 別の安全な媒体（テープや別ストレージ）に保管してある「直近のフルバックアップデータ」をディスクに書き戻す（リストア）。\n3. （差分/増分バックアップがあれば順次適用）。\n4. バックアップ取得時点から障害発生直前までの「更新後ログ（REDOログ）」をすべて順番に再実行（ロールフォワード）する。\nこれで障害直前の最新コミット状態まで完全に復元できます。",
      feDiff: "システム障害（停電・OSダウン：メモリが消えただけなのでディスクのデータ＋ログで即復旧）と、メディア障害（ディスク自体が物理破損：バックアップからの復元が必須）の違いがAPの重要論点です。",
      pmBridge: "午後の運用管理では、RPO（目標復旧時点）とRTO（目標復旧時間）を満たすためのフルバックアップ頻度とログ保管設計が問われます。"
    }
  },
  {
    id: "q-db-btree",
    category: "database",
    categoryLabel: "データベース・インデックス",
    subTopic: "インデックス",
    title: "B+木インデックスの構造とアクセス特性",
    source: "AP午前 最頻出",
    etymologyRef: "b-tree",
    question: "関係データベースで広く使われている B+木インデックスの特徴として、適切なものはどれか。",
    options: [
      { key: "ア", text: "根（ルート）から任意の葉（リーフ）までの深さが一定に保たれる平衡木（バランス木）である。", correct: true, note: "正解！自己平衡機能により、どのデータを検索しても常に一定の計算量 O(log N) で到達できます" },
      { key: "イ", text: "データの追加を繰り返すと木が片側に偏り、最悪の場合は線形探索 O(N) と同等の性能になる。", correct: false, note: "これは平衡機能のない単純な二分探索木の欠点です。B+木は自動でバランスを保ちます" },
      { key: "ウ", text: "キーの完全一致（等値検索）は高速だが、範囲検索（BETWEEN等）を行うことはできない。", correct: false, note: "範囲検索ができないのは「ハッシュインデックス」です。B+木は葉が連結されているため範囲検索が大得意です" },
      { key: "エ", text: "テーブルの全データをメモリ上にキャッシュしなければインデックスとして機能しない。", correct: false, note: "B+木はディスクブロック（ページ）単位で効率よく読み書きできるように設計されています" }
    ],
    explanation: {
      logic: "B+木（Balanced Tree +）の3大特徴：\n1. 平衡木（Balanced）: 根からどの葉までも段数が同じ。データが増減してもブロック分割・併合で高さを均等に保つ。1970年にボーイング科学研究所のルドルフ・ベイヤーとエドワード・M・マクレイトによって考案されたB木が原形です。\n2. 実データは最下層の葉ノードのみに格納: 中間ノードにはキーと分岐ポインタしか置かないため、1ノードに大量の枝を持てて木が低く保たれる（3〜4段で数百万件を収容）。\n3. 葉ノード同士が双方向リストで連結: 範囲検索（age >= 20 AND age <= 30）の際、開始位置を見つけたら葉を横にスキャンするだけで超高速！",
      feDiff: "FEでは「B+木＝インデックス」の暗記ですが、APではカーディナリティ（値の種類数）の高低によるインデックス有効性の違い（性別のような列には効かない）まで問われます。",
      pmBridge: "午後問では「複合インデックス（列A, 列B）を作成した際、列B単独のWHERE条件ではインデックスが使われない（最左プレフィックスの原則）」というSQLチューニングが出題されます。"
    }
  },
  {
    id: "q-db-2pc",
    category: "database",
    categoryLabel: "データベース・分散DB",
    subTopic: "分散トランザクション",
    title: "2相コミットプロトコル（2PC）の挙動",
    source: "AP午前 頻出",
    etymologyRef: "2pc",
    question: "分散データベースにおける2相コミットプロトコルにおいて、調停者（コーディネータ）が参加者にコミット準備要求（Prepare）を送信し、1台の参加者から「コミット不可（No）」の応答が返ってきた場合、調停者が行う動作はどれか。",
    options: [
      { key: "ア", text: "コミット可を返した参加者のみにコミットを指示し、不可の参加者のみロールバックさせる。", correct: false, note: "一部だけコミットすると分散DBの原子性（All or Nothing）が崩壊してしまいます" },
      { key: "イ", text: "すべての参加者に対してロールバック（アボート）を指示する。", correct: true, note: "正解！1台でも不可なら、全員を連帯責任でロールバックさせて一貫性を死守します" },
      { key: "ウ", text: "コミット不可を返した参加者が準備完了になるまで無限にPrepareを再送し続ける。", correct: false, note: "不可が返った時点で即座に中止（Abort）を決定します" },
      { key: "エ", text: "多数決を行い、コミット可が過半数であればコミットを強行する。", correct: false, note: "2PCは全員一致が原則です（PaxosやRaftなどの合意アルゴリズムと混同しないこと）" }
    ],
    explanation: {
      logic: "2相コミット（2PC）の流れ：\n・第1相（準備フェーズ）: 調停者が全参加者に「Prepare（準備せよ）」を送信。\n　→ 全員から「Yes（準備OK）」が返ってきた場合のみ ⇒ 第2相で「Commit（確定）」指示！\n　→ 1台でも「No」または「タイムアウト」が発生した場合 ⇒ 第2相で全員に「Abort/Rollback（全取消）」指示！\n全員一致（All or Nothing）を分散環境で徹底するプロトコルです。",
      feDiff: "FEでは2相コミットという名前の出題ですが、APでは「調停者がダウンした場合の参加者のブロッキング問題」など障害シナリオが出題されます。",
      pmBridge: "午後問では、マイクロサービスアーキテクチャで2PCを使うとロックが長引いて性能が出ないため、Sagaパターンや結果整合性を採用する現代的設計の文脈で登場します。"
    }
  },
  {
    id: "q-db-cap",
    category: "database",
    categoryLabel: "データベース・分散システム",
    subTopic: "NoSQL",
    title: "CAP定理とNoSQLデータベース",
    source: "AP午前 頻出論点",
    etymologyRef: "cap",
    question: "分散システムにおけるCAP定理に関する記述として、適切なものはどれか。",
    options: [
      { key: "ア", text: "一貫性（C）、可用性（A）、分断耐性（P）の3つの性質を同時にすべて満たす分散システムを構築できる。", correct: false, note: "同時に満たせるのは最大2つまでであり、3つ同時は不可能です" },
      { key: "イ", text: "ネットワーク分断（P）が発生した際、データの一貫性（C）を保つためには可用性（A）を犠牲にしなければならない。", correct: true, note: "正解！通信断絶時にデータを厳密に同期しようとすると、応答を停止（可用性低下）せざるを得ません" },
      { key: "ウ", text: "リレーショナルデータベース（RDBMS）の多くは、可用性（A）と分断耐性（P）を最優先したAP型システムである。", correct: false, note: "従来の単一/クラスタRDBMSはACID（一貫性重視＝CPまたはCA型）です" },
      { key: "エ", text: "NoSQLデータベースはトランザクションの完全な直列化（Serializable）を最優先して設計されている。", correct: false, note: "NoSQLは可用性やスケールアウトを優先し、結果整合性（Eventual Consistency）を許容します" }
    ],
    explanation: {
      logic: "CAP定理の3要素：\n・C (Consistency): どのノードを読んでも常に最新で同じ値が返る\n・A (Availability): どのノードも常にエラーにならず応答を返す\n・P (Partition Tolerance): ノード間のネットワークが寸断されても動く。\n分散システムにおいてネットワーク障害（P）は物理的に避けられないため、実質的には「CP（一貫性重視：金融送金など）」か「AP（可用性重視：SNSのいいね数など、後で同期すればOK）」の2択となります。",
      feDiff: "FEにはない比較的新しいAP午前頻出テーマです。RDBMS（ACID・一貫性重視）とNoSQL（BASE・可用性・結果整合性重視）の根本思想の違いとして問われます。",
      pmBridge: "午後問では、世界規模のWebサービスで強固な一貫性を求めるとレイテンシが増大するため、結果整合性を受け入れる設計判断の根拠として出題されます。"
    }
  },

  // =========================================================================
  // 2. ネットワーク分野 (16問) - AP午前最重要・午後頻出論点を完全網羅
  // =========================================================================
  {
    id: "q-net-osi",
    category: "network",
    categoryLabel: "ネットワーク・プロトコル階層",
    subTopic: "OSIモデル",
    title: "OSI基本参照モデルと各層のプロトコル",
    source: "AP午前 必須基礎",
    etymologyRef: "tcp-udp",
    question: "OSI基本参照モデルのネットワーク層（第3層）で動作し、IPパケットのルーティングやエラー通知を担うプロトコルの組合せとして、適切なものはどれか。",
    options: [
      { key: "ア", text: "TCP と UDP", correct: false, note: "TCPとUDPはトランスポート層（第4層）のプロトコルです" },
      { key: "イ", text: "IP と ICMP", correct: true, note: "正解！IP（論理アドレスとルーティング）とICMP（エラー・制御通知）はネットワーク層（第3層）です" },
      { key: "ウ", text: "HTTP と DNS", correct: false, note: "HTTPとDNSはアプリケーション層（第7層）のプロトコルです" },
      { key: "エ", text: "イーサネット（MAC）と PPP", correct: false, note: "イーサネットやPPPはデータリンク層（第2層）のプロトコルです" }
    ],
    explanation: {
      logic: "階層ごとの代表プロトコルとPDU（データ単位）：\n・第7層 アプリケーション層: HTTP, DNS, DHCP, SMTP, NTP [データ/メッセージ]\n・第4層 トランスポート層: TCP, UDP [セグメント/データグラム]\n・第3層 ネットワーク層: IP, ICMP, ARP [パケット]\n・第2層 データリンク層: イーサネット, MAC, VLAN [フレーム]\n・第1層 物理層: ツイストペアケーブル, 光ファイバ [ビット列]。",
      feDiff: "FEでは各層の名前暗記ですが、APでは「L2スイッチ（MACを見る）」「L3スイッチ/ルータ（IPを見る）」「L4スイッチ（ポート番号を見る）」「L7/WAF（HTTPペイロードを見る）」という機器の監視レイヤーとの対応が問われます。",
      pmBridge: "午後問では通信障害発生時に「どのレイヤーまで疎通確認が取れているか（L1リンクアップ→L3 ping疎通→L4 ポートリッスン→L7 応答コード）」の切り分け手順が頻出します。"
    }
  },
  {
    id: "q-net-1",
    category: "network",
    categoryLabel: "ネットワーク・IPアドレス",
    subTopic: "CIDR",
    title: "CIDR と利用可能ホスト数の計算",
    source: "AP午前・午後必須",
    etymologyRef: "cidr",
    question: "IPv4アドレス `192.168.10.0/26` のサブネットにおいて、端末（ホスト）に割り当て可能なIPアドレスの最大数はいくつか。",
    options: [
      { key: "ア", text: "30個", correct: false, note: "/27（ホスト部5bit: 32 - 2 = 30）の場合です" },
      { key: "イ", text: "62個", correct: true, note: "正解！/26はホスト部が6ビット（2^6 = 64）。先頭と末尾の2個を除くため 64 - 2 = 62個です" },
      { key: "ウ", text: "64個", correct: false, note: "ネットワークアドレスとブロードキャストアドレスの2個を引くのを忘れた誤りです" },
      { key: "エ", text: "126個", correct: false, note: "/25（ホスト部7bit: 128 - 2 = 126）の場合です" }
    ],
    explanation: {
      logic: "IPv4は全体で32ビットです。`/26` は先頭26ビットがネットワーク部なので、ホスト部は 32 - 26 = 6ビット です。\n2の6乗 = 64個のアドレス空間がありますが、以下の2つは端末に割り当てられません：\n1. ホスト部がすべて0のアドレス（ネットワークアドレス）\n2. ホスト部がすべて1のアドレス（ブロードキャストアドレス）\nしたがって、割り当て可能ホスト数は 64 - 2 = 62個 です。",
      feDiff: "FEの基礎知識ですが、APでは午後問題で「営業部45台、開発部100台、サーバ室12台にアドレスを重複なく無駄なく割り振るための各サブネットのプレフィックス長を答えよ」というVLSM設計問題として出題されます。",
      pmBridge: "サブネットの境界線（ビットマスク）を頭の中でパッとイメージできるかどうかが、午後ネットワーク問題の解答速度を決定づけます。"
    }
  },
  {
    id: "q-net-vlsm",
    category: "network",
    categoryLabel: "ネットワーク・IPアドレス",
    subTopic: "VLSM",
    title: "VLSM（可変長サブネットマスク）による最適アドレス設計",
    source: "AP午後 実践必須",
    etymologyRef: "cidr",
    question: "社内ネットワークにおいて、1つのサブネットに50台のPCを接続したい。ルータのデフォルトゲートウェイ用アドレスを1個割り当てることを考慮した場合、このサブネットに割り当てるべきプレフィックス長（サブネットマスク）として最も無駄のない最小のものはどれか。",
    options: [
      { key: "ア", text: "/27 (255.255.255.224)", correct: false, note: "利用可能ホストは 2^5 - 2 = 30台 であり、51台（PC50+ルータ1）には足りません" },
      { key: "イ", text: "/26 (255.255.255.192)", correct: true, note: "正解！利用可能ホストは 2^6 - 2 = 62台。51台を過不足なく収容できる最小プレフィックスです" },
      { key: "ウ", text: "/25 (255.255.255.128)", correct: false, note: "利用可能ホストは126台で収容可能ですが、アドレス空間の無駄が大きく最小ではありません" },
      { key: "エ", text: "/24 (255.255.255.0)", correct: false, note: "254台収容できますが、アドレスを浪費しすぎます" }
    ],
    explanation: {
      logic: "必要アドレス数の計算：\nPC 50台 ＋ ルータ（デフォルトGW）1台 ＝ 51個の利用可能IPが必要。\nさらにネットワークアドレス（1個）とブロードキャストアドレス（1個）が必要なので、合計 51 + 2 = 53個以上のアドレス枠が必要です。\n2のべき乗で53以上となる最小値は 2^6 = 64（ホスト部6ビット）。\nプレフィックス長は 32 - 6 = /26 となります！",
      feDiff: "FEでは単一サブネットの計算ですが、AP午後では「192.168.1.0/24を分割して3つの部署に重複なく切り分ける具体的なIP範囲（開始〜終了）の穴埋め」が毎年出題されます。",
      pmBridge: "「ルータやサーバのIP分を足し忘れて/27にしてしまいアドレスが足りなくなる」という実務・試験あるあるトラップに気をつけましょう。"
    }
  },
  {
    id: "q-net-private-ip",
    category: "network",
    categoryLabel: "ネットワーク・IPアドレス",
    subTopic: "プライベートIP",
    title: "プライベートIPアドレスの規格範囲（RFC 1918）",
    source: "AP午前 頻出",
    etymologyRef: "cidr",
    question: "RFC 1918 で規定されているIPv4プライベートIPアドレスの範囲として、正しいものはどれか。",
    options: [
      { key: "ア", text: "10.0.0.0 ～ 10.255.255.255 （クラスA相当）", correct: true, note: "正解！10.0.0.0/8 はクラスAのプライベートアドレス範囲です" },
      { key: "イ", text: "172.16.0.0 ～ 172.16.255.255 （クラスB相当）", correct: false, note: "クラスBのプライベート範囲は 172.16.0.0 ～ 172.31.255.255（/12）です" },
      { key: "ウ", text: "192.168.0.0 ～ 192.168.0.255 （クラスC相当）", correct: false, note: "クラスCのプライベート範囲は 192.168.0.0 ～ 192.168.255.255（/16）です" },
      { key: "エ", text: "127.0.0.0 ～ 127.255.255.255 （クラスA相当）", correct: false, note: "127.0.0.0/8 はループバックアドレス（自分自身）用の予約空間です" }
    ],
    explanation: {
      logic: "プライベートIPアドレスの3大予約空間（RFC 1918）：\n・クラスA: 10.0.0.0/8 （10.0.0.0 ～ 10.255.255.255: 約1677万個）\n・クラスB: 172.16.0.0/12 （172.16.0.0 ～ 172.31.255.255: 16個のクラスBブロック）\n・クラスC: 192.168.0.0/16 （192.168.0.0 ～ 192.168.255.255: 256個のクラスCブロック）\nこれらはインターネット上でルーティングされず、企業内LANで自由に使えます。",
      feDiff: "FEでは192.168〜を見慣れているだけですが、APではクラスBの範囲（172.16〜172.31）の境界や、社内VPN接続時にアドレス重複が起きない設計が出題されます。",
      pmBridge: "午後問では「本社と支社で同じ192.168.1.0/24を使ってしまっておりVPN接続で通信できないトラブルとNATによる解決策」が出題されます。"
    }
  },
  {
    id: "q-net-napt",
    category: "network",
    categoryLabel: "ネットワーク・IP変換",
    subTopic: "NAT/NAPT",
    title: "NAT と NAPT（IPマスカレード）の決定的違い",
    source: "AP午前 最頻出",
    etymologyRef: "nat-napt",
    question: "社内LANの複数の端末が、同時に1個のグローバルIPアドレスを共有してインターネットにアクセスできるようにする技術はどれか。",
    options: [
      { key: "ア", text: "静的NAT（Static NAT）", correct: false, note: "静的NATはプライベートIPとグローバルIPを1対1で固定変換するため、台数分のグローバルIPが必要です" },
      { key: "イ", text: "NAPT（IPマスカレード）", correct: true, note: "正解！IPアドレスに加えて『ポート番号』も変換することで、1個のグローバルIPを複数台で共有します" },
      { key: "ウ", text: "DHCP", correct: false, note: "LAN内の端末にIPアドレスを動的に自動配布するプロトコルです" },
      { key: "エ", text: "ARP", correct: false, note: "IPアドレスからMACアドレスを調べるプロトコルです" }
    ],
    explanation: {
      logic: "NATとNAPTの違い：\n・NAT（Network Address Translation）: IPアドレスのみを変換。1対1変換なのでグローバルIPの節約にはならない。\n・NAPT（Network Address Port Translation / IPマスカレード）: IPアドレス ＋ TCP/UDPポート番号 を変換。ポート番号（最大約6万個）を使って識別するため、1個のグローバルIPで数百〜数千台のPCが同時にインターネット通信できます。",
      feDiff: "FEでは名前の選択ですが、AP午後ではルータ内部の「NAT変換テーブル（変換前IP:ポート ⇔ 変換後IP:ポート）」の推移を追わせる問題が出ます。",
      pmBridge: "NAPTのセキュリティ上の副産物として「外から社内PCへは直接通信を開始できない（テーブルに対応がないため）」という性質があり、これがファイアウォール的な役割を果たしています。"
    }
  },
  {
    id: "q-net-arp",
    category: "network",
    categoryLabel: "ネットワーク・アドレス解決",
    subTopic: "ARP",
    title: "ARP（Address Resolution Protocol）の通信手順",
    source: "AP午前 頻出",
    etymologyRef: "arp",
    question: "同一LAN内の端末Aが端末Bと通信を開始する際、端末BのIPアドレスは分かっているがMACアドレスが不明である。端末Aが端末BのMACアドレスを取得する手順として、適切なものはどれか。",
    options: [
      { key: "ア", text: "端末AはARP要求パケットをユニキャストで端末Bに送り、端末BはARP応答をブロードキャストで返す。", correct: false, note: "端末BのMACアドレスが不明なので、最初はユニキャストで送れません" },
      { key: "イ", text: "端末AはARP要求パケットをブロードキャストでLAN全体に送信し、端末BはARP応答をユニキャストで端末Aに返す。", correct: true, note: "正解！要求は全員に叫ぶ「ブロードキャスト」、返事は名指しの「ユニキャスト」です" },
      { key: "ウ", text: "端末Aはデフォルトゲートウェイに問い合わせ、ルータが保持するARPテーブルから端末BのMACアドレスを取得する。", correct: false, note: "同一LAN内の通信ではルータを介さず端末同士で直接ARPをやり取りします" },
      { key: "エ", text: "端末AはDNSサーバに問合せパケットを送信し、DNSの逆引きによってMACアドレスを取得する。", correct: false, note: "DNSはドメイン名とIPアドレスの対応を調べるもので、MACアドレスは扱いません" }
    ],
    explanation: {
      logic: "ARPの2ステップ：\n1. ARP要求（ARP Request）: 宛先MACを「FF:FF:FF:FF:FF:FF（ブロードキャスト）」にして全員に送信。「IP 192.168.1.10 を持っている人はMACアドレスを教えて！」\n2. ARP応答（ARP Reply）: 該当する端末Bだけが、送信元端末AのMACアドレス宛てに「ユニキャスト（1対1）」で返信。「私のMACアドレスは 12:34:56:78:9A:BC です！」\n一度得た情報はARPテーブル（キャッシュ）に一定時間保存されます。",
      feDiff: "FEではARPの用途だけですが、APでは「ルータを超えてARP要求は届かない（ブロードキャストドメインで止まる）ため、別ネットワーク宛ての通信ではデフォルトGWのMACアドレスをARPで引く」という動作原理が問われます。",
      pmBridge: "午後問では、攻撃者が偽のARP応答を流して通信を盗聴する「ARPスプーフィング（ARPキャッシュポイズニング）」攻撃とその対策（Dynamic ARP Inspection）が出題されます。"
    }
  },
  {
    id: "q-net-icmp",
    category: "network",
    categoryLabel: "ネットワーク・障害診断",
    subTopic: "ICMP",
    title: "ICMP と traceroute の仕組み",
    source: "AP午前 頻出",
    etymologyRef: "icmp",
    question: "ネットワークの経路調査コマンドである `traceroute`（Windowsでは `tracert`）が、宛先までの経由ルータを特定するために利用しているIPパケットの仕組みはどれか。",
    options: [
      { key: "ア", text: "IPヘッダのTTL（Time To Live）フィールドの値を 1 から順に増やして送信する。", correct: true, note: "正解！TTLが0になったルータが返す「ICMP Time Exceeded（時間超過）」通知を利用します" },
      { key: "イ", text: "IPヘッダのチェックサムを意図的に壊してルータにエラーを返させる。", correct: false, note: "チェックサムエラーのパケットはルータで黙って破棄され、返信は来ません" },
      { key: "ウ", text: "TCPのSYNパケットをポート番号を変えながら連続送信する。", correct: false, note: "これはポートスキャンの仕組みであり、tracerouteの標準的経路特定ロジックではありません" },
      { key: "エ", text: "ARP要求を送信し、経由する全ルータにMACアドレスを強制返信させる。", correct: false, note: "ARPはルータを超えられないため、遠隔の経路調査には使えません" }
    ],
    explanation: {
      logic: "tracerouteの天才的メカニズム：\nIPパケットにはループを防ぐための寿命「TTL（Time To Live）」があります。ルータを経由するたびにTTLが1減り、0になるとルータはパケットを破棄して送信元に「ICMP Type 11: Time Exceeded（時間超過エラー）」を返します。\ntracerouteはまず TTL=1 で送信 → 1台目のルータからエラー返信（1台目判明！）\n次に TTL=2 で送信 → 2台目のルータからエラー返信（2台目判明！）\nこうしてTTLを1ずつ増やしながら目的地までの全ルータのIPを暴き出します。",
      feDiff: "FEではping（ICMPエコー）の暗記ですが、APではtracerouteのTTL減算ロジックや、ルータがICMP応答を拒否した場合の「* * *」表示の理由が出題されます。",
      pmBridge: "午後問では、MTUを超えるパケットを分割禁止（DF=1）で送ることで経路上の最小MTUを測定する「Path MTU Discovery（これもICMPを利用）」が頻出です。"
    }
  },
  {
    id: "q-net-tcp-handshake",
    category: "network",
    categoryLabel: "トランスポート層・TCP",
    subTopic: "TCP",
    title: "TCP 3ウェイハンドシェイクとシーケンス番号",
    source: "AP午前 最頻出",
    etymologyRef: "tcp-udp",
    question: "クライアントとサーバ間でTCPコネクションを確立する際に行われる「3ウェイハンドシェイク」の手順として、正しいものはどれか。",
    options: [
      { key: "ア", text: "① クライアントからSYN送信 → ② サーバからACK送信 → ③ クライアントからSYN-ACK送信", correct: false, note: "②と③のフラグのやり取りが誤っています" },
      { key: "イ", text: "① クライアントからSYN送信 → ② サーバからSYN+ACK送信 → ③ クライアントからACK送信", correct: true, note: "正解！SYN（接続要求）→ SYN+ACK（承諾＋要求）→ ACK（承諾確認）の3往復です" },
      { key: "ウ", text: "① クライアントからFIN送信 → ② サーバからACK送信 → ③ クライアントからRST送信", correct: false, note: "これはコネクション切断（終了）時の手順です" },
      { key: "エ", text: "① クライアントからDATA送信 → ② サーバからACK送信 → ③ クライアントからEND送信", correct: false, note: "TCPの確立手順ではありません" }
    ],
    explanation: {
      logic: "3ウェイハンドシェイク（3-way handshake）の流れ：\n1. クライアント → サーバ: SYN（Synchronize: こちらの初期シーケンス番号はXです。繋いでいいですか？）\n2. サーバ → クライアント: SYN + ACK（Xを受け取りました、次はX+1を送ってください。こちらの初期シーケンス番号はYです）\n3. クライアント → サーバ: ACK（Acknowledgment: Yを受け取りました、次はY+1を送ってください）。\nこの3往復で双方がお互いの通信準備完了を確認します。",
      feDiff: "FEではSYNとACKの名前だけですが、APではシーケンス番号と確認応答番号（ACK番号）の増分ルール（SYNフラグ自体が1バイト消費する）まで計算させられます。",
      pmBridge: "午後問では、SYNパケットだけを大量に送りつけてACKを返さずサーバのリソースを枯渇させる「SYN Flood攻撃（DoS）」とその対策（SYN Cookies）が出題されます。"
    }
  },
  {
    id: "q-net-tcp-window",
    category: "network",
    categoryLabel: "トランスポート層・TCP",
    subTopic: "TCP",
    title: "TCPスライディングウィンドウとフロー制御",
    source: "AP午前 頻出",
    etymologyRef: "tcp-udp",
    question: "TCPのスライディングウィンドウ制御における「ウィンドウサイズ」が表しているものとして、適切なものはどれか。",
    options: [
      { key: "ア", text: "1つのパケット（セグメント）に格納できる最大のデータ長", correct: false, note: "これは MSS（Maximum Segment Size）の説明です" },
      { key: "イ", text: "送信側が受信側からの確認応答（ACK）を待たずに連続して送信できるデータ量", correct: true, note: "正解！相手のバッファ空き容量に応じて、ACKを待たずにパイプライン送信できる上限バイト数です" },
      { key: "ウ", text: "通信相手との間で1秒間に送受信できる最大パケット数", correct: false, note: "これはパケットレート（pps）の説明です" },
      { key: "エ", text: "パケットが破損した際に再送を試みる最大回数", correct: false, note: "これは再送試行回数の説明です" }
    ],
    explanation: {
      logic: "スライディングウィンドウ制御（Sliding Window Flow Control）：\nもしパケットを1個送るたびに相手からのACKを待っていたら、通信の往復遅延時間（RTT）のせいで速度が出ません。\n受信側はACKパケットの中に「今の私の空きバッファ容量（ウィンドウサイズ）」を書いて送信側に伝えます。送信側はそのサイズ分までならACKを待たずに一気にダッシュで送り続けます。データが処理されるとウィンドウが右にスライドしていきます。",
      feDiff: "基本情報ではウィンドウ制御の名前程度ですが、AP午前では「ウィンドウサイズが64KB、往復時間RTTが20msのときの最大理論スループット計算」が出題されます。",
      pmBridge: "午後問では、パケットロスが発生した際にウィンドウサイズを急激に小さくしてネットワークのパンクを防ぐ「輻輳制御（スロースタート、輻輳回避）」のメカニズムが出題されます。"
    }
  },
  {
    id: "q-net-tcp-vs-udp",
    category: "network",
    categoryLabel: "トランスポート層・TCP/UDP",
    subTopic: "UDP",
    title: "TCP と UDP の特徴比較と適用領域",
    source: "AP午前 最頻出",
    etymologyRef: "tcp-udp",
    question: "TCPと比較したときの UDP の特徴として、適切なものはどれか。",
    options: [
      { key: "ア", text: "コネクション確立手順を省略し、ヘッダオーバーヘッドが小さいため、リアルタイム通信や同報通信に適している。", correct: true, note: "正解！ヘッダはわずか8バイト、ハンドシェイクなしで即送信、ブロードキャスト/マルチキャストも可能です" },
      { key: "イ", text: "シーケンス番号による順序制御と再送制御を行い、通信の信頼性を保証する。", correct: false, note: "これはTCPの特徴です。UDPは順序保証も再送も行いません" },
      { key: "ウ", text: "フロー制御機能を備えており、受信側のバッファ溢れを自動的に防止する。", correct: false, note: "UDPにはフロー制御やウィンドウ制御はありません" },
      { key: "エ", text: "Webページ閲覧（HTTP/1.1）やメール送信（SMTP）など、データの欠損が許されない通信で主に使われる。", correct: false, note: "これらは信頼性が必須なためTCPを用います" }
    ],
    explanation: {
      logic: "TCPとUDPの対比まとめ：\n・TCP（重厚・確実）: コネクション型、ヘッダ20B〜、順序保証あり、再送あり、輻輳制御あり。用途: Web(HTTP), メール(SMTP), ファイル転送(FTP), リモート接続(SSH)。\n・UDP（身軽・爆速）: コネクションレス、ヘッダ8B固定、順序保証なし、再送なし。用途: DNS問合せ, DHCP, NTP, 音声通話(VoIP), オンラインゲーム, 映像配信, QUIC(HTTP/3)。",
      feDiff: "FEでは特徴の二者択一ですが、APでは「なぜDNSやDHCPはTCPではなくUDPを使うのか（1往復で終わる軽量な問い合わせに3ウェイハンドシェイクは無駄だから）」という技術選定の理由が問われます。",
      pmBridge: "最新のWeb標準であるHTTP/3が、TCPのハンドシェイク遅延や先頭ブロック遅延（HoLブロッキング）を嫌ってUDPベースの「QUIC」を採用した背景は午後試験の超重要トレンドです。"
    }
  },
  {
    id: "q-net-routing-longest",
    category: "network",
    categoryLabel: "ネットワーク・ルーティング",
    subTopic: "ルーティング",
    title: "ルーティングにおける最長一致（ロンゲストマッチ）原則",
    source: "AP午前・午後超頻出",
    etymologyRef: "cidr",
    question: "ルータのルーティングテーブルに以下の4つの経路情報があるとき、宛先IPアドレス `192.168.1.130` のパケットが転送されるネクストホップ（転送先）はどれか。\n・経路1: `192.168.0.0/16` → ネクストホップ A\n・経路2: `192.168.1.0/24` → ネクストホップ B\n・経路3: `192.168.1.128/26` → ネクストホップ C\n・経路4: `0.0.0.0/0` (デフォルトルート) → ネクストホップ D",
    options: [
      { key: "ア", text: "ネクストホップ A", correct: false, note: "/16（先頭16bit一致）ですが、より長く一致する経路があります" },
      { key: "イ", text: "ネクストホップ B", correct: false, note: "/24（先頭24bit一致）ですが、まだより長く一致する経路があります" },
      { key: "ウ", text: "ネクストホップ C", correct: true, note: "正解！/26（先頭26bit一致）が最もプレフィックス長が長いため最長一致で選ばれます" },
      { key: "エ", text: "ネクストホップ D", correct: false, note: "デフォルトルートは他のどの経路にも一致しない場合の最後の砦です" }
    ],
    explanation: {
      logic: "最長一致（ロンゲストマッチ / Longest Prefix Match）原則：\nルータがパケットを転送する際、複数の経路にマッチした場合は「プレフィックス長（サブネットマスク）が最も長い（＝より具体的で絞り込まれた）経路」を最優先で選択します。\n宛先 192.168.1.130 に対し：\n・経路1 (/16): マッチ（一致長 16bit）\n・経路2 (/24): マッチ（一致長 24bit）\n・経路3 (/26): 130 は 128〜191 の範囲内なのでマッチ！（一致長 26bit ★最長！）\nしたがって ネクストホップ C が選ばれます。",
      feDiff: "FEではデフォルトゲートウェイの概念だけですが、AP午後ではルーティングテーブルの空欄穴埋め問題として最長一致がほぼ毎回出題されます。",
      pmBridge: "複数のネットワーク経路を集約する「ルート集約（経路集約）」と最長一致の組み合わせは、巨大な企業WANやインターネット（BGP）の基盤知識です。"
    }
  },
  {
    id: "q-net-routing-proto",
    category: "network",
    categoryLabel: "ネットワーク・ルーティング",
    subTopic: "動的ルーティング",
    title: "動的ルーティングプロトコル（RIP / OSPF / BGP）の分類",
    source: "AP午前 頻出",
    etymologyRef: "ospf-rip",
    question: "ルーティングプロトコルのうち、自律システム（AS: Autonomous System）相互間を接続する EGP（Exterior Gateway Protocol）としてインターネットで広く使用されているものはどれか。",
    options: [
      { key: "ア", text: "RIP（Routing Information Protocol）", correct: false, note: "RIPは組織内部（AS内）で動作するIGP（ディスタンスベクター型）です" },
      { key: "イ", text: "OSPF（Open Shortest Path First）", correct: false, note: "OSPFは組織内部（AS内）で動作するIGP（リンクステート型）です" },
      { key: "ウ", text: "BGP（Border Gateway Protocol）", correct: true, note: "正解！世界中のISPや大企業（AS）同士の境界を結ぶ唯一のパスベクター型EGPです" },
      { key: "エ", text: "VRRP（Virtual Router Redundancy Protocol）", correct: false, note: "デフォルトゲートウェイとなるルータを冗長化するためのプロトコルです" }
    ],
    explanation: {
      logic: "ルーティングプロトコルの分類マップ：\n1. IGP（Interior Gateway Protocol: 組織内・AS内の道案内）\n　・ディスタンスベクター型: RIP（ホップ数のみ、最大15ホップ、小規模向け）\n　・リンクステート型: OSPF（回線コスト・帯域を考慮、ダイクストラ法、エリア分割、中〜大規模向け）\n2. EGP（Exterior Gateway Protocol: 組織間・AS間の道案内）\n　・パスベクター型: BGP-4（経由するASのリストを交換、ポリシー制御、インターネットの根幹）。",
      feDiff: "FEでは名前の選択ですが、APでは「RIPのコンバージェンス（収束）の遅さとルーティングループ対策（スプリットホライズン）」や「OSPFのDR/BDR選出」まで出題されます。",
      pmBridge: "午後のネットワークでは、マルチホーム接続（2社のISPとBGPで接続して回線冗長化を図る）の設計問題が頻出テーマです。"
    }
  },
  {
    id: "q-net-dns",
    category: "network",
    categoryLabel: "ネットワーク・名前解決",
    subTopic: "DNS",
    title: "DNSレコードの役割と階層構造",
    source: "AP午前 最頻出",
    etymologyRef: "dns",
    question: "DNS（Domain Name System）のゾーンファイルに記述するリソースレコードのうち、ホスト名に対する IPv6 アドレスを定義するレコード種別はどれか。",
    options: [
      { key: "ア", text: "A レコード", correct: false, note: "Aレコードはホスト名に対する『IPv4アドレス（32ビット）』を対応付けるものです" },
      { key: "イ", text: "AAAA レコード（クアッドエー）", correct: true, note: "正解！IPv4の4倍の長さ（128ビット）を持つ『IPv6アドレス』を対応付けます" },
      { key: "ウ", text: "CNAME レコード", correct: false, note: "既存の正式ホスト名に対する「別名（エイリアス）」を定義するレコードです" },
      { key: "エ", text: "MX レコード", correct: false, note: "そのドメイン宛ての電子メールを配送すべき「メールサーバ（Mail Exchanger）」を指定します" }
    ],
    explanation: {
      logic: "代表的なDNSリソースレコード一覧：\n・A: IPv4アドレス（Address: 32bit）\n・AAAA: IPv6アドレス（IPv4の4倍なのでAが4つ: 128bit）\n・CNAME: 正式名への別名エイリアス（Canonical Name）\n・MX: メール配送先サーバのホスト名と優先度（Mail eXchanger）\n・PTR: IPアドレスからホスト名を逆引き（Pointer）\n・NS: そのゾーンの権威DNSサーバ（Name Server）\n・TXT: 任意のテキスト（SPFレコードやドメイン所有権確認に使用）。",
      feDiff: "FEではAレコードやMXレコードの存在を知っていれば解けましたが、AP午後ではTXTレコードに記述するSPF構文（`v=spf1 ip4:... ~all`）やCNAMEの制約まで問われます。",
      pmBridge: "DNSキャッシュサーバ（社内PCからの問い合わせを代行して世界中をたずね歩く）と、権威DNSサーバ（自社ドメインの正解情報を持つ）のセキュリティ上の役割分離は午後セキュリティの必須知識です。"
    }
  },
  {
    id: "q-net-dhcp",
    category: "network",
    categoryLabel: "ネットワーク・自動設定",
    subTopic: "DHCP",
    title: "DHCP の4ステップとリレーエージェント",
    source: "AP午前 頻出",
    etymologyRef: "dhcp",
    question: "ルータで区切られた別のサブネットに存在するDHCPサーバから、クライアントPCがIPアドレスを自動取得できるようにするために、ルータやL3スイッチに必要な機能はどれか。",
    options: [
      { key: "ア", text: "NAT機能", correct: false, note: "IPアドレスを変換する機能であり、ブロードキャストパケットの転送とは異なります" },
      { key: "イ", text: "DHCPリレーエージェント機能", correct: true, note: "正解！クライアントのブロードキャスト要求を受け取り、別セグメントのDHCPサーバへユニキャストで中継します" },
      { key: "ウ", text: "プロキシ（Proxy）機能", correct: false, note: "Webアクセス等を代理中継する機能です" },
      { key: "エ", text: "パケットフィルタリング機能", correct: false, note: "不正なパケットを遮断するセキュリティ機能です" }
    ],
    explanation: {
      logic: "なぜDHCPリレーエージェントが必要なのか？\nDHCPクライアントは最初は自分のIPを持たないため、「誰かIPをください！」とブロードキャスト（宛先 255.255.255.255）で叫びます（DHCP DISCOVER）。\nしかしルータはブロードキャストを遮断して通しません！そのため、各セグメントごとにDHCPサーバを置かないとIPが配れません。\nそこでルータに「DHCPリレーエージェント」を設定すると、ルータがブロードキャストを拾い、遠くの集中DHCPサーバ宛てにユニキャストパケットに詰め直して転送してくれます。",
      feDiff: "FEではDHCPの4手順（DISCOVER → OFFER → REQUEST → ACK）ですが、APでは企業の大規模LAN設計として「DHCPサーバの集約とリレーエージェント」が頻出します。",
      pmBridge: "午後問では、DHCPリレーエージェントがパケットに自サブネットのIP（GIADDR）を付与することで、サーバ側がどのサブネットのアドレスプールから貸し出すべきかを判別する仕組みが問われます。"
    }
  },
  {
    id: "q-net-vlan",
    category: "network",
    categoryLabel: "ネットワーク・仮想化",
    subTopic: "VLAN",
    title: "タグVLAN（IEEE 802.1Q）とトランクリンク",
    source: "AP午前・午後最頻出",
    etymologyRef: "vlan",
    question: "スイッチ間で複数のVLANのトラフィックを1本の物理ケーブルで相互伝送するために、イーサネットフレーム内に VLAN ID などの識別タグを付加する標準規格はどれか。",
    options: [
      { key: "ア", text: "IEEE 802.1D", correct: false, note: "スパニングツリープロトコル（STP: ループ防止）の規格です" },
      { key: "イ", text: "IEEE 802.1Q", correct: true, note: "正解！タグVLAN（Tagging VLAN）の業界標準規格であり、フレームに4バイトのVLANタグを挿入します" },
      { key: "ウ", text: "IEEE 802.1X", correct: false, note: "EAPを用いたポートベースネットワーク認証の規格です" },
      { key: "エ", text: "IEEE 802.3ad", correct: false, note: "複数LANケーブルを束ねて帯域を広げるリンクアグリゲーション（LACP）の規格です" }
    ],
    explanation: {
      logic: "VLANの接続方式：\n1. アクセスリンク（ポートVLAN）: 一般のPCを接続するポート。パケットは通常のイーサネットフレーム（タグなし）。\n2. トランクリンク（タグVLAN: IEEE 802.1Q）: スイッチ同士を結ぶポート。どのVLANのパケットかが分かるよう、フレームの中に12ビットの「VLAN ID（1〜4094）」を含む4バイトのタグを挟み込んで1本のケーブルで相乗り伝送します。相手のスイッチに届いたらタグを外して該当VLANへ届けます。",
      feDiff: "FEではVLANの概念暗記ですが、AP午後では「トランクポートの設定漏れで別棟のPCと通信できないトラブル」の解析が頻繁に出題されます。",
      pmBridge: "VLANでセグメントを分けた後、「異なるVLAN同士が通信するためにはL3スイッチ（VLAN間ルーティング）を経由しなければならない」という原則が午後ネットワークの得点源です。"
    }
  },
  {
    id: "q-net-calc-throughput",
    category: "network",
    categoryLabel: "ネットワーク・通信計算",
    subTopic: "伝送時間計算",
    title: "回線伝送時間と回線利用率の計算",
    source: "AP午前・午後計算必須",
    etymologyRef: "tcp-udp",
    question: "伝送速度 100 Mbps の回線を用いて、サイズ 150 Mバイト のファイルを転送する。回線利用率が 60% であるとき、転送完了までに要する時間は何秒か。",
    options: [
      { key: "ア", text: "12 秒", correct: false, note: "バイトからビットへの8倍換算を忘れた誤りです（150 ÷ (100×0.6) = 2.5 × ?）" },
      { key: "イ", text: "20 秒", correct: true, note: "正解！150MB × 8 = 1,200Mbit。実効速度 = 100Mbps × 0.6 = 60Mbps。1,200 ÷ 60 = 20秒" },
      { key: "ウ", text: "25 秒", correct: false, note: "利用率60%を考慮しなかった場合の誤りです（1,200 ÷ 100 = 12秒 などの変形）" },
      { key: "エ", text: "30 秒", correct: false, note: "計算ミスです" }
    ],
    explanation: {
      logic: "伝送時間計算の鉄則手順：\n【ステップ1: バイト(B)をビット(bit)に直す！】★試験最大の罠！\n150 Mバイト ＝ 150 × 8 ＝ 1,200 Mビット\n\n【ステップ2: 実効伝送速度を求める！】\n公称速度 100 Mbps × 回線利用率 0.6 ＝ 60 Mbps（毎秒60Mビット転送可能）\n\n【ステップ3: 割り算する！】\n所要時間 ＝ 1,200 Mbit ÷ 60 Mbps ＝ 20 秒！",
      feDiff: "FEの定番計算ですが、AP午後ではこれに「TCPヘッダ・IPヘッダのオーバーヘッド（約1.5%）」や「往復遅延時間（RTT）による待ち時間」が加算された複合計算が出題されます。",
      pmBridge: "午後問では「バックアップウィンドウ（深夜3時間の停止時間）内に全DBバックアップ（2TB）を遠隔地へ転送完了するために必要な最低回線帯域は何Mbpsか」という逆算問題が出ます。"
    }
  },

  // =========================================================================
  // 3. その他基盤テクノロジ（プロセッサ・OS・システム・セキュリティ）(5問)
  // =========================================================================
  {
    id: "q-proc-1",
    category: "processor",
    categoryLabel: "プロセッサ・メモリ",
    subTopic: "キャッシュ",
    title: "キャッシュメモリの実効アクセス時間",
    source: "AP午前 頻出パターン",
    etymologyRef: null,
    question: "アクセス時間が 15 ナノ秒のキャッシュメモリと、アクセス時間が 60 ナノ秒の主記憶をもつシステムがある。CPUがメモリにアクセスした際、要求するデータがキャッシュメモリに存在する確率（ヒット率）が 80% であるとき、このシステムの実効アクセス時間は何ナノ秒か。",
    options: [
      { key: "ア", text: "27", correct: false, note: "キャッシュミス時に『キャッシュ時間＋主記憶時間』を合算する誤り（15×0.8 + (15+60)×0.2 = 12+15 = 27）。実際は主記憶へのアクセスに置き換わる（排他的）" },
      { key: "イ", text: "24", correct: true, note: "正解！ヒット時 15ns × 0.8 + ミス時 60ns × 0.2 = 12 + 12 = 24ns" },
      { key: "ウ", text: "51", correct: false, note: "ヒット率とミス率を逆に適用した誤り（15×0.2 + 60×0.8 = 3+48 = 51）" },
      { key: "エ", text: "75", correct: false, note: "ヒット率を考慮せず単純合算した誤り（15+60 = 75）" }
    ],
    explanation: {
      logic: "実効アクセス時間 = (キャッシュのアクセス時間 × ヒット率) + (主記憶のアクセス時間 × (1 - ヒット率)) で計算します。\n15ns × 0.8 + 60ns × (1 - 0.8) = 12ns + 12ns = 24ナノ秒 となります。",
      feDiff: "基本情報では公式そのままの代入が多いですが、応用情報では「キャッシュを2段（L1とL2）にした場合」や「書き込み方式（ライトスルー vs ライトバック）による書き込みペナルティ」が加わる発展問題が出ます。",
      pmBridge: "午後問題では、キャッシュヒット率のわずかな低下（例: 95%→90%）がシステム全体の処理能力（スループット）に与える影響を定量的に計算させられます。"
    }
  },
  {
    id: "q-proc-2",
    category: "processor",
    categoryLabel: "プロセッサアーキテクチャ",
    subTopic: "パイプライン",
    title: "パイプライン処理とハザード",
    source: "AP午前・午後基礎",
    etymologyRef: "cisc-risc",
    question: "パイプライン制御のプロセッサにおいて、先行する命令の実行結果を後続の命令が利用するために、先行命令の書き込みが完了するまで後続命令が待たされる現象を何と呼ぶか。",
    options: [
      { key: "ア", text: "構造ハザード", correct: false, note: "同じハードウェア資源（メモリやALU等）を複数命令が同時に取り合うことによる停止" },
      { key: "イ", text: "制御ハザード", correct: false, note: "条件分岐命令によって、次に実行すべき命令が決まらずパイプラインが乱れること" },
      { key: "ウ", text: "データハザード", correct: true, note: "正解！データの依存関係（RAW等）により、前命令の演算結果を待たされる現象" },
      { key: "エ", text: "割り込みハザード", correct: false, note: "このような専門用語は存在しません（割り込み処理によるパイプライン中断はあるがハザード分類ではない）" }
    ],
    explanation: {
      logic: "命令の依存関係が原因で発生する待ち時間は「データハザード」です。特に『先行命令が書く（Write）前に、後続命令が読もう（Read）とする』現象を RAW (Read After Write) ハザードと呼びます。",
      feDiff: "基本情報では「パイプラインハザード」という単語を知っていれば解けましたが、APでは『構造・制御・データ』の3つの原因の違いと、それぞれのハードウェア的対策（フォワーディング、分岐予測・遅延分岐）まで問われます。",
      pmBridge: "フォワーディング（バイパス）回路があれば、先行命令のWB（書込み）ステージを待たずにEX（実行）完了直後の出力を後続命令に横流しできるため、ストール（バブル）を最小限に抑えられます。"
    }
  },
  {
    id: "q-os-1",
    category: "os",
    categoryLabel: "メモリ管理・仮想記憶",
    subTopic: "仮想記憶",
    title: "LRUページ置換アルゴリズム",
    source: "AP午前 頻出",
    etymologyRef: "lru",
    question: "仮想記憶システムにおけるページ置換アルゴリズムのうち、最も長い間参照されていないページを選択して主記憶から追い出す方式はどれか。",
    options: [
      { key: "ア", text: "FIFO (First-In First-Out)", correct: false, note: "主記憶に『最も昔に読み込まれたページ』を追い出す方式。最近頻繁に使われていても追い出される欠点がある" },
      { key: "イ", text: "LFU (Least Frequently Used)", correct: false, note: "過去の『参照回数が最も少ないページ』を追い出す方式。昔たくさん使われて今は不要なページが残りやすい" },
      { key: "ウ", text: "LRU (Least Recently Used)", correct: true, note: "正解！『最も最近使われていない（直近の参照時刻が最も古い）』ページを追い出す方式" },
      { key: "エ", text: "OPT (Optimal)", correct: false, note: "『今後最も長い間参照されないページ』を追い出す理論上の理想方式（未来予知が必要なため現実には実装不可）" }
    ],
    explanation: {
      logic: "英単語の語源通りの意味です。Least（最も〜ない）+ Recently（最近）+ Used（使われた）＝一番最近使われていないものを追い出します。",
      feDiff: "FEでは用語選択ですが、APでは『枠数が3のメモリに参照列 1, 2, 3, 2, 4, 1, 5... が与えられたとき、ページフォールトが何回発生するか？』を自力でシミュレーションさせる問題が出ます。",
      pmBridge: "プログラムの『局所性（時間的局所性・空間的局所性）』と結びついており、メモリ不足でページ置換が頻発しCPU使用率が激減する『スラッシング（Thrashing）』の防止策の理解に直結します。"
    }
  },
  {
    id: "q-sys-1",
    category: "system",
    categoryLabel: "システム構成・信頼性",
    subTopic: "RAID",
    title: "RAID 5 の構成と耐障害性",
    source: "AP午前 頻出",
    etymologyRef: "raid",
    question: "同一容量のハードディスク装置を 4 台用いて RAID 5 を構成したとき、利用可能な記憶容量はディスク何台分に相当するか。また、同時に何台までのディスク故障に耐えられるか。",
    options: [
      { key: "ア", text: "2台分、2台まで", correct: false, note: "RAID 10（ミラーリング＋ストライピング）などの特徴" },
      { key: "イ", text: "3台分、1台まで", correct: true, note: "正解！n台構成の場合、容量は (n-1)台分。耐えられる故障は1台まで" },
      { key: "ウ", text: "3台分、2台まで", correct: false, note: "RAID 6（ダブルパリティ）なら (n-2)台分の容量で2台故障まで耐えられます" },
      { key: "エ", text: "4台分、1台まで", correct: false, note: "4台分の容量を使えるのはパリティのない RAID 0（故障耐性は0台）" }
    ],
    explanation: {
      logic: "RAID 5 はデータブロックと誤り訂正用のパリティ（XOR演算）を全ディスクに均等に分散配置します。そのためディスク n 台のうち 1 台分相当がパリティ領域として消費され、有効容量は (n - 1) 台分となります。1台が壊れても残りのデータとパリティの排他的論理和から復元できますが、2台同時に壊れると復元不能になります。",
      feDiff: "FEではRAID 0, 1, 5の概念暗記ですが、APではパリティ演算の仕組み（ビットXOR）や、2台故障に耐えるRAID 6との比較、リビルド（復元）中の追加故障リスクまで踏み込みます。",
      pmBridge: "午後ではストレージシステムの信頼性・コスト・容量効率のトレードオフを検討する記述問題で必須知識となります。"
    }
  },
  {
    id: "q-sec-1",
    category: "security",
    categoryLabel: "セキュリティ・暗号",
    subTopic: "暗号技術",
    title: "ハイブリッド暗号方式の鍵の役割",
    source: "AP午前・午後必須",
    etymologyRef: "pki",
    question: "公開鍵暗号と共通鍵暗号を組み合わせた「ハイブリッド暗号方式」を用いて、アリスがボブに秘密のメッセージを送信する手順として、適切なものはどれか。",
    options: [
      { key: "ア", text: "アリスはメッセージをボブの公開鍵で暗号化し、その公開鍵をアリスの共通鍵で暗号化して送る。", correct: false, note: "公開鍵暗号で本文を暗号化しては処理が遅いというハイブリッドの利点が消えています" },
      { key: "イ", text: "アリスは一時的なセッション鍵（共通鍵）を生成してメッセージを暗号化し、そのセッション鍵をボブの公開鍵で暗号化して送る。", correct: true, note: "正解！本文は高速な共通鍵で暗号化し、共通鍵だけを安全なボブの公開鍵で暗号化して配送します" },
      { key: "ウ", text: "アリスは一時的なセッション鍵（共通鍵）でメッセージを暗号化し、アリスの秘密鍵でセッション鍵を暗号化して送る。", correct: false, note: "アリスの秘密鍵で暗号化すると、アリスの公開鍵を持つ誰でも復号できてしまい機密性が失われます（それはデジタル署名の手順）" },
      { key: "エ", text: "アリスはメッセージをアリスの公開鍵で暗号化し、ボブの秘密鍵で復号してもらう。", correct: false, note: "ボブの秘密鍵はボブしか持っていません。アリスの公開鍵で暗号化するとアリスしか復号できません" }
    ],
    explanation: {
      logic: "ハイブリッド暗号の要諦は『良いとこ取り』です。\n1. 本文（重いデータ）: 高速な共通鍵（セッション鍵）で暗号化。\n2. 共通鍵（超軽い128〜256ビット）: 相手（ボブ）の公開鍵で安全に暗号化。\nボブは自分だけが持つ『ボブの秘密鍵』でセッション鍵を取り出し、そのセッション鍵で本文を復号します。",
      feDiff: "FEでは単に『公開鍵と共通鍵の長所を組み合わせたもの』という理解で足りましたが、AP午後ではTLSハンドシェイクのシーケンス図（ClientHello, ServerHello, プリマスターシークレットの交換）を読ませる問題に直結します。",
      pmBridge: "「暗号化＝相手の公開鍵でロックする（相手の秘密鍵でしか開かない）」「デジタル署名＝自分の秘密鍵で印を押す（自分の公開鍵で誰でも本物だと確認できる）」という根本ルールを押さえましょう。"
    }
  }
];
