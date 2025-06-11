// import { createRoot, useState } from "@wordpress/element";

// function RegisterComponent() {
//     const [showModal, setShowModal] = useState(false);
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [email, setEmail] = useState('');

//     const handleRegister = async () => {
//         try {
//             const response = await fetch('http://localhost:3000/auth/register', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ username, password })
//             });

//             const data = await response.json();
//             alert('Registro exitoso. Puedes iniciar sesión.');
//             setShowModal(false);
//         } catch (err) {
//             alert('Error en registro');
//             console.error(err);
//         }
//     };

//     return (
//         <div>
//             <button onClick={() => setShowModal(true)}>Registrarse</button>
//             {showModal && (
//                 <div style={{
//                     position: 'fixed',
//                     top: '50%',
//                     left: '50%',
//                     transform: 'translate(-50%, -50%)',
//                     background: 'white',
//                     padding: '20px',
//                     zIndex: 9999,
//                     border: '1px solid #ccc'
//                 }}>
//                     <h2>Registro</h2>
//                     <input
//                         type="text"
//                         placeholder="Usuario"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                     /><br/>
//                     <input
//                         type="email"
//                         placeholder="Correo"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                     /><br/>
//                     <input
//                         type="password"
//                         placeholder="Contraseña"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                     /><br/>
//                     <button onClick={handleRegister}>Registrarse</button>
//                     <button onClick={() => setShowModal(false)}>Cancelar</button>
//                 </div>
//             )}
//         </div>
//     );
// }

// document.addEventListener('DOMContentLoaded', () => {
//     document.querySelectorAll('.vara-register-root').forEach(rootComponent => {
//         const root = createRoot(rootComponent);
//         root.render(<RegisterComponent />);
//     });
// });





import { createRoot, useState } from "@wordpress/element";

function RegisterComponent() {
    const [showModal, setShowModal] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [registrationSuccess, setRegistrationSuccess] = useState(false);

    const handleRegister = async () => {
        const serverUrl: string | undefined = (window as any).GearPluginSettings?.backendUrl;

        if (!serverUrl) {
            alert('Base backend url not set!');
            return;
        }

        try {
            const response = await fetch(`${serverUrl}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
                credentials: 'include'
            });

            console.log('response register:');
            console.log(response);

            const data = await response.json();
            console.log('Respuesta del servidor:');
            console.log(data);

            setRegistrationSuccess(true);
            setShowModal(false);
        } catch (err) {
            alert('Error en registro');
            console.error(err);
        }
    };

    const handleOverlayClick = (event) => {
        if (event.target.id === 'registerModalOverlay') {
            setShowModal(false);
        }
    };

    return (
        <div>
            <button onClick={() => setShowModal(true)} className="vara-login-button">Register</button>

            {showModal && (
                <div
                    id="registerModalOverlay"
                    onClick={handleOverlayClick}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 9998,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <div
                        style={{
                            background: 'white',
                            padding: '20px',
                            borderRadius: '8px',
                            minWidth: '300px',
                            zIndex: 9999
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2>Registro</h2>
                        <input
                            type="text"
                            placeholder="Usuario"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={{ width: '100%', marginBottom: '10px' }}
                        />
                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ width: '100%', marginBottom: '10px' }}
                        />
                        <button onClick={handleRegister} style={{ marginRight: '10px' }}>Registrarse</button>
                        <button onClick={() => setShowModal(false)}>Cancelar</button>
                    </div>
                </div>
            )}

            {registrationSuccess && (
                <p style={{ marginTop: '10px', color: 'green' }}>
                    Registro exitoso. ¡Ahora puedes iniciar sesión!
                </p>
            )}
        </div>
    );
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.vara-register-root').forEach(rootComponent => {
        const root = createRoot(rootComponent);
        root.render(<RegisterComponent />);
    });
});
















































// document.addEventListener('DOMContentLoaded', () => {
//     document.querySelectorAll('.close-modal-btn').forEach(btn => {
//         btn.addEventListener('click', () => {
//             const overlay = btn.closest('.modal-overlay');
//             if (overlay) {
//                 overlay.style.display = 'none';
//             }
//         });
//     });

//     document.querySelectorAll('.confirm-send-btn').forEach(btn => {
//         btn.addEventListener('click', () => {
//             const url = btn.dataset.url;
//             const json = btn.dataset.json;

//             fetch(url, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: json
//             }).then(() => {
//                 alert('✅ JSON enviado con éxito');
//                 btn.closest('.modal-overlay').style.display = 'none';
//             }).catch(() => {
//                 alert('❌ Hubo un error al enviar');
//             });
//         });
//     });

//     document.querySelectorAll('.open-modal-btn').forEach(btn => {
//         btn.addEventListener('click', () => {
//             const overlay = btn.parentElement.querySelector('.modal-overlay');
//             if (overlay) {
//                 overlay.style.display = 'flex';
//             }
//         });
//     });
// });
