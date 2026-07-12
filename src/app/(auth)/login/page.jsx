// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { authClient } from "@/lib/auth-client";

// export default function LoginPage() {
//     const router = useRouter();
//     const [form, setForm] = useState({ email: "", password: "" });
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");

//     function handleChange(e) {
//         setForm({ ...form, [e.target.name]: e.target.value });
//     }

//     async function handleSubmit(e) {
//         e.preventDefault();
//         setError("");
//         setLoading(true);

//         const { data, error } = await authClient.signIn.email({
//             email: form.email,
//             password: form.password,
//         });

//         setLoading(false);

//         if (error) {
//             setError(error.message || "Invalid email or password.");
//             return;
//         }

//         router.push("/");
//     }

//     return (
//         <main className="flex flex-1 items-center justify-center px-6 py-16">
//             <div className="w-full max-w-md rounded-2xl border border-base-300 bg-base-200 p-8">
//                 <h1 className="text-2xl font-semibold text-base-content">
//                     Welcome back
//                 </h1>
//                 <p className="mt-2 text-sm text-neutral-content">
//                     Log in to continue supporting or managing campaigns.
//                 </p>

//                 <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
//                     <div className="form-control">
//                         <label className="label">
//                             <span className="label-text">Email</span>
//                         </label>
//                         <input
//                             type="email"
//                             name="email"
//                             value={form.email}
//                             onChange={handleChange}
//                             placeholder="you@example.com"
//                             className="input input-bordered w-full"
//                             required
//                         />
//                     </div>

//                     <div className="form-control">
//                         <label className="label">
//                             <span className="label-text">Password</span>
//                         </label>
//                         <input
//                             type="password"
//                             name="password"
//                             value={form.password}
//                             onChange={handleChange}
//                             placeholder="Your password"
//                             className="input input-bordered w-full"
//                             required
//                         />
//                     </div>

//                     {error && (
//                         <p className="text-sm text-error">{error}</p>
//                     )}

//                     <button
//                         type="submit"
//                         disabled={loading}
//                         className="btn btn-primary mt-2 rounded-full"
//                     >
//                         {loading ? "Logging in..." : "Log in"}
//                     </button>
//                 </form>

//                 <p className="mt-6 text-center text-sm text-neutral-content">
//                     {"Don't"} have an account?{" "}
//                     <a href="/register" className="text-primary font-medium">
//                         Register
//                     </a>
//                 </p>
//             </div>
//         </main>
//     );
// }