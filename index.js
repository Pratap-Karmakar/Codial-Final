const port=8000;
const express=require('express');
const app= express();


app.listen(port, function(error){
    if(error){
        console.log(`Error in running the server, ${error}`);
    }
    else{
        console.log(`Server is running on, ${port}`);
    }
});
