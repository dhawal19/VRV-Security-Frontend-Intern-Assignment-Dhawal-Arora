import Navbar from '../navbar/Navbar'  
import Sidebar from '../navbar/Sidebar'
import Main from '../Main'

const LandingPage = ({toggleSidebar, sidebarOpen, closeSidebar}) => {
  return (
   <>
   <Navbar onSidebarToggle={toggleSidebar}/>
   {sidebarOpen && <Sidebar isOpen={sidebarOpen} onClose={closeSidebar}/>}
   <Main isSidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}/>
   </>
  )
}

export default LandingPage