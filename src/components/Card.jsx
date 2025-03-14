export default function Card({ loading, error, pokemons }) {

    return (
        <section className="card--container">
            {loading && <p style={{color: "red"}}>Loading...</p> }
            {error && <p>{error}</p> }
            {pokemons.map((pokemon) => (
                <div key={pokemon.id} id={pokemon.id} className="card" >
                    <img id={pokemon.id} src={pokemon.image} alt={pokemon.name} />
                    <span id={pokemon.id}>{pokemon.name}</span>
                </div>
            ))}            
        </section>
    )
}