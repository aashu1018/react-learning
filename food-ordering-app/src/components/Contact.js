import ContactForm from './ContactForm';

const Contact = () => (
    <div className="page">
        <p className="page-kicker">We are here to help</p>
        <h1>Contact Us</h1>
        <p className="page-lead">
            Questions about an order, a restaurant listing, a grocery delivery, or an
            account? Reach the team below or send a message and we will get back to you.
        </p>

        <div className="info-grid">
            <article className="info-card">
                <h3>Customer support</h3>
                <p>
                    Email: <a href="mailto:support@foodapp.local">support@foodapp.local</a>
                </p>
                <p>Phone: +91 98765 43210</p>
                <p>Hours: 8:00 AM – 11:00 PM IST, all days</p>
            </article>
            <article className="info-card">
                <h3>Grocery partners</h3>
                <p>
                    Email: <a href="mailto:grocery@foodapp.local">grocery@foodapp.local</a>
                </p>
                <p>For catalog updates, stock issues, and store onboarding.</p>
            </article>
            <article className="info-card">
                <h3>Office</h3>
                <p>12th Floor, Food Hub Tower</p>
                <p>Koramangala, Bengaluru 560034</p>
                <p>India</p>
            </article>
        </div>

        <section className="page-section">
            <h2>Send a message</h2>
            <ContactForm />
        </section>
    </div>
);

export default Contact;
