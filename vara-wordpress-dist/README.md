# Vara Wordpress Plugin

Este plugin de WordPress permite agregar bloques personalizados en el editor Gutenberg para:
This plugin enable to devs add custom blocks in the gutenberg editor to:

- **Enviar datos JSON autenticados mediante JWT** (`Action Block`)
- **Iniciar sesión o registrarse** mediante un modal (`Login Block`)
- **Usar cookies de autenticación automáticamente**

---

## 📦 Estructura del Proyecto

```
json-sender-advanced/
├── build.js                # Script que copia archivos compilados a un nuevo directorio de distribución
├── index.php               # Carga de bloques y scripts frontend
├── package.json            # Configuración de desarrollo y build
├── frontend.js             # Script que ejecuta el POST en el sitio en producción
├── block.json              # Metadata global del plugin (opcional si cada bloque tiene su propio .json)
├── src/
│   ├── action/
│   │   ├── block.json
│   │   └── index.js
│   └── login/
│       ├── block.json
│       └── index.js
```

---

## ⚙️ Instalación

1. Clona o descarga este repositorio.
2. Ejecuta:

```bash
npm install
npm run build
node build.js
```

3. Esto generará un directorio empaquetado para subir a WordPress como plugin.
4. Sube el contenido generado en `/dist/json-sender-advanced` al directorio `wp-content/plugins`.

---

## 🧩 Uso

### 🔘 Action Block

1. Agrega el bloque llamado `Botón de Acción` en Gutenberg.
2. Configura:
   - **URL de destino**
   - **Cuerpo del JSON a enviar**
3. En el frontend, aparecerá un botón verde que enviará el JSON vía `fetch` con el token JWT almacenado en cookie.

---

### 🔐 Login Block

1. Agrega el bloque `Iniciar sesión`.
2. Al mostrarse en frontend, genera un modal con:
   - Usuario
   - Contraseña
3. El JWT recibido como cookie se usará automáticamente para llamadas futuras.

---

## 🔄 Mantenimiento

### Para compilar los bloques y construir el plugin:
```bash
npm run build
node build.js
```

---

## 🛡️ Seguridad

- Todas las llamadas POST usan `Authorization: Bearer <token>` si está disponible.
- Detecta expiración del token y puede reenviar solicitudes tras reautenticación (si se implementa en el backend).

---

## ✍️ Autor

Desarrollado por **Diego Cureño**

---

## 📃 Licencia

Distribuido bajo la licencia MIT.
