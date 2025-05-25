import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import axios from 'axios';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export default function TestSlider() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("https://ecommerce.routemisr.com/api/v1/categories")
      .then(res => setCategories(res.data.data))
      .catch(err => console.log(err));
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 6
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2
        }
      }
    ]
  };

  return (
    <div className="container mx-auto py-5">
      <Slider {...settings}>
        {categories.map(category => (
          <div key={category._id} className="">
            <img src={category.image} className="w-full h-[200px] object-cover " alt={category.name} />
            <h3 className="text-center mt-2 font-medium">{category.name}</h3>
          </div>
        ))}
      </Slider>
    </div>
  );
}
