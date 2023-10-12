import { useEffect, useState } from "react";

import "./App.css";
import axios from "axios";

function App() {
  const [location, setLocation] = useState({});
  const [currentWeather, setCurrentWeather] = useState();
  const [search, setSearch] = useState("Lagos");
  const [date, setDate] = useState();
  const [greeting, setGreeting] = useState();

  useEffect(() => {
    axios
      .get(
        `https://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_API_KEY}&q=${search}`
      )
      .then((res) => {
        console.log(res.data.location);
        setCurrentWeather(res.data.current);
        setLocation(res.data.location);
        const date =
          location?.localtime === undefined
            ? new Date().toLocaleTimeString().substring(0, 5)
            : location?.localtime.substring(11);
        const hours =
          location?.localtime === undefined
            ? new Date().toLocaleTimeString().substring(0, 2)
            : location?.localtime.substring(11, 13);
        console.log(hours);
        if (hours < 12) {
          setGreeting("Good Morning");
        } else if (hours >= 12 && hours < 17) {
          setGreeting("Good Afternoon");
        } else {
          setGreeting("Good Evening");
        }
        setDate(date);
      });
  }, [location?.localtime, search]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <div className="flex  p-5 flex-col items-center gap-10 text-white  w-screen h-screen">
        <div className="flex justify-between w-full items-start">
          <div className="flex items-center justify-center gap-3 ">
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            <input
              className="border-b-white border rounded-full bg-transparent p-1 pl-5 text-white"
              placeholder="Search Location"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center">
              <img className="w-10" src={currentWeather?.condition.icon} />
              <h1 className="text-lg font-semibold">
                {currentWeather?.feelslike_c}&deg;{" "}
              </h1>
            </div>

            <p>
              {location?.name} ,{location?.country}
            </p>
          </div>
        </div>
        <div className="gap-10 flex flex-col items-center justify-center ">
          <div className="flex flex-col gap-  justify-center items-center">
            <h1 className="text-[10rem] p-auto shadow-xl">{date}</h1>
            <h3 className="text-5xl font-semibold shadow-xl">
              Hey You! {greeting}
            </h3>
          </div>
          <div className="flex flex-col gap-10">
            <p className="text-3xl shadow-xl">
              What is your main focus for today?
            </p>
            <hr className="border w-full" />
          </div>

          <div className="mt-5">
            Embrace the day with a smile, and let positivity guide your path.
          </div>
        </div>
      </div>
    </>
  );
}

export default App;