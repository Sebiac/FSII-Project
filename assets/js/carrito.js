function mostrarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const bunker = document.getElementById('carrito-lista');

    if(!bunker) return;

    if(carrito.length === 0) {
        bunker.innerHTML = '<p class="text-center">Sin productos en el carrito. Prueba a añadir algunos</p>';
        return;
    }

    let html = '<h2>Carrito de Compras</h2><ul class="list-group">';

    carrito.forEach(producto => {
        html += `
        <li class="list-group-item d-flex align-items-center">
            <img src="${producto.imagen}" alt="${producto.titulo}" style="width:50px; height:50px; object-fit:cover; margin-right:10px">
            <span>${producto.titulo} - ${producto.precio}</span>
        </li>
        `;
    });
    html += '</ul>';
    bunker.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', mostrarCarrito);