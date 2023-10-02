const socket=io('http://localhost:8000');

// Gte DOM elements on JS variables
const form=document.getElementById('send-container');
const messageInput=document.getElementById('messageInp');
const messageContainer=document.querySelector('.container');

// Ask new user for his/her name and let the sever know
const name2=prompt("Enter your name to join");
socket.emit('new-user-joined', name2)

// Audio that will play on recieving messages
// var audio=new Audio('../Audio_files/ting.mp3')

// Function which will append to the container (chat section)
const append= (message, position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    // if(position=='left'){
    //     audio.play();
    // }
}


// If the new user joins receive the event from the server
socket.on('user-joined',name=>{
    console.log("before user joined");
    append(`${name} joined the chat`, 'right')
    console.log("after user joined");
})

// // If server sends a message then recieve it
socket.on('receive',data=>{
    append(`${data.name}: ${data.message}`,'left')
})

// // If someone leaves the chat then let the other people know.
socket.on('left',name=>{
    append(`${name} left the chat`,'right')
})


// If the form gets submitted then send the server a message 
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send',message);
    messageInput.value='';
})