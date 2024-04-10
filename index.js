const express=require('express');

const AppRoutes=require('./src/routes/hall.js');
const app=express();

app.use(express.json());
app.use('/',AppRoutes);

const HOSTNAME="127.0.0.1";
const PORT=3001;


app.listen(PORT,()=>{
    console.log(`server running at http://${HOSTNAME}:${PORT}`);
})