require("dotenv").config()
const express = require('express');
const router = express.Router();

const app = express();

const PORT = process.env.PORT;

const hotels = [
    {
        id: 1,
        name: "Hotel 1",
        price: 100,
        city: "Paris",
        country: "France",
        rating: 4.6,
        stars:4
    },
    {
        id: 2,
        name: "Hotel 2",
        price: 200,
        city: "London",
        country: "UK",
        rating: 4.2,
        stars:5,
    },
];

const logger = (req, res, next) => {
    console.log(`${req.method} received on ${req.url}`);
    next();
} 

app.use(logger);
app.use(express.json());

app.get("/api/hotels", (req,res) => {
    
    res.send(hotels);
});

app.get("/api/hotels/:id", (req,res) => {
    
    const hotel = hotels.find(
        (hotel) => hotel.id === parseInt(req.params.id, 10));
    res.send(hotel);
});

app.post("/api/hotels", (req,res) => {
    const hotel = req.body;
    hotel.id = hotel.length + 1;
    hotels.push(hotel);
    res.send(hotel);
})

app.get("/", (req, res) => {
   
    res.send("Hello World from Airtribe");
});

app.listen(PORT, () => {
    console.log('Server is up and running on 8080');
});