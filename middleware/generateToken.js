const jwt = require('jsonwebtoken');

// generates token for newly created account
async function generateVerificationToken(id, email) {
    try {
        const token = jwt.sign({ id, email }, process.env.JWT_SECRET, { expiresIn: "1h" });
        return token;

    } catch (error) {
        console.error("Failed generating verification token", error)
    }
}

module.exports = { generateVerificationToken };