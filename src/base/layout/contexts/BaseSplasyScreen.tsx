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
            <svg width="142" height="142" viewBox="0 0 142 142" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_547_588)">
                    <path d="M69.2 72L58 60.7H38.5L70.9 97.7L129.8 13.7V0L69.2 72Z" fill="#7F2629" />
                    <path d="M111.5 56.7C113.3 61.5 114.3 66.6 114.3 72C114.3 96 94.9 115.5 70.8 115.5C46.8 115.5 27.2999 96 27.2999 72C27.2999 48 46.8 28.5 70.8 28.5C77.5 28.5 83.8 30 89.4 32.7L106.6 12.2C96.2 5.99999 84 2.39999 70.8 2.39999C32.4 2.39999 1.19995 33.6 1.19995 72.1C1.19995 110.6 32.4 141.8 70.9 141.8C109.4 141.8 140.6 110.6 140.6 72.1C140.6 57.5 136.1 44 128.4 32.8L111.5 56.7Z" fill="#E61111" />
                </g>
                <defs>
                    <clipPath id="clip0_547_588">
                        <rect width="141.7" height="141.7" fill="white" />
                    </clipPath>
                </defs>
            </svg>

        </div>
    );
};

export { BaseSplashScreenProvider, LayoutSplashScreen };
