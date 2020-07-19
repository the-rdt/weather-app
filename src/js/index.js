import { getData } from "./models/get-weather";
import views from "./views/views-test";
import dom from "./domObjects";
import "../sass/index.scss";

let temp, humid;

const getWeather = () => {
  const city = dom.input.value;
  dom.place.textContent = city || `\uD83D\uDE24`;
  //   console.log("city" + city);
  getData(city)
    .then((data) => {
      temp = data.temp;
      humid = data.humidity;
      dom.temprature.textContent = `Temprature : ${temp} \xB0 C`;
      dom.humidity.textContent = `Humidity : ${humid}`;
      dom.input.value = "";
    })
    .catch(() => {
      dom.temprature.textContent = `Temprature : \uD83D\uDE24`;
      dom.humidity.textContent = `Humidity : \uD83D\uDE24`;
    });
};

dom.checkBtn.addEventListener("click", getWeather);
