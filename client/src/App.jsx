import { useState } from 'react'
import './App.css'
import LandingPage from './components/pages/LandingPage';
import Users from './components/pages/Users';
import Roles from './components/pages/Roles';
import { UserProvider } from './components/contexts/UserContext';
import { RoleProvider } from './components/contexts/RoleContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
function App() {
  const[sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar= () => {
    setSidebarOpen(!sidebarOpen);
  }
  const closeSidebar = () => {
    setSidebarOpen(false);
  }

  return (
    <UserProvider>
      <RoleProvider>
          <LandingPage toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} closeSidebar={closeSidebar}/>
          <BrowserRouter>
            <Routes>
              <Route path="/users" element={<Users />} />
              <Route path="/roles" element={<Roles />} />
            </Routes>
          </BrowserRouter>
      </RoleProvider>
    </UserProvider>
  )
}

export default App
