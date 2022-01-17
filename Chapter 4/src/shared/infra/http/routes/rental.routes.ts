import { Router } from 'express';
import { createRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController';
import { ensureAuhtenticated } from '../middlewares/ensureAuthenticated';

const rentalRoutes = Router();

rentalRoutes.post("/", ensureAuhtenticated, createRentalController);

export { rentalRoutes };

