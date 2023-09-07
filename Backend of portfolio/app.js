const express = require('express');
const app = express();
const AppRouter = require("./routes/appRoutes");
const mongooes = require("mongoose");
const cors = require("cors");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use("/api",AppRouter);


const PORT = 5500;

const Mongo_DB_URI = "mongodb://127.0.0.1:27017/Portfolio";
mongooes.connect(Mongo_DB_URI).then( () =>{
    console.log("DataBase Connected");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    });
}).catch( (erorr) =>{
    console.log(erorr);
});

