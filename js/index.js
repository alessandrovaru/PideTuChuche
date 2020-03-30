console.log('hola');

let resultado = document.getElementById('container-product');
let sel = document.getElementById('product_category')
let sel1 = document.getElementById('product_category1')
let pContainer = document.getElementById('container-products')
const url = 'https://pidetuchuche-backend.herokuapp.com';
const req = new XMLHttpRequest();
//GET ALL
function getProducts() {
  req.open('GET', url + '/productos', true);
  req.onreadystatechange = function () {
    if(req.readyState === XMLHttpRequest.DONE) {
      let status = req.status;
      if (status === 0 || (200 >= status && status < 400)) {
        let products = JSON.parse(this.responseText);
        console.log(products);
        for (let i = 0; i < products.datos.length; i++) {
          let div = document.createElement('div')
          div.classList.add("container-products");
          div.innerHTML = '<div class="wrapper cards"> <div class="row"> <div class="product-info col"><div class="product-text"><h1>' + products.datos[i].nombre + '</h1><h2>' + products.datos[i].nombre + '</div></div></div></div>';
          pContainer.appendChild(div);

        }
      }
    }
  };
  req.send();
}

//GET categories
function getCategorias() {
  req.open('GET', url + '/categorias', true);
  req.onreadystatechange = function () {
    if(req.readyState === XMLHttpRequest.DONE) {
      console.log('done');
      let status = req.status;
      if (status === 0 || (200 >= status && status < 400)) {
        let categories = JSON.parse(this.responseText);
        console.log(categories);
        for (let i = 0; i < categories.datos.length; i++) {
          let opt = document.createElement('option');
          opt.innerHTML = categories.datos[i].nombre;
          opt.value = categories.datos[i].nombre;
          sel.appendChild(opt);
          let opt1 = opt.cloneNode(true);
          sel1.appendChild(opt1);
        }
      }
    }
  };
  req.send();
}

 window.onload = function() {
  getCategorias();
 };


function printTok() {
  let token = localStorage.getItem('authToken')
  let tokenCapitalized = token.charAt(0).toUpperCase() + token.substring(1);
  console.log(token);
  console.log(tokenCapitalized);
  console.log('hola');
}

function createProduct() {
  let token = localStorage.getItem('authToken');
  let tokenCapitalized = token.charAt(0).toUpperCase() + token.substring(1);
  let product_name = document.getElementById('product_name').value;
  let product_img = document.getElementById('product_img');
  let product_description = document.getElementById('product_description').value;
  let product_quantity = document.getElementById('product_quantity').value;
  let product_priority = document.getElementById('product_priority').value;
  let product_price = document.getElementById('product_price').value;
  let product_discount = document.getElementById('product_discount').value;

  let product_category = document.getElementById('product_category').value;


  const productData = new FormData();

  productData.append("ruta_imagen", product_img.files[0]);
  productData.append("nombre", product_name);
  productData.append("descripcion", product_description);
  productData.append("cantidad", product_quantity);
  productData.append("prioridad", product_priority);
  productData.append("precio", product_price);
  productData.append("descuento", product_discount);
  productData.append("categorias", product_category);

  let producto = {};
  productData.forEach((value, key) => {producto[key] = value});
  let productoJSON = JSON.stringify(producto);

  req.open("POST", url + '/productos', true);

  req.setRequestHeader("Content-type", "application/json");

  req.setRequestHeader("Authorization", tokenCapitalized);
  console.log(productoJSON);
  req.send(productoJSON);

}

//POST LOGIN
function loginOnClick() {

  let inicio = function(callback) {
    if (typeof callback === 'function') {
      callback()
      alert( localStorage.getItem('authToken') );
    }else {
      console.log('no se pudo joto');
      setTimeout( inicio, 500 );
    }
  }

  inicio(function login() {
    let serverResponse = document.getElementById('serverResponse');
    req.open("POST", url + '/login', true);
    req.setRequestHeader("Content-type", "application/json");
    req.onreadystatechange = function wait() {
      if (req.readyState === 4 && req.status === 200) {
        let session = JSON.parse(this.responseText);
        let sessionToken = session.data;
        let authToken = sessionToken.type + ' ' + sessionToken.token;
        localStorage.setItem('authToken', authToken );
        console.log(session);
        console.log(authToken);
      }
    };
    let data = JSON.stringify({ "email": 'admin@pidetuchuche.com', "password": '12345' });
    req.send(data);
  })
}

$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').trigger('focus')
})
