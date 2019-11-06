import * as Yup from 'yup';
import Plans from '../models/Plans';

class PlansController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.string().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails' });
    }

    const planExists = await Plans.findOne({
      where: {
        title: req.body.title,
      },
    });

    if (planExists) {
      return res.status(401).json({ error: 'This plan already exists' });
    }

    const { title, duration, price } = await Plans.create(req.body);

    return res.json({ title, duration, price });
  }

  async index(req, res) {
    const plan = await Plans.findAll({
      where: {
        deleted_at: null,
      },
    });

    return res.json(plan);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      duration: Yup.string(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails' });
    }

    const plan = await Plans.findByPk(req.params.id);

    if (!plan) {
      res.status(400).json({ error: 'This plan does not exist' });
    }

    const { title, duration, price } = await plan.update(req.body);

    return res.json({
      title,
      duration,
      price,
    });
  }

  async delete(req, res) {
    const plan = await Plans.findByPk(req.params.id);

    if (!plan) {
      return res.status(400).json({ error: 'This plan does not exists ' });
    }

    plan.deleted_at = new Date();

    await plan.save();

    return res.json(plan);
  }
}

export default new PlansController();
