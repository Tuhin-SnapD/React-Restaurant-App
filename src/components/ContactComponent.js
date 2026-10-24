import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const feedbackOptions = [
  { id: 'general', label: 'General note', symbol: '✳' },
  { id: 'compliment', label: 'A compliment', symbol: '♡' },
  { id: 'suggestion', label: 'An idea', symbol: '↗' },
  { id: 'complaint', label: 'A concern', symbol: '…' }
];

const Contact = ({ postFeedback }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [feedbackType, setFeedbackType] = useState('general');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitError('');
    setSuccess(false);
    try {
      await postFeedback(data.firstname, data.lastname, data.telnum, data.email, Boolean(data.agree), data.contactType, data.message, feedbackType);
      reset();
      setSuccess(true);
    } catch (error) {
      setSubmitError(error.message || 'Your note could not be sent. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="revamp-page contact-page">
      <section className="contact-intro"><span className="eyebrow">A note to the restaurant</span><h1>Let’s <em>talk.</em></h1><p>Questions, feedback, a kind word for the kitchen—send the team a message and we’ll be in touch.</p></section>
      <section className="contact-layout">
        <aside className="contact-aside"><span className="contact-aside-mark" aria-hidden="true">L·E</span><span className="eyebrow">Your message goes to</span><h2>The L'Étoile team</h2><p>This form sends your note directly to the restaurant’s feedback service. Choose what your message is about and how you’d like us to reach you.</p><div className="contact-aside-note"><span>01</span><p>Your details are used to respond to this message.</p></div></aside>
        <div className="contact-form-panel">
          <div className="contact-form-heading"><span className="eyebrow">Start a conversation</span><h2>What’s on your mind?</h2></div>
          {success && <div className="contact-message success" role="status"><strong>Thanks for writing.</strong><span>Your message was sent to the restaurant.</span></div>}
          {submitError && <div className="contact-message error" role="alert"><strong>We couldn’t send your message.</strong><span>{submitError}</span></div>}
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <fieldset className="feedback-type-set"><legend>What’s this about?</legend><div>{feedbackOptions.map((option) => <button key={option.id} type="button" className={feedbackType === option.id ? 'selected' : ''} aria-pressed={feedbackType === option.id} onClick={() => setFeedbackType(option.id)}><span>{option.symbol}</span>{option.label}</button>)}</div></fieldset>
            <div className="contact-field-grid">
              <label>First name<input {...register('firstname', { required: 'Please enter your first name.', minLength: { value: 2, message: 'Use at least 2 characters.' } })} autoComplete="given-name" />{errors.firstname && <small>{errors.firstname.message}</small>}</label>
              <label>Last name<input {...register('lastname', { required: 'Please enter your last name.', minLength: { value: 2, message: 'Use at least 2 characters.' } })} autoComplete="family-name" />{errors.lastname && <small>{errors.lastname.message}</small>}</label>
              <label>Email<input type="email" {...register('email', { required: 'Please enter your email.', pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email address.' } })} autoComplete="email" />{errors.email && <small>{errors.email.message}</small>}</label>
              <label>Phone<input type="tel" {...register('telnum', { required: 'Please enter your phone number.', pattern: { value: /^\d{7,15}$/, message: 'Use 7–15 digits.' } })} autoComplete="tel" />{errors.telnum && <small>{errors.telnum.message}</small>}</label>
              <label className="contact-full-field">Preferred reply<select {...register('contactType')}><option value="Email">Email</option><option value="Tel.">Phone</option></select></label>
              <label className="contact-full-field">Your message<textarea rows="5" {...register('message', { required: 'Please add a message.', minLength: { value: 10, message: 'Use at least 10 characters.' } })} placeholder="Write your note here…" />{errors.message && <small>{errors.message.message}</small>}</label>
            </div>
            <label className="contact-consent"><input type="checkbox" {...register('agree')} /><span>I’m happy for the restaurant to contact me about this message.</span></label>
            <div className="contact-submit-row"><span>Fields marked with a validation message need attention.</span><button className="button button-dark" type="submit" disabled={isSubmitting}>{isSubmitting ? <>Sending…</> : <>Send your note <span aria-hidden="true">↗</span></>}</button></div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Contact;
