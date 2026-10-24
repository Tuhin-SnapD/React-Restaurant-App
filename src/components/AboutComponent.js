import React from 'react';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';

const About = ({ leaders = { leaders: [], isLoading: false, errMess: null } }) => {
  const team = leaders.leaders || [];
  return (
    <main className="revamp-page story-page">
      <section className="story-intro"><span className="eyebrow">The people behind the plates</span><h1>A good meal<br /><em>takes a team.</em></h1><p>Meet the people the restaurant has chosen to put in the spotlight. Roles and profiles come straight from the team directory.</p></section>
      <section className="story-team">
        <div className="section-heading"><div><span className="eyebrow">Our team</span><h2>In the kitchen & beyond</h2></div><span className="story-count">{leaders.isLoading ? '—' : team.length} profiles</span></div>
        {leaders.isLoading && <div className="menu-loading"><Loading /><p>Loading the team…</p></div>}
        {leaders.errMess && <div className="menu-error"><span className="eyebrow">Team directory unavailable</span><p>{leaders.errMess}</p></div>}
        {!leaders.isLoading && !leaders.errMess && <div className="story-team-grid">{team.map((person) => (
          <article className="story-person" key={person._id || person.id}>
            <div className="story-person-image"><img src={person.image} alt={person.name} loading="lazy" />{person.featured && <span>Featured</span>}</div>
            <div className="story-person-copy"><span className="eyebrow">{person.abbr || 'Restaurant team'}</span><h3>{person.name}</h3><p className="story-role">{person.designation}</p><p>{person.description}</p></div>
          </article>
        ))}</div>}
        {!leaders.isLoading && !leaders.errMess && team.length === 0 && <div className="menu-empty"><h2>No team profiles yet.</h2></div>}
      </section>
      <section className="story-visit"><div><span className="eyebrow">Your turn at the table</span><h2>Come see what’s cooking.</h2></div><Link className="button button-dark" to="/menu">Browse the menu <span aria-hidden="true">↗</span></Link></section>
    </main>
  );
};

export default About;
