console.log('hola');


let resultado = document.getElementById('info')


function active() {
  const Ch = new XMLHttpRequest();
  const url='https://swapi.co/api/people/1';


  Ch.onreadystatechange = function() {
    if (Ch.readyState === 4 && Ch.status === 200) {
      let datos = JSON.parse(Ch.responseText);
      resultado.innerHTML += "This my man " + datos.name + "<br>"
    }
  }

  Ch.open("GET", url);
  Ch.send();

}
