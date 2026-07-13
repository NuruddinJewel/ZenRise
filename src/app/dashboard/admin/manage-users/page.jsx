"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Users, Loader2 } from "lucide-react";

const ROLES = ["supporter", "creator", "admin"];

export default function ManageUsersPage() {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState(null);

    async function fetchUsers() {
        try {
            const res = await fetch(`${backendUrl}/api/users`, { credentials: "include" });
            const data = await res.json();
            if (data.success) setUsers(data.data);
        } catch (err) {
            console.error("Error fetching users:", err);
            toast.error("Failed to load users.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    async function handleRoleChange(id, newRole) {
        setUpdatingId(id);
        try {
            const res = await fetch(`${backendUrl}/api/users/${id}/role`, {
                method: "PATCH",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ role: newRole }),
            });

            const data = await res.json();
            if (!res.ok || !data.success) throw new Error(data.message);

            toast.success("Role updated!");
            setUsers((prev) => prev.map((u) => (u._id === id ? { ...u, role: newRole } : u)));
        } catch (err) {
            toast.error(err.message || "Failed to update role.");
        } finally {
            setUpdatingId(null);
        }
    }

    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <main className="mx-auto w-full max-w-5xl px-6 py-12">
            <h1 className="flex items-center gap-2 text-2xl font-semibold text-base-content">
                <Users className="text-primary" size={26} />
                Manage Users
            </h1>
            <p className="mt-1 text-sm text-neutral-content">
                View all platform users and update their roles.
            </p>

            <div className="mt-8 overflow-x-auto rounded-2xl border border-base-300">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Credits</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u) => (
                            <tr key={u._id}>
                                <td className="text-base-content">{u.name}</td>
                                <td className="text-neutral-content">{u.email}</td>
                                <td className="text-neutral-content">{u.credits ?? 0}</td>
                                <td>
                                    <select
                                        value={u.role}
                                        onChange={(e) => handleRoleChange(u._id, e.target.value)}
                                        disabled={updatingId === u._id}
                                        className="select select-bordered select-sm"
                                    >
                                        {ROLES.map((r) => (
                                            <option key={r} value={r}>
                                                {r}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}