export const CustomCard = ({ img, title, desc, precio, productId, talles }) => {
    const opcionesTalles = talles.map(talle => `<option value="${talle}">${talle.toUpperCase()}</option>`).join('');
    return `
        <div class="card-body" style="text-align: center; margin: 15px;">
            <div class="card" style="width: 18rem; background-color: #cccccc; border: none;" id="${productId}">
                <img src="${img}" class="card-img-top" alt="Imagen del producto">
                <div class="card-body" style="background-color: #eeeeee;">
                    <h5 class="card-title" style="color: #333333;">${title}</h5>
                    <p class="card-text" style="color: #333333;">${desc}</p>
                </div>
                <div class="card-footer" style="background-color: #333333;">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <label for="quantity" class="mb-0" style="margin: 2px; color: white;">Cantidad:</label>
                            <input type="number" class="form-control" id="quantity" value="1" min="1" max="5" style="width: 65px;">
                        </div>
                        <div>
                            <label for="talle" class="mb-0" style="margin: 2px; color: white;">Talle:</label>
                            <select class="form-control" id="talle" style="width: 80px;">
                                ${opcionesTalles}
                            </select>
                        </div>
                    </div>
                    <div class="d-flex justify-content-between align-items-center mt-3">
                        <h5 class="card-price" style="color: white;">$ ${precio}</h5>
                        <button class="btn btn btn-outline-light m-2 btn-carrito">Agregar al carrito</button>
                    </div>
                </div>
            </div>
        </div>
    `;
};

export const CarritoCard = ({ image, name, price, quantity, productId, talle, index }) => {
    return `
        <div class="card-body" style="text-align: center; margin: 20px;">
            <div class="card" style="width: 18rem;">
                <img src="${image}" class="card-img-top" id="imagen">
                <div class="card-body" style="background-color: #cccccc">
                    <h5 class="card-title" id="titulo" style="font-size: 1.25rem; color: black;">${name}</h5>
                </div>
                <div class="card-footer" style="background-color: #333333; color: white;">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <p class="card-text" id="precio" style="margin-right: 5px;">$ ${parseFloat(price).toFixed(2)}</p>
                        </div>
                        <div class="d-flex align-items-center">
                            <label for="cantidad" class="mr-2" style="margin: 5px">Cantidad:</label>
                            <span id="cantidad">${quantity}</span>
                        </div>
                        <div>
                            <label for="talle" class="mb-0" style="margin: 2px; color: white;">Talle:</label>
                            <span id="talle" style="color: white;">${talle}</span>
                        </div>
                        <button type="button" class="btn btn-danger btn-eliminar" data-product-id="${productId}" data-index="${index}" id="BotonEliminar" style="border-radius: 75px; margin: 5px; text-align: center"><i class="bi bi-x-circle"></i></button>                           
                    </div>
                </div>
            </div>
        </div>
    `;
};