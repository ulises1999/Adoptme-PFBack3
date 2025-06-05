import { generateManyMockPets, generateMockUsers } from '../services/mocking.service.js';
import petModel from '../dao/models/Pet.js';
import userModel from '../dao/models/User.js'
import logger from "../utils/logger.js";

export const generateDataController = async (req, res) => {
    try {
        const { users: numUsers, pets: numPets } = req.body;
        const usersToGenerate = parseInt(numUsers);
        const petsToGenerate = parseInt(numPets);
        if (isNaN(usersToGenerate) || usersToGenerate < 0 || isNaN(petsToGenerate) || petsToGenerate < 0) {
            return res.status(400).json({
                status: 'error',
                message: 'Los parámetros "users" y "pets" deben ser números no negativos.'
            });
        }
        let insertedUsersCount = 0;
        let insertedPetsCount = 0;
        if (usersToGenerate > 0) {
            const users = await generateMockUsers(usersToGenerate);
            const insertedUsers = await userModel.insertMany(users);
            insertedUsersCount = insertedUsers.length;
        }
        if (petsToGenerate > 0) {
            const pets = generateManyMockPets(petsToGenerate);
            const insertedPets = await petModel.insertMany(pets);
            insertedPetsCount = insertedPets.length;
        }
        res.status(200).json({
            status: 'success',
            message: `Operación de generación de datos completada.`,
            usersInserted: insertedUsersCount,
            petsInserted: insertedPetsCount
        });
    } catch (error) {
        logger.error('Error en generateDataController:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error al generar e insertar datos mock.',
            error: error.message
        });
    }
};