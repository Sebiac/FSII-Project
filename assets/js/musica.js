// Widget Música - Adaptado para múltiples canciones locales
document.addEventListener('DOMContentLoaded', function() {
    const songs = [
        { title: 'Montagem Xonada', artist: 'MXZI, DJ SAMIR, DJ JAVI26', src: 'assets/music/song1.mp3', img: 'images/montagem_xonada.jpg' },
        { title: 'Montagem Tomada', artist: 'MXZI', src: 'assets/music/song2.mp3', img: 'images/montagem_tomada.jpg' },
        { title: 'Sem Freio', artist: 'JMILTON, REPSAJ', src: 'assets/music/song3.mp3', img: 'images/sem_freio.jpg' }
    ];
    let currentSong = 0;
    const audio = document.getElementById('audioSrc');
    const audioSource = document.getElementById('audioSource');
    const playpause = document.getElementById('playpause');
    const vynlId = document.getElementById('vynl-id');
    const nowPlayingBoardId = document.getElementById('now-playing-board-id');
    const nowPlayingBoardBottomBarId = document.getElementById('now-playing-board-bottom-bar-id');
    const range = document.getElementById('range');
    const completionBar = document.getElementById('completionBar');
    const songTitle = document.getElementById('song-title');
    const prevBtn = document.getElementById('prev-song');
    const nextBtn = document.getElementById('next-song');
    const volumeSlider = document.getElementById('volume-slider');
    const songArtist = document.getElementById('song-artist');

    function loadSong(index, autoPlay) {
        const song = songs[index];
        audioSource.src = song.src;
        audio.load();
        songTitle.textContent = song.title;
        if (songArtist) songArtist.textContent = song.artist;
        range.value = 0;
        completionBar.style.width = '0%';
        // No cambiar imagen de disco
        // Cambiar imagen de portada
        if (vynlId) {
            vynlId.src = song.img;
        }
        // Volumen al 5% por defecto
        if (volumeSlider) {
            volumeSlider.value = 0.5;
            audio.volume = 0.005;
        }
        // Always reset play icon to play when loading a new song
        const icon = document.getElementById('playpause-icon');
        if (icon) {
            icon.classList.remove('fa-pause');
            icon.classList.add('fa-play');
        }
        playpause.classList.remove('pause-circle');
        playpause.classList.add('play-circle');
        // Autoplay si se solicita
        if (autoPlay) {
            setTimeout(() => { audio.play().catch(() => {}); }, 100);
        }
    }

    function playPause() {
        const icon = document.getElementById('playpause-icon');
        if (audio.paused) {
            vynlId.classList.add('vynl-animation');
            audio.play();
            playpause.classList.remove('play-circle');
            playpause.classList.add('pause-circle');
            if (icon) {
                icon.classList.remove('fa-play');
                icon.classList.add('fa-pause');
            }
        } else {
            vynlId.classList.remove('vynl-animation');
            audio.pause();
            playpause.classList.remove('pause-circle');
            playpause.classList.add('play-circle');
            if (icon) {
                icon.classList.remove('fa-pause');
                icon.classList.add('fa-play');
            }
        }
    }

    playpause.addEventListener('click', playPause);
    prevBtn.addEventListener('click', function() {
        currentSong = (currentSong - 1 + songs.length) % songs.length;
        loadSong(currentSong);
        if (playpause.classList.contains('pause-circle')) audio.play();
    });
    nextBtn.addEventListener('click', function() {
        currentSong = (currentSong + 1) % songs.length;
        loadSong(currentSong);
        if (playpause.classList.contains('pause-circle')) audio.play();
    });

    range.addEventListener('input', function() {
        completionBar.style.width = this.value + '%';
        audio.currentTime = (this.value / 100) * audio.duration;
    });

    audio.ontimeupdate = function() {
        if (audio.duration) {
            const percent = (audio.currentTime / audio.duration) * 100;
            completionBar.style.width = percent + '%';
            range.value = percent;
        }
    };

    audio.onended = function() {
        nextBtn.click();
    };

    // (Eliminado código de fullscreen que dependía de un elemento inexistente)
    // Volumen
    if (volumeSlider) {
        // Ajustar el rango del slider: 0.5 a 3 (representa 0.5% a 3%)
        volumeSlider.min = 0.5;
        volumeSlider.max = 3;
        volumeSlider.step = 0.1;
        volumeSlider.value = 0.5;
        // Sincroniza el valor inicial del slider y el volumen del audio
        function setVolumeFromSlider() {
            audio.volume = Math.max(0.005, Math.min(0.03, volumeSlider.value / 100));
        }

        function setSliderFromVolume() {
            volumeSlider.value = (audio.volume * 100).toFixed(1);
        }
        setSliderFromVolume();
        setVolumeFromSlider();
        volumeSlider.addEventListener('input', setVolumeFromSlider);
        audio.addEventListener('volumechange', setSliderFromVolume);
    }

    // Inicializar con autoplay
    loadSong(currentSong, true);
});