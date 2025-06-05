import { usersService } from "../services/index.js";
import { createHash, passwordValidation } from "../utils/index.js";
import jwt from 'jsonwebtoken';
import UserDTO from '../dto/User.dto.js';
import logger from "../utils/logger.js";
import { CustomError } from "../services/errors/custom.error.js";

const register = async (req, res, next) => {
    try {
        const { first_name, last_name, email, password } = req.body;
        if (!first_name || !last_name || !email || !password) {
            CustomError.generateError(
                'Registro de Usuario',
                errorDictionary.user.MISSING_FIELDS.message,
                `Los campos 'first_name', 'last_name', 'email' y 'password' son obligatorios.`,
                errorDictionary.user.MISSING_FIELDS.statusCode
            );
        }
        const exists = await usersService.getUserByEmail(email);
        if (exists) {
            CustomError.generateError(
                'Registro de Usuario',
                errorDictionary.user.DUPLICATE_EMAIL.message,
                `El email '${email}' ya se encuentra registrado.`,
                errorDictionary.user.DUPLICATE_EMAIL.statusCode
            );
        }
        const hashedPassword = await createHash(password);
        const user = {
            first_name,
            last_name,
            email,
            password: hashedPassword
        }
        let result = await usersService.create(user);
        logger.info(result);
        res.send({ status: "success", payload: result._id });
    } catch (error) {
        next(error);
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            CustomError.generateError(
                'Error de Autenticación',
                errorDictionary.general.BAD_REQUEST.message,
                'El email y la contraseña son obligatorios para iniciar sesión.',
                errorDictionary.general.BAD_REQUEST.statusCode
            );
        }
        const user = await usersService.getUserByEmail(email);
        if (!user) {
            CustomError.generateError(
                'Error de Autenticación',
                errorDictionary.user.NOT_FOUND.message,
                `Usuario con email '${email}' no encontrado en la base de datos.`,
                errorDictionary.user.NOT_FOUND.statusCode
            );
        }
        const isValidPassword = await passwordValidation(user, password);
        if (!isValidPassword) {
            CustomError.generateError(
                'Error de Autenticación',
                errorDictionary.user.UNAUTHORIZED.message,
                'La contraseña proporcionada es incorrecta.',
                errorDictionary.user.UNAUTHORIZED.statusCode
            );
        }
        const userDto = UserDTO.getUserTokenFrom(user);
        const token = jwt.sign(userDto, 'tokenSecretJWT', { expiresIn: "1h" });
        res.cookie('coderCookie', token, { maxAge: 3600000, httpOnly: true, secure: process.env.NODE_ENV === 'production' })
            .status(200)
            .send({ status: "success", message: "Inicio de sesión exitoso.", payload: userDto });
    } catch (error) {
        next(error);
    }
};

const current = async (req, res) => {
    const cookie = req.cookies['coderCookie']
    const user = jwt.verify(cookie, 'tokenSecretJWT');
    if (user)
        return res.send({ status: "success", payload: user })
}

const unprotectedLogin = async (req, res,next) => {
 try {
        const { email, password } = req.body;
        if (!email || !password) {
            CustomError.generateError(
                'Error de Autenticación',
                errorDictionary.general.BAD_REQUEST.message,
                'El email y la contraseña son obligatorios para iniciar sesión.',
                errorDictionary.general.BAD_REQUEST.statusCode
            );
        }
        const user = await usersService.getUserByEmail(email);
        if (!user) {
            CustomError.generateError(
                'Error de Autenticación',
                errorDictionary.user.NOT_FOUND.message,
                `Usuario con email '${email}' no encontrado.`,
                errorDictionary.user.NOT_FOUND.statusCode
            );
        }
        const isValidPassword = await passwordValidation(user, password);
        if (!isValidPassword) {
            CustomError.generateError(
                'Error de Autenticación',
                errorDictionary.user.UNAUTHORIZED.message,
                'La contraseña proporcionada es incorrecta.',
                errorDictionary.user.UNAUTHORIZED.statusCode
            );
        }
        const token = jwt.sign(user, 'tokenSecretJWT', { expiresIn: "1h" });
        res.cookie('unprotectedCookie', token, 
            { maxAge: 3600000, httpOnly: true, secure: process.env.NODE_ENV === 'production' })
            .send({ status: "success", message: "Inicio de sesión no protegido exitoso.", payload: user });
    } catch (error) {
        next(error);
    }
};
const unprotectedCurrent = async (req, res,next) => {
    try {
        const cookie = req.cookies['unprotectedCookie'];
        if (!cookie) {
            CustomError.generateError(
                'Error de Autorización',
                errorDictionary.auth.NO_TOKEN.message,
                'No se encontró la cookie de sesión no protegida.',
                errorDictionary.auth.NO_TOKEN.statusCode
            );
        }
        const user = jwt.verify(cookie, 'tokenSecretJWT');
        return res.send({ status: "success", payload: user });
    } catch (error) {
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return next(CustomError.generateError(
                'Error de Autorización',
                errorDictionary.auth.INVALID_TOKEN.message,
                `Token no protegido inválido o expirado: ${error.message}`,
                errorDictionary.auth.INVALID_TOKEN.statusCode
            ));
        }
        next(error);
    }
};
export default {
    current,
    login,
    register,
    current,
    unprotectedLogin,
    unprotectedCurrent
}