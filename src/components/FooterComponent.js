import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="site-footer">
    <div className="site-footer-inner">
      <Link className="footer-brand" to="/home"><span className="brand-mark">L<span>·</span>E</span><span><strong>L'Étoile</strong><small>Thoughtful food, good company.</small></span></Link>
      <nav className="footer-nav" aria-label="Footer navigation">
        <Link to="/home">Home</Link><Link to="/menu">Menu</Link><Link to="/aboutus">Our team</Link><Link to="/contactus">Visit us</Link>
      </nav>
      <Link className="footer-contact" to="/contactus">Get in touch <span aria-hidden="true">↗</span></Link>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} L'Étoile Restaurant</span><span>Made for evenings around the table.</span></div>
  </footer>
);

export default Footer;
