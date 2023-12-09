import jwt from 'jsonwebtoken'
import crypto from 'crypto'

const secretKey = crypto.randomBytes(64).toString('hex');

export function generateToken(user) {
    const token = jwt.sign(user, secretKey, {expiresIn: '2h'})
    return token
}

export async function verifyToken(token) {
    try {
        const decoded = await jwt.verify(token.split(' ')[1], secretKey);
        return decoded;
    } catch (error) {
        return null
    }
}