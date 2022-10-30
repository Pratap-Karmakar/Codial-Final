const port = 8000;
const express = require('express');
const app = express();


// as we have exported the index.js of the routes folder so now we have to access that in this index.js folder
app.use('/', require('./routes/index'));




// after installing ejs we have to tell that we need to use ejs as our view engine
app.set('view engine', 'ejs');
app.set('views', './views');






app.listen(port, function (error) {
    if (error) {
        console.log(`Error in running the server, ${error}`);
    }
    else {
        console.log(`Server is running on, ${port}`);
    }
});
