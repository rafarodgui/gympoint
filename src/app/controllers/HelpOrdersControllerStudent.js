import * as Yup from 'yup';
import HelpOrders from '../models/Help_orders';

class HelpOrdersController {
  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      question: Yup.string().required(),
    });

    if (!schema.isValid()) {
      return res
        .status(401)
        .json({ error: 'Check the informations and try again' });
    }

    const { question, student_id } = req.body;

    if (!student_id || !question) {
      return res.status(401).json({ error: 'Information missing' });
    }

    const help = await HelpOrders.create({ student_id, question });

    return res.json(help);
  }

  async index(req, res) {
    const { id } = req.params;

    const helps = await HelpOrders.findAll({
      where: {
        student_id: id,
      },
    });

    return res.json(helps);
  }
}

export default new HelpOrdersController();
