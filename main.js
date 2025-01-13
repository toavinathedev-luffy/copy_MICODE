import "./style.css";
import { Questions } from "./questions";
const app = document.getElementById("app");
const startButton = document.getElementById("start");
let currentQuestion = 0;
let score = 0;
const TIMEOUT = 3000;
const formatId = (id = "id") => {
  return id.replaceAll(" ", "-").replaceAll('"', "'").toLowerCase();
};
function startQuiz(event) {
  console.log("start Clicked");

  clean();

  displayQuestion(currentQuestion);
}
startButton.addEventListener("click", startQuiz);

function submit() {
  //gerer la submit
  const selectedAnswer = app.querySelector(`input[name="answer"]:checked`);
  const disableAllAnswer = () => {
    const radioInputs = document.querySelectorAll("input[type='radio'");
    for (const radio of radioInputs) {
      radio.disabled = true;
    }
  };
  disableAllAnswer();
  const value = selectedAnswer.value;
  const questionCurrent = Questions[currentQuestion];
  const isCorrect = questionCurrent.correct === value;
  if (isCorrect) score++;
  showFeedBack(isCorrect, questionCurrent.correct, value);
  displayNextQuestionButton(() => {
    currentQuestion++;
    displayQuestion(currentQuestion);
  });
  const feedback = getFeedBackMessage(isCorrect, questionCurrent.correct);
  app.appendChild(feedback);
}

function displayNextQuestionButton(callBack) {
  let remainingTimeOut = TIMEOUT;

  const handleNextQuestion = () => {
    clearInterval(interval);
    clearTimeout(timeout);
    callBack();
  };

  app.querySelector("button").remove();
  const nextButton = document.createElement("button");
  const displayRestOfTimeForNextQuestion = () =>
    (nextButton.innerText = `Next ${remainingTimeOut / 1000} s`);
  app.appendChild(nextButton);
  displayRestOfTimeForNextQuestion();
  const interval = setInterval(() => {
    remainingTimeOut -= 1000;
    displayRestOfTimeForNextQuestion();
  }, 1000);
  const timeout = setTimeout(() => handleNextQuestion(), TIMEOUT);
  nextButton.addEventListener("click", () => {
    handleNextQuestion();
  });
}
function showFeedBack(iscorrect = false, correct = "", answer = "") {
  const correctAnswerId = formatId(correct);
  const correctElement = document.querySelector(
    `label[for="${correctAnswerId}"]`
  );

  const selectedAnswerId = formatId(answer);
  const selectedElement = document.querySelector(
    `label[for="${selectedAnswerId}"]`
  );
  correctElement.classList.add("correct");
  selectedElement.classList.add(iscorrect ? "correct" : "incorrect");
}
function displayQuestion(questionIndex) {
  clean();
  const question = Questions[questionIndex];
  if (!question) {
    displayFinishMessage();
    return;
  }
  const title = getTitleElement(question.question);
  app.appendChild(title);
  const answersDiv = createAnswers(question.answers);
  app.appendChild(answersDiv);
  const submitButton = getSubmitButton();
  submitButton.addEventListener("click", submit);
  app.appendChild(submitButton);
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
  inputId = formatId(answer);
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
function getFeedBackMessage(iscorrect, correct) {
  const paragraph = document.createElement("p");
  paragraph.innerText = iscorrect
    ? `bravo tu as eu la bonne reponse`
    : `Dommage,la bonne réponse était ${correct}`;
  return paragraph;
}
function createAnswers(answers) {
  const answersDiv = document.createElement("div");
  answersDiv.classList.add("answers");
  for (const answer of answers) {
    const label = getAnswerElement(answer);
    answersDiv.appendChild(label);
  }
  return answersDiv;
}
function clean() {
  while (app.firstElementChild) {
    app.firstElementChild.remove();
  }
  const progress = getProgressBar(Questions.length, currentQuestion);
  app.appendChild(progress);
}
function displayFinishMessage() {
  const h1 = document.createElement("h1");
  h1.innerText = "Bravo Tu as terminé le Quiz ";
  const p = document.createElement("p");
  p.innerText = `Tu as eu ${score} sur ${Questions.length} points`;
  app.appendChild(h1);
  app.appendChild(p);
  const feedbackScore = document.createElement("p");
  if (score <= Questions.length / 2) {
    feedbackScore.innerText = "Houla tu dois devoir réviser un peu mon gars";
  } else if (score < Questions.length && score > Questions.length / 2) {
    feedbackScore.innerText = "Bravo Tu y es presque";
  } else if (score == Questions.length) {
    feedbackScore.innerText =
      "Félicitations,Javascript n'a plus aucun secret pour toi";
  }
  app.appendChild(feedbackScore);
}
function getProgressBar(max, value) {
  const progress = document.createElement("progress");
  progress.setAttribute("max", max);
  progress.setAttribute("value", value);
  return progress;
}
