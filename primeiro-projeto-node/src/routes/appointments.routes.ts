import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentRepository();

// SoC: Separation of Concerns

appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.all();

  return response.json(appointments);
});

appointmentsRouter.post('/', (request, response) => {
  try {
    // get data
    const { provider, date } = request.body;

    // parse data
    const parsedDate = parseISO(date);

    // create service
    const createAppointment = new CreateAppointmentService(
      appointmentsRepository,
    );

    // run service
    const appointment = createAppointment.execute({
      date: parsedDate,
      provider,
    });

    // return response
    return response.json(appointment);
  } catch (err) {
    // return error response
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;
