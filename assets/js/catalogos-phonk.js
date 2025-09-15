const productosPhonk = [{
        titulo: "BRAZILIAN VOCALS VOL.2",
        imagen: "images/brazil-vocals.png",
        desc: "+10 vocales Phonk Brasileño (NUEVO)",
        precio: "$2.99 USD"
    },
    {
        titulo: "BRAZILIAN SAMPLES VOL.1",
        imagen: "images/brazilian-samples.png",
        desc: "+20 samples Phonk Brasileño (NUEVO)",
        precio: "$1.99 USD"
    },
    {
        titulo: "BRAZILIAN SAMPLES GEMS",
        imagen: "images/brazilian-sample-gems.jpg",
        desc: "+20 samples Phonk Brasileño GEMS",
        audio: "assets/music/brazilian-sample-gems.mp3",
        precio: "$1.99 USD"
    },
    {
        titulo: "BRAZILIAN SAMPLES FUSION",
        imagen: "images/brazilian-sample-fusion.png",
        desc: "+20 samples Phonk Brasileño FUSION",
        audio: "assets/music/brazilian-phonk-fusion.mp3",
        precio: "$1.99 USD"
    },
    {
        titulo: "BRAZILIAN SAMPLES TRENDS",
        imagen: "images/brazilian-sample-trend.png",
        desc: "+20 samples Phonk Brasileño para TRENDS",
        audio: "assets/music/brazilian-phonk-trends.mp3",
        precio: "$1.99 USD"
    },
    {
        titulo: "BRAZILIAN PHONK DRUM KIT",
        imagen: "images/brazilian-phonk-drum-kit.jpg",
        desc: "+10 kits de Drums para Phonk Brasileño",
        audio: "assets/music/brazilian-phonk-drum-kit.mp3",
        precio: "$1.99 USD"
    },
];



function renderCatalogoPhonk() {
    let html = '';
    productosPhonk.forEach((producto, idx) => {
        if (idx % 3 === 0) {
            if (idx !== 0) html += '</div>';
            html += '<div class="row gtr-50 catalogo-phonk">';
        }

        const artistHtml = producto.artista ? `<div class="phonk-artist">${producto.artista}</div>` : '';
        const precioHtml = `<div class="catalog-price grad-text">${producto.precio}</div>`;
        const imgSrc = producto.imagen || '';
        const audioSrc = producto.audio || '';
        const desc = producto.desc || '';
        const titulo = producto.titulo || '';

        const audioHtml = audioSrc ?
            `<audio controls id="audio${idx+1}" style="width:100%;height:48px;margin:0.5em 0 0.7em 0;" onplay="this.volume=0.04" onvolumechange="this.volume=Math.min(this.volume,0.5)" controlsList="nodownload noplaybackrate">
            <source src="${audioSrc}" type="audio/mpeg">
            Tu navegador no soporta el elemento de audio.
           </audio>` :
            '';

       const mediaHtml = (audioSrc ? audioHtml : '') + (desc ? `<p class="catalog-desc">${desc}</p>` : '');

        html += `
        <div class="col-4 col-12-mobile">
            <section class="catalog-card">
                ${precioHtml}
                <a href="#" class="image fit"><img src="${imgSrc}" alt="${titulo}" /></a>
                <header>
                    <h3 class="phonk-title" style="font-size:1.3em;">${titulo}</h3>
                    ${artistHtml}
                </header>
                ${mediaHtml}
                <div class="catalog-actions">
                    <button class="btn-catalog buy">Comprar</button>
                    <button class="btn-catalog cart"
                    data-titulo="${titulo}"
                    data-precio="${producto.precio}"
                    data-imagen="${imgSrc}"
                    >Añadir al carro</button>
                </div>
            </section>
        </div>
        `;
    });
    html += '</div>';
    const cont = document.getElementById('catalogo-phonk-container');
    if (cont) cont.innerHTML = html;

    document.querySelectorAll('.btn-catalog.cart').forEach(btn => {
        btn.addEventListener('click', function() {
            const producto = {
                titulo: this.dataset.titulo,
                precio: this.dataset.precio,
                imagen: this.dataset.imagen
            };

            let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
            carrito.push(producto);
            localStorage.setItem('carrito', JSON.stringify(carrito));
            alert('Si se añadió el producto, verás este mensaje');
        });
    });
}