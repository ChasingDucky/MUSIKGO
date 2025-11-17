import { Router } from 'express';
import {
  getAllTracks,
  getTrackById,
  searchTracks,
  createTrack,
  updateTrack,
  deleteTrack,
} from '../controllers/trackController';

const router = Router();

router.get('/', getAllTracks);
router.get('/search', searchTracks);
router.get('/:id', getTrackById);
router.post('/', createTrack);
router.put('/:id', updateTrack);
router.delete('/:id', deleteTrack);

export default router;
