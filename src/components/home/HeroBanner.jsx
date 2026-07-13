export default function HeroBanner() {
    return (
        <svg
            viewBox="0 0 680 340"
            className="w-full h-auto"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <linearGradient id="bgGradDark" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#0B0F2E" />
                    <stop offset="55%" stopColor="#141B3C" />
                    <stop offset="100%" stopColor="#1C1440" />
                </linearGradient>
                <linearGradient id="glassPanelDark" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1C1440" stopOpacity="0.92" />
                    <stop offset="100%" stopColor="#141B3C" stopOpacity="0.88" />
                </linearGradient>
                <linearGradient id="neonTeal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#5CFFE0" />
                    <stop offset="100%" stopColor="#12C9A0" />
                </linearGradient>
                <linearGradient id="neonPink" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FF7BD6" />
                    <stop offset="100%" stopColor="#E23FA8" />
                </linearGradient>
                <linearGradient id="neonAmber" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FFD35C" />
                    <stop offset="100%" stopColor="#FFA523" />
                </linearGradient>
                <linearGradient id="neonBlue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6FB8FF" />
                    <stop offset="100%" stopColor="#2E7BFF" />
                </linearGradient>
                <radialGradient id="softGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#5CFFE0" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#5CFFE0" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="softGlowPink" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FF7BD6" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#FF7BD6" stopOpacity="0" />
                </radialGradient>
            </defs>

            <rect x="0" y="0" width="680" height="340" rx="24" fill="url(#bgGradDark)" />

            <circle cx="580" cy="70" r="150" fill="url(#softGlow)" />
            <circle cx="100" cy="290" r="160" fill="url(#softGlowPink)" />

            <circle cx="330" cy="24" r="2.5" fill="#5CFFE0" />
            <circle cx="470" cy="18" r="2" fill="#FF7BD6" />
            <circle cx="160" cy="30" r="2" fill="#FFD35C" />
            <circle cx="610" cy="180" r="2.5" fill="#5CFFE0" />
            <circle cx="20" cy="150" r="2" fill="#FF7BD6" />

            {/* Growth bars */}
            <g>
                <rect x="330" y="230" width="52" height="70" rx="10" fill="url(#neonBlue)" />
                <rect x="395" y="185" width="52" height="115" rx="10" fill="url(#neonTeal)" />
                <rect x="460" y="140" width="52" height="160" rx="10" fill="url(#neonAmber)" />
                <rect x="525" y="90" width="52" height="210" rx="10" fill="url(#neonTeal)" />
                <rect x="590" y="55" width="52" height="245" rx="10" fill="url(#neonPink)" />
            </g>

            {/* Credit rate glass card */}
            <rect x="60" y="60" width="220" height="66" rx="16" fill="url(#glassPanelDark)" stroke="#FFD35C" strokeOpacity="0.4" strokeWidth="1" />
            <circle cx="88" cy="93" r="15" fill="url(#neonAmber)" />
            <text x="88" y="98" fontSize="13" fontWeight="600" fill="#4A2E00" textAnchor="middle">$</text>
            <text x="112" y="88" fontSize="13" fontWeight="500" fill="#F4F4FA">10 credits = $1</text>
            <text x="112" y="105" fontSize="11" fill="#B9BEDC">purchase rate</text>

            {/* Floating coins */}
            <g>
                <circle cx="300" cy="130" r="16" fill="url(#neonPink)" stroke="#FF7BD6" strokeOpacity="0.5" strokeWidth="1" />
                <circle cx="335" cy="105" r="12" fill="url(#neonAmber)" stroke="#FFD35C" strokeOpacity="0.5" strokeWidth="1" />
                <circle cx="355" cy="150" r="10" fill="url(#neonTeal)" stroke="#5CFFE0" strokeOpacity="0.5" strokeWidth="1" />
            </g>

            {/* Stats glass card */}
            <rect x="60" y="220" width="230" height="80" rx="16" fill="url(#glassPanelDark)" stroke="#FF7BD6" strokeOpacity="0.35" strokeWidth="1" />
            <text x="84" y="252" fontSize="19" fontWeight="600" fill="#F4F4FA">12,480+</text>
            <text x="84" y="272" fontSize="12" fill="#B9BEDC">supporters funding dreams</text>
            <text x="84" y="289" fontSize="12" fill="#B9BEDC">every day</text>
        </svg>
    );
}