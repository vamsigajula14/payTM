const express = require('express');
const router = require('./routes/index');
const userRouter = require('./routes/user');
const cors = require('cors');
const bodyparser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use('/api/v1',router);
app.use('/api/v1/user',userRouter);
app.listen(PORT,()=>{
    console.log(`Server runs at ${PORT}`);
})