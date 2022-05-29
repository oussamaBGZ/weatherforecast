import moment from 'moment'
import styled from 'styled-components'
import { weatherDay } from '../api/weatherApi'
import WeatherIcon from './WeatherIcons'

interface Props {
    data: weatherDay
    setSelected: React.Dispatch<React.SetStateAction<weatherDay | null>>
    selected: weatherDay | null
    unit: string
}

function WeatherCard({ data, setSelected, selected, unit }: Props) {
    return (
        <Card onClick={() => setSelected(data)} focused={data?.dt === selected?.dt}>
            <p className='text-center'>{moment(data.dt_txt).format('MMM DD')}</p>
            <div className='text-center'>
                <WeatherIcon id={data.weather[0].id} size='4em' />
                </div>
            <FlexContainer>
                <div>
                    <p>Humidity</p>
                    <span>{data.main.humidity}%</span>
                </div>
                <div>
                    <p>Temp</p>
                    <span>{data.main.feels_like} {unit === "metric" ? "c" : "f"}</span>
                </div>
            </FlexContainer>
        </Card>
    )
}

export default WeatherCard
const FlexContainer = styled.div`
  display:flex;
  justify-content: space-around;
`
const Card = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
    cursor: pointer;
    border-radius: 10px;
    background-color: ${({ focused }) => focused ? "#5695F6" : "#fff"};
    color: ${({ focused }) => focused ? "#fff" : "#000"};
    &:hover{
        background-color: #5695F6;
        color: #fff;
    }
    & p {
        margin-bottom: 0;
    }
`