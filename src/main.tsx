import './index.css'

import { NextUIProvider} from '@nextui-org/react'
import ReactDOM from 'react-dom/client'
import { Provider } from "react-redux";
import { store } from "@app/store";
import { Toaster } from "react-hot-toast";
import './index.css'
import { HelmetProvider } from 'react-helmet-async';
import { Base18nProvider } from '@base/i18n/Base18n';
import AppRoutes from '@app/routes/AppRoutes';
import { AuthProvider } from '@app/modules/auth/core/contexts/AuthContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
    <NextUIProvider>
    <Toaster />
    <HelmetProvider>
      <Base18nProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </Base18nProvider>
    </HelmetProvider>
      </NextUIProvider>
  </Provider>
)
