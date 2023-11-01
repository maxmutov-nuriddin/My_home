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

        {/* <Route path='/2015' element={<YearPages />} />
        <Route path='/2016' element={<YearPages />} />
        <Route path='/2017' element={<YearPages />} />
        <Route path='/2018' element={<YearPages />} />
        <Route path='/2019' element={<YearPages />} />
        <Route path='/2020' element={<YearPages />} />
        <Route path='/2021' element={<YearPages />} />
        <Route path='/2022' element={<YearPages />} />
        <Route path='/2023' element={<YearPages />} />
        <Route path='/2024' element={<YearPages />} /> */}
      </Route>
    </Routes>
  );
}

export default App;