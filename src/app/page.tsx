import Link from "next/link";
import FunFactCard from "@/components/FunFactCard";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section
        style={{
          position: "relative",
          padding: "5rem 1.5rem 4rem",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        {/* Background gradient orbs */}
        <div
          style={{
            position: "absolute",
            top: "-20%",
            left: "20%",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(245,197,66,0.12) 0%, transparent 70%)",
            filter: "blur(60px)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-10%",
            right: "10%",
            width: "350px",
            height: "350px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(45,212,191,0.08) 0%, transparent 70%)",
            filter: "blur(60px)",
            pointerEvents: "none",
          }}
        />

        <div
          className="animate-fade-in"
          style={{ position: "relative", zIndex: 1, maxWidth: "720px", margin: "0 auto" }}
        >
          <div
            style={{
              display: "inline-block",
              padding: "6px 16px",
              borderRadius: "999px",
              background: "rgba(245,197,66,0.1)",
              border: "1px solid rgba(245,197,66,0.2)",
              fontSize: "0.85rem",
              color: "#f5c542",
              fontWeight: 600,
              marginBottom: "1.5rem",
            }}
          >
            ✨ 100% Free — No Login Required
          </div>

          <h1
            style={{
              fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              marginBottom: "1.25rem",
            }}
          >
            Thailand Paperwork,{" "}
            <span className="gradient-text">Made Simple</span>
          </h1>

          <p
            style={{
              fontSize: "1.15rem",
              color: "#94a3b8",
              lineHeight: 1.6,
              marginBottom: "2.5rem",
              maxWidth: "560px",
              margin: "0 auto 2.5rem",
            }}
          >
            Generate printable preparation packets, checklists, and polite Thai
            letters in under 60 seconds. Built for elders, caregivers, and expats.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              justifyContent: "center",
            }}
          >
            <Link href="/wizard" className="btn-primary" id="hero-cta-packet">
              📋 Create Your Packet
            </Link>
            <Link href="/write-thai" className="btn-secondary" id="hero-cta-thai">
              🇹🇭 Write in Thai
            </Link>
          </div>
        </div>
      </section>

      {/* Privacy Promise */}
      <section
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          padding: "0 1.5rem 2rem",
          textAlign: "center",
        }}
      >
        <div
          className="glass-card"
          style={{
            borderLeft: "3px solid #2dd4bf",
            textAlign: "left",
            padding: "1.5rem 2rem",
          }}
        >
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#2dd4bf", marginBottom: "0.75rem" }}>
            🔒 Privacy Promise
          </h3>
          <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: "0.5rem", fontSize: "0.95rem", color: "#cbd5e1" }}>
            <li>✅ No login required.</li>
            <li>⛔ Do not enter passport numbers or sensitive personal data.</li>
            <li>🛡️ <strong>We do not sell your data.</strong></li>
            <li>📊 We only use aggregate metrics (if enabled) to improve the tool.</li>
          </ul>
        </div>
      </section>

      {/* Transparency Initiative */}
      <section style={{ padding: "4rem 1.5rem 1rem", maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
        <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#1B365D", marginBottom: "1.5rem" }}>
          Thailand Immigration Transparency Initiative
        </h2>
        <div style={{ background: "#f8fafc", padding: "2.5rem", borderRadius: "16px", border: "1px solid #e2e8f0", textAlign: "left" }}>
          <p style={{ fontSize: "1.05rem", color: "#334155", marginBottom: "1rem", lineHeight: 1.7 }}>
            Tenee provides structured, source-based overviews of Thai immigration categories and related regulatory intersections.
          </p>
          <p style={{ fontSize: "1.05rem", color: "#334155", marginBottom: "1rem", lineHeight: 1.7, fontWeight: 600 }}>
            Our objective is transparency — not eligibility determination.
          </p>
          <p style={{ fontSize: "1.05rem", color: "#334155", marginBottom: "1.5rem", lineHeight: 1.7 }}>
            All immigration decisions are made exclusively by Thai authorities.<br />
            This platform summarizes publicly available structural information and links directly to official government sources.
          </p>
          <ul style={{ listStyleType: "none", padding: 0, margin: "0 0 2rem", color: "#475569", fontSize: "0.95rem" }}>
            <li style={{ paddingBottom: "0.5rem" }}>✓ Built for clarity.</li>
            <li style={{ paddingBottom: "0.5rem" }}>✓ Anchored in official publications.</li>
            <li style={{ paddingBottom: "0.5rem" }}>✓ Maintained with institutional discipline.</li>
          </ul>
          <Link
            href="/long-term-stay"
            style={{
              display: "inline-block",
              background: "#1B365D",
              color: "white",
              padding: "0.8rem 1.5rem",
              borderRadius: "8px",
              fontWeight: 600,
              textDecoration: "none",
              transition: "all 0.2s"
            }}
          >
            → View Long-Term Stay Overview
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: "3rem 1.5rem", maxWidth: "900px", margin: "0 auto" }}>
        <h2
          style={{
            textAlign: "center",
            fontSize: "1.6rem",
            fontWeight: 700,
            marginBottom: "2.5rem",
          }}
        >
          How It Works
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {[
            {
              step: "1",
              icon: "📝",
              title: "Fill Out the Wizard",
              desc: "Answer simple questions about your visa task — name, dates, office. Takes 2 minutes.",
            },
            {
              step: "2",
              icon: "📄",
              title: "Get Your Packet",
              desc: "Instantly generate a printable checklist + preparation packet PDF. Ready for the office.",
            },
            {
              step: "3",
              icon: "🤝",
              title: "Share & Help Others",
              desc: "Share the free tool with friends, family, or your expat community. Every packet includes a link back.",
            },
          ].map((item) => (
            <div key={item.step} className="glass-card" style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: "2.5rem",
                  marginBottom: "0.75rem",
                }}
              >
                {item.icon}
              </div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #f5c542, #f59e0b)",
                  color: "#0a0e1a",
                  fontWeight: 700,
                  fontSize: "0.8rem",
                  marginBottom: "0.75rem",
                }}
              >
                {item.step}
              </div>
              <h3
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  marginBottom: "0.5rem",
                }}
              >
                {item.title}
              </h3>
              <p style={{ color: "#94a3b8", fontSize: "0.95rem", lineHeight: 1.5 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Cards */}
      <section style={{ padding: "3rem 1.5rem 5rem", maxWidth: "900px", margin: "0 auto" }}>
        <h2
          style={{
            textAlign: "center",
            fontSize: "1.6rem",
            fontWeight: 700,
            marginBottom: "2.5rem",
          }}
        >
          What You Can Do
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {[
            {
              icon: "📋",
              title: "Preparation Packets",
              desc: "Checklist + packet assembly guide for Retirement, Extensions, 90-Day, TM30, and Re-entry permits.",
              color: "#f5c542",
            },
            {
              icon: "🇹🇭",
              title: "Write in Thai",
              desc: "Generate polite Thai letters for landlords, banks, juristic offices, insurance, and immigration inquiries.",
              color: "#2dd4bf",
            },
            {
              icon: "👨‍👩‍👧‍👦",
              title: "Caregiver Mode",
              desc: "Helping an elder with paperwork? Caregiver mode lets you create packets on their behalf.",
              color: "#8b5cf6",
            },
            {
              icon: "⚖️",
              title: "Legal Toolkit",
              desc: "Organize facts and evidence for disputes. Generate timelines and polite Thai templates for clarification or documents.",
              color: "#8b5cf6",
            },
            {
              icon: "🛫",
              title: "First-Time Entry Guide",
              desc: "High-level overview of Thailand entry requirements with official government links. Perfect for first-time visitors.",
              color: "#1B365D",
              href: "/entry-guide",
            },
            {
              icon: "🏠",
              title: "Long-Term Stay Overview",
              desc: "Structured overview of retirement, remote work, LTR, and investment stay categories with official sources.",
              color: "#1B365D",
              href: "/long-term-stay",
            },
            {
              icon: "🔒",
              title: "Privacy First",
              desc: "No data stored without an account. Passport numbers masked. Privacy mode hides dates on PDFs.",
              color: "#3b82f6",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="glass-card"
              style={{ borderLeft: `3px solid ${item.color}` }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{item.icon}</div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.5rem" }}>
                {item.title}
              </h3>
              <p style={{ color: "#94a3b8", fontSize: "0.95rem", lineHeight: 1.5 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section
        style={{
          padding: "3rem 1.5rem",
          textAlign: "center",
          background: "linear-gradient(135deg, rgba(245,197,66,0.05), rgba(245,158,11,0.08))",
          borderTop: "1px solid rgba(245,197,66,0.1)",
          borderBottom: "1px solid rgba(245,197,66,0.1)",
        }}
      >
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.75rem" }}>
          Ready to organize your paperwork?
        </h2>
        <p
          style={{
            color: "#94a3b8",
            marginBottom: "1.5rem",
            fontSize: "1rem",
          }}
        >
          No signup needed. Generate your first packet in under 60 seconds.
        </p>
        <Link href="/wizard" className="btn-primary" id="bottom-cta-packet">
          Start Now — It&apos;s Free
        </Link>
      </section>

      <div style={{ maxWidth: "900px", margin: "0 auto 4rem", padding: "0 1.5rem" }}>
        <FunFactCard />
      </div>
    </div>
  );
}
