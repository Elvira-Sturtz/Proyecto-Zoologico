const habitatCtrl = {}  /*objeto vacío*/ 

 const Habitat = require('../models/Habitat')

// Obtener todas las habitats
 habitatCtrl.getHabitats = async(req, res) =>{
    try {
        const habitats = await Habitat.find();
        res.json(habitats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

 } 

 //Crear Habitat
 habitatCtrl.createHabitat = async(req, res) =>{   
    try {
        const { nombre, clima, vegetacion, continentes } = req.body;

        const newHabitat = new Habitat({
            nombre,
            clima,
            vegetacion, 
            continentes
        });

        await newHabitat.save();
        res.status(201).json(newHabitat);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    
 }

 // Obtener habitat por ID 
 habitatCtrl.getHabitatById = async(req, res) =>{               
    try {
        const habitat = await Habitat.findById(req.params.id);

        if (!habitat) {
            return res.status(404).json({ message: 'Habitat no encontrada' });
        }

        res.json(habitat);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
 }

 // Eliminar habitat 
 habitatCtrl.deleteHabitat = async(req, res) =>{ 
    try {
        const deletedHabitat = await Habitat.findByIdAndDelete(req.params.id);

        if (!deletedHabitat) {
            return res.status(404).json({ message: 'Habitat no encontrada' });
        }

        res.json({ message: 'Habitat eliminada correctamente' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
 }

 // Actualizar habitat 
 habitatCtrl.updateHabitat = async(req, res) =>{  
    try {
        const { nombre, clima, vegetacion, continentes } = req.body;

        const updatedHabitat = await Habitat.findByIdAndUpdate(
            req.params.id,
            { nombre, clima, vegetacion, continentes },
            { new: true }
        );

        if (!updatedHabitat) {
            return res.status(404).json({ message: 'Habitat no encontrada' });
        }

        res.json(updatedHabitat);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    
 } 

module.exports = habitatCtrl; 