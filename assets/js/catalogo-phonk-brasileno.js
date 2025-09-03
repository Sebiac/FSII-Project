export const productosPhonk = [
    {
        titulo: "SENTA CARA",
        artista: "JMILTON",
        imagen: "images/senta-cara.jpg",
        audio: "assets/music/song1.mp3",
        precio: "$1.99 USD"
    },
    {
        titulo: "Montagem Tomada",
        artista: "MXZI",
        imagen: "images/montagem_tomada.jpg",
        audio: "assets/music/song2.mp3",
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
        html += `
        <div class="col-4 col-12-mobile">
            <section class="catalog-card">
                <div class="catalog-price grad-text">${producto.precio}</div>
                <a href="#" class="image fit"><img src="${producto.imagen}" alt="${producto.titulo}" /></a>
                <header>
                    <h3 class="phonk-title" style="font-size:1.3em;">${producto.titulo}</h3>
                    <div class="phonk-artist">${producto.artista}</div>
                </header>
                <audio controls id="audio${idx+1}" style="width:100%;margin:0.5em 0 0.7em 0;" onplay="this.volume=0.02" onvolumechange="this.volume=Math.min(this.volume,0.06)" controlsList="nodownload noplaybackrate novolume">
                    <source src="${producto.audio}" type="audio/mpeg">
                    Tu navegador no soporta el elemento de audio.
                </audio>
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

// Agregar segundo catalogo bajo este comment
