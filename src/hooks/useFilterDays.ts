import { useEffect, useState } from "react"
import { weatherDay } from "../api/weatherApi"

 const useFilterDays=(data:weatherDay[])=>{
    const [weatherData, setweatherData] = useState<weatherDay[]>([])

    useEffect(() => {
        const currentTime = data[0].dt_txt.split(' ')[1]
        const weatherData = data.filter(item => {
            return item.dt_txt.includes(currentTime)
        })
        setweatherData(weatherData)
    }, [data])

    return weatherData
}

export default useFilterDays