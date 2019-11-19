import Mail from '../../lib/Mail';

class RegistrationMail {
  get key() {
    return 'RegistrationMail';
  }

  async handle({ data }) {
    const { student, plan, price, formattedEndDate } = data;

    await Mail.sendMail({
      to: ` ${student.name} <${student.email}>`,
      subject: 'Matricula realizada',
      template: 'registration',
      context: {
        student: student.name,
        plan: plan.title,
        duration: plan.duration,
        endDate: formattedEndDate,
        totalValue: price,
      },
    });
  }
}

export default new RegistrationMail();
