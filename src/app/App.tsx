import { I18nProvider } from "@base/i18n/i18nProvider";
import { LayoutSplashScreen } from "@base/layout/contexts/BaseSplasyScreen";
import { MasterLayout } from "@base/layout/core/master-layout";
import { Suspense } from "react";
import { AuthInit } from "./modules/auth/core/contexts/AuthContext";

function App() {
    return (
        <Suspense fallback={<LayoutSplashScreen />}>
            <I18nProvider>
                <AuthInit>
                    <MasterLayout />
                </AuthInit>
            </I18nProvider>
        </Suspense>
    );
}

export default App;
