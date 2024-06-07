document.getElementById('exit').addEventListener('click', function(){
    enlaceClicado('/Front-End/index.html', 5500);
  });

function enlaceClicado(url, puerto) {
    
    const urlConPuerto = `${window.location.protocol}//${window.location.hostname}:${puerto}${url}`;
  
    window.location.href = `${urlConPuerto}`;
   
}