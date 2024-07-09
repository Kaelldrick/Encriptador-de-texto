//Llaves de encriptacion y desencriptacion
const llavesDeEncriptacion = {
    a: "ai",
    e: "enter",
    i: "imes",
    o: "ober",
    u: "ufat"
};

const llavesDeDesencriptacion = {
    ai: "a",
    enter: "e",
    imes: "i",
    ober: "o",
    ufat: "u"
};

//Aqui selecciono los elementos para trabajar con ellos
const botonEncriptar = document.querySelector(".boton--encriptar");
const botonDesencriptar = document.querySelector(".boton--desencriptar");
const entradaTextarea = document.querySelector("#entrada-textarea");
const contenedorSalida = document.querySelector(".contenedor__salida");

// Patron para validar la entrada de texto
const patron = /^[a-zñ\s]+$/;
let valorEncriptado;


// Contenido para tema claro y oscuro
function contenidoDinamico(tema) {
    return `<div id="salida__presentacion">
        <img class="salida__imagen" src="img/muñeco-${tema}.svg" width="336" height="304">
        <p>Ningún mensaje fue encontrado</p>
        <p>Ingresa el texto que desees encriptar o desencriptar</p>
    </div>`
}

//Funciones para cambiar de tema

let temaActual = "light";

agregarTema();

function cambiarTema(tema) {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", tema);
    cambiarImagen(tema);
}

function agregarTema() {
    const botonCambiarTema = document.querySelector("#button-theme");
    botonCambiarTema.addEventListener("click", () => {
        const nuevoTema = obtenerNuevoTema(temaActual);
        cambiarTema(nuevoTema);
        temaActual = nuevoTema;
    })
}

function obtenerNuevoTema(tema) {
    return tema === "dark" ? "light" : "dark";
}

function cambiarImagen(tema) {
    const imagen = document.querySelector(".salida__imagen");
    if (imagen !== null) {
        if (tema === "dark") {
            imagen.src = "img/muñeco-dark.svg";
        } else {
            imagen.src = "img/muñeco-light.svg";
        }
    }
}

//Eventos para encriptar y desencriptar

entradaTextarea.addEventListener("input", () => { detectar() });
botonEncriptar.addEventListener("click", (e) => { encriptarDatos(e) });
botonDesencriptar.addEventListener("click", (e) => { desencriptarDatos(e) });

let ContenedorAviso = document.querySelector(".entrada__aviso");
let textoAviso = document.querySelector(".entrada__aviso p");
let simboloDeExclamacion = document.querySelector(".entrada__aviso img");

// Funcion para detectar caracteres no validos

function detectar() {
    valorEncriptado = entradaTextarea.value;
    if (patron.test(valorEncriptado) || valorEncriptado == "") {
        simboloDeExclamacion.src = `img/exclamacion.svg`;
        textoAviso.style.color = "var(--color)";
        botonEncriptar.removeAttribute("disabled");
        botonDesencriptar.removeAttribute("disabled");
    } else {
        simboloDeExclamacion.src = `img/exclamacion_rojo.svg`;
        textoAviso.style.color = "var(--color-aviso)";
        botonEncriptar.setAttribute("disabled", "");
        botonDesencriptar.setAttribute("disabled", "");
    }

    resaltarCaracteresNoPermitidos(valorEncriptado);
}

//Funcion para mostrar los caracteres no permitidos que ingreso el usuario
function resaltarCaracteresNoPermitidos(texto) {
    let textoResaltado = "";
    let caracteresNoValidos = [];
    for (let i = 0; i < texto.length; i++) {
        if (!patron.test(texto[i]) && texto[i] != " ") {
            if (!caracteresNoValidos.includes(texto[i])) {
                caracteresNoValidos.push(texto[i]);
            }
        }
    }

    if (caracteresNoValidos.length > 0) {
        textoResaltado = "Caracteres no válidos: ";
        for (let i = 0; i < caracteresNoValidos.length; i++) {
            textoResaltado += `${caracteresNoValidos[i]}`;
        }
    }
    document.querySelector("#caracter-no-valido").innerHTML = textoResaltado
}

//Funcion para encriptar

function encriptarDatos(e) {
    let textoDelBoton = e.target.textContent;
    valorEncriptado = entradaTextarea.value;
    if (patron.test(valorEncriptado)) {
        valorEncriptado = valorEncriptado.replace(/a|e|i|o|u/g, (valor) => llavesDeEncriptacion[valor]);
        enviarDatos(valorEncriptado, textoDelBoton);
        entradaTextarea.value = "";
    } else {
        enviarDatos(valorEncriptado);
    }
}

//Funcion para desencriptar

function desencriptarDatos(e) {
    let textoDelBoton = e.target.textContent;
    valorEncriptado = entradaTextarea.value;
    valorEncriptado = valorEncriptado.replace(/ai|enter|imes|ober|ufat/g, (valor) => llavesDeDesencriptacion[valor]);
    enviarDatos(valorEncriptado, textoDelBoton);
    entradaTextarea.value = "";
}

//Funcion para enviar datos encriptados o desencriptados

function enviarDatos(valorEncriptado, textoDelBoton) {

    if (valorEncriptado.trim() !== "") {

        contenedorSalida.innerHTML = `<div id="animacion"></div>
                                      <p>${textoDelBoton === "Encriptar" ? "Encriptando" : "Desencriptando"}</p>
        `;
        setTimeout(() => {
            contenedorSalida.innerHTML = `<div id="salida__texto">${valorEncriptado}</div>
                                          <button class="boton  boton--copiar" onclick="Copiar()">Copiar</button>`;
        }, 1500)
    } else {
        contenedorSalida.innerHTML = contenidoDinamico(temaActual);
    }
}

//Funcion para copiar

function Copiar() {
    let textoCopiado = document.querySelector("#salida__texto").textContent;
    let botonCopiar = document.querySelector(".boton--copiar");

    navigator.clipboard.writeText(textoCopiado)
        .then(() => {
            botonCopiar.innerHTML = "Copiado! ☑️";
            setTimeout(() => {
                botonCopiar.innerHTML = "Copiar";
            }, 600)
        })
        .catch((error) => {
            console.log("Sucedio un error", error);
        })
}

