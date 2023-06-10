console.log('discussJS ran');
//alert('Alert discussJS ran');
// http://localhost:3000/socket.io/socket.io.js
// const socket = io('http://localhost:3000/socket.io/socket.io.js');

const ChatForm = document.getElementById('chatForm');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');


const socket = io('');

// Get username and room from url
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
});

// Join chatroom on a order
socket.emit('joinRoom', { username, room});

// Get room and users
socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

// We are logging here to see if we are catching user name password
console.log(username, room);

// Messages About the order from the server logging for output to view
socket.on('messageOrderLog', message => {
  console.log(`message: `+JSON.stringify(message));
  outputOrderMessage(message);

  // Scroll down everything we send a message
  chatMessages.scrollTop = chatMessages.scrollHeight;
})

// Message when submitted we been listening the whole time
ChatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get message text
  const msg = e.target.elements.msg.value;

  console.log('msg: '+msg);

  // Emit message to server
  socket.emit('chatOrderMessage', msg);

  // Clearn input
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
  

});


// Output message to the DOM
function outputOrderMessage(message){
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
  <p class="text">
   ${message.text}
  </p>`;
  document.querySelector('.chat-messages').appendChild(div);
}


// Add room name to DOM
function outputRoomName(room) {
  roomName.innerText = room;
}

// Add users to DOM
function outputUsers(users) {
  if(!users){
    return;
  }

  userList.innerHTML = `
    ${users.map(user => `<li>${user.username}</li>`).join('')}
  `;
}

