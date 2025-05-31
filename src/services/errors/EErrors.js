export const errorDictionary = {
    user: {
        MISSING_FIELDS: {
            code: 'USER_001',
            message: 'Faltan campos obligatorios para registrar un usuario.',
            statusCode: 400
        },
        DUPLICATE_EMAIL: {
            code: 'USER_002',
            message: 'El correo electrónico ya está registrado.',
            statusCode: 400
        },
        INVALID_PASSWORD: {
            code: 'USER_003',
            message: 'La contraseña no cumple con los requisitos mínimos.',
            statusCode: 400
        },
        NOT_FOUND: {
            code: 'USER_004',
            message: 'Usuario no encontrado.',
            statusCode: 404
        },
        UNAUTHORIZED: {
            code: 'USER_005',
            message: 'Credenciales incorrectas.',
            statusCode: 401
    },
  },
    pet: {
        MISSING_FIELDS: {
            code: 'PET_001',
            message: 'Faltan campos obligatorios para registrar la mascota.',
            statusCode: 400
        },
        INVALID_SPECIE: {
            code: 'PET_002',
            message: 'La especie de mascota no es válida.',
            statusCode: 400
        },
        NOT_FOUND: {
            code: 'PET_003',
            message: 'Mascota no encontrada.',
            statusCode: 404
        },
        ALREADY_ADOPTED: {
            code: 'PET_004',
            message: 'La mascota ya fue adoptada.',
            statusCode: 400
        },
    },

    adoption: {
        PET_NOT_FOUND: {
            code: 'ADOPT_001',
            message: 'La mascota no existe.',
            statusCode: 404
        },
        USER_NOT_ELIGIBLE: {
            code: 'ADOPT_002',
            message: 'El usuario no es elegible para adoptar.',
            statusCode: 403
        },
        ALREADY_ADOPTED: {
            code: 'ADOPT_003',
            message: 'Esta mascota ya ha sido adoptada.',
            statusCode: 400
        },
    },

    general: {
        SERVER_ERROR: {
            code: 'GEN_001',
            message: 'Error interno del servidor.',
            statusCode: 500
        },
        BAD_REQUEST: {
            code: 'GEN_002',
            message: 'Petición mal formada.',
            statusCode: 400
        },
        UNAUTHORIZED: {
            code: 'GEN_003',
            message: 'No autorizado.',
            statusCode: 401
        },
        FORBIDDEN: {
            code: 'GEN_004',
            message: 'Acceso denegado.',
            statusCode: 403
        },
        NOT_FOUND: {
            code: 'GEN_005',
            message: 'Recurso no encontrado.',
            statusCode: 404
        },
    },
  }