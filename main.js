import "./style.css";
import { Questions } from "./questions";
const app = document.querySelector(/*selecteur CSS*/ "#app");
const startButton = document.querySelector("#start");

//Affichage de la question
const getTitleOfQuestion = (questionTitle) => {
  const title = document.createElement("h3");
  title.innerText = questionTitle;
  return title;
};

function startQuiz(event) {
  event.stopPropagation(); //Arrete la propagation de l event
  let currentQuestion = 0;
  let score = 0;
  const createAnswer = (answers) => {
    const answersDiv = document.createElement("div");
    answersDiv.classList.add("answers");
    for (const answer of answers) {
      const getAnswerElement = (text = "") => {
        const label = document.createElement("label");
        label.innerText = text;
        const input = document.createElement("input");
        const inputId = text.replaceAll(" ", "_").toLowerCase();
        input.id = inputId;
        label.htmlFor = inputId;
        input.setAttribute("type", "radio");
        input.setAttribute("name", "answer");
        input.setAttribute("value", text);
        label.appendChild(input);
        return label;
      };
      const label = getAnswerElement(answer);
      answersDiv.appendChild(label);
    }
    return answersDiv;
  };
  const clean = () => {
    while (app.firstElementChild) {
      app.firstElementChild.remove();
    }
  };
  const displayQuestion = (indexOfQuestion) => {
    const question = Questions[indexOfQuestion];
    if (!question) {
      //finish Quiz
    }
    const title = getTitleOfQuestion(question.question);
    app.appendChild(title);
    const listOFAnswer = createAnswer(question.answers);
    app.appendChild(listOFAnswer);

    const submitButton = getSubmitButton();
    function submitAnswerOfUser(e) {
      e.stopPropagation();
      const selectedAnswer = app.querySelector("input[name='answer']:checked");
      const value = selectedAnswer ? selectedAnswer.value : "";
      const question = Questions[currentQuestion];
      const isCorrect = question.correct === value;
      alert(`${isCorrect ? "correct" : "incorrect"}`);
    }
    app.appendChild(submitButton);
    submitButton.addEventListener("click", submitAnswerOfUser);
  };
  clean();
  displayQuestion(currentQuestion);
}

startButton.addEventListener("click", startQuiz);

function getSubmitButton() {
  const submitButton = document.createElement("button");
  submitButton.innerText = "Submit";
  return submitButton;
}
