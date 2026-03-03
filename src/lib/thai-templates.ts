export type RecipientType =
    | "landlord"
    | "juristic"
    | "bank"
    | "insurance"
    | "immigration"
    | "government";

export type Tone = "normal" | "very_polite";

export interface TemplateInput {
    recipientName?: string;
    applicantName?: string;
    passportLast4?: string;
    address?: string;
    unit?: string;
    date?: string;
    accountOrRef?: string;
    phone?: string;
    email?: string;
    task?: string;
    status?: string; // for 90-day pending/rejected
    condoName?: string;
    bankBranch?: string;
    company?: string;
    officeCityImm?: string;
    agencyName?: string;
    requestDesc?: string;
    tone: Tone;
}

export interface PurposeOption {
    value: string;
    label: string;
    labelTh?: string;
}

export const RECIPIENT_LABELS: Record<RecipientType, string> = {
    landlord: "Landlord / Host",
    juristic: "Condo Juristic Office",
    bank: "Bank Branch",
    insurance: "Insurance Company",
    immigration: "Immigration Office (Inquiry Only)",
    government: "Other Government Office (Generic)",
};

export const RECIPIENT_ICONS: Record<RecipientType, string> = {
    landlord: "🏠",
    juristic: "🏢",
    bank: "🏦",
    insurance: "🛡️",
    immigration: "🛂",
    government: "🏛️",
};

export const PURPOSES: Record<RecipientType, PurposeOption[]> = {
    landlord: [
        { value: "tm30_request", label: "Request TM30 receipt/proof" },
        { value: "address_proof", label: "Request proof of address/receipt" },
    ],
    juristic: [
        { value: "residence_proof", label: "Request proof of residence/address confirmation" },
    ],
    bank: [
        { value: "bank_letter", label: "Request bank letter + statement" },
        { value: "balance_confirm", label: "Request balance confirmation" },
    ],
    insurance: [
        { value: "insurance_cert", label: "Request insurance certificate / proof of coverage" },
        { value: "payment_receipt", label: "Request payment receipt" },
    ],
    immigration: [
        { value: "doc_inquiry", label: "Ask what documents to prepare" },
        { value: "office_hours", label: "Ask office hours / appointment steps" },
        { value: "ninety_day_status", label: "Ask about online 90-day pending/rejected status" },
    ],
    government: [
        { value: "confirmation_letter", label: "Request confirmation letter" },
        { value: "certified_copy", label: "Request certified copy/receipt" },
        { value: "general_inquiry", label: "General inquiry" },
    ],
};

function politeEnding(tone: Tone): { th: string; thEnd: string } {
    if (tone === "very_polite") {
        return {
            th: "ขอบพระคุณอย่างสูงค่ะ/ครับ",
            thEnd: "ด้วยความเคารพอย่างสูง",
        };
    }
    return {
        th: "ขอบคุณมากค่ะ/ครับ",
        thEnd: "ขอแสดงความนับถือ",
    };
}

export function generateTemplate(
    recipient: RecipientType,
    purpose: string,
    input: TemplateInput
): { thai: string; english: string } {
    const name = input.applicantName || "[YOUR NAME]";
    const last4 = input.passportLast4 || "[LAST4]";
    const address = input.address || "[ADDRESS]";
    const date = input.date || "[DATE]";
    const phone = input.phone || "[PHONE]";
    const email = input.email || "[EMAIL]";
    const account = input.accountOrRef || "[ACCOUNT/REF]";
    const ending = politeEnding(input.tone);

    // Landlord TM30 request
    if (recipient === "landlord" && purpose === "tm30_request") {
        const recipientName = input.recipientName || "[RECIPIENT]";
        return {
            thai: `สวัสดีค่ะ/ครับ คุณ${recipientName}
รบกวนขอหลักฐานการแจ้งที่พัก (TM30) หรือเอกสารยืนยันการแจ้งที่อยู่สำหรับผู้พักอาศัยชาวต่างชาติได้ไหมคะ/ครับ
รายละเอียดผู้พัก:
ชื่อ: ${name}
เลขพาสปอร์ต (4 ตัวท้าย): ${last4}
วันที่เข้าพัก/ย้ายเข้า: ${date}
ที่อยู่: ${address}
ต้องใช้เพื่อจัดเตรียมเอกสารยื่นต่อหน่วยงานที่เกี่ยวข้อง ${ending.th}`,
            english: `Hello ${recipientName},
I would like to request the TM30 notification receipt or proof of address registration for a foreign resident.
Resident details:
Name: ${name}
Passport (last 4 digits): ${last4}
Move-in / check-in date: ${date}
Address: ${address}
This is needed for preparing documents to submit to the relevant authorities. Thank you very much.`,
        };
    }

    // Landlord address proof
    if (recipient === "landlord" && purpose === "address_proof") {
        const recipientName = input.recipientName || "[RECIPIENT]";
        return {
            thai: `สวัสดีค่ะ/ครับ คุณ${recipientName}
รบกวนขอหลักฐานยืนยันที่อยู่ / ใบเสร็จค่าเช่า สำหรับ:
ชื่อ: ${name}
ที่อยู่: ${address}
ต้องใช้เพื่อจัดเตรียมเอกสารยื่นต่อหน่วยงานที่เกี่ยวข้อง ${ending.th}`,
            english: `Hello ${recipientName},
I would like to request proof of address or a rent receipt for:
Name: ${name}
Address: ${address}
This is needed for preparing documents for the relevant authorities. Thank you very much.`,
        };
    }

    // Juristic proof
    if (recipient === "juristic") {
        const condo = input.condoName || "[CONDO NAME]";
        const unit = input.unit || "[UNIT]";
        return {
            thai: `เรียน นิติบุคคลอาคารชุด ${condo}
ข้าพเจ้า ${name} ห้อง ${unit} ขอความอนุเคราะห์ออกหนังสือรับรองที่อยู่/หลักฐานการพักอาศัย เพื่อใช้ประกอบการจัดเตรียมเอกสารยื่นต่อหน่วยงานที่เกี่ยวข้อง
${ending.th}
${ending.thEnd}
${name} ${phone || email}`,
            english: `Dear Juristic Office of ${condo},
I, ${name}, unit ${unit}, would like to request a residence certification/proof of residence letter for preparing documents to submit to the relevant authorities.
Thank you very much.
Best regards,
${name} ${phone || email}`,
        };
    }

    // Bank letter + statement
    if (recipient === "bank" && purpose === "bank_letter") {
        const bank = input.bankBranch || "[BANK/BRANCH]";
        return {
            thai: `เรียน เจ้าหน้าที่ธนาคาร ${bank}
ข้าพเจ้า ${name} ขอความอนุเคราะห์ออกหนังสือรับรองยอดเงินฝาก (Bank Letter) และรายการเดินบัญชี (Statement) สำหรับบัญชีเลขที่ ${account} เพื่อใช้ประกอบการจัดเตรียมเอกสารยื่นต่อหน่วยงานที่เกี่ยวข้อง
หากสามารถออกเป็นภาษาอังกฤษได้ จะขอความอนุเคราะห์ด้วยค่ะ/ครับ
${ending.th}
${ending.thEnd}
${name} ${phone}`,
            english: `Dear Bank Officer at ${bank},
I, ${name}, would like to request a bank deposit certification letter (Bank Letter) and account statement for account number ${account}, for preparing documents to submit to the relevant authorities.
If possible, I would like to request the documents in English.
Thank you very much.
Best regards,
${name} ${phone}`,
        };
    }

    // Bank balance confirmation
    if (recipient === "bank" && purpose === "balance_confirm") {
        const bank = input.bankBranch || "[BANK/BRANCH]";
        return {
            thai: `เรียน เจ้าหน้าที่ธนาคาร ${bank}
ข้าพเจ้า ${name} ขอความอนุเคราะห์ออกหนังสือรับรองยอดเงินคงเหลือในบัญชีเลขที่ ${account}
${ending.th}
${ending.thEnd}
${name} ${phone}`,
            english: `Dear Bank Officer at ${bank},
I, ${name}, would like to request a balance confirmation letter for account number ${account}.
Thank you very much.
Best regards,
${name} ${phone}`,
        };
    }

    // Insurance certificate
    if (recipient === "insurance" && purpose === "insurance_cert") {
        const company = input.company || "[INSURANCE COMPANY]";
        return {
            thai: `เรียน บริษัทประกันภัย ${company}
ข้าพเจ้า ${name} ขอความอนุเคราะห์ออกเอกสารรับรองความคุ้มครอง/ใบรับรองการประกัน (Certificate of Insurance) สำหรับกรมธรรม์เลขที่ ${account} พร้อมระบุช่วงเวลาคุ้มครอง
${ending.th}`,
            english: `Dear ${company},
I, ${name}, would like to request a Certificate of Insurance / proof of coverage for policy number ${account}, including the coverage period.
Thank you very much.`,
        };
    }

    // Insurance payment receipt
    if (recipient === "insurance" && purpose === "payment_receipt") {
        const company = input.company || "[INSURANCE COMPANY]";
        return {
            thai: `เรียน บริษัทประกันภัย ${company}
ข้าพเจ้า ${name} ขอความอนุเคราะห์ออกใบเสร็จรับเงินสำหรับกรมธรรม์เลขที่ ${account}
${ending.th}`,
            english: `Dear ${company},
I, ${name}, would like to request a payment receipt for policy number ${account}.
Thank you very much.`,
        };
    }

    // Immigration document inquiry
    if (recipient === "immigration" && purpose === "doc_inquiry") {
        const office = input.officeCityImm || "[OFFICE/CITY]";
        const task = input.task || "[TASK TYPE]";
        return {
            thai: `เรื่อง: ขอสอบถามแนวทางการเตรียมเอกสาร
เรียน เจ้าหน้าที่สำนักงานตรวจคนเข้าเมือง ${office}
ข้าพเจ้า ${name} ขอรบกวนสอบถามรายการเอกสารที่ควรเตรียมสำหรับเรื่อง ${task} เพื่อให้จัดเตรียมเอกสารได้ถูกต้อง
ขอสอบถามเพิ่มเติมว่า:
1) เอกสารหลักที่ต้องใช้มีอะไรบ้าง
2) มีข้อกำหนดเรื่องสำเนา/รูปถ่าย/การรับรองเอกสารเพิ่มเติมหรือไม่
3) มีขั้นตอนนัดหมายหรือเวลาทำการที่แนะนำหรือไม่
${ending.th}
${ending.thEnd}
${name} ${phone || email}`,
            english: `Subject: Document Preparation Inquiry
Dear Immigration Office ${office},
I, ${name}, would like to inquire about the documents I should prepare for ${task} so that I can prepare them correctly.
Additional questions:
1) What are the main required documents?
2) Are there specific requirements for copies/photos/document certification?
3) Are there recommended appointment procedures or office hours?
Thank you for your guidance.
Best regards,
${name} ${phone || email}`,
        };
    }

    // Immigration office hours
    if (recipient === "immigration" && purpose === "office_hours") {
        const office = input.officeCityImm || "[OFFICE/CITY]";
        return {
            thai: `เรื่อง: ขอสอบถามเวลาทำการ/ขั้นตอนนัดหมาย
เรียน เจ้าหน้าที่สำนักงานตรวจคนเข้าเมือง ${office}
ข้าพเจ้า ${name} ขอสอบถามเวลาทำการ และขั้นตอนการนัดหมายเข้าพบ
${ending.th}
${ending.thEnd}
${name} ${phone || email}`,
            english: `Subject: Office Hours / Appointment Inquiry
Dear Immigration Office ${office},
I, ${name}, would like to inquire about your office hours and appointment procedures.
Thank you.
Best regards,
${name} ${phone || email}`,
        };
    }

    // Immigration 90-day pending/rejected
    if (recipient === "immigration" && purpose === "ninety_day_status") {
        const office = input.officeCityImm || "[OFFICE/CITY]";
        const status = input.status || "[PENDING/REJECTED]";
        return {
            thai: `เรื่อง: ขอสอบถามการรายงานตัว 90 วัน (ระบบออนไลน์)
เรียน เจ้าหน้าที่สำนักงานตรวจคนเข้าเมือง ${office}
ข้าพเจ้า ${name} ขอรบกวนสอบถามเกี่ยวกับการรายงานตัว 90 วันผ่านระบบออนไลน์ โดยสถานะคำขอเป็น ${status} ตั้งแต่วันที่ ${date}
รบกวนแนะนำแนวทางปฏิบัติที่ถูกต้อง เช่น ต้องดำเนินการใหม่ หรือควรติดต่อ/เข้ายื่นด้วยตนเองอย่างไร
${ending.th}`,
            english: `Subject: 90-Day Reporting Inquiry (Online System)
Dear Immigration Office ${office},
I, ${name}, would like to inquire about my 90-day reporting via the online system. My application status is "${status}" since ${date}.
Could you please advise on the correct steps to take — whether I should resubmit or visit in person?
Thank you very much.`,
        };
    }

    // Government confirmation letter
    if (recipient === "government" && purpose === "confirmation_letter") {
        const agency = input.agencyName || "[AGENCY/DEPARTMENT]";
        return {
            thai: `เรื่อง: ขอความอนุเคราะห์ออกหนังสือรับรอง
เรียน ${agency}
ข้าพเจ้า ${name} ขอความอนุเคราะห์ออกหนังสือรับรองเกี่ยวกับ ${input.requestDesc || "[REQUEST]"} เพื่อใช้ประกอบการยื่นเอกสารกับหน่วยงานที่เกี่ยวข้อง
รายละเอียดผู้ขอ:
ชื่อ: ${name}
เลขอ้างอิง (ถ้ามี): ${account}
เบอร์ติดต่อ: ${phone}
${ending.th}
${ending.thEnd}
${name}`,
            english: `Subject: Request for Confirmation Letter
Dear ${agency},
I, ${name}, would like to request a confirmation letter regarding ${input.requestDesc || "[REQUEST]"} for submitting documents to the relevant authorities.
Applicant details:
Name: ${name}
Reference number (if any): ${account}
Contact: ${phone}
Thank you very much.
Best regards,
${name}`,
        };
    }

    // Government certified copy
    if (recipient === "government" && purpose === "certified_copy") {
        const agency = input.agencyName || "[AGENCY/DEPARTMENT]";
        return {
            thai: `เรื่อง: ขอความอนุเคราะห์ออกเอกสาร/สำเนารับรอง
เรียน ${agency}
ข้าพเจ้า ${name} ขอความอนุเคราะห์ออกเอกสาร/สำเนารับรองเกี่ยวกับ ${input.requestDesc || "[DOCUMENT]"} เพื่อใช้ประกอบการยื่นเอกสารกับหน่วยงานที่เกี่ยวข้อง
รายละเอียดผู้ขอ:
ชื่อ: ${name}
เลขอ้างอิง (ถ้ามี): ${account}
เบอร์ติดต่อ: ${phone}
${ending.th}
${ending.thEnd}
${name}`,
            english: `Subject: Request for Certified Copy / Document
Dear ${agency},
I, ${name}, would like to request a certified copy/document regarding ${input.requestDesc || "[DOCUMENT]"} for submitting to the relevant authorities.
Applicant details:
Name: ${name}
Reference (if any): ${account}
Contact: ${phone}
Thank you very much.
Best regards,
${name}`,
        };
    }

    // Government general inquiry
    if (recipient === "government" && purpose === "general_inquiry") {
        const agency = input.agencyName || "[AGENCY/DEPARTMENT]";
        return {
            thai: `เรื่อง: ขอสอบถามข้อมูล
เรียน ${agency}
ข้าพเจ้า ${name} ขอรบกวนสอบถามเกี่ยวกับ ${input.requestDesc || "[INQUIRY]"}
${ending.th}
${ending.thEnd}
${name} ${phone || email}`,
            english: `Subject: General Inquiry
Dear ${agency},
I, ${name}, would like to inquire about ${input.requestDesc || "[INQUIRY]"}.
Thank you.
Best regards,
${name} ${phone || email}`,
        };
    }

    return { thai: "Template not found", english: "Template not found" };
}
