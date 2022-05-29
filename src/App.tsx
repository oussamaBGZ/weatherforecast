import './App.css';
import { useQuery } from 'react-query'
import { getWeathers, weatherDay, weathers } from './api/weatherApi';
import {  useRef, useState } from 'react';
import styled from 'styled-components'
import { toast } from 'react-toastify';
import Forcast from './components/Forcast';
import moment from 'moment';
import WeatherIcon from './components/WeatherIcons';
import BarChart from './components/BarChart';
import Notfound from './components/Notfound';


function App() {
  const [submited, setsubmited] = useState<boolean>(true)
  const input = useRef<string>("tunis")
  const unit = useRef<string>("metric")
  const [selected, setSelected] = useState<weatherDay | null>(null)

  const { isLoading, error, data } = useQuery<weathers, ErrorConstructor>(
    ['weatherData'],
    () => getWeathers(input.current, unit.current),
    {
      retry: false,
      enabled: !!submited,
      onSuccess: (data) => {
        if (data) setSelected(data.list[0])   
        setsubmited(false)
        toast("Wow so easy !")
      },
      onError: () => {
        setsubmited(false)
        setSelected(null)
        toast("Sorry we didn't find a match") 
      },
    }
  )

  const handelSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault()
    setsubmited(true)
  }

  const handelChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    unit.current = e.target.value
  }

  return (
    <Container>
      <div className="row">
        <div className="one-third column">
          <form onSubmit={handelSubmit} data-testid="form">
            <Input disabled={isLoading} placeholder="City name..." onChange={(e: React.ChangeEvent<HTMLInputElement>) => input.current = e.target.value} defaultValue={input.current} required />
            <Select onChange={handelChange}>
              <option value="metric">Celsius</option>
              <option value="imperial">Fahrenheit</option>
            </Select><br/>
            <Italic>Submit the form to see changes</Italic>
          </form>
          <br /><br />
          {selected &&
            <div className='text-center'>
              <p className='mb-0'>{data?.city.name}, {moment(selected.dt_txt).format('dddd MMMM yyyy')}</p>
              <IconWeather>
                <WeatherIcon id={selected.weather[0].id} size='9em' />
                <p>{selected.main.feels_like} {unit.current === "metric" ? "C" : "F"}</p>
              </IconWeather>
              <WeatherDesc>{selected.weather[0].main}</WeatherDesc>
              <FlexContainer>
                <WindDesc>
                  <p>Humidity</p>
                  <span>{selected.main.humidity}%</span>
                </WindDesc>
                <WindDesc>
                  <p>Wind speed</p>
                  <span>{selected.wind.speed} Km/j</span>
                </WindDesc>
              </FlexContainer>
            </div>
          }
        </div>
        <div className="two-thirds column">
          {data && !error ?
            <>
              <div style={{ height: 300 }}>
                <BarChart data={data.list} unit={unit.current}/>
              </div>
              <br />
              <Forcast unit={unit.current} data={data.list} setSelected={setSelected} selected={selected} />
            </>
            : <Notfound />}
        </div>
      </div>
    </Container>
  );
}

export default App;

const Container = styled.div`
box-shadow: 0 0 10px #F3F6FA;
width:70vw;
height: 70vh;
background-color: #fff;
border-radius: 10px;
padding: 40px;
`
const Input = styled.input`
 border-radius: 3px;
    border: 1px solid lightgray;
    height: 30px;
    width: 110px;
    padding-inline: 12px;
    margin-bottom: 0;
`
const Select = styled.select`
 border-radius: 3px;
    border: 1px solid lightgray;
    height: 34px;
    margin: 0;
    padding: 0;
    margin-left: 5px; 
`
const IconWeather = styled.div`
  display: flex;
  align-items: center;
  justify-content:center;
  & p{
    font-size: 1.5em;
  }
`

const WeatherDesc = styled.p`
    font-size: 2em;
text-align:center;
font-weight: bold;
`

const WindDesc = styled.div`
flex: 1;
    font-size: 18px;
text-align:center;
color:gray;
margin-bottom: 0;
& p{
  margin-bottom: 5px;
}
& span{
  font-weight: bold;
  color:#000;
}
`
const FlexContainer = styled.div`
  display:flex;
`

const Italic = styled.i`
font-size: 10px;
    color: gray;
`