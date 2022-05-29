import axios from "axios";

export interface weatherDay {
    dt_txt: string
    dt: number
    wind: { speed: number }
    main: { feels_like: number,humidity:number }
    weather: { main: string, id: number, icon: string }[]
  }

export interface weathers {
    "cod": string,
    "message": number | string,
    "cnt": number,
    "list": weatherDay[],
    "city": {name:string}
}

export const getWeathers = async (city: string,unit: string): Promise<weathers> => {
    const res=await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=762385c71cb82e47ad4fdd68f06f6271&units=${unit}`)
    return res.data
}