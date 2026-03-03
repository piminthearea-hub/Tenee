"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import FunFactCard from "@/components/FunFactCard";
import PrintPageButton from "@/components/PrintPageButton";

type Language = "en" | "es" | "zh" | "jp" | "ko" | "de" | "ar";
type AllergySeverity = "severe" | "mild" | null;
type TabType = "allergies" | "lost" | "taxi" | "medical" | "phrases";

// For untranslated strings, we fall back to English values. 
// We create a base English object first so we can spread it.
const enBase = {
    name: "English",
    disclaimer: "Template only, not medical advice. In an emergency, seek local medical help.",
    privacy_note: "Privacy: We don't store your data. All inputs are for this session only.",
    clear_data: "Clear Data",
    gate_q: "Do you have any food allergies?",
    yes: "Yes",
    no: "No",
    not_sure: "Not sure",
    tip_title: "Tip:",
    tip_desc: "People may not ask about allergies in Thailand. If you are unsure, it is safer to generate a card to be safe.",
    btn_actually_create: "Actually, let me create one",
    severe_q: "Is it severe (can be dangerous)?",
    severe_label: "Severe",
    mild_label: "Mild",
    select_allergens: "Select Allergens",
    custom_optional: "Custom (Optional)",
    start_over: "Start over",
    copy_thai: "Copy Thai",
    copy_trans: "Copy English",
    allergy_card_title: "Allergy Card",
    severe_template: (items: string) => `I have a severe allergy to ${items}. Even cross-contact can be dangerous. Please do not add it or let it touch my food. If unsure, please tell me first.`,
    mild_template: (items: string) => `I'm allergic/sensitive to ${items}. Please don't add it. Thank you.`,
    taxi_a: "Please use the meter.",
    taxi_b: (dest: string) => `Can you go here: ${dest}`,
    taxi_c: (dest: string) => `Please take me to: ${dest}`,
    taxi_d: "If possible, please avoid the expressway.",
    med_emergency: "Emergency Numbers",
    med_ems: "Ambulance (EMS)",
    med_universal: "Universal medical help",
    med_tp: "Tourist Police",
    med_speakers: "English speakers",
    med_gp: "General Police",
    med_local: "Local precinct",
    med_need_doctor: "I need a doctor",
    med_doctor_ph: "“I need to see a doctor.”",
    med_where_hospital: "Where is the hospital?",
    med_hospital_ph: "“Where is the nearest hospital?”",
    med_ambulance_req: "I feel unwell / chest pain / trouble breathing. Please take me to a hospital or call an ambulance.",
    lost_help: "Sorry, I’m lost. Can you help me get to [PLACE]?",
    lost_lost: "I am lost",
    lost_can_help: "I am lost. Can you help me?",
    lost_where_station: "Where is the nearest station?",
    lost_call_taxi: "Can you call a taxi for me?",
    lost_write_down: "Can you write down the place name for me?",
    lost_phone_help: "Excuse me, may I use your phone for a call?",
    phrases_hello: "Hello",
    phrases_thanks: "Thank you",
    phrases_sorry: "Excuse me / Sorry",
    phrases_no_spicy: "No spicy",
    phrases_not_sweet: "Not too sweet",
    phrases_how_much: "How much?",
    phrases_water: "Water, please",
    phrases_check: "Check, please",
    phrases_no_speak: "I don’t speak Thai."
};

const TRANSLATIONS: Record<Language, typeof enBase> = {
    en: enBase,
    es: {
        ...enBase,
        name: "Español",
        disclaimer: "Solo plantilla, no es consejo médico. En una emergencia, busque ayuda médica local.",
        privacy_note: "Privacidad: no guardamos sus datos. Todas las entradas son solo para esta sesión.",
        clear_data: "Limpiar Datos",
        gate_q: "¿Tiene alguna alergia alimentaria?",
        yes: "Sí",
        no: "No",
        not_sure: "No estoy seguro/a",
        tip_title: "Consejo:",
        tip_desc: "Es posible que no le pregunten por alergias en Tailandia. Si no está seguro/a, es mejor generar una tarjeta para estar seguro/a.",
        btn_actually_create: "En realidad, déjame crear una",
        severe_q: "¿Es grave (puede ser peligroso)?",
        severe_label: "Grave",
        mild_label: "Leve",
        select_allergens: "Seleccionar Alérgenos",
        custom_optional: "Personalizado (Opcional)",
        start_over: "Empezar de nuevo",
        copy_thai: "Copiar Tailandés",
        copy_trans: "Copiar Español",
        allergy_card_title: "Tarjeta de Alergia",
        severe_template: (items: string) => `Tengo una alergia grave a ${items}. Incluso la contaminación cruzada puede ser peligrosa. Por favor no lo añada ni deje que toque mi comida. Si no está seguro/a, avíseme primero.`,
        mild_template: (items: string) => `Soy alérgico/a o sensible a ${items}. Por favor no lo añada. Gracias.`,
        taxi_a: "Por favor, use el taxímetro.",
        taxi_b: (dest: string) => `¿Puede ir aquí: ${dest}?`,
        taxi_c: (dest: string) => `Por favor lléveme a: ${dest}.`,
        taxi_d: "Si es posible, por favor evite la autopista.",
        med_emergency: "Números de Emergencia",
        med_ems: "Ambulancia (EMS)",
        med_universal: "Ayuda médica universal",
        med_tp: "Policía Turística",
        med_speakers: "Hablan inglés",
        med_gp: "Policía General",
        med_local: "Recinto local",
        med_need_doctor: "Necesito un médico",
        med_doctor_ph: "“Necesito ver a un médico.”",
        med_where_hospital: "¿Dónde está el hospital?",
        med_hospital_ph: "“¿Dónde está el hospital más cercano?”",
        med_ambulance_req: "Me siento mal / dolor en el pecho / dificultad para respirar. Por favor lléveme al hospital o llame a una ambulancia.",
        lost_help: "Perdón, estoy perdido/a. ¿Puede ayudarme a llegar a [PLACE]?",
        lost_lost: "Estoy perdido/a",
        lost_can_help: "Estoy perdido/a. ¿Puede ayudarme?",
        lost_where_station: "¿Dónde está la estación más cercana?",
        lost_call_taxi: "¿Puede llamarme un taxi?",
        lost_write_down: "¿Puede escribir el nombre del lugar por mí?",
        lost_phone_help: "Disculpe, ¿puedo usar su teléfono para una llamada?",
        phrases_hello: "Hola",
        phrases_thanks: "Gracias",
        phrases_sorry: "Perdón / Disculpe",
        phrases_no_spicy: "No picante",
        phrases_not_sweet: "No muy dulce",
        phrases_how_much: "¿Cuánto cuesta?",
        phrases_water: "Agua, por favor",
        phrases_check: "La cuenta, por favor",
        phrases_no_speak: "No hablo tailandés."
    },
    zh: {
        ...enBase,
        name: "中文",
        disclaimer: "仅为沟通模板，不构成医疗建议。如遇紧急情况，请寻求当地医疗帮助。",
        privacy_note: "隐私提示：我们不存储您的数据。所有输入仅限本次会话使用。",
        clear_data: "清除数据",
        gate_q: "您有食物过敏吗？",
        yes: "有",
        no: "没有",
        not_sure: "不确定",
        tip_title: "提示：",
        tip_desc: "在泰国，对方可能不会主动询问过敏情况。如果不确定，为了安全起见，建议您生成一张过敏提示卡。",
        btn_actually_create: "我想生成一张",
        severe_q: "过敏是否严重（可能有危险）？",
        severe_label: "严重",
        mild_label: "轻微",
        select_allergens: "选择过敏原",
        custom_optional: "其他（可选）",
        start_over: "重新开始",
        copy_thai: "复制泰文",
        copy_trans: "复制中文",
        allergy_card_title: "过敏提示卡",
        severe_template: (items: string) => `我对${items}严重过敏。即使是交叉接触也可能有危险。请不要添加，也不要让它接触到我的食物。如不确定，请先告诉我。`,
        mild_template: (items: string) => `我对${items}过敏/敏感。请不要添加。谢谢。`,
        taxi_a: "请打表（使用计价器）。",
        taxi_b: (dest: string) => `可以去这里吗：${dest}`,
        taxi_c: (dest: string) => `请带我去：${dest}`,
        taxi_d: "如果可以的话，请尽量不要走高速。",
        med_emergency: "泰国紧急电话",
        med_ems: "救护车 (EMS)",
        med_universal: "通用医疗救助",
        med_tp: "旅游警察",
        med_speakers: "可以沟通英语",
        med_gp: "报警电话",
        med_local: "当地警局",
        med_need_doctor: "我需要看医生",
        med_doctor_ph: "“我需要看医生。”",
        med_where_hospital: "医院在哪里？",
        med_hospital_ph: "“最近的医院在哪里？”",
        med_ambulance_req: "我不舒服/胸痛/呼吸困难。请带我去医院或帮我叫救护车。",
        lost_help: "不好意思，我迷路了。可以帮我去[PLACE]吗？",
        lost_lost: "我迷路了",
        lost_can_help: "我迷路了，您可以帮帮我吗？",
        lost_where_station: "最近的车站在哪里？",
        lost_call_taxi: "可以帮我叫辆出租车吗？",
        lost_write_down: "可以帮我写下这个地方的名字吗？",
        lost_phone_help: "打扰一下，可以借您的电话打个电话吗？",
        phrases_hello: "你好",
        phrases_thanks: "谢谢",
        phrases_sorry: "不好意思/对不起",
        phrases_no_spicy: "不要辣",
        phrases_not_sweet: "不要太甜",
        phrases_how_much: "多少钱？",
        phrases_water: "请给我水",
        phrases_check: "买单",
        phrases_no_speak: "我不会说泰语。"
    },
    jp: {
        ...enBase,
        name: "日本語",
        disclaimer: "これはテンプレートであり、医療上のアドバイスではありません。緊急時は現地の医療機関を受診してください。",
        gate_q: "食物アレルギーはありますか？",
        yes: "はい",
        no: "いいえ",
        not_sure: "わからない",
        tip_title: "ヒント:",
        tip_desc: "タイではアレルギーについて聞かれないことがあります。安全のためカードを作成することをお勧めします。",
        severe_q: "重度（危険な状態になる可能性）ですか？",
        severe_label: "重度",
        mild_label: "軽度",
        copy_trans: "日本語をコピー",
        severe_template: (items: string) => `私は${items}に対して重度のアレルギーがあります。微量の混入でも危険です。料理に入れたり、触れさせたりしないでください。わからない場合は、まず私に教えてください。`,
        mild_template: (items: string) => `私は${items}にアレルギー/過敏症があります。入れないでください。ありがとうございます。`,
        taxi_a: "メーターを使ってください。",
        taxi_b: (dest: string) => `ここに行けますか: ${dest}`,
        taxi_c: (dest: string) => `ここに連れて行ってください: ${dest}`,
        taxi_d: "できれば、高速道路は避けてください。",
        med_emergency: "緊急連絡先",
        med_ambulance_req: "体調が悪い/胸痛/呼吸困難です。病院に連れて行くか、救急車を呼んでください。",
        lost_help: "すみません、道に迷いました。[PLACE]への行き方を教えていただけますか？"
    },
    ko: {
        ...enBase,
        name: "한국어",
        disclaimer: "이것은 템플릿일 뿐 의학적 조언이 아닙니다. 응급 상황 시 현지 의료진의 도움을 받으세요.",
        gate_q: "음식 알레르기가 있습니까?",
        yes: "네",
        no: "아니요",
        not_sure: "잘 모르겠습니다",
        tip_title: "팁:",
        tip_desc: "태국에서는 알레르기에 대해 묻지 않을 수 있습니다. 확실하지 않다면 안전을 위해 카드를 생성하는 것이 좋습니다.",
        severe_q: "심각한가요 (위험할 수 있나요)?",
        severe_label: "심각함",
        mild_label: "가벼움",
        copy_trans: "한국어 복사",
        severe_template: (items: string) => `저는 ${items}에 심각한 알레르기가 있습니다. 교차 접촉만으로도 위험할 수 있습니다. 음식에 넣거나 닿지 않게 해주세요. 확실하지 않다면 먼저 저에게 알려주세요.`,
        mild_template: (items: string) => `저는 ${items}에 알레르기/민감합니다. 넣지 말아주세요. 감사합니다.`,
        taxi_a: "미터기를 사용해 주세요.",
        taxi_b: (dest: string) => `여기로 갈 수 있나요: ${dest}`,
        taxi_c: (dest: string) => `여기로 데려다 주세요: ${dest}`,
        taxi_d: "가능하다면 고속도로는 피해 주세요.",
        med_emergency: "응급 전화번호",
        med_ambulance_req: "몸이 안 좋음/가슴 통증/호흡 곤란이 있습니다. 병원으로 데려가 주시거나 구급차를 불러주세요.",
        lost_help: "죄송하지만 길을 잃었습니다. [PLACE] 가는 길을 도와주실 수 있나요?"
    },
    de: {
        ...enBase,
        name: "Deutsch",
        disclaimer: "Nur eine Vorlage, keine medizinische Beratung. Suchen Sie im Notfall lokale medizinische Hilfe auf.",
        gate_q: "Haben Sie Lebensmittelallergien?",
        yes: "Ja",
        no: "Nein",
        not_sure: "Nicht sicher",
        tip_title: "Tipp:",
        tip_desc: "In Thailand wird man vielleicht nicht nach Allergien gefragt. Wenn Sie unsicher sind, ist es sicherer, eine Karte zu erstellen.",
        severe_q: "Ist es schwerwiegend (kann gefährlich sein)?",
        severe_label: "Schwerwiegend",
        mild_label: "Leicht",
        copy_trans: "Deutsch kopieren",
        severe_template: (items: string) => `Ich habe eine schwere Allergie gegen ${items}. Sogar Kreuzkontaminationen können gefährlich sein. Bitte nicht hinzufügen oder mein Essen berühren lassen. Wenn Sie sich nicht sicher sind, sagen Sie es mir bitte zuerst.`,
        mild_template: (items: string) => `Ich bin allergisch / empfindlich gegen ${items}. Bitte nicht hinzufügen. Danke.`,
        taxi_a: "Bitte benutzen Sie das Taxameter.",
        taxi_b: (dest: string) => `Können Sie hierhin fahren: ${dest}`,
        taxi_c: (dest: string) => `Bitte bringen Sie mich nach: ${dest}`,
        taxi_d: "Wenn möglich, meiden Sie bitte die Schnellstraße.",
        med_emergency: "Notrufnummern",
        med_ambulance_req: "Mir ist unwohl / Brustschmerzen / Atembeschwerden. Bitte bringen Sie mich in ein Krankenhaus oder rufen Sie einen Krankenwagen.",
        lost_help: "Entschuldigung, ich habe mich verirrt. Können Sie mir helfen, nach [PLACE] zu kommen?"
    },
    ar: {
        ...enBase,
        name: "العربية",
        disclaimer: "هذا النموذج للاستخدام كقالب فقط، وليس استشارة طبية. في حالات الطوارئ، اطلب المساعدة الطبية المحلية.",
        gate_q: "هل تعاني من أية حساسية تجاه الطعام؟",
        yes: "نعم",
        no: "لا",
        not_sure: "لست متأكداً",
        tip_title: "نصيحة:",
        tip_desc: "قد لا يسأل الناس عن الحساسية في تايلاند. إذا كنت غير متأكد، فمن الأسلم إنشاء بطاقة لتكون بأمان.",
        severe_q: "هل هي شديدة (يمكن أن تكون خطيرة)؟",
        severe_label: "شديدة",
        mild_label: "خفيفة",
        copy_trans: "نسخ العربية",
        severe_template: (items: string) => `أعاني من حساسية شديدة تجاه ${items}. حتى التلامس العرضي قد يكون خطيراً. يرجى عدم إضافته أو السماح له بملامسة طعامي. إذا لم تكن متأكداً، يرجى إخباري أولاً.`,
        mild_template: (items: string) => `أنا أتحسس من ${items}. يرجى عدم إضافته. شكراً لك.`,
        taxi_a: "الرجاء استخدام العداد.",
        taxi_b: (dest: string) => `هل يمكنك الذهاب إلى هنا: ${dest}`,
        taxi_c: (dest: string) => `يرجى أخذي إلى: ${dest}`,
        taxi_d: "إذا أمكن، يرجى تجنب الطريق السريع.",
        med_emergency: "أرقام الطوارئ",
        med_ambulance_req: "أشعر بتوعك / ألم في الصدر / صعوبة في التنفس. يرجى نقلي إلى المستشفى أو الاتصال بسيارة الإسعاف.",
        lost_help: "عذراً، لقد ضللت الطريق. هل يمكنك مساعدتي في الوصول إلى [PLACE]؟"
    }
};

interface Allergen {
    id: string;
    thai: string;
    english: string;
}

const ALLERGENS: Allergen[] = [
    { id: "shrimp", thai: "กุ้ง", english: "Shrimp" },
    { id: "crab", thai: "ปู", english: "Crab" },
    { id: "fish", thai: "ปลา", english: "Fish" },
    { id: "peanuts", thai: "ถั่วลิสง", english: "Peanuts" },
    { id: "nuts", thai: "ถั่วเปลือกแข็ง", english: "Tree nuts" },
    { id: "egg", thai: "ไข่", english: "Egg" },
    { id: "milk", thai: "นมวัว", english: "Milk" },
    { id: "wheat", thai: "กลูเตน/ข้าวสาลี", english: "Gluten/Wheat" },
    { id: "sesame", thai: "งา", english: "Sesame" },
    { id: "shrimp_paste", thai: "กะปิ", english: "Shrimp paste" },
];

export default function SafetyPage() {
    const [activeTab, setActiveTab] = useState<TabType>("allergies");
    const [language, setLanguage] = useState<Language>("en");
    const [hasAllergies, setHasAllergies] = useState<"yes" | "no" | "not_sure" | null>(null);
    const [severity, setSeverity] = useState<AllergySeverity>(null);
    const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);
    const [customThai, setCustomThai] = useState("");
    const [customEnglish, setCustomEnglish] = useState("");
    const [copied, setCopied] = useState<string | null>(null);

    // Persist language
    useEffect(() => {
        const saved = sessionStorage.getItem("tenee_safety_lang");
        if (saved && (["en", "es", "zh", "jp", "ko", "de", "ar"].includes(saved))) {
            setLanguage(saved as Language);
        }
    }, []);

    const updateLanguage = (lang: Language) => {
        setLanguage(lang);
        sessionStorage.setItem("tenee_safety_lang", lang);
    };

    const t = TRANSLATIONS[language];

    // Taxi State
    const [destination, setDestination] = useState("");

    const toggleAllergen = (id: string) => {
        if (selectedAllergens.includes(id)) {
            setSelectedAllergens(selectedAllergens.filter((a) => a !== id));
        } else {
            setSelectedAllergens([...selectedAllergens, id]);
        }
    };

    const copyToClipboard = async (text: string, id: string) => {
        try {
            await navigator.clipboard.writeText(text);
        } catch {
            const ta = document.createElement("textarea");
            ta.value = text;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand("copy");
            document.body.removeChild(ta);
        }
        setCopied(id);
        setTimeout(() => setCopied(null), 2000);
    };

    const clearData = () => {
        setHasAllergies(null);
        setSeverity(null);
        setSelectedAllergens([]);
        setCustomThai("");
        setCustomEnglish("");
        setDestination("");
    };

    const getAllergenLabel = (item: Allergen) => {
        return `${item.thai} (${item.english})`;
    };

    const getSelectedLabels = () => {
        const selected = ALLERGENS.filter(a => selectedAllergens.includes(a.id)).map(getAllergenLabel);
        if (customThai && customEnglish) {
            selected.push(`${customThai} (${customEnglish})`);
        } else if (customThai) {
            selected.push(customThai);
        } else if (customEnglish) {
            selected.push(customEnglish);
        }
        return selected.join(", ");
    };

    const renderAllergyCard = () => {
        const items = getSelectedLabels();
        if (!items) return null;

        const isSevere = severity === "severe";
        const thaiText = isSevere
            ? `ฉันแพ้ ${items} อย่างรุนแรง กินหรือปนเปื้อนอาจอันตรายมาก\nกรุณาอย่าใส่ ${items} และอย่าให้สัมผัสกับอาหารของฉัน\nถ้าไม่แน่ใจ กรุณาบอกฉันก่อน ขอบคุณค่ะ/ครับ`
            : `ฉันแพ้/ไม่ทนต่อ ${items} กรุณาไม่ใส่ ${items} ในอาหารของฉัน ขอบคุณค่ะ/ครับ`;

        const transText = isSevere
            ? t.severe_template(items)
            : t.mild_template(items);

        return (
            <div className="animate-fade-in" style={{
                background: isSevere ? "rgba(239, 68, 68, 0.1)" : "rgba(59, 130, 246, 0.1)",
                border: `2px solid ${isSevere ? "#ef4444" : "#3b82f6"}`,
                borderRadius: "16px",
                padding: "2rem",
                marginTop: "2rem"
            }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "1.5rem" }}>
                    <h3 style={{ fontSize: "1.4rem", fontWeight: 800 }}>🇹🇭 {t.allergy_card_title}</h3>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                        <button className="btn-secondary" onClick={() => copyToClipboard(thaiText, "thai")} style={{ padding: "0.5rem 1rem", fontSize: "0.9rem" }}>
                            {copied === "thai" ? "✅ Copied" : `📋 ${t.copy_thai}`}
                        </button>
                        <button className="btn-secondary" onClick={() => copyToClipboard(transText, "eng")} style={{ padding: "0.5rem 1rem", fontSize: "0.9rem" }}>
                            {copied === "eng" ? "✅ Copied" : `📋 ${t.copy_trans}`}
                        </button>
                    </div>
                </div>

                <div style={{ fontSize: "1.8rem", lineHeight: 1.5, fontWeight: 700, color: "#fff", marginBottom: "2rem", fontFamily: "'Noto Sans Thai', sans-serif" }}>
                    {thaiText}
                </div>

                <div style={{ padding: "1.5rem", background: "rgba(0,0,0,0.2)", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)" }} dir={language === "ar" ? "rtl" : "ltr"}>
                    <div style={{ fontSize: "0.9rem", color: "#94a3b8", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>{t.name} Translation</div>
                    <div style={{ fontSize: "1.1rem", color: "#cbd5e1", lineHeight: 1.6 }}>
                        {transText}
                    </div>
                </div>

                <div style={{ marginTop: "1.5rem", fontSize: "0.85rem", color: "#94a3b8", textAlign: "center", fontStyle: "italic" }} dir={language === "ar" ? "rtl" : "ltr"}>
                    ⚠️ {t.disclaimer}
                </div>
            </div>
        );
    };

    return (
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem 1.5rem 6rem" }}>
            {/* Header */}
            <div className="animate-fade-in" style={{ textAlign: "center", marginBottom: "2rem" }}>
                <h1 style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "0.75rem" }}>
                    <span className="gradient-text-teal">Travel Safety Help</span>
                </h1>
                <p style={{ color: "#94a3b8", fontSize: "1.1rem" }}>
                    Essential templates and cards. No account needed.
                </p>
            </div>

            {/* Language Toggle */}
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.5rem", marginBottom: "3rem" }}>
                {(["en", "es", "zh", "jp", "ko", "de", "ar"] as Language[]).map((lang) => (
                    <button
                        key={lang}
                        onClick={() => updateLanguage(lang)}
                        style={{
                            padding: "0.6rem 1.2rem",
                            borderRadius: "999px",
                            border: language === lang ? "2px solid #2dd4bf" : "1px solid rgba(255,255,255,0.1)",
                            background: language === lang ? "rgba(45, 212, 191, 0.1)" : "transparent",
                            color: language === lang ? "#2dd4bf" : "#94a3b8",
                            fontWeight: 700,
                            cursor: "pointer",
                            fontSize: "0.9rem",
                            transition: "all 0.2s"
                        }}
                    >
                        {TRANSLATIONS[lang].name}
                    </button>
                ))}
            </div>

            {/* Privacy Banner */}
            <div style={{
                background: "rgba(34, 197, 94, 0.05)",
                border: "1px solid rgba(34, 197, 94, 0.2)",
                borderRadius: "12px",
                padding: "1rem",
                marginBottom: "2rem",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                fontSize: "0.95rem",
                color: "#4ade80"
            }}>
                🛡️ <span>{t.privacy_note}</span>
                <button onClick={clearData} style={{ marginLeft: "auto", background: "transparent", border: "1px solid rgba(74, 222, 128, 0.3)", color: "#4ade80", padding: "4px 12px", borderRadius: "6px", cursor: "pointer", fontSize: "0.85rem" }}>
                    {t.clear_data}
                </button>
            </div>

            {/* Tab Navigation */}
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                gap: "0.5rem",
                marginBottom: "3rem"
            }}>
                {[
                    { id: "allergies", label: "Allergies", icon: "🍽️" },
                    { id: "lost", label: "Lost & Tools", icon: "📍" },
                    { id: "taxi", label: "Taxi Card", icon: "🚕" },
                    { id: "medical", label: "Medical Help", icon: "🏥" },
                    { id: "phrases", label: "Phrases", icon: "🗣️" }
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as TabType)}
                        style={{
                            padding: "1rem 0.5rem",
                            borderRadius: "12px",
                            border: activeTab === tab.id ? "2px solid #2dd4bf" : "1px solid rgba(255,255,255,0.1)",
                            background: activeTab === tab.id ? "rgba(45, 212, 191, 0.1)" : "rgba(255,255,255,0.02)",
                            color: activeTab === tab.id ? "#2dd4bf" : "#94a3b8",
                            fontWeight: 700,
                            cursor: "pointer",
                            fontSize: "1.1rem",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "0.5rem",
                            transition: "all 0.2s ease",
                            minHeight: "80px"
                        }}
                    >
                        <span style={{ fontSize: "1.5rem" }}>{tab.icon}</span>
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content Areas */}
            <div className="glass-card" style={{ padding: "2rem", minHeight: "400px" }}>

                {/* 1. Allergies Tab */}
                {activeTab === "allergies" && (
                    <div className="animate-fade-in">
                        <h2 style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: "2rem" }}>Food Allergy Card</h2>

                        {!hasAllergies ? (
                            <div>
                                <label style={{ display: "block", fontSize: "1.3rem", fontWeight: 700, marginBottom: "1.5rem" }}>
                                    {t.gate_q}
                                </label>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                                    <button onClick={() => setHasAllergies("yes")} className="btn-primary" style={{ padding: "1.5rem", fontSize: "1.2rem", height: "auto" }}>
                                        ✅ {t.yes}
                                    </button>
                                    <button onClick={() => setHasAllergies("no")} className="btn-secondary" style={{ padding: "1.5rem", fontSize: "1.2rem", height: "auto" }}>
                                        ❌ {t.no}
                                    </button>
                                    <button onClick={() => setHasAllergies("not_sure")} className="btn-secondary" style={{ gridColumn: "span 2", padding: "1rem", fontSize: "1.1rem" }}>
                                        🤔 {t.not_sure}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div>
                                {(hasAllergies === "no" || hasAllergies === "not_sure") && (
                                    <div style={{ background: "rgba(245, 158, 11, 0.1)", border: "1px solid rgba(245, 158, 11, 0.3)", borderRadius: "12px", padding: "1.5rem", marginBottom: "2rem" }}>
                                        <p style={{ color: "#f59e0b", fontSize: "1.1rem", lineHeight: 1.5 }}>
                                            💡 <strong>{t.tip_title}</strong> {t.tip_desc}
                                        </p>
                                        <button onClick={() => setHasAllergies("yes")} className="btn-secondary" style={{ marginTop: "1rem", width: "100%" }}>
                                            {t.btn_actually_create}
                                        </button>
                                    </div>
                                )}

                                {hasAllergies === "yes" && (
                                    <div>
                                        <div style={{ marginBottom: "2.5rem" }}>
                                            <label style={{ display: "block", fontSize: "1.2rem", fontWeight: 700, marginBottom: "1rem" }}>
                                                {t.severe_q}
                                            </label>
                                            <div style={{ display: "flex", gap: "1rem" }}>
                                                <button
                                                    onClick={() => setSeverity("severe")}
                                                    style={{
                                                        flex: 1,
                                                        padding: "1rem",
                                                        borderRadius: "12px",
                                                        border: severity === "severe" ? "3px solid #ef4444" : "1px solid rgba(255,255,255,0.1)",
                                                        background: severity === "severe" ? "rgba(239, 68, 68, 0.1)" : "transparent",
                                                        color: severity === "severe" ? "#ef4444" : "#94a3b8",
                                                        fontWeight: 700,
                                                        fontSize: "1.1rem",
                                                        cursor: "pointer"
                                                    }}
                                                >
                                                    🚨 {t.severe_label}
                                                </button>
                                                <button
                                                    onClick={() => setSeverity("mild")}
                                                    style={{
                                                        flex: 1,
                                                        padding: "1rem",
                                                        borderRadius: "12px",
                                                        border: severity === "mild" ? "3px solid #3b82f6" : "1px solid rgba(255,255,255,0.1)",
                                                        background: severity === "mild" ? "rgba(59, 130, 246, 0.1)" : "transparent",
                                                        color: severity === "mild" ? "#3b82f6" : "#94a3b8",
                                                        fontWeight: 700,
                                                        fontSize: "1.1rem",
                                                        cursor: "pointer"
                                                    }}
                                                >
                                                    🧘🏻 {t.mild_label}
                                                </button>
                                            </div>
                                        </div>

                                        <div style={{ marginBottom: "2rem" }}>
                                            <label style={{ display: "block", fontSize: "1.2rem", fontWeight: 700, marginBottom: "1rem" }}>
                                                {t.select_allergens}
                                            </label>
                                            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
                                                {ALLERGENS.map((item) => (
                                                    <button
                                                        key={item.id}
                                                        onClick={() => toggleAllergen(item.id)}
                                                        style={{
                                                            padding: "0.75rem 1.25rem",
                                                            borderRadius: "999px",
                                                            border: selectedAllergens.includes(item.id) ? "2px solid #2dd4bf" : "1px solid rgba(255,255,255,0.1)",
                                                            background: selectedAllergens.includes(item.id) ? "rgba(45, 212, 191, 0.1)" : "transparent",
                                                            color: selectedAllergens.includes(item.id) ? "#2dd4bf" : "#cbd5e1",
                                                            fontWeight: 600,
                                                            cursor: "pointer",
                                                            fontSize: "1rem",
                                                            transition: "all 0.2s"
                                                        }}
                                                    >
                                                        {getAllergenLabel(item)}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div style={{ marginBottom: "2rem" }}>
                                            <label style={{ display: "block", fontSize: "1.1rem", fontWeight: 600, marginBottom: "0.75rem", color: "#94a3b8" }}>
                                                {t.custom_optional}
                                            </label>
                                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                                                <input
                                                    type="text"
                                                    placeholder="Thai (e.g. หัวหอม)"
                                                    className="input-field"
                                                    value={customThai}
                                                    onChange={(e) => setCustomThai(e.target.value)}
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="English (e.g. Onion)"
                                                    className="input-field"
                                                    value={customEnglish}
                                                    onChange={(e) => setCustomEnglish(e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        {renderAllergyCard()}

                                        <button onClick={() => setHasAllergies(null)} style={{ marginTop: "2rem", color: "#64748b", textDecoration: "underline", background: "none", border: "none", cursor: "pointer" }}>
                                            {t.start_over}
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {/* 2. Lost & Tools Tab */}
                {activeTab === "lost" && (
                    <div className="animate-fade-in">
                        <h2 style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: "2rem" }}>Lost & Directions</h2>
                        <div style={{ display: "grid", gap: "1.5rem" }}>
                            {[
                                {
                                    label: t.lost_lost,
                                    thai: "ฉันหลงทาง ช่วยฉันหน่อยได้ไหมครับ/ค่ะ?",
                                    eng: t.lost_can_help
                                },
                                {
                                    label: t.lost_lost,
                                    thai: `ขอโทษค่ะ/ครับ ฉันหลงทาง ช่วยบอกทางไป [${destination || "........"}] ได้ไหมคะ/ครับ`,
                                    eng: t.lost_help
                                },
                                {
                                    label: t.phrases_how_much,
                                    thai: "สถานีที่ใกล้ที่สุดอยู่ที่ไหนครับ/ค่ะ?",
                                    eng: t.lost_where_station
                                },
                                {
                                    label: "Taxi",
                                    thai: "ช่วยเรียกแท็กซี่ให้หน่อยได้ไหมครับ/ค่ะ?",
                                    eng: t.lost_call_taxi
                                },
                                {
                                    label: "Write it",
                                    thai: "ช่วยเขียนชื่อสถานที่ให้หน่อยได้ไหมครับ/ค่ะ?",
                                    eng: t.lost_write_down
                                },
                                {
                                    label: "Phone",
                                    thai: "ขอโทษครับ/ค่ะ ขอยืมโทรศัพท์โทรออกได้ไหมครับ/ค่ะ?",
                                    eng: t.lost_phone_help
                                }
                            ].map((item, idx) => (
                                <div key={idx} style={{ padding: "1.5rem", background: "rgba(255,255,255,0.03)", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.08)" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                                        <span style={{ fontWeight: 700, color: "#2dd4bf" }}>{item.label}</span>
                                        <button className="btn-secondary" onClick={() => copyToClipboard(item.thai, `lost-${idx}`)} style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem", minHeight: "auto" }}>
                                            {copied === `lost-${idx}` ? "✅ Copied" : `📋 ${t.copy_thai}`}
                                        </button>
                                    </div>
                                    <div style={{ fontSize: "1.4rem", fontWeight: 600, fontFamily: "'Noto Sans Thai', sans-serif", marginBottom: "0.5rem" }}>{item.thai}</div>
                                    <div style={{ color: "#94a3b8", fontSize: "0.95rem" }} dir={language === "ar" ? "rtl" : "ltr"}>{item.eng}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* 3. Taxi Card Tab */}
                {activeTab === "taxi" && (
                    <div className="animate-fade-in">
                        <h2 style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: "2rem" }}>Taxi & Transport</h2>

                        <div style={{ marginBottom: "2.5rem" }}>
                            <label className="label" style={{ fontSize: "1.2rem", fontWeight: 700 }}>
                                Destination (paste address or Google Maps link)
                            </label>
                            <input
                                type="text"
                                className="input-field"
                                placeholder="e.g. Hotel name, Landmark, or Link"
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                                style={{ fontSize: "1.2rem", padding: "1.2rem", marginTop: "0.5rem" }}
                            />
                        </div>

                        <div style={{ display: "grid", gap: "2rem" }}>
                            {[
                                {
                                    id: "taxi-meter",
                                    label: "Meter request (polite)",
                                    thai: "กดมิเตอร์ด้วยค่ะ/ครับ",
                                    eng: t.taxi_a
                                },
                                {
                                    id: "taxi-confirm",
                                    label: "Destination confirmation (short)",
                                    thai: `ไปที่นี่ได้ไหมคะ/ครับ: ${destination || "...................."}`,
                                    eng: t.taxi_b(destination || "[Destination]")
                                },
                                {
                                    id: "taxi-request",
                                    label: "Destination request (polite + clear)",
                                    thai: `กรุณาพาไปที่นี่ค่ะ/ครับ: ${destination || "...................."}`,
                                    eng: t.taxi_c(destination || "[Destination]")
                                },
                                {
                                    id: "taxi-tolls",
                                    label: "Avoid toll roads (optional)",
                                    thai: "ถ้าเป็นไปได้ ไม่ขึ้นทางด่วนค่ะ/ครับ",
                                    eng: t.taxi_d
                                }
                            ].map((item) => (
                                <div key={item.id} style={{
                                    background: "rgba(255, 255, 255, 0.03)",
                                    border: "1px solid rgba(255, 255, 255, 0.1)",
                                    borderRadius: "16px",
                                    padding: "2rem"
                                }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                                        <span style={{ fontWeight: 800, color: "#f5c542", fontSize: "1.1rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                                            {item.label}
                                        </span>
                                        <div style={{ display: "flex", gap: "0.5rem" }}>
                                            <button
                                                className="btn-secondary"
                                                onClick={() => copyToClipboard(item.thai, `${item.id}-th`)}
                                                style={{ padding: "0.5rem 1rem", fontSize: "0.85rem", minHeight: "auto" }}
                                            >
                                                {copied === `${item.id}-th` ? "✅ Copied" : `📋 ${t.copy_thai}`}
                                            </button>
                                            <button
                                                className="btn-secondary"
                                                onClick={() => copyToClipboard(item.eng, `${item.id}-en`)}
                                                style={{ padding: "0.5rem 1rem", fontSize: "0.85rem", minHeight: "auto" }}
                                            >
                                                {copied === `${item.id}-en` ? "✅ Copied" : `📋 ${t.copy_trans}`}
                                            </button>
                                        </div>
                                    </div>

                                    <div style={{
                                        fontSize: "2rem",
                                        fontWeight: 700,
                                        fontFamily: "'Noto Sans Thai', sans-serif",
                                        lineHeight: 1.4,
                                        color: "#fff",
                                        marginBottom: "1rem"
                                    }}>
                                        {item.thai}
                                    </div>

                                    <div style={{
                                        fontSize: "1.1rem",
                                        color: "#94a3b8",
                                        padding: "1rem",
                                        background: "rgba(0,0,0,0.2)",
                                        borderRadius: "12px",
                                        border: "1px solid rgba(255,255,255,0.05)"
                                    }} dir={language === "ar" ? "rtl" : "ltr"}>
                                        {item.eng}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* 4. Medical Help Tab */}
                {activeTab === "medical" && (
                    <div className="animate-fade-in">
                        <h2 style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: "2rem" }}>Medical Help</h2>

                        {/* Emergency Numbers */}
                        <div style={{ background: "rgba(239, 68, 68, 0.08)", border: "1px solid rgba(239, 68, 68, 0.2)", borderRadius: "16px", padding: "2rem", marginBottom: "2.5rem" }}>
                            <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#ef4444", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                🚨 {t.med_emergency}
                            </h3>
                            <div style={{ display: "grid", gap: "1rem" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(239, 68, 68, 0.1)", paddingBottom: "0.75rem" }}>
                                    <div>
                                        <div style={{ fontSize: "1.2rem", fontWeight: 700 }}>{t.med_ems}</div>
                                        <div style={{ color: "#94a3b8", fontSize: "0.9rem" }}>{t.med_universal}</div>
                                    </div>
                                    <strong style={{ fontSize: "2rem", color: "#ef4444" }}>1669</strong>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(239, 68, 68, 0.1)", paddingBottom: "0.75rem" }}>
                                    <div>
                                        <div style={{ fontSize: "1.2rem", fontWeight: 700 }}>{t.med_tp}</div>
                                        <div style={{ color: "#94a3b8", fontSize: "0.9rem" }}>{t.med_speakers}</div>
                                    </div>
                                    <strong style={{ fontSize: "2rem", color: "#ef4444" }}>1155</strong>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <div>
                                        <div style={{ fontSize: "1.2rem", fontWeight: 700 }}>{t.med_gp}</div>
                                        <div style={{ color: "#94a3b8", fontSize: "0.9rem" }}>{t.med_local}</div>
                                    </div>
                                    <strong style={{ fontSize: "2rem", color: "#ef4444" }}>191</strong>
                                </div>
                            </div>
                        </div>

                        <div style={{ display: "grid", gap: "1.5rem" }}>
                            <div style={{ padding: "1.5rem", background: "rgba(239, 68, 68, 0.05)", borderRadius: "12px", border: "1px solid rgba(239, 68, 68, 0.2)" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                                    <span style={{ fontWeight: 700, color: "#ef4444" }}>{t.med_emergency}</span>
                                    <button className="btn-secondary" onClick={() => copyToClipboard("ฉันไม่สบาย/เจ็บหน้าอก/หายใจลำบาก ช่วยพาไปโรงพยาบาลหรือเรียกรถพยาบาลให้หน่อยค่ะ/ครับ", "med-0")} style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem", minHeight: "auto" }}>
                                        {copied === "med-0" ? "✅ Copied" : `📋 ${t.copy_thai}`}
                                    </button>
                                </div>
                                <div style={{ fontSize: "1.8rem", fontWeight: 600, fontFamily: "'Noto Sans Thai', sans-serif" }}>ฉันไม่สบาย/เจ็บหน้าอก/หายใจลำบาก ช่วยพาไปโรงพยาบาลหรือเรียกรถพยาบาลให้หน่อยค่ะ/ครับ</div>
                                <div style={{ color: "#94a3b8", marginTop: "0.5rem" }} dir={language === "ar" ? "rtl" : "ltr"}>{t.med_ambulance_req}</div>
                            </div>

                            <div style={{ padding: "1.5rem", background: "rgba(255,255,255,0.03)", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.08)" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                                    <span style={{ fontWeight: 700, color: "#ef4444" }}>{t.med_need_doctor}</span>
                                    <button className="btn-secondary" onClick={() => copyToClipboard("ฉันต้องการพบคุณหมอครับ/ค่ะ", "med-1")} style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem", minHeight: "auto" }}>
                                        {copied === "med-1" ? "✅ Copied" : `📋 ${t.copy_thai}`}
                                    </button>
                                </div>
                                <div style={{ fontSize: "1.8rem", fontWeight: 600, fontFamily: "'Noto Sans Thai', sans-serif" }}>ฉันต้องการพบคุณหมอครับ/ค่ะ</div>
                                <div style={{ color: "#94a3b8", marginTop: "0.5rem" }} dir={language === "ar" ? "rtl" : "ltr"}>{t.med_doctor_ph}</div>
                            </div>
                            <div style={{ padding: "1.5rem", background: "rgba(255,255,255,0.03)", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.08)" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                                    <span style={{ fontWeight: 700, color: "#ef4444" }}>{t.med_where_hospital}</span>
                                    <button className="btn-secondary" onClick={() => copyToClipboard("โรงพยาบาลที่ใกล้ที่สุดอยู่ที่ไหนครับ/ค่ะ?", "med-2")} style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem", minHeight: "auto" }}>
                                        {copied === "med-2" ? "✅ Copied" : `📋 ${t.copy_thai}`}
                                    </button>
                                </div>
                                <div style={{ fontSize: "1.8rem", fontWeight: 600, fontFamily: "'Noto Sans Thai', sans-serif" }}>โรงพยาบาลที่ใกล้ที่สุดอยู่ที่ไหนครับ/ค่ะ?</div>
                                <div style={{ color: "#94a3b8", marginTop: "0.5rem" }} dir={language === "ar" ? "rtl" : "ltr"}>{t.med_hospital_ph}</div>
                            </div>
                        </div>
                    </div>
                )}

                {/* 5. Phrases Tab */}
                {activeTab === "phrases" && (
                    <div className="animate-fade-in">
                        <h2 style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: "2rem" }}>Essential Phrases</h2>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
                            {[
                                { t: t.phrases_hello, th: "สวัสดีครับ/ค่ะ", p: "Sawatdee (Krab/Ka)" },
                                { t: t.phrases_thanks, th: "ขอบคุณครับ/ค่ะ", p: "Khob Khun (Krab/Ka)" },
                                { t: t.phrases_sorry, th: "ขอโทษครับ/ค่ะ", p: "Kor Toad (Krab/Ka)" },
                                { t: t.phrases_no_spicy, th: "ไม่เผ็ดครับ/ค่ะ", p: "Mai Ped (Krab/Ka)" },
                                { t: t.phrases_not_sweet, th: "หวานน้อยครับ/ค่ะ", p: "Wan Noi (Krab/Ka)" },
                                { t: t.phrases_how_much, th: "เท่าไหร่ครับ/ค่ะ?", p: "Tao Rai (Krab/Ka)" },
                                { t: t.phrases_water, th: "ขอน้ำเปล่าหน่อยครับ/ค่ะ", p: "Kor Nam Plao (Krab/Ka)" },
                                { t: t.phrases_check, th: "เก็บเงินด้วยครับ/ค่ะ", p: "Kep Ngern (Krab/Ka)" },
                                { t: t.phrases_no_speak, th: "ฉันพูดภาษาไทยไม่ได้", p: "Chan pood Thai mai dai" }
                            ].map((item, idx) => (
                                <div key={idx} style={{ padding: "1.25rem", background: "rgba(255,255,255,0.02)", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.05)" }}>
                                    <div style={{ color: "#2dd4bf", fontWeight: 700, marginBottom: "0.5rem" }}>{item.t}</div>
                                    <div style={{ fontSize: "1.4rem", fontWeight: 600, fontFamily: "'Noto Sans Thai', sans-serif" }}>{item.th}</div>
                                    <div style={{ color: "#64748b", fontSize: "0.9rem", marginTop: "0.25rem" }}>{item.p}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>

            <div style={{ marginTop: "4rem" }}>
                <FunFactCard />
            </div>

            <div style={{ position: "fixed", bottom: "2rem", right: "2rem", zIndex: 100 }}>
                <PrintPageButton />
            </div>
        </div>
    );
}
