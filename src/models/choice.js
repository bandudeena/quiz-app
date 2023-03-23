import { Model, snakeCaseMappers } from "objection";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import Question from "../models/question.js";

class Choice extends Model {
  static get tableName() {
    return "choice";
  }
  static get columnNameMappers() {
    return snakeCaseMappers();
  }

  static get relationMappings() {
    return {
      question: {
        relation: Model.BelongsToOneRelation,
        modelClass: Question,
        join: {
          from: "choice.question_id",
          to: "question.id",
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        rightAnswer: { type: "boolean" },
      },
    };
  }

  $parseDatabaseJson(json) {
    const parsedJson = super.$parseDatabaseJson(json);
    parsedJson.rightAnswer = parsedJson.rightAnswer === 1;
    return parsedJson;
  }

  $beforeInsert() {
    const id = uuidv4();
    const now = moment().format("YYYY-MM-DD H:mm:ss");
    this.id = id;
    this.created_at = now;
  }
}

export default Choice;
