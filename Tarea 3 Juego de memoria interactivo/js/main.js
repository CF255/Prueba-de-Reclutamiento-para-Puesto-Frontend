//inicializacion de variables
let tarjetasdestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerresultado = null;
let segundoresultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador  = false
let timer = 0;
let tiempoprogresivo = null;

let winaudio = new Audio('./sounds/win.wav');
let clickaudio = new Audio('./sounds/clic.wav');
let wrongaudio = new Audio('./sounds/wrong.wav');
let righaudio = new Audio('./sounds/right.wav');


//apuntando a documento html
let mostrarmovimientos = document.getElementById('movimientos');
let mostraraciertos = document.getElementById('aciertos');
let mostrartiempo = document.getElementById('tiempo');
const juevonuevo = document.getElementById('juevonuevo')

//generacion de numeros aleatorios
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,];
numeros = numeros.sort(()=>{return Math.random()-0.5});


//funcion principal
function destapar(id){
tarjetasdestapadas++;
console.log(tarjetasdestapadas);

if(temporizador == false){
    contartiempo();
    temporizador = true;
}

//funciones
function contartiempo(){
tiempoprogresivo = setInterval(()=>{
        timer++;
        mostrartiempo.innerHTML = `Tiempo: ${timer} s.`;
        if(aciertos == 8){
            clearInterval(tiempoprogresivo);
        }
    },1000)
}

if(tarjetasdestapadas == 1){
    //mostrar primer numero
    tarjeta1 = document.getElementById(id);
    primerresultado = numeros[id];
    tarjeta1.innerHTML = `<img src="./img/${primerresultado}.png" alt="">`;
    clickaudio.play()
    //deshabilitar primer boton
    tarjeta1.disabled = true;
}else if(tarjetasdestapadas == 2){
    //mostrar segundo numero
    tarjeta2 = document.getElementById(id);
    segundoresultado = numeros[id];
    tarjeta2.innerHTML =  `<img src="./img/${segundoresultado}.png" alt="">`;

    //deshabilitar segundo boton
    tarjeta2.disabled = true;


    //incrementar movimientos
    movimientos++;
    mostrarmovimientos.innerHTML = `Movimientos: ${movimientos}`;

    if(primerresultado == segundoresultado){
        //encerar contador tarjetas destapadas
        tarjetasdestapadas = 0;

        //aumento de aciertos
        aciertos++;
        mostraraciertos.innerHTML = `Aciertos: ${aciertos}`;
        righaudio.play();

        //ganar partida
        if(aciertos == 8){
            winaudio.play();
            mostraraciertos.innerHTML = `Aciertos: ${aciertos}`
            mostrarmovimientos.innerHTML = `Movimientos: ${movimientos}`
        }

    }else{
        wrongaudio.play()
        //mostrar valores y taparlos
        setTimeout(()=>{
            tarjeta1.innerHTML = ' ';
            tarjeta2.innerHTML = ' ';
            tarjeta1.disabled = false;
            tarjeta2.disabled = false;
            tarjetasdestapadas = 0;
        },800);
    }
}
}


//boton juego nuevo
juevonuevo.addEventListener("click", () =>{
    location. reload();
});