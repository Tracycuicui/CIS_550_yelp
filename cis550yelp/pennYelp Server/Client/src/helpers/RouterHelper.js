import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from '../components/NavBar';
import Merchants from '../pages/MerchantDash/MerchantDash';
import HomePage from '../pages/HomePages/HomePage';
import SearchPage from '../pages/SearchPages/SearchPages'
import AdvancedPages from '../pages/AdvancePages/AdvancedPages.js'
import AdvancedSearch from '../pages/AdvancedSearch/AdvancedSearch'
import UserSearch from "../pages/UserSearch/UserSearch";
import FindFriend from "../pages/findFriendPages/findFriend";
import Community from "../pages/Community/Community";
/*
TODO: add more routers:
<Route path="/" element={<HomePage />} />
<Route path="/albums" element={<AlbumsPage />} />
<Route path="/albums/:album_id" element={<AlbumInfoPage />} />
<Route path="/songs" element={<SongsPage />} />
*/


const RouterHelper = () => {
    return (
        <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/merchant" element={<Merchants />} />
          <Route path="/search" element={<SearchPage />}/>
          <Route path="/advancedsearch" element={<AdvancedPages/>}/>
          <Route path="/Asearch" element={<AdvancedSearch/>}/>
          <Route path="/UserSearch" element={<UserSearch/>}/>
          <Route path="/findFriend" element={<FindFriend/>}/>
          <Route path="/Community" element={<Community/>}/>
        </Routes>
      </BrowserRouter>
    );
}


export default RouterHelper;