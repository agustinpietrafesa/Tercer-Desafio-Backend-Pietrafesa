const fs = require('fs')

class ProductManager {
    path

    constructor(path){
        this.products = []
        this.path = './Files/Products.JSON'

    };
    productId = 0 

    /*********Metodo para agregar productos nuevos la lista *************/
    async addProduct(title, description, price, thumbnail, code, stock) {
        try {
            this.productId++;
            const product = {
                title,
                description,
                price,
                thumbnail,
                code,
                stock,
                id: this.productId
            }   
            /*******Generamos la obligatoriedad de los parametros  *********/
            const allParams = [title, description, price, thumbnail, code, stock]
            const reqParams = allParams.every(value => value);
    
            if ( !reqParams ){
                console.warn('Todos los parametros deben completarse')
                return;
            }
            /********Generamos la singulairdad del code ******/
            const checkCode = this.products.find(productCode => productCode.code === code)
    
            if(checkCode) {
                console.log(`El producto con el codigo ${checkCode.code} ya esta ingresado en el sistema.`)
            } else {            
                this.products.push(product);
            }
    
    
            /**************Escribimos el archivo JSON con los datos de los productos *******/
             await fs.promises.writeFile(this.path, JSON.stringify(this.products))
            
            
        } catch (error) {
            console.log(error)
        }

     };

    /*********Metodo que retorna toda la lista de los productos que haya hasta el momento *******/
    async getProducts() {
        try {
            if(fs.existsSync(this.path)){
                const data = await fs.promises.readFile(this.path, 'utf-8')
                const ourProducts = JSON.parse(data)
                return ourProducts
            }else{
                return []
            };            
        } catch (error) {
            console.log(error)
        }    

    }  
    /*********metodo que busca producto mediante un ID pasado como parametro ******/
    getProductById(id) {
        const productoBuscado = this.products.find(product => product.id === id)

        productoBuscado ? console.log(productoBuscado) : console.log('Product Not Found');
    }
};

/*********Exportamos la clase ********/

module.exports = ProductManager



