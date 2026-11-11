import express from 'express';
import {
  submitVolunteer,
  getVolunteers,
  updateVolunteerStatus,
  deleteVolunteer,
} from '../controllers/volunteerController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/', submitVolunteer);
router.get('/', protect, getVolunteers);
router.put('/:id', protect, updateVolunteerStatus);
router.delete('/:id', protect, deleteVolunteer);

export default router;
