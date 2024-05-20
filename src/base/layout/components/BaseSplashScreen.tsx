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
        <div className="w-screen h-screen flex items-center justify-center fixed inset-0 z-50">
            <div className="st-container">
                <div className="st-slice"></div>
                <div className="st-slice"></div>
                <div className="st-slice"></div>
                <div className="st-slice"></div>
                <div className="st-slice"></div>
                <div className="st-slice"></div>
            </div>
        </div>
    );
};

export { BaseSplashScreenProvider, LayoutSplashScreen };
