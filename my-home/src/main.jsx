import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';

import { SearchContext } from './context/Context.jsx';
import App from './App.jsx'

import "react-toastify/dist/ReactToastify.css";
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <SearchContext>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </SearchContext>
)
