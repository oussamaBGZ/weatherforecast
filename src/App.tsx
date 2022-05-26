import './App.css';
import { useQuery } from 'react-query'
import { cityDetails, getCityCoordinates, getWeathersfivedays, weathers } from './api/weatherApi';
import { useEffect, useState } from 'react';


function App() {
  const [submited,setsubmited]=useState(false)
  const [input,setinput]=useState("")

  const { isLoading, error, data: cityDetail } = useQuery<cityDetails, ErrorConstructor>(['getcityDetail',input], () => getCityCoordinates(input),{
    // The query will not execute until the until we get the response of cirtydetail exists
    enabled: !!submited,
    onError:()=>{
      setsubmited(false)
    },
  })

  const lon = cityDetail?.lon!
  const lat = cityDetail?.lat!

  // Then get the user's projects
  const { isIdle, data: weatherData } = useQuery<weathers, ErrorConstructor>(
    ['weatherData',input],
    () => getWeathersfivedays(lat, lon),
    {
      // The query will not execute until the until we get the response of cirtydetail exists
      enabled: !!lon && !!lat && !!submited,
      onSuccess:()=>{
        setsubmited(false)
      },
      onError:()=>{
        setsubmited(false)
      },
    }
  )

  useEffect(()=>{

  },[])

  return (
    <div>
      {
        isLoading && <div>loading</div>
      }
      {
        error  &&<div>errr {JSON.stringify(error)}</div>
      }
      <input value={input} onChange={e=>setinput(e.target.value)}/>
    <button onClick={()=> setsubmited(true)}> hello</button>
    </div>
  );
}

export default App;
