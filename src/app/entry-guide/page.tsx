import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "./PrintButton";
import "./entry-guide.css";

export const metadata: Metadata = {
    title: "First-Time Thailand Entry Guide | Official Requirements Overview | Tenee",
    description:
        "Planning your first trip to Thailand? View a high-level overview of passport requirements, visa categories, and official Thai government entry links.",
    keywords: [
        "Thailand entry requirements",
        "Thailand tourist visa",
        "Thailand visa exemption",
        "Thailand visa on arrival",
        "first time Thailand",
        "Thailand passport requirements",
        "Thai eVisa",
    ],
    openGraph: {
        title: "First-Time Thailand Entry Guide | Tenee",
        description:
            "High-level overview of passport requirements, visa categories, and official Thai government entry links.",
        type: "website",
        locale: "en_US",
        siteName: "Tenee",
    },
    twitter: {
        card: "summary_large_image",
        title: "First-Time Thailand Entry Guide | Tenee",
        description:
            "Planning your first trip to Thailand? Overview of entry requirements with official government links.",
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
        {
            "@type": "Question",
            name: "What are the passport requirements for entering Thailand as a tourist?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Most travelers must have a passport valid for at least 6 months from the date of entry and at least one blank page for stamps. Always verify with official Thai government sources before travel.",
            },
        },
        {
            "@type": "Question",
            name: "Do I need a visa to travel to Thailand as a first-time tourist?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Visa requirements depend on your nationality. Some travelers qualify for visa exemption, others must apply for a tourist visa or visa on arrival. Always check eligibility through the official Thai eVisa portal or your nearest Thai embassy.",
            },
        },
        {
            "@type": "Question",
            name: "What documents might immigration request on arrival?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Immigration officers may request proof of onward travel, accommodation details, and proof of sufficient funds. Requirements vary and should be verified with official sources.",
            },
        },
        {
            "@type": "Question",
            name: "Is there a digital arrival card required for Thailand?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Thailand may require travelers to complete an online arrival form prior to entry. Requirements can change, so travelers should confirm directly on official Thai immigration or eVisa websites 24–48 hours before departure.",
            },
        },
    ],
};

export default function EntryGuidePage() {
    return (
        <div className="entry-guide-page">
            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="eg-container">
                {/* ═══════════════════════════════════════
            1. HERO SECTION
            ═══════════════════════════════════════ */}
                <section className="eg-hero">
                    <h1>First-Time Tourist Entry Overview – Thailand</h1>
                    <p className="eg-subtext">
                        Planning your first trip to Thailand? Here&apos;s a high-level overview of
                        entry requirements, with official sources linked for verification.
                    </p>

                    {/* Disclaimer Box */}
                    <div className="eg-disclaimer">
                        <p>
                            <span className="eg-disclaimer-icon">⚠️</span>{" "}
                            This page provides general informational guidance only. Entry requirements
                            vary by nationality and may change. Always verify with official Thai
                            government or embassy sources before travel. Tenee does not determine visa
                            eligibility.
                        </p>
                    </div>

                    {/* Hero CTAs */}
                    <div className="eg-btn-row">
                        <a
                            href="https://www.thaievisa.go.th"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="eg-btn-primary"
                        >
                            Visit Official Thai eVisa Portal ↗
                        </a>
                        <PrintButton />
                    </div>
                </section>

                {/* ═══════════════════════════════════════
            2. PASSPORT REQUIREMENTS
            ═══════════════════════════════════════ */}
                <section className="eg-section" id="passport-requirements">
                    <h2>🛂 Passport Requirements</h2>
                    <ul className="eg-checklist">
                        <li>Passport valid at least 6 months from entry date</li>
                        <li>At least one blank page for stamps</li>
                    </ul>
                    <div className="eg-official-links">
                        <a
                            href="https://www.thaievisa.go.th"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="eg-official-link"
                        >
                            🔗 Official Thai eVisa Portal
                        </a>
                        <a
                            href="https://www.thaievisa.go.th/static/English-Manual.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="eg-official-link"
                        >
                            📄 eVisa Application Manual (PDF)
                        </a>
                    </div>
                </section>

                {/* ═══════════════════════════════════════
            3. TOURIST ENTRY CATEGORIES
            ═══════════════════════════════════════ */}
                <section className="eg-section" id="entry-categories">
                    <h2>🗂️ Tourist Entry Categories</h2>

                    <div className="eg-cards-grid">
                        {/* Card 1 */}
                        <div className="eg-card">
                            <div className="eg-card-icon">🟢</div>
                            <h3>Visa Exemption</h3>
                            <p>
                                Some nationalities may enter Thailand without a visa for a limited
                                stay. Eligibility and permitted duration vary by nationality.
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="eg-card">
                            <div className="eg-card-icon">📋</div>
                            <h3>Tourist Visa (Pre-Arrival)</h3>
                            <p>
                                Travelers who require a visa should apply in advance through the
                                official Thai eVisa portal or their nearest Thai embassy or consulate.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="eg-card">
                            <div className="eg-card-icon">🛬</div>
                            <h3>Visa on Arrival</h3>
                            <p>
                                Available for eligible nationalities at designated international
                                entry points. Duration and requirements vary.
                            </p>
                        </div>
                    </div>

                    <div className="eg-disclaimer" style={{ maxWidth: "100%" }}>
                        <p>
                            <span className="eg-disclaimer-icon">ℹ️</span>{" "}
                            Visa eligibility depends entirely on nationality. Please verify
                            directly with official Thai government or embassy sources.
                        </p>
                    </div>

                    <div className="eg-btn-row" style={{ justifyContent: "flex-start" }}>
                        <a
                            href="https://www.thaievisa.go.th"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="eg-btn-primary"
                        >
                            Visit Official Thai eVisa Portal ↗
                        </a>
                    </div>
                </section>

                {/* ═══════════════════════════════════════
            4. SUPPORTING DOCUMENTS
            ═══════════════════════════════════════ */}
                <section className="eg-section" id="supporting-documents">
                    <h2>📎 Supporting Documents</h2>
                    <p>
                        Immigration officers may request any of the following upon arrival.
                        Requirements can vary — always confirm with official sources.
                    </p>
                    <ul className="eg-checklist">
                        <li>Proof of onward or return flight</li>
                        <li>Proof of accommodation (hotel booking, invitation letter, etc.)</li>
                        <li>Proof of funds (if requested by immigration)</li>
                        <li className="eg-optional">Travel insurance (optional but recommended)</li>
                    </ul>
                    <div className="eg-official-links">
                        <a
                            href="https://www.thaievisa.go.th"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="eg-official-link"
                        >
                            🔗 Official Thai eVisa Portal
                        </a>
                    </div>
                </section>

                {/* ═══════════════════════════════════════
            5. DIGITAL ARRIVAL CARD
            ═══════════════════════════════════════ */}
                <section className="eg-section" id="digital-arrival-card">
                    <h2>📱 Digital Arrival Card</h2>
                    <p>
                        Travelers may be required to complete an online arrival form before
                        entry. This digital form may replace or supplement the traditional
                        paper arrival/departure card.
                    </p>
                    <div className="eg-safety-note">
                        <span>⚠️</span>
                        <span>
                            Digital arrival requirements are subject to updates or suspension.
                            Always check the official portal <strong>24–48 hours before departure</strong>.
                        </span>
                    </div>
                    <div className="eg-official-links">
                        <a
                            href="https://www.thaievisa.go.th"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="eg-official-link"
                        >
                            🔗 Official Thai eVisa Portal
                        </a>
                    </div>
                </section>

                {/* ═══════════════════════════════════════
            6. PEOPLE ALSO ASK (SEO Magnet)
            ═══════════════════════════════════════ */}
                <section className="eg-section" id="people-also-ask">
                    <h2>❓ Additional Questions Travelers Ask</h2>

                    <div className="eg-paa-list">
                        <details className="eg-paa-item">
                            <summary>How long can I stay in Thailand as a tourist?</summary>
                            <div className="eg-paa-answer">
                                The permitted length of stay depends on your nationality and entry
                                category (visa exemption, tourist visa, or visa on arrival). Typical
                                stays range from 15 to 60 days. Always confirm with the{" "}
                                <a
                                    href="https://www.thaievisa.go.th"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    official Thai eVisa portal
                                </a>{" "}
                                or your nearest Thai embassy.
                            </div>
                        </details>

                        <details className="eg-paa-item">
                            <summary>Can I extend my tourist stay in Thailand?</summary>
                            <div className="eg-paa-answer">
                                Extensions may be available at Thai Immigration offices within
                                Thailand. Eligibility, duration, and required documents vary. Contact
                                your local Thai Immigration office or check the{" "}
                                <a
                                    href="https://www.thaievisa.go.th"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    official portal
                                </a>{" "}
                                for current policies.
                            </div>
                        </details>

                        <details className="eg-paa-item">
                            <summary>What happens if I overstay in Thailand?</summary>
                            <div className="eg-paa-answer">
                                Overstaying a visa or permitted stay in Thailand can result in fines,
                                detention, deportation, and potential re-entry bans. Penalties are
                                determined solely by Thai authorities. Always depart before your
                                permitted stay expires.
                            </div>
                        </details>

                        <details className="eg-paa-item">
                            <summary>Do I need travel insurance for Thailand?</summary>
                            <div className="eg-paa-answer">
                                While travel insurance is not always mandatory, it is strongly
                                recommended. Some visa categories may require proof of insurance.
                                Verify requirements with the{" "}
                                <a
                                    href="https://www.thaievisa.go.th"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    official Thai eVisa portal
                                </a>{" "}
                                or your nearest embassy.
                            </div>
                        </details>

                        <details className="eg-paa-item">
                            <summary>What is the official Thai eVisa website?</summary>
                            <div className="eg-paa-answer">
                                The official Thai eVisa portal is{" "}
                                <a
                                    href="https://www.thaievisa.go.th"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    www.thaievisa.go.th
                                </a>
                                . Always verify that the URL matches the official .go.th domain to
                                avoid scam websites.
                            </div>
                        </details>
                    </div>
                </section>

                {/* ═══════════════════════════════════════
            7. HOW THIS PAGE IS BUILT (Credibility)
            ═══════════════════════════════════════ */}
                <section className="eg-section" id="how-built">
                    <h2>🏛️ How This Page Is Built</h2>
                    <div className="eg-credibility">
                        <p>
                            This overview is structured based on publicly available information
                            from official Thai government and embassy sources. Tenee does not
                            modify or interpret immigration eligibility. Travelers are encouraged
                            to confirm requirements directly with Thai authorities before
                            departure.
                        </p>
                    </div>
                </section>

                {/* ═══════════════════════════════════════
            8. BRIDGE TO CORE TOOL (Conversion)
            ═══════════════════════════════════════ */}
                <section className="eg-section eg-print-hide" id="bridge" style={{ borderBottom: "none" }}>
                    <div className="eg-bridge">
                        <h2>Official Requirements Can Feel Overwhelming.</h2>
                        <p>
                            Government websites provide the rules.<br />
                            Tenee helps you organize what you&apos;ve confirmed.
                        </p>
                        <p style={{ fontSize: "0.93rem", color: "#6b7280" }}>
                            Once you&apos;ve verified eligibility through official sources, use Tenee to:
                        </p>
                        <ul className="eg-bridge-features">
                            <li>Organize your documents clearly</li>
                            <li>Structure your paperwork</li>
                            <li>Prepare polite Thai messages</li>
                            <li>Avoid last-minute confusion</li>
                        </ul>
                        <Link href="/wizard" className="eg-btn-primary">
                            → Organize My Documents
                        </Link>
                    </div>
                </section>

                {/* Internal Links (SEO Boost) */}
                <section className="eg-section eg-print-hide" style={{ borderBottom: "none", paddingBottom: "0.5rem" }}>
                    <h2 style={{ fontSize: "1.1rem", color: "#6b7280" }}>Related Tools</h2>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginTop: "0.5rem" }}>
                        <Link href="/wizard" className="eg-btn-secondary" style={{ fontSize: "0.88rem", padding: "0.55rem 1.1rem" }}>
                            📋 Preparation Toolkit
                        </Link>
                        <Link href="/write-thai" className="eg-btn-secondary" style={{ fontSize: "0.88rem", padding: "0.55rem 1.1rem" }}>
                            🇹🇭 Thai Message Templates
                        </Link>
                        <Link href="/legal-claims" className="eg-btn-secondary" style={{ fontSize: "0.88rem", padding: "0.55rem 1.1rem" }}>
                            ⚖️ Legal Toolkit
                        </Link>
                        <Link href="/safety" className="eg-btn-secondary" style={{ fontSize: "0.88rem", padding: "0.55rem 1.1rem" }}>
                            🛡️ Safety & Allergy Cards
                        </Link>
                    </div>
                </section>
            </div>

            {/* ═══════════════════════════════════════
          FOOTER DISCLAIMER
          ═══════════════════════════════════════ */}
            <div className="eg-footer-disclaimer">
                Immigration decisions are made solely by Thai authorities at their discretion.
            </div>
        </div>
    );
}
