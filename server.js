var express = require('express');
var app = express();
var port = 3000;
var fs = require("fs");
var path = require("path");

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send("You're in");
});

app.get('/api/createRoom/:name', (req, res) => {
    fs.writeFile('./chats/' + req.params.name + '.neptuneChat', '', (err) => {});
    fs.writeFile('./chats/' + req.params.name + '.neptuneUsers', '', (err) => {});
    res.send("done");
});

app.get('/api/deleteRoom/:name', (req, res) => {
    if (fs.existsSync('./chats/' + req.params.name + '.neptuneChat')) {
        fs.unlink('./chats/' + req.params.name + '.neptuneChat', err => {});
        fs.unlink('./chats/' + req.params.name + '.neptuneUsers', err => {});
    }
    res.send("done");
});

app.get('/api/messages/:channel', (req, res) => {
    fs.readFile('./chats/' + req.params.channel + '.neptuneChat', "utf8", (err, data) => {
        res.send(data);
    });
});

app.get('/api/getChannels', (req, res) => {
    fs.readdir('./chats', (err, files) => {
        filesToSend = [];
        for (var i = 0; i < files.length; i += 2) {
            filesToSend.push(path.basename(files[i], '.neptuneChat'));
        }
        res.send(filesToSend);
    });
});

app.get('/api/getusers/:channel', (req, res) => {
    fs.readFile('./chats/' + req.params.channel + '.neptuneUsers', "utf8", (err, data) => {
        res.send(data);
    });
});

app.get('/api/addUser/:name/:channel', (req, res) => {
    fs.readFile(req.params.channel + '.neptuneUsers', "utf8", (err, data) => {
        if (data) {
            var users = data.split('\n');
        } else {
            var users = [''];
        }
        for (var i = 0; i < users; i++) {
            if (users[i] != req.params.name) {
                fs.appendFile('./chats/' + req.params.channel + '.neptuneUsers', req.params.name + '\n', err => {});
            }
        }
    });
    res.redirect('/');
});

app.get('/api/removeUser/:name/:channel', (req, res) => {
    fs.readFile('./chats/' + req.params.channel + '.neptuneUsers', "utf8", (err, data) => {
        var users = data.split('\r\n');
        console.log(users);
        var newUsers = [];
        for (var i = 0; i < users; i++) {
            console.log(req.params.name);
            if (users[i] != req.params.name) {
                newUsers.push(users[i]);
            }
        }
        res.send(newUsers.join(''));
    });
});

app.get('/api/send/:channel/:author/:message/:time', (req, res) => {
    fs.appendFile('./chats/' + req.params.channel + '.neptuneChat', req.params.author + ": " + req.params.message + ", " + req.params.time + "\n", err => {});
});

app.listen(process.env.PORT || port, () => console.log(`app listening on port ${port}!`))