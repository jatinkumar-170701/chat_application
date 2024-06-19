const oneChat=document.getElementById("one-to-one-chat");
const groupChat=document.getElementById("group-chat");
const createdGroupShow= document.getElementById('created-group-show')
const userRight = document.getElementById('right')
const listContact = document.getElementById('list-of-all-contacts')
const messageHeader=document.getElementById('message-card-header')
const chatMessage=document.getElementById('chat-messages')
const addToUser=document.getElementById('create-group-user')
const toast=document.getElementById('toast-msg')
const adminTrue=document.getElementById('admin-yes')
const adminFalse=document.getElementById('admin-no')

function oneChats(){
    console.log("hello ooooooo")
    window.location.href="../chat-window/chat-window.html";
}

function groupChats(){
    window.location.href="../group-window/group-window.html";
}


groupChat.addEventListener("click",groupChats);
oneChat.addEventListener("click",oneChats);

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

async function createGroup(e){
    try {
        e.preventDefault();
        const createGroupData={
            groupName:e.target.creategroup.value
        }
        console.log("create group data",createGroupData);
        const token=localStorage.getItem("token");
        const res=await axios.post("http://localhost:3000/group/creategroup",createGroupData,{headers:{"Authorization":token}})
        console.log(res);
        if(res.status===201){
            createToast(res.data.message,"green");
        }
    } catch (error) {
        if(error.res.status==500){
            createToast(error.res.data.message);
        }
    }
}

async function getContacts(){
    listContact.innerHTML="";
    const token=localStorage.getItem("token");
    const res=await axios.get("http://localhost:3000/group/allusers",{headers:{"Authorization":token}})
    console.log(res);
    const user1 =res.data.user;
    user1.forEach((user)=>{
        const childNodes=`<li class="list-group-item" >${user.email}<input type="hidden" class="user-id" value=${user.id} /></li>`
        listContact.innerHTML +=childNodes;
    })
}

async function addUserToGroup(e){
    try {
        e.preventDefault();
        const addUser={
            groupName:e.target.grpname.value,
            email:e.target.email.value,
            isAdmin:adminTrue.checked===true ? true:false
        }
        console.log("add user data",addUser);
        const token=localStorage.getItem("token");
        const res=await axios.post("http://localhost:3000/group/adduser",addUser,{headers:{"Authorization":token}})
        console.log(res);
    } catch (error) {
        if(error.res.status==500){
            createToast(error.res.data.message);
        }
    }
}

async function removeUser(e){
    try {
        e.preventDefault();
        const removeAnyUser={
            groupName:e.target.removeName.value,
            email:e.target.removeEmail.value

        }
        console.log("removeanyU user data",removeAnyUser);
        const token=localStorage.getItem("token");
        const res=await axios.post("http://localhost:3000/group/deleteuser",removeAnyUser,{headers:{"Authorization":token}})
        console.log(res);
    } catch (error) {
        if(error.res.status==500){
            createToast(error.res.data.message);
        }
    }
}

async function allShowGroup(){
    try {
        createdGroupShow.innerHTML="";
        const token=localStorage.getItem("token");
        const res=await axios.get("http://localhost:3000/group/allgroups",{headers:{"Authorization":token}})
        console.log(res);
        const group1=res.data.group
        console.log(group1)
        group1.forEach((group)=>{
            const childNodes=`<li class="list-group-item" >${group.groupName}<input type="hidden" class="user-id" value=${group.id} /></li>`
            createdGroupShow.innerHTML +=childNodes
    })
    } catch (error) {
        // if(error.res.status==500){
        //     createToast(error.res.data.message);
        // }
        console.log(error);
    }
}

function showScreen(){
    getContacts();
    allShowGroup();
}

window.addEventListener("DOMContentLoaded",showScreen);