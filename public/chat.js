const socket = io('localhost:3000');

socket.on('update_messages', (messages) =>{
    
    // Função criada por nós
    updateChatMessages(messages);
});

function updateChatMessages(messages){

    const div_chat = document.querySelector('#chat');

    let list_messages = '<ul>';

    messages.forEach(message => {
        list_messages += `<li>${message}</li>`
    });
    list_messages += '</ul>';

}

document.addEventListener('DOMContentLoaded',()=>{

    const msg_btn = document.querySelector('#msg_btn')
    .addEventListener('click', (e)=>{
        e.preventDefault();
    })

    const form = document.querySelector('#message_form');
    form.addEventListener('submit', (e) => {
        // evitando comportamento padrão do submit
        e.preventDefault();
        console.log("prevent");

    })

})