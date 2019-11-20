import Sequelize, { Model } from 'sequelize';

class Help_orders extends Model {
  static init(sequelize) {
    super.init(
      {
        student_id: Sequelize.NUMBER,
        question: Sequelize.STRING,
        answer: Sequelize.STRING,
        answer_at: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(model) {
    this.belongsTo(model.Students, { foreginKey: 'id', as: 'student' });
  }
}

export default Help_orders;
