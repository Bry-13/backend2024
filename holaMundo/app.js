const tareas = [
    {
        nombre: "Estudiar para el examen de Backend",
        fecha: "2029-09-23",
        hecho: false
    },
    {
        nombre: "Ir de compras",
        fecha: "2029-09-24",
        hecho: false
    },
    {
        nombre: "Hacer tarea",
        fecha: "2029-09-22",
        hecho: true
    },
];

const tareasPorRealizar = tareas.filter(tarea => !tarea.hecho);
console.log(tareasPorRealizar);