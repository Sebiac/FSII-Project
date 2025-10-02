// Validación unificada para contacto, login y registro


// Validación unificada para contacto, login y registro con mensajes en la parte inferior
(function() {
    function validarCampos({ nombre, email, password, confirm, confirmemail, mensaje, tipo }) {
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
        // Confirmación de email
        if (confirmemail && email) {
            if (email.value !== confirmemail.value) {
                errores.push('El email no coincide');
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

    // Mostrar solo el error del campo que pierde el foco
    function mostrarErrorCampoEspecifico(campo, errores) {
        // Limpiar error previo
        let errorDiv = campo.parentNode.querySelector('.campo-error');
        if (errorDiv) errorDiv.remove();

        // Mapear errores a este campo
        const reglas = [
            { campo: 'nombre', texto: 'nombre' },
            { campo: 'email', texto: 'correo' },
            { campo: 'confirmemail', texto: 'email no coincide' },
            { campo: 'password', texto: 'contraseña' },
            { campo: 'confirm', texto: 'contraseñas no coinciden' },
            { campo: 'mensaje', texto: 'comentario' }
        ];
        let erroresCampo = [];
        reglas.forEach(regla => {
            if (campo.name && regla.campo === campo.name) {
                erroresCampo = errores.filter(e => e.toLowerCase().includes(regla.texto));
            } else if (campo.id && campo.id.replace(/^register-|login-/, '') === regla.campo) {
                erroresCampo = errores.filter(e => e.toLowerCase().includes(regla.texto));
            }
        });
        if ((campo.name === 'email' || campo.id.endsWith('email')) && erroresCampo.length === 0) {
            erroresCampo = errores.filter(e => e.includes('@'));
        }
        if (erroresCampo.length > 0) {
            let errorDiv = document.createElement('div');
            errorDiv.className = 'campo-error';
            errorDiv.style.color = '#ffb3b3';
            errorDiv.style.background = 'rgba(0,0,0,0.2)';
            errorDiv.style.marginTop = '4px';
            errorDiv.style.marginBottom = '8px';
            errorDiv.style.padding = '4px 8px';
            errorDiv.style.borderRadius = '6px';
            errorDiv.style.fontSize = '0.92em';
            errorDiv.style.textAlign = 'left';
            errorDiv.innerHTML = erroresCampo.map(e => `• ${e}`).join('<br>');
            campo.parentNode.appendChild(errorDiv);
        }
    }

    // Validar al perder el foco de los campos
    function addBlurValidation(form, campos, tipo) {
        campos.forEach(campo => {
            if (campo) {
                campo.addEventListener('blur', function() {
                    let args = { tipo };
                    campos.forEach(c => { if (c) args[c.name || c.id.replace(/^register-|login-/, '')] = c; });
                    let errores = validarCampos(args);
                    mostrarErrorCampoEspecifico(campo, errores);
                });
                // Limpiar error al escribir
                campo.addEventListener('input', function() {
                    let errorDiv = campo.parentNode.querySelector('.campo-error');
                    if (errorDiv) errorDiv.remove();
                });
            }
        });
    }

    // CONTACTO
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const nombre = document.getElementById('nombre');
        const email = document.getElementById('email');
        const mensaje = document.getElementById('mensaje');
        addBlurValidation(contactForm, [nombre, email, mensaje], 'contacto');
        contactForm.addEventListener('submit', function(e) {
            let errores = validarCampos({ nombre, email, mensaje, tipo: 'contacto' });
            if (errores.length > 0) {
                e.preventDefault();
                // Mostrar errores solo en los campos con error
                [nombre, email, mensaje].forEach(campo => mostrarErrorCampoEspecifico(campo, errores));
            }
        });
    }

    // LOGIN
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        const email = document.getElementById('login-email');
        const password = document.getElementById('login-password');
        addBlurValidation(loginForm, [email, password], 'login');
        loginForm.addEventListener('submit', function(e) {
            let errores = validarCampos({ email, password, tipo: 'login' });
            if (errores.length > 0) {
                e.preventDefault();
                [email, password].forEach(campo => mostrarErrorCampoEspecifico(campo, errores));
            }
        });
    }

    // REGISTRO
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        const nombre = document.getElementById('register-nombre');
        const email = document.getElementById('register-email');
        const confirmemail = document.getElementById('register-confirm-email');
        const password = document.getElementById('register-password');
        const confirm = document.getElementById('register-confirm-password');
        addBlurValidation(registerForm, [nombre, email, confirmemail, password, confirm], 'registro');
        registerForm.addEventListener('submit', function(e) {
            let errores = validarCampos({ nombre, email, confirmemail, password, confirm, tipo: 'registro' });
            if (errores.length > 0) {
                e.preventDefault();
                [nombre, email, confirmemail, password, confirm].forEach(campo => mostrarErrorCampoEspecifico(campo, errores));
            }
        });
    }
})();