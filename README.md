Administrador de Tareas CLI

Este es un programa de línea de comandos (CLI) hecho en Node.js que permite gestionar tareas pendientes. Puedes agregar, listar, marcar como completadas y eliminar tareas, todo desde la terminal.

📌 Requisitos

-Tener Node.js instalado (versión 14 o superior).
-Tener npm instalado (se incluye con Node.js).

🚀 Instalación y ejecución

1.Clona este repositorio o descarga los archivos.
2.Abre una terminal en la carpeta del proyecto.
3.Instala las dependencias ejecutando:

npm install

4.Ejecuta el programa con:

node index.js

🎯 ¿Cómo funciona?

Cuando ejecutas el programa, te mostrará un menú con opciones:

-Listar tareas → Muestra todas las tareas guardadas.
-Agregar tarea → Te pedirá que escribas una nueva tarea.
-Completar tarea → Selecciona una tarea para marcarla como completada.
-Eliminar tarea → Selecciona una tarea para eliminarla.
-Salir → Cierra el programa.

Las tareas se guardan en un archivo tasks.json, por lo que seguirán estando allí cuando vuelvas a ejecutar el programa. 

📦 Dependencias utilizadas

-chalk → Mejora la visualización con colores en la terminal.
-prompts → Permite hacer preguntas interactivas al usuario.
-fs (File System) → Maneja la lectura y escritura de archivos.
