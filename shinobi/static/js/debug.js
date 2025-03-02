function getCookie(name) {
    let cookieValue = null;
    if (document.cookie) {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
function debug(){
    let form = document.querySelector('#debug');
    
    form.onsubmit = e => {
        e.preventDefault();
    };
    grabFormDataDebug();
    
}
function grabFormDataDebug(){
    let areatexto = document.querySelector('textarea[name="debugtexto"]').value;
    let emailUser = document.querySelectorAll('div[name="perfilUser"] span')[0].innerHTML;
    let senhaUser = document.querySelectorAll('div[name="perfilUser"] span')[1].innerHTML;
    let opcao = document.querySelector('select').value;
    if (areatexto == 'html:5'){
        document.querySelector('textarea[name="debugtexto"]').value = '<!DOCTYPE html>\n<html lang="pt-br">\n<head>\n   <meta charset="UTF-8">\n   <meta name="viewport" content="width=device-width, initial-scale=1.0">\n   <meta http-equiv="X-UA-Compatible" content="ie=edge">\n   <title>Document</title>\n</head>\n<body>\n\n</body>\n</html>';       
    }
    else{
        let debug = {
          linguagem: opcao,
          texto: areatexto,
          email:emailUser,
          senha:senhaUser
        };
        let data = new FormData();
        data.append( "json", JSON.stringify( debug ) );
        return submitFormDebug(data);
    }
}




function submitFormDebug(data){
    let csrftoken = getCookie('csrftoken');
    fetch("/console",
    {
        headers: {"X-CSRFToken": csrftoken},
        method: "POST",
        body: data
    })
    .then(function(res){ 
        return res.json(); 
    })
    .then(function(data){
       let erros_json = JSON.stringify( data )
       let erros = JSON.parse(erros_json)
       document.querySelector('#debug_resposta').value = erros.texto;
       document.querySelectorAll('div[name="perfilUser"] span')[2].innerHTML = erros.numeroLinhas;
       document.querySelectorAll('div[name="perfilUser"] span')[3].innerHTML = erros.numeroErros;

    })
}

// Arrastar elementos
document.querySelector("#quadradoDebug").style.zIndex = "1";
let quadradoDebug = document.querySelector("#quadradoDebug");
let quadradoResposta = document.querySelector("#quadradoResposta");
let  elementoPX = 0;
let  elementoPY = 0;
let elemento;
let contador = 0;
function segurarElemento(e) {
    elemento = e.target;
    contador += 1;
    elemento.style.zIndex = contador;
    elementoPX = e.pageX - elemento.offsetLeft;
    elementoPY = e.pageY - elemento.offsetTop;

    addEventListener("mousemove", moverElemento);
    addEventListener("mouseup", soltarElemento);
}
    
function moverElemento(e) {
    elemento.classList.remove("debugResposta");
    elemento.classList.remove("debug");
    elemento.style.left = (e.pageX - elementoPX) + 'px';
    elemento.style.top = (e.pageY - elementoPY) + 'px';
}
    
function soltarElemento() {
    removeEventListener("mousemove", moverElemento);
    removeEventListener("mouseup", soltarElemento);
}

quadradoDebug.addEventListener("mousedown",segurarElemento);
quadradoResposta.addEventListener("mousedown",segurarElemento);


function exibirPerfil(){
    document.querySelector('div[name="perfilUser"]').classList.toggle('invisivel');
}