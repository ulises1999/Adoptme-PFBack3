export const errorDictionary = {
  user: {
    MISSING_FIELDS: {
      code: 'USER_001',
      message: 'Faltan campos obligatorios para registrar un usuario.',
    },
    DUPLICATE_EMAIL: {
      code: 'USER_002',
      message: 'El correo electrónico ya está registrado.',
    },
    INVALID_PASSWORD: {
      code: 'USER_003',
      message: 'La contraseña no cumple con los requisitos mínimos.',
    },
    NOT_FOUND: {
      code: 'USER_004',
      message: 'Usuario no encontrado.',
    },
    UNAUTHORIZED: {
      code: 'USER_005',
      message: 'Credenciales incorrectas.',
    },
  },

  pet: {
    MISSING_FIELDS: {
      code: 'PET_001',
      message: 'Faltan campos obligatorios para registrar la mascota.',
    },
    INVALID_SPECIE: {
      code: 'PET_002',
      message: 'La especie de mascota no es válida.',
    },
    NOT_FOUND: {
      code: 'PET_003',
      message: 'Mascota no encontrada.',
    },
    ALREADY_ADOPTED: {
      code: 'PET_004',
      message: 'La mascota ya fue adoptada.',
    },
  },

  adoption: {
    PET_NOT_FOUND: {
      code: 'ADOPT_001',
      message: 'La mascota no existe.',
    },
    USER_NOT_ELIGIBLE: {
      code: 'ADOPT_002',
      message: 'El usuario no es elegible para adoptar.',
    },
    ALREADY_ADOPTED: {
      code: 'ADOPT_003',
      message: 'Esta mascota ya ha sido adoptada.',
    },
  },

  general: {
    SERVER_ERROR: {
      code: 'GEN_001',
      message: 'Error interno del servidor.',
    },
    BAD_REQUEST: {
      code: 'GEN_002',
      message: 'Petición mal formada.',
    },
    UNAUTHORIZED: {
      code: 'GEN_003',
      message: 'No autorizado.',
    },
    FORBIDDEN: {
      code: 'GEN_004',
      message: 'Acceso denegado.',
    },
    NOT_FOUND: {
      code: 'GEN_005',
      message: 'Recurso no encontrado.',
    },
  },
};
