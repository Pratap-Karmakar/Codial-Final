const port=8000;
const express=require('express');
const app= express();


// as we have exported the index.js of the routes folder so now we have to access that in this index.js folder
app.use('/', require('./routes/index'));


app.listen(port, function(error){
    if(error){
        console.log(`Error in running the server, ${error}`);
    }
    else{
        console.log(`Server is running on, ${port}`);
    }
});
