import { Model, snakeCaseMappers } from "objection";
import { v4 as uuidv4 } from "uuid";
import User from "../models/user.js";
import Question from "../models/question.js";
import moment from "moment";

class Quiz extends Model {
  static get tableName() {
    return "quiz";
  }
  static get columnNameMappers() {
    return snakeCaseMappers();
  }

  static list() {
    return this.query()
      .withGraphFetched("[creator, questions.[choices]]")
      .orderBy("title");
  }

  static get relationMappings() {
    return {
      creator: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "quiz.created_by",
          to: "user.id",
        },
      },
      questions: {
        relation: Model.HasManyRelation,
        modelClass: Question,
        join: {
          from: "quiz.id",
          to: "question.quiz_id",
        },
      },
    };
  }

  $beforeInsert() {
    const id = uuidv4();
    const now = moment().format("YYYY-MM-DD H:mm:ss");
    this.id = id;
    this.created_at = now;
  }
}

export default Quiz;
