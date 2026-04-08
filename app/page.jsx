"use client";

import { useState } from "react";
import images from "../lib/images";

const totalQuestions = images.length;

export default function Home() {
  const [playerName, setPlayerName] = useState("");
  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [lastResponse, setLastResponse] = useState(null);
  const [finished, setFinished] = useState(false);
  const [error, setError] = useState("");

  const currentImage = images[currentIndex];

  const startGame = () => {
    const name = playerName.trim();
    if (!name) {
      setError("Le pseudo est requis pour commencer.");
      return;
    }

    setError("");
    setStarted(true);
    setFinished(false);
    setCurrentIndex(0);
    setScore(0);
    setAnswers([]);
    setLastResponse(null);
  };

  const handleAnswer = (answerBoss) => {
    const isCorrect = answerBoss === currentImage.isBoss;
    if (isCorrect) {
      setScore((value) => value + 1);
    }

    const answer = {
      title: currentImage.title,
      isBoss: currentImage.isBoss,
      answerBoss,
      isCorrect,
    };

    setAnswers((previous) => [...previous, answer]);
    setLastResponse(answer);
  };

  const handleNext = () => {
    if (currentIndex + 1 >= totalQuestions) {
      setFinished(true);
      return;
    }

    setCurrentIndex((value) => value + 1);
    setLastResponse(null);
  };

  const restart = () => {
    setPlayerName("");
    setStarted(false);
    setCurrentIndex(0);
    setScore(0);
    setAnswers([]);
    setLastResponse(null);
    setFinished(false);
    setError("");
  };

  return (
    <main className="pageShell">
      <div className="card">
        <header className="header">
          <h1>Est-ce un Boss ?</h1>
          <p className="subtitle">Devine si la personne sur l'image est un boss ou non.</p>
          {!started && <img src="https://miro.medium.com/1*-SoJy52kgGuN9Fj9jmIb0Q.png" alt="Illustration du jeu" className="headerImage" />}
        </header>

        {!started ? (
          <section className="intro">
            <p>Entre ton pseudo puis appuie sur "Commencer" pour lancer le quiz de 10 images.</p>
            <label className="fieldLabel">
              <span>Pseudo</span>
              <input
                type="text"
                value={playerName}
                onChange={(event) => setPlayerName(event.target.value)}
                placeholder="Ton pseudo..."
                autoFocus
              />
            </label>
            {error ? <p className="errorText">{error}</p> : null}
            <button className="primaryButton" onClick={startGame}>
              Commencer
            </button>
          </section>
        ) : finished ? (
          <section className="result">
            <p className="resultTitle">Bravo {playerName} !</p>
            <p className="resultScore">Tu as obtenu {score} / {totalQuestions}</p>
            <button className="primaryButton" onClick={restart}>
              Rejouer
            </button>
            <div className="summaryCard">
              <h2>Détail des réponses</h2>
              <div className="summaryList">
                {answers.map((answer, index) => (
                  <div
                    key={index}
                    className={`summaryItem ${answer.isCorrect ? "correct" : "wrong"}`}
                  >
                    <div>
                      <p className="summaryTitle">{index + 1}. {answer.title}</p>
                      <p className="summaryMeta">
                        {answer.isBoss ? "C'était un boss" : "Ce n'était pas un boss"} ·
                        Ta réponse : {answer.answerBoss ? "Boss" : "Pas boss"}
                      </p>
                    </div>
                    <span>{answer.isCorrect ? "✔️" : "❌"}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : (
          <section className="quiz">
            <div className="statusBar">
              <span>Pseudo : <strong>{playerName}</strong></span>
              <span>Image {currentIndex + 1} / {totalQuestions}</span>
            </div>
            <div className="imageWrapper">
              <img src={currentImage.src} alt={currentImage.alt} />
            </div>
            <p className="questionText">Est-ce un boss ?</p>
            <div className="buttonGroup">
              <button
                className="answerButton boss"
                onClick={() => handleAnswer(true)}
                disabled={!!lastResponse}
              >
                Boss
              </button>
              <button
                className="answerButton"
                onClick={() => handleAnswer(false)}
                disabled={!!lastResponse}
              >
                Pas boss
              </button>
            </div>

            {lastResponse ? (
              <div className={`feedbackCard ${lastResponse.isCorrect ? "correct" : "wrong"}`}>
                <p>
                  {lastResponse.isCorrect
                    ? "Bonne réponse !"
                    : "Mauvaise réponse."}{" "}
                    {lastResponse.isBoss ? "Ce personnage avait une allure de boss." : "Ce personnage avait une allure plus discrète."}
                </p>
                <button className="primaryButton" onClick={handleNext}>
                  {currentIndex + 1 >= totalQuestions ? "Voir le résultat" : "Question suivante"}
                </button>
              </div>
            ) : null}
          </section>
        )}
      </div>
    </main>
  );
}
