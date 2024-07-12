import ReactDOM from 'react-dom/client';
import './index.css';
import '@telegram-apps/telegram-ui/dist/styles.css';
import './mockEnv';
import { Root } from './components/Root';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Root />
);
