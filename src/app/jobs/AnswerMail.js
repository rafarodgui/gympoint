import Mail from '../../lib/Mail';

class AnswerMail {
  get key() {
    return 'AnswerMail';
  }

  async handle({ data }) {
    const { help_order } = data;

    await Mail.sendMail({
      to: `${help_order.student_id.name} <${help_order.student_id.email}>`,
    });
  }
}

export default new AnswerMail();
