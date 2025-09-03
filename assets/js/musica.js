document.addEventListener('DOMContentLoaded', function() {
    // Selecciona todos los elementos <audio> en la página
    const audios = document.querySelectorAll('audio');
    audios.forEach(audio => {
        // Volumen inicial bajo
        audio.volume = 0.02;
        // Limita el volumen máximo
        audio.addEventListener('volumechange', function() {
            if (audio.volume > 0.06) audio.volume = 0.06;
        });
    });
});