import pt from 'date-fns/locale/pt';
import { format, parseISO } from 'date-fns';
import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    const { registration } = data;

    await Mail.sendMail({
      to: `${registration.student.name} <${registration.student.email}>`,
      subject: 'Matricula Cancelada',
      template: 'cancellation',
      context: {
        student: registration.student.name,
        plan: registration.plan.title,
        startDate: format(parseISO(registration.start_date), "dd'/'MM'/'yyyy", {
          locale: pt,
        }),
        endDate: format(parseISO(registration.end_date), "dd'/'MM'/'yyyy", {
          locale: pt,
        }),
        date: format(parseISO(registration.cancelled_at), "dd'/'MM'/'yyyy", {
          locale: pt,
        }),
      },
    });
  }
}

export default new CancellationMail();
