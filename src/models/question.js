import { Model, snakeCaseMappers } from "objection";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import Quiz from "../models/quiz.js";
import Choice from "../models/choice.js";

class Question extends Model {
  static get tableName() {
    return "question";
  }
  static get columnNameMappers() {
    return snakeCaseMappers();
  }

  static get relationMappings() {
    return {
      quiz: {
        relation: Model.BelongsToOneRelation,
        modelClass: Quiz,
        join: {
          from: "question.quiz_id",
          to: "quiz.id",
        },
      },
      choices: {
        relation: Model.HasManyRelation,
        modelClass: Choice,
        join: {
          from: "question.id",
          to: "choice.question_id",
        },
      },
    };
  }
  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        mandatory: { type: "boolean" },
      },
    };
  }

  $parseDatabaseJson(json) {
    const parsedJson = super.$parseDatabaseJson(json);
    parsedJson.mandatory = parsedJson.mandatory === 1;
    return parsedJson;
  }

  $beforeInsert() {
    const id = uuidv4();
    const now = moment().format("YYYY-MM-DD H:mm:ss");
    this.id = id;
    this.created_at = now;
  }
}

export default Question;
