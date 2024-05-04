import { WithChildren } from "@base/helpers/components/WithChildren";
import {
    createContext,
    Dispatch,
    FC,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from "react";

const BaseSplashScreenContext = createContext<
    Dispatch<SetStateAction<number>> | undefined
>(undefined);

const BaseSplashScreenProvider: FC<WithChildren> = ({ children }) => {
    const [count, setCount] = useState(0);
    let visible = count > 0;


    useEffect(() => {
        // Show SplashScreen
        if (visible) {
            document.body.classList.remove("page-loading");

            return () => {
                document.body.classList.add("page-loading");
            };
        }

        // Hide SplashScreen
        let timeout: number;
        if (!visible) {
            timeout = window.setTimeout(() => {
                document.body.classList.add("page-loading");
            }, 3000);
        }

        return () => {
            clearTimeout(timeout);
        };
    }, [visible]);

    return (
        <BaseSplashScreenContext.Provider value={setCount}>
            {children}
        </BaseSplashScreenContext.Provider>
    );
};

const LayoutSplashScreen: FC<{ visible?: boolean }> = ({ visible = true }) => {
    // Everything are ready - remove splashscreen
    const setCount = useContext(BaseSplashScreenContext);

    useEffect(() => {
        if (!visible) {
            return;
        }

        if (setCount) {
            setCount((prev) => {
                return prev + 1;
            });
        }

        return () => {
            if (setCount) {
                setCount((prev) => {
                    return prev - 1;
                });
            }
        };
    }, [setCount, visible]);

    return (
        <div className="w-screen h-screen flex items-center justify-center fixed inset-0 z-50 bg-white">
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="50" cy="50" r="47" fill="none" stroke="black" stroke-width="6"/>
<circle cx="50" cy="17.6768" r="15.6768" fill="none" stroke="black" stroke-width="4"/>
<path d="M58.596 26.7677C58.596 30.9042 55.0282 34.3536 50.505 34.3536C45.9819 34.3536 42.4141 30.9042 42.4141 26.7677C42.4141 22.6313 45.9819 19.1819 50.505 19.1819C55.0282 19.1819 58.596 22.6313 58.596 26.7677Z" fill="none" stroke="black" stroke-width="2"/>
</svg>

        </div>
    );
};

export { BaseSplashScreenProvider, LayoutSplashScreen };
