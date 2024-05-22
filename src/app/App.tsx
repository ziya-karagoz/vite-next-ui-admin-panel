import { I18nProvider } from "@base/i18n/i18nProvider";

import { Suspense } from "react";
import { AuthInit } from "./modules/auth/core/contexts/AuthContext";
import { MasterLayout } from "@base/layout/master-layout";
import Loader from "@base/layout/components/loader/Loader";
import { Toaster } from "react-hot-toast";
import { useTheme } from "@base/layout/contexts/ThemeContext";

function App() {
    const { theme } = useTheme();

    const style = {
        backgroundColor: theme === "dark" ? "#18181b" : "#ffffff",
        color: theme === "dark" ? "#dfdfdf" : "#18181b",
    };

    return (
        <Suspense fallback={<Loader />}>
            <I18nProvider>
                <AuthInit>
                    <Toaster
                        toastOptions={{
                            style: style,
                        }}
                    />
                    <MasterLayout />
                </AuthInit>
            </I18nProvider>
        </Suspense>
    );
}

export default App;
