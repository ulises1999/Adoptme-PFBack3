import { generateManyMockPets, generateMockUsers } from '../services/mocking.service.js';
import petModel from '../dao/models/Pet.js';
import userModel from '../dao/models/User.js';
import logger from "../utils/logger.js";

const mockingPetsController = async (req, res) => {
  try {
    const pets = generateManyMockPets(100);
    const insertedPets = await petModel.insertMany(pets);
    res.status(201).json({
      status: 'success',
      message: `${insertedPets.length} mascotas mock creadas en MongoDB.`,
      pets: insertedPets,
    });
  } catch (error) {
    logger.error('Error creando mascotas mock:', error);
    res.status(500).json({ status: 'error', message: 'Error creando mascotas mock' });
  }
};

const mockingUsersController = async (req, res) => {
  try {
    const users = await generateMockUsers(50);
    const insertedUsers = await userModel.insertMany(users)
    res.status(201).json({
      status: 'success',
      message: `${insertedUsers.length} mock de usuarios creadas en MongoDB.`,
      user: insertedUsers,
    })
  } catch (error) {
    logger.error('Error creando user mock:', error);
    res.status(500).json({ status: 'error', message: 'Error creando users mock' });
  }
}

export { mockingPetsController, mockingUsersController };