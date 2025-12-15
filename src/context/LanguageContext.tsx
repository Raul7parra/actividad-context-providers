import { createContext, useContext, useEffect, useState, useCallback } from "react";
import es from "../locales/es.json";
import en from "../locales/en.json";
const translations = { es, en } as const;


export type Language = "es" | "en";

type TranslationKeys = keyof typeof es;


//Tipo de los datos que va a compartir el contexto, se pone lo que quieras compartir
type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKeys) => string; //Esta función la vamos a utilizar para traducir los textos
};

const LANGUAGE_KEY = "app-lang";

//Crear el contexto (arranca como undefined para poder validar)
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

//Tipo de las props del Provider (normalmente solo children)
type LanguageProviderProps = {
  children: React.ReactNode;
};

//Componente Provider: guarda el estado y pasa el value al contexto (AQUI TENEMOS QUE METER EL USESTATE, USEEFFECT)
export function LanguageProvider({ children }: LanguageProviderProps) {    
    const currentLang = window.localStorage.getItem(LANGUAGE_KEY);
    const storedLang: Language = (currentLang === 'es' || currentLang === 'en') ? currentLang : 'es';

    const [language, setLanguage] = useState<Language>(storedLang);

    // Creamos la función pública para cambiar el idioma
    const handleSetLanguage = useCallback((lang: Language) => {
        setLanguage(lang);
    }, []);
    
    const t = useCallback((key: TranslationKeys): string => {
        return translations[language][key];
    }, [language]);

    useEffect(() => {
        window.localStorage.setItem(LANGUAGE_KEY, language);
    }, [language]);

    const value: LanguageContextType = {
        language,
        setLanguage: handleSetLanguage,
        t,
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}

// Custom hook para usar el contexto más cómodo (se crea un propio HOOK)
export function useLanguage() {
    const ctx = useContext(LanguageContext);
    if (!ctx) {
        throw new Error("useLanguage debe usarse dentro de un LanguageProvider");
    }
    return ctx;
}