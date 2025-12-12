import { useTheme } from "@/context/ThemeContext";

export default function ThemeToggle() {

    //Usar el hook del Contexto
    const { theme, toggleTheme } = useTheme();

    // El componente usa el valor 'theme' del estado global para determinar la etiqueta
    const label = theme === "light" ? "🌞 Light" : "🌙 Dark";

    return (
        <button
            // La función toggleTheme del contexto se ejecuta al hacer click
            onClick={toggleTheme}
            className="px-3 py-1 rounded-md border border-slate-400 bg-white text-xs flex items-center gap-2 dark:bg-slate-800 dark:border-slate-500"
        >
            <span>{label}</span>
        </button>
    );
}
