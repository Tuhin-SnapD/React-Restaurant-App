import React, { useEffect, useState } from 'react';
import { baseUrl } from '../shared/baseUrl';

const today = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
};

const responseMessage = async (response) => {
    const body = await response.json().catch(() => ({}));
    return body.error || body.message || `Request failed (${response.status})`;
};

const Reservations = () => {
    const [form, setForm] = useState({ guestName: '', email: '', phone: '', date: today(), time: '', partySize: '2', occasion: 'dinner', note: '' });
    const [availability, setAvailability] = useState(null);
    const [loadingSlots, setLoadingSlots] = useState(true);
    const [availabilityError, setAvailabilityError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [confirmation, setConfirmation] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        let cancelled = false;
        setLoadingSlots(true);
        setAvailabilityError('');
        const query = new URLSearchParams({ date: form.date, partySize: form.partySize });
        fetch(`${baseUrl}reservations/availability?${query.toString()}`)
            .then(async response => {
                if (!response.ok) throw new Error(await responseMessage(response));
                return response.json();
            })
            .then(data => {
                if (cancelled) return;
                setAvailability(data);
                const current = data.slots.find(slot => slot.time === form.time && slot.available);
                if (!current) {
                    const first = data.slots.find(slot => slot.available);
                    setForm(previous => ({ ...previous, time: first ? first.time : '' }));
                }
            })
            .catch(error => {
                if (!cancelled) {
                    setAvailability(null);
                    setAvailabilityError(error.message);
                }
            })
            .finally(() => { if (!cancelled) setLoadingSlots(false); });
        return () => { cancelled = true; };
    }, [form.date, form.partySize, refreshKey]);

    const update = event => {
        setForm(previous => ({ ...previous, [event.target.name]: event.target.value }));
        setSubmitError('');
        setConfirmation(null);
    };

    const formValid = form.guestName.trim().length >= 2
        && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
        && form.phone.trim().length >= 7;

    const submit = async event => {
        event.preventDefault();
        setSubmitting(true);
        setSubmitError('');
        setConfirmation(null);
        try {
            const response = await fetch(`${baseUrl}reservations`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...form, partySize: Number(form.partySize) })
            });
            if (!response.ok) throw new Error(await responseMessage(response));
            const result = await response.json();
            setConfirmation(result);
            setRefreshKey(key => key + 1);
        } catch (error) {
            setSubmitError(error.message || 'We could not send your request. Please try again.');
            setRefreshKey(key => key + 1);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <main className="revamp-page reservation-page">
            <section className="reservation-intro">
                <span className="eyebrow">A SEAT AT THE TABLE</span>
                <h1>Make an <em>evening</em> of it.</h1>
                <p>Choose a date, find a seating with room for your party, and send a reservation request to our team.</p>
                <div className="reservation-promise"><span aria-hidden="true">✳</span><span>Requests are confirmed by the restaurant. Your live availability comes directly from the booking service.</span></div>
            </section>

            <div className="reservation-layout">
                <aside className="reservation-availability">
                    <div className="reservation-section-label"><span>01</span> LIVE AVAILABILITY</div>
                    <h2>Find your<br /><em>seating.</em></h2>
                    <p className="reservation-capacity">{availability ? `${availability.seatCapacity} seats per seating` : 'Availability updates as requests arrive'}</p>
                    {loadingSlots && <p className="reservation-state">Checking the table plan…</p>}
                    {!loadingSlots && availabilityError && <p className="reservation-state reservation-error">{availabilityError}</p>}
                    {!loadingSlots && availability && (
                        <div className="reservation-slot-grid" role="group" aria-label="Available seating times">
                            {availability.slots.map(slot => (
                                <button key={slot.time} type="button" className={`reservation-slot ${form.time === slot.time ? 'is-selected' : ''}`} aria-pressed={form.time === slot.time} disabled={!slot.available || loadingSlots} onClick={() => setForm(previous => ({ ...previous, time: slot.time }))}>
                                    <strong>{slot.time}</strong>
                                    <span>{slot.past ? 'Service started' : (slot.available ? `${slot.remainingGuests} seats left` : 'Fully booked')}</span>
                                </button>
                            ))}
                        </div>
                    )}
                    {!loadingSlots && availability && !availability.slots.some(slot => slot.available) && <p className="reservation-state">No seatings have enough room for this party. Try a different date or party size.</p>}
                </aside>

                <section className="reservation-form-panel">
                    <div className="reservation-section-label"><span>02</span> RESERVATION REQUEST</div>
                    <h2>Tell us who’s joining.</h2>
                    {confirmation && <div className="reservation-success" role="status"><strong>Request received</strong><span>{confirmation.message}</span><b>Reference {confirmation.reservation.confirmationCode}</b></div>}
                    {submitError && <div className="reservation-alert" role="alert">{submitError}</div>}
                    <form onSubmit={submit}>
                        <div className="reservation-fields">
                            <label>Full name<input name="guestName" value={form.guestName} onChange={update} minLength="2" maxLength="80" required autoComplete="name" placeholder="Name for the table" /></label>
                            <label>Email address<input name="email" type="email" value={form.email} onChange={update} required autoComplete="email" placeholder="you@example.com" /></label>
                            <label>Phone number<input name="phone" type="tel" value={form.phone} onChange={update} minLength="7" maxLength="24" required autoComplete="tel" placeholder="For reservation updates" /></label>
                            <label>Date<input name="date" type="date" value={form.date} min={today()} onChange={update} required /></label>
                            <label>Party size<select name="partySize" value={form.partySize} onChange={update}>{Array.from({ length: 12 }, (_, index) => <option key={index + 1} value={index + 1}>{index + 1} {index === 0 ? 'guest' : 'guests'}</option>)}</select></label>
                            <label>Occasion<select name="occasion" value={form.occasion} onChange={update}><option value="dinner">Dinner</option><option value="birthday">Birthday</option><option value="anniversary">Anniversary</option><option value="business">Business</option><option value="other">Other</option></select></label>
                            <label className="reservation-note-field">A note for our team <textarea name="note" value={form.note} onChange={update} maxLength="500" rows="3" placeholder="Seating preferences or anything we should know" /></label>
                        </div>
                        <div className="reservation-submit-row"><span>Up to 12 guests · Changes are subject to availability.</span><button type="submit" disabled={submitting || loadingSlots || !form.time || !formValid || Boolean(availabilityError)}>{submitting ? 'Sending request…' : 'Request this table'} <span aria-hidden="true">↗</span></button></div>
                    </form>
                </section>
            </div>
        </main>
    );
};

export default Reservations;
