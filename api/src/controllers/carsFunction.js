//Traer base de datos (card y categories)
const Cars = require('../models/Cars');

const idCars = async (req,res)=>{
    const {id} =req.params;
    try{
        if (id) {
            let carDetail= await Cars.find({"_id" : id}).populate('Categories');
            let carId ={
            id: carDetail.id,
            marca:carDetail.brand,
            name:carDetail.name,
            description:carDetail.description,
            img:carDetail.img,
            category:carDetail.category,
            features:carDetail.features
            }
            res.status(200).send(carId)
        }
    }catch(error){
        res.status(404).send(error)
    }
}

const GetAllCars = async (req,res,next) => {
    try {
        const GetAll = await Cars.findAll()
        return res.status(200).json(GetAll);
        
    }catch(error){
        res.status(404).send(error)
    }
}

//S25 Crear ruta para crear/agregar Producto
const CreateProduct = async (req,res,next) => {
    try{
        const {name,brand, model,description,img,category,features} = req.body;

        const NewProduct = new Cars({
            name,
            brand,
            model,
            description,
            img,
            category,
            features
        });
        await NewProduct.save()
        res.status(200).json(NewProduct)
    }catch(error){
        next(error);
    }
}

//Buscar un producto por nombre exacto 
//FALTA IMPLEMENTAR FILTER CON INCLUDE
const ProductByName = async (req,res,next) => {
    const {name} = req.query;
    try {
        const ProductDB = await Cars.findOne({"name" : name})
        if(ProductDB !== null){
            res.status(200).json(ProductDB)
        }
    }catch(error){
        next(error);
    }
}

module.exports = {
    idCars,
    CreateProduct,
    ProductByName,
    GetAllCars
  }