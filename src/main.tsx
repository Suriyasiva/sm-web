import * as React from 'react';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import * as ReactDOM from 'react-dom/client';
import SubscriptionManagementAppTheme, {
  SubscriptionManagementColorManager,
} from './theme/theme';
import './index.css';
import './style.css';
import './localization/i18n.ts';

import MainRouter from './routes/MainRouter';
import { PREF_CHAKRA_COLOR_MODE } from './constants/PreferenceKey.ts';

const rootElement = document.getElementById('subscription-management-web-root');
ReactDOM.createRoot(rootElement!).render(
  <React.StrictMode>
    <ChakraProvider
      theme={SubscriptionManagementAppTheme}
      colorModeManager={SubscriptionManagementColorManager}
    >
      <ColorModeScript storageKey={PREF_CHAKRA_COLOR_MODE} />
      <MainRouter />
    </ChakraProvider>
  </React.StrictMode>,
);
