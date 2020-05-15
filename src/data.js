
//Función que ordena de la A-Z, Z-A y resetea el orden original
export const orderData = (dataArray, condition) => {
  let filterOrder = dataArray; //Arreglo nuevo donde guardaremos persojes ordenados
  if(condition==0){ //primera opción que muestra orden original
    return filterOrder;
  }
  if(condition == 1){ //segunda opción que muestra de la A-Z
    filterOrder.sort((a, b) => a.name.localeCompare(b.name)); //Función que ordena los nombres (sort). localcompare para que compare los nombres
    return filterOrder;
  }
  if(condition==2){ // tercera opción, aplicamos reverse para que muestre de la Z-A
    filterOrder.sort((a, b) => a.name.localeCompare(b.name));
    const filterOrderReverse = filterOrder.reverse();
    return filterOrderReverse;
  }
  
}

//Función que filtra por género
export const filterGender = (dataArray, gender) => {
  let filterData = dataArray.filter((dato) => dato.gender === gender); //filtra si encuentra el genero que seleccionó el usuario y lo guarde en un arreglo.
  return filterData;
}

//Función que filtra por casa
export const filterHouse = (dataArray, house) => {
  let dataHouse = dataArray.filter((dato) => dato.house === house);
  return dataHouse;
}

//Función que filtra por linaje
export const filterAncestry = (dataArray, ancestry) => {
  let dataAncestry = dataArray.filter(dato => dato.ancestry === ancestry);
  return dataAncestry;
}

//Función que filtra por rol
export const filterStaff  = (dataArray, staff) => {
  if (staff=="hogwartsStaff"){
    let dataStaff  = dataArray.filter (dato => dato.hogwartsStaff  ===  true);
     return dataStaff;
  }
  if (staff=="hogwartsStudent"){
    let dataStudent  = dataArray.filter (dato => dato.hogwartsStudent  ===  true);
   return dataStudent;
  }
}