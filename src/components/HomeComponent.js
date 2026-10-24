import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

const averageRating = (dishes) => {
  const reviews = (dishes || []).reduce((all, dish) => all.concat(dish.comments || []), []);
  if (!reviews.length) return null;
  return (reviews.reduce((sum, review) => sum + Number(review.rating || 0), 0) / reviews.length).toFixed(1);
};

function FeatureCard({ item, eyebrow, kind, loading, error, to }) {
  if (loading) return <article className="feature-card feature-card-state"><Loading /><p>Loading {eyebrow.toLowerCase()}…</p></article>;
  if (error) return <article className="feature-card feature-card-state"><span className="eyebrow">{eyebrow}</span><p className="inline-error">{error}</p></article>;
  if (!item) return null;

  const content = (
    <>
      <div className="feature-image-wrap">
        <img src={item.image} alt={item.name} loading="lazy" />
        {item.label && <span className="image-label">{item.label}</span>}
        {item.price !== undefined && <span className="image-price">${Number(item.price).toFixed(2)}</span>}
      </div>
      <div className="feature-card-copy">
        <span className="eyebrow">{eyebrow}</span>
        <h3>{item.name}</h3>
        {kind === 'chef' && item.designation && <p className="feature-designation">{item.designation}</p>}
        <p>{item.description}</p>
        {kind === 'dish' && item.comments && item.comments.length > 0 && (
          <span className="review-summary"><span aria-label="Rated">★</span> {(item.comments.reduce((sum, comment) => sum + Number(comment.rating || 0), 0) / item.comments.length).toFixed(1)} <span>· {item.comments.length} guest reviews</span></span>
        )}
        {kind === 'chef' && item.abbr && <span className="review-summary">{item.abbr}</span>}
      </div>
      <span className="feature-arrow" aria-hidden="true">↗</span>
    </>
  );

  return to ? <Link className="feature-card" to={to}>{content}</Link> : <article className="feature-card">{content}</article>;
}

function Home(props) {
  const [tonight, setTonight] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`${baseUrl}restaurant/overview`)
      .then(response => {
        if (!response.ok) throw new Error(`Request failed (${response.status})`);
        return response.json();
      })
      .then(data => { if (!cancelled) setTonight(data); })
      .catch(() => { if (!cancelled) setTonight(null); });
    return () => { cancelled = true; };
  }, []);

  const dishes = props.dishes || [];
  const categories = new Set(dishes.map((dish) => dish.category).filter(Boolean)).size;
  const rating = averageRating(dishes);
  const featuredDish = props.dish;

  return (
    <main className="revamp-page home-page">
      <section className="home-hero">
        <div className="hero-copy">
          <span className="eyebrow hero-eyebrow"><i></i> A table worth lingering at</span>
          <h1>Good food.<br /><em>Long evenings.</em></h1>
          <p>Season-led cooking, thoughtful pours, and the kind of welcome that makes dinner feel like an occasion.</p>
          <div className="hero-actions">
            <Link className="button button-dark" to="/menu">Explore the menu <span aria-hidden="true">↗</span></Link>
            <Link className="text-link" to="/contactus">Plan your visit <span aria-hidden="true">→</span></Link>
          </div>
          <div className="live-note"><span className="live-dot"></span> Discover what’s on our menu today</div>
        </div>
        <div className="hero-visual">
          <div className="hero-photo-frame">
            {featuredDish && <img src={featuredDish.image} alt={featuredDish.name} />}
            {!featuredDish && <div className="hero-photo-placeholder">L'Étoile <span>Seasonal dining</span></div>}
          </div>
          {featuredDish && <Link className="hero-dish-note" to={`/menu/${featuredDish._id}`}>
            <span className="eyebrow">From the kitchen · {featuredDish.category}</span>
            <strong>{featuredDish.name}</strong>
            <span className="hero-note-bottom">{featuredDish.label || 'Featured dish'} <span>${Number(featuredDish.price).toFixed(2)}</span></span>
          </Link>}
          <span className="hero-stamp" aria-hidden="true">MADE<br />WITH<br /><b>CARE</b></span>
        </div>
      </section>

      <section className="proof-strip" aria-label="Live restaurant data">
        <div><strong>{props.dishesLoading ? '—' : dishes.length}</strong><span>Dishes on the menu</span></div>
        <div><strong>{props.dishesLoading ? '—' : categories}</strong><span>Kitchen categories</span></div>
        <div><strong>{props.dishesLoading ? '—' : rating || '—'}</strong><span>Average guest rating</span></div>
        <div className="proof-note">Made for sharing<br />and staying awhile.</div>
      </section>

      <section className="tonight-snapshot" aria-label="Tonight's live seating availability">
        <div className="tonight-snapshot-intro"><span className="eyebrow">TONIGHT AT L'ÉTOILE</span><strong>{tonight ? (tonight.serviceStatus === 'open' ? 'Dinner service is underway' : (tonight.serviceStatus === 'upcoming' ? 'Dinner service starts at 17:00' : 'Dinner service has ended')) : 'Checking the dinner service'}</strong></div>
        <div><span>Next available seating</span><strong>{tonight ? (tonight.nextAvailableTime || 'Fully booked') : '—'}</strong></div>
        <div><span>Seatings with room</span><strong>{tonight ? tonight.openSeatings : '—'}</strong></div>
        <div><span>Seats across open times</span><strong>{tonight ? tonight.remainingSeatCapacity : '—'}</strong></div>
        <Link to="/reservations">See live availability <span aria-hidden="true">→</span></Link>
      </section>

      <section className="home-featured section-wrap">
        <div className="section-heading">
          <div><span className="eyebrow">A little of what we do</span><h2>On the table</h2></div>
          <Link className="text-link" to="/menu">See the full menu <span aria-hidden="true">→</span></Link>
        </div>
        <div className="feature-grid">
          <FeatureCard item={props.dish} eyebrow="From the kitchen" kind="dish" loading={props.dishesLoading} error={props.dishesErrMess} to={props.dish ? `/menu/${props.dish._id}` : null} />
          <FeatureCard item={props.promotion} eyebrow="A special for you" kind="promotion" loading={props.promosLoading} error={props.promosErrMess} />
          <FeatureCard item={props.leader} eyebrow="The people behind it" kind="chef" loading={props.leadersLoading} error={props.leadersErrMess} />
        </div>
      </section>

      <section className="home-invitation">
        <div><span className="eyebrow">An evening at L'Étoile</span><h2>Come hungry.<br /><em>Leave happy.</em></h2></div>
        <div className="invitation-copy"><p>Take a look at what’s cooking, find a new favorite, and get in touch when you’re ready to join us.</p><Link className="button button-light" to="/contactus">Make an enquiry <span aria-hidden="true">↗</span></Link></div>
      </section>
    </main>
  );
}

export default Home;
