// Validación unificada para contacto, login y registro

(function() {
    function validarCampos({ nombre, email, password, confirm, mensaje, tipo }) {
        let errores = [];
        // Nombre: min 10, max 100 (si aplica)
        if (nombre) {
            if (!nombre.value || nombre.value.trim().length < 10 || nombre.value.trim().length > 100) {
                errores.push('El nombre debe tener entre 10 y 100 caracteres');
            }
        }
        // Email: max 100, solo dominios permitidos
        if (email) {
            const emailVal = email.value.trim();
            if (!emailVal || emailVal.length > 100 || !/^.+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/.test(emailVal)) {
                errores.push('Correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com y máximo 100 caracteres');
            }
        }
        // Contraseña: 4 a 10 caracteres
        if (password) {
            if (!password.value || password.value.length < 4 || password.value.length > 10) {
                errores.push('La contraseña debe tener entre 4 y 10 caracteres');
            }
        }
        // Confirmación de contraseña
        if (confirm && password) {
            if (password.value !== confirm.value) {
                errores.push('Las contraseñas no coinciden');
            }
        }
        // Mensaje/comentario: max 500
        if (mensaje) {
            if (!mensaje.value || mensaje.value.trim().length > 500) {
                errores.push('El comentario debe tener máximo 500 caracteres');
            }
        }
        return errores;
    }

    // CONTACTO
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const nombre = document.getElementById('nombre');
            const email = document.getElementById('email');
            const mensaje = document.getElementById('mensaje');
            let errores = validarCampos({ nombre, email, mensaje, tipo: 'contacto' });
            if (errores.length > 0) {
                e.preventDefault();
                alert(errores.join('\n'));
            } else {
                alert('¡Formulario enviado correctamente!');
            }
        });
    }

    // LOGIN
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            const email = document.getElementById('login-email');
            const password = document.getElementById('login-password');
            let errores = validarCampos({ email, password, tipo: 'login' });
            if (errores.length > 0) {
                e.preventDefault();
                alert(errores.join('\n'));
            } else {
                alert('¡Inicio de sesión exitoso!');
            }
        });
    }

    // REGISTRO
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            const nombre = document.getElementById('register-nombre');
            const email = document.getElementById('register-email');
            const password = document.getElementById('register-password');
            const confirm = document.getElementById('register-confirm-password');
            let errores = validarCampos({ nombre, email, password, confirm, tipo: 'registro' });
            if (errores.length > 0) {
                e.preventDefault();
                alert(errores.join('\n'));
            } else {
                alert('¡Registro exitoso!');
            }
        });
    }
})();