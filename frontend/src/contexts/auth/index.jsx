import { createContext, useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode'
import { 
    login,
    logout,
    isTokenExpired,
    storeTokenLocalStorage, 
    getTokenLocalStorage, 
    destroyTokenLocalStorage,
    destroyUserLocalStorage,
    storeUserLocalStorage, 
} from "./utils";

export const authContext = createContext();

export function AuthProvider({ children })
{
    const [user, setUser] = useState(null);

    useEffect(() => {
        const tokenStored = getTokenLocalStorage();

        if(tokenStored && !isTokenExpired(tokenStored)){
            const decodedToken = jwtDecode(tokenStored);
            setUser({
                id: decodedToken.userId,
                name: decodedToken.name
            });
        } else {
            destroyTokenLocalStorage();
            destroyUserLocalStorage();
        }

    }, []);

    const signIn = async (email, password) => {
        const response = await login(email, password);

        const token = response.token;
        const decodedToken = jwtDecode(token);
        const userLogged = { 
            id: decodedToken.userId,
            name: decodedToken.name
        };
        setUser(userLogged);
        storeUserLocalStorage(userLogged);
        storeTokenLocalStorage(token);
    }

    const signOut = async () => {
        setUser(null);
        await logout();
    }

    return (
        <authContext.Provider value={{
            signed: !!user,
            user,
            signIn,
            signOut
        }}>
            {children}
        </authContext.Provider>
    )
}