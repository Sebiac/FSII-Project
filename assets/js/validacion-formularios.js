// Validación unificada para contacto, login y registro
(function() {
    // CONTACTO
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            let errores = [];
            const nombre = document.getElementById('nombre');
            const email = document.getElementById('email');
            const asunto = document.getElementById('asunto');
            const mensaje = document.getElementById('mensaje');
            if (!nombre.value || nombre.value.trim().length < 3) {
                errores.push('Nombre completo debe tener al menos 3 caracteres');
            }
            if (!email.value || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value)) {
                errores.push('Correo electrónico inválido');
            }
            if (!asunto.value) {
                errores.push('Selecciona el asunto');
            }
            if (!mensaje.value || mensaje.value.trim().length < 10) {
                errores.push('El mensaje debe tener al menos 10 caracteres');
            }
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
            let errores = [];
            const email = document.getElementById('login-email');
            const password = document.getElementById('login-password');
            if (!email.value || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value)) {
                errores.push('Correo electrónico inválido');
            }
            if (!password.value || password.value.length < 6) {
                errores.push('La contraseña debe tener al menos 6 caracteres');
            }
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
            let errores = [];
            const nombre = document.getElementById('register-nombre');
            const email = document.getElementById('register-email');
            const password = document.getElementById('register-password');
            const confirm = document.getElementById('register-confirm-password');
            if (!nombre.value || nombre.value.trim().length < 3) {
                errores.push('Nombre completo debe tener al menos 3 caracteres');
            }
            if (!email.value || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value)) {
                errores.push('Correo electrónico inválido');
            }
            if (!password.value || password.value.length < 6) {
                errores.push('La contraseña debe tener al menos 6 caracteres');
            }
            if (password.value !== confirm.value) {
                errores.push('Las contraseñas no coinciden');
            }
            if (errores.length > 0) {
                e.preventDefault();
                alert(errores.join('\n'));
            } else {
                alert('¡Registro exitoso!');
            }
        });
    }
})();