import { TaskType, FinancialProofType } from "./wizard-context";

export interface ChecklistItem {
    id: string;
    label: string;
    required: boolean;
    note?: string;
    tier?: "baseline" | "often" | "situational";
}

export interface ChecklistSection {
    title: string;
    items: ChecklistItem[];
}

const COMMON_ITEMS: ChecklistItem[] = [
    { id: "passport", label: "Passport (original + copy of bio page)", required: true, tier: "baseline" },
    { id: "passport_entry", label: "Copy of latest entry stamp page", required: true, tier: "baseline" },
    { id: "photos", label: "Passport photos (4×6 cm, recent)", required: true, note: "Usually 1–2 copies", tier: "baseline" },
    { id: "tdac", label: "TDAC confirmation (email/QR) — if you have it", required: false, note: "Older entries may have TM.6 paper card; many travelers will not have either", tier: "situational" },
];

const RETIREMENT_ITEMS: ChecklistItem[] = [
    { id: "visa_copy", label: "Copy of current visa/extension stamp", required: true },
    { id: "tm30", label: "TM.30 receipt/proof (from landlord/host)", required: true, note: "Request from your landlord or juristic office" },
    { id: "tm47_form", label: "TM.7 application form (available at office)", required: true },
    { id: "address_map", label: "Map to residence (simple sketch or Google Maps printout)", required: false },
];

const RETIREMENT_FINANCIAL_DEPOSIT: ChecklistItem[] = [
    { id: "bank_letter", label: "Bank letter certifying deposit ≥ 800,000 THB", required: true },
    { id: "bank_statement", label: "Bank statement (last 3+ months; check with office)", required: true },
    { id: "bank_book", label: "Updated bankbook (original + copies)", required: true },
];

const RETIREMENT_FINANCIAL_INCOME: ChecklistItem[] = [
    { id: "income_letter", label: "Embassy/consulate income verification letter (≥ 65,000 THB/month)", required: true, note: "Not all embassies issue these; check yours" },
    { id: "bank_statement_income", label: "Bank statement showing monthly transfers", required: true },
];

const RETIREMENT_FINANCIAL_COMBO: ChecklistItem[] = [
    { id: "combo_bank", label: "Bank letter + statement (deposit portion)", required: true },
    { id: "combo_income", label: "Income verification letter (income portion)", required: true },
    { id: "combo_note", label: "Total must be ≥ 800,000 THB (deposit + 12× monthly income)", required: true },
];

const EXTENSION_ITEMS: ChecklistItem[] = [
    { id: "visa_copy", label: "Copy of current visa/extension stamp", required: true },
    { id: "tm30", label: "TM.30 receipt/proof", required: true },
    { id: "tm7_form", label: "TM.7 application form", required: true },
    { id: "fee", label: "Extension fee (1,900 THB; verify amount)", required: true },
    { id: "address_map", label: "Map to residence", required: false },
    { id: "supporting", label: "Supporting documents (varies by extension type)", required: true, note: "Ask your office about specific requirements for your type" },
];

const NINETY_DAY_ITEMS: ChecklistItem[] = [
    { id: "tm47_form", label: "TM.47 form (90-day notification)", required: true },
    { id: "passport_copy", label: "Passport copy (bio page + entry stamp + visa)", required: true },
    { id: "previous_tm47", label: "Previous TM.47 receipt (if reporting again)", required: false },
    { id: "tm30_copy", label: "TM.30 receipt copy", required: true },
];

const TM30_ITEMS: ChecklistItem[] = [
    { id: "tm30_contact", label: "Contact landlord/host/hotel to file TM.30", required: true, note: "It is the landlord/host responsibility to file TM.30" },
    { id: "tm30_receipt", label: "Obtain TM.30 receipt from landlord/host", required: true },
    { id: "lease_copy", label: "Copy of lease/rental agreement", required: false },
    { id: "landlord_id", label: "Landlord ID or house registration copy", required: false, note: "Some offices request this" },
    { id: "passport_copy_tm30", label: "Passport copy (bio page + entry stamp)", required: true },
];

const REENTRY_ITEMS: ChecklistItem[] = [
    { id: "tm8_form", label: "TM.8 re-entry permit application form", required: true, tier: "baseline" },
    { id: "passport_copy_re", label: "Passport (original + copy of bio page, visa page, entry stamp)", required: true, tier: "baseline" },
    { id: "photo_re", label: "Passport photo (4×6 cm)", required: true, note: "1 copy", tier: "baseline" },
    { id: "fee_re", label: "Fee: Single 1,000 THB / Multiple 3,800 THB (verify amount)", required: true, tier: "baseline" },
    { id: "tdac_re", label: "TDAC confirmation (email/QR) — if you have it", required: false, note: "Older entries may have TM.6 paper card; many travelers will not have either", tier: "situational" },
];

export function getChecklistSections(
    taskType: TaskType,
    financialProofType?: FinancialProofType | null
): ChecklistSection[] {
    const sections: ChecklistSection[] = [
        { title: "General Documents", items: COMMON_ITEMS },
    ];

    switch (taskType) {
        case "retirement": {
            sections.push({ title: "Retirement Extension Documents", items: RETIREMENT_ITEMS });
            let financialItems: ChecklistItem[];
            let financialTitle: string;
            switch (financialProofType) {
                case "monthly_income":
                    financialItems = RETIREMENT_FINANCIAL_INCOME;
                    financialTitle = "Financial Proof — Monthly Income";
                    break;
                case "combination":
                    financialItems = RETIREMENT_FINANCIAL_COMBO;
                    financialTitle = "Financial Proof — Combination";
                    break;
                case "deposit":
                    financialItems = RETIREMENT_FINANCIAL_DEPOSIT;
                    financialTitle = "Financial Proof — Bank Deposit";
                    break;
                default:
                    financialItems = [
                        ...RETIREMENT_FINANCIAL_DEPOSIT,
                        ...RETIREMENT_FINANCIAL_INCOME,
                    ];
                    financialTitle = "Financial Proof — Prepare Whichever Applies";
                    break;
            }
            sections.push({ title: financialTitle, items: financialItems });
            break;
        }
        case "visa_extension":
            sections.push({ title: "Extension Documents", items: EXTENSION_ITEMS });
            break;
        case "ninety_day":
            sections.push({ title: "90-Day Reporting Documents", items: NINETY_DAY_ITEMS });
            break;
        case "tm30":
            sections.push({ title: "TM.30 Proof — Getting Your Receipt", items: TM30_ITEMS });
            break;
        case "reentry":
            sections.push({ title: "Re-entry Permit Documents", items: REENTRY_ITEMS });
            break;
    }

    return sections;
}

export function getAssemblyOrder(taskType: TaskType): string[] {
    const base = ["Passport (original)", "Passport bio page copy", "Entry stamp page copy"];

    switch (taskType) {
        case "retirement":
            return [
                ...base,
                "Current visa/extension stamp copy",
                "TM.7 application form (completed)",
                "TM.30 receipt",
                "Financial proof documents (bank letter, statement, bankbook)",
                "Passport photos",
                "Map to residence",
            ];
        case "visa_extension":
            return [
                ...base,
                "Current visa/extension stamp copy",
                "TM.7 application form (completed)",
                "TM.30 receipt",
                "Supporting documents (varies)",
                "Passport photos",
                "Fee (1,900 THB)",
            ];
        case "ninety_day":
            return [
                "TM.47 form (completed)",
                "Passport copy (bio + entry stamp + visa)",
                "TM.30 receipt copy",
                "Previous TM.47 receipt (if applicable)",
            ];
        case "tm30":
            return [
                "Contact landlord/host first",
                "Passport copy (bio + entry stamp)",
                "Lease/rental agreement copy",
                "Obtain TM.30 receipt from landlord/host",
            ];
        case "reentry":
            return [
                "TM.8 form (completed)",
                ...base,
                "Visa page copy",
                "Passport photo",
                "Fee (Single 1,000 / Multiple 3,800 THB)",
            ];
    }
}

export const TASK_DESCRIPTIONS: Record<TaskType, string> = {
    retirement: "Checklist and packet for organizing retirement extension paperwork (age 50+).",
    visa_extension: "Generic checklist and packet for visa extension preparation.",
    ninety_day: "Checklist and reminders for 90-day reporting notification.",
    tm30: "Helps you request/obtain the TM30 receipt/proof from your landlord/host/hotel.",
    reentry: "Checklist and packet for re-entry permit preparation.",
};
