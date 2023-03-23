import Quiz from "../models/quiz.js";
import userService from "./userService.js";
const quizService = {};

quizService.getAll = (req, res) => {
  Quiz.list()
    .then((results) => {
      const response = {
        success: true,
        errors: null,
        data: results,
      };
      res.status(200).json(response);
    })
    .catch((error) => {
      console.error(error);
      const response = {
        success: false,
        errors: [400],
        data: null,
      };
      res.status(400).json(response);
    });
};

quizService.create = async (req, res) => {
  try {
    const { title, description, questions } = req.body;
    const user = await userService.getCurrentUser(req);
    const quiz = await Quiz.transaction(async (trx) => {
      const quiz = await Quiz.query(trx).insert({
        title,
        description,
        created_by: user.id,
      });

      const questionIds = await Promise.all(
        questions.map(async (question) => {
          const { description, mandatory, choices } = question;

          const questionObj = await quiz
            .$relatedQuery("questions", trx)
            .insert({
              description,
              mandatory,
            });

          if (choices) {
            await Promise.all(
              choices.map(async (choice) => {
                const { description, rightAnswer } = choice;

                await questionObj.$relatedQuery("choices", trx).insert({
                  description,
                  right_answer: rightAnswer,
                });
              })
            );
          }

          return questionObj.id;
        })
      );

      await quiz
        .$relatedQuery("questions", trx)
        .whereIn("id", questionIds)
        .patch({ quiz_id: quiz.id });

      return quiz;
    });
    const response = {
      success: true,
      errors: null,
      data: quiz,
    };

    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    const response = {
      success: true,
      errors: [400],
      data: null,
    };
    res.status(201).json(response);
  }
};
export default quizService;
