const deleteBtn= document.querySelectorAll('.deleteBtn').forEach(function(button){
  button.addEventListener('click', ()=>{
    const id= button.parentElement.id;
    const request= new XMLHttpRequest();
    request.open('Post', '/delete-objects');
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.send(`id=${id}`);

setTimeout(function(){
    window.location.reload();
}, 1000)

  })
})