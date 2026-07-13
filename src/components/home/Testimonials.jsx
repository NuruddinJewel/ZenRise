// import { Star } from "lucide-react";

// const TESTIMONIALS = [
//     {
//         name: "Charlotte Elizabeth",
//         role: "Supporter",
//         quote:
//             "I found a clean water campaign through FundRise and watched it reach its goal in weeks. Seeing real updates from the creator made it feel personal.",
//         initials: "CE",
//         accent: "primary",
//     },
//     {
//         name: "Noah Michael",
//         role: "Creator, EduSpark",
//         quote:
//             "Launching our campaign was simple, and the credit system made it easy for supporters to contribute small amounts. We hit our funding goal in a month.",
//         initials: "NM",
//         accent: "secondary",
//     },
//     {
//         name: "Olivia Sophia",
//         role: "Supporter",
//         quote:
//             "I love how transparent everything is — I can track exactly where my contributions go and follow the campaign's progress in real time.",
//         initials: "OS",
//         accent: "accent",
//     },
// ];

// const ACCENT_BG = {
//     primary: "bg-primary text-primary-content",
//     secondary: "bg-secondary text-secondary-content",
//     accent: "bg-accent text-accent-content",
// };

// export default function Testimonials() {
//     return (
//         <section className="mx-auto w-full max-w-7xl px-6 py-20">
//             <div className="text-center">
//                 <span className="badge badge-outline badge-secondary mb-3">
//                     Community Voices
//                 </span>
//                 <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
//                     Loved by Supporters and Creators
//                 </h2>
//                 <p className="mt-3 text-base text-neutral-content">
//                     Real stories from people {"who've"} funded and been funded on FundRise.
//                 </p>
//             </div>

//             <div className="mt-14 grid gap-6 md:grid-cols-3">
//                 {TESTIMONIALS.map((t) => (
//                     <div
//                         key={t.name}
//                         className="flex flex-col rounded-2xl border border-base-300 bg-base-200 p-7"
//                     >
//                         <div className="flex gap-1 text-accent">
//                             {Array.from({ length: 5 }).map((_, i) => (
//                                 <Star key={i} size={15} fill="currentColor" strokeWidth={0} />
//                             ))}
//                         </div>

//                         <p className="mt-4 flex-1 text-sm leading-relaxed text-neutral-content">
//                             {`"${t.quote}"`}
//                         </p>

//                         <div className="mt-6 flex items-center gap-3 border-t border-base-300 pt-5">
//                             <span
//                                 className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${ACCENT_BG[t.accent]}`}
//                             >
//                                 {t.initials}
//                             </span>
//                             <div>
//                                 <p className="text-sm font-medium text-base-content">
//                                     {t.name}
//                                 </p>
//                                 <p className="text-xs text-neutral-content">{t.role}</p>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </section>
//     );
// }