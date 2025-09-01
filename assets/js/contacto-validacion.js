// Validación en tiempo real y alertas en JSON para el formulario de contacto
(function() {
    const form = document.getElementById('contactForm');
    const fields = [
        { name: 'nombre', label: 'Nombre completo' },
        { name: 'email', label: 'Correo electrónico' },
        { name: 'asunto', label: 'Categoría' },
        { name: 'mensaje', label: 'Mensaje' }
    ];

    function validateField(name, value) {
        switch (name) {
            case 'nombre':
                return value.trim().length >= 3;
            case 'email':
                return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value);
            case 'asunto':
                return value !== '';
            case 'mensaje':
                return value.trim().length >= 10;
            default:
                return true;
        }
    }

    form.addEventListener('submit', function(e) {
        let errores = [];
        fields.forEach(f => {
            const el = document.getElementById(f.name);
            if (!validateField(f.name, el.value)) {
                errores.push(`Falta completar el apartado "${f.label}"`);
            }
        });
        if (errores.length > 0) {
            e.preventDefault();
            alert(errores.join('\n'));
        } else {
            alert('¡Formulario enviado correctamente!');
        }
    });
})();