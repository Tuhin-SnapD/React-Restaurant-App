import React, { useState } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [query, setQuery] = useState('');
    const history = useHistory();

    const searchMenu = (event) => {
        event.preventDefault();
        history.push(`/menu${query.trim() ? `?search=${encodeURIComponent(query.trim())}` : ''}`);
        setSearchOpen(false);
        setMenuOpen(false);
    };

    const closeMenu = () => setMenuOpen(false);

    return (
        <header className="site-header">
            <div className="site-header-inner">
                <Link className="brand-lockup" to="/home" onClick={closeMenu} aria-label="L'Étoile home">
                    <span className="brand-mark" aria-hidden="true">L<span>·</span>E</span>
                    <span className="brand-copy"><strong>L'Étoile</strong><small>KITCHEN · DINING · SERVICE</small></span>
                </Link>
                <button className="mobile-menu-toggle" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
                    <span></span><span></span>
                </button>
                <nav className={`site-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
                    <NavLink exact to="/home" activeClassName="is-active" onClick={closeMenu}>Home</NavLink>
                    <NavLink to="/menu" activeClassName="is-active" onClick={closeMenu}>Menu</NavLink>
                    <NavLink to="/aboutus" activeClassName="is-active" onClick={closeMenu}>Our team</NavLink>
                    <NavLink to="/contactus" activeClassName="is-active" onClick={closeMenu}>Visit us</NavLink>
                    <button className="header-search-toggle" type="button" aria-label="Search the menu" aria-expanded={searchOpen} onClick={() => setSearchOpen(!searchOpen)}>
                        <span className="search-glyph" aria-hidden="true"></span>
                    </button>
                    <Link className="header-reserve" to="/reservations" onClick={closeMenu}>Reserve a table <span aria-hidden="true">↗</span></Link>
                </nav>
            </div>
            {searchOpen && (
                <form className="header-search-panel" onSubmit={searchMenu}>
                    <label htmlFor="header-menu-search">Find something on the menu</label>
                    <div><input id="header-menu-search" autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try truffle, dessert, or mains" /><button type="submit">Search menu <span aria-hidden="true">→</span></button></div>
                </form>
            )}
        </header>
    );
};

export default Header;
