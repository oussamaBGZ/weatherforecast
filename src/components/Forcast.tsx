import React, { useEffect, useState } from 'react'
import WeatherCard from './WeatherCard'
import Slider from "react-slick";
import { weatherDay } from '../api/weatherApi';
import useFilterDays from '../hooks/useFilterDays';
import next from '../icons/next.png'
import back from '../icons/back.png'

var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    focusOnSelect: true,
    initialSlide: 4,
    adaptiveHeight: true,
    nextArrow: <img src={next} />,
    prevArrow:  <img src={back} />
};

interface Props {
    data: weatherDay[]
    setSelected: React.Dispatch<React.SetStateAction<weatherDay | null>>
    selected: weatherDay | null
    unit: string
}

function Forcast({ data, setSelected, selected,unit }: Props) {
    const weatherData=useFilterDays(data)
  
    return (
        <div>
            <Slider
                {...settings}
            >
                {
                    weatherData.map(el => <WeatherCard data={el} setSelected={setSelected} selected={selected} unit={unit}/>)
                }
            </Slider>
        </div>
    )
}

export default Forcast