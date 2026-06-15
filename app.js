var express = require('express');
var app = express();
var path = require('path');
const port = (process.env.PORT || 3000);

app.use('/static', express.static(path.join(__dirname + '/static')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(port, () => console.log(`Portfolio API Server on port ${port}!`));

