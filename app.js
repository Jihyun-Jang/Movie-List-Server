const express = require('express');

const app = express();

app.listen(3000, () => {
    console.log('Now listening for requests on port 3000');
});