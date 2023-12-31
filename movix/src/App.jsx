import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { fetchDataFromApi } from './utils/api';

import { useDispatch, useSelector } from 'react-redux';
import { getApiConfiguration } from './store/homeSlice';

import Home from '../src/pages/home/Home';
import Explore from '../src/pages/explore/Explore';
import Details from '../src/pages/details/Details';
import SearchResults from '../src/pages/searchResult/SearchResults';
import PageNotFound from '../src/pages/404/pageNotFound';
import Header from '../src/components/header/Header';
import Footer from '../src/components/footer/Footer';

function App() {
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home);
  console.log('url', url);
  useEffect(() => {
    fetchApiConfig();
  }, []);
  const fetchApiConfig = () => {
    fetchDataFromApi('/configuration').then((res) => {
      console.log(res);
      const url = {
        backdrop: res.images.secure_base_url + 'original',
        poster: res.images.secure_base_url + 'original',
        profile: res.images.secure_base_url + 'original',
      };
      dispatch(getApiConfiguration(url));
    });
  };
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResults />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
