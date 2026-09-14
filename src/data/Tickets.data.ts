import { Ticket } from '../models/ticket.model.js';

export const ticketsData: Ticket[] = [
    {
        id: 1,
        title: "Equipo no enciende",
        description: "El computador del área administrativa no inicia.",
        priority: "high",
        resolved: false
    },
    {
        id: 2,
        title: "Problema con impresora",
        description: "La impresora no aparece disponible en la red.",
        priority: "medium",
        resolved: false
    },
    {
        id: 3,
        title: "Restablecer contraseña",
        description: "El usuario no puede ingresar al sistema.",
        priority: "low",
        resolved: true
    },
    {
        id: 4,
        title: "Falla en conexión VPN",
        description: "El personal remoto no logra conectarse a los recursos internos de la empresa.",
        priority: "high",
        resolved: false
    },
    {
        id: 5,
        title: "Actualización de software",
        description: "Se requiere instalar la nueva versión del paquete Office en el equipo de finanzas.",
        priority: "low",
        resolved: true
    },
    {
        id: 6,
        title: "Pantalla azul recurrente",
        description: "El equipo del área de diseño se reinicia constantemente mostrando un error de sistema.",
        priority: "high",
        resolved: false
    },
    {
        id: 7,
        title: "Falta de tóner",
        description: "La impresora principal de secretaría imprime con rayas pálidas por bajo nivel de tóner.",
        priority: "medium",
        resolved: true
    }
];