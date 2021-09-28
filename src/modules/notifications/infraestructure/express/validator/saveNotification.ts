const { check } = require('express-validator');

export default [
    check('id_user').not().isEmpty().withMessage('El id de usuario es requerido').bail()
        .isInt().toInt().withMessage('El id de usuario debe de ser un entero'),
    check('title').not().isEmpty().withMessage('El título es requerido'),
    check('icon').not().isEmpty().withMessage('El icono es requerido').bail()
        .isURL().withMessage('El icono debe estar en formato url'),
    check('url_redirect').not().isEmpty().withMessage('La url es requerida').bail()
        .isURL().withMessage('La url debe estar en formato url'),
    check('image').optional().isURL().withMessage('La imagen debe estar en formato url'),
];