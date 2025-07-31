// import { createRoot, useState } from "react";

// function LoginComponent() {
//     const [isAuthenticated, setIsAuthenticated] = useState(
//         !!localStorage.getItem('GearLoginToken')
//     );
//     const [showModal, setShowModal] = useState(false);
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [userData, setUserData] = useState<any | null>(null);

//     const handleLogin = async () => {
//         try {
//             // const response = await axios.post(
//             //     'http://localhost:3000/auth/login',
//             //     {username, password}
//             // );
//             const response = await fetch('http://localhost:3000/auth/login', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ username, password })
//             });

//             const data = await response.json();
//             // const {data} = response;

//             console.log(data);

//             // GUARDAR TOKEN GLOBAL
//             // window.GearLoginToken = data.backendTokens.accessToken;
//             // localStorage.setItem('GearLoginToken', data.backendTokens.accessToken);

//             // setUserData(data.user);
//             setUserData({name: 'username', id:'xd'});
//             setIsAuthenticated(true);
//             setShowModal(false);
//         } catch (err) {
//             alert('Error en login');
//             console.error(err);
//         }
//     };

//     const handleLogout = () => {
//         // window.GearLoginToken = null;
//         // localStorage.removeItem('GearLoginToken');
//         setIsAuthenticated(false);
//         setUserData(null);
//     };

//     return (
//         <div>
//             {!isAuthenticated && (
//                 <>
//                     <button onClick={() => setShowModal(true)}>Iniciar sesión</button>
//                     {showModal && (
//                         <div style={{
//                             position: 'fixed',
//                             top: '50%',
//                             left: '50%',
//                             transform: 'translate(-50%, -50%)',
//                             background: 'white',
//                             padding: '20px',
//                             zIndex: 9999,
//                             border: '1px solid #ccc'
//                         }}>
//                             <h2>Login</h2>
//                             <input
//                                 type="text"
//                                 placeholder="Usuario"
//                                 value={username}
//                                 onChange={(e) => setUsername(e.target.value)}
//                             /><br/>
//                             <input
//                                 type="password"
//                                 placeholder="Contraseña"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                             /><br/>
//                             <button onClick={handleLogin}>Entrar</button>
//                             <button onClick={() => setShowModal(false)}>Cancelar</button>
//                         </div>
//                     )}
//                 </>
//             )}

//             {isAuthenticated && (
//                 <div>
//                     <p>Bienvenido {userData?.name || 'Usuario'}!</p>
//                     <p>ID: {userData?.id}</p>
//                     <button onClick={handleLogout}>Cerrar sesión</button>
//                 </div>
//             )}
//         </div>
//     );
// }

// document.addEventListener('DOMContentLoaded', () => {
//     document.querySelectorAll('.vara-login-root').forEach(rootComponent => {
//         const root = createRoot(rootComponent);
//         root.render(<LoginComponent />);
//     });
// });



















import { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";

function LoginComponent() {
    const [isAuthenticated, setIsAuthenticated] = useState(
        !!localStorage.getItem('GearLoginToken')
    );
    const [showModal, setShowModal] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userData, setUserData] = useState(
        JSON.parse(localStorage.getItem('GearLoginUser') || 'null')
    );

    const handleLogin = async () => {
        const serverUrl: string | undefined = (window as any).GearPluginSettings?.backendUrl;

        if (!serverUrl) {
            alert('Base backend url not set!');
            return;
        }

        try {
            const response = await fetch(`${serverUrl}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
                credentials: 'include'
            });

            console.log('response login:');
            console.log(response);  

            const data = await response.json();
            console.log('datalogin:')
            console.log(data);

            // window.GearLoginToken = data.backendTokens.accessToken;
            // localStorage.setItem('GearLoginToken', data.backendTokens.accessToken);
            // localStorage.setItem('GearLoginUser', JSON.stringify(data.user));

            setUserData(data.user);
            setIsAuthenticated(true);
            setShowModal(false);
        } catch (err) {
            alert('Error en login');
            console.error(err);
        }
    };

    const handleLogout = () => {
        // window.GearLoginToken = null;
        // localStorage.removeItem('GearLoginToken');
        // localStorage.removeItem('GearLoginUser');
        setIsAuthenticated(false);
        setUserData(null);
    };

    const handleOverlayClick = (event) => {
        if (event.target.id === 'loginModalOverlay') {
            setShowModal(false);
        }
    };

    return (
        <div>
            {!isAuthenticated && (
                <>
                    <button onClick={() => setShowModal(true)} className="vara-login-button">Log in</button>

                    {showModal && (
                        <div
                            id="loginModalOverlay"
                            onClick={handleOverlayClick}
                            style={{
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                width: '100vw',
                                height: '100vh',
                                backgroundColor: 'rgba(0, 0, 0, 0.5)', // fondo oscuro
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
                                onClick={(e) => e.stopPropagation()} // para que clicks dentro no cierren el modal
                            >
                                <h2>Login</h2>
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
                                <button onClick={handleLogin} style={{ marginRight: '10px' }}>Entrar</button>
                                <button onClick={() => setShowModal(false)}>Cancelar</button>
                            </div>
                        </div>
                    )}
                </>
            )}

            {isAuthenticated && (
                <div>
                    <p>Bienvenido {userData?.name || 'Usuario'}!</p>
                    <p>ID: {userData?.id}</p>
                    <button onClick={handleLogout}>Cerrar sesión</button>
                </div>
            )}
        </div>
    );
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.vara-login-root').forEach(rootComponent => {
        const root = createRoot(rootComponent);
        root.render(<LoginComponent />);
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
