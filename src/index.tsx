import ReactDOM from 'react-dom/client';
import '@telegram-apps/telegram-ui/dist/styles.css';
import { Root } from './components/Root';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Root />
);
