import React, {Component} from "react";
import classes from "./Quiz.css";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";

class Quiz extends Component {
  state = {
    results: {},
    isFinished: false,
    activeQuestion: 0,
    answerState: null,
    quiz: [
      {
        question: "Какая пустыня на Земле - самая безводная?",
        rightAnswerId: 2,
        id: 1,
        answers: [
          {text: "Сахара", id: 1},
          {text: "Атакама", id: 2},
          {text: "Каракумы", id: 3},
          {text: "Гоби", id: 4}
        ]
      },
      {
        question: "Каким из этих слов называют группу островов?",
        rightAnswerId: 3,
        id: 2,
        answers: [
          {text: "Фьорд", id: 1},
          {text: "Каньон", id: 2},
          {text: "Архипелаг", id: 3},
          {text: "Глетчер", id: 4}
        ]
      },
      {
        question: "В какой из этих игр используется мяч наибольшей величины?",
        rightAnswerId: 1,
        id: 3,
        answers: [
          {text: "Баскетбол", id: 1},
          {text: "Футбол", id: 2},
          {text: "Волейбол", id: 3},
          {text: "Водное поло", id: 4}
        ]
      },
      {
        question: "Какая из этих стран имеет наибольшую площадь?",
        rightAnswerId: 4,
        id: 4,
        answers: [
          {text: "Китай", id: 1},
          {text: "США", id: 2},
          {text: "Австралия", id: 3},
          {text: "Канада", id: 4}
        ]
      },
      {
        question: "Как называется самый большой город Китая?",
        rightAnswerId: 2,
        id: 5,
        answers: [
          {text: "Пекин", id: 1},
          {text: "Шанхай", id: 2},
          {text: "Ухань", id: 3},
          {text: "Нанкин", id: 4}
        ]
      },
      {
        question: "Какая страна запустила первый искусственный спутник?",
        rightAnswerId: 3,
        id: 6,
        answers: [
          {text: "США", id: 1},
          {text: "Япония", id: 2},
          {text: "СССР", id: 3},
          {text: "Китай", id: 4}
        ]
      },
      {
        question: "Какие породы собак, не являются охотничьими?",
        rightAnswerId: 4,
        id: 7,
        answers: [
          {text: "Таксы", id: 1},
          {text: "Борзые", id: 2},
          {text: "Гончие", id: 3},
          {text: "Пинчеры", id: 4}
        ]
      },
      {
        question: "Какого не было среди Бременских музыкантов?",
        rightAnswerId: 3,
        id: 8,
        answers: [
          {text: "Осла", id: 1},
          {text: "Петуха", id: 2},
          {text: "Козла", id: 3},
          {text: "Кота", id: 4}
        ]
      },
      {
        question: "Какой район Нью-Йорка находится на острове?",
        rightAnswerId: 4,
        id: 9,
        answers: [
          {text: "Квинкс", id: 1},
          {text: "Бронкс", id: 2},
          {text: "Бруклин", id: 3},
          {text: "Манхэттен", id: 4}
        ]
      },
      {
        question: "На флаге какой страны присутствует только один цвет?",
        rightAnswerId: 3,
        id: 10,
        answers: [
          {text: "Алжир", id: 1},
          {text: "Нигерия", id: 2},
          {text: "Ливия", id: 3},
          {text: "Чад", id: 4}
        ]
      }
    ]
  };

  onAnswerClickHandler = answerId => {
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0];
      if (this.state.answerState[key] === "success") {
        return;
      }
    }

    const question = this.state.quiz[this.state.activeQuestion];
    const results = this.state.results;

    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = "success";
      }

      this.setState({
        answerState: {[answerId]: "success"},
        results
      });

      const timeout = window.setTimeout(() => {
        if (this.isQuizFinished()) {
          this.setState({
            isFinished: true
          });
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null
          });
        }
        window.clearTimeout(timeout);
      }, 400);
    } else {
      results[question.id] = "error";
      this.setState({
        answerState: {[answerId]: "error"},
        results
      });
    }
  };

  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length;
  }

  retryHandler = () => {
    this.setState({
      activeQuestion: 0,
      answerState: null,
      isFinished: false,
      results: {}
    });
  };

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>

          {this.state.isFinished ? (
            <FinishedQuiz
              results={this.state.results}
              quiz={this.state.quiz}
              onRetry={this.retryHandler}
            />
          ) : (
            <ActiveQuiz
              answers={this.state.quiz[this.state.activeQuestion].answers}
              question={this.state.quiz[this.state.activeQuestion].question}
              onAnswerClick={this.onAnswerClickHandler}
              quizLength={this.state.quiz.length}
              answerNumber={this.state.activeQuestion + 1}
              state={this.state.answerState}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Quiz;
