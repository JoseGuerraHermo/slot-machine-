//inicio de juego
let inicJueg = document.querySelector('#iniciarJuego');
let monedas = 0;
let mostrarMonedas = document.querySelector(".monedas");


//bloqueamos la partida hasta disponer de monedas
let bloquearJuego = document.querySelector('#jugada');
bloquearJuego.disabled = true;
bloquearJuego.classList.add('off')

//boton anhadir monedas
function anadirMoneda(){
     monedas++;
     // console.log(monedas)
     mostrarMonedas.innerHTML = monedas;
}

//bloquear boton anhadir monedas para jugar
function iniciarJuego(){
     const botonMonedas = document.querySelector('#anadirMoneda');
     botonMonedas.disabled = true;
     botonMonedas.classList.add('off')
     bloquearJuego.disabled = false;
     bloquearJuego.classList.remove('off')

}
//reinicio de partida
function reinciarPartida(){
     const botonMonedas = document.querySelector('#anadirMoneda');
     botonMonedas.disabled = false;
     botonMonedas.classList.remove('off')
     monedas = 0;
     mostrarMonedas.innerHTML = monedas;
     document.querySelector('.resultado').innerHTML = "Tira para conocer tu suerte!";
     inicJueg.classList.remove('off')
     inicJueg.disabled = false;
}

function jugada(){

    if(monedas != 0){
          //restamos la partida y actualizamos el valor de las monedas
          //mostrarMonedas.innerHTML = --monedas;
          monedas--;
        // valores de las imagenes 
         let cuadradoUno = ['aguacate', 'ajo', 'cebolla', 'pepino', 'puerro', 'tomate', 'zanahoria'];
         let cuadradoDos = ['aguacate', 'ajo', 'cebolla', 'pepino', 'puerro', 'tomate', 'zanahoria'];
         let cuadradoTres = ['aguacate', 'ajo', 'cebolla', 'pepino', 'puerro', 'tomate', 'zanahoria'];


        //generar valor aleatorio
          function numeroAleatorio(){
               return Math.floor(Math.random()*7);
          }

          //valores random  de cada casilla 
        const resultadoUno = cuadradoUno[numeroAleatorio()];
        const resultadoDos = cuadradoDos[numeroAleatorio()];
        const resultadoTres = cuadradoTres[numeroAleatorio()];
          //guardamos los valores en string
        //let resultadoArray = [resultadoUno, resultadoDos, resultadoTres];
        let resultadoArray = [resultadoUno, resultadoDos, resultadoTres];

          let resultadoString = resultadoArray.toString();
        
          // crear image src para mostrar resultado
          let img_uno = document.querySelector('#imgUno');
          img_uno.src= `./img/${resultadoUno}.png`;
          let img_dos = document.querySelector('#imgDos');
          img_dos.src= `./img/${resultadoDos}.png`;
          let img_tres = document.querySelector('#imgTres');
          img_tres.src= `./img/${resultadoTres}.png`;




     // Llamamos a la funcion sumar valores resultado
        //debugger;
        const sumaValores = calcularValores(resultadoArray);


        monedas += sumaValores;

        mostrarMonedas.innerHTML = monedas;

     let listaBase = document.querySelector('.listaBase');
     let listaItem = `<li id="item"><p> <span class="liResultado">Resultado:</span>
          <span>${resultadoString}</span>. <span class="liBonus">Bonus</span>: 
          <span>${sumaValores}</span>. <span class="liMonedas">Monedas restantes:</span> 
          <span>${monedas}</span></p></li>`


     listaBase.insertAdjacentHTML("beforeend", listaItem);


      } else {
          document.querySelector('.resultado').innerHTML = "No tienes monedas, reinicia el juego";
          bloquearJuego.disabled = true;
          bloquearJuego.classList.add('off')
          inicJueg.classList.add('off')
          inicJueg.disabled = true;

     }
    
}

function alertaPuntos(){
     alert(monedas);
}

function calcularValores(resultado){

     const arrOpcionesPosibles = ['aguacate', 'ajo', 'cebolla', 'pepino', 'puerro', 'tomate', 'zanahoria'];
     let valorJugada = 0;
     arrOpcionesPosibles.forEach( op => {
          const occurNum = calcularOccurrencias(resultado, op);
          if (occurNum === 0) return;
          if (occurNum === 3 && op === 'zanahoria') {
               valorJugada = 10;
               return valorJugada;
          };
          switch (op) {
               case 'zanahoria':
                    valorJugada = (occurNum === 2) ? 4 : 1 ;
               break;
               default:
                    valorJugada = (occurNum > 1) ? 
                                        ((occurNum === 2 && resultado.includes('zanahoria')) ?
                                             (3)
                                                  :
                                             ((occurNum === 3) ? 5 : 3))
                                             :
                                        ((occurNum === 1 && resultado.includes('zanahoria')) ? 
                                             (1) 
                                                  : 
                                             (valorJugada>0) ? 3 : 0);
               break;
          }
     })

     return valorJugada;
}

function calcularOccurrencias(resultado, valor) {
     return resultado.reduce((res, val) => (val === valor ? res + 1 : res), 0);
}

