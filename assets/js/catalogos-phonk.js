export const productosPhonk = [
    {
        titulo: "BRAZILIAN VOCALS",
        imagen: "images/brazil-vocals.png",
        desc: "+10 vocales estilo Phonk Brasileño",
        precio: "$2.99 USD"
    },
    {
        titulo: "BRAZILIAN SAMPLES",
        imagen: "images/brazilian-samples.png",
        desc: "+20 samples estilo Phonk Brasileño",
        precio: "$1.99 USD"
    },
    {
        titulo: "Sem Freio",
        artista: "JMILTON, REPSAJ",
        imagen: "images/sem_freio.jpg",
        audio: "assets/music/song3.mp3",
        precio: "$1.99 USD"
    },
    {
        titulo: "VEM NO PIQUE",
        artista: "MAFIA",
        imagen: "images/vem-no-pique.jpg",
        audio: "assets/music/song4.mp3",
        precio: "$1.99 USD"
    },
    {
        titulo: "ACELERADA",
        artista: "SMA$HER",
        imagen: "images/acelerada.jpg",
        audio: "assets/music/song5.mp3",
        precio: "$1.99 USD"
    },
    {
        titulo: "Montagem Xonada",
        artista: "MXZI, DJ SAMIR, DJ JAVI26",
        imagen: "images/montagem_xonada.jpg",
        audio: "assets/music/song6.mp3",
        precio: "$1.99 USD"
    },
    {
        titulo: "VEI SEI",
        artista: "repsaj",
        imagen: "images/vei_sei.jpg",
        audio: "assets/music/song7.mp3",
        precio: "$1.99 USD"
    }
];



export function renderCatalogoPhonk() {
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

        const audioHtml = audioSrc
            ? `<audio controls id="audio${idx+1}" style="width:100%;margin:0.5em 0 0.7em 0;" onplay="this.volume=0.02" onvolumechange="this.volume=Math.min(this.volume,0.06)" controlsList="nodownload noplaybackrate novolume">
                    <source src="${audioSrc}" type="audio/mpeg">
                    Tu navegador no soporta el elemento de audio.
               </audio>`
            : '';

        const mediaHtml = audioSrc
            ? audioHtml
            : (desc ? `<p class="catalog-desc">${desc}</p>` : '');

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
                    <button class="btn-catalog cart">Añadir al carro</button>
                </div>
            </section>
        </div>
        `;
    });
    html += '</div>';
    const cont = document.getElementById('catalogo-phonk-container');
    if (cont) cont.innerHTML = html;
}