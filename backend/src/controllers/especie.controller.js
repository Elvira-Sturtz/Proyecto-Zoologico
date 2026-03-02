const especieCtrl = {}  /*objeto vacío*/ 

 const Especie = require('../models/Especie')

// Obtener todas las Especies
 especieCtrl.getEspecies = async(req, res) =>{
    try {
        const especies = await Especie.find()
          .populate('zona')
          .populate('habitats')

        res.json(especies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

 } 

 //Crear Especie
 especieCtrl.createEspecie = async(req, res) =>{   
    try {
        const { nombre, nombreCientifico, descripcion, zona, habitats } = req.body;

        const newEspecie = new Especie({
            nombre,
            nombreCientifico, 
            descripcion, 
            zona, 
            habitats
        });

        await newEspecie.save();
        res.status(201).json({ message: "Especie creada correctamente" } );

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    
 }

 // Obtener Especie por ID 
 especieCtrl.getEspecieById = async(req, res) =>{               
    try {
        const especie = await Especie.findById(req.params.id)
            .populate('zona')
            .populate('habitats')

        if (!especie) {
            return res.status(404).json({ message: 'Especie no encontrada' });
        }

        res.json(especie);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
 }

 // Eliminar Especie 
 especieCtrl.deleteEspecie = async(req, res) =>{ 
    try {
        const deletedEspecie = await Especie.findByIdAndDelete(req.params.id);

        if (!deletedEspecie) {
            return res.status(404).json({ message: 'Especie no encontrada' });
        }

        res.json({ message: 'Especie eliminada correctamente' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
 }

 // Actualizar Especie 
 especieCtrl.updateEspecie = async(req, res) =>{  
    try {
        const { nombre, nombreCientifico, descripcion, zona, habitats } = req.body;

        const updatedEspecie = await Especie.findByIdAndUpdate(
            req.params.id,
            { nombre, nombreCientifico, descripcion, zona, habitats },
            { new: true }
        );

        if (!updatedEspecie) {
            return res.status(404).json({ message: 'Especie no encontrada' });
        }

        res.json(updatedEspecie);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    
 } 

module.exports = especieCtrl; 