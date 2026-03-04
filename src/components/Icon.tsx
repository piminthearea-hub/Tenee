import React from 'react';
import {
    CheckIcon,
    XIcon,
    ClipboardIcon,
    ChatAlt2Icon,
    DocumentIcon,
    ArrowRightIcon,
    HomeIcon,
    OfficeBuildingIcon,
    CalendarIcon,
    ExclamationIcon, ClockIcon, QuestionMarkCircleIcon, LockClosedIcon,
} from '@heroicons/react/outline';

/**
 * Simple wrapper that maps a `name` prop to a Heroicon component.
 * Add more mappings as needed.
 */
export default function Icon({ name, className = '', ariaLabel }: { name: string; className?: string; ariaLabel?: string }) {
    const icons: Record<string, React.ReactNode> = {
        check: <CheckIcon className={`h-5 w-5 ${className}`} aria-hidden="true" />, // ✅
        x: <XIcon className={`h-5 w-5 ${className}`} aria-hidden="true" />, // ❌
        clipboard: <ClipboardIcon className={`h-5 w-5 ${className}`} aria-hidden="true" />, // 📋
        chat: <ChatAlt2Icon className={`h-5 w-5 ${className}`} aria-hidden="true" />, // 💬
        document: <DocumentIcon className={`h-5 w-5 ${className}`} aria-hidden="true" />, // 📄
        arrow: <ArrowRightIcon className={`h-5 w-5 ${className}`} aria-hidden="true" />, // ➡️
        exclamation: <ExclamationIcon className={`h-5 w-5 ${className}`} aria-hidden="true" />, // 🚨
        lock: <LockClosedIcon className={`h-5 w-5 ${className}`} aria-hidden="true" />, // 🔒
        clock: <ClockIcon className={`h-5 w-5 ${className}`} aria-hidden="true" />, // ⏰
        question: <QuestionMarkCircleIcon className={`h-5 w-5 ${className}`} aria-hidden="true" />, // 🤔
    };

    const IconComponent = icons[name] ?? null;
    return IconComponent ? (
        <span aria-label={ariaLabel ?? name} role="img">
            {IconComponent}
        </span>
    ) : null;
}
