import * as Yup from 'yup';

import Students from '../models/Students';

class StudentsController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      years_old: Yup.string().required(),
      weight: Yup.string().required(),
      height: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(401)
        .json({ error: 'please check the informations and try again' });
    }

    const studentsExists = await Students.findOne({
      where: { email: req.body.email },
    });

    if (studentsExists) {
      return res.status(400).json({ error: 'E-mail is already in use' });
    }

    const { name, email, years_old, weight, height } = await Students.create(
      req.body
    );

    return res.json({ name, email, years_old, weight, height });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      years_old: Yup.string(),
      weight: Yup.string(),
      height: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(401)
        .json({ error: 'please check the informations and try again' });
    }
    const { email } = req.body;

    // Send id via url params (http://localhost:3000/students/:id)
    const { id } = req.params;

    const student = await Students.findByPk(id);

    if (email !== student.email) {
      const studentExists = Students.findOne({ where: { email } });

      if (studentExists) {
        return res.status(400).json({ error: 'E-mail already in use' });
      }
    }

    // student's informations will receive new values by input
    const { name, years_old, weight, height } = await student.update(req.body);

    return res.json({ email, name, years_old, weight, height });
  }
}

export default new StudentsController();
