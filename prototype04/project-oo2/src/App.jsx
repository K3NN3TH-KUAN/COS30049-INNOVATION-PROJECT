// src/App.jsx
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from './components/UserContext'; 
import Navbar from "./components/Navbar";
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DonationPage from "./pages/DonationPage";
import InfoPage from "./pages/InfoPage";
import AdminPage from "./pages/AdminMenuPage";
import EducationPage from "./pages/EducationPage";
import IdentifyPage from './pages/IdentifyPage'; 
import MainMenu from "./pages/MainMenu"; 
import UserTable from "./pages/UserTable";
import DonationTable from "./pages/donationTable";
import WildlifeTable from "./pages/WildlifeTable";
import FirebasePage from './pages/Firebase';

function App() {
  useEffect(() => {
    document.title = "Semonggoh Wildlife Centre";
  }, []);

  return (
    <UserProvider>
      <Router>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/donate" element={<DonationPage />} />
          <Route path="/info" element={<InfoPage />} />
          <Route path="/edu" element={<EducationPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/identify" element={<IdentifyPage />} /> 
          <Route path="/main-menu" element={<MainMenu />} /> 
          <Route path="/manage-users" element={<UserTable />} />
          <Route path="/donation-table" element={<DonationTable />} />
          <Route path="/wildlife-table" element={<WildlifeTable />} />
          <Route path="/firebase" element={<FirebasePage />} />
        </Routes>
        <Footer />
      </Router>
    </UserProvider>
  );
}

export default App;
