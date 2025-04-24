import React from 'react'
import Hero from '../Hero/Hero';
import Products from '../Products/Product';
import TopProducts from '../TopProducts/TopProduct';
import Banner from '../Banner/Banner';
import Subscribe from '../Subscribe/Subscribe';
import Testimonials from '../Testimonials/Testimonials';
import AOS from "aos";
import "aos/dist/aos.css";
const Home = () => {
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
    <div>
         <Hero handleOrderPopup={handleOrderPopup} />
    <Products />
    <TopProducts handleOrderPopup={handleOrderPopup} />
    <Banner />
    <Subscribe />
    <Testimonials />
    </div>
  )
}

export default Home
