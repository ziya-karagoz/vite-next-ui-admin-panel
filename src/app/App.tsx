import { I18nProvider } from "@base/i18n/i18nProvider";

import { Suspense } from "react";
import { AuthInit } from "./modules/auth/core/contexts/AuthContext";
import { ThemeProvider } from "@base/layout/contexts/ThemeContext";
import { LayoutSplashScreen } from "@base/layout/BaseSplashScreen";
import { MasterLayout } from "@base/layout/master-layout";

function App() {
    return (
        <Suspense fallback={<LayoutSplashScreen />}>
            <I18nProvider>
                <AuthInit>
                    <ThemeProvider>
                    <MasterLayout />
                    </ThemeProvider>
                </AuthInit>
            </I18nProvider>
        </Suspense>
    );
}

export default App;
