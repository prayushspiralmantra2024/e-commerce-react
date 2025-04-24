import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Components/Footer/Footer'
import AOS from "aos";
import "aos/dist/aos.css";
import Popup from './Components/Popup/Popup';
const Layout = () => {
    const [orderPopup, setOrderPopup] = React.useState(false);

    const handleOrderPopup = () => {
        setOrderPopup(!orderPopup);
      };
      React.useEffect(() => {
        AOS.init({
          offset: 100,
          duration: 800,
          easing: "ease-in-sine",
          delay: 100,
        });
        AOS.refresh();
      }, []);
  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200">
    <Navbar handleOrderPopup={handleOrderPopup} />
   <Outlet/>
    <Footer />
    <Popup orderPopup={orderPopup} setOrderPopup={setOrderPopup} />
  </div>
  )
}

export default Layout
