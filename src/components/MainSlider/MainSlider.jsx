import React from 'react'
import style from './MainSlider.module.css'
import mainSlider from '../../assets/images/slider-image-3.jpeg';
import mainSlider2 from '../../assets/images/grocery-banner-2.jpeg';
import mainSlider3 from '../../assets/images/grocery-banner.png';
import slide1 from '../../assets/images/slider-image-1.jpeg';
import slide2 from '../../assets/images/slider-image-2.jpeg';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


export default function MainSlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    responsive: [
      {
        breakpoint: 768, 
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <>
   <div className="container mx-auto">
   <div className="flex flex-wrap md:flex-nowrap">
      <div className="w-full md:w-3/4">
      <Slider {...settings}>
      <img src={mainSlider} alt="main-slider" className='w-full h-[400px]' />
      <img src={mainSlider2} alt="main-slider" className='w-full h-[400px]' />
      <img src={mainSlider3} alt="main-slider" className='w-full h-[400px]' />
      </Slider>
      </div>
      <div className="w-full md:w-1/4 flex flex-col">
      <img src={slide1} alt="slide-1" className='w-full h-[200px]' />
      <img src={slide2} alt="slide-2" className='w-full h-[200px]' />
      </div>
    </div>
   </div>
    </>
  )
}
