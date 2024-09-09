import { useContext } from "react";
import { authContext } from ".";

export function useAuth()
{
    return useContext(authContext);
}
