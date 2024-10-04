import jwt from 'jsonwebtoken';

export const generateTokenAndSetCookie = (res, userId) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: "7d",
    }) // return a token where you call the sign method and you pass the payload 

    res.cookie("token", token, {
        httpOnly: true, // to prevent XSS attack
        secure: process.env.NODE_ENV === "production", // work only in https
        sameSite: "strict", // to prevent CSRF attack
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    return token;
}