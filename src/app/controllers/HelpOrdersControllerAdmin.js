import * as Yup from 'yup';
import HelpOrders from '../models/Help_orders';
import Queue from '../../lib/Queue';
import AnswerMail from '../jobs/AnswerMail';

class HelpOrdersControllerAdmin {
  async index(req, res) {
    const helpsWithNoAnswer = await HelpOrders.findAll({
      where: {
        answer: null,
      },
    });

    return res.json(helpsWithNoAnswer);
  }

  async update(req, res) {
    const schema = await Yup.object().shape({
      answer: Yup.string().required(),
    });

    if (!schema.isValid()) {
      return res
        .status(401)
        .json({ error: 'Check the informations and try again' });
    }

    const { id } = req.params;

    const help_order = await HelpOrders.findByPk(id);

    help_order.answer_at = new Date();

    const { answer } = req.body;

    await help_order.update({ answer });

    help_order.save();

    await Queue.add(AnswerMail.key, {
      help_order,
    });

    return res.json(help_order);
  }
}

export default new HelpOrdersControllerAdmin();
