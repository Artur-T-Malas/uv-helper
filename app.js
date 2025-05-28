import express from "express";
import axios from "axios";

import { config } from './config.js'


const port = 3000;
const app = express();

const API_URL = "https://api.openuv.io";

const headers = {
    'x-access-token': config.OPENUV_API_KEY
};

app.use(express.urlencoded( { extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs");
})

app.post("/location", async (req, res) => {
    console.log(req.body);
    try {
        const result = await axios.get(
            API_URL + '/api/v1/uv',
            {
                headers: headers,
                params: {
                    lat: req.body.latitude,
                    lng: req.body.longitude,
                    alt: 100
                }
            }
        )
        console.log("resp: ", result.data);
        res.render(
            "index.ejs", {
                data: result.data
            }
        );
    } catch (error) {
        console.log(error.response.data);
        res.status(500);
    }
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})