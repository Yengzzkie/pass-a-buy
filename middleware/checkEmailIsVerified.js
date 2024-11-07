async function checkEmailIsVerified(req, res, next) {
    const { isEmailVerified } = req.user;

    if (!isEmailVerified) {
        return res.status(403).json({ message: "Verify your email to access this content" });
    }

    next();
}

module.exports = { checkEmailIsVerified };