# Tripleten web_project_around_express

# Proyecto Around Express

Este es un proyecto que configura un servidor **Express** con rutas básicas para manejar usuarios y tarjetas. La API proporciona acceso a los datos de usuarios y tarjetas en formato JSON y maneja errores comunes como rutas no encontradas y un ID de usuario no válido.

## Funcionalidades

1. **GET `/users`** - Devuelve la lista JSON de todos los usuarios.
2. **GET `/cards`** - Devuelve la lista JSON de todas las tarjetas.
3. **GET `/users/:id`** - Devuelve un usuario con el ID proporcionado. Si el usuario no existe, devuelve un error 404 con el mensaje:
   `{ "message": "ID de usuario no encontrado" }`.
4. **Ruta no encontrada** - Devuelve un error 404 con el mensaje: `{ "message": "Recurso solicitado no encontrado" }`.

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu_usuario/tu_repositorio.git
```

### 2. Instalar dependencias

Ve a la carpeta del proyecto e instala las dependencias necesarias:

```bash
cd tu_repositorio
npm install
```

### 3. Ejecutar el servidor

Para ejecutar el servidor con **hot reload** usando Nodemon:

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:3000`.

## Estructura del Proyecto

```
/web_project_around_express
  /data
    users.json
    cards.json
  /routes
    users.js
    cards.js
  app.js
  package.json
  .gitignore
  .editorconfig
  README.md
```

### Descripción de los archivos:

- **`app.js`**: El punto de entrada de la aplicación, configura las rutas y el servidor Express.
- **`routes/`**: Carpeta que contiene las rutas de la API (`users.js` y `cards.js`).
- **`data/`**: Carpeta que contiene los archivos JSON (`users.json` y `cards.json`) con los datos de usuarios y tarjetas.

## Dependencias

- **express**: Framework web minimalista para Node.js.
- **nodemon**: Herramienta que reinicia automáticamente el servidor cuando se detectan cambios en los archivos del proyecto.
- **fs**: Módulo de Node.js para leer archivos (usado para cargar los datos de los archivos JSON).

## Licencia

Este proyecto está bajo la Licencia MIT.
