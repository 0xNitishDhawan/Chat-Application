// Node server which will handle Socket.io connections
const io=require('socket.io')(8000,{
    cors:{
        origin:"*"
    }
})
const users={}

io.on('connection', socket=>{
    
    // if any new user joins then the other users will know
    socket.on('new-user-joined',name2=>{
        users[socket.id]=name2;  
        socket.broadcast.emit('user-joined',name2);
    });

    // If someone sends a message then, broadcast it to other people
    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:message, name:users[socket.id]})
    });

    // If someone leaves then, let the other people know
    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    });

})
