const socket = io('localhost:3000');

socket.on('update_messages', (messages) =>{
    
    // Função criada por nós
    updateChatMessages(messages);
});

function updateChatMessages(messages){

    const chat = document.querySelector('#chat');

    let list_messages = '<ul>';

    messages.forEach(message => {
        list_messages += `<li>${message}</li>`
    });
    list_messages += '</ul>';

    chat.innerHTML = list_messages;

   

}

document.addEventListener('DOMContentLoaded',()=>{

   //let msg_btn = document.querySelector('#msg_btn').addEventListener('click', ()=>{console.log("msg_btn")})   
    
    const form = document.querySelector('#message_form');
    form.addEventListener('submit', (e) => {
        // evitando comportamento padrão do submit
        e.preventDefault();
        
        // Enviando mensagem via socket
        // usando o att name que coloquei no html: document.forms[array dos campos do form][name do campo].valor da msg
        const message = document.forms['message_form_name']['form_msg'].value;
        
        // Enviando msg para o back
        socket.emit('new_message', {msg: message});

        console.log(message);
        document.forms['message_form_name']['form_msg'].value = ""; // Limpar input 
    })

})