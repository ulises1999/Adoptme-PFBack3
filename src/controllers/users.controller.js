import { usersService } from "../services/index.js"
import { errorDictionary } from "../services/errors/EErrors.js";
import { CustomError } from "../services/errors/customError.js";


const getAllUsers = async (req, res, next) => {
    try {
        const users = await usersService.getAll();
        res.send({ status: "success", payload: users })
        if (!users || users.length === 0) {
            CustomError.generateError("UsersNotFound",
                errorDictionary.user.NOT_FOUND.message,
                errorDictionary.user.NOT_FOUND.statusCode)
        }
    } catch (error) {
        next(error);
    }
}

const getUser = async (req, res) => {
    try {
        const userId = req.params.uid;
        if (!userId) {
            CustomError.generateError(
                'InvalidUserId',
                errorDictionary.general.BAD_REQUEST.message,
                `El ID de usuario proporcionado es inválido o nulo.`,
                errorDictionary.general.BAD_REQUEST.statusCode,
            );
        }
        const user = await usersService.getUserById(userId);
        if (!user) {
            CustomError.generateError(
                'UserNotFound',
                errorDictionary.user.NOT_FOUND.message,
                { uid: userId },
                errorDictionary.user.NOT_FOUND.statusCode,
            );
        }
        res.send({ status: "success", payload: user });
    } catch (error) {
        next(error);
    }
}

const updateUser = async (req, res, next) => {
    try {
        const updateBody = req.body;
        const userId = req.params.uid;
        if (!userId) {
            CustomError.generateError(
                'InvalidUserId',
                errorDictionary.general.BAD_REQUEST.message,
                `El ID de usuario proporcionado es inválido o nulo.`,
                errorDictionary.general.BAD_REQUEST.statusCode,
            );
        }
        const user = await usersService.getUserById(userId);
        if (!user) {
            CustomError.generateError(
                'UserNotFound',
                errorDictionary.user.NOT_FOUND.message,
                { userId: userId },
                errorDictionary.user.NOT_FOUND.statusCode,
            );
        }
        const result = await usersService.update(userId, updateBody);
        res.send({ status: "success", message: "Usuario actualizado exitosamente" });
    } catch (error) {
        next(error);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.uid;
        if (!userId) {
            CustomError.generateError(
                'InvalidUserId',
                errorDictionary.general.BAD_REQUEST.message,
                `El ID de usuario proporcionado es inválido o nulo.`,
                errorDictionary.general.BAD_REQUEST.statusCode,
            );
        }
        const userToDelete = await usersService.getUserById(userId);
        if (!userToDelete) {
            CustomError.generateError(
                'UserNotFound',
                errorDictionary.user.NOT_FOUND.message,
                `No se encontró un usuario con el ID: ${userId}`,
                errorDictionary.user.NOT_FOUND.statusCode,
            );
        }
        const deleteResult = await usersService.deleteUser(userId);
        res.send({ status: "success", message: "Usuario eliminado exitosamente" });
    } catch (error) {
        next(error);
    }
};

export default {
    deleteUser,
    getAllUsers,
    getUser,
    updateUser
}