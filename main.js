// AJAX Y FETCH

// AJAX es una tecnología que nos permite hacer peticiones asíncronas a un servidor sin necesidad de recargar la página. Está en desuso

// 1) Primero nos conectamos con la API (en este caso jsonplaceholder, que es una API para practicar con peticiones AJAX)
const url = "https://jsonplaceholder.typicode.com/users";

// 2) Creamos un objeto de tipo XMLHttpRequest, que es un objeto que permite realizar peticiones ajax  
const xhr = new XMLHttpRequest();

// más info: https://developer.mozilla.org/es/docs/Web/API/XMLHttpRequest

// 3) creamos una función manejadora
function manejador() {
    if (this.readyState === 4 && this.status === 200) {
        // qué es readyState? un atributo que indica el estado de la petición. 4 es petition completed.
        // qué es status? un atributo que indica el estado de la respuesta. 200 significa respuesta correcta.

        const datos = JSON.parse(this.response);
        // creo una constante datos que tiene como valor el objeto que me devuelve la respuesta de la petición.

        console.log(datos);

        mostrarUsuarios(datos);
    }
}

// 4) llamar al evento load y pasarle como parámetro la función manejadora.
xhr.addEventListener("load", manejador);

// 5) tengo que abrir la conexión con el método open() y pasarle como parámetro el método de la petición y la url.
xhr.open("GET", url);

// 6) tengo que enviar la petición con el método send.
xhr.send();

//  4 métodos más comunes:
// GET: para pedir información a un servidor.
// POST: para enviar información a un servidor.
// PUT: para actualizar información de un servidor.
// DELETE: para eliminar información de un servidor.


// Creamos una función para mostrar usuarios
const app = document.getElementById("app");

function mostrarUsuarios(datos) {
    datos.forEach(usuario => {
        const li = document.createElement("li");
        li.textContent = `${usuario.id} - ${usuario.name}`;
        app.appendChild(li);
    });
}


// FETCH
// JS tiene fetch() para hacer peticiones HTTP a algún servicio externo.
// como estas peticiones son asincrónicas, fetch trabaja con promesas.

/* sintaxis:
    fetch(url, opciones)
*/
// recibe como primer parámetro la url a la cual hacer la petición, y como segundo parámetro un opcional de configuración

const apiFotos = "https://jsonplaceholder.typicode.com/photos";
const contenedorFotos = document.getElementById("contenedorFotos");

fetch(apiFotos)
    .then(respuesta => respuesta.json())
    .then((datos) => {
        console.log(datos);
        mostrarFotos(datos);
    })
    .catch(error => console.log(error));

// creo una función mostrarFotos que recibe como parámetro "datos".
function mostrarFotos(datos){
    datos.forEach(foto => {
        const img = document.createElement("img");
        img.src = foto.thumbnailUrl;
        contenedorFotos.appendChild(img);
    })
}

// CRIPTO YA API
const criptoYa = "https://criptoya.com/api/dolar";
let divDolar = document.getElementById("dolarHoy");

setInterval(()=>{
    fetch(criptoYa)
        .then(response => response.json())
        .then (({blue, ccb, ccl, mep, oficial, solidario}) => {
            divDolar.innerHTML=`
            <h2>Tipos de dolar: </h2>
            <p>Dolar oficial: ${oficial}</p>
            <p>Dolar solidario: ${solidario}</p>
            <p>Dolar mep: ${mep}</p>
            <p>Dolar ccl: ${ccl}</p>
            <p>Dolar ccb: ${ccb}</p>
            <p>Dolar blue: ${blue}</p>
            `
        })
        .catch(error => console.error(error));
}, 3000);

// RUTAS RELATIVAS: trabajo con un archivo JSON de forma local (ver diapo 65 de la clase 15 de coder)
const listado = document.getElementById("listado");
const listadoProductos = "json/producto.json";

fetch(listadoProductos)
    .then (respuesta => respuesta.json())
    .then (datos => {
        datos.forEach(producto => {
            listado.innerHTML += `
            <h3>Nombre: ${producto.nombre}</h3>
            <strong>Precio: ${producto.precio}</strong>
            <strong>ID: ${producto.id}</strong>
            `
        });
    })
    .catch(error => console.log(error))
    .finally(()=>console.log("proceso finalizado"));