import { FaMagnifyingGlass } from "react-icons/fa6";
import { HiMiniArrowDown, HiMiniArrowUp } from "react-icons/hi2";
import { GiWindsock } from "react-icons/gi";
import { IoIosWater } from "react-icons/io";
import { FaWind } from "react-icons/fa6";
import { IoMdHappy } from "react-icons/io";
import {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeatherDataAsync, selectWeatherData, weatherStatus } from "./weatherSlice";
import Loader from "../common/loader/Loader";

function Weather() {
  const [search, setSearch] = useState("");
  const tempUnit = "°C";  
  const windUnit = "m/s";  
  const dispatch = useDispatch();
  const weather = useSelector(selectWeatherData);
  const status = useSelector(weatherStatus);

  

  const cards = [
    {
      id: 1,
      title: "min",
      icon: <HiMiniArrowDown />,
      data: Math.round(weather?.feels_like),
      unit: tempUnit,
    },
    {
      id: 2,
      title: "max",
      icon: <HiMiniArrowUp />,
      data: Math.round(weather?.temp_max),
      unit: tempUnit,
    },
    {
      id: 3,
      icon: <IoMdHappy />,
      title: "feels like",
      data: Math.round(weather?.temp),
      unit: tempUnit,
    },
    {
      id: 4,
      icon: <FaWind />,
      title: "pressure",
      data: weather?.pressure,
      unit: windUnit,
    },
    {
      id: 5,
      icon: <IoIosWater />,
      title: "humidity",
      data: weather?.humidity,
      unit: "%",
    },
    {
      id: 6,
      icon: <GiWindsock />,
      title: "wind speed",
      data: weather?.speed,
      unit: windUnit,
    },
  ];

  const changeFun = (e) => {
    setSearch(e.target.value);
  };

  const clickFun = () => {
    dispatch(fetchWeatherDataAsync(search));
    setSearch("");
  };

  if (status === "Loading") {
    return (
      <div className='w-full flex justify-center items-center p-14'>
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <div
        className="min-h-[120vh] bg-cover"
        style={{ "background-image": `url("https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")` }}
      >
        <div className="h-[30vh] w-screen pt-5 gap-4 flex flex-col items-center justify-center ">
          <p className="text-white font-bold text-[2rem]">
            Find Weather Forecast
          </p>
          <div className="flex justify-center items-center gap-5">
          <input
            className="p-4 w-[40vw] rounded-xl bg-[#ffffffaa] focus:outline-none relative"
            type="text"
            name="serch"
            id="serch"
            value={search}
            onChange={changeFun}
          />
           <div className=" cursor-pointer">
          <FaMagnifyingGlass
            className="text-4xl font-black text-white"
            onClick={clickFun}
          />
          </div>
        </div>
        </div>
       

        {/* Weather section */}
        {weather && (
          <div>
            <div className="h-[26vh] w-[70vw] text-white grid grid-cols-3 justify-center mx-auto items-center">
              <div className="text-[3rem] font-bold mx-auto">
                {`${Math.round(weather.feels_like)}`} °
                {"C"}
              </div>
              <div>
                <div className="text-[1.8rem] font-medium ">
                  {weather.name}, {weather.country}
                </div>
                <div>
                  <div className="text-[1rem]">{weather.description}</div>
                </div>
              </div>
              <div className="mx-auto">
                <div>
                  <img src={weather.iconURL} alt="pic" />
                </div>
              </div>
            </div>

            <div className="h-[40vh] w-[70vw] grid grid-cols-3 gap-2 justify-center items-center mx-auto">
              {cards.map((card) => (
                <div key={card.id} className="flex flex-col justify-center items-center h-[14vh] w-[10vw] rounded-md mx-auto bg-white">
                  <div className="flex gap-2 justify-center items-center">
                    <div>{card.icon}</div>
                    <div className="text-[1rem]">{card.title}</div>
                  </div>
                  <div className="text-[1.4rem] font-medium">
                    {card.data} {card.unit}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Weather;
