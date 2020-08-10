const express = require("express");

const router = express.Router();


// generate a random token 
const buildToken = () => {
    const token = Math.random().toString(36).substring(Math.floor(Math.random() * Math.floor(5)));
    return token + Math.random().toString(25).substring(Math.floor(Math.random() * Math.floor(7)));
}

router.get('/', (req, res) => {
    //generate a token 
    const token = buildToken() + buildToken();

    // send Hello World! msg to the client  
    res.json(
        {
            message: 'Hello World!! From my new express server api2 project.',
            token: token  // send back a token because we should
        });
});

module.exports = router;