import React, { Component } from 'react';
import styles from './style.scss';
import { Carousel as Slider } from 'antd';


function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  const styles = Object.assign({}, style, { display: 'block', background: 'red' });
  return (
    <div
      className={className}
      style={styles}
      onClick={onClick}
    ></div>
  );
}
function SamplePrevArrow(props) {
  const { className, style, onClick } = props
  const styles = Object.assign({}, style, { display: 'block', background: 'green' });
  return (
    <div
      className={className}
      style={styles}
      onClick={onClick}
    ></div>
  );
}

class Banner extends Component {
  render() {
    const { pix, loading } = this.props;
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: true,
      draggable: true,
      // arrows:true,
      // centerMode:true
      // nextArrow: <SampleNextArrow />,
      // prevArrow: <SamplePrevArrow />
    };
    const slides = pix && pix.map((pic) => {
      return (
        <div className={styles.slide}><img className={styles.img} src={pic.value} /></div>
      );
    });
    const loading_pane = loading ? (<div className={styles.slide}><h3>loading</h3></div>):'';
    return (
      <Slider {...settings}>
        {slides}
        {loading_pane}
      </Slider>
    );
  }
}

export default Banner;
