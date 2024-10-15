import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import GuideLogin from './Guide/GuideLogin';
import GuideSignup from './Guide/GuideSignup';
import TouristLogin from './Tourist/TouristLogin';
import TouristSignup from './Tourist/TouristSignup';
import DashboardGuide from './Guide/DashboardGuide';
import EditProfile from './Guide/EditProfile';
import InsertData from './Guide/InsertData';
import DashboardTourist from './Tourist/DashboardTourist';
import InsertDataTourist from './Tourist/InsertDataTourist';
import Support from './Support';
import Reviews from './Tourist/Reviews';
import AdminLogin from './Admin/AdminLogin';
import AdminDashboard from './Admin/AdminDashboard';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<TouristLogin />} />
        <Route path="/signup-tourist" element={<TouristSignup />} />
        <Route path="/login-tourist" element={<TouristLogin />} />
        <Route path="/signup-guide" element={<GuideSignup />} />
        <Route path="/login-guide" element={<GuideLogin />} />
        <Route path="/insert-data/:guide_id" element={<InsertData />} />
        <Route path="/insert-data-tourist/:tourist_id" element={<InsertDataTourist />} />

        <Route path="/dashboard-guide/:guide_id" element={<DashboardGuide />} />
        <Route path="/dashboard-tourist/:tourist_id" element={<DashboardTourist />} />
        <Route path="/edit-profile/:guide_id" element={<EditProfile />} />
        <Route path="/support" element={<Support />} />
        <Route path="/review/:bookingId" element={<Reviews />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
