import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import AppointmentRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentRepository);
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
  // get data
  const { provider_id, date } = request.body;

  // parse data
  const parsedDate = parseISO(date);

  // create service
  const createAppointment = new CreateAppointmentService();

  // run service
  const appointment = await createAppointment.execute({
    date: parsedDate,
    provider_id,
  });

  // return response
  return response.json(appointment);
});

export default appointmentsRouter;
