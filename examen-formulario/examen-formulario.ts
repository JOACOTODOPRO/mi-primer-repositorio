
// INTERFAZ DEL FORMULARIO
interface FormularioContacto {
    id: number;
    nombre: string;
    email: string;
    telefono: string;
    edad: number;
    mensaje: string;
}

// ARRAY DE PRUEBAS REDUCIDO PARA EL EXAMEN
const formulariosDePrueba: FormularioContacto[] = [
    {
        id: 1,
        nombre: "María García",
        email: "maria.garcia@empresa.com",
        telefono: "011-1234-5678",
        edad: 28,
        mensaje: "Me gustaría recibir información sobre sus productos y servicios disponibles."
    },
    {
        id: 2,
        nombre: "A",
        email: "email_invalido",
        telefono: "123",
        edad: 10,
        mensaje: "Hola"
    },
    {
        id: 3,
        nombre: "",
        email: "",
        telefono: "",
        edad: 0,
        mensaje: ""
    }
];

// 1. Implementación de la función de validación
function validarFormulario(form: FormularioContacto): void {
    console.log(`\n--- Evaluando Formulario ID: ${form.id} (Usuario: ${form.nombre || "No provisto"}) ---`);
    
    // Array acumulador para almacenar los mensajes de error detallados
    const errores: string[] = [];

    // ==========================================
    // VALIDACIÓN: NOMBRE
    // ==========================================
    const nombreTrim = form.nombre.trim();
    if (nombreTrim === "") {
        const errorMsg = "El nombre no debe estar vacío.";
        errores.push(errorMsg);
        console.log(`X Error en nombre: ${errorMsg}`);
    } else if (nombreTrim.length < 2 || nombreTrim.length > 50) {
        const errorMsg = `Debe tener entre 2 y 50 caracteres (Tiene: ${nombreTrim.length}).`;
        errores.push(errorMsg);
        console.log(`X Error en nombre: ${errorMsg}`);
    } else {
        console.log("✔ Campo nombre válido");
    }

    // ==========================================
    // VALIDACIÓN: EMAIL
    // ==========================================
    const emailTrim = form.email.trim();
    // Contamos cuántas '@' tiene dividiendo el string por ese caracter
    const cantidadArrobas = emailTrim.split('@').length - 1;

    if (emailTrim === "") {
        const errorMsg = "El email no debe estar vacío.";
        errores.push(errorMsg);
        console.log(`X Error en email: ${errorMsg}`);
    } else if (cantidadArrobas !== 1) {
        const errorMsg = "Debe contener exactamente un carácter '@'.";
        errores.push(errorMsg);
        console.log(`X Error en email: ${errorMsg}`);
    } else {
        console.log("✔ Campo email válido");
    }

    // ==========================================
    // VALIDACIÓN: TELÉFONO
    // ==========================================
    // Eliminamos espacios y guiones usando una expresión regular simple
    const telefonoLimpio = form.telefono.replace(/[\s-]/g, '');
    // Validamos si contiene caracteres que no sean números
    const tieneSoloNumeros = /^\d+$/.test(telefonoLimpio);

    if (telefonoLimpio === "") {
        const errorMsg = "El teléfono no debe estar vacío.";
        errores.push(errorMsg);
        console.log(`X Error en telefono: ${errorMsg}`);
    } else if (!tieneSoloNumeros) {
        const errorMsg = "Solo debe contener números (se ignoran espacios y guiones).";
        errores.push(errorMsg);
        console.log(`X Error en telefono: ${errorMsg}`);
    } else if (telefonoLimpio.length < 8 || telefonoLimpio.length > 15) {
        const errorMsg = `La longitud neta debe ser entre 8 and 15 dígitos (Tiene: ${telefonoLimpio.length}).`;
        errores.push(errorMsg);
        console.log(`X Error en telefono: ${errorMsg}`);
    } else {
        console.log("✔ Campo telefono válido");
    }

    // ==========================================
    // VALIDACIÓN: EDAD
    // ==========================================
    // Validamos que sea entero (sin decimales) y esté en el rango
    const esEntero = Number.isInteger(form.edad);

    if (!esEntero || form.edad < 16 || form.edad > 99) {
        const errorMsg = "Debe ser un número entero comprendido entre 16 y 99 años inclusive.";
        errores.push(errorMsg);
        console.log(`X Error en edad: ${errorMsg}`);
    } else {
        console.log("✔ Campo edad válido");
    }

    // ==========================================
    // VALIDACIÓN: MENSAJE
    // ==========================================
    const mensajeTrim = form.mensaje.trim();

    if (mensajeTrim === "") {
        const errorMsg = "El mensaje no debe estar vacío.";
        errores.push(errorMsg);
        console.log(`X Error en mensaje: ${errorMsg}`);
    } else if (mensajeTrim.length < 10) {
        const errorMsg = `Debe tener una extensión mínima de 10 caracteres (Tiene: ${mensajeTrim.length}).`;
        errores.push(errorMsg);
        console.log(`X Error en mensaje: ${errorMsg}`);
    } else {
        console.log("✔ Campo mensaje válido");
    }

    // ==========================================
    // REPORTE DE ESTADO COMPLETO
    // ==========================================
    console.log("--------------------------------------------");
    if (errores.length === 0) {
        console.log("¡FORMULARIO VÁLIDO! Todos los campos son correctos.");
    } else {
        console.log("FORMULARIO INCOMPLETO. Corrija los siguientes errores:");
        errores.forEach((error, index) => {
            console.log(`   ${index + 1}. ${error}`);
        });
    }
}

// 2. Iteración del array ejecutando las validaciones secuencialmente
function ejecutarValidacionesCompletas(): void {
    console.log("=== INICIANDO EVALUACIÓN DE FORMULARIOS ===");
    formulariosDePrueba.forEach((formulario) => {
        validarFormulario(formulario);
    });
    console.log("\n=== EVALUACIÓN FINALIZADA ===");
}

// Ejecución del script principal
ejecutarValidacionesCompletas();