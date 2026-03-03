import dishesData from "@/data/thai_dishes.json";
import slangData from "@/data/thai_slang.json";

export interface ThaiDish {
    dish_en: string;
    dish_th: string;
    pronunciation: string;
    description_1to2_sentences: string;
    spice_level_0to3: number;
    allergy_note_short: string;
    source_url: string;
}

export interface ThaiSlang {
    phrase_th: string;
    pronunciation: string;
    meaning_en: string;
    when_to_use_1_sentence: string;
    formality: "informal" | "neutral" | "polite";
    polite_alternative_optional: string | null;
    source_url: string;
}

export type ThailandCardItem =
    | { type: "dish"; data: ThaiDish }
    | { type: "slang"; data: ThaiSlang };

/**
 * A simple seeded random number generator (Lcg-based)
 * @param seed - Any numeric seed
 */
function sfc32(a: number, b: number, c: number, d: number) {
    return function () {
        a >>>= 0; b >>>= 0; c >>>= 0; d >>>= 0;
        let t = (a + b | 0) + d | 0;
        d = d + 1 | 0;
        a = b ^ b >>> 9;
        b = c + (c << 3) | 0;
        c = (c << 21 | c >>> 11);
        c = c + t | 0;
        return (t >>> 0) / 4294967296;
    }
}

/**
 * Generates a seed from a date string (YYYY-MM-DD)
 */
function getSeedFromDate(dateStr: string): number {
    let h = 1779033703 ^ dateStr.length;
    for (let i = 0; i < dateStr.length; i++) {
        h = Math.imul(h ^ dateStr.charCodeAt(i), 3452271217);
        h = h << 13 | h >>> 19;
    }
    return h >>> 0;
}

/**
 * Gets the daily item based on the current date
 */
export function getDailyItem(): ThailandCardItem {
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0]; // YYYY-MM-DD
    const seed = getSeedFromDate(dateStr);
    const rng = sfc32(seed, 0xadbafaca, 0xdeadbeef, 0xcafebabe);

    // 1. Pick category (0 for dish, 1 for slang)
    const categoryRnd = rng();
    const category = categoryRnd > 0.5 ? "slang" : "dish";

    // 2. Pick item index
    if (category === "dish") {
        const index = Math.floor(rng() * dishesData.length);
        return { type: "dish", data: dishesData[index] as ThaiDish };
    } else {
        const index = Math.floor(rng() * slangData.length);
        return { type: "slang", data: slangData[index] as ThaiSlang };
    }
}

/**
 * Gets a random item purely based on Math.random()
 */
export function getRandomItem(): ThailandCardItem {
    const category = Math.random() > 0.5 ? "slang" : "dish";

    if (category === "dish") {
        const index = Math.floor(Math.random() * dishesData.length);
        return { type: "dish", data: dishesData[index] as ThaiDish };
    } else {
        const index = Math.floor(Math.random() * slangData.length);
        return { type: "slang", data: slangData[index] as ThaiSlang };
    }
}
