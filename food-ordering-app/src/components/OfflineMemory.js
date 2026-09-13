import { useEffect, useRef, useState } from 'react';
import { shuffle } from '../assets/offlineTrivia';

const FOOD_PAIRS = ['🍕', '🍔', '🌮', '🍣', '🍩', '🍦'];

const createDeck = () =>
    shuffle(
        FOOD_PAIRS.flatMap((emoji, pairId) => [
            { id: `${pairId}-a`, pairId, emoji },
            { id: `${pairId}-b`, pairId, emoji },
        ])
    );

const OfflineMemory = () => {
    const [deck, setDeck] = useState(createDeck);
    const [flipped, setFlipped] = useState([]);
    const [matched, setMatched] = useState([]);
    const [locked, setLocked] = useState(false);
    const [moves, setMoves] = useState(0);
    const flipTimeout = useRef(null);

    const won = matched.length === FOOD_PAIRS.length;

    useEffect(() => () => window.clearTimeout(flipTimeout.current), []);

    const reset = () => {
        window.clearTimeout(flipTimeout.current);
        setDeck(createDeck());
        setFlipped([]);
        setMatched([]);
        setLocked(false);
        setMoves(0);
    };

    const flipCard = (card) => {
        if (locked || flipped.includes(card.id) || matched.includes(card.pairId)) {
            return;
        }

        const nextFlipped = [...flipped, card.id];
        setFlipped(nextFlipped);

        if (nextFlipped.length < 2) {
            return;
        }

        const [firstId, secondId] = nextFlipped;
        const first = deck.find((item) => item.id === firstId);
        const second = deck.find((item) => item.id === secondId);
        setMoves((value) => value + 1);

        if (first.pairId === second.pairId) {
            setMatched((value) => [...value, first.pairId]);
            setFlipped([]);
            return;
        }

        setLocked(true);
        flipTimeout.current = window.setTimeout(() => {
            setFlipped([]);
            setLocked(false);
        }, 700);
    };

    return (
        <div className="offline-game-panel">
            <p className="offline-progress" role="status">
                {won ? `You matched them all in ${moves} moves` : `Moves ${moves}`}
            </p>
            <div className="offline-memory-grid">
                {deck.map((card) => {
                    const isFaceUp =
                        flipped.includes(card.id) || matched.includes(card.pairId);

                    return (
                        <button
                            type="button"
                            key={card.id}
                            className={`offline-memory-card${isFaceUp ? ' is-up' : ''}${
                                matched.includes(card.pairId) ? ' is-matched' : ''
                            }`}
                            onClick={() => flipCard(card)}
                            disabled={won}
                            aria-label={isFaceUp ? card.emoji : 'Hidden snack'}
                        >
                            {isFaceUp ? card.emoji : '?'}
                        </button>
                    );
                })}
            </div>
            {won ? (
                <button type="button" className="login-btn" onClick={reset}>
                    Shuffle and play again
                </button>
            ) : null}
        </div>
    );
};

export default OfflineMemory;
