exports.createPostValidator = (req, res, next) => {
    // title
    req.check('title', 'Écrire un titre').notEmpty();
    req.check('title', "Le titre doit contenir entre 4 et 150 caractères").isLength({
        min: 4,
        max: 150
    });
    // body
    req.check('body', 'Rédiger un contenu').notEmpty();
    req.check('body', "Le contenu doit contenir entre 4 et 2000 caractères").isLength({
        min: 4,
        max: 2000
    });
    // check for errors
    const errors = req.validationErrors();
    // if error show the first one as they happen
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    // proceed to next middleware
    next();
};

exports.userSignupValidator = (req, res, next) => {
    // name is not null and between 4-10 characters
    req.check('name', 'Un nom est requis').notEmpty();
    // email is not null, valid and normalized
    req.check('email', "L'email doit contenir entre 3 et 32 caractères")
        .matches(/.+\@.+\..+/)
        .withMessage("L'email doit contenir @")
        .isLength({
            min: 4,
            max: 2000
        });
    // check for password
    req.check('password', 'Un mot de passe est requis').notEmpty();
    req.check('password')
        .isLength({ min: 6 })
        .withMessage('Le mot de passe doit contenir au moins 6 caractères')
        .matches(/\d/)
        .withMessage('Le mot de passe doit contenir un nombre');
    // check for errors
    const errors = req.validationErrors();
    // if error show the first one as they happen
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    // proceed to next middleware
    next();
};

exports.userSigninValidator = (request, response, next) => {
    request
        .check('email', "L'email doit contenir entre 3 et 32 caractères")
        .matches(
            /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
        )
        .withMessage('Veuillez entre votre adresse email valide')
        .isLength({
            min: 4,
            max: 32
        });
    request.check('password', 'Invalid Social Login Token!').notEmpty();
    request
        .check('password')
        .isLength({ min: 6 })
        .withMessage('Your social login token is invalid!');
    const errors = request.validationErrors();
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    next();
};

exports.passwordResetValidator = (req, res, next) => {
    // check for password
    req.check('newPassword', 'Un mot de passe est requis').notEmpty();
    req.check('newPassword')
        .isLength({ min: 6 })
        .withMessage('Le mot de passe doit contenir au moins 6 caractères')
        .matches(
            /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
        )
        .withMessage('doit contenir un nombre')
        .withMessage('Votre mot de passe doit contenir un nombre');

    // check for errors
    const errors = req.validationErrors();
    // if error show the first one as they happen
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    // proceed to next middleware or ...
    next();
};
