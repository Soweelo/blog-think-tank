import "./scrollbar.scss"
import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/swiper.min.css';
// import 'swiper/modules/effect-coverflow/effect-coverflow.min.css';
// import "swiper/modules/navigation/navigation.min.css"
// import "swiper/modules/pagination/pagination.min.css"
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import {useState, useEffect} from 'react'
import SwiperCore, {EffectCoverflow,Pagination,Navigation} from "swiper/core"
SwiperCore.use([EffectCoverflow, Pagination, Navigation])

export default function Scrollbar({scrollRef}){

    const [swiper, setSwiper] = useState(false)


// console.log(scrollRef)

    return(
        <div className="swiper__container ">
            <div className="swiper__title-wrapper">
                <div className="swiper__logo">
                    <img src="assets/think.jpeg" alt=""/>
                </div>
                <div className="swiper__title">
                    <span>React</span> Swiper Slider
                </div>
            </div>
            <Swiper
                navigation={true}
                effect={"coverflow"}
                centeredSlides={true}
                slidesPerView={window.innerWidth < 768 ? 1 : "auto"}
                loop={true}
                coverflowEffect={{
                    rotate:50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true
                }}
                pagination={{
                    clickable:true
                }}
                className="mySwiper">
                <SwiperSlide>
                    <img src="assets/thinkhard.jpeg" alt=""/>
                </SwiperSlide>
                <SwiperSlide>
                    <img src="assets/think.jpeg" alt=""/>
                </SwiperSlide>
                <SwiperSlide>
                    <img src="assets/industrie-download.jpeg" alt=""/>
                </SwiperSlide>
                <SwiperSlide>
                    <img src="assets/genius.jpeg" alt=""/>
                </SwiperSlide>
                <SwiperSlide>
                    <img src="assets/sante-2-download.jpg" alt=""/>
                </SwiperSlide>
            </Swiper>
        </div>
    )

}