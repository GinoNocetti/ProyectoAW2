/*Función para los json*/
/*export const obtenerProductos = async () => {
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
};*/

/*Función para la BD*/
export const obtenerProductos = async () => {
    try {
        const response = await fetch('http://localhost:5000/productos/todosDB', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        
        if (!response.ok) {
            throw new Error("Error en la petición");
        }
        
        const productos = await response.json();
        return productos;
    } catch (error) {
        console.error("Error:", error);
        throw new Error("Error en la petición");
    }
};

/*Función para los json*/
/*export const obtenerProductosPorCategoria = async (categoria) => {
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
};*/

/*Función para la BD*/
export const obtenerProductosPorCategoria = async (categoria) => {
    try {
        const response = await fetch(`http://localhost:5000/productos/PorCategoriaDB/${encodeURIComponent(categoria)}`, {
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

