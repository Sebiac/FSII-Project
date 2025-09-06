const newsBlogs = [{
        idNoticia: "1",
        titulo: "🔥Uno de los nuevos éxitos🔥",
        fecha: "2025-09-06",
        resumen: "Resumen de la noticia",
        desc: "Descripción de la noticia",
        img: "images/sem_freio.jpg"
    },

    {
        idNoticia: "2",
        titulo: "🧐¿Qué estilo de Phonk es mejor?🧐",
        fecha: "2025-09-06",
        resumen: "Resumen de la noticia",
        desc: "Descripción de la noticia",
        img: "images/sem_freio.jpg"
    },

    {
        idNoticia: "3",
        titulo: "🥳Midnight Knight | Lanzamiento Oficial🥳",
        fecha: "2025-09-06",
        resumen: "Resumen de la noticia",
        desc: "Descripción de la noticia",
        img: "images/sem_freio.jpg"
    },
]

function _escapeHtml(s = '') {
    return String(s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function renderNews(containerId = 'news-list') {
    let container = document.getElementById(containerId);

    if (!container) {
        container = document.createElement('div');
        container.id = containerId;
        container.className = 'news-grid';
        const footer = document.getElementById('footer') || document.querySelector('#footer');
        if (footer && footer.parentNode) footer.parentNode.insertBefore(container, footer);
        else document.body.appendChild(container);
    }

    if (!Array.isArray(newsBlogs) || newsBlogs.length === 0) {
        container.innerHTML = '<p>No hay noticias disponibles.</p>';
        return;
    }

    const html = newsBlogs.map(n => {
        const id = encodeURIComponent(n.idNoticia || '');
        const img = _escapeHtml(n.img || '');
        const titulo = _escapeHtml(n.titulo || '');
        const fecha = _escapeHtml(n.fecha || '');
        const resumen = _escapeHtml(n.resumen || '');
        return `
        <article class="news-card" data-id="${id}">
            <div class="card-media"><img src="${img}" alt="${titulo}" class="blog-img"></div>
            <div class="card-content">
                <h3 class="news-title">${titulo}</h3>
                <small class="news-date">${fecha}</small>
                <p class="catalog-desc">${resumen}</p>
                <div class="catalog-actions">
                    <button class="btn-cards open-news" data-id="${id}" aria-label="Abrir noticia">Leer</button>
                </div>
            </div>
        </article>
        `;
    }).join('');

    container.innerHTML = html;
}

// --- Modal logic in-page ---
function _getNewsById(id) {
    return newsBlogs.find(n => String(n.idNoticia) === String(id));
}

function openNewsModal(id) {
    const news = _getNewsById(id);
    if (!news) return;

    // create modal container if not exists
    let modal = document.getElementById('news-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'news-modal';
        modal.className = 'news-modal';
        modal.innerHTML = `
            <div class="news-modal-overlay" data-close="true"></div>
            <div class="news-modal-dialog" role="dialog" aria-modal="true">
                <button class="news-modal-close" aria-label="Cerrar">×</button>
                <div class="news-modal-body">
                    <!-- content injected -->
                </div>
                <div class="news-modal-actions">
                    <button class="news-like" data-id="${id}" aria-label="Like">👍 <span class="count">0</span></button>
                    <button class="news-dislike" data-id="${id}" aria-label="Dislike">👎 <span class="count">0</span></button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    const body = modal.querySelector('.news-modal-body');
    body.innerHTML = `
        <h2 class="modal-title">${_escapeHtml(news.titulo)}</h2>
        <small class="modal-date">${_escapeHtml(news.fecha)}</small>
        <img src="${_escapeHtml(news.img)}" alt="${_escapeHtml(news.titulo)}" class="modal-img">
        <p class="modal-desc">${_escapeHtml(news.desc || news.resumen || '')}</p>
    `;

    // set counts from storage
    const likeBtn = modal.querySelector('.news-like');
    const dislikeBtn = modal.querySelector('.news-dislike');
    const counts = _getLikeCounts(id);
    likeBtn.querySelector('.count').textContent = counts.likes;
    dislikeBtn.querySelector('.count').textContent = counts.dislikes;

    modal.classList.add('open');
}

function closeNewsModal() {
    const modal = document.getElementById('news-modal');
    if (modal) modal.classList.remove('open');
}

// localStorage helpers
function _likeKey(id) { return 'news_votes_' + id; }
function _getLikeCounts(id) {
    try {
        const raw = localStorage.getItem(_likeKey(id));
        if (!raw) return { likes: 0, dislikes: 0 };
        return JSON.parse(raw);
    } catch (e) { return { likes: 0, dislikes: 0 }; }
}
function _setLikeCounts(id, counts) {
    try { localStorage.setItem(_likeKey(id), JSON.stringify(counts)); } catch (e) {}
}
// Storage shape: { likes: number, dislikes: number, user: 'like'|'dislike'|null }
function _ensureCountsShape(obj) {
    return Object.assign({ likes: 0, dislikes: 0, user: null }, obj || {});
}

function _getLikeCounts(id) {
    try {
        const raw = localStorage.getItem(_likeKey(id));
        if (!raw) return { likes: 0, dislikes: 0, user: null };
        return _ensureCountsShape(JSON.parse(raw));
    } catch (e) { return { likes: 0, dislikes: 0, user: null }; }
}

function _setLikeCounts(id, counts) {
    try { localStorage.setItem(_likeKey(id), JSON.stringify(_ensureCountsShape(counts))); } catch (e) {}
}

function _toggleVote(id, type) {
    const counts = _getLikeCounts(id);
    // if user already voted same type -> remove vote
    if (counts.user === type) {
        if (type === 'like') counts.likes = Math.max(0, (counts.likes || 1) - 1);
        else counts.dislikes = Math.max(0, (counts.dislikes || 1) - 1);
        counts.user = null;
        _setLikeCounts(id, counts);
        return counts;
    }

    // switching vote: decrement other if present
    if (counts.user === 'like') counts.likes = Math.max(0, (counts.likes || 1) - 1);
    if (counts.user === 'dislike') counts.dislikes = Math.max(0, (counts.dislikes || 1) - 1);

    // add new vote
    if (type === 'like') counts.likes = (counts.likes || 0) + 1;
    else counts.dislikes = (counts.dislikes || 0) + 1;
    counts.user = type;
    _setLikeCounts(id, counts);
    return counts;
}

// event delegation
document.addEventListener('click', function (e) {
    const openBtn = e.target.closest && e.target.closest('.open-news');
    if (openBtn) {
        const id = openBtn.getAttribute('data-id');
        openNewsModal(id);
        return;
    }

    const modal = document.getElementById('news-modal');
    if (modal) {
        if (e.target.matches('.news-modal-close') || e.target.dataset.close === 'true') {
            closeNewsModal();
            return;
        }
        const like = e.target.closest && e.target.closest('.news-like');
        if (like) {
            const id = like.getAttribute('data-id');
            const updated = _toggleVote(id, 'like');
            // update both buttons counts and active state if present
            const modalRoot = modal;
            if (modalRoot) {
                const lb = modalRoot.querySelector('.news-like');
                const db = modalRoot.querySelector('.news-dislike');
                if (lb) {
                    lb.querySelector('.count').textContent = updated.likes;
                    lb.classList.toggle('active', updated.user === 'like');
                }
                if (db) {
                    db.querySelector('.count').textContent = updated.dislikes;
                    db.classList.toggle('active', updated.user === 'dislike');
                }
            }
            return;
        }
        const dislike = e.target.closest && e.target.closest('.news-dislike');
        if (dislike) {
            const id = dislike.getAttribute('data-id');
            const updated = _toggleVote(id, 'dislike');
            const modalRoot = modal;
            if (modalRoot) {
                const lb = modalRoot.querySelector('.news-like');
                const db = modalRoot.querySelector('.news-dislike');
                if (lb) {
                    lb.querySelector('.count').textContent = updated.likes;
                    lb.classList.toggle('active', updated.user === 'like');
                }
                if (db) {
                    db.querySelector('.count').textContent = updated.dislikes;
                    db.classList.toggle('active', updated.user === 'dislike');
                }
            }
            return;
        }
    }
});

// close modal with Escape
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeNewsModal();
});

// init render
document.addEventListener('DOMContentLoaded', () => renderNews());
