class Container{
    constructor(){
        this.products = []
    }
    static idCount = 1;

    save(newProduct){    //save(Object): Number - Recibe un objeto, devuelve el id asignado.
        newProduct.id = Container.idCount;
        this.products.push(newProduct)
        Container.idCount++;
        return newProduct;
    }

    getById(idParameter){ //getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
        const productFind = this.products.find(e => e.id == idParameter);
        if (productFind != undefined) return productFind;
        else return {error: 'Product not found'};
    }

    getAll() {      // getAll(): Object[] - Devuelve un array con los objetos presentes en el array.
        return this.products
      } 
     
    
    deleteById(idParameter){ //deleteById(Number): void - Elimina del archivo el objeto con el id buscado.
        const productFindIndex = this.products.findIndex(e => e.id == idParameter);
        if (productFindIndex != -1) this.products.splice(productFindIndex,1);
        else return {error: 'Product not found'};
    }

    updateById(idParameter, updateProduct){ //updateById(Number): Actualiza un producto segun su id}
        const productFindIndex = this.products.findIndex(e => e.id == idParameter);
        
        if (productFindIndex != -1) {
            updateProduct.id = parseInt(idParameter);
            this.products[productFindIndex] = updateProduct
            return(updateProduct);
        }
        else return({error: 'Product not found'});

    }

}
module.exports = Container