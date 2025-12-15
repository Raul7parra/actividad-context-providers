import { createContext, useContext, useEffect, useState, useCallback } from "react";
import React from "react";

type User = {
    name: string;
};

//Tipo de los datos que va a compartir el contexto, se pone lo que quieras compartir
type AuthContextType = {
    user: User | null;
    login: (name: string) => void;
    logout: () => void;
}

const AUTH_KEY = "app-user";

//Crear el contexto (arranca como undefined para poder validar)
const AuthContext = createContext<AuthContextType | undefined>(undefined);

//Tipo de las props del Provider (normalmente solo children)
type AuthProviderProps = {
    children: React.ReactNode;
}

//Componente Provider: guarda el estado y pasa el value al contexto (AQUI TENEMOS QUE METER EL USESTATE, USEEFFECT)
export function AuthProvider ({children}: AuthProviderProps){
    const [user, setUser] = useState<User | null> (() => {
        const storedUser = window.localStorage.getItem(AUTH_KEY);

        if (!storedUser){
            return null
        }

        try{
            return JSON.parse(storedUser) as User;
        } catch (error){
            console.log("Error al parsear al usuario");
            window.localStorage.removeItem(AUTH_KEY);
            return null;
        }
    })

    const login = useCallback((name: string) => {
        const newUser: User = { name };
        setUser(newUser);
    }, []);

    const logout = useCallback(() => {
        setUser(null);
    }, []);

    useEffect(() => {
        if (user) {
            window.localStorage.setItem(AUTH_KEY, JSON.stringify(user)); // Guarda al usuario si el usuario ya existe
        } else {
            window.localStorage.removeItem(AUTH_KEY); //Elimina al usuario si es null al hacer el logout
        }
    }, [user]);

    const value: AuthContextType = { user, login, logout };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );

}

// Custom hook para usar el contexto más cómodo (se crea un propio HOOK)
export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth debe usarse dentro de un AuthProvider");
    }
    return ctx;
}