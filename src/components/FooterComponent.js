import React from 'react';
import { Link } from 'react-router-dom';
import { 
    FaGoogle, 
    FaFacebook, 
    FaLinkedin, 
    FaTwitter, 
    FaGithub, 
    FaEnvelope,
    FaHome,
    FaInfoCircle,
    FaUtensils,
    FaPhone,
    FaMapMarkerAlt
} from 'react-icons/fa';

function Footer(props) {
    return(
    <div className="footer-sophisticated">
        <div className="footer-main">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-6 mb-4">
                        <div className="footer-section">
                            <h5 className="footer-title">L'Étoile</h5>
                            <p className="footer-description">
                                Where culinary artistry meets exceptional dining. Experience the pinnacle of gastronomic excellence 
                                with our award-winning cuisine and impeccable service.
                            </p>
                            <div className="footer-social">
                                <a className="social-link" href="http://google.com/+" aria-label="Google Plus">
                                    <FaGoogle className="social-icon" />
                                </a>
                                <a className="social-link" href="http://www.facebook.com/profile.php?id=" aria-label="Facebook">
                                    <FaFacebook className="social-icon" />
                                </a>
                                <a className="social-link" href="https://www.linkedin.com/in/tuhin-chakrabarty-1074aa19b/" aria-label="LinkedIn">
                                    <FaLinkedin className="social-icon" />
                                </a>
                                <a className="social-link" href="http://twitter.com/" aria-label="Twitter">
                                    <FaTwitter className="social-icon" />
                                </a>
                                <a className="social-link" href="https://github.com/Tuhin-SnapD" aria-label="GitHub">
                                    <FaGithub className="social-icon" />
                                </a>
                                <a className="social-link" href="mailto:reservations@letoile.com" aria-label="Email">
                                    <FaEnvelope className="social-icon" />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-6 mb-4">
                        <div className="footer-section">
                            <h5 className="footer-title">Quick Links</h5>
                            <ul className="footer-links">
                                <li><Link to='/home' className="footer-link"><FaHome className="footer-link-icon" />Home</Link></li>
                                <li><Link to='/aboutus' className="footer-link"><FaInfoCircle className="footer-link-icon" />About Us</Link></li>
                                <li><Link to='/menu' className="footer-link"><FaUtensils className="footer-link-icon" />Menu</Link></li>
                                <li><Link to='/contactus' className="footer-link"><FaPhone className="footer-link-icon" />Contact Us</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-4">
                        <div className="footer-section">
                            <h5 className="footer-title">Contact Info</h5>
                            <div className="contact-info">
                                <div className="contact-item">
                                    <FaMapMarkerAlt className="contact-icon" />
                                    <span className="contact-text">
                                        1234 Culinary Boulevard<br/>
                                        Downtown District, MC 12345
                                    </span>
                                </div>
                                <div className="contact-item">
                                    <FaPhone className="contact-icon" />
                                    <a href="tel:+15551234567" className="contact-link">
                                        +1 (555) 123-4567
                                    </a>
                                </div>
                                <div className="contact-item">
                                    <FaEnvelope className="contact-icon" />
                                    <a href="mailto:reservations@letoile.com" className="contact-link">
                                        reservations@letoile.com
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-4">
                        <div className="footer-section">
                            <h5 className="footer-title">Hours of Operation</h5>
                            <div className="hours-info">
                                <div className="hours-item">
                                    <span className="day">Monday - Thursday</span>
                                    <span className="time">5:00 PM - 10:00 PM</span>
                                </div>
                                <div className="hours-item">
                                    <span className="day">Friday - Saturday</span>
                                    <span className="time">5:00 PM - 11:00 PM</span>
                                </div>
                                <div className="hours-item">
                                    <span className="day">Sunday</span>
                                    <span className="time">5:00 PM - 9:00 PM</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="footer-bottom">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <p className="copyright">
                            © 2024 L'Étoile Restaurant. All rights reserved.
                        </p>
                    </div>
                    <div className="col-md-6 text-md-end">
                                                    <div className="footer-bottom-links">
                                <a href="/privacy" className="footer-bottom-link">Privacy Policy</a>
                                <a href="/terms" className="footer-bottom-link">Terms of Service</a>
                                <a href="/cookies" className="footer-bottom-link">Cookie Policy</a>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Footer;