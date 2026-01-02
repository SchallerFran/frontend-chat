# 💬 WhatsApp Web Clone – Angular 17

Clon web de WhatsApp desarrollado con **Angular 17**, utilizando **componentes standalone**, **Signals**, **Angular Router** y una arquitectura simple orientada a aprendizaje y práctica.

El proyecto simula un sistema de chats con historial de mensajes, búsqueda de contactos y creación de nuevos chats, siguiendo una interfaz similar a **WhatsApp Web**.

---

## 🚀 Tecnologías utilizadas

- **Angular 17**
- **TypeScript**
- **Signals (`signal`, `computed`)**
- **Angular Router**
- **FormsModule**
- **HTML5**
- **CSS3**
- Arquitectura **Standalone Components**
- Directivas modernas: `@for`, `@if`

---

## 📁 Estructura del proyecto

```text
src/
 ├── app/
 │   ├── chats-component/
 │   ├── chat-detail-component/
 │   ├── new-chat-component/
 │   ├── services/
 │   │   └── chat.service.ts
 │   ├── interfaces/
 │   │   ├── chat.ts
 │   │   └── message.ts
 │   ├── app.html
 │   ├── app.css
 │   ├── app.ts
 │   └── app.routes.ts
 ├── index.html
 └── styles.css
```
---

## ✨ Funcionalidades

### 📱 Panel lateral (Chats)

- Listado dinámico de chats  
- Búsqueda en tiempo real  
- Creación de nuevos chats  
- Chat activo resaltado  
- Último mensaje y hora visible  

---

### 💬 Panel de conversación

- Historial de mensajes independiente por chat  
- Diferenciación visual de mensajes:
  - **Usuario** → alineados a la derecha  
  - **App** → alineados a la izquierda  
- Envío de mensajes con validación  
- Respuesta automática simulada  
- Formateo de fecha y hora  

---

## 🧭 Rutas de la aplicación

| Ruta | Descripción |
|------|------------|
| `/chats` | Vista principal |
| `/chats/:id` | Chat seleccionado |
| `/nuevo` | Crear nuevo chat |


---

## 🛠️ Instalación y ejecución

### 1. Clonar el repositorio
git clone https://github.com/SchallerFran/norte-abanicos-angular

### 2. Instalar dependencias
npm install

### 3. Ejecutar el servidor de desarrollo
ng serve

Luego abrir en el navegador:  
http://localhost:4200

---

## 👤 Autor
- **Francisco Schaller**
- Curso Desarrollo con Angular
- Trabajo Integrador Final

---
