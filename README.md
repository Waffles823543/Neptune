# Neptune
code for the neptune chat irc

run with 
```
node server.js
```
or 
```
npm start
```
Here are he basics
do an http get request to the links you see in the code. Why not posts? Because I'm lazy and don't want to learn how to do that.

Links:

create and delete rooms
```
/api/createRoom/:name
/api/deleteRoom/:name/:password
```

get messages
```
/api/messages/:channel
```

get channels
```
/api/getChannels
```
get users
```
/api/getusers/:channel
```

add and remove user from channel
```
/api/addUser/:name/:channel
/api/removeUser/:name/:channel
```

send message
```
/api/send/:channel/:author/:message/:time
```
