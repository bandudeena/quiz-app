import { Router } from "express";
import quizService from "../service/quizService.js";
import jwt from "jsonwebtoken";

const checkQuizRequestBody = () => {
  return (req, res, next) => {
    const { title, description, createdBy, questions } = req.body;
    if (
      !title ||
      !description ||
      !Array.isArray(questions) ||
      questions.length === 0
    ) {
      const response = {
        success: false,
        errors: [400],
        data: null,
      };
      return res.status(400).json(response);
    }

    for (const question of questions) {
      if (
        !question.description ||
        !question.mandatory ||
        !Array.isArray(question.choices) ||
        question.choices.length === 0
      ) {
        const response = {
          success: false,
          errors: [400],
          data: null,
        };
        return res.status(400).json(response);
      }

      for (const choice of question.choices) {
        if (!choice.description || choice.rightAnswer === undefined) {
          const response = {
            success: false,
            errors: [400],
            data: null,
          };
          return res.status(400).json(response);
        }
      }
    }

    next();
  };
};

const verifyToken = () => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
          const response = {
            success: false,
            errors: [403],
            data: null,
          };
          return res.status(403).json(response);
        }
        req.user = user;
        next();
      });
    } else {
      const response = {
        success: false,
        errors: [401],
        data: null,
      };
      return res.status(401).json(response);
    }
  };
};

const router = Router();
router.get("/quizzes", verifyToken(), quizService.getAll);
router.post(
  "/quizzes",
  verifyToken(),
  checkQuizRequestBody(),
  quizService.create
);

export default router;
