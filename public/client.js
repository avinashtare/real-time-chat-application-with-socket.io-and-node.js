const socket = io();
// console.log(socket)

let name;

// get user name
do {
    name = prompt("Enter Your Name:-")
} while (!name);

// scroll bottom
function scrollToBottom() {

    let add_messages = document.getElementById("add_messages");
    add_messages.scrollTop = add_messages.scrollHeight;

};

// add message massage area
function appendMessage(msg) {
    // geting all data
    let user = msg.user;
    let message = msg.message;
    let msgType = msg.msgType;

    // massege add section
    let add_messages = document.getElementById("add_messages");

    // set type
    if (msgType == "incoming") {
        add_messages.innerHTML += `
                        <div class="incoming message">
                            <!-- <h4>${user}</h4> -->
                            <h4>You</h4>
                            <p>${message}</p>
                        </div>
        `;
    }
    else if (msgType == "outgoing") {
        add_messages.innerHTML += ` 
                        <div class="outgoing message">
                            <h4>${user}</h4>
                            <p>${message}</p>
                        </div>
    `;
    }
};

// send chat data
function sendChatData() {

    // geting textarea
    let textData = document.getElementById("textarea_message");

    // send to server
    let msg = {
        user: name,
        message: textData.value,
        msgType: "outgoing"
    };
    // server event to send
    socket.emit("addMessage", msg);

    // append to html
    msg.msgType = "incoming";
    appendMessage(msg);

    // scroll to bottom
    scrollToBottom()

    // clear input (textarea)
    textData.value = "";
};

// add chat
// send chat
let sendChat = document.getElementById("sendChat");

sendChat.addEventListener("click", () => {
    sendChatData();
});

// enter to send
let textData = document.getElementById("textarea_message");
textData.addEventListener("keypress", (event) => {
    if (event.key == "Enter") {
        sendChatData();
    };
});

// resive message form server

socket.on("newMessage", (msg) => {
    // appendMessage
    appendMessage(msg);

    // to bottom
    scrollToBottom()
});