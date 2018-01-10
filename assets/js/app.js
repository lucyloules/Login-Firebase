 /*Registro de nuevos usuarios*/
function registrar(){
    //console.log('diste click en Ingresar');
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    //console.log(email);
    //console.log(password); 
   
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function (){
      verificarEmail()
    })
    .catch(function(error) { //promesa catch, si la autentificacion no ocurre catch ejecuta una funcion con parametro e, donde e guardo 2 errores en variables
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        // ...
    });

  }

/*Ingreso usuarios o logueo*/
function ingresar(){
    //console.log('diste click en Ingresar');
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    //console.log(email);
    //console.log(password); 

    firebase.auth().signInWithEmailAndPassword(email, password)
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
       // ...
    });
}

/*función que observa la sesion activa de un usuario*/
function observador(){
  //Siexiste un cambio de usuario, se ejecuta un if y caso contrario ejecuta un else
  firebase.auth()
  .onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    aparece();
    console.log('Existe usuario activo');
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.photoURL;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    var providerData = user.providerData;
  } else {
    // No user is signed in.
    console.log('No existe usuario activo');
  }
});
}
observador(); //se ejecutacuando se carga la practica

/*Contenido para usuarios logueados*/
function aparece(){
  var contenido = document.getElementById('contenido');
  //contenido.innerHTML = 'prueba del perfil usuario';
  /*Comillas especiales nos permiten hacer template donde podemos escribir codigo html en el codigo javascript*/
  contenido.innerHTML = `<p>Bienvenido</p>  
  <button onclick="cerrar()">Cerrar sesión</button>

  `;
}
/*Funcion para desloguearse Pendiente de terminar*/
function cerrar(){
    firebase.auth().signOut() // Cierra sesion desde firebase, toma 2 parametros then y catch
    .then(function() { // (respuesta positiva)
    // Sign-out successful.
        console.log('Sesión cerrada');

     }).catch(function(error) {//(respuesta negativa)/error : parametro
    // An error happened.
    console.log(error);
    });
}

/*Envía un mensaje de verificación al usuario*/
function verificarEmail(){
  var user = firebase.auth().currentUser;

  user.sendEmailVerification()
  .then(function() { // (respuesta positiva)
  // Email sent.
  console.log("Correo enviado con éxito"); //muestra un mensaje que 
  }).catch(function(error) {//(respuesta negativa)
  // An error happened.
  console.log(error); //pinta error de verificacion
  });
}