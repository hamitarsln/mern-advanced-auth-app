import express from 'express';
import {
    login,
    logout,
    signup,
    verifyEmail,
    forgotPassword,
    resetPassword,
    checkAuth
} from '../controllers/auth.controller.js'; // we need keep the .js extension because we are using type: module in package.json
import { verifyToken } from '../middleware/verifyToken.js'; // we need keep the .js extension because we are using type: module in package.json

const router = express.Router();

router.get("/check-auth", verifyToken, checkAuth);
// router.get("/update-profile", verifyToken, updateProfile); // verifyToken = user is authenticated or not.

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router; // we need to export the router so we can import it in backend/index.js