function renderPhonkCarrusel() {
    const container = document.querySelector('.reel');
    if (!container) return;
    let html = '';
    productosPhonk.forEach(producto => {
        html += `
        <article>
            <div class="card" style="width: 18rem;">
                <img src="${producto.imagen}" class="card-img-top" alt="${producto.titulo}">
                <div class="card-body">
                    <h5 class="card-title">${producto.titulo}</h5>
                    ${producto.desc ? `<p class="catalog-desc">${producto.desc}</p>` : ''}
                    <div>
                        <a href="../catalogo-phonk-brasileno.html" class="btn-cards">Ver Producto</a>
                    </div>
                </div>
            </div>
        </article>
        `;
    });
    container.innerHTML = html;
}