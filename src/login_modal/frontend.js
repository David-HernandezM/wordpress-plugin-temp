document.addEventListener('DOMContentLoaded', () => {
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
