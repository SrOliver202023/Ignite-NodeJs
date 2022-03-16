import { Router } from 'express';

import { createRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController';
import { devolutionRentalController } from '@modules/rentals/useCases/devolutionRental/DevolutionRentalController';
import { listRentalsByUserController } from '@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController';

import { ensureAuhtenticated } from '../middlewares/ensureAuthenticated';

const rentalRoutes = Router();

rentalRoutes.post("/", ensureAuhtenticated, createRentalController);
rentalRoutes.post("/devolution/:id", ensureAuhtenticated, devolutionRentalController);
rentalRoutes.get('/user', ensureAuhtenticated, listRentalsByUserController);

export { rentalRoutes };

