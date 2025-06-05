import { fakerES_MX as fa } from '@faker-js/faker';
import bcrypt from "bcrypt";

export const generateManyMockPets = (num) => {
    const pets = [];
    for (let i = 0; i < num; i++) {
        const pet = {
            name: fa.animal.petName(),
            specie: fa.animal.type(),
            birthDate: fa.date.past(2),
            adopted: false,
            owner: null,
            image: fa.image.urlPicsumPhotos({
                category: 'animals',
                width: 640,
                height: 480,
            })
        };
        pets.push(pet);
    }
    return pets;
};

export const generateMockUsers = async (numUsers) => {
    if (numUsers <= 0) {
        return [];
    }
    const users = [];
    for (let i = 0; i < numUsers; i++) {
        const hashedPassword = await bcrypt.hash('coder123', 10);
        const role = fa.helpers.arrayElement(['user', 'admin']);
        users.push({
            first_name: fa.person.firstName(),
            last_name: fa.person.lastName(),
            email: fa.internet.email(),
            password: hashedPassword,
            role: role,
            pets: [],
        });
    }
    return users;
};

