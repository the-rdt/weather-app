import axios from "axios";

export async function getData(city) {
  const key = "d04a2f7e083913ea5b3767657fbc6a38";
  let result;
  // console.log("city" + city);
  try {
    result = await axios(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`
    );
    // console.log(result);
    // console.log(result.data.main.temp);
  } catch (error) {
    if (error.response.status === 400) {
      console.log("invalid city");
    } else if (error.response.status === 404) {
      console.log("invalid city");
    }
  }
  // //catch (error) {
  // //   // Error 😨
  // //   if (error.response) {
  // //     /*
  // //      * The request was made and the server responded with a
  // //      * status code that falls out of the range of 2xx
  // //      */
  // //     console.log("data" + error.response.data);
  // //     console.log("status" + error.response.status);
  // //     console.log(error.response.headers);
  // //   } else if (error.request) {
  // //     /*
  // //      * The request was made but no response was received, `error.request`
  // //      * is an instance of XMLHttpRequest in the browser and an instance
  // //      * of http.ClientRequest in Node.js
  // //      */
  // //     console.log(error.request);
  // //   } else {
  // //     // Something happened in setting up the request and triggered an Error
  // //     console.log("Error", error.message);
  // //   }
  // //   console.log(error);
  // // }

  return result.data.main;
}
