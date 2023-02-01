const likesBtn=document.querySelectorAll(".likesBtn");
const downloadBtn=document.querySelectorAll(".downloadBtn");

// sending the updates for likes to the server
likesBtn.forEach(function(button){
    
    button.addEventListener('click', ()=>{
        button.style.color="red";
        const id= button.parentElement.parentElement.id
        console.log(id);
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
    
    button.addEventListener('click', (e)=>{
        //preparing to download the image
        const imgUrl= e.target.id;
        let xhr= new XMLHttpRequest();
        xhr.open('GET', imgUrl, true);
        xhr.responseType= 'blob';

        xhr.onload= function(e) {
            if(this.status == 200) {
                let blob = new Blob([this.response], {type: 'image/jpeg'});

                // creating url for the image data
                let imageUrl= URL.createObjectURL(blob);
                // creating an anchor tag  with the download property
                let link= document.createElement('a');
                link.href = imageUrl;
                link.download= 'image.jpg'
                // trigger the download
                link.click();
            }
        }
        xhr.send();
        //sending an update of the downloads value to the server
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
