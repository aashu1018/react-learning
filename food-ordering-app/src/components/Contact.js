import { useState } from 'react';

const Contact = () => {
    const [form, setForm] = useState({ name: '', email: '', topic: 'order', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const updateField = (event) => {
        const { name, value } = event.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="page">
            <p className="page-kicker">We are here to help</p>
            <h1>Contact Us</h1>
            <p className="page-lead">
                Questions about an order, a restaurant listing, or an account? Reach
                the team below or send a message and we will get back to you.
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
                    <h3>Restaurant partners</h3>
                    <p>
                        Email: <a href="mailto:partners@foodapp.local">partners@foodapp.local</a>
                    </p>
                    <p>For menu updates, listing issues, and onboarding.</p>
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
                {submitted ? (
                    <p className="form-success">
                        Thanks, {form.name || 'there'}. We received your note and will
                        reply at {form.email || 'your email'} soon.
                    </p>
                ) : (
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <label>
                            Name
                            <input
                                name="name"
                                type="text"
                                required
                                value={form.name}
                                onChange={updateField}
                                placeholder="Your name"
                            />
                        </label>
                        <label>
                            Email
                            <input
                                name="email"
                                type="email"
                                required
                                value={form.email}
                                onChange={updateField}
                                placeholder="you@example.com"
                            />
                        </label>
                        <label>
                            Topic
                            <select name="topic" value={form.topic} onChange={updateField}>
                                <option value="order">Order issue</option>
                                <option value="restaurant">Restaurant listing</option>
                                <option value="account">Login or account</option>
                                <option value="other">Something else</option>
                            </select>
                        </label>
                        <label>
                            Message
                            <textarea
                                name="message"
                                required
                                rows="5"
                                value={form.message}
                                onChange={updateField}
                                placeholder="How can we help?"
                            />
                        </label>
                        <button className="search-btn" type="submit">
                            Send message
                        </button>
                    </form>
                )}
            </section>
        </div>
    );
};

export default Contact;
