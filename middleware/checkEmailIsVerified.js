async function checkEmailIsVerified(req, res, next) {
    const { isEmailVerified } = req.user;

    if (!isEmailVerified) {
        return res.status(403).json({ message: "Verify your email to access this content" });
    }
    next();
}

// async function verifyUserEmail(req, res, next) {
//     const token = req.params.token;

//     if (!token) {
//         return res.status(401).json({ message: "Invalid or expired token" });
//     }
// }

module.exports = { checkEmailIsVerified };