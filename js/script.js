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
    
    var xhr = new XMLHttpRequest();
 
   
    var cat = document.getElementById('select-categorias').value;
    var cantidad = document.getElementById('select-cantidad').value;
    var tipo = document.getElementById("select-tipo").value
    
    document.getElementById('expositor').innerHTML = "";
    xhr.open('GET','https://api.thecatapi.com/v1/images/search?api_key=271a4443-418d-4bf3-ae50-7b478da7f770&category_ids='+cat+'&limit='+cantidad+'&mime_types='+tipo, true);
    
    xhr.send();
    
    xhr.onreadystatechange = function(){
        
        if(xhr.readyState == 4 && xhr.status == 200){
            
            var img = "";
            var datos = JSON.parse(xhr.responseText);
            
            for(let c = 0 ; c < cantidad ; c++){
                
                img += "<img class='col-3 col-sm-6' style='height: 20vh;' src='"+datos[c]["url"]+"'>";
                  
            }           

            document.getElementById('expositor').innerHTML += img;
            
        }
        
        else {
            console.log("Ha habido fallos");
        }
        
    }
    
    
    
}