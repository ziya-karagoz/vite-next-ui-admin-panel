import { I18nProvider } from "@base/i18n/i18nProvider";

import { Suspense } from "react";
import { AuthInit } from "./modules/auth/core/contexts/AuthContext";
import { ThemeProvider } from "@base/layout/contexts/ThemeContext";
import { MasterLayout } from "@base/layout/master-layout";
import Loader from "@base/layout/components/loader/Loader";

function App() {
    return (
        <Suspense fallback={<Loader />}>
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
