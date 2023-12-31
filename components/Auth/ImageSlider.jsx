import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

const ImageSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <Slider {...settings}>
      <div>
        <Image src="/auth/sign1.png" width={700} height={700} alt="Slide 1" />
      </div>
      <div>
        <Image src="/auth/sign2.png" width={700} height={700} alt="Slide 2" />
      </div>
    </Slider>
  );
};

export default ImageSlider;
