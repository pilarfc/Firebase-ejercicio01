      // Initialize Firebase
      var config = {
        apiKey: "AIzaSyAso0mla0KTBtOf_W3mJoc1cu1_VvkoyUw",
        authDomain: "first-app-1e700.firebaseapp.com",
        databaseURL: "https://first-app-1e700.firebaseio.com",
        projectId: "first-app-1e700",
        storageBucket: "first-app-1e700.appspot.com",
        messagingSenderId: "919762024702"
      };
      firebase.initializeApp(config);

var objDb = { //Objeto de la base de datos
    usuarios: []
};


var formulario = document.getElementById("crear-usuario");
formulario.addEventListener('submit', function(e){
    e.preventDefault();
    var nombre = document.getElementById('name').value; 
    var correo = document.getElementById('email').value; 
    var password = document.getElementById('password').value; 
    objDb.usuarios.push ({
         name: nombre,
         email: correo,
         password: password 
    });
    guardarDatos(objDb); 
});

// Get a reference to the database service
  var database = firebase.database();

function guardarDatos (usuarios) {

// Guardar en BD: Usar el metodo .set(); 
database.ref('/').set(usuarios) 
}
   

function mostrarUsuarios (usuarios) {
    document.getElementById('usuarios').innerHTML = '';
    usuarios.forEach(function(usuario){
        var div = document.createElement('div'); 
        var h3 = document.createElement('h3');
        var parrafo = document.createElement('p'); 
        
        h3.textContent = usuario.name; 
        parrafo.innerHTML = '<strong>Email:</strong>' + usuario.email; 
        
        div.appendChild(h3); 
        div.appendChild(parrafo); 
        
        document.getElementById('usuarios').appendChild(div);
    });
}

//Leer datos: Usar el método .on('value') y escuchar el metodo value. 
database.ref('/usuarios').on('value', function(snapshot) { //un snapshot es la captura de los ultimos datos que obtuvo
    var usuarios = snapshot.val();
    objDb.usuarios = usuarios; //El metodo set sobreescribe los datos y eso no es lo que buscamos, para que el arreglo no inicie vacio, actualizamos el valor del arreglo a lo que nos da la base de datos, es decir va a tomar los datos que ya teniamos almacenados. 
   mostrarUsuarios(usuarios); //se dice que firebase es real time ya que si cambias algo de tu usuario va a detectar los cambios siempre que algo se transforme en el value. 
});


