interface Libro {
    titulo: string;
    autor: string;
    isbn: string;
    fechaPrestamo: string;
    fechaDevolucionPrevista: string;
    tipoUsuario: "estudiante" | "profesor" | "general";
}

interface ReporteMulta {
    titulo: string;
    diasRetraso: number;
    multa: number;
    tipoUsuario: string;
}

function calcularDiasRetraso(
    fechaDevolucionPrevista: string,
    fechaActual: string
): number {

    const fechaPrevista = new Date(fechaDevolucionPrevista);
    const hoy = new Date(fechaActual);

    const diferencia =
        hoy.getTime() - fechaPrevista.getTime();

    const dias = Math.floor(
        diferencia / (1000 * 60 * 60 * 24)
    );

    return dias > 0 ? dias : 0;
}

function calcularMulta(
    diasRetraso: number,
    tipoUsuario: string
): number {

    if (diasRetraso === 0) return 0;

    switch (tipoUsuario) {
        case "estudiante":
            return diasRetraso * 50;

        case "profesor":
            return diasRetraso * 30;

        case "general":
            return diasRetraso * 100;

        default:
            return 0;
    }
}

function procesarBiblioteca(
    libros: Libro[],
    fechaActual: string
): ReporteMulta[] {

    return libros.map(libro => {

        const diasRetraso = calcularDiasRetraso(
            libro.fechaDevolucionPrevista,
            fechaActual
        );

        const multa = calcularMulta(
            diasRetraso,
            libro.tipoUsuario
        );

        return {
            titulo: libro.titulo,
            diasRetraso,
            multa,
            tipoUsuario: libro.tipoUsuario
        };
    });
}

const librosEnPrestamo: Libro[] = [
    {
        titulo: "Cien años de soledad",
        autor: "Gabriel García Márquez",
        isbn: "111",
        fechaPrestamo: "2024-06-01",
        fechaDevolucionPrevista: "2024-06-20",
        tipoUsuario: "estudiante"
    },
    {
        titulo: "El Aleph",
        autor: "Jorge Luis Borges",
        isbn: "222",
        fechaPrestamo: "2024-05-15",
        fechaDevolucionPrevista: "2024-06-01",
        tipoUsuario: "estudiante"
    },
    {
        titulo: "Rayuela",
        autor: "Julio Cortázar",
        isbn: "333",
        fechaPrestamo: "2024-05-20",
        fechaDevolucionPrevista: "2024-06-10",
        tipoUsuario: "profesor"
    },
    {
        titulo: "Martín Fierro",
        autor: "José Hernández",
        isbn: "444",
        fechaPrestamo: "2024-05-25",
        fechaDevolucionPrevista: "2024-06-05",
        tipoUsuario: "general"
    }
];

const fechaHoy = "2024-06-15";

const reporte = procesarBiblioteca(
    librosEnPrestamo,
    fechaHoy
);

console.log("=======================================");
console.log("REPORTE DE BIBLIOTECA");
console.log("=======================================");

let totalMultas = 0;
let librosConRetraso = 0;

reporte.forEach(item => {

    console.log(`Libro: ${item.titulo}`);
    console.log(`Usuario: ${item.tipoUsuario}`);
    console.log(`Retraso: ${item.diasRetraso} días`);
    console.log(`Multa: $${item.multa}`);
    console.log("--------------------------------");

    totalMultas += item.multa;

    if (item.diasRetraso > 0) {
        librosConRetraso++;
    }
});

console.log(`TOTAL MULTAS: $${totalMultas}`);
console.log(
    `LIBROS CON RETRASO: ${librosConRetraso}/${reporte.length}`
);