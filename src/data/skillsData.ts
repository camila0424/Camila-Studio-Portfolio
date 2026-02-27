export interface Tool {
  name: string;
  desc: string;
  
}

export interface SkillCategory {
  title: string;
  color: string; 
  tools: Tool[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    color: "from-cyan-400 to-blue-500",
    tools: [
      { name: "React", desc: "Librería de JavaScript para construir interfaces web reactivas" },
      { name: "React Native", desc: "Framework para crear aplicaciones móviles nativas con React" },
      { name: "Expo", desc: "Conjunto de herramientas para acelerar el desarrollo con React Native" },
      { name: "JavaScript", desc: "Lenguaje base para desarrollo web dinámico y scripts" },
      { name: "TypeScript", desc: "Superset de JavaScript que añade tipado estático para mayor seguridad" }, // <-- Aquí va TS
      { name: "CSS", desc: "Lenguaje para estilizar páginas web con reglas CSS" },
      { name: "Sass", desc: "Preprocesador CSS que añade funcionalidades como variables y anidación" },
      { name: "TailwindCSS", desc: "Framework CSS para diseño rápido y responsivo con utilidades" },
    ],
  },
  {
    title: "Backend",
    color: "from-purple-400 to-indigo-500",
    tools: [
      { name: "Node.js", desc: "Entorno de ejecución para JavaScript en el servidor" },
      { name: "MySQL", desc: "Sistema de gestión de bases de datos relacional de código abierto" },
      { name: "Postman", desc: "Herramienta para testear, documentar y automatizar APIs REST" },
      { name: "Render", desc: "Plataforma de despliegue para aplicaciones web y APIs con soporte para backend" },
    ],
  },
  {
    title: "Diseño",
    color: "from-pink-400 to-red-500",
    tools: [
      { name: "Figma", desc: "Diseño de interfaces, prototipos y sistemas de diseño colaborativos" },
      { name: "Adobe Illustrator", desc: "Diseño gráfico basado en vectores para logotipos, ilustraciones y branding" },
      { name: "Adobe Photoshop", desc: "Edición de imágenes, retoque fotográfico y creación de gráficos digitales" },
      { name: "Prezi", desc: "Creación de presentaciones visuales e interactivas para comunicar ideas" },
      { name: "Canva", desc: "Diseño gráfico accesible para redes sociales, presentaciones y contenido visual" },
    ],
  },
  {
    title: "Flujo de trabajo",
    color: "from-green-400 to-emerald-500",
    tools: [
      { name: "GitHub", desc: "Plataforma para control de versiones y colaboración entre desarrolladores" },
      { name: "Vercel", desc: "Plataforma para despliegue y hosting de aplicaciones web" },
      { name: "Scrum", desc: "Marco de trabajo ágil para gestión de proyectos en equipo" },
      { name: "Kanban", desc: "Metodología visual para organizar tareas y flujos de trabajo" },
    ],
  },
  {
    title: "Organización y productividad",
    color: "from-yellow-400 to-orange-500",
    tools: [
      { name: "Trello", desc: "Gestión de tareas estilo Kanban" },
      { name: "Notion", desc: "Espacio de trabajo para notas, bases de datos, tareas y documentación" },
      { name: "Monday", desc: "Plataforma para planificación y seguimiento de proyectos en equipo" },
      { name: "Google Calendar", desc: "Gestión de eventos, reuniones y recordatorios en la nube" },
      { name: "GitHub Projects", desc: "Herramienta de planificación integrada en GitHub para organizar tareas y proyectos" },
      { name: "Slack", desc: "Plataforma de comunicación en equipo con canales, hilos y notificaciones" },
    ],
  },
];