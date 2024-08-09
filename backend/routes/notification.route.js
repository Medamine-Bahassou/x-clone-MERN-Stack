import express from 'express'
import { protectRoute } from '../middleware/protectRoute.js';
import { getNotifications, deleteNotifications, deleteOneNotification } from '../controllers/notification.controller.js';

const  router = express.Router()


router.get('/', protectRoute, getNotifications)
router.delete('/', protectRoute, deleteNotifications)
router.delete('/:id', protectRoute, deleteOneNotification) // it doesn't implemented in the app (must me implemented to learn)


export default router ; 