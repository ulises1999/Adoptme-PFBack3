import { generateManyMockPets } from '../services/mocking.service.js';
import petModel from '../dao/models/Pet.js';

export const mockingPetsController = async (req, res) => {
  try {
    const pets = generateManyMockPets(100);

    const insertedPets = await petModel.insertMany(pets);

    res.status(201).json({
      status: 'success',
      message: `${insertedPets.length} mascotas mock creadas en MongoDB.`,
      pets: insertedPets,
    });
  } catch (error) {
    console.error('Error creando mascotas mock:', error);
    res.status(500).json({ status: 'error', message: 'Error creando mascotas mock' });
  }
};
