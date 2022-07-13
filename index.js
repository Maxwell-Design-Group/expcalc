const path = require("path");
const express = require("express")
const mongoose = require("mongoose")
var bodyParser = require('body-parser');
const db = require("./src/db/db")
//const header_middleware = require("./src/middlewares/header")


//const userRoutes = require("./src/Routes/user");


var cors = require('cors');


const app = express()
app.use(express.static('public'));
app.use(cors({origin: '*'}));
//app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
//app.use(body-parser.json());

const PORT = process.env.PORT || 3000

app.use(express.json())
//app.use(header_middleware)

//app.use("/api/user", userRoutes);

require('./src/routes/masterdataRoute.js')(app);

require('./src/routes/winthemeRoute.js')(app);

app.get('/test', (req, res) => {
    res.send('Hello World!')
  })




// app.use((req,res,next)=>{
//     res.sendFile(path.join(__dirname,"angular","index.html"))
// });



app.use(express.static(path.join(__dirname, '/client/build')));

app.get('*', function(req, res){
     res.sendFile(path.join(__dirname,'/client/build/index.html'));
     console.log(req.headers.host);
     console.log(__dirname);

});

app.listen(PORT, (req,res) => {
    
    console.log(`app is listening to PORT ${PORT}`)
})
//app.listen(PORT);
