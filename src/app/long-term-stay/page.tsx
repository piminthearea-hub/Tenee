import type { Metadata } from "next";
import Link from "next/link";
import "./long-term-stay.css";

export const metadata: Metadata = {
    title: "Long-Term Stay Options in Thailand – Official Overview | Tenee",
    description:
        "Structured regulatory overview of Thailand long-term stay categories: retirement, remote work, LTR visa, investment pathways, and work authorization considerations. Official government sources linked.",
    keywords: [
        "Thailand long-term stay",
        "Thailand retirement visa",
        "Thailand LTR visa",
        "Thailand digital nomad visa",
        "Thailand investment visa",
        "Thailand work permit",
        "long-term resident Thailand",
        "retire in Thailand",
        "work authorization Thailand",
    ],
    openGraph: {
        title: "Long-Term Stay Options in Thailand – Official Overview | Tenee",
        description:
            "Regulatory compliance memo: structured overview of Thailand long-term stay categories with official government source links.",
        type: "website",
        locale: "en_US",
        siteName: "Tenee",
    },
    twitter: {
        card: "summary_large_image",
        title: "Long-Term Stay Options in Thailand | Tenee",
        description:
            "Official overview of retirement, remote work, LTR, investment, and work authorization considerations in Thailand.",
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
        {
            "@type": "Question",
            name: "What are the long-term stay options in Thailand?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Thailand offers multiple structured long-term stay pathways including retirement-based stay, remote work and digital nomad programs, the Long-Term Resident (LTR) program administered by the BOI, and investment-based residence pathways. Eligibility is determined exclusively by Thai authorities.",
            },
        },
        {
            "@type": "Question",
            name: "How do I apply for retirement stay in Thailand?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Retirement-based stay in Thailand is a structured visa category for eligible applicants meeting age and financial requirements set by Thai authorities. Applications should be submitted through official channels such as the Thai eVisa portal or Thai embassies. Always verify current requirements with official government sources.",
            },
        },
        {
            "@type": "Question",
            name: "What is Thailand's Long-Term Resident (LTR) visa?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "The LTR visa is a structured initiative administered by the Thailand Board of Investment (BOI) designed for defined applicant groups including wealthy global citizens, wealthy pensioners, work-from-Thailand professionals, and highly skilled professionals. Details are available at ltr.boi.go.th.",
            },
        },
        {
            "@type": "Question",
            name: "Do I need a work permit for long-term stay in Thailand?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Work authorization in Thailand is governed by regulatory frameworks distinct from visa classification. Holding a long-term stay category does not automatically confer permission to engage in employment activities. Prospective applicants should verify work authorization rules directly with official Thai government sources.",
            },
        },
    ],
};

export default function LongTermStayPage() {
    return (
        <div className="lts-page">
            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="lts-container">
                {/* ═══════════════════════════════════════
                    HERO SECTION
                    ═══════════════════════════════════════ */}
                <section className="lts-hero">
                    <h1>Long-Term Stay Options in Thailand – Official Overview</h1>
                    <p className="lts-subtext">
                        A structured regulatory overview of Thailand&apos;s long-term stay
                        policy categories, compiled from publicly available official sources.
                    </p>

                    {/* Top Disclaimer */}
                    <div className="lts-disclaimer">
                        <p>
                            ⚠️ This page provides general informational guidance based on publicly
                            available official sources. Immigration decisions are made solely at the
                            discretion of Thai authorities. Requirements may change without notice.
                            Applicants must verify eligibility directly through official government
                            portals.
                        </p>
                    </div>

                    {/* Publication & Revision Block */}
                    <div className="lts-pub-block">
                        <div className="lts-pub-dates">
                            <div>Published: <span>March 3, 2026</span></div>
                            <div>Last Reviewed: <span>March 3, 2026</span></div>
                        </div>
                        <p style={{ fontWeight: 600, color: "#1B365D", marginBottom: "0.35rem", fontSize: "0.88rem" }}>
                            Revision Log:
                        </p>
                        <ul className="lts-revision-log">
                            <li>Version 1.0 – Initial structured overview of long-term stay policy categories.</li>
                            <li>Subsequent updates will reflect formally published changes issued by Thai authorities.</li>
                        </ul>
                    </div>
                </section>

                {/* ═══════════════════════════════════════
                    EXECUTIVE OVERVIEW
                    ═══════════════════════════════════════ */}
                <section className="lts-section" id="executive-overview">
                    <h2>📋 Executive Overview</h2>
                    <p>
                        Thailand offers multiple structured long-term stay pathways intended for
                        retirees, remote professionals, investors, and defined applicant groups.
                        These categories form part of Thailand&apos;s broader immigration policy
                        framework for extended residence.
                    </p>
                    <p style={{ marginTop: "0.75rem", fontWeight: 600, color: "#1B365D" }}>
                        All eligibility determinations are made exclusively by Thai authorities.
                    </p>

                    {/* Scope Limitation */}
                    <div className="lts-scope-limitation">
                        <h3>Scope Limitation</h3>
                        <p>
                            This overview summarizes publicly available structural information
                            regarding long-term stay categories. It does not interpret statutory
                            provisions, evaluate applicant qualifications, or replace official
                            government determinations.
                        </p>
                    </div>
                </section>

                {/* ═══════════════════════════════════════
                    LONG-TERM STAY POLICY CATEGORIES
                    ═══════════════════════════════════════ */}
                <section className="lts-section" id="stay-categories">
                    <h2>🏛️ Long-Term Stay Policy Categories</h2>

                    {/* A. Retirement */}
                    <div className="lts-category">
                        <div className="lts-category-header">
                            <span className="lts-category-icon">🏖️</span>
                            <h3>A. Retirement-Based Stay</h3>
                        </div>
                        <p>
                            Thailand provides a structured visa category for retirement-based
                            long-term stay. This pathway is intended for applicants meeting age
                            and financial requirements as defined by Thai immigration authorities.
                            Eligibility criteria, documentation requirements, and permitted stay
                            duration are determined by official policy and may be subject to
                            periodic revision.
                        </p>
                        <div className="lts-official-links">
                            <a href="https://www.thaievisa.go.th" target="_blank" rel="noopener noreferrer" className="lts-official-link">
                                🔗 Thai eVisa Portal
                            </a>
                            <a href="https://immigration.go.th" target="_blank" rel="noopener noreferrer" className="lts-official-link">
                                🔗 Thai Immigration Bureau
                            </a>
                        </div>
                    </div>

                    {/* B. Remote Work / Digital Nomad */}
                    <div className="lts-category">
                        <div className="lts-category-header">
                            <span className="lts-category-icon">💻</span>
                            <h3>B. Remote Work / Digital Nomad Programs</h3>
                        </div>
                        <p>
                            Thailand has introduced programs and visa categories intended for
                            remote professionals seeking to conduct work activities from Thailand.
                            Program structures, eligibility criteria, and application processes
                            are subject to policy updates and may vary depending on the specific
                            initiative. Applicants should verify whether work authorization
                            requirements apply to their intended activities.
                        </p>
                        <div className="lts-official-links">
                            <a href="https://www.thaievisa.go.th" target="_blank" rel="noopener noreferrer" className="lts-official-link">
                                🔗 Thai eVisa Portal
                            </a>
                        </div>
                    </div>

                    {/* C. LTR Program */}
                    <div className="lts-category">
                        <div className="lts-category-header">
                            <span className="lts-category-icon">🏛️</span>
                            <h3>C. Long-Term Resident (LTR) Program</h3>
                        </div>
                        <p>
                            The LTR visa is a structured initiative administered by the Thailand
                            Board of Investment (BOI). It is designed for defined applicant groups
                            including wealthy global citizens, wealthy pensioners,
                            work-from-Thailand professionals, and highly skilled professionals.
                            The program may offer extended stay duration and additional
                            administrative provisions as determined by the BOI.
                        </p>
                        <div className="lts-official-links">
                            <a href="https://ltr.boi.go.th" target="_blank" rel="noopener noreferrer" className="lts-official-link">
                                🔗 BOI Long-Term Resident Visa Portal
                            </a>
                        </div>
                    </div>

                    {/* D. Investment-Based Stay */}
                    <div className="lts-category">
                        <div className="lts-category-header">
                            <span className="lts-category-icon">📈</span>
                            <h3>D. Investment-Based Stay</h3>
                        </div>
                        <p>
                            Thailand maintains policy-based residence pathways for individuals
                            making qualifying investments as defined by Thai authorities.
                            Investment categories, qualifying criteria, and application
                            procedures are determined by official policy and may be subject
                            to revision.
                        </p>
                        <div className="lts-official-links">
                            <a href="https://www.thaievisa.go.th" target="_blank" rel="noopener noreferrer" className="lts-official-link">
                                🔗 Thai eVisa Portal
                            </a>
                            <a href="https://immigration.go.th" target="_blank" rel="noopener noreferrer" className="lts-official-link">
                                🔗 Thai Immigration Bureau
                            </a>
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════
                    IMMIGRATION PREPARATION WORKFLOW
                    ═══════════════════════════════════════ */}
                <section className="lts-section" id="preparation-workflow">
                    <h2>🔧 Immigration Preparation Workflow</h2>
                    <p>
                        This workflow outlines common preparation stages observed across long-term stay
                        pathways in Thailand. Requirements vary by category and must be verified
                        through official government sources.
                    </p>

                    <div className="lts-accordion">
                        {/* Stage 1 */}
                        <details className="lts-accordion-item">
                            <summary>▸ Stage 1 – Identity & Status</summary>
                            <div className="lts-accordion-content">
                                <ul className="lts-accordion-checklist">
                                    <li>Check passport validity</li>
                                    <li>Copy current visa or entry stamp</li>
                                    <li>Confirm photo specifications</li>
                                    <li>Make sure your name matches across all documents</li>
                                </ul>
                                <div className="lts-accordion-insight">
                                    <strong>Why this matters:</strong>
                                    Small identity inconsistencies can slow review.
                                </div>
                            </div>
                        </details>

                        {/* Stage 2 */}
                        <details className="lts-accordion-item">
                            <summary>▸ Stage 2 – Financial Documents</summary>
                            <div className="lts-accordion-content">
                                <ul className="lts-accordion-checklist">
                                    <li>Prepare recent bank statements</li>
                                    <li>Gather proof of income</li>
                                    <li>Include investment documents (if applicable)</li>
                                    <li>Obtain bank certification (if required)</li>
                                </ul>
                                <div className="lts-accordion-insight">
                                    <strong>Why this matters:</strong>
                                    Financial documents are reviewed for consistency and date alignment.
                                </div>
                            </div>
                        </details>

                        {/* Stage 3 */}
                        <details className="lts-accordion-item">
                            <summary>▸ Stage 3 – Relationship Documents (If Applicable)</summary>
                            <div className="lts-accordion-content">
                                <ul className="lts-accordion-checklist">
                                    <li>Marriage certificate</li>
                                    <li>Household registration</li>
                                    <li>Spouse or dependent ID copies</li>
                                    <li>Certified translations (if required)</li>
                                </ul>
                                <div className="lts-accordion-insight">
                                    <strong>Why this matters:</strong>
                                    Family-based applications require documents that match across records.
                                </div>
                            </div>
                        </details>

                        {/* Stage 4 */}
                        <details className="lts-accordion-item">
                            <summary>▸ Stage 4 – Employment & Work Authorization</summary>
                            <div className="lts-accordion-content">
                                <ul className="lts-accordion-checklist">
                                    <li>Employment contract</li>
                                    <li>Work permit status (if applicable)</li>
                                    <li>Employer or sponsor documents</li>
                                    <li>Company registration copies</li>
                                </ul>
                                <div className="lts-accordion-insight">
                                    <strong>Why this matters:</strong>
                                    Visa status and work authorization are regulated separately.
                                </div>
                            </div>
                        </details>

                        {/* Stage 5 */}
                        <details className="lts-accordion-item">
                            <summary>▸ Stage 5 – Insurance & Health</summary>
                            <div className="lts-accordion-content">
                                <ul className="lts-accordion-checklist">
                                    <li>Health insurance certificate</li>
                                    <li>Confirm coverage period</li>
                                    <li>Medical certificate (if required)</li>
                                </ul>
                                <div className="lts-accordion-insight">
                                    <strong>Why this matters:</strong>
                                    Some long-term categories require insurance compliance.
                                </div>
                            </div>
                        </details>

                        {/* Stage 6 */}
                        <details className="lts-accordion-item">
                            <summary>▸ Stage 6 – Forms & Filing</summary>
                            <div className="lts-accordion-content">
                                <ul className="lts-accordion-checklist">
                                    <li>Complete official forms</li>
                                    <li>Prepare extension forms (if needed)</li>
                                    <li>Attach supporting documents</li>
                                    <li>Keep payment confirmation</li>
                                </ul>
                                <div className="lts-accordion-insight">
                                    <strong>Why this matters:</strong>
                                    Complete and consistent forms support smoother processing.
                                </div>
                            </div>
                        </details>

                        {/* Stage 7 */}
                        <details className="lts-accordion-item">
                            <summary>▸ Stage 7 – Digital Submission Review</summary>
                            <div className="lts-accordion-content">
                                <ul className="lts-accordion-checklist">
                                    <li>Confirm file format (PDF/image)</li>
                                    <li>Ensure scans are clear</li>
                                    <li>Check file size limits</li>
                                    <li>Confirm dates are consistent</li>
                                    <li>Review document expiration</li>
                                </ul>
                                <div className="lts-accordion-insight">
                                    <strong>Why this matters:</strong>
                                    Online submission does not reduce documentation standards.
                                </div>
                            </div>
                        </details>

                        {/* Stage 8 */}
                        <details className="lts-accordion-item">
                            <summary>▸ Stage 8 – Ongoing Monitoring</summary>
                            <div className="lts-accordion-content">
                                <ul className="lts-accordion-checklist">
                                    <li>Track appointments</li>
                                    <li>Monitor reporting deadlines</li>
                                    <li>Note renewal dates</li>
                                    <li>Keep entry/exit records</li>
                                </ul>
                                <div className="lts-accordion-insight">
                                    <strong>Why this matters:</strong>
                                    Long-term stay may involve ongoing compliance.
                                </div>
                            </div>
                        </details>
                    </div>

                    <div className="lts-scope-limitation" style={{ marginTop: "1.5rem" }}>
                        <p>
                            This workflow provides organizational guidance only. Official decisions
                            and requirements are determined by Thai authorities.
                        </p>
                    </div>
                </section>

                {/* ═══════════════════════════════════════
                    EMPLOYMENT AND WORK AUTHORIZATION
                    ═══════════════════════════════════════ */}
                <section className="lts-section" id="employment">
                    <h2>💼 Employment and Work Authorization Considerations</h2>
                    <p>
                        Certain long-term stay categories may intersect with employment or
                        professional activity in Thailand.
                    </p>
                    <div className="lts-monitoring" style={{ borderLeftColor: "#92400e" }}>
                        <p style={{ fontWeight: 600, color: "#1B365D" }}>
                            Work authorization in Thailand is governed by regulatory frameworks
                            distinct from visa classification. Holding a long-term stay category
                            does not automatically confer permission to engage in employment
                            activities.
                        </p>
                    </div>
                    <p style={{ marginTop: "1rem", fontWeight: 600, color: "#1B365D", fontSize: "0.95rem" }}>
                        Work authorization requirements may involve:
                    </p>
                    <ul className="lts-doc-list">
                        <li>A valid work permit (if applicable)</li>
                        <li>Employer sponsorship (where required)</li>
                        <li>Compliance with labor and immigration regulations</li>
                        <li>Restrictions tied to specific visa categories</li>
                    </ul>

                    <h3 style={{ marginTop: "2rem", marginBottom: "1rem" }}>🔒 Illustrative Occupational Restrictions</h3>
                    <p>
                        Thai labour regulations designate certain occupations as reserved for Thai nationals
                        under notifications issued pursuant to the Alien Working Act (B.E. 2551 and amendments).
                    </p>
                    <p style={{ marginTop: "0.75rem", fontWeight: 600, color: "#1B365D", fontSize: "0.95rem" }}>
                        Illustrative categories historically restricted have included:
                    </p>
                    <ul className="lts-doc-list">
                        <li>Manual labor and construction roles</li>
                        <li>Agricultural occupations</li>
                        <li>Retail sales and street vending</li>
                        <li>Hairdressing and personal services</li>
                        <li>Tour guiding</li>
                        <li>Certain clerical and administrative roles</li>
                        <li>Gem cutting and traditional crafts</li>
                        <li>Driving motor vehicles (with limited exceptions)</li>
                    </ul>
                    <div className="lts-disclaimer" style={{ maxWidth: "100%", marginTop: "1rem" }}>
                        <p>
                            ℹ️ These examples are illustrative only and do not represent a complete or
                            current legal list. Occupational eligibility must be verified through official
                            government sources.
                        </p>
                    </div>

                    <div className="lts-official-links" style={{ marginTop: "1.5rem" }}>
                        <a href="https://immigration.go.th" target="_blank" rel="noopener noreferrer" className="lts-official-link">
                            🔗 Thai Immigration Bureau
                        </a>
                        <span className="lts-official-link" style={{ cursor: "default", textDecoration: "none" }}>
                            🔗 Ministry of Labour (Thailand)
                        </span>
                        <span className="lts-official-link" style={{ cursor: "default", textDecoration: "none" }}>
                            🔗 Department of Employment (DOE)
                        </span>
                        <span className="lts-official-link" style={{ cursor: "default", textDecoration: "none" }}>
                            🔗 Alien Working Act (B.E. 2551)
                        </span>
                    </div>
                    <div className="lts-scope-limitation" style={{ marginTop: "1.25rem" }}>
                        <p>
                            Immigration status and labor authorization are regulated under distinct
                            legal frameworks in Thailand.
                        </p>
                    </div>
                </section>

                {/* ═══════════════════════════════════════
                    MONITORING AND REVIEW PROTOCOL
                    ═══════════════════════════════════════ */}
                <section className="lts-section" id="monitoring">
                    <h2>📡 Monitoring and Review Protocol</h2>
                    <div className="lts-monitoring">
                        <p>
                            This overview is periodically reviewed against publicly released
                            information published by Thai government agencies. Updates are
                            incorporated when structural changes are formally announced.
                        </p>
                        <p>
                            Tenee monitors official Thai government publications and publicly
                            released program updates for structural changes to long-term stay
                            categories. This page does not independently interpret unpublished
                            policy developments.
                        </p>
                    </div>
                </section>

                {/* ═══════════════════════════════════════
                    PUBLIC DISCUSSION CONTEXT
                    ═══════════════════════════════════════ */}
                <section className="lts-section" id="community-context">
                    <h2>🌐 Public Discussion Context (Non-Authoritative)</h2>
                    <div className="lts-community">
                        <p>
                            Prospective applicants frequently discuss long-term stay experiences
                            in public forums and expatriate communities. Such discussions may
                            provide anecdotal context but do not replace official eligibility
                            determinations.
                        </p>
                        <p style={{ marginTop: "0.75rem", fontWeight: 600, fontSize: "0.9rem", color: "#1B365D" }}>
                            Public Community Discussion Platforms:
                        </p>
                        <ul className="lts-community-platforms">
                            <li>
                                <a href="https://www.reddit.com/r/Thailand/" target="_blank" rel="noopener noreferrer">
                                    r/Thailand
                                </a>
                            </li>
                            <li>
                                <a href="https://www.reddit.com/r/ExpatFIRE/" target="_blank" rel="noopener noreferrer">
                                    r/ExpatFIRE
                                </a>
                            </li>
                            <li>
                                <a href="https://www.reddit.com/r/digitalnomad/" target="_blank" rel="noopener noreferrer">
                                    r/DigitalNomad
                                </a>
                            </li>
                        </ul>
                        <p className="lts-community-note">
                            Community discussions should be viewed as informal experiences and not
                            as authoritative guidance. Individual outcomes do not represent official
                            policy or guaranteed results.
                        </p>
                    </div>
                </section>

                {/* ═══════════════════════════════════════
                    PREPARATION AND DOCUMENTATION STRUCTURING
                    ═══════════════════════════════════════ */}
                <section className="lts-section lts-print-hide" id="bridge" style={{ borderBottom: "none" }}>
                    <div className="lts-bridge">
                        <h2>Preparation and Documentation Structuring</h2>
                        <p>
                            Once official eligibility has been verified through government
                            channels, structured documentation organization may support
                            administrative clarity.
                        </p>
                        <p style={{ fontSize: "0.9rem", color: "#6b7280" }}>
                            Tenee provides tools intended to assist with document organization
                            and communication preparation. These tools do not replace official
                            government processes.
                        </p>
                        <Link href="/wizard" className="lts-btn-primary" style={{ marginTop: "1rem" }}>
                            → Begin Document Organization
                        </Link>
                    </div>
                </section>

                {/* Internal Links (SEO) */}
                <section className="lts-section lts-print-hide" style={{ borderBottom: "none", paddingBottom: "0.5rem" }}>
                    <h2 style={{ fontSize: "1.1rem", color: "#6b7280" }}>Related Resources</h2>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginTop: "0.5rem" }}>
                        <Link href="/entry-guide" className="lts-btn-outline">
                            🛫 First-Time Entry Guide
                        </Link>
                        <Link href="/wizard" className="lts-btn-outline">
                            📋 Preparation Toolkit
                        </Link>
                        <Link href="/write-thai" className="lts-btn-outline">
                            🇹🇭 Thai Message Templates
                        </Link>
                        <Link href="/legal-claims" className="lts-btn-outline">
                            ⚖️ Legal Toolkit
                        </Link>
                    </div>
                </section>
            </div>

            {/* ═══════════════════════════════════════
                FOOTER DISCLAIMER
                ═══════════════════════════════════════ */}
            <div className="lts-footer-disclaimer">
                Immigration decisions are made solely at the discretion of Thai authorities.
                This page is maintained for informational transparency and structural clarity
                purposes.
            </div>
        </div>
    );
}
