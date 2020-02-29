const urlCategorias =
  "https://api.thecatapi.com/v1/categories";
const urlRazas =
  "https://api.thecatapi.com/v1/breeds";
const rategoria = document.getElementById('rategoria');
var api_key="271a4443-418d-4bf3-ae50-7b478da7f770";
var fotos = [];
var pagina = 0;
var maxImg = "";
var patata = 'category';

window.onload = inicio;

function inicio(){
    
    selectorDeCosas();
    
    document.getElementById('busqueda').addEventListener('click', selectorDeCosas);
    document.getElementById('busqueda1').addEventListener('click', selectorDeCosas);
    
    
}

function selectorDeCosas() {
    
    rategoria.innerHTML = '<option value="">Ninguno</option>';
    
    if(document.getElementById('busqueda').checked){
        
        getJSON(urlCategorias).then(function(data) {
            data.forEach(function(categoria) {
              option = document.createElement("option");
              option.setAttribute("value", categoria.id);
              option.innerHTML = categoria.name;
              rategoria.appendChild(option);
            });
        },
            function(status) {
                alert("Algo fue mal.");
            });
        
        patata = 'category';
        
    }
    
    else {
        
        getJSON(urlRazas).then(
          function(data) {
            data.forEach(function(raza) {
              option = document.createElement("option");
              option.setAttribute("value", raza.id);
              option.innerHTML = raza.name;
              rategoria.appendChild(option);
            });
          },
          function(status) {
            alert("Algo fue mal.");
          }
        );
        patata = 'breed';
    }   
}

// llámada asíncrona con AJAX para categorías
var getJSON = function(url) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open("get", url, true);
    xhr.responseType = "json";
    xhr.onload = function() {
      var status = xhr.status;
      if (status == 200) {
        resolve(xhr.response);
      } else {
        reject(status);
        console.log("algo fue mal");
      }
    };
    xhr.send();
  });
};

// El resto de funciones o lo que sea

function resultadoBusqueda(){
  pagina = 0;
  resultadoCat();
}

function resultadoCat(){

  // Crear request
    var xhr = new XMLHttpRequest();
 
  // Recoger los valores para la busqueda
    var ratval = document.getElementById('rategoria').value;
    var tipo = document.getElementById("select-tipo").value;
    var limite = document.getElementById('select-cantidad').value;
    
    
    var urlBusqueda = 'https://api.thecatapi.com/v1/images/search?api_key=271a4443-418d-4bf3-ae50-7b478da7f770&limit='+limite+'&mime_types='+tipo+'&'+patata+'_ids='+ratval;
    var urlBus = urlBusqueda+'&page='+pagina+'&order=Desc';
    console.log(urlBus)
  // Limpiar la parte de la página en la que saldrán
    document.getElementById('expositor').innerHTML = "";

    // Llamada a la api para obtener lo que sea, en este caso fotos de esas pequeñas y adorables bolas de pelo con cuchillos en las patas
    xhr.open('GET',urlBus, true);    
    xhr.send();
    
    // Una vez se haya realizado la llamada, cambiar la página
    xhr.onreadystatechange = function(){
        
        //Comprobar que todo ha ido bien
        if(xhr.readyState == 4 && xhr.status == 200){

            // Interpretar los datos obtenidos
            var datos = JSON.parse(xhr.responseText);
            maxImg = xhr.getResponseHeader("Pagination-Count");
            fotos = datos;
  
            mostrarFotos();
            
        }
        
        else {
          // JA!JA! Ahora puedes ir a la esquina a llorar
            console.log("Ha habido fallos");
        }
        
    }
    
}


function mostrarFotos(){
        
    document.getElementById('paginaAct').innerHTML = pagina+1+" - "+nPaginas();
    var cantidad = document.getElementById('select-cantidad').value;
    var mostrando = cantidad * pagina;
    
    if(nPaginas() == pagina+1) document.getElementById('sig').style.display = 'none';
    else document.getElementById('sig').style.display = 'inline-block';
    
    if(pagina+1 == 1) document.getElementById('ant').style.display = 'none';
    else document.getElementById('ant').style.display = 'inline-block';
        
    document.getElementById('expositor').innerHTML = "";
    
    for(let c = 0 ; c < cantidad && c < fotos.length ; c++){
        let img = "<img class='col-sm-10 col-md-4 col-lg-3' style='height: 20vh;' src='"+fotos[c]["url"]+"'>";
        document.getElementById('expositor').innerHTML += img;
    }
        
}

var nPaginas = () => {

  return Math.ceil(maxImg/document.getElementById('select-cantidad').value);

}

function pagAnt(){
    pagina -= 1;
    resultadoCat();
}
function pagSig(){
    pagina += 1;
    resultadoCat();
}