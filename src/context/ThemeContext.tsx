import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark"

//Tipo de los datos que va a compartir el contexto, se pone lo que quieras compartir
type ThemeContextType = {
    theme: Theme;
    toggleTheme: ()=>void;
}

const THEME_KEY = "app-theme";

//Crear el contexto (arranca como undefined para poder validar)
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

//Tipo de las props del Provider (normalmente solo children)
type ThemeProviderProps = {
    children: React.ReactNode;
}

//Componente Provider: guarda el estado y pasa el value al contexto (AQUI TENEMOS QUE METER EL USESTATE, USEEFFECT)
export default function ThemeProvider({children}:ThemeProviderProps){
    const currentTheme = window.localStorage.getItem(THEME_KEY);
    const storedTheme = currentTheme === 'dark' ? 'dark' : 'light';

    const [theme, setTheme] = useState<Theme>(storedTheme);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    useEffect(() => {
        const root = document.documentElement;
        if (theme === 'dark'){
            root.classList.add('dark');
        }else{
            root.classList.remove('dark');
        }
        window.localStorage.setItem(THEME_KEY, theme);
    }, [theme]);

    const value:ThemeContextType = {theme, toggleTheme}

    return <ThemeContext.Provider value={value}>
        {children}
    </ThemeContext.Provider>
}

// Custom hook para usar el contexto más cómodo (se crea un propio HOOK)
export function useTheme(){
    const ctx = useContext(ThemeContext);
    if(!ctx){
        throw new Error("useTheme debe usarse dentro de un ThemeProvider");
    }
    return ctx;
}