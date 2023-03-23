import { Model, snakeCaseMappers } from "objection";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import Quiz from "../models/quiz.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class User extends Model {
  static get tableName() {
    return "user";
  }
  static get columnNameMappers() {
    return snakeCaseMappers();
  }

  static get relationMappings() {
    return {
      quizzes: {
        relation: Model.HasManyRelation,
        modelClass: Quiz,
        join: {
          from: "user.id",
          to: "quiz.created_by",
        },
      },
    };
  }
  async $beforeInsert() {
    const id = uuidv4();
    const now = moment().format("YYYY-MM-DD H:mm:ss");
    this.id = id;
    this.created_at = now;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.id = id;
    this.password = hashedPassword;
    this.created_at = now;
  }

  async verifyPassword(password) {
    return await bcrypt.compare(password, this.password);
  }

  generateAuthToken() {
    const token = jwt.sign({ id: this.id }, process.env.JWT_SECRET);
    return token;
  }
}

export default User;
