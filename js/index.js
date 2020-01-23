console.log('hola');


let resultado = document.getElementById('info')


function active() {
  const Ch = new XMLHttpRequest();
  const url='https://swapi.co/api/people/1';
  Ch.open("GET", url);
  Ch.send();

  Ch.onreadystatechange = function() {
    if (Ch.readyState === 4 && Ch.status === 200) {
      let datos = JSON.parse(Ch.responseText);
      for (let i in datos) {
        resultado.innerHTML += i + ": " + datos[i] + "<br>"
      }
    }
  }

  Ch.open("GET", url, true);
  Ch.send();
}
