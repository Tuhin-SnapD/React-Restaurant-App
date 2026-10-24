import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Loading } from './LoadingComponent';

const categoryLabels = {
  appetizer: 'Small plates',
  mains: 'Mains',
  dessert: 'Dessert',
  beverage: 'Drinks'
};

const ratingFor = (dish) => {
  const reviews = dish.comments || [];
  if (!reviews.length) return null;
  return reviews.reduce((sum, review) => sum + Number(review.rating || 0), 0) / reviews.length;
};

function DishCard({ dish }) {
  const rating = ratingFor(dish);
  return (
    <article className="menu-dish-card">
      <Link className="menu-dish-image" to={`/menu/${dish._id}`} aria-label={`View ${dish.name}`}>
        {dish.image ? <img src={dish.image} alt={dish.name} loading="lazy" /> : <span className="menu-image-fallback">L'Étoile</span>}
        {dish.label && <span className="image-label">{dish.label}</span>}
        {dish.featured && <span className="dish-featured-mark">★ Featured</span>}
      </Link>
      <div className="menu-dish-body">
        <div className="menu-dish-kicker"><span>{categoryLabels[dish.category] || dish.category}</span><strong>${Number(dish.price).toFixed(2)}</strong></div>
        <h3><Link to={`/menu/${dish._id}`}>{dish.name}</Link></h3>
        <p>{dish.description}</p>
        <div className="menu-dish-footer">
          {rating === null ? <span className="no-rating">Be the first to review</span> : <span className="review-summary"><span aria-label={`${rating.toFixed(1)} out of 5`}>★</span> {rating.toFixed(1)} <span>· {dish.comments.length} {dish.comments.length === 1 ? 'review' : 'reviews'}</span></span>}
          <Link to={`/menu/${dish._id}`} aria-label={`View details for ${dish.name}`}>View dish <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
    </article>
  );
}

const Menu = ({ dishes = { dishes: [], isLoading: false, errMess: null } }) => {
  const location = useLocation();
  const [query, setQuery] = useState(new URLSearchParams(location.search).get('search') || '');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('featured');
  const allDishes = dishes.dishes || [];

  useEffect(() => {
    setQuery(new URLSearchParams(location.search).get('search') || '');
  }, [location.search]);

  const categories = useMemo(() => ['all', ...Array.from(new Set(allDishes.map((dish) => dish.category).filter(Boolean)))], [allDishes]);
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const result = allDishes.filter((dish) => {
      const inCategory = category === 'all' || dish.category === category;
      const inSearch = !needle || [dish.name, dish.description, dish.category, dish.label].filter(Boolean).some((value) => value.toLowerCase().includes(needle));
      return inCategory && inSearch;
    });
    return result.sort((a, b) => {
      if (sort === 'price-low') return Number(a.price) - Number(b.price);
      if (sort === 'price-high') return Number(b.price) - Number(a.price);
      if (sort === 'rating') return (ratingFor(b) || 0) - (ratingFor(a) || 0);
      return Number(b.featured) - Number(a.featured) || a.name.localeCompare(b.name);
    });
  }, [allDishes, category, query, sort]);

  const reviews = allDishes.reduce((all, dish) => all.concat(dish.comments || []), []);
  const average = reviews.length ? (reviews.reduce((sum, review) => sum + Number(review.rating || 0), 0) / reviews.length).toFixed(1) : null;

  if (dishes.isLoading) return <main className="revamp-page menu-page"><div className="menu-loading"><Loading /><p>Gathering the latest from our kitchen…</p></div></main>;
  if (dishes.errMess) return <main className="revamp-page menu-page"><div className="menu-error"><span className="eyebrow">The kitchen is just out of reach</span><h1>We couldn’t load the menu.</h1><p>{dishes.errMess}</p></div></main>;

  return (
    <main className="revamp-page menu-page">
      <section className="menu-intro">
        <div className="menu-intro-copy"><span className="eyebrow">Thoughtfully made, happily shared</span><h1>Our <em>menu.</em></h1><p>Take your time. Every plate is made to order, with the best of what the kitchen has on hand.</p></div>
        <div className="menu-intro-aside"><span className="menu-aside-mark" aria-hidden="true">L·E</span><span>{allDishes.length} dishes<br />{categories.length - 1} kitchen categories</span></div>
      </section>

      <section className="menu-toolbar" aria-label="Menu filters">
        <div className="menu-search-wrap"><label htmlFor="menu-search">Find a dish</label><div className="menu-search"><span className="search-glyph" aria-hidden="true"></span><input id="menu-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search dishes, descriptions, or labels" /></div></div>
        <label className="menu-sort-wrap" htmlFor="menu-sort">Sort by<select id="menu-sort" value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Featured first</option><option value="rating">Top rated</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select></label>
      </section>

      <div className="menu-category-row" role="group" aria-label="Filter by category">
        {categories.map((item) => <button key={item} type="button" className={`category-chip ${category === item ? 'selected' : ''}`} aria-pressed={category === item} onClick={() => setCategory(item)}>{item === 'all' ? 'Everything' : categoryLabels[item] || item}</button>)}
        <span className="menu-result-count">{filtered.length} {filtered.length === 1 ? 'dish' : 'dishes'}</span>
      </div>

      {filtered.length ? <section className="menu-dish-grid" aria-label="Dishes">{filtered.map((dish) => <DishCard key={dish._id} dish={dish} />)}</section> : <section className="menu-empty"><span className="eyebrow">Nothing on this plate</span><h2>No dishes match those filters.</h2><p>Try another search or show the whole menu.</p><button className="button button-dark" type="button" onClick={() => { setQuery(''); setCategory('all'); }}>Clear filters</button></section>}

      <div className="menu-live-summary"><span><strong>{allDishes.filter((dish) => dish.featured).length}</strong> featured in the kitchen</span><span><strong>{average || '—'}</strong> average guest rating</span><span><strong>{reviews.length}</strong> guest reviews</span></div>
    </main>
  );
};

export default Menu;
