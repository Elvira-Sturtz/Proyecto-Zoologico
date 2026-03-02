const zonaCtrl = {}  /*objeto vacío*/ 

 const Zona = require('../models/Zona')

// Obtener todas las zonas
 zonaCtrl.getZonas = async(req, res) =>{
    try {
        const zonas = await Zona.find();
        res.json(zonas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

 } 

 //Crear Zona
 zonaCtrl.createZona = async(req, res) =>{   
    try {
        const { nombre, extension } = req.body;

        const newZona = new Zona({
            nombre,
            extension
        });

        await newZona.save();
        res.status(201).json({ message: "Zona creada correctamente" } );

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    
 }

 // Obtener zona por ID 
 zonaCtrl.getZonaById = async(req, res) =>{               
    try {
        const zona = await Zona.findById(req.params.id);

        if (!zona) {
            return res.status(404).json({ message: 'Zona no encontrada' });
        }

        res.json(zona);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
 }

 // Eliminar zona 
 zonaCtrl.deleteZona = async(req, res) =>{ 
    try {
        const deletedZona = await Zona.findByIdAndDelete(req.params.id);

        if (!deletedZona) {
            return res.status(404).json({ message: 'Zona no encontrada' });
        }

        res.json({ message: 'Zona eliminada correctamente' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
 }

 // Actualizar zona 
 zonaCtrl.updateZona = async(req, res) =>{  //petición por put para actualizar 
    try {
        const { nombre, extension } = req.body;

        const updatedZona = await Zona.findByIdAndUpdate(
            req.params.id,
            { nombre, extension },
            { new: true }
        );

        if (!updatedZona) {
            return res.status(404).json({ message: 'Zona no encontrada' });
        }

        res.json(updatedZona);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    
 } 

module.exports = zonaCtrl; 