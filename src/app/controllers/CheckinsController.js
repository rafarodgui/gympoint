import * as Yup from 'yup';
import { Op } from 'sequelize';
import { parseISO, addDays, startOfHour } from 'date-fns';
import Checkins from '../models/Checkins';
import Students from '../models/Students';

class CheckinsController {
  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number(),
    });

    if (!(await schema.isValid())) {
      return res
        .status(401)
        .json({ error: 'Check informations and try again' });
    }

    const { student_id } = req.body;
    const { id } = req.params;

    const student = await Students.findByPk(id);

    if (!student) {
      return res.status(401).json({ error: 'This student does not exists' });
    }

    if (student.id !== student_id) {
      return res.status(401).json({ error: 'Incorrect Id' });
    }

    const checkin = await Checkins.create({ student_id });

    return res.json(checkin);
  }

  async index(req, res) {
    const checkins = await Checkins.findAll({
      where: {
        student_id: req.params.index,
      },
    });

    if (checkins.length === 0) {
      return res
        .status(401)
        .json({ error: 'No checkin was found for this student' });
    }

    return res.json(checkins);
  }
}
export default new CheckinsController();
