import React from "react";
import Page from "components/Page";
import Slider from "react-slick";

// images
import img1 from "assets/slider/slider_img_1.jpg";
import img2 from "assets/slider/slider_img_2.jpg";
import img3 from "assets/slider/slider_img_3.jpg";
import img4 from "assets/slider/slider_img_4.jpg";
import img5 from "assets/slider/slider_img_5.jpg";
import img6 from "assets/slider/slider_img_6.jpg";
import img7 from "assets/slider/slider_img_7.jpg";
import img8 from "assets/slider/slider_img_8.jpg";
// import img9 from "assets/slider/slider_img_9.jpg";
// import img10 from "assets/slider/slider_img_10.jpg";

const images = [img1, img2, img3, img4, img5, img6, img7, img8];

export default function Home() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrow: true,
  };
  return (
    <Page title="Home">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img
              style={{
                width: "100%",
                maxHeight: 400,
                objectFit: "cover",
              }}
              src={image}
              alt={`slider-${index}`}
            />
          </div>
        ))}
      </Slider>
    </Page>
  );
}
