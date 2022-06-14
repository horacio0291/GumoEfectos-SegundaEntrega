// Armado del carrito 
let carrito =[];

for (let i = 0; i < localStorage.length; i++) {
    let clave = localStorage.key(i);
    carrito.push(JSON.parse(localStorage.getItem(clave)))
}
carrito[0].forEach((producto) =>{
    carrito.push(producto)
})

carrito.shift();
console.log(carrito);

// Selección de elementos del DOM
const cartContainer = document.querySelector('#cartContainer');
const cartTotal = document.querySelector('#cartTotal');


// funciones

// Armado de las cards en el carrito
const imprimirCarrito = () => {
    cartContainer.innerHTML = ''
    carrito.forEach((producto) => {
        const cartRow = document.createElement('div')
        cartRow.setAttribute('data-id', producto.id)
        cartRow.className = 'cartRow'
        cartRow.innerHTML = `
        <div class="cartImg">
        <img src="${producto.imagen}">
        </div>
        <div class="cartTitle"><span> Pedal ${producto.nombre}</span></div>
        <div class="cartCant"><span> ${producto.cantidad}</span></div>
        <div class="cartPrice"><span> $${producto.precio * producto.cantidad}</span></div>
        <button class="btn btn-secondary" onclick="eliminarProductoDelCarrito(${producto.id})" class="cartDesc">Remover</button>
        `
        cartContainer.append(cartRow)
        
    })
} 

imprimirCarrito();

// Eliminar producto del carrito
const eliminarProductoDelCarrito = (id) => {      
    carrito.forEach((producto)=>{
        if(producto.id == id){
            producto.cantidad--;
            if(producto.cantidad < 1){
                carrito.splice(carrito.indexOf(producto), 1);
            }
       }
    localStorage.setItem('carrito', JSON.stringify(carrito))
    imprimirCarrito();
    
  });
  cartTotal.innerHTML = `${getTotal()}`;
}

// Obtener total del carrito
const getTotal = () => {
    let total = 0;
    carrito.forEach((producto) => {
        total = producto.precio * producto.cantidad + total;   
    })
    return total;
};

cartTotal.innerHTML = `$${getTotal()}`;


