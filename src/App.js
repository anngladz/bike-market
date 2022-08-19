import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Market from './pages/Market';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Listing from './pages/Listing';
import ForgotPassword from './pages/ForgotPassword';
import CreateListing from './pages/CreateListing';
import ProfileListings from './pages/ProfileListings';
import ProfileMessages from './pages/ProfileMessages';
import EditListing from './pages/EditListing';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Market />} />
          <Route path='/profile' element={<PrivateRoute />}>
            <Route path='/profile' element={<Profile />} />
            <Route path='/profile/listings' element={<ProfileListings />} />
            <Route path='/profile/messages' element={<ProfileMessages />} />
          </Route>
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/create-listing' element={<CreateListing />} />
          <Route path='/:typeName/:listingId' element={<Listing />} />
          <Route path='/edit-listing/:listingId' element={<EditListing />} />
        </Routes>
      </Router>

      <ToastContainer />
    </>
  );
}

export default App;
