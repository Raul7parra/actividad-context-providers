import React, {useState, useEffect} from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";



export default function LoginPage() {
        
    const { user, login } = useAuth();

    const { t } = useLanguage();
    
    const [name, setName] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;
        
        login(name.trim()); 
    };

    if (user) {
        return <Navigate to="/" replace />;
    }

    return (
        <section className="max-w-md bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 space-y-4">
            <div>
                <h2 className="text-xl font-semibold">{t("loginTitle")}</h2>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                    {t("loginDescription")}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                    type="text"
                    placeholder={t("namePlaceholder")}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="px-3 py-2 rounded-md border border-slate-300 bg-white text-sm dark:bg-slate-900 dark:border-slate-600"
                />

                <button
                    type="submit"
                    disabled={!name.trim()}
                    className="px-4 py-2 rounded-md bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 disabled:opacity-50"
                >
                    {t("loginButton")}
                </button>
            </form>

            <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {("loginDisclaimer")}
            </p>
        </section>
    );
}