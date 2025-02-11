import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Menu from "./components/Menu";
import Question from "./components/Question";
import PlayerBuzz from "./components/PlayerBuzz";
import GameOver from "./components/GameOver";
import Scoreboard from "./components/Scoreboard";
import "./App.css";

const App = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [buzzedInPlayer, setBuzzedInPlayer] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [scoreFlash1, setScoreFlash1] = useState(false);
  const [scoreFlash2, setScoreFlash2] = useState(false);
  const [categories, setCategories] = useState(["General Knowledge"]);
  const [selectedCategory, setSelectedCategory] = useState("General Knowledge");
  const [allQuestions, setAllQuestions] = useState([]);
  // New state for player names:
  const [player1Name, setPlayer1Name] = useState("Player 1");
  const [player2Name, setPlayer2Name] = useState("Player 2");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("/questions.json");
        const withCategories = response.data.map((q) => ({
          ...q,
          category: q.category || "General Knowledge",
        }));
        setAllQuestions(withCategories);

        const uniqueCategories = [
          ...new Set(withCategories.map((q) => q.category)),
        ];
        setCategories(["General Knowledge", ...uniqueCategories]);

        setQuestions(shuffleArray(withCategories));
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, []);

  const playSound = (sound) => {
    const audio = new Audio(`/sounds/${sound}.MP3`);
    audio.play().catch((error) => console.error("Error playing sound:", error));
  };

  const handleStartGame = () => {
    setGameStarted(true);
    playSound("gamestart");
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    const filtered =
      category === "General Knowledge"
        ? allQuestions
        : allQuestions.filter((q) => q.category === category);
    setQuestions(shuffleArray(filtered));
    setCurrentQuestionIndex(0);
  };

  const handleBuzzIn = useCallback(
    (player) => {
      if (buzzedInPlayer === null) {
        setBuzzedInPlayer(player);
        playSound("buzz");
      }
    },
    [buzzedInPlayer]
  );

  const handleAnswerSelect = useCallback(
    (answerIndex) => {
      if (selectedAnswer !== null || buzzedInPlayer === null) return;

      setSelectedAnswer(answerIndex);
      const currentQuestion = questions[currentQuestionIndex];
      const correctAnswer = currentQuestion.answers.findIndex(
        (ans) => ans.correct
      );
      const isCorrect = answerIndex === correctAnswer;

      const updateScore = (player, correct) => {
        const setScore = player === 1 ? setPlayer1Score : setPlayer2Score;
        const setFlash = player === 1 ? setScoreFlash1 : setScoreFlash2;

        if (correct) {
          setScore((prev) => {
            const newScore = prev + 1;
            if (newScore === 5) {
              setTimeout(() => {
                setGameOver(true);
                setWinner(`Player ${player}`);
              }, 1000);
            }
            return newScore;
          });
          setFlash("green");
        } else {
          setScore((prev) => (prev > 0 ? prev - 1 : 0));
          if (player === 1 && player1Score > 0) setFlash("red");
          if (player === 2 && player2Score > 0) setFlash("red");
        }

        setTimeout(() => setFlash(null), 1000);
      };

      if (isCorrect) {
        playSound("correct");
        updateScore(buzzedInPlayer, true);
      } else {
        playSound("wrong");
        updateScore(buzzedInPlayer, false);
      }

      setTimeout(() => {
        if (!gameOver) {
          setCurrentQuestionIndex((prev) => (prev + 1) % questions.length);
          setBuzzedInPlayer(null);
          setSelectedAnswer(null);
        }
      }, 1500);
    },
    [
      buzzedInPlayer,
      currentQuestionIndex,
      gameOver,
      player1Score,
      player2Score,
      questions,
      selectedAnswer,
    ]
  );

  const handlePlayAgain = () => {
    const filtered =
      selectedCategory === "General Knowledge"
        ? allQuestions
        : allQuestions.filter((q) => q.category === selectedCategory);
    setQuestions(shuffleArray(filtered));
    setPlayer1Score(0);
    setPlayer2Score(0);
    setGameOver(false);
    setCurrentQuestionIndex(0);
    setBuzzedInPlayer(null);
    setWinner("");
    setSelectedAnswer(null);
    playSound("gamestart");
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameStarted && !gameOver) {
        if (e.key.toLowerCase() === "a") handleBuzzIn(1);
        if (e.key.toLowerCase() === "l") handleBuzzIn(2);
        if (["1", "2", "3", "4"].includes(e.key) && buzzedInPlayer !== null) {
          handleAnswerSelect(Number(e.key) - 1);
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [gameStarted, gameOver, handleBuzzIn, handleAnswerSelect, buzzedInPlayer]);

  if (!gameStarted)
    return (
      <Menu
        startGame={handleStartGame}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        player1Name={player1Name}
        player2Name={player2Name}
        onPlayer1NameChange={setPlayer1Name}
        onPlayer2NameChange={setPlayer2Name}
      />
    );

  if (gameOver)
    return (
      <GameOver
        winner={winner}
        scoreboard={{ player1: player1Score, player2: player2Score }}
        playAgain={handlePlayAgain}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        player1Name={player1Name}
        player2Name={player2Name}
        onPlayer1NameChange={setPlayer1Name}
        onPlayer2NameChange={setPlayer2Name}
      />
    );

  if (questions.length === 0) {
    return <div>Loading questions...</div>;
  }

  return (
    <div className="game">
      <h1 className="menu-title-ingame">
        <span className="game-title-ingame">Quiz Duel</span>
      </h1>
      <div className="Card">
        <Scoreboard
          player1Score={player1Score}
          player2Score={player2Score}
          flash1={scoreFlash1}
          flash2={scoreFlash2}
          player1Name={player1Name}
          player2Name={player2Name}
        />
      </div>

      <div className="Card">
        <PlayerBuzz onBuzzIn={handleBuzzIn} buzzedInPlayer={buzzedInPlayer} />
      </div>

      <div className="Card">
        <Question
          question={questions[currentQuestionIndex]}
          selectedAnswer={selectedAnswer}
          onAnswer={handleAnswerSelect}
        />
      </div>
    </div>
  );
};

// Shuffle function outside component
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export default App;
