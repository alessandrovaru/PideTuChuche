console.log('hola');


let resultado = document.getElementById('info')


function active() {
  for (let i = 0; i <= 20; i++) {
    let Ch = new XMLHttpRequest();
    let url='https://swapi.co/api/people/';

      Ch.onreadystatechange = function() {
        if (Ch.readyState === 4 && Ch.status === 200) {
            let datos = JSON.parse(Ch.responseText);
            resultado.innerHTML += "This my man " + datos.name + "<br>"
            console.log(datos);
        }
      }

    Ch.open("GET", url + i);
    Ch.send();
  }
}
