document.addEventListener('DOMContentLoaded', function () {
    const songsUrl = 'assets/data/music.json';

    fetch(songsUrl)
        .then(res => {
            if (!res.ok) throw new Error('Network response was not ok');
            return res.json();
        })
        .then(songs => {
            if (!Array.isArray(songs) || songs.length === 0) {
                console.error('songs.json vacío o con formato incorrecto');
                return;
            }

            let currentSong = 0;

            const audio = document.getElementById('audioSrc');
            audio.addEventListener('play', function () { updatePlayIcon(true); });
            audio.addEventListener('pause', function () { updatePlayIcon(false); });
            const audioSource = document.getElementById('audioSource');
            const playpause = document.getElementById('playpause');
            const vynlId = document.getElementById('vynl-id');
            const range = document.getElementById('range');
            const completionBar = document.getElementById('completionBar');
            const songTitle = document.getElementById('song-title');
            const prevBtn = document.getElementById('prev-song');
            const nextBtn = document.getElementById('next-song');
            const volumeSlider = document.getElementById('volume-slider');
            const songArtist = document.getElementById('song-artist');

            if (!audio || !audioSource) {
                console.error('Elementos de audio no encontrados en el DOM (audioSrc/audioSource)');
                return;
            }

            // Iniciales para sliders y barras
            audio.volume = 0.05;
            if (volumeSlider) {
                volumeSlider.min = 0;
                volumeSlider.max = 100;
                volumeSlider.step = 1;
                volumeSlider.value = Math.round(audio.volume * 100);
            }
            if (range) {
                range.min = 0;
                range.max = 100;
                range.step = 0.1;
                range.value = 0;
            }
            if (completionBar) completionBar.style.width = '0%';

            function updatePlayIcon(isPlaying) {
                const icon = document.getElementById('playpause-icon');
                if (icon) {
                    icon.classList.toggle('fa-play', !isPlaying);
                    icon.classList.toggle('fa-pause', isPlaying);
                }
                if (playpause) {
                    playpause.classList.toggle('play-circle', !isPlaying);
                    playpause.classList.toggle('pause-circle', isPlaying);
                }
            }

            function loadSong(index, autoPlay = false) {
                console.log('loadSong()', index);
                currentSong = ((index % songs.length) + songs.length) % songs.length;
                const s = songs[currentSong] || {};
                console.log('song to load:', s);

                // Si el elemento audio soporta src directo, úsalo (más fiable)
                if (audio && typeof audio.tagName === 'string' && audio.tagName.toLowerCase() === 'audio') {
                    audio.src = s.src || '';
                } else if (typeof audioSource !== 'undefined' && audioSource) {
                    audioSource.src = s.src || '';
                }

                try { audio.load(); } catch (e) { console.warn('audio.load() falló', e); }

                if (songTitle) songTitle.textContent = s.title || '';
                if (songArtist) songArtist.textContent = s.artist || '';
                if (vynlId && s.img) vynlId.src = s.img;
                if (range) range.value = 0;
                if (completionBar) completionBar.style.width = '0%';
                updatePlayIcon(false);

                if (autoPlay) {
                    audio.play().catch(err => {
                        console.warn('Autoplay bloqueado o error en play():', err);
                    });
                    // actualiza icono según estado real
                    setTimeout(() => updatePlayIcon(!audio.paused), 150);
                }
            }

            function playPause() {
                if (audio.paused) {
                    audio.play().catch(() => {});
                    if (vynlId) vynlId.classList.add('vynl-animation');
                    updatePlayIcon(true);
                } else {
                    audio.pause();
                    if (vynlId) vynlId.classList.remove('vynl-animation');
                    updatePlayIcon(false);
                }
            }

            if (playpause) playpause.addEventListener('click', playPause);

            if (prevBtn) prevBtn.addEventListener('click', function () {
                currentSong = (currentSong - 1 + songs.length) % songs.length;
                loadSong(currentSong, true);
            });

            if (nextBtn) nextBtn.addEventListener('click', function () {
                currentSong = (currentSong + 1) % songs.length;
                loadSong(currentSong, true);
            });

            if (range) {
                range.addEventListener('input', function () {
                    if (!audio.duration) return;
                    const pct = parseFloat(this.value);
                    completionBar && (completionBar.style.width = pct + '%');
                    audio.currentTime = (pct / 100) * audio.duration;
                });
            }

            audio.addEventListener('timeupdate', function () {
                if (!audio.duration) return;
                const percent = (audio.currentTime / audio.duration) * 100;
                if (completionBar) completionBar.style.width = percent + '%';
                if (range) range.value = percent;
            });

            audio.addEventListener('ended', function () {
                if (nextBtn) nextBtn.click();
            });

            if (volumeSlider) {
                volumeSlider.addEventListener('input', function () {
                    audio.volume = Math.max(0, Math.min(1, this.value / 100));
                });
                audio.addEventListener('volumechange', function () {
                    volumeSlider.value = Math.round(audio.volume * 100);
                });
            }

            // Inicializar el primer tema (autoplay opcional)
            loadSong(currentSong, true);
        })
        .catch(err => {
            console.error('No se pudo cargar songs.json:', err);
        });
});