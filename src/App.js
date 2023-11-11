import { useState } from "react";
import "./App.css";
import Confetti from "react-dom-confetti";

const initialQuestions = [
  {
    id: 1,
    question: "What is react?",
    answer:
      "An extremely popular, declarative, component based, state-driven, javascript library for building user interfaces created by Facebook.",
    correct: null,
  },
  {
    id: 2,
    question: "What is a component?",
    answer:
      "Building blocks, reusable pieces of code that React will render to build an UI.",
    correct: null,
  },
  {
    id: 3,
    question: "What is JSX?",
    answer:
      "A declarative syntax that describes what a component should look like. An abstraction away from the DOM.",
    correct: null,
  },
  {
    id: 4,
    question: "What does state do?",
    answer:
      "Keeps track of data as it changes, React will re-render as state changes.",
    correct: null,
  },
  {
    id: 5,
    question: "What do components return?",
    answer: "A block of JSX.",
    correct: null,
  },
  {
    id: 6,
    question: "What is the difference between JS and JSX?",
    answer:
      "JS is imperative, meaning it describes HOW to do things, step by step DOM manipulation. JSX is declarative, meaning it describes what the UI should look like based on CURRENT state and has no DOM manipulations.",
    correct: null,
  },
  {
    id: 7,
    question: "What is separation of concerns?",
    answer:
      "Traditionally the idea that you have one technology per file. React does this by component or piece of UI instead.",
    correct: null,
  },
  {
    id: 8,
    question: "State vs Props?",
    answer:
      "State is internal component data that can be updated by the component itself. Props are data from the parent component that cannot be modified by the child component (IMMUTABLE).",
    correct: null,
  },
  {
    id: 9,
    question: "What type of data flow does React have?",
    answer:
      "One way data flow, data can only be passed from the parent to the children. This makes applications more predictable and easier to understand, easier to debug, and is more permanent.",
    correct: null,
  },
  {
    id: 10,
    question:
      "What happens when state that is passed to child components as a prop is updated?",
    answer: "The child component will re-render.",
    correct: null,
  },
  {
    id: 11,
    question: "What is state management?",
    answer:
      "Deciding when to create pieces of state, what types of state are necessary, where to place each, and how data flows through the app.",
    correct: null,
  },
  {
    id: 12,
    question: "What are the types of state?",
    answer: "Local and global state.",
    correct: null,
  },
  {
    id: 13,
    question: "What is local state?",
    answer:
      "State needed in only one or two components that is defined in a component and only that component and child components have access to.",
    correct: null,
  },
  {
    id: 14,
    question: "What is global state?",
    answer:
      "State that many components might need and is accessible to every component in the entired application.",
    correct: null,
  },
  {
    id: 15,
    question:
      "What is the practice of a child component updating a parent's state via functions passed down via props?",
    answer: "Inverse data flow",
    correct: null,
  },
  {
    id: 16,
    question: "What is derived state?",
    answer:
      "State that is computed from an existing piece of state or form props.",
    correct: null,
  },
];

export default function App() {
  const [questions, setQuestions] = useState(initialQuestions);
  const [curQuestion, setCurQuestion] = useState(questions[0]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  function handleClickScroll() {
    const element = document.getElementById(curQuestion.id);
    if (element) {
      element.scrollIntoView({ block: "center" });
    }
  }

  function handleSelectCurQuestion(questionId) {
    if (questionId <= 0 || questionId > questions.length) {
      return;
    }
    setCurQuestion(questions[questionId - 1]);
    setShowAnswer(false);
    handleClickScroll();
  }

  function handleshowAnswer() {
    setShowAnswer((show) => setShowAnswer(!show));
  }

  function handleSetCorrect(isCorrect) {
    setQuestions((questions) =>
      questions.map((question) =>
        question.id === curQuestion.id
          ? { ...question, correct: isCorrect }
          : question
      )
    );

    setCurQuestion({ ...curQuestion, correct: isCorrect });
    setIsCorrect(isCorrect);
  }

  const config = {
    angle: 90,
    spread: 360,
    startVelocity: 40,
    elementCount: 70,
    dragFriction: 0.12,
    duration: 3000,
    stagger: 3,
    width: "10px",
    height: "10px",
    perspective: "500px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
  };

  return (
    <div className="App">
      <div className="container">
        <Header questions={questions} />
        <div className="main-content">
          <div className="side-bar-container">
            <div className="nav-title">Questions</div>
            <SideBar
              curQuestion={curQuestion}
              onSelect={handleSelectCurQuestion}
              questions={questions}
            />
          </div>
          <Question
            question={curQuestion}
            showAnswer={showAnswer}
            onShow={handleshowAnswer}
            onAnswer={handleSetCorrect}
          />
        </div>
        <Footer onSelect={handleSelectCurQuestion} curQuestion={curQuestion} />
      </div>
      <Confetti active={isCorrect} config={config} />
    </div>
  );
}

function Header({ questions }) {
  return (
    <div className="header">
      <h1>React Quiz</h1>
      <span className="score">
        Score:{" "}
        {questions.reduce(
          (acc, question) => (question.correct ? acc + 1 : acc + 0),
          0
        )}{" "}
        / {questions.length}
      </span>
    </div>
  );
}

function SideBar({ curQuestion, onSelect, questions }) {
  return (
    <div className="side-bar">
      {questions.map((q) => (
        <button
          onClick={() => onSelect(q.id)}
          className={curQuestion.id === q.id ? "active" : ""}
          key={q.id}
          id={q.id}
        >
          Question {q.id}
        </button>
      ))}
    </div>
  );
}

function Question({ question, showAnswer, onShow, onAnswer }) {
  return (
    <div className="question">
      <p onClick={onShow}>{showAnswer ? question.answer : question.question}</p>
      <div className="answer-buttons">
        <button
          className={question.correct ? "active" : ""}
          onClick={() => onAnswer(true)}
          disabled={!showAnswer}
        >
          Correct
        </button>
        <button
          className={
            question.correct !== null && !question.correct ? "active" : ""
          }
          onClick={() => onAnswer(false)}
          disabled={!showAnswer}
        >
          Incorrect
        </button>
      </div>
    </div>
  );
}

function Footer({ onSelect, curQuestion }) {
  return (
    <footer>
      <button onClick={() => onSelect(curQuestion.id - 1)}>Previous</button>
      <button onClick={() => onSelect(curQuestion.id + 1)}>Next</button>
    </footer>
  );
}
