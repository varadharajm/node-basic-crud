const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use('/api', require('./routes/api-user'))

const listener = app.listen(process.env.PORT || 3000, ()=>{
    console.log(listener.address().port);
})