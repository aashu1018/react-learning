const About = () => {
    return (
        <div className="page">
            <p className="page-kicker">Our story</p>
            <h1>About Us</h1>
            <p className="page-lead">
                We started this food ordering app to make finding a great meal as easy
                as scrolling your feed. Browse nearby restaurants, filter by what you
                care about, and get food to your door without the usual guesswork.
            </p>

            <section className="page-section">
                <h2>What we do</h2>
                <p>
                    Search by restaurant name, cuisine, or dish. Use Top Rated when you
                    want the safest pick, Fast Delivery when you are hungry now, and
                    Show All when you want the full list again.
                </p>
            </section>

            <div className="info-grid">
                <article className="info-card">
                    <h3>Discover</h3>
                    <p>
                        Explore a curated list of restaurants with ratings, delivery
                        times, and price for two so you can decide at a glance.
                    </p>
                </article>
                <article className="info-card">
                    <h3>Filter</h3>
                    <p>
                        Narrow the list by search, rating, or speed. No extra clicks
                        through menus you did not ask for.
                    </p>
                </article>
                <article className="info-card">
                    <h3>Order</h3>
                    <p>
                        Add items to your cart when you are ready. We keep the flow
                        simple so you spend less time tapping and more time eating.
                    </p>
                </article>
            </div>

            <section className="page-section">
                <h2>Why it exists</h2>
                <p>
                    Too many food apps bury the basics. We focus on the few things
                    that matter before you order: who is nearby, how good they are,
                    how fast they deliver, and what they cook.
                </p>
                <ul className="page-list">
                    <li>Clear ratings and delivery times on every card</li>
                    <li>Search that looks at names, cuisines, and dishes</li>
                    <li>A cart you can open any time from the header</li>
                    <li>Support that actually answers order questions</li>
                </ul>
            </section>
        </div>
    );
};

export default About;
