"use client";

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from "react";

export type TaskType =
    | "retirement"
    | "visa_extension"
    | "ninety_day"
    | "tm30"
    | "reentry";

export type FinancialProofType =
    | "deposit"
    | "monthly_income"
    | "combination"
    | "not_sure";

export type WizardMode = "self" | "caregiver";

export type HotelStay = "yes" | "no" | "not_sure" | null;

export interface WizardState {
    currentStep: number;
    mode: WizardMode | null;
    caregiverConsent: boolean;
    taskType: TaskType | null;
    financialProofType: FinancialProofType | null;
    fullName: string;
    nationality: string;
    dateOfBirth: string;
    dobPrivacy: boolean;
    passportNumber: string;
    currentAddress: string;
    officeCity: string;
    lastEntryDate: string;
    lastEntryNotSure: boolean;
    expiryDate: string;
    expiryNotSure: boolean;
    privacyMode: boolean;
    legalDisclaimer: boolean;
    recentHotelStay: HotelStay;
    ninetyDayDueDate: string;
}

const initialState: WizardState = {
    currentStep: 1,
    mode: null,
    caregiverConsent: false,
    taskType: null,
    financialProofType: null,
    fullName: "",
    nationality: "",
    dateOfBirth: "",
    dobPrivacy: true,
    passportNumber: "",
    currentAddress: "",
    officeCity: "",
    lastEntryDate: "",
    lastEntryNotSure: false,
    expiryDate: "",
    expiryNotSure: false,
    privacyMode: true,
    legalDisclaimer: false,
    recentHotelStay: null,
    ninetyDayDueDate: "",
};

type Action =
    | { type: "SET_FIELD"; field: keyof WizardState; value: unknown }
    | { type: "SET_STEP"; step: number }
    | { type: "RESET" }
    | { type: "LOAD"; state: WizardState };

function wizardReducer(state: WizardState, action: Action): WizardState {
    switch (action.type) {
        case "SET_FIELD":
            return { ...state, [action.field]: action.value };
        case "SET_STEP":
            return { ...state, currentStep: action.step };
        case "RESET":
            return { ...initialState };
        case "LOAD":
            return { ...action.state };
        default:
            return state;
    }
}

interface WizardContextType {
    state: WizardState;
    setField: (field: keyof WizardState, value: unknown) => void;
    setStep: (step: number) => void;
    nextStep: () => void;
    prevStep: () => void;
    reset: () => void;
}

const WizardContext = createContext<WizardContextType | null>(null);

const STORAGE_KEY = "tenee_wizard_state";

function getInitialState(): WizardState {
    if (typeof window === "undefined") return initialState;
    try {
        const saved = sessionStorage.getItem(STORAGE_KEY);
        if (saved) {
            return { ...initialState, ...JSON.parse(saved) };
        }
    } catch {
        // Ignore parse errors
    }
    return initialState;
}

export function WizardProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(wizardReducer, undefined, getInitialState);

    // Auto-save to sessionStorage on every change
    useEffect(() => {
        try {
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch {
            // Ignore storage errors
        }
    }, [state]);

    const setField = (field: keyof WizardState, value: unknown) => {
        dispatch({ type: "SET_FIELD", field, value });
    };

    const setStep = (step: number) => {
        dispatch({ type: "SET_STEP", step });
    };

    const nextStep = () => {
        dispatch({ type: "SET_STEP", step: Math.min(state.currentStep + 1, 5) });
    };

    const prevStep = () => {
        dispatch({ type: "SET_STEP", step: Math.max(state.currentStep - 1, 1) });
    };

    const reset = () => {
        sessionStorage.removeItem(STORAGE_KEY);
        dispatch({ type: "RESET" });
    };

    return (
        <WizardContext.Provider value={{ state, setField, setStep, nextStep, prevStep, reset }}>
            {children}
        </WizardContext.Provider>
    );
}

export function useWizard() {
    const ctx = useContext(WizardContext);
    if (!ctx) throw new Error("useWizard must be used within WizardProvider");
    return ctx;
}

export function maskPassport(passport: string): string {
    if (!passport || passport.length < 4) return passport ? "****" : "";
    return "****" + passport.slice(-4);
}

export const TASK_LABELS: Record<TaskType, string> = {
    retirement: "Retirement Stay (Age 50+)",
    visa_extension: "Visa Extension (General)",
    ninety_day: "90-Day Reporting",
    tm30: "TM30 Proof (Checklist)",
    reentry: "Re-entry Permit",
};

/** Days until a date string, negative = past, NaN = invalid */
export function daysUntil(dateStr: string): number {
    if (!dateStr) return NaN;
    const target = new Date(dateStr + "T00:00:00");
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}
