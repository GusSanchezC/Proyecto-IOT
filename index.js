import { getDatabase,ref,onValue,child } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";
import {app} from "./firebase.js"
const db = getDatabase(app)

window.addEventListener('DOMContentLoaded',async (e) =>{
  await show_parqueos()
  show_tabla('entradas')
  show_tabla('salidas')
})
document.getElementById("actualizar").addEventListener('click',function(){
  show_parqueos()
  show_tabla('entradas')
  show_tabla('salidas')
})
async function show_tabla(idd){
  const prueba = child(ref(db), `/registro/${idd}`);
    await onValue(prueba, (snapshot) => {
      let res = document.querySelector(`#horas-${idd}`);
      res.innerHTML=''
      let count = 0
      snapshot.forEach((child) => {
        res.innerHTML +=`
        <tr class="table-active">
        <td class="col">${child.val()}</td>
        ` 
        count+=1
      });
      for (count;count<=10;count++){
        res.innerHTML +=`
        <tr class="table-active">
        <td class="col">--</td>
        ` 
      }
    });
}

async function show_parqueos(){
  const texto = document.getElementById("numero-parqueos")
  const prueba = ref(db,'/parqueos_disponibles/');
  await onValue(prueba, (snapshot) => {
    const data = snapshot.val();
    texto.innerHTML =`Parqueos disponibles: ${10-data}`
    verif_parqueo(data)
  });
}

function verif_parqueo(data){
  const disp = document.getElementById("estado-parqueo")
  if (data == 10){
    disp.innerHTML = "Parqueo Cerrado"
    disp.classList = "no_disponible"
  }
  else{
    disp.innerHTML = "Parqueo Abierto"
    disp.classList = "disponible"
  }
}
