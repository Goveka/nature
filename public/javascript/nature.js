const likesBtn=document.querySelectorAll(".likesBtn");
const downloadBtn=document.querySelectorAll(".downloadBtn");

// sending the updates for likes to the server
likesBtn.forEach(function(button){
    
    button.addEventListener('click', ()=>{
        button.style.color="red";
        const id= button.parentElement.parentElement.id
        const request= new XMLHttpRequest();
        request.open('Post', '/update-likes');
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        request.send(`id=${id}`);

        let like= button.lastElementChild;
        let addLike=Number(like.innerText);
        button.lastElementChild.innerText=addLike +1;
    
    });
});
// sending updates for downloads to the server

downloadBtn.forEach(function(button){
    
    button.addEventListener('click', ()=>{
        const id= button.parentElement.parentElement.id
        const request= new XMLHttpRequest();
        request.open('Post', '/update-downloads');
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        request.send(`id=${id}`);

        let like= button.lastElementChild;
        let addLike=Number(like.innerText);
        button.lastElementChild.innerText=addLike +1;
    
    });
});

