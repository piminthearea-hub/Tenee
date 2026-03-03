"use client";

import { useState, useEffect } from "react";
import { getDailyItem, getRandomItem, ThailandCardItem, ThaiDish, ThaiSlang } from "@/lib/daily-rotation";

export default function ThailandCard() {
    const [item, setItem] = useState<ThailandCardItem | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        // Default to daily rotation item
        setItem(getDailyItem());
    }, []);

    const handleShowAnother = () => {
        setIsAnimating(true);
        // Brief delay for animation effect
        setTimeout(() => {
            setItem(getRandomItem());
            setIsAnimating(false);
        }, 300);
    };

    if (!item) return null;

    const isDish = item.type === "dish";
    const data = item.data;

    return (
        <div
            className={`glass-card animate-fade-in ${isAnimating ? 'opacity-50' : 'opacity-100'}`}
            style={{
                transition: 'opacity 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '2rem',
                borderRadius: '24px',
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
                backdropFilter: 'blur(8px)',
                margin: '2rem 0'
            }}
        >
            {/* Decorative Background Element */}
            <div
                style={{
                    position: 'absolute',
                    top: '-20px',
                    right: '-20px',
                    fontSize: '5rem',
                    opacity: 0.1,
                    transform: 'rotate(15deg)',
                    pointerEvents: 'none'
                }}
            >
                {isDish ? '🍲' : '🗣️'}
            </div>

            <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>Today&apos;s Thailand Card</h2>
                    <span
                        style={{
                            padding: '4px 12px',
                            borderRadius: '999px',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            background: isDish ? 'rgba(245, 197, 66, 0.1)' : 'rgba(45, 212, 191, 0.1)',
                            color: isDish ? '#f5c542' : '#2dd4bf',
                            border: `1px solid ${isDish ? 'rgba(245, 197, 66, 0.2)' : 'rgba(45, 212, 191, 0.2)'}`
                        }}
                    >
                        {isDish ? '✨ Try this dish' : '💬 Say this phrase'}
                    </span>
                </div>

                {isDish ? (
                    <FoodCardView data={data as ThaiDish} />
                ) : (
                    <SlangCardView data={data as ThaiSlang} />
                )}

                <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', marginTop: '1.5rem', paddingTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                        <p style={{ fontSize: '0.75rem', color: '#64748b', margin: 0 }}>
                            For learning only — verify details at the <a href={data.source_url} target="_blank" rel="noopener noreferrer" style={{ color: '#f5c542', textDecoration: 'underline' }}>source</a>.
                        </p>
                    </div>
                    <button
                        onClick={handleShowAnother}
                        className="btn-secondary"
                        style={{
                            padding: '8px 16px',
                            fontSize: '0.85rem',
                            minHeight: 'auto',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                        }}
                    >
                        🎲 Show another
                    </button>
                </div>
            </div>
        </div>
    );
}

function FoodCardView({ data }: { data: ThaiDish }) {
    return (
        <div className="animate-fade-in">
            <div style={{ marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 800, margin: '0 0 0.25rem 0' }}>{data.dish_en}</h3>
                <p style={{ fontSize: '1.1rem', color: '#94a3b8', fontStyle: 'italic', margin: 0 }}>{data.dish_th} • {data.pronunciation}</p>
            </div>

            <p style={{ fontSize: '1rem', lineHeight: 1.6, color: '#e2e8f0', marginBottom: '1.25rem' }}>
                {data.description_1to2_sentences}
            </p>

            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                <div>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>Heat Level</span>
                    <div style={{ fontSize: '1.1rem' }}>
                        {data.spice_level_0to3 === 0 ? 'Mild 🥬' : Array(data.spice_level_0to3).fill('🌶️').join('')}
                    </div>
                </div>
                <div>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>Allergy Note</span>
                    <p style={{ fontSize: '0.9rem', color: '#f87171', margin: 0, fontWeight: 500 }}>{data.allergy_note_short}</p>
                </div>
            </div>
        </div>
    );
}

function SlangCardView({ data }: { data: ThaiSlang }) {
    return (
        <div className="animate-fade-in">
            <div style={{ marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 800, margin: '0 0 0.25rem 0', fontFamily: "'Noto Sans Thai', sans-serif" }}>{data.phrase_th}</h3>
                <p style={{ fontSize: '1.1rem', color: '#94a3b8', fontStyle: 'italic', margin: 0 }}>{data.pronunciation}</p>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>Meaning</span>
                <p style={{ fontSize: '1.1rem', fontWeight: 600, color: '#2dd4bf', margin: 0 }}>&ldquo;{data.meaning_en}&rdquo;</p>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>When to use</span>
                <p style={{ fontSize: '0.95rem', lineHeight: 1.5, color: '#e2e8f0', margin: 0 }}>{data.when_to_use_1_sentence}</p>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                <div>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>Formality</span>
                    <span
                        style={{
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            padding: '2px 8px',
                            borderRadius: '6px',
                            background: 'rgba(255, 255, 255, 0.05)',
                            color: '#94a3b8',
                            border: '1px solid rgba(255, 255, 255, 0.1)'
                        }}
                    >
                        {data.formality.charAt(0).toUpperCase() + data.formality.slice(1)}
                    </span>
                </div>
                {data.polite_alternative_optional && (
                    <div>
                        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>Polite Alternative</span>
                        <p style={{ fontSize: '0.9rem', color: '#f5c542', margin: 0, fontWeight: 500, fontFamily: "'Noto Sans Thai', sans-serif" }}>{data.polite_alternative_optional}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
