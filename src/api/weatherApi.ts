import axios from "axios";

export interface cityDetails {
    'lat': number,
    'lon': number,
}


export interface weathers {
    "cod": string,
    "message": number | string,
    "cnt": number,
    "list": [],
    "city": {}
}

export const getCityCoordinates = async (city: string): Promise<cityDetails> => {
    const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=256e61ea35f467c2eacca425bd464ed2`)
    return { 'lat': res.data.coord.lat, 'lon': res.data.coord.lon }
}

export const getWeathers = async (city: string): Promise<weathers> => await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=762385c71cb82e47ad4fdd68f06f6271&units=metric`)