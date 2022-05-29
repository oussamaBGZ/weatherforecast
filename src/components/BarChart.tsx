import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { weatherDay } from '../api/weatherApi';
import useFilterDays from '../hooks/useFilterDays';
import moment from 'moment';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  
  export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Five days tempeture',
      },
    },
  };
  
  
export default ({data,unit}: {data: weatherDay[], unit: string}) => {
    const weatherData=useFilterDays(data)


    return (
    <div>
        <Bar
        options={options}
        data={{
            labels:weatherData.map(el => moment(el.dt_txt).format('MMM DD')),
            datasets: [{
                label: `Tempeture in ${unit==="metric" ? "Celsius" : "Fahrenheit"}`,
                data: weatherData.map(el => el.main.feels_like),
                backgroundColor: [
                    'rgb(86, 149, 246)'
                ],
              
            }]
        }} />
    </div>
)}

