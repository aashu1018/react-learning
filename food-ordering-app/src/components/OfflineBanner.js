import { useState } from 'react';
import OfflineTrivia from './OfflineTrivia';
import OfflineMemory from './OfflineMemory';

const OfflineBanner = () => {
    const [mode, setMode] = useState('trivia');

    return (
        <main className="offline-screen">
            <div className="offline-intro" role="status" aria-live="polite">
                <p className="page-kicker">No connection</p>
                <h1>You are offline</h1>
                <p>
                    The menu will return when you are back online. Meanwhile, play a
                    round.
                </p>
            </div>

            <section className="offline-play" aria-label="Offline games">
                <div className="offline-mode-tabs">
                    <button
                        type="button"
                        className={mode === 'trivia' ? 'is-active' : ''}
                        onClick={() => setMode('trivia')}
                    >
                        Food trivia
                    </button>
                    <button
                        type="button"
                        className={mode === 'memory' ? 'is-active' : ''}
                        onClick={() => setMode('memory')}
                    >
                        Snack match
                    </button>
                </div>
                {mode === 'trivia' ? <OfflineTrivia /> : <OfflineMemory />}
            </section>
        </main>
    );
};

export default OfflineBanner;
