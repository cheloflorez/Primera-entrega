// Express
import express from "express";
import  routers  from './routes/index.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}))



// Server Init
const port = 8080
app.listen(port, () => {
  console.log(`BackEnd Coder - Server Started on port ${port}`);
});

// Routes

app.use('/api', routers)