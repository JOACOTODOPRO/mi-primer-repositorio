interface Libro {
    titulo: string;
    autor: string;
    isbn: string;
    fechaPrestamo: string;
    fechaDevolucionPrevista: string;
    tipoUsuario: "estudiante" | "profesor" | "general";
    categoria: "ficcion" | "tecnico" | "historia" | "ciencia";
}

interface ReporteMulta {
    titulo: string;
    categoria: string;
    tipoUsuario: string;
    diasRetraso: number;
    multa: number;
}

function calcularDiasRetraso(
    fechaDevolucionPrevista: string,
    fechaActual: string
): number {

    const fechaPrevista = new Date(fechaDevolucionPrevista);
    const fechaHoy = new Date(fechaActual);

    const diferencia =
        fechaHoy.getTime() -
        fechaPrevista.getTime();

    const dias =
        Math.floor(
            diferencia /
            (1000 * 60 * 60 * 24)
        );

    return dias > 0 ? dias : 0;
}

function calcularMulta(
    diasRetraso: number,
    tipoUsuario: string
): number {

    if (diasRetraso === 0) {
        return 0;
    }

    let multa = 0;

    switch (tipoUsuario) {
        case "estudiante":
            multa = diasRetraso * 50;
            break;

        case "profesor":
            multa = diasRetraso * 30;
            break;

        case "general":
            multa = diasRetraso * 100;
            break;
    }

    if (diasRetraso <= 7) {
        multa *= 0.5;
    }

    return multa;
}

function renovarPrestamo(
    libro: Libro,
    nuevaFecha: string
): void {

    libro.fechaDevolucionPrevista =
        nuevaFecha;
}

function procesarBiblioteca(
    libros: Libro[],
    fechaActual: string
): ReporteMulta[] {

    return libros.map(libro => {

        const diasRetraso =
            calcularDiasRetraso(
                libro.fechaDevolucionPrevista,
                fechaActual
            );

        const multa =
            calcularMulta(
                diasRetraso,
                libro.tipoUsuario
            );

        return {
            titulo: libro.titulo,
            categoria: libro.categoria,
            tipoUsuario: libro.tipoUsuario,
            diasRetraso,
            multa
        };
    });
}

const libros: Libro[] = [
    {
        titulo: "El Aleph",
        autor: "Borges",
        isbn: "111",
        fechaPrestamo: "2024-05-01",
        fechaDevolucionPrevista: "2024-06-01",
        tipoUsuario: "estudiante",
        categoria: "ficcion"
    },
    {
        titulo: "Clean Code",
        autor: "Robert Martin",
        isbn: "222",
        fechaPrestamo: "2024-05-20",
        fechaDevolucionPrevista: "2024-06-05",
        tipoUsuario: "profesor",
        categoria: "tecnico"
    },
    {
        titulo: "Historia Argentina",
        autor: "Luna",
        isbn: "333",
        fechaPrestamo: "2024-05-15",
        fechaDevolucionPrevista: "2024-06-12",
        tipoUsuario: "general",
        categoria: "historia"
    },
    {
        titulo: "Cosmos",
        autor: "Carl Sagan",
        isbn: "444",
        fechaPrestamo: "2024-05-15",
        fechaDevolucionPrevista: "2024-06-14",
        tipoUsuario: "general",
        categoria: "ciencia"
    },
    {
        titulo: "Rayuela",
        autor: "Cortázar",
        isbn: "555",
        fechaPrestamo: "2024-05-25",
        fechaDevolucionPrevista: "2024-06-10",
        tipoUsuario: "estudiante",
        categoria: "ficcion"
    },
    {
        titulo: "TypeScript Handbook",
        autor: "Microsoft",
        isbn: "666",
        fechaPrestamo: "2024-06-01",
        fechaDevolucionPrevista: "2024-06-20",
        tipoUsuario: "profesor",
        categoria: "tecnico"
    }
];

const fechaActual = "2024-06-15";

const reporte =
    procesarBiblioteca(
        libros,
        fechaActual
    );

console.log("=================================");
console.log("BIBLIOTECA AVANZADA");
console.log("=================================");

let totalMultas = 0;
let totalDias = 0;

const usuarios: Record<string, number> = {};
const multasPorCategoria: Record<string, number> = {};

for (const item of reporte) {

    console.log(
        `${item.titulo} | ${item.categoria}`
    );

    console.log(
        `Usuario: ${item.tipoUsuario}`
    );

    console.log(
        `Retraso: ${item.diasRetraso} días`
    );

    console.log(
        `Multa: $${item.multa}`
    );

    console.log("----------------------");

    totalMultas += item.multa;
    totalDias += item.diasRetraso;

    usuarios[item.tipoUsuario] =
        (usuarios[item.tipoUsuario] || 0) + 1;

    multasPorCategoria[item.categoria] =
        (multasPorCategoria[item.categoria] || 0)
        + item.multa;
}

console.log("=================================");
console.log(`TOTAL MULTAS: $${totalMultas}`);

console.log(
    `PROMEDIO RETRASO: ${
        (totalDias / reporte.length).toFixed(2)
    } días`
);

console.log("LIBROS POR USUARIO");

for (const tipo in usuarios) {
    console.log(
        `${tipo}: ${usuarios[tipo]}`
    );
}

console.log("MULTAS POR CATEGORÍA");

for (const categoria in multasPorCategoria) {
    console.log(
        `${categoria}: $${multasPorCategoria[categoria]}`
    );
}

console.log("=================================");