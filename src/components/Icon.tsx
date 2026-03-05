import React from 'react';
import {
    CheckIcon,
    XMarkIcon,
    ClipboardDocumentIcon,
    ChatBubbleLeftEllipsisIcon,
    DocumentIcon,
    ArrowRightIcon,
    HomeIcon,
    BuildingOfficeIcon,
    CalendarIcon,
    ExclamationTriangleIcon, ClockIcon, QuestionMarkCircleIcon, LockClosedIcon,
    UserIcon, UsersIcon, ExclamationCircleIcon, UserGroupIcon, GlobeAltIcon, ScaleIcon, PaperAirplaneIcon, PencilSquareIcon,
    SunIcon, DocumentTextIcon, BuildingLibraryIcon, BanknotesIcon, PlusCircleIcon, InformationCircleIcon, LightBulbIcon,
    ShieldCheckIcon, TrashIcon, SparklesIcon, FaceSmileIcon, HandThumbUpIcon
} from '@heroicons/react/24/outline';

/**
 * Simple wrapper that maps a `name` prop to a Heroicon component.
 * Add more mappings as needed.
 */
export default function Icon({ name, className = '', ariaLabel }: { name: string; className?: string; ariaLabel?: string }) {
    const icons: Record<string, React.ReactNode> = {
        check: <CheckIcon className={`h-5 w-5 ${className}`} aria-hidden="true" />, // ✅
        x: <XMarkIcon className={`h-5 w-5 ${className}`} aria-hidden="true" />, // ❌
        clipboard: <ClipboardDocumentIcon className={`h-5 w-5 ${className}`} aria-hidden="true" />, // 📋
        chat: <ChatBubbleLeftEllipsisIcon className={`h-5 w-5 ${className}`} aria-hidden="true" />, // 💬
        document: <DocumentIcon className={`h-5 w-5 ${className}`} aria-hidden="true" />, // 📄
        arrow: <ArrowRightIcon className={`h-5 w-5 ${className}`} aria-hidden="true" />, // ➡️
        exclamation: <ExclamationTriangleIcon className={`h-5 w-5 ${className}`} aria-hidden="true" />, // 🚨
        lock: <LockClosedIcon className={`h-5 w-5 ${className}`} aria-hidden="true" />, // 🔒
        clock: <ClockIcon className={`h-5 w-5 ${className}`} aria-hidden="true" />, // ⏰
        question: <QuestionMarkCircleIcon className={`h-5 w-5 ${className}`} aria-hidden="true" />, // 🤔
        user: <UserIcon className={`h-5 w-5 ${className}`} aria-hidden="true" />, // 🙋
        users: <UsersIcon className={`h-5 w-5 ${className}`} aria-hidden="true" />, // 🤝
        warning: <ExclamationCircleIcon className={`h-5 w-5 ${className}`} aria-hidden="true" />, // ⚠️
        home: <HomeIcon className={`h-5 w-5 ${className}`} aria-hidden="true" />, // 🏠
        office: <BuildingOfficeIcon className={`h-5 w-5 ${className}`} aria-hidden="true" />, // 🏢
        calendar: <CalendarIcon className={`h-5 w-5 ${className}`} aria-hidden="true" />, // 📅
        userGroup: <UserGroupIcon className={`h-5 w-5 ${className}`} aria-hidden="true" />, // 👨‍👩‍👧‍👦
        globe: <GlobeAltIcon className={`h-5 w-5 ${className}`} aria-hidden="true" />, // 🇹🇭
        scale: <ScaleIcon className={`h-5 w-5 ${className}`} aria-hidden="true" />, // ⚖️
        plane: <PaperAirplaneIcon className={`h-5 w-5 ${className}`} aria-hidden="true" />, // 🛫
        pencil: <PencilSquareIcon className={`h-5 w-5 ${className}`} aria-hidden="true" />, // 📝
        sun: <SunIcon className={`h-5 w-5 ${className}`} aria-hidden="true" />, // 🏖️
        documentReport: <DocumentTextIcon className={`h-5 w-5 ${className}`} aria-hidden="true" />, // 📑
        library: <BuildingLibraryIcon className={`h-5 w-5 ${className}`} aria-hidden="true" />, // 🏦
        cash: <BanknotesIcon className={`h-5 w-5 ${className}`} aria-hidden="true" />, // 💰
        plusCircle: <PlusCircleIcon className={`h-5 w-5 ${className}`} aria-hidden="true" />, // ➕
        info: <InformationCircleIcon className={`h-5 w-5 ${className}`} aria-hidden="true" />, // ℹ️
        lightBulb: <LightBulbIcon className={`h-5 w-5 ${className}`} aria-hidden="true" />, // 💡
        shieldCheck: <ShieldCheckIcon className={`h-5 w-5 ${className}`} aria-hidden="true" />, // 🛡️
        trash: <TrashIcon className={`h-5 w-5 ${className}`} aria-hidden="true" />, // 🗑️
        sparkles: <SparklesIcon className={`h-5 w-5 ${className}`} aria-hidden="true" />, // ✨
        happy: <FaceSmileIcon className={`h-5 w-5 ${className}`} aria-hidden="true" />, // 🙂
        thumbUp: <HandThumbUpIcon className={`h-5 w-5 ${className}`} aria-hidden="true" />, // 🙏
    };

    const IconComponent = icons[name] ?? null;
    return IconComponent ? (
        <span aria-label={ariaLabel ?? name} role="img" className="inline-flex">
            {IconComponent}
        </span>
    ) : null;
}
