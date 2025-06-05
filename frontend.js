document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-json-sender]').forEach(button => {
        button.addEventListener('click', () => {
            const url = button.dataset.url;
            const json = button.dataset.json;
            console.log('Se hizo click!!');
            alert('Se hizo click!!');
            fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: json
            }).then(res => res.json()).then(console.log).catch(console.error);
        });
    });

    document.querySelectorAll('[data-json-login]').forEach(button => {
        button.addEventListener('click', () => {
            const url = button.dataset.auth;
            const user = prompt("Usuario:");
            const pass = prompt("Contraseña:");
            fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user, pass })
            }).then(res => {
                const token = res.headers.get('Set-Cookie');
                if (token) document.cookie = token;
                return res.json();
            }).then(console.log).catch(console.error);
        });
    });






    



    document.querySelectorAll('.close-modal-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const overlay = btn.closest('.modal-overlay');
            if (overlay) {
                overlay.style.display = 'none';
            }
        });
    });

    document.querySelectorAll('.confirm-send-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const url = btn.dataset.url;
            const json = btn.dataset.json;

            fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: json
            }).then(() => {
                alert('✅ JSON enviado con éxito');
                btn.closest('.modal-overlay').style.display = 'none';
            }).catch(() => {
                alert('❌ Hubo un error al enviar');
            });
        });
    });

    document.querySelectorAll('.open-modal-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const overlay = btn.parentElement.querySelector('.modal-overlay');
            if (overlay) {
                overlay.style.display = 'flex';
            }
        });
    });
});
