import data from './data/potter/potter.js'
import {orderData, filterGender, filterHouse, filterAncestry, filterStaff} from './data.js'

const dataPotter=data; //creamos una constante de la data que nos entregan
let dataArray=Object.values(dataPotter);//creamos un arreglo de objetos con la data

//Creamos el modal de cada personaje con su correspondiente información
function createModal (dataArray) {
    let modal=document.getElementById("myModal"); //Modal general html
    let modalContainer = document.getElementById("modalContent"); //Modal cuadrito blanco html
    let imgButton=document.getElementsByClassName("imgButton"); //imagen que actua como boton. Ingresada en el js
    modal.style.display = "none"; //Para esconder el modal general al cargar la página
    for(let i=0; i<imgButton.length; i++){ //recorremos el for de las imagenes que creamos
        let img=imgButton[i]; //guardamos cada imagen en una variable con posición i
        img.addEventListener ('click', ()=>{ //agregamos el evento a la imagen
            modal.style.display = "block"; //al hacer click traemos el modal general
            //creamos el modal html en el js. /modal cuadrito blanco
            modalContainer.innerHTML += ` 
            <div class="frame">
                <div class="x">
                    <span class="close">&times;</span>
                </div>
                <div  class="modalCharacters">
                    <div class="characterInformation">
                        <img src="${dataArray[i].image}" alt="" class="imgButton">
                        <h3>${dataArray[i].name}</h3>
                        <p>${dataArray[i].house}</p>
                    </div>
                    <div class="characterInformation2">
                        <p><strong>Especie:</strong> ${translate(dataArray[i].species)}</p>
                        <p><strong>Género:</strong> ${translate(dataArray[i].gender)}</p>
                        <p><strong>Fecha de nacimiento:</strong> ${dataArray[i].dateOfBirth}</p>
                        <p><strong>Año de nacimiento:</strong> ${dataArray[i].yearOfBirth}</p>
                        <p><strong>Ascendencia:</strong> ${translate(dataArray[i].ancestry)}</p>
                        <p><strong>Color de ojos:</strong> ${translate(dataArray[i].eyeColour)}</p>
                        <p><strong>Color de cabello:</strong> ${translate(dataArray[i].hairColour)}</p>
                        <p><strong>Actor/Actriz:</strong> ${dataArray[i].actor}</p>
                        <p><strong>Estado:</strong> ${dataArray[i].alive ? "Vivo" : "Muerto"}</p><br>
                        <h3><strong>Varita mágica</strong></h3>
                        <p><strong>Madera:</strong> ${translate(dataArray[i].wand.wood)}</p>
                        <p><strong>Núcleo:</strong> ${translate(dataArray[i].wand.core)}</p>
                        <p><strong>Longitud:</strong> ${dataArray[i].wand.length}</p>
                        <p><strong>Patronus:</strong> ${translate(dataArray[i].patronus)}</p>
                    </div>
                </div>
            </div>`;
            let span = document.getElementsByClassName("close")[0]; // al momento de cerrar, hace este evento/
            span.addEventListener('click', ()=>{ //evento del click en la x
                modal.style.display = "none"; //Escondemos el modal general
                modalContainer.innerHTML="";  //Limpiamos el modal con la informacion (cuadrito blanco)
            });
        });
        window.onclick = function(event) { //evento para que al hacer click fuera del modal se cierre
            if (event.target == modal) {
              modal.style.display = "none";
              modalContainer.innerHTML="";
            }
        }
    }   
}


//Esconde y trae la página de bienvenida y la página de información
document.getElementById("homePage").style.display = "none"; //escondemos la página de información
let enterButton = document.getElementById("enterButton"); //Guarda boton de ingreso (sombrero)
enterButton.addEventListener('click', ()=>{ //evento click en el botón
    document.getElementById("welcome").style.display = "none";
    document.getElementById("homePage").style.display = "block";
});


//Traemos todos los personajes al inicio de la página
const characters = document.getElementById("characters");
for(let i=0;i<dataArray.length;i++){    //for que recorre la data e inserta todos los personajes en la página principal
   characters.innerHTML += `
   <div  class="root">
        <img src="${dataArray[i].image}" alt="" class="imgButton">
        <h3>${dataArray[i].name}</h3>
        <p>${dataArray[i].house}</p>
    </div>`;
    createModal(dataArray);
}


//Ordenamos todos los personajes en orden alfabético
const select = document.getElementById("alphabeticalSearch");
select.addEventListener("change", () =>{ //creamos un listener para cuando se produzca un cambio en el selector.
    characters.innerHTML = ""; //limpia el div que contiene la información
    dataArray=Object.values(dataPotter); //resetear el orden original de los personajes
    let condition = select.options[select.selectedIndex].index; //guardamos la condición que el usuario seleccionó
    let orderResult = orderData(dataArray, condition); //creamos una nueva variable para el nuevo orden de personajes
    for(let i=0;i<orderResult.length;i++){    //volvemos a colocar los nuevos personajes en el div
        characters.innerHTML += `
        <div id="boton" class="root">
             <img src="${orderResult[i].image}" alt="" class="imgButton">
             <h3>${orderResult[i].name}</h3>
             <p>${orderResult[i].house}</p>
         </div>`;
         createModal(orderResult);
    }
})


//Búsqueda de personajes en tiempo real
let search = document.getElementById("search");
search.addEventListener("keyup",()=>{
    let search = document.querySelector("#search").value; //Traemos la información que ingresa el usuario.
    characters.innerHTML = "";
    const informationSearch = search.toLowerCase(); //convierte lo que ingresa el usuario en minúscula.
    let searchArray=[]; //Declaramos el nuevo arreglo para guardar los resultados de la búsqueda.
    for (let i=0; i<dataArray.length; i++){
        let characterName = dataArray[i].name.toLowerCase(); //Convertimos los nombres de la data en minúscula para comparar.
        if(characterName.indexOf(informationSearch) !== -1){ //Busca dentro de el arreglo, que exista lo que el usuario ingresa.
            searchArray.push(dataArray[i]); //Guardando resultados de la busqueda en arreglo nuevo
        }
    } 
    for(let i=0;i<searchArray.length;i++){ //For que recorre la data nueva e imprime los personajes.
                characters.innerHTML += `
                <div  class="root">
                    <img src="${searchArray[i].image}" alt="" class="imgButton">
                    <h3>${searchArray[i].name}</h3>
                    <p>${searchArray[i].house}</p>
                </div>`; 
                createModal(searchArray);
    }
    if (characters.innerHTML === ""){ //Si el personaje no existe, imprime mensaje.
        characters.innerHTML += `
        <div  class="root">
            <p>Personaje no encontrado...</p>
        </div>`;
    }
})


//Creamos filtro de género
const selectGender = document.getElementById("genderSearch");
selectGender.addEventListener("change", () =>{
    characters.innerHTML = "";
    let gender = selectGender.options[selectGender.selectedIndex].value;
    let genderResult = filterGender(dataArray, gender);
    for(let i=0;i<genderResult.length;i++){    
        characters.innerHTML += `
        <div id="boton" class="root">
             <img src="${genderResult[i].image}" alt="" class="imgButton">
             <h3>${genderResult[i].name}</h3>
             <p>${genderResult[i].house}</p>
         </div>`;
         createModal(genderResult);
    }
})


//Creamos filtro de casa
const selectHouse = document.getElementById("houseSearch");
selectHouse.addEventListener("change", () =>{
    characters.innerHTML = "";
    let house = selectHouse.options[selectHouse.selectedIndex].value;
    let houseResult = filterHouse(dataArray, house);
    for(let i=0;i<houseResult.length;i++){    
        characters.innerHTML += `
        <div id="boton" class="root">
             <img src="${houseResult[i].image}" alt="" class="imgButton">
             <h3>${houseResult[i].name}</h3>
             <p>${houseResult[i].house}</p>
         </div>`;
         createModal(houseResult);
    }
})


//Creamos filtro de linaje
const selectAncestry = document.getElementById("ancestrySearch");
selectAncestry.addEventListener("change", () =>{
    characters.innerHTML = "";
    let ancestry = selectAncestry.options[selectAncestry.selectedIndex].value;
    let ancestryResult = filterAncestry(dataArray, ancestry);
    for(let i=0;i<ancestryResult.length;i++){    
        characters.innerHTML += `
        <div id="boton" class="root">
             <img src="${ancestryResult[i].image}" alt="" class="imgButton">
             <h3>${ancestryResult[i].name}</h3>
             <p>${ancestryResult[i].house}</p>
         </div>`;
         createModal(ancestryResult);
    }
})


//Creamos filtro de rol profesor
const selectStaff = document.getElementById("staffSearch");
selectStaff.addEventListener("change", () =>{
    characters.innerHTML = "";
    let staff = selectStaff.options[selectStaff.selectedIndex].value;
    let staffResult = filterStaff(dataArray, staff);
    for(let i=0;i<staffResult.length;i++){    
        characters.innerHTML += `
        <div id="boton" class="root">
             <img src="${staffResult[i].image}" alt="" class="imgButton">
             <h3>${staffResult[i].name}</h3>
             <p>${staffResult[i].house}</p>
         </div>`;
         createModal(staffResult);
    }
})

function translate(dataArray){
    let traduccion= [];
        if(dataArray == "human"){
            traduccion.push("Humano");
        }if (dataArray == "cat"){
            traduccion.push("Gato");
        }if (dataArray == "half-giant"){
            traduccion.push("Semi gigante");
        }if (dataArray == "werewolf"){
            traduccion.push("Hombre lobo");
        }if (dataArray == "male"){
            traduccion.push("Hombre");
        }if (dataArray == "female"){
            traduccion.push("Mujer");
        }if(dataArray == "half-blood"){
            traduccion.push("Sangre mestiza");
        }if (dataArray == "muggleborn"){
            traduccion.push("Sangre sucia");
        }if (dataArray == "pure-blood"){
            traduccion.push("Sangre pura");
        }if (dataArray == "green"){
            traduccion.push("Verdes");
        }if (dataArray == "brown"){
            traduccion.push("Cafe");
        }if (dataArray == "blue"){
            traduccion.push("Azules");
        }if(dataArray == "grey"){
            traduccion.push("Gris");
        }if (dataArray == "black"){
            traduccion.push("Negro");
        }if (dataArray == "red"){
            traduccion.push("Rojo");
        }if (dataArray == "yellow"){
            traduccion.push("Amarillos");
        }if (dataArray == "blonde"){
            traduccion.push("Rubio");
        }if (dataArray == "bald"){
            traduccion.push("Sin cabello");
        }if (dataArray == "holly"){
            traduccion.push("Acebo");
        }if(dataArray == "vine"){
            traduccion.push("Vid");
        }if (dataArray == "willow"){
            traduccion.push("Sauce");
        }if (dataArray == "hawthorn"){
            traduccion.push("Espino");
        }if (dataArray == "ash"){
            traduccion.push("fresno");
        }if(dataArray == "oak"){
            traduccion.push("Encino");
        }if (dataArray == "cherry"){
            traduccion.push("Cerezo");
        }if (dataArray == "yew"){
            traduccion.push("Tejo");
        }if (dataArray == "cypress"){
            traduccion.push("Cipres");
        }if (dataArray == "walnut"){
            traduccion.push("Nogal");
        }if (dataArray == "cedar"){
            traduccion.push("Cedro");
        }if (dataArray == "birch"){
            traduccion.push("Abedul");
        }if (dataArray == "elm"){
            traduccion.push("Olmo");
        }if (dataArray == "phoenix feather"){
            traduccion.push("Pluma de fenix");
        }if (dataArray == "dragon heartstring"){
            traduccion.push("Fibra de corazón de dragón");
        }if (dataArray == "unicorn tail-hair"){
            traduccion.push("Pelo de cola de unicornio");
        }if (dataArray == "unicorn hair"){
            traduccion.push("Pelo de unicornio");
        }if (dataArray == "stag"){
            traduccion.push("Ciervo");
        }if (dataArray == "otter"){
            traduccion.push("Nutria");
        }if (dataArray == "Jack Russell terrier"){
            traduccion.push("Perro Jack Russell terrier");
        }if (dataArray == "tabby cat"){
            traduccion.push("Gato atigrado");
        }if (dataArray == "swan"){
            traduccion.push("Cisne");
        }if (dataArray == "doe"){
            traduccion.push("Cierva");
        }if (dataArray == "hare"){
            traduccion.push("Liebre");
        }if (dataArray == "horse"){
            traduccion.push("Caballo");
        }if (dataArray == "wolf"){
            traduccion.push("Lobo");
        }if (dataArray == "weasel"){
            traduccion.push("Comadreja");
        }if (dataArray == "lynx"){
            traduccion.push("Lince");
        }if (dataArray == "persian cat"){
            traduccion.push("Gato persa");
        }if (dataArray == ""){
            traduccion.push("No es mencionado");
        }
    console.log("3", traduccion);
    return traduccion;
}