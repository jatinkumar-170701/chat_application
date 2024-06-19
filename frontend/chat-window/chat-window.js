const groupChat=document.getElementById("group-chat");
const createGroupWindow=document.getElementById("create-group");
const allContacts=document.getElementById("left");
const toast=document.getElementById("toast-msg");
const messageHeader=document.getElementById("message-card-header");
const chatMessage=document.getElementById("chat-messages");

function groupChats(){
    console.log("hello ooooooo")
    window.location.href="../group-window/group-window.html";
}

function createGroupWindo(){
    window.location.href="../creategroup-window/creategroup-window.html";
}


groupChat.addEventListener("click",groupChats);
createGroupWindow.addEventListener("click",createGroupWindo);
let toUserId;

function createToast(msg,color='red'){
    const div=document.createElement("div");
    div.innerHTML=msg;
    div.style.backgroundColor=color;
    div.style.padding="1rem 2rem ";
    div.style.borderRadius="4px";
    div.style.color="#fff"
    toast.append(div);
    setTimeout(()=>{
        div.remove();
    },2000)
}

async function allLoginUsers(){
    const token=localStorage.getItem("token");
    allContacts.innerHTML="";
    await axios.get("http://localhost:3000/chat/allcontacts",{headers:{"Authorization":token}})
    .then((res)=>{
        console.log(res);
        const user1=res.data.user
         user1.forEach((user)=>{
        const childNodes=`<li class="list-group-item" >${user.name}<input type="hidden" class="user-id" value=${user.id} /></li>`
        allContacts.innerHTML +=childNodes
    })
    })
    
}

function userClick(e){
    if(e.target.className=="list-group-item"){
        // console.log(e.target.textContent);
        // console.log(e.target.children[0].value)
        const name= e.target.textContent;
        const id= +e.target.children[0].value;
        console.log("this is id",id);
        toUserId:id;
        const userMessage = `Message to : ${name} <input type='hidden' id='msg-header-user-id' value='${id}'/>`;
        messageHeader.innerHTML=userMessage;
        // const a=document.getElementById("msg-header-user-id").value;
        // console.log(a);
        chatMessage.innerHTML="";
        getChats(id);
    }
}

async function getChats(toUserId=0){
    chatMessage.innerHTML="";
    const token=localStorage.getItem("token");
    await axios.get(`http://localhost:3000/chat/allchats/${toUserId}`,{headers:{"Authorization":token}})
    .then((res)=>{
        console.log(res);
        if(res.status==200 && res.data.chats){
            const chats=res.data.chats;
            chats.forEach((chat)=>{
                const chatNodes=`<li class="list-group-item1">${chat.user.name}:${chat.chatMessage}</li>`;
                chatMessage.innerHTML+=chatNodes;
            })
        }
    })
}

async function chat(e){
    e.preventDefault();
     const id1=document.getElementById("msg-header-user-id").value;
    const chat1=e.target.chat2.value;
    console.log("this is chat id",id1);
    try{
        const chatDetails={
            chat:chat1,
            toUser:id1
        }
        console.log("this is chat details",chatDetails);
        const token=localStorage.getItem("token");
        await axios.post(`http://localhost:3000/chat/chatmessage`,chatDetails,{headers:{"Authorization":token}})
        .then((res)=>{
            console.log(res);
            if(res.status===200){
                createToast(res.data.message);          }
        })

    }
    catch(err){
        console.log(err);
    }
}

async function showScreen(){
    allLoginUsers();
    // setInterval(()=>{
    //     getChats(toUserId);
    // });
}

window.addEventListener("DOMContentLoaded",showScreen);
window.addEventListener("click",userClick);
