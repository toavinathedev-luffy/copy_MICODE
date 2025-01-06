import "./style.css";
import { Questions } from "./questions";
const app = document.getElementById("app");
const startButton = document.getElementById("start");
function startQuiz(event) {
  console.log("start Clicked");
  let currentQuestion = 0;
  let score = 0;
  const clean = () => {
    while (app.firstElementChild) {
      app.firstElementChild.remove();
    }
  };
  clean();
  const displayQuestion = (questionIndex) => {
    const question = Questions[questionIndex];
    if (!question) {
      //finish quiz
    }
    const title = getTitleElement(question.question);
    app.appendChild(title);
    const answersDiv = createAnswers(question.answers);
    app.appendChild(answersDiv);
    const submitButton = getSubmitButton();
    submitButton.addEventListener("click", submit);
    app.appendChild(submitButton);
  };
  displayQuestion(currentQuestion);
  function createAnswers(answers) {
    const answersDiv = document.createElement("div");
    answersDiv.classList.add("answers");
    for (const answer of answers) {
      const label = getAnswerElement(answer);
      answersDiv.appendChild(label);
    }
    return answersDiv;
  }
}
startButton.addEventListener("click", startQuiz);

function submit() {
  //gerer la submit
  const selectedAnswer = app.querySelector(`input[name="answer"]:checked`);
  const value = selectedAnswer.value;
  alert(`tu as répondu ${value}`);
}
function getTitleElement(titleOfTheQuestion) {
  const title = document.createElement("h3");
  title.innerText = titleOfTheQuestion;
  return title;
}
function getAnswerElement(answer) {
  const label = document.createElement("label");
  label.innerText = answer;
  const input = document.createElement("input");
  let inputId = "";
  inputId = answer.replaceAll(" ", "-").toLowerCase();
  input.id = inputId;
  label.htmlFor = inputId;
  input.setAttribute("type", "radio");
  input.setAttribute("name", "answer");
  input.setAttribute("value", answer);
  label.appendChild(input);
  return label;
}
function getSubmitButton() {
  const submit = document.createElement("button");
  submit.innerText = "Submit";
  return submit;
}
