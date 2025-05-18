import { fakerES_MX as fa } from '@faker-js/faker';

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
