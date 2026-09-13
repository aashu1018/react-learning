import { useState } from 'react';
import { getTriviaRound, QUESTIONS_PER_ROUND } from '../assets/offlineTrivia';

const OfflineTrivia = () => {
    const [questions, setQuestions] = useState(getTriviaRound);
    const [index, setIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [picked, setPicked] = useState(null);

    const current = questions[index];
    const finished = index >= questions.length;

    const pickOption = (option) => {
        if (picked) {
            return;
        }

        setPicked(option);
        if (option === current.answer) {
            setScore((value) => value + 1);
        }
    };

    const goNext = () => {
        setPicked(null);
        setIndex((value) => value + 1);
    };

    const playAgain = () => {
        setQuestions(getTriviaRound());
        setIndex(0);
        setScore(0);
        setPicked(null);
    };

    if (finished) {
        return (
            <div className="offline-game-panel">
                <p className="offline-score" role="status">
                    You scored {score} / {QUESTIONS_PER_ROUND}
                </p>
                <p className="offline-game-note">
                    {score === QUESTIONS_PER_ROUND
                        ? 'Perfect round. Hungry and clever.'
                        : 'Not bad for waiting on Wi-Fi.'}
                </p>
                <button type="button" className="login-btn" onClick={playAgain}>
                    Play another round
                </button>
            </div>
        );
    }

    return (
        <div className="offline-game-panel">
            <p className="offline-progress">
                Question {index + 1} of {QUESTIONS_PER_ROUND} · Score {score}
            </p>
            <h2>{current.question}</h2>
            <div className="offline-options">
                {current.options.map((option) => {
                    const isPicked = picked === option;
                    const isAnswer = option === current.answer;
                    const stateClass = picked
                        ? isAnswer
                            ? ' is-correct'
                            : isPicked
                              ? ' is-wrong'
                              : ''
                        : '';

                    return (
                        <button
                            type="button"
                            key={option}
                            className={`offline-option${stateClass}`}
                            onClick={() => pickOption(option)}
                            disabled={Boolean(picked)}
                        >
                            {option}
                        </button>
                    );
                })}
            </div>
            {picked ? (
                <button type="button" className="login-btn" onClick={goNext}>
                    {index === questions.length - 1 ? 'See score' : 'Next question'}
                </button>
            ) : null}
        </div>
    );
};

export default OfflineTrivia;
