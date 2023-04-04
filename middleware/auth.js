import jwt from 'jsonwebtoken'

export const auth = async (req, res, next) => {
    try {
        let token = null;

        const { authorization } = req.headers;
        if (authorization && authorization.startsWith("Bearer")) {
            token = authorization.split(" ")[1];
        }

        const isValid = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = isValid.userId;
        next();
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}