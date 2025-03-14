export default function Header({ bestScore, score }) {
    return (
        <header className="header">
            <section className="header--left">
                <h1>Pokemon Memory Game</h1>
                <span>Get points by clicking on an image but don't click on any more than once!</span>
            </section>
            <section className="header--right">
                <span>Score: {score}</span>
                <span>Best score: {bestScore}</span>
            </section>
        </header>
    )
}