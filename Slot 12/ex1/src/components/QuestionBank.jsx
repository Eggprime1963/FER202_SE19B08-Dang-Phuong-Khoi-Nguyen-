import React, { useReducer, useEffect, useRef } from "react";
import { Button, Container, Card, ProgressBar, Alert } from "react-bootstrap";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const initialState = {
  questions: [
    {
      id: 1,
      question: "What is the capital of Australia?",
      options: ["Sydney", "Canberra", "Melbourne", "Perth"],
      answer: "Canberra",
    },
    {
      id: 2,
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      answer: "Mars",
    },
    {
      id: 3,
      question: "What is the largest ocean on Earth?",
      options: [
        "Atlantic Ocean",
        "Indian Ocean",
        "Pacific Ocean",
        "Arctic Ocean",
      ],
      answer: "Pacific Ocean",
    },
  ],
  currentQuestion: 0,
  selectedOption: "",
  score: 0,
  showScore: false,
  timeLeft: 10,
  feedback: null,
  highScore: 0,
};

function quizReducer(state, action) {
  switch (action.type) {
    case "SELECT_OPTION":
      const isCorrect = action.payload === state.questions[state.currentQuestion].answer;
      return { 
        ...state, 
        selectedOption: action.payload,
        feedback: {
          correct: isCorrect,
          correctAnswer: state.questions[state.currentQuestion].answer
        }
      };

    case "NEXT_QUESTION":
      const isLastQuestion = state.currentQuestion + 1 === state.questions.length;
      const newScore = state.feedback?.correct ? state.score + 1 : state.score;
      
      return {
        ...state,
        score: newScore,
        currentQuestion: state.currentQuestion + 1,
        selectedOption: "",
        showScore: isLastQuestion,
        timeLeft: 10,
        feedback: null,
      };

    case "RESTART_QUIZ":
      return {
        ...initialState, 
        highScore: Math.max(state.score, state.highScore), 
        timeLeft: 10,
      };

    case "TIMER_TICK":
      // If time runs out and no option is selected
      if (state.timeLeft === 1 && !state.selectedOption) {
        return {
          ...state,
          timeLeft: 0,
          feedback: {
            correct: false,
            correctAnswer: state.questions[state.currentQuestion].answer,
            timedOut: true
          }
        };
      }
      // Don't go below 0
      return { ...state, timeLeft: Math.max(0, state.timeLeft - 1) };

    case "SET_HIGH_SCORE":
      return { ...state, highScore: action.payload };

    default:
      return state;
  }
}

function QuestionBank() {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const { 
    questions, 
    currentQuestion, 
    selectedOption, 
    score, 
    showScore, 
    timeLeft, 
    feedback,
    highScore 
  } = state;
  
  const timerRef = useRef(null);

  // Load high score from localStorage on component mount
  useEffect(() => {
    const savedHighScore = localStorage.getItem("quizHighScore");
    if (savedHighScore) {
      dispatch({ type: "SET_HIGH_SCORE", payload: parseInt(savedHighScore, 10) });
    }
  }, []);

  // Save new high score to localStorage when score changes
  useEffect(() => {
    if (showScore && score > highScore) {
      localStorage.setItem("quizHighScore", score.toString());
      dispatch({ type: "SET_HIGH_SCORE", payload: score });
    }
  }, [showScore, score, highScore]);

  // Timer effect
  useEffect(() => {
    if (showScore) return;
    
    // Clear any existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    // Start a new timer
    timerRef.current = setInterval(() => {
      dispatch({ type: "TIMER_TICK" });
    }, 1000);

    // Cleanup on unmount or when dependencies change
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [currentQuestion, showScore]);

  // When timer reaches zero, wait 2 seconds then move to next question
  useEffect(() => {
    if (timeLeft === 0 && !selectedOption) {
      const timeout = setTimeout(() => {
        handleNextQuestion();
      }, 2000);
      
      return () => clearTimeout(timeout);
    }
  }, [timeLeft, selectedOption]);

  const handleOptionSelect = (option) => {
    if (!selectedOption && timeLeft > 0) {
      dispatch({ type: "SELECT_OPTION", payload: option });
      
      // Stop the timer when an option is selected
      clearInterval(timerRef.current);
    }
  };

  const handleNextQuestion = () => {
    dispatch({ type: "NEXT_QUESTION" });
  };

  const handleRestartQuiz = () => {
    dispatch({ type: "RESTART_QUIZ" });
  };

  return (
    <Container className="mt-4">
      <Card className="p-4">
        {showScore ? (
          <div className="text-center">
            <h2>
              Your Score: {score} / {questions.length}
            </h2>
            {highScore > 0 && (
              <h4 className="text-secondary">High Score: {highScore} / {questions.length}</h4>
            )}
            <Button variant="primary" onClick={handleRestartQuiz}>
              Restart Quiz
            </Button>
          </div>
        ) : (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5>Question {currentQuestion + 1}/{questions.length}</h5>
              <div className="timer" style={{ textAlign: "right" }}>
                <h5 style={{ color: timeLeft < 5 ? 'red' : 'black' }}>
                  Time Left: {timeLeft}s
                </h5>
              </div>
            </div>
            
            <ProgressBar 
              now={(currentQuestion / questions.length) * 100} 
              className="mb-3"
              variant="info"
            />
            
            <h4>
              {questions[currentQuestion].question}
            </h4>
            
            <div className="mt-3">
              {questions[currentQuestion].options.map((option, index) => (
                <Button
                  key={index}
                  variant={
                    selectedOption === option ? "success" : "outline-secondary"
                  }
                  className="m-2"
                  disabled={selectedOption !== "" || timeLeft === 0}
                  onClick={() => handleOptionSelect(option)}
                >
                  {option}
                </Button>
              ))}
            </div>
            
            {feedback && (
              <Alert variant={feedback.correct ? "success" : "danger"} className="mt-3">
                {feedback.correct ? (
                  <div>
                    <FaCheckCircle /> Correct! 🎉
                  </div>
                ) : feedback.timedOut ? (
                  <div>
                    <FaTimesCircle /> Time's up! The correct answer is: {feedback.correctAnswer}
                  </div>
                ) : (
                  <div>
                    <FaTimesCircle /> Incorrect! The correct answer is: {feedback.correctAnswer}
                  </div>
                )}
              </Alert>
            )}

            <Button
              variant="primary"
              className="mt-3"
              disabled={!selectedOption && timeLeft > 0}
              onClick={handleNextQuestion}
            >
              {currentQuestion === questions.length - 1
                ? "Finish Quiz"
                : "Next Question"}
            </Button>
          </div>
        )}
      </Card>
    </Container>
  );
}

export default QuestionBank;