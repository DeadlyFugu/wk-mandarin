// ==UserScript==
// @name         WaniKani Mandarin
// @namespace    wk-mandarin
// @version      0.1
// @description  Add Mandarin readings to WaniKani's Kanji!
// @author       DeadlyFugu
// @include     http://www.wanikani.com/kanji/*
// @include     https://www.wanikani.com/kanji/*
// @grant        none
// ==/UserScript==

// table used to lookup kanji readings
// derived from kanjidic2 (http://www.edrdg.org/kanjidic/kanjd2index.html)
// generated using ExtractReadingFromKanjidic2.java
const pinyin_table = {
"亜": "yà", "阿": "ā, ē, a, á, à", "哀": "āi", "愛": "ài", "葵": "kuí", "茜": "qiàn, xī", "悪": "è, ě, wù", "握": "wò", "渥": "wò", "旭": "xù", "梓": "zǐ", "圧": "yā, yà", "扱": "xī", "絢": "xuàn", "綾": "líng", "鮎": "nián", "安": "ān", "暗": "àn", "案": "àn", "杏": "xìng", "以": "yǐ", "伊": "yī", "位": "wèi", "依": "yī", "偉": "wěi", "囲": "wéi", "委": "wěi, wēi", "威": "wēi", "尉": "wèi, yù", "惟": "wéi", "意": "yì", "慰": "wèi", "易": "yì", "為": "wèi, wéi", "異": "yì", "移": "yí", "維": "wéi", "緯": "wěi", "胃": "wèi", "衣": "yī, yì", "違": "wéi", "遺": "yí, wèi", "医": "yī", "井": "jǐng", "亥": "hài", "域": "yù", "育": "yù", "郁": "yù", "磯": "jī", "一": "yī", "壱": "yī", "逸": "yì", "稲": "dào", "芋": "yù", "允": "yǔn", "印": "yìn", "員": "yuán, yún, yùn", "因": "yīn", "姻": "yīn", "引": "yǐn", "飲": "yǐn, yìn", "胤": "yìn", "院": "yuàn", "陰": "yīn", "隠": "yǐn", "韻": "yùn", "右": "yòu", "宇": "yǔ", "羽": "yǔ", "雨": "yǔ, yù", "卯": "mǎo", "丑": "chǒu", "渦": "wō, guō", "唄": "bài, bei", "浦": "pǔ", "運": "yùn", "雲": "yún", "叡": "ruì", "営": "yíng", "影": "yǐng", "映": "yìng", "栄": "róng", "永": "yǒng", "泳": "yǒng", "瑛": "yīng", "英": "yīng", "衛": "wèi", "詠": "yǒng", "鋭": "ruì", "液": "yè, yì", "疫": "yì", "益": "yì", "駅": "yì", "悦": "yuè", "謁": "yè", "越": "yuè", "閲": "yuè", "円": "yuán", "園": "yuán", "宴": "yàn", "延": "yán", "援": "yuán", "沿": "yán, yàn", "演": "yǎn", "炎": "yán", "煙": "yān", "猿": "yuán", "縁": "yuán", "艶": "yàn", "苑": "yuàn", "遠": "yuǎn, yuàn", "鉛": "qiān, yán", "塩": "yán", "於": "yú, wū, yū", "汚": "wū", "凹": "āo, wā", "央": "yāng", "奥": "ào", "往": "wǎng, wàng", "応": "yīng, yìng", "押": "yā, yá", "旺": "wàng", "横": "héng, hèng", "欧": "ōu", "殴": "ōu", "王": "wáng, wàng", "翁": "wēng", "黄": "huáng", "沖": "chōng", "億": "yì", "屋": "wū", "憶": "yì", "乙": "yǐ", "卸": "xiè", "恩": "ēn", "温": "wēn", "穏": "wěn", "音": "yīn", "下": "xià", "化": "huà", "仮": "jiǎ, jià", "何": "hé, hè", "伽": "jiā, qié", "価": "jià, jiè", "佳": "jiā", "加": "jiā", "可": "kě, kè", "嘉": "jiā", "夏": "xià, jiǎ", "嫁": "jià", "家": "jiā, gū", "寡": "guǎ", "科": "kē", "暇": "xiá, xià", "果": "guǒ", "架": "jià", "歌": "gē", "河": "hé", "火": "huǒ", "禍": "huò", "稼": "jià", "箇": "gè", "花": "huā", "茄": "qié, jiā", "荷": "hé, hè", "華": "huá, huà, huā", "菓": "guǒ", "課": "kè", "貨": "huò", "過": "guò, guō", "霞": "xiá", "蚊": "wén", "我": "wǒ", "画": "huà", "芽": "yá, dí", "賀": "hè", "雅": "yǎ, yā", "餓": "è", "介": "jiè", "会": "huì, kuài", "解": "jiě, jiè, xiè", "回": "huí", "塊": "kuài", "壊": "huài, pī", "快": "kuài", "怪": "guài", "悔": "huǐ", "懐": "huái", "戒": "jiè", "拐": "guǎi", "改": "gǎi", "魁": "kuí", "械": "xiè", "海": "hǎi", "灰": "huī", "界": "jiè", "皆": "jiē", "絵": "huì", "開": "kāi", "階": "jiē", "貝": "bèi", "凱": "kǎi", "劾": "hé", "外": "wài", "害": "hài", "慨": "kǎi, kài", "概": "gài", "涯": "yá", "街": "jiē", "該": "gāi", "馨": "xīn, xīng", "垣": "yuán", "嚇": "xià, hè", "各": "gè", "拡": "kuò", "格": "gé, gē", "核": "hé, hú", "殻": "ké, qiào", "獲": "huò", "確": "què", "穫": "huò", "覚": "jué, jiào", "角": "jiǎo, jiǎ, jué", "較": "jiào, jiǎo", "郭": "guō", "閣": "gé", "隔": "gé", "革": "gé, jí, jǐ", "学": "xué", "岳": "yuè", "楽": "lè, yuè", "額": "é", "掛": "guà", "潟": "xì", "割": "gē", "喝": "hē, hè", "括": "guā, kuò", "活": "huó", "渇": "kě", "滑": "huá, gǔ", "褐": "hé, hè", "轄": "xiá", "且": "qiě, jū", "叶": "yè, xié", "樺": "huà, huá", "株": "zhū", "鎌": "lián", "茅": "máo", "刈": "yì", "乾": "gān, qián", "侃": "kǎn", "冠": "guān, guàn", "寒": "hán", "刊": "kān", "勘": "kān, kàn", "勧": "quàn", "巻": "juàn, juǎn", "喚": "huàn", "堪": "kān", "完": "wán", "官": "guān", "寛": "kuān", "干": "gān, gàn", "幹": "gàn, hán", "患": "huàn", "感": "gǎn", "慣": "guàn", "憾": "hàn", "換": "huàn", "敢": "gǎn", "棺": "guān", "款": "kuǎn", "歓": "huān", "汗": "hàn, hán", "漢": "hàn", "環": "huán", "甘": "gān", "監": "jiān, jiàn", "看": "kàn, kān", "管": "guǎn", "簡": "jiǎn", "緩": "huǎn", "缶": "fǒu", "肝": "gān", "艦": "jiàn", "莞": "guān, guǎn, wān, wǎn", "観": "guān, guàn", "貫": "guàn", "還": "huán, hái, xuán", "鑑": "jiàn", "間": "jiān, jiàn", "閑": "xián", "関": "guān", "陥": "xiàn", "館": "guǎn", "丸": "wán", "含": "hán", "岸": "àn", "巌": "yán", "眼": "yǎn", "岩": "yán", "頑": "wán", "顔": "yán", "願": "yuàn", "企": "qǐ, qì", "伎": "jì", "危": "wēi, wéi", "喜": "xǐ", "器": "qì", "基": "jī", "奇": "qí, jī", "嬉": "xī", "寄": "jì", "岐": "qí", "希": "xī", "幾": "jǐ, jī", "忌": "jì", "揮": "huī", "机": "jī", "旗": "qí", "既": "jì", "期": "jī, qī, qí", "棋": "qí", "棄": "qì", "機": "jī", "帰": "guī", "毅": "yì", "気": "qì", "汽": "qì", "祈": "qí", "季": "jì", "稀": "xī", "紀": "jì", "規": "guī", "記": "jì", "貴": "guì", "起": "qǐ", "軌": "guǐ", "輝": "huī", "飢": "jī", "騎": "qí, jì", "鬼": "guǐ", "亀": "guī, jūn, qiū", "偽": "wèi", "儀": "yí", "宜": "yí", "戯": "xì, hū", "技": "jì", "擬": "nǐ", "欺": "qī", "犠": "xī", "疑": "yí", "義": "yì", "誼": "yí, yì", "議": "yì", "菊": "jú", "鞠": "jú, jū", "吉": "jí", "喫": "chī", "橘": "jú", "詰": "jié", "却": "què", "客": "kè", "脚": "jiǎo, jiǎ, jué", "虐": "nu:è", "逆": "nì", "丘": "qiū", "久": "jiǔ", "休": "xiū", "及": "jí", "吸": "xī", "宮": "gōng", "弓": "gōng", "急": "jí", "救": "jiù", "朽": "xiǔ", "求": "qiú", "泣": "qì", "球": "qiú", "究": "jiù, jiū", "窮": "qióng", "級": "jí", "糾": "jiū, jiǔ", "給": "gěi, jǐ", "旧": "jiù", "牛": "niú", "去": "qù", "居": "jū, jī", "巨": "jù", "拒": "jù", "拠": "jù, jū", "挙": "jǔ", "虚": "xū", "許": "xǔ, hǔ", "距": "jù", "漁": "yú", "魚": "yú", "亨": "hēng", "享": "xiǎng", "京": "jīng", "供": "gōng, gòng", "競": "jìng", "共": "gòng, gōng, gǒng", "凶": "xiōng", "協": "xié", "匡": "kuāng", "叫": "jiào", "喬": "qiáo", "境": "jìng", "峡": "xiá", "強": "qiáng, jiàng, qiǎng", "恐": "kǒng", "恭": "gōng", "挟": "xié", "教": "jiào, jiāo", "橋": "qiáo", "況": "kuàng", "狂": "kuáng", "狭": "xiá", "矯": "jiǎo, jiǎ, jiáo", "胸": "xiōng", "脅": "xié", "興": "xīng, xìng", "郷": "xiāng", "鏡": "jìng", "響": "xiǎng", "驚": "jīng", "仰": "yǎng", "凝": "níng", "尭": "yáo", "暁": "xiǎo", "業": "yè", "局": "jú", "曲": "qǔ, qū", "極": "jí", "玉": "yù", "桐": "tóng", "勤": "qín", "均": "jūn, yùn", "錦": "jǐn", "斤": "jīn", "欣": "xīn", "欽": "qīn", "琴": "qín", "禁": "jìn, jīn", "筋": "jīn", "緊": "jǐn", "芹": "qín", "菌": "jùn, jūn", "衿": "jīn", "襟": "jīn", "謹": "jǐn", "近": "jìn", "金": "jīn", "吟": "yín", "銀": "yín", "九": "jiǔ", "句": "jù, gōu", "区": "qū, ōu", "玖": "jiǔ", "矩": "jǔ", "苦": "kǔ", "駆": "qū", "駒": "jū", "具": "jù", "愚": "yú", "虞": "yú", "空": "kōng, kòng", "偶": "ǒu", "遇": "yù", "隅": "yú", "屈": "qū", "掘": "jué", "靴": "xuē", "熊": "xióng", "栗": "lì", "繰": "qiāo, zǎo", "桑": "sāng", "勲": "xūn", "君": "jūn", "薫": "xūn", "訓": "xùn", "群": "qún", "軍": "jūn", "郡": "jùn", "袈": "jiā", "係": "xì", "傾": "qīng, qíng", "刑": "xíng", "兄": "xiōng", "啓": "qǐ", "圭": "guī", "型": "xíng", "契": "qì, xiè, qiè", "形": "xíng", "径": "jìng", "恵": "huì", "慶": "qìng", "慧": "huì", "憩": "qì", "掲": "jiē", "携": "xié", "敬": "jìng", "景": "jǐng, yǐng", "桂": "guì", "渓": "xī", "系": "xì, jì", "経": "jīng, jìng", "継": "jì", "茎": "jīng", "蛍": "yíng", "計": "jì", "警": "jǐng", "軽": "qīng", "鶏": "jī", "芸": "yún", "迎": "yíng", "鯨": "jīng", "劇": "jù", "撃": "jī", "激": "jī", "傑": "jié", "欠": "qiàn", "決": "jué", "潔": "jié", "穴": "xuè, xué", "結": "jié, jiē", "血": "xiě, xuè", "月": "yuè", "件": "jiàn", "倹": "jiǎn", "健": "jiàn", "兼": "jiān", "券": "quàn, xuàn", "剣": "jiàn", "圏": "quān, juān, juàn", "堅": "jiān", "嫌": "xián", "建": "jiàn", "憲": "xiàn", "懸": "xuán", "拳": "quán", "検": "jiǎn", "権": "quán", "犬": "quǎn, quán", "献": "xiàn", "研": "yán, yàn", "絹": "juàn", "県": "xiàn", "肩": "jiān", "見": "jiàn, xiàn", "謙": "qiān", "賢": "xián", "軒": "xuān", "遣": "qiǎn", "険": "xiǎn", "顕": "xiǎn", "験": "yàn", "元": "yuán", "原": "yuán", "厳": "yán", "幻": "huàn", "弦": "xián", "減": "jiǎn", "源": "yuán", "玄": "xuán", "現": "xiàn", "絃": "xián", "言": "yán", "限": "xiàn", "個": "gè, ge", "古": "gǔ", "呼": "hū", "固": "gù", "孤": "gū", "己": "jǐ", "庫": "kù", "弧": "hú", "戸": "hù", "故": "gù", "枯": "kū", "湖": "hú", "胡": "hú", "虎": "hǔ", "誇": "kuā", "雇": "gù", "顧": "gù", "鼓": "gǔ", "五": "wǔ", "互": "hù", "伍": "wǔ", "午": "wǔ", "呉": "wú", "吾": "wú", "娯": "yú", "後": "hòu", "御": "yù", "悟": "wù", "梧": "wú", "瑚": "hú", "碁": "qí", "語": "yǔ, yù", "誤": "wù", "護": "hù", "鯉": "lǐ", "交": "jiāo", "侯": "hóu, hòu", "候": "hòu", "倖": "xìng", "光": "guāng", "公": "gōng", "功": "gōng", "効": "xiào", "厚": "hòu", "口": "kǒu", "向": "xiàng", "后": "hòu", "坑": "kēng", "好": "hǎo, hào", "孔": "kǒng", "孝": "xiào", "宏": "hóng", "工": "gōng", "巧": "qiǎo", "幸": "xìng", "広": "guǎng, ān", "康": "kāng", "弘": "hóng", "恒": "héng", "慌": "huāng", "抗": "kàng", "拘": "jū", "控": "kòng", "攻": "gōng", "昂": "áng", "晃": "huǎng, huàng", "更": "gèng, gēng", "校": "xiào, jiào", "構": "gòu", "江": "jiāng", "洪": "hóng", "浩": "hào", "港": "gǎng", "溝": "gōu", "甲": "jiǎ", "皇": "huáng", "硬": "yìng", "稿": "gǎo", "紅": "hóng, gōng", "紘": "hóng", "絞": "jiǎo, jiǎ", "綱": "gāng", "耕": "gēng", "考": "kǎo", "肯": "kěn", "航": "háng", "荒": "huāng", "行": "xíng, háng, hàng, xìng", "衡": "héng", "講": "jiǎng", "貢": "gòng", "購": "gòu", "郊": "jiāo", "酵": "jiào, xiào", "鉱": "kuàng", "鋼": "gāng, gàng", "降": "jiàng, xiáng", "項": "xiàng", "香": "xiāng", "高": "gāo", "鴻": "hóng", "剛": "gāng", "号": "hào, háo", "合": "hé", "拷": "kǎo", "豪": "háo", "克": "kè", "刻": "kè, kē", "告": "gào, gù", "国": "guó", "穀": "gǔ", "酷": "kù", "黒": "hēi", "獄": "yù", "腰": "yāo", "骨": "gǔ, gū, gú", "今": "jīn", "困": "kùn", "墾": "kěn", "婚": "hūn", "恨": "hèn", "懇": "kěn", "昆": "kūn", "根": "gēn", "混": "hǔn, hún, hùn", "紺": "gàn", "魂": "hún", "佐": "zuǒ", "唆": "suō", "嵯": "cuó", "左": "zuǒ", "差": "chāi, chā, chà, cī", "査": "chá, zhā", "沙": "shā, shà", "瑳": "cuǒ", "砂": "shā", "詐": "zhà", "鎖": "suǒ", "裟": "shā", "座": "zuò", "債": "zhài", "催": "cuī", "再": "zài", "最": "zuì", "哉": "zāi", "妻": "qī, qì", "宰": "zǎi", "彩": "cǎi", "才": "cái", "採": "cǎi", "栽": "zāi", "歳": "suì", "済": "jì", "災": "zāi", "采": "cǎi, cài", "砕": "suì", "祭": "jì, zhài", "斎": "zhāi", "細": "xì", "菜": "cài", "裁": "cái", "載": "zài, zǎi", "際": "jì", "剤": "jì", "在": "zài", "材": "cái", "罪": "zuì", "財": "cái", "冴": "hù", "坂": "bǎn", "咲": "xiào", "崎": "qí", "作": "zuō, zuò, zuó", "削": "xuē, xiāo, xuè", "搾": "zhà", "昨": "zuó", "朔": "shuò", "策": "cè", "索": "suǒ", "錯": "cuò, cù", "桜": "yīng", "冊": "cè", "刷": "shuā, shuà", "察": "chá", "撮": "cuō, zuǒ, cuò", "擦": "cā", "札": "zhá", "殺": "shā, shài", "雑": "zá", "皐": "gāo", "皿": "mǐn", "三": "sān", "傘": "sǎn", "参": "cān, cēn, shēn", "山": "shān", "惨": "cǎn, càn", "散": "sàn, sǎn", "桟": "zhàn", "燦": "càn", "産": "chǎn", "算": "suàn", "蚕": "tiǎn, cán", "賛": "zàn", "酸": "suān", "暫": "zàn, zhàn", "残": "cán", "仕": "shì", "伺": "sì, cì", "使": "shǐ, shì", "刺": "cì", "司": "sī", "史": "shǐ", "嗣": "sì", "四": "sì", "士": "shì", "始": "shǐ", "姉": "zǐ", "姿": "zī", "子": "zǐ, zí, zi", "市": "shì", "師": "shī", "志": "zhì", "思": "sī, sāi", "指": "zhǐ, zhī", "支": "zhī", "施": "shī", "旨": "zhǐ", "枝": "zhī, qí", "止": "zhǐ", "死": "sǐ", "氏": "shì, zhī", "祉": "zhǐ", "私": "sī", "糸": "mì", "紙": "zhǐ", "紫": "zǐ", "肢": "zhī", "脂": "zhī", "至": "zhì", "視": "shì", "詞": "cí", "詩": "shī", "試": "shì", "誌": "zhì", "諮": "zī", "資": "zī", "賜": "sì, cì", "雌": "cí, cī", "飼": "sì", "歯": "chǐ", "事": "shì", "似": "sì, shì", "侍": "shì", "児": "ér", "字": "zì", "寺": "sì", "慈": "cí", "持": "chí", "時": "shí", "次": "cì", "滋": "zī", "治": "zhì", "爾": "ěr", "璽": "xǐ", "磁": "cí", "示": "shì", "耳": "ěr", "自": "zì", "蒔": "shì, shí", "辞": "cí", "汐": "xī, xì", "鹿": "lù", "式": "shì", "識": "shì, zhì", "軸": "zhóu, zhòu, zhú", "七": "qī", "執": "zhí", "失": "shī", "室": "shì", "湿": "shī", "漆": "qī, qù", "疾": "jí", "質": "zhí, zhì", "実": "shí", "偲": "sī", "芝": "zhī", "舎": "shě, shè", "写": "xiě", "射": "shè, shí, yè", "捨": "shě, shè", "赦": "shè", "斜": "xié, xiá", "煮": "zhǔ", "社": "shè", "紗": "shā", "者": "zhě", "謝": "xiè", "車": "chē, jū", "遮": "zhē, zhe", "蛇": "shé, yí", "邪": "xié, yé", "借": "jiè", "勺": "sháo, shuò", "尺": "chǐ, chě", "爵": "jué", "酌": "zhuó", "釈": "shì", "若": "ruò, rě", "寂": "jì, jí", "弱": "ruò", "主": "zhǔ", "取": "qǔ", "守": "shǒu", "手": "shǒu", "朱": "zhū", "殊": "shū", "狩": "shòu", "珠": "zhū", "種": "zhǒng, chóng, zhòng", "趣": "qù, cù", "酒": "jiǔ", "首": "shǒu", "儒": "rú", "受": "shòu", "寿": "shòu", "授": "shòu", "樹": "shù", "需": "xū", "囚": "qiú", "収": "shōu", "周": "zhōu", "宗": "zōng", "就": "jiù", "州": "zhōu", "修": "xiū", "愁": "chóu", "拾": "shí, shè", "洲": "zhōu", "秀": "xiù", "秋": "qiū", "終": "zhōng", "習": "xí", "臭": "chòu, xiù", "舟": "zhōu", "衆": "zhòng", "襲": "xí", "週": "zhōu", "酬": "chóu", "集": "jí", "醜": "chǒu", "住": "zhù", "充": "chōng", "十": "shí", "従": "cóng", "柔": "róu", "汁": "zhī", "渋": "sè", "獣": "shòu", "縦": "zòng", "重": "zhòng, chóng", "銃": "chòng", "叔": "shū, shú", "宿": "sù, xiǔ, xiù", "淑": "shú, shū", "祝": "zhù", "縮": "suō, sù", "粛": "sù", "塾": "shú", "熟": "shóu, shú", "出": "chū", "術": "shù, zhú", "述": "shù", "俊": "jùn, zùn", "峻": "jùn", "春": "chūn", "瞬": "shùn", "竣": "jùn", "舜": "shùn", "駿": "jùn", "准": "zhǔn", "循": "xún", "旬": "xún", "殉": "xùn", "淳": "chún", "準": "zhǔn", "潤": "rùn", "盾": "dùn, shǔn", "純": "chún", "巡": "xún", "遵": "zūn", "醇": "chún", "順": "shùn", "処": "chǔ, chù", "初": "chū", "所": "suǒ", "暑": "shǔ", "曙": "shǔ, shù", "渚": "zhǔ", "庶": "shù", "緒": "xù", "署": "shǔ, shù", "書": "shū", "諸": "zhū", "助": "zhù", "叙": "xù", "女": "nǔ:, rǔ", "序": "xù", "徐": "xú", "恕": "shù", "除": "chú", "傷": "shāng", "償": "cháng", "勝": "shèng, shēng", "匠": "jiàng", "升": "shēng", "召": "zhào, shào, zhāo", "商": "shāng", "唱": "chàng", "奨": "jiǎng", "宵": "xiāo", "将": "jiāng, jiàng", "小": "xiǎo", "少": "shǎo, shào", "尚": "shàng", "庄": "zhuāng", "床": "chuáng", "彰": "zhāng", "承": "chéng", "抄": "chāo", "招": "zhāo", "掌": "zhǎng", "捷": "jié", "昇": "shēng", "昌": "chāng", "昭": "zhāo", "晶": "jīng", "松": "sōng", "梢": "shāo, sào", "沼": "zhǎo", "消": "xiāo", "渉": "shè", "焼": "shāo", "焦": "jiāo", "照": "zhào", "症": "zhèng, zhēng", "省": "shěng, xǐng", "硝": "xiāo", "礁": "jiāo", "祥": "xiáng", "称": "chēng, chèn, chèng", "章": "zhāng", "笑": "xiào", "粧": "zhuāng", "紹": "shào", "肖": "xiào, xiāo", "菖": "chāng", "蕉": "jiāo, qiáo", "衝": "chōng, chòng", "訟": "sòng", "証": "zhèng", "詔": "zhào", "詳": "xiáng", "象": "xiàng", "賞": "shǎng", "鐘": "zhōng", "障": "zhàng", "上": "shàng, shǎng", "丈": "zhàng", "丞": "chéng", "乗": "chéng, shèng", "冗": "rǒng", "剰": "shèng", "城": "chéng", "場": "cháng, chǎng", "壌": "rǎng", "嬢": "niáng", "常": "cháng", "情": "qíng", "条": "tiáo", "浄": "jìng", "状": "zhuàng", "畳": "dié", "穣": "ráng", "蒸": "zhēng", "譲": "ràng", "醸": "niàng", "錠": "dìng", "嘱": "zhǔ", "飾": "shì", "植": "zhí", "殖": "zhí, shi", "織": "zhī", "職": "zhí", "色": "sè, shǎi", "触": "chù", "食": "shí, sì", "辱": "rù, rǔ", "伸": "shēn", "信": "xìn, shēn", "侵": "qīn", "唇": "chún", "娠": "shēn, chén, zhèn", "寝": "qǐn", "審": "shěn", "心": "xīn", "慎": "shèn", "振": "zhèn", "新": "xīn", "晋": "jìn", "森": "sēn", "榛": "zhēn", "浸": "jìn, jīn", "深": "shēn", "申": "shēn", "真": "zhēn", "神": "shén", "秦": "qín", "紳": "shēn", "臣": "chén", "薪": "xīn", "親": "qīn, qìng", "診": "zhěn, zhēn", "身": "shēn, juān", "辛": "xīn", "進": "jìn", "針": "zhēn", "震": "zhèn", "人": "rén", "仁": "rén", "刃": "rèn", "尋": "xún, xín", "甚": "shén, shé, shèn", "尽": "jǐn, jìn", "迅": "xùn", "陣": "zhèn", "須": "xū", "酢": "zuò", "図": "tú", "吹": "chuī, chuì", "垂": "chuí", "帥": "shuài, shuò", "推": "tuī", "水": "shuǐ", "炊": "chuī, chuì", "睡": "shuì", "粋": "cuì, suì", "翠": "cuì", "衰": "shuāi, cuī", "遂": "suì, suí", "酔": "zuì", "錘": "chuí", "随": "suí", "瑞": "ruì", "髄": "suǐ", "崇": "chóng", "嵩": "sōng", "数": "shù, shǔ, shuò", "枢": "shū", "雛": "chú", "据": "jù, jū", "杉": "shān, shā", "澄": "chéng, dèng", "寸": "cùn", "世": "shì", "瀬": "lài", "畝": "mǔ", "是": "shì", "制": "zhì", "勢": "shì", "姓": "xìng", "征": "zhēng", "性": "xìng", "成": "chéng", "政": "zhèng", "整": "zhěng", "星": "xīng", "晴": "qíng", "正": "zhèng, zhēng", "清": "qīng", "牲": "shēng", "生": "shēng", "盛": "shèng, chéng", "精": "jīng", "聖": "shèng", "声": "shēng", "製": "zhì", "西": "xī", "誠": "chéng", "誓": "shì", "請": "qǐng", "逝": "shì", "青": "qīng", "静": "jìng", "斉": "qí, jì, qì", "税": "shuì", "隻": "zhī", "席": "xí", "惜": "xī, xí", "斥": "chì", "昔": "xí, xī", "析": "xī", "石": "shí, dàn", "積": "jī", "籍": "jí", "績": "jī", "責": "zé, zhài", "赤": "chì", "跡": "jī", "碩": "shuò, shí", "切": "qiē, qiè", "拙": "zhuó, zhuō", "接": "jiē", "摂": "shè", "折": "zhé, shé, zhē", "設": "shè", "窃": "qiè", "節": "jié, jiē", "説": "shuō, shuì, yuè", "雪": "xuě, xuè", "絶": "jué", "舌": "shé", "仙": "xiān", "先": "xiān", "千": "qiān", "占": "zhān, zhàn", "宣": "xuān", "専": "zhuān", "川": "chuān", "戦": "zhàn", "扇": "shàn, shān", "栓": "shuān", "泉": "quán", "浅": "qiǎn, jiān", "洗": "xǐ", "染": "rǎn", "潜": "qián", "旋": "xuán, xuàn", "線": "xiàn", "繊": "xiān", "船": "chuán", "薦": "jiàn", "践": "jiàn", "選": "xuǎn", "遷": "qiān", "銭": "qián", "銑": "xiǎn, xǐ", "鮮": "xiān, xiǎn", "前": "qián", "善": "shàn", "漸": "jiàn, jiān", "然": "rán", "全": "quán", "禅": "shàn, chán", "繕": "shàn", "塑": "sù", "措": "cuò", "疎": "shū", "礎": "chǔ", "祖": "zǔ", "租": "zū", "粗": "cū", "素": "sù", "組": "zǔ", "訴": "sù", "阻": "zǔ", "僧": "sēng", "創": "chuàng, chuāng", "双": "shuāng", "倉": "cāng", "喪": "sāng, sàng", "壮": "zhuàng", "奏": "zòu", "爽": "shuǎng", "層": "céng", "惣": "zǒng", "想": "xiǎng", "捜": "sōu", "掃": "sǎo, sào", "挿": "chā", "操": "cāo, cào", "早": "zǎo", "曹": "cáo", "巣": "cháo", "槽": "cáo", "燥": "zào", "争": "zhēng", "相": "xiāng, xiàng", "窓": "chuāng", "総": "zǒng", "綜": "zòng, zèng, zōng", "聡": "cōng", "草": "cǎo", "荘": "zhuāng", "葬": "zàng", "蒼": "cāng", "藻": "zǎo", "装": "zhuāng", "走": "zǒu", "送": "sòng", "遭": "zāo", "霜": "shuāng", "騒": "sāo", "像": "xiàng", "増": "zēng", "憎": "zēng", "臓": "zàng", "蔵": "cáng, zàng", "贈": "zèng", "造": "zào", "促": "cù", "側": "cè, zè", "則": "zé", "即": "jí", "息": "xī, xí", "束": "shù", "測": "cè", "足": "zú, jù", "速": "sù", "俗": "sú", "属": "shǔ, zhǔ", "賊": "zéi, zé", "族": "zú", "続": "xù", "卒": "zú, cù", "存": "cún", "孫": "sūn", "尊": "zūn", "損": "sǔn", "村": "cūn", "他": "tā", "多": "duō", "太": "tài", "汰": "tài", "堕": "duò, huī", "妥": "tuǒ", "惰": "duò", "打": "dǎ", "駄": "tuó, duò", "体": "tǐ, bèn", "対": "duì", "耐": "nài", "帯": "dài", "待": "dài", "怠": "dài", "態": "tài", "替": "tì", "泰": "tài", "滞": "zhì", "胎": "tāi", "袋": "dài", "貸": "dài", "退": "tuì", "逮": "dài, dǎi", "隊": "duì", "黛": "dài", "鯛": "diāo", "代": "dài", "台": "tái, tāi", "大": "dà, dài", "第": "dì", "題": "tí", "鷹": "yīng", "滝": "lóng, shuāng", "卓": "zhuō, zhuó", "啄": "zhuó", "宅": "zhái, zhè", "択": "zé, zhái", "拓": "tuò, tà", "沢": "zé", "濯": "zhuó", "琢": "zhuó, zuó", "託": "tuō", "濁": "zhuó", "諾": "nuò", "只": "zhǐ, zhī", "但": "dàn", "達": "dá", "辰": "chén", "奪": "duó", "脱": "tuō", "巽": "xùn", "棚": "péng", "谷": "gǔ, yù", "丹": "dān", "単": "dān, chán", "嘆": "tàn", "担": "dàn, dān, dǎn", "探": "tàn, tān", "旦": "dàn", "淡": "dàn", "炭": "tàn", "短": "duǎn", "端": "duān", "胆": "dǎn", "誕": "dàn", "鍛": "duàn", "団": "tuán", "壇": "tán", "弾": "dàn, tán", "断": "duàn", "暖": "nuǎn", "檀": "tán", "段": "duàn", "男": "nán", "談": "tán", "値": "zhí", "知": "zhī, zhì", "地": "dì, de", "恥": "chǐ", "智": "zhì", "池": "chí", "痴": "chī", "稚": "zhì", "置": "zhì", "致": "zhì", "遅": "chí", "築": "zhú, zhù", "畜": "chù, xù", "竹": "zhú", "蓄": "xù", "逐": "zhú", "秩": "zhì", "窒": "zhì", "茶": "chá", "嫡": "dí", "着": "zháo, zhāo, zhe, zhuó", "中": "zhōng, zhòng", "仲": "zhòng", "宙": "zhòu", "忠": "zhōng", "抽": "chōu", "昼": "zhòu", "柱": "zhù", "注": "zhù", "虫": "chóng, huǐ", "衷": "zhōng", "鋳": "zhù", "駐": "zhù", "猪": "zhū", "著": "zhù, zhe, zhāo, zháo, zhǔ, zī", "貯": "zhǔ, zhù", "丁": "dīng, zhēng", "兆": "zhào", "帳": "zhàng", "庁": "tīng", "弔": "diào", "張": "zhāng", "彫": "diāo", "徴": "zhēng", "懲": "chéng", "挑": "tiāo, tiǎo", "暢": "chàng", "朝": "zhāo, cháo", "潮": "cháo", "町": "tǐng, dīng", "眺": "tiào", "聴": "tīng", "脹": "zhàng", "腸": "cháng", "蝶": "dié", "調": "diào, tiáo", "超": "chāo", "跳": "tiào", "長": "cháng, zhǎng", "頂": "dǐng", "鳥": "niǎo", "勅": "chì", "直": "zhí", "朕": "zhèn", "沈": "chén, shěn", "珍": "zhēn", "賃": "lìn, rèn", "鎮": "zhèn", "陳": "chén", "津": "jīn", "墜": "zhuì", "椎": "zhuī, chuí", "追": "zhuī", "痛": "tòng", "通": "tōng, tòng", "塚": "zhǒng", "槻": "guī", "漬": "zì", "蔦": "niǎo", "椿": "chūn", "坪": "píng", "紬": "chóu", "釣": "diào", "鶴": "hè, háo", "亭": "tíng", "低": "dī", "停": "tíng", "偵": "zhēn", "貞": "zhēn", "呈": "chéng", "堤": "dī, tí", "定": "dìng", "帝": "dì", "底": "dǐ, de", "庭": "tíng", "廷": "tíng", "弟": "dì", "悌": "tì", "抵": "dǐ", "提": "tí, dī, shí", "汀": "tīng", "禎": "zhēn", "程": "chéng", "締": "dì", "艇": "tǐng", "訂": "dìng", "逓": "dì", "邸": "dǐ", "泥": "ní, nì", "摘": "zhāi, zhé", "敵": "dí", "滴": "dī", "的": "de, dí, dì", "笛": "dí", "適": "shì, kuò", "哲": "zhé", "徹": "chè", "撤": "chè", "迭": "dié", "鉄": "tiě", "典": "diǎn", "天": "tiān", "展": "zhǎn", "店": "diàn", "添": "tiān", "転": "zhuǎn, zhuǎi, zhuàn", "点": "diǎn", "伝": "yún", "殿": "diàn", "田": "tián", "電": "diàn", "吐": "tǔ, tù", "塗": "tú", "徒": "tú", "斗": "dǒu, dòu", "杜": "dù", "渡": "dù", "登": "dēng", "途": "tú", "都": "dū, dōu", "努": "nǔ, náo", "度": "dù, duó, duò", "土": "tǔ", "奴": "nú", "怒": "nù", "倒": "dǎo, dào", "党": "dǎng", "冬": "dōng", "凍": "dòng", "刀": "dāo", "唐": "táng", "塔": "tǎ, da", "島": "dǎo", "悼": "dào", "投": "tóu", "搭": "dā", "東": "dōng", "桃": "táo", "棟": "dòng", "盗": "dào", "湯": "tāng, shāng", "灯": "dēng", "当": "dāng, dàng", "痘": "dòu", "等": "děng", "答": "dá, dā", "筒": "tǒng", "糖": "táng", "統": "tǒng", "到": "dào", "藤": "téng", "討": "tǎo", "謄": "téng", "豆": "dòu", "踏": "tà, tā", "逃": "táo", "透": "tòu", "陶": "táo, yáo", "頭": "tóu, tou", "騰": "téng", "闘": "dòu, dǒu", "働": "dòng", "動": "dòng", "同": "tóng, tòng", "堂": "táng", "導": "dǎo, dào", "憧": "chōng", "洞": "dòng", "瞳": "tóng", "童": "tóng", "胴": "dòng", "道": "dào", "銅": "tóng", "匿": "nì", "得": "dé, de, děi", "徳": "dé", "特": "tè", "督": "dū", "篤": "dǔ", "毒": "dú", "独": "dú", "読": "dú, dòu", "凸": "tū, tú, gǔ", "突": "tú, tū", "届": "jiè", "寅": "yín", "酉": "yǒu", "屯": "tún, zhūn", "惇": "dūn", "敦": "dūn, duì", "豚": "tún", "曇": "tán", "鈍": "dùn", "奈": "nài, nǎi", "那": "nà, nā, nǎ", "内": "nèi", "捺": "nà", "縄": "shéng", "南": "nán, nā", "楠": "nán", "軟": "ruǎn", "難": "nán, nàn", "二": "èr", "尼": "ní", "弐": "èr", "肉": "ròu", "虹": "hóng, jiàng", "日": "rì", "乳": "rǔ", "入": "rù", "如": "rú", "尿": "niào, nì, suī", "任": "rèn, rén", "妊": "rèn", "忍": "rěn", "認": "rèn", "寧": "níng, nìng", "猫": "māo, máo", "熱": "rè", "年": "nián", "念": "niàn", "燃": "rán", "粘": "nián, zhān", "乃": "nǎi", "之": "zhī", "悩": "nǎo", "濃": "nóng", "納": "nà", "能": "néng", "脳": "nǎo", "農": "nóng", "巴": "bā", "把": "bǎ, bà", "覇": "bà", "波": "bō, pō", "派": "pài, pā", "破": "pò", "婆": "pó", "馬": "mǎ", "俳": "pái", "廃": "fèi", "拝": "bài", "排": "pái, pǎi", "敗": "bài", "杯": "bēi", "背": "bèi, bēi", "肺": "fèi", "輩": "bèi", "配": "pèi", "倍": "bèi", "培": "péi", "媒": "méi", "梅": "méi", "買": "mǎi", "売": "mài", "賠": "péi", "陪": "péi", "萩": "qiū", "伯": "bó, bǎi, bà", "博": "bó", "拍": "pāi", "泊": "bó, pò", "白": "bái", "舶": "bó", "薄": "bó, báo, bò", "迫": "pò, pǎi", "漠": "mò", "爆": "bào", "縛": "fú", "麦": "mài", "箱": "xiāng", "肇": "zhào", "肌": "jī", "畑": "tián", "八": "bā, bá", "鉢": "bō", "発": "fā", "髪": "fà", "伐": "fá, fā", "罰": "fá", "抜": "bá", "閥": "fá", "鳩": "jiū", "隼": "zhǔn, sǔn", "伴": "bàn", "判": "pàn", "半": "bàn", "反": "fǎn", "帆": "fān, fán", "搬": "bān", "板": "bǎn", "版": "bǎn", "犯": "fàn", "班": "bān", "畔": "pàn", "繁": "fán, pó", "般": "bān, bō, pán", "藩": "fán, fān", "販": "fàn", "範": "fàn", "煩": "fán", "頒": "bān", "飯": "fàn", "晩": "wǎn", "番": "fān, pān", "盤": "pán", "蛮": "mán", "卑": "bēi", "否": "fǒu, pǐ", "妃": "fēi", "彼": "bǐ", "悲": "bēi", "扉": "fēi", "批": "pī", "披": "pī", "斐": "fěi", "比": "bǐ, bì", "泌": "mì, bì", "疲": "pí", "皮": "pí", "碑": "bēi", "秘": "mì, bì, lín", "緋": "fēi", "罷": "bà, ba, pí", "肥": "féi", "被": "bèi, pī", "費": "fèi", "避": "bì", "非": "fēi", "飛": "fēi", "備": "bèi", "尾": "wěi, yǐ", "微": "wēi, wéi", "眉": "méi", "美": "měi", "鼻": "bí", "柊": "zhōng", "匹": "pǐ, pī", "彦": "yàn", "必": "bì", "筆": "bǐ", "姫": "jī", "媛": "yuàn, yuán", "百": "bǎi, bó", "俵": "biǎo", "彪": "biāo", "標": "biāo", "氷": "bīng", "漂": "piāo, piǎo, piào", "票": "piào", "表": "biǎo", "評": "píng", "描": "miáo", "病": "bìng", "秒": "miǎo", "苗": "miáo", "品": "pǐn", "彬": "bīn", "浜": "bāng", "貧": "pín", "賓": "bīn", "頻": "pín", "敏": "mǐn", "瓶": "píng", "不": "bù, bú", "付": "fù", "夫": "fū, fú", "婦": "fù", "富": "fù", "布": "bù", "府": "fǔ", "怖": "bù", "扶": "fú", "敷": "fū", "普": "pǔ", "浮": "fú", "父": "fù, fǔ", "符": "fú", "腐": "fǔ", "膚": "fū", "芙": "fú", "譜": "pǔ", "負": "fù", "賦": "fù", "赴": "fù", "附": "fù", "侮": "wǔ", "武": "wǔ", "舞": "wǔ", "部": "bù", "封": "fēng", "楓": "fēng", "風": "fēng", "蕗": "lù", "伏": "fú", "副": "fù", "復": "fù", "幅": "fú", "服": "fú, fù", "福": "fú", "腹": "fù", "複": "fù", "覆": "fù", "払": "fú, bì", "沸": "fèi", "仏": "fó, fú", "物": "wù", "分": "fēn, fèn", "噴": "pēn, pèn", "墳": "fén", "憤": "fèn", "奮": "fèn", "粉": "fěn", "紛": "fēn", "雰": "fēn", "文": "wén, wèn", "聞": "wén, wèn", "丙": "bǐng", "併": "bìng", "兵": "bīng", "幣": "bì", "平": "píng", "弊": "bì", "柄": "bǐng", "並": "bìng", "閉": "bì", "陛": "bì", "米": "mǐ", "壁": "bì", "癖": "pǐ, pì", "碧": "bì", "別": "bié", "偏": "piān", "変": "biàn", "片": "piàn, piān", "編": "biān", "辺": "biān", "返": "fǎn", "遍": "biàn, piàn", "便": "biàn, pián", "勉": "miǎn", "弁": "biàn", "保": "bǎo", "舗": "pù, pū", "捕": "bǔ", "歩": "bù", "甫": "fǔ", "補": "bǔ", "輔": "fǔ", "穂": "suì", "募": "mù", "墓": "mù", "慕": "mù", "暮": "mù", "母": "mǔ", "簿": "bù", "倣": "fǎng", "俸": "fèng", "包": "bāo", "報": "bào", "奉": "fèng", "宝": "bǎo", "峰": "fēng", "崩": "bēng", "抱": "bào", "放": "fàng", "方": "fāng", "朋": "péng", "法": "fǎ, fà", "泡": "pào, pāo", "砲": "pào", "縫": "féng, fèng", "胞": "bāo", "芳": "fāng", "萌": "méng", "褒": "bāo", "訪": "fǎng", "豊": "fēng, lǐ", "邦": "bāng", "飽": "bǎo", "鳳": "fèng", "鵬": "péng", "乏": "fá", "亡": "wáng, wú", "傍": "bàng, bāng", "剖": "pōu, pǒu, pǒ", "坊": "fāng, fáng", "妨": "fáng, fāng", "帽": "mào", "忘": "wàng, wáng", "忙": "máng", "房": "fáng", "暴": "bào, pù", "望": "wàng", "某": "mǒu", "棒": "bàng", "冒": "mào, mò", "紡": "fǎng", "肪": "fáng", "膨": "péng", "謀": "móu", "貿": "mào", "防": "fáng", "北": "běi", "僕": "pú, pū", "墨": "mò", "撲": "pū", "朴": "pò, piáo, pǔ, pú", "牧": "mù", "睦": "mù", "没": "méi, mò", "堀": "kū, jué", "奔": "bēn, bèn", "本": "běn", "翻": "fān", "凡": "fán", "盆": "pén", "摩": "mó, mā", "磨": "mó, mò", "魔": "mó", "麻": "má, mā", "埋": "mái, mán", "妹": "mèi", "枚": "méi", "毎": "měi", "槙": "diān", "幕": "mù", "膜": "mò, mó", "柾": "jiù", "亦": "yì", "又": "yòu", "抹": "mǒ, mā, mò", "末": "mò", "繭": "jiǎn", "万": "wàn, mò", "慢": "màn", "満": "mǎn", "漫": "màn, mán", "味": "wèi", "未": "wèi", "魅": "mèi", "巳": "sì", "岬": "jiǎ", "密": "mì", "稔": "rěn", "脈": "mò, mài", "妙": "miào", "民": "mín", "眠": "mián", "務": "wù", "夢": "mèng", "無": "wú, mó", "矛": "máo", "霧": "wù", "椋": "liáng", "婿": "xù", "娘": "niáng", "名": "míng", "命": "mìng", "明": "míng", "盟": "méng, míng", "迷": "mí", "銘": "míng", "鳴": "míng", "滅": "miè", "免": "miǎn, wèn", "綿": "mián", "面": "miàn", "模": "mó, mú", "茂": "mào", "妄": "wàng", "孟": "mèng", "毛": "máo", "猛": "měng", "盲": "máng", "網": "wǎng", "耗": "hào", "木": "mù", "黙": "mò", "目": "mù", "戻": "lì", "問": "wèn", "紋": "wén, wèn", "門": "mén", "也": "yě", "冶": "yě", "夜": "yè", "耶": "yé, yē", "野": "yě", "弥": "mí", "矢": "shǐ", "厄": "è", "役": "yì", "約": "yuē, yāo", "薬": "yào", "訳": "yì", "躍": "yuè", "靖": "jìng", "柳": "liǔ", "愉": "yú", "油": "yóu", "癒": "yù", "諭": "yù", "輸": "shū", "唯": "wéi, wěi", "佑": "yòu", "優": "yōu", "勇": "yǒng", "友": "yǒu", "宥": "yòu", "幽": "yōu", "悠": "yōu", "憂": "yōu", "有": "yǒu, yòu", "柚": "yòu, yóu", "湧": "yǒng, chōng", "猶": "yóu", "由": "yóu", "祐": "yòu", "裕": "yù", "誘": "yòu", "遊": "yóu", "邑": "yì", "郵": "yóu", "雄": "xióng", "融": "róng", "夕": "xī, xì", "予": "yú, yǔ", "余": "yú, tú", "与": "yǔ, yù", "誉": "yù", "預": "yù", "幼": "yòu", "容": "róng", "庸": "yōng", "揚": "yáng", "揺": "yáo", "擁": "yǒng, yōng", "曜": "yào, yuè", "楊": "yáng", "様": "yàng", "洋": "yáng", "溶": "róng", "用": "yòng", "窯": "yáo", "羊": "yáng", "耀": "yào, yuè", "葉": "xié, yè, shè", "蓉": "róng", "要": "yào, yāo", "謡": "yáo", "踊": "yǒng", "遥": "yáo", "陽": "yáng", "養": "yǎng, yàng", "抑": "yì", "欲": "yù", "浴": "yù", "翌": "yì", "翼": "yì", "羅": "luó, luō", "裸": "luǒ", "来": "lái", "頼": "lài", "雷": "léi", "絡": "luò, lào", "落": "luò, là, lào", "酪": "lào, luò", "乱": "luàn", "卵": "luǎn", "嵐": "lán", "欄": "lán", "濫": "làn", "藍": "lán, la", "蘭": "lán", "覧": "lǎn", "利": "lì", "吏": "lì", "履": "lǔ:", "李": "lǐ", "梨": "lí", "理": "lǐ", "璃": "lí", "痢": "lì", "裏": "lǐ", "里": "lǐ", "離": "lí", "陸": "lù, liù", "律": "lù:", "率": "lù:, shuài, shuò", "立": "lì", "略": "lu:è", "流": "liú", "琉": "liú", "留": "liú", "硫": "liú", "粒": "lì", "隆": "lóng, lōng", "竜": "lóng", "慮": "lù:", "旅": "lǔ:", "虜": "lǔ", "了": "liǎo, le", "亮": "liàng", "僚": "liáo", "両": "liǎng", "凌": "líng", "寮": "liáo", "料": "liào", "涼": "liáng, liàng", "猟": "liè", "療": "liáo", "瞭": "liǎo, liào", "稜": "léng", "糧": "liáng", "良": "liáng", "諒": "liàng", "遼": "liáo", "量": "liàng, liáng", "陵": "líng", "領": "lǐng", "力": "lì", "緑": "lù:", "倫": "lún", "厘": "lí", "林": "lín", "琳": "lín", "臨": "lín", "輪": "lún", "隣": "lín", "麟": "lín", "瑠": "liú", "塁": "lěi", "涙": "lèi", "累": "lèi, léi, lěi", "類": "lèi", "令": "lìng, líng, lǐng", "伶": "líng", "例": "lì", "冷": "lěng", "励": "lì", "嶺": "lǐng", "怜": "lián, líng", "玲": "líng", "礼": "lǐ", "鈴": "líng", "隷": "lì", "零": "líng", "霊": "líng", "麗": "lì, lí", "齢": "líng", "暦": "lì", "歴": "lì", "列": "liè", "劣": "liè", "烈": "liè", "裂": "liè, liě", "廉": "lián", "恋": "liàn", "練": "liàn", "蓮": "lián", "連": "lián", "錬": "liàn", "呂": "lǔ:", "炉": "lú", "路": "lù", "露": "lù, lòu", "労": "láo", "廊": "láng", "朗": "lǎng", "楼": "lóu", "浪": "làng", "漏": "lòu", "老": "lǎo", "郎": "láng, làng", "六": "liù, lù", "禄": "lù", "録": "lù", "論": "lùn, lún", "倭": "wō", "和": "hé, hè, huó, huò, huo, hāi, he", "話": "huà", "賄": "huì, huǐ", "惑": "huò", "亘": "gèn", "湾": "wān", "腕": "wàn", "侑": "yòu", "勁": "jìng, jìn", "奎": "kuí", "崚": "léng", "彗": "huì", "昴": "mǎo", "晏": "yàn", "晨": "chén", "晟": "shèng, chéng", "暉": "huī", "栞": "kān", "椰": "yé, yē", "毬": "qiú", "洸": "guāng, huǎng", "洵": "xún", "滉": "huǎng", "漱": "shù", "澪": "líng", "燎": "liào, liáo, liǎo", "燿": "yào", "瑶": "yáo", "皓": "hào", "眸": "móu", "笙": "shēng", "綺": "qǐ", "綸": "lún, guān", "翔": "xiáng", "脩": "xiū", "茉": "mò", "莉": "lì", "菫": "jǐn", "詢": "xún", "諄": "zhūn", "赳": "jiǔ, jiū", "迪": "dí", "頌": "sòng", "颯": "sà", "黎": "lí", "凜": "lǐn", "熙": "xī",
};

(function() {
    'use strict';

    // find the good stuff
    const sectionListing = $("section#note-reading").parent().parent();
    const sections = sectionListing.children();

    for (var i = 0; i < sections.length; i++) {
        const child = sections[i];
        if (child.children && child.children.length > 0) {
            if (child.children[0].textContent === "Readings") {
                const readings = child.children[1].children;
                // resize lame old readings
                for (var j = 0; j < readings.length; j++) {
                    const reading = readings[j];
                    const oldClass = reading.getAttribute("class");
                    reading.setAttribute("class", oldClass.replace("span4", "span3"));
                }
                // figure out the pinyin reading of this bad boy
                const kanji = document.title.charAt(document.title.length - 1);
                var pinyin = pinyin_table[kanji];
                if (!pinyin) pinyin = "Undefined";

                // insert the spicy new pinyin reading
                $(readings[2]).after($("<div class=\"span3 muted-content\"><h3>Mandarin</h3><p lang=\"zh\">" + pinyin + "</p></div>"));
            }
        }
    }
})();