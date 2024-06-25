import { Router } from 'express';
import { googleAuth, googleCallback, listMessages } from '../controllers/gmailController';

const router = Router();

router.get('/auth/google', googleAuth);
router.get('/auth/google/callback', googleCallback);
router.get('/emails', listMessages);

export default router;
