import React from 'react'
import Header from '../components/header'
import About from '../components/About'
import OurMenu from '../components/OurMenu'
import FoodDisplay from '../components/FoodDisplay'
import Chefs from '../components/Chefs'
import Gallery from '../components/Gallery'
import Testimonials from '../components/Testimonials'
import Footer from '../components/Footer'

const Home = () => {
  const [category, setCategory] = React.useState('All');
  return (
    <div>
        <Header/>
        <About/>
        <OurMenu category={category} setCategory={setCategory}/>
        <Chefs/>
        <Gallery/>
        <Testimonials/>
        <Footer/>
    </div>
  )
}

export default Home