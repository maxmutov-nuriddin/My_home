import { Routes, Route } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import { SearchContexts } from './context/Context';
import HomePage from './pages/HomePage';
import Layouts from './components/layout';
import YearPages from './pages/CardPage';

import './App.css';

function App() {
  const { searchContext, setSearchContext } = useContext(SearchContexts);

  useEffect(() => {
    const storedSearchContext = localStorage.getItem('searchContext');
    if (storedSearchContext) {
      setSearchContext(storedSearchContext);
    }
  }, [setSearchContext]);

  useEffect(() => {
    localStorage.setItem('searchContext', searchContext);
  }, [searchContext]);

  return (
    <Routes>
      <Route element={<Layouts />}>
        <Route path='/' element={<HomePage />} />
        <Route path={`/${searchContext}`} element={<YearPages />} />
      </Route>
    </Routes>
  );
}

export default App;