const urlCategorias =
  "https://api.thecatapi.com/v1/categories";
const urlRazas =
  "https://api.thecatapi.com/v1/breeds";
const categoriasInput = document.getElementById("select-categorias");
const razasInput = document.getElementById('select-razas');
var api_key="271a4443-418d-4bf3-ae50-7b478da7f770";
var pagina = 1;

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

// Hacemos una petición AJAX para crear las categorias
getJSON(urlCategorias).then(
  function(data) {
    data.forEach(function(categoria) {
      option = document.createElement("option");
      option.setAttribute("value", categoria.id);
      option.innerHTML = categoria.name;
      categoriasInput.appendChild(option);
    });
  },
  function(status) {
    alert("Algo fue mal.");
  }
);
// Select de razas
/* getJSON(urlRazas).then(
  function(data) {
    data.forEach(function(raza) {
      option = document.createElement("option");
      option.setAttribute("value", raza.id);
      option.innerHTML = raza.name;
      razasInput.appendChild(option);
    });
  },
  function(status) {
    alert("Algo fue mal.");
  }
);
*/

// El resto de funciones o lo que sea
function resultadoCat(){
    
  // Crear request
    var xhr = new XMLHttpRequest();
 
  // Recoger los valores para la busqueda
    var cat = document.getElementById('select-categorias').value;
    var cantidad = document.getElementById('select-cantidad').value;
    var tipo = document.getElementById("select-tipo").value
    
  // Limpiar la parte de la página en la que saldrán
    document.getElementById('expositor').innerHTML = "";

    // Llamada a la api para obtener lo que sea, en este caso fotos de esas pequeñas y adorables bolas de pelo con cuchillos en las patas
    xhr.open('GET','https://api.thecatapi.com/v1/images/search?api_key=271a4443-418d-4bf3-ae50-7b478da7f770&category_ids='+cat+'&limit='+cantidad+'&mime_types='+tipo, true);    
    xhr.send();
    
    // Una vez se haya realizado la llamada, cambiar la página
    xhr.onreadystatechange = function(){
        
        //Comprobar que todo ha ido bien
        if(xhr.readyState == 4 && xhr.status == 200){
            
          // Crear string para añadir las cosas después a la zona en la que se mostrará
            var img = "";

            // Interpretar los datos obtenidos
            var datos = JSON.parse(xhr.responseText);
            

            // Bucle porque queremos más de una foto, en caso de que fuese solo una, el for es innecesario, pero no falla
            for(let c = 0 ; c < cantidad ; c++){
                
                img += "<img class='col-sm-10 col-md-4 col-lg-3' style='height: 20vh;' src='"+datos[c]["url"]+"'>";
                  
            }           

            // Añadir todo a la página para visualizarlo
            document.getElementById('expositor').innerHTML += img;
            
        }
        
        else {
          // JA!JA! Ahora puedes ir a la esquina a llorar
            console.log("Ha habido fallos");
        }
        
    }
    
    
    
}