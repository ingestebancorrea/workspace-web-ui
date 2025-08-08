const errorHandlers = {
    400: 'Petición invalida.',
    401: 'No autorizado, se requiere autenticación.',
    403: 'Acceso prohibido, no tienes los permisos necesarios.',
    404: 'Datos o recursos no encontrados.',
    405: 'Método no permitido para esta ruta.',
    500: 'Error interno del servidor.',
    502: 'Bad Gateway, error en la comunicación con otros servidores.',
    503: 'Servicio no disponible, el servidor está temporalmente sobrecargado.',
    504: 'Gateway Timeout, el servidor no pudo obtener una respuesta a tiempo.',
    default: 'Ha ocurrido un error desconocido.'
};

export const errorMessage = ({ response }) => {
  if (response) {
    const status = response.status;
    return errorHandlers[status] || errorHandlers.default;
  }
};