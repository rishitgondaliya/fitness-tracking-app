import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import image1 from "../../assets/carousel/pexels-olly-3838937.jpg";
import image2 from "../../assets/carousel/pexels-janetrangdoan-1128678.jpg";
import image3 from "../../assets/carousel/pexels-olly-3768916.jpg";
import image4 from "../../assets/carousel/istockphoto-1322158059-612x612.jpg";
import image5 from "../../assets/carousel/pexels-willpicturethis-1954524.jpg";

const SimpleCarousel = () => {
  return (
    <Carousel
      autoPlay={true} 
      interval={2000} 
      showStatus={false}
      showThumbs={false}
      infiniteLoop={true}
    >
     <div className="h-[500px] w-full">
        <img src={image1} alt="Slide 1" className="rounded-lg object-cover  h-full w-full" />
      </div>
      <div className="h-[500px]  w-full">
        <img src={image2} alt="Slide 2" className="rounded-lg object-cover h-full w-full" />
      </div>
      <div className="h-[500px]  w-full">
        <img src={image3} alt="Slide 3" className="rounded-lg object-cover h-full w-full" />
      </div>
      <div className="h-[500px]  w-full">
        <img src={image4} alt="Slide 4" className="rounded-lg object-cover object-bottom h-full w-full" />
      </div>
      <div className="h-[500px]  w-full">
        <img src={image5} alt="Slide 5" className="rounded-lg object-cover h-full w-full" />
      </div>
    </Carousel>
  );
};

export default SimpleCarousel;
