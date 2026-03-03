"use client";

import { useWizard, maskPassport } from "@/lib/wizard-context";

export default function StepPersonalDetails() {
    const { state, setField, nextStep, prevStep } = useWizard();

    const canProceed = state.fullName.trim().length > 0 && state.nationality.trim().length > 0;

    return (
        <div className="animate-fade-in">
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.5rem" }}>
                {state.mode === "caregiver" ? "Applicant Details" : "Your Details"}
            </h2>
            <p style={{ color: "#94a3b8", marginBottom: "2rem", fontSize: "1rem" }}>
                Enter the basic information for the preparation packet.
            </p>

            <div style={{ display: "grid", gap: "1.25rem", marginBottom: "2rem" }}>
                {/* Full Name */}
                <div>
                    <label className="label" htmlFor="fullName">
                        Full Name (as on passport) <span style={{ color: "#f43f5e" }}>*</span>
                    </label>
                    <input
                        id="fullName"
                        type="text"
                        className="input-field"
                        placeholder="e.g. JOHN SMITH"
                        value={state.fullName}
                        onChange={(e) => setField("fullName", e.target.value)}
                        autoComplete="name"
                    />
                </div>

                {/* Nationality */}
                <div>
                    <label className="label" htmlFor="nationality">
                        Nationality <span style={{ color: "#f43f5e" }}>*</span>
                    </label>
                    <input
                        id="nationality"
                        type="text"
                        className="input-field"
                        placeholder="e.g. American, British, Australian"
                        value={state.nationality}
                        onChange={(e) => setField("nationality", e.target.value)}
                    />
                </div>

                {/* Date of Birth */}
                <div>
                    <label className="label" htmlFor="dateOfBirth">
                        Date of Birth{" "}
                        <span style={{ color: "#64748b", fontWeight: 400 }}>(optional)</span>
                    </label>
                    <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                        <input
                            id="dateOfBirth"
                            type="date"
                            className="input-field"
                            value={state.dateOfBirth}
                            onChange={(e) => setField("dateOfBirth", e.target.value)}
                            style={{ flex: 1 }}
                        />
                        <label
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                color: "#94a3b8",
                                fontSize: "0.85rem",
                                whiteSpace: "nowrap",
                                cursor: "pointer",
                            }}
                        >
                            <input
                                type="checkbox"
                                checked={state.dobPrivacy}
                                onChange={(e) => setField("dobPrivacy", e.target.checked)}
                                style={{ width: "18px", height: "18px", accentColor: "#f5c542" }}
                            />
                            Hide on PDF
                        </label>
                    </div>
                </div>

                {/* Passport Number */}
                <div>
                    <label className="label" htmlFor="passportNumber">
                        Passport Number (Last 4 digits, optional)
                    </label>
                    <div style={{ position: "relative" }}>
                        <input
                            id="passportNumber"
                            type="text"
                            className="input-field"
                            placeholder="e.g. 1234"
                            maxLength={4}
                            value={state.passportNumber}
                            onChange={(e) => {
                                const val = e.target.value.replace(/[^a-zA-Z0-9]/g, '').slice(0, 4);
                                setField("passportNumber", val);
                            }}
                            autoComplete="off"
                        />
                    </div>
                    <p style={{ color: "#64748b", fontSize: "0.75rem", marginTop: "0.25rem" }}>
                        🔒 Only the last 4 digits are used for identification on PDFs.
                    </p>
                </div>

                {/* Current Address */}
                <div>
                    <label className="label" htmlFor="currentAddress">
                        Current Address in Thailand
                    </label>
                    <textarea
                        id="currentAddress"
                        className="input-field"
                        placeholder="e.g. 123 Sukhumvit Soi 42, Phra Khanong, Bangkok 10110"
                        value={state.currentAddress}
                        onChange={(e) => setField("currentAddress", e.target.value)}
                        rows={2}
                        style={{ resize: "vertical", minHeight: "70px" }}
                    />
                </div>

                {/* Immigration Office / City */}
                <div>
                    <label className="label" htmlFor="officeCity">
                        Immigration Office / City
                    </label>
                    <input
                        id="officeCity"
                        type="text"
                        className="input-field"
                        placeholder="e.g. Chaeng Wattana (Bangkok), Chiang Mai, Pattaya"
                        value={state.officeCity}
                        onChange={(e) => setField("officeCity", e.target.value)}
                    />
                </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}>
                <button className="btn-ghost" onClick={prevStep} id="step3-back">
                    ← Back
                </button>
                <button
                    className="btn-primary"
                    onClick={nextStep}
                    disabled={!canProceed}
                    id="step3-next"
                >
                    Continue →
                </button>
            </div>
        </div>
    );
}
