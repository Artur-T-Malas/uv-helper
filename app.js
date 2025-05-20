import express from "express";
import axios from "axios";

import { config } from './config.js'


const port = 3000;
const app = express();

const API_URL = "https://api.openuv.io";

const headers = {
    'x-access-token': config.OPENUV_API_KEY
};

const example = {
  "result": {
    "uv": 0.4894,
    "uv_time": "2025-05-20T16:25:54.946Z",
    "uv_max": 6.4313,
    "uv_max_time": "2025-05-20T10:33:50.544Z",
    "ozone": 348.4,
    "ozone_time": "2023-04-12T15:04:31.773Z",
    "safe_exposure_time": {
      "st1": 341,
      "st2": 409,
      "st3": 545,
      "st4": 681,
      "st5": 1090,
      "st6": 2043
    },
    "sun_info": {
      "sun_times": {
        "solarNoon": "2025-05-20T10:33:50.544Z",
        "nadir": "2025-05-19T22:33:50.544Z",
        "sunrise": "2025-05-20T02:35:22.678Z",
        "sunset": "2025-05-20T18:32:18.410Z",
        "sunriseEnd": "2025-05-20T02:39:36.808Z",
        "sunsetStart": "2025-05-20T18:28:04.279Z",
        "dawn": "2025-05-20T01:51:32.889Z",
        "dusk": "2025-05-20T19:16:08.198Z",
        "nauticalDawn": "2025-05-20T00:49:28.984Z",
        "nauticalDusk": "2025-05-20T20:18:12.104Z",
        "nightEnd": null,
        "night": null,
        "goldenHourEnd": "2025-05-20T03:27:01.000Z",
        "goldenHour": "2025-05-20T17:40:40.088Z"
      },
      "sun_position": {
        "azimuth": 1.768269599602388,
        "altitude": 0.2920627685829152
      }
    }
  }
}

app.use(express.urlencoded( { extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs");
})

app.post("/location", async (req, res) => {
    console.log(req.body);
    try {
        // const result = await axios.get(
        //     API_URL + '/api/v1/uv',
        //     {
        //         headers: headers,
        //         params: {
        //             lat: req.body.latitude,
        //             lng: req.body.longitude,
        //             alt: 100
        //         }
        //     }
        // )
        // console.log("resp: ", result.data);
        // res.render(
        //     "index.ejs", {
        //         data: result.data
        //     }
        // );
        res.render(
            "index.ejs",
            { data: example }
        );
    } catch (error) {
        console.log(error.response.data);
        res.status(500);
    }
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})