const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
require('./db/mongoose')
const userRouter = require('./routes/user')

app.use(express.json())
app.use(cors())
app.use('/users',userRouter)

app.use(express.static(__dirname + '/dist/first-app'));

app.get('/*', (req,res)=>{
    res.sendFile(path.join(__dirname + '/dist/first-app/index.html'))
})

app.listen(process.env.PORT || 5000, () => console.log(`Listening Socket on ${ process.env.PORT || 5000 }`));