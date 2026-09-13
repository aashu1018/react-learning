import { useState } from 'react';

const ContactForm = () => {
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

    if (submitted) {
        return (
            <p className="form-success">
                Thanks, {form.name || 'there'}. We received your note and will reply at{' '}
                {form.email || 'your email'} soon.
            </p>
        );
    }

    return (
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
                    <option value="grocery">Grocery delivery</option>
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
    );
};

export default ContactForm;
