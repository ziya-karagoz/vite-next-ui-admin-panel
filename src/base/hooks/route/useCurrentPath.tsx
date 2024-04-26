import { useEffect, useState } from "react";
import { useLocation } from "react-router";

export const useCurrentPath = () => {
    const { pathname } = useLocation();
    const [currentPath, setCurrentPath] = useState<string>(pathname);

    useEffect(() => {
        setCurrentPath(pathname);
    }, [pathname]);

    return currentPath;
}