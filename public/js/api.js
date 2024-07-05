export const obtenerProductos = async () => {
    const productos = await fetch('http://localhost:5000/productos/todos', {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then((res) => {
        if (!res.ok) {
            throw new Error("Error en la petición");
        }
        return res.json();
    }).catch(error => {
        console.error("Error:", error);
        throw new Error("Error en la petición");
    });

    return productos;
};

export const obtenerProductosPorCategoria = async (categoria) => {
    try {
        const response = await fetch(`http://localhost:5000/productos/categoria/${encodeURIComponent(categoria)}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (!response.ok) {
            throw new Error('Error al cargar los productos');
        }
        const productos = await response.json();
        return productos;
    } catch (error) {
        console.error('Error:', error);
        throw new Error("Error en la petición");
    }
};
