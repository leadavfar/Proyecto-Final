//Traer base de datos (card y categories)
const Car = require('../models/Cars.js');

require('../db.js')

const idCars = async (req,res)=>{
const { id } = req.params
if (id) {
    try {
        const getCarDetail = await Car.findById(id)
        res.status(200).send(getCarDetail)
    } catch (error) {
        console.log(error)
    }
} else {
    res.status(400).send("Id Undefine");
}
}

const GetAllCars = async (req,res,next) => {
    const {name} = req.query;
    console.log('name', name)
  // si hay query name
    if(name){
        try {
            const CarByName = await Car.findOne({ "name": name })
            console.log('car by name',CarByName)
            if(CarByName !== null){
                res.status(200).json(CarByName)
            }
        }catch(error){
            next(error);
        }
    }
    else{
        try {
            const GetAll = await Car.find()
            //console.log(GetAll)
            return res.status(200).send(GetAll);
            
        }catch(error){
            //console.log(error)
            res.status(404).send(error)
        }
    }

}

//S25 Crear ruta para crear/agregar Producto
const CreateProduct = async (req,res,next) => {
    try{
        const {name,brand, model,description,img,category,features} = req.body;

        const NewProduct = new Car({
            name,
            brand,
            model,
            img,
            description,
            features,
            category,
        });
        await NewProduct.save()
        res.status(200).json(NewProduct)
    }catch(error){
        next(error);
    }
}

//Buscar un producto por nombre exacto 
//FALTA IMPLEMENTAR FILTER CON INCLUDE


const DeleteCar = async (req,res,next) =>{
    const { id } = req.params;
    try {
    await Car.findByIdAndDelete(id)
    res.send("Auto eliminado correctamente");
} catch (error) {
    console.log(error)
}
}

const ModifiCar = async(req,res) =>{
    const { id } = req.params;
    const updates = req.body;
    console.log(updates)
    try {
    await Car.findByIdAndUpdate(id,updates)
    res.send("Auto actualizado correctamente");
} catch (error) {
    console.log(error)
}
}


module.exports = {
    idCars,
    CreateProduct,
    GetAllCars,
    DeleteCar,
    ModifiCar
  }