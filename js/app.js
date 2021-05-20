//variables
const carrito = document.getElementById('carrito');
const lista = document.getElementById('lista-cursos')
const contenedorCarrito = document.querySelector('.u-full-width tbody');
const vaciarCarrito = document.getElementById('vaciar-carrito');
let articulosCarrito = []; 

//eventos
cargarEventos()
function cargarEventos(){
    //cuando agregamos un cruso presionando "agregar al carrito"
    lista.addEventListener('click', añadirCurso);
    //eliminar cursos del carrito
    carrito.addEventListener('click', eliminarCurso);
    //vaciar el carrito
    vaciarCarrito.addEventListener('click',() => {
        articulosCarrito = []; //receteamos el html
        limpiarHtml(); //Eliminamos todo el html
    });
}

//funciones
function añadirCurso(e){
    e.preventDefault();
    //verifica que tenga la clase "agregar-carrito" y luego la añade, caso contrario no!
    if(e.target.classList.contains('agregar-carrito')){
        const curosSeleccionado = e.target.parentElement.parentElement;
        leerDatos(curosSeleccionado);
    }
}

function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const idCurso = e.target.getAttribute('data-id') //eliminamos mediante el id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== idCurso);// elimina del arreglo de articuloscarrito por el id
        carritoHtml();// iterramos sobre el carrito y mostramos de nuevo su html

    }
}

//lee el contenido del html que dimos clip y y obtenemos el contenido
function leerDatos(curso){
       //creamos un objeto con el contenido del div
       const infoCurso = {
           imagen: curso.querySelector('img').src,
           titulo: curso.querySelector('.info-card h4').textContent,
           docente: curso.querySelector('.info-card p').textContent,
           precio: curso.querySelector('.info-card span').textContent,
           id: curso.querySelector('a').getAttribute('data-id'),//obtenermos el id de cada curso
           cantidad: 1
       }
       //revisa si un elemnto ya existe en le carrito
       const existe = articulosCarrito.some(curso => curso.id === infoCurso.id )
       if (existe) {
           //incrementamos la cantidad
           const cursos = articulosCarrito.map(curso =>{
               if(curso.id === infoCurso.id){
                    curso.cantidad++;
                    return curso; //retorna el objeto duplicado
               }else{
                   return curso; //retorna los objetos que no son los duplicados
               }
           })
           articulosCarrito = [...cursos];
       } else {
           //agregamos el producto
           articulosCarrito =[...articulosCarrito,infoCurso];
       }

       carritoHtml();
} 

//muestra el carrito de compras en el html
function carritoHtml(){
    //limpiamos el html
    limpiarHtml();
    //recorre el carrito y genera el html
    articulosCarrito.forEach( curso =>{

        const{imagen,titulo,precio,cantidad,id} = curso;

        const row = document.createElement('tr')
        row.innerHTML = `
        <td><img src="${imagen}" width = 100></td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}"> X </a>  
        `;

        //agregar el html al tbody
        contenedorCarrito.appendChild(row);
    })
}

//elimina los curso del body
function limpiarHtml(){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}