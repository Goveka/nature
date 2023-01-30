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

const submitBtn=document.getElementById('submit').addEventListener('click', (e)=>{
    e.preventDefault;
    const identity= document.getElementById('identity').value == "";
    const description= document.getElementById('description').value == "";
    const imgSrc=document.getElementById('imgSrc').value == "";
    const author=document.getElementById('author').value == "";

 
})