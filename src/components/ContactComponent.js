import React, { useState } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Row, Col, Label, Container, Card, CardBody, CardHeader, Alert } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { 
    FaPhone, 
    FaMapMarkerAlt, 
    FaEnvelope, 
    FaPaperPlane,
    FaUser,
    FaEnvelopeOpen,
    FaCheckCircle,
    FaStar,
    FaHeart,
    FaSmile
} from 'react-icons/fa';

const Contact = (props) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [feedbackType, setFeedbackType] = useState('general');

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      console.log('Form submitted:', data);
      // Call the feedback submission function
      await props.postFeedback(data.firstname, data.lastname, data.telnum, data.email, data.agree, data.contactType, data.message);
      reset();
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCallReservations = () => {
    window.open('tel:+15551234567', '_self');
  };

  const handleEmailReservations = () => {
    window.open('mailto:reservations@letoile.com', '_self');
  };

  const getFeedbackIcon = () => {
    switch (feedbackType) {
      case 'compliment':
        return <FaHeart className="feedback-type-icon" />;
      case 'suggestion':
        return <FaStar className="feedback-type-icon" />;
      case 'complaint':
        return <FaEnvelopeOpen className="feedback-type-icon" />;
      default:
        return <FaSmile className="feedback-type-icon" />;
    }
  };

  return (
    <Container fluid className="contact-container-sophisticated">
      {/* Hero Section */}
      <Row className="contact-hero-sophisticated">
        <Col>
          <div className="hero-content-sophisticated">
            <div className="hero-badge-sophisticated">
              <FaPhone className="hero-badge-icon-sophisticated" />
              <span className="hero-badge-text-sophisticated">Get in Touch</span>
            </div>
            <h1 className="hero-title-sophisticated">Contact & Reservations</h1>
            <p className="hero-subtitle-sophisticated">
              Ready to experience culinary excellence? Reach out to us for reservations, 
              special events, or simply to share your dining experience.
            </p>
          </div>
        </Col>
      </Row>

      <Container>
        {/* Breadcrumb */}
        <Row className="mb-4">
          <Col>
            <Breadcrumb className="breadcrumb-sophisticated">
              <BreadcrumbItem><Link to="/home" className="breadcrumb-link-sophisticated">Home</Link></BreadcrumbItem>
              <BreadcrumbItem active className="breadcrumb-active-sophisticated">Contact Us</BreadcrumbItem>
            </Breadcrumb>
          </Col>
        </Row>

        {/* Success Alert */}
        {showSuccess && (
          <Row className="mb-4">
            <Col>
              <Alert color="success" className="success-alert-sophisticated">
                <div className="alert-content">
                  <FaCheckCircle className="alert-icon" />
                  <div className="alert-text">
                    <h5>Thank you for your feedback!</h5>
                    <p>We have received your message and will get back to you soon.</p>
                  </div>
                </div>
              </Alert>
            </Col>
          </Row>
        )}

        {/* Location & Reservations Section */}
        <Row className="location-section-sophisticated">
          <Col lg={6} className="location-info">
            <Card className="location-card-sophisticated">
              <CardHeader className="location-header-sophisticated">
                <h3 className="location-title">Restaurant Location</h3>
              </CardHeader>
              <CardBody className="location-body-sophisticated">
                <div className="address-info">
                  <div className="address-item">
                    <FaMapMarkerAlt className="address-icon" />
                    <div className="address-text">
                      <strong>Address:</strong><br />
                      1234 Culinary Boulevard<br />
                      Downtown District<br />
                      Metropolitan City, MC 12345
                    </div>
                  </div>
                  <div className="address-item">
                    <FaPhone className="address-icon" />
                    <div className="address-text">
                      <strong>Phone:</strong><br />
                      <a href="tel:+15551234567" className="contact-link-sophisticated">+1 (555) 123-4567</a>
                    </div>
                  </div>
                  <div className="address-item">
                    <FaEnvelope className="address-icon" />
                    <div className="address-text">
                      <strong>Email:</strong><br />
                      <a href="mailto:reservations@letoile.com" className="contact-link-sophisticated">
                        reservations@letoile.com
                      </a>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg={6} className="location-map">
            <Card className="map-card-sophisticated">
              <CardHeader className="map-header-sophisticated">
                <h3 className="map-title">Find Us</h3>
              </CardHeader>
              <CardBody className="map-body-sophisticated">
                <img 
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&h=400&fit=crop" 
                  alt="Restaurant Location Map" 
                  className="map-image-sophisticated"
                />
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* Quick Actions */}
        <Row className="quick-actions-section-sophisticated">
          <Col>
            <div className="quick-actions-header">
              <h3 className="quick-actions-title">Quick Actions</h3>
              <p className="quick-actions-subtitle">Get in touch with us instantly</p>
            </div>
            <div className="quick-actions-buttons">
              <Button 
                color="warning" 
                size="lg" 
                className="action-button-sophisticated"
                onClick={handleCallReservations}
              >
                <FaPhone className="button-icon" />
                <span className="button-text">Call Reservations</span>
              </Button>
              <Button 
                outline 
                color="warning" 
                size="lg" 
                className="action-button-sophisticated"
                onClick={handleEmailReservations}
              >
                <FaEnvelope className="button-icon" />
                <span className="button-text">Email Us</span>
              </Button>
            </div>
          </Col>
        </Row>

        {/* Feedback Form Section */}
        <Row className="feedback-section-sophisticated">
          <Col lg={10} className="mx-auto">
            <Card className="feedback-card-sophisticated">
              <CardHeader className="feedback-header-sophisticated">
                <div className="feedback-header-content">
                  <div className="feedback-header-icon">
                    {getFeedbackIcon()}
                  </div>
                  <div className="feedback-header-text">
                    <h3 className="feedback-title">Share Your Experience</h3>
                    <p className="feedback-subtitle">
                      We value your feedback and would love to hear about your dining experience
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardBody className="feedback-body-sophisticated">
                <form onSubmit={handleSubmit(onSubmit)} className="feedback-form-sophisticated">
                  {/* Feedback Type Selection */}
                  <Row className="form-group-sophisticated">
                    <Col md={12}>
                      <Label className="form-label-sophisticated">
                        <FaStar className="form-icon" />
                        Type of Feedback
                      </Label>
                      <div className="feedback-type-buttons">
                        <button
                          type="button"
                          className={`feedback-type-btn ${feedbackType === 'general' ? 'active' : ''}`}
                          onClick={() => setFeedbackType('general')}
                        >
                          <FaSmile className="feedback-type-icon" />
                          <span>General</span>
                        </button>
                        <button
                          type="button"
                          className={`feedback-type-btn ${feedbackType === 'compliment' ? 'active' : ''}`}
                          onClick={() => setFeedbackType('compliment')}
                        >
                          <FaHeart className="feedback-type-icon" />
                          <span>Compliment</span>
                        </button>
                        <button
                          type="button"
                          className={`feedback-type-btn ${feedbackType === 'suggestion' ? 'active' : ''}`}
                          onClick={() => setFeedbackType('suggestion')}
                        >
                          <FaStar className="feedback-type-icon" />
                          <span>Suggestion</span>
                        </button>
                        <button
                          type="button"
                          className={`feedback-type-btn ${feedbackType === 'complaint' ? 'active' : ''}`}
                          onClick={() => setFeedbackType('complaint')}
                        >
                          <FaEnvelopeOpen className="feedback-type-icon" />
                          <span>Concern</span>
                        </button>
                      </div>
                    </Col>
                  </Row>

                  {/* Personal Information */}
                  <Row className="form-section-sophisticated">
                    <Col md={12}>
                      <h4 className="form-section-title">Personal Information</h4>
                    </Col>
                  </Row>

                  <Row className="form-group-sophisticated">
                    <Col md={6}>
                      <Label htmlFor="firstname" className="form-label-sophisticated">
                        <FaUser className="form-icon" />
                        First Name *
                      </Label>
                      <input
                        {...register("firstname", { 
                          required: "First name is required.", 
                          minLength: { value: 3, message: "Must be greater than 2 characters." },
                          maxLength: { value: 15, message: "Must be 15 characters or less." }
                        })}
                        id="firstname"
                        className={`form-input-sophisticated ${errors.firstname ? 'error' : ''}`}
                        name="firstname"
                        placeholder="Enter your first name"
                      />
                      {errors.firstname && <span className="error-message-sophisticated">{errors.firstname.message}</span>}
                    </Col>
                    <Col md={6}>
                      <Label htmlFor="lastname" className="form-label-sophisticated">
                        <FaUser className="form-icon" />
                        Last Name *
                      </Label>
                      <input
                        {...register("lastname", { 
                          required: "Last name is required.", 
                          minLength: { value: 3, message: "Must be greater than 2 characters." },
                          maxLength: { value: 15, message: "Must be 15 characters or less." }
                        })}
                        id="lastname"
                        className={`form-input-sophisticated ${errors.lastname ? 'error' : ''}`}
                        name="lastname"
                        placeholder="Enter your last name"
                      />
                      {errors.lastname && <span className="error-message-sophisticated">{errors.lastname.message}</span>}
                    </Col>
                  </Row>
                  
                  <Row className="form-group-sophisticated">
                    <Col md={6}>
                      <Label htmlFor="telnum" className="form-label-sophisticated">
                        <FaPhone className="form-icon" />
                        Contact Tel. *
                      </Label>
                      <input
                        {...register("telnum", { 
                          required: "Phone number is required.", 
                          minLength: { value: 3, message: "Must be greater than 2 numbers." },
                          maxLength: { value: 15, message: "Must be 15 numbers or less." },
                          pattern: { value: /^\d+$/, message: "Must be a number." }
                        })}
                        id="telnum"
                        className={`form-input-sophisticated ${errors.telnum ? 'error' : ''}`}
                        name="telnum"
                        placeholder="Enter your phone number"
                      />
                      {errors.telnum && <span className="error-message-sophisticated">{errors.telnum.message}</span>}
                    </Col>
                    <Col md={6}>
                      <Label htmlFor="email" className="form-label-sophisticated">
                        <FaEnvelope className="form-icon" />
                        Email *
                      </Label>
                      <input
                        {...register("email", { 
                          required: "Email is required.", 
                          pattern: { 
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 
                            message: "Invalid Email Address." 
                          }
                        })}
                        id="email"
                        className={`form-input-sophisticated ${errors.email ? 'error' : ''}`}
                        name="email"
                        placeholder="Enter your email address"
                      />
                      {errors.email && <span className="error-message-sophisticated">{errors.email.message}</span>}
                    </Col>
                  </Row>
                  
                  {/* Contact Preferences */}
                  <Row className="form-section-sophisticated">
                    <Col md={12}>
                      <h4 className="form-section-title">Contact Preferences</h4>
                    </Col>
                  </Row>

                  <Row className="form-group-sophisticated">
                    <Col md={6}>
                      <div className="checkbox-group-sophisticated">
                        <Label check className="checkbox-label-sophisticated">
                          <input
                            {...register("agree")}
                            type="checkbox"
                            className="checkbox-input-sophisticated"
                            name="agree"
                          />
                          <FaCheckCircle className="checkbox-icon" />
                          <span className="checkbox-text-sophisticated">
                            <strong>May we contact you?</strong>
                          </span>
                        </Label>
                      </div>
                    </Col>
                    <Col md={6}>
                      <Label htmlFor="contactType" className="form-label-sophisticated">
                        Preferred Contact Method
                      </Label>
                      <select
                        {...register("contactType")}
                        className="form-select-sophisticated"
                        name="contactType"
                        id="contactType"
                      >
                        <option value="Tel.">Phone</option>
                        <option value="Email">Email</option>
                      </select>
                    </Col>
                  </Row>
                  
                  {/* Feedback Message */}
                  <Row className="form-section-sophisticated">
                    <Col md={12}>
                      <h4 className="form-section-title">Your Feedback</h4>
                    </Col>
                  </Row>

                  <Row className="form-group-sophisticated">
                    <Col md={12}>
                      <Label htmlFor="message" className="form-label-sophisticated">
                        <FaEnvelopeOpen className="form-icon" />
                        Message *
                      </Label>
                      <textarea
                        {...register("message", {
                          required: "Please share your feedback.",
                          minLength: { value: 10, message: "Message must be at least 10 characters." }
                        })}
                        id="message"
                        rows="6"
                        className={`form-textarea-sophisticated ${errors.message ? 'error' : ''}`}
                        name="message"
                        placeholder="Share your dining experience, suggestions, or any questions you may have..."
                      />
                      {errors.message && <span className="error-message-sophisticated">{errors.message.message}</span>}
                    </Col>
                  </Row>
                  
                  {/* Submit Button */}
                  <Row className="form-group-sophisticated">
                    <Col md={12} className="text-center">
                      <Button 
                        type="submit" 
                        color="warning" 
                        size="lg"
                        className="submit-button-sophisticated"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="spinner-border spinner-border-sm me-2" role="status">
                              <span className="visually-hidden">Loading...</span>
                            </div>
                            <span className="button-text">Sending...</span>
                          </>
                        ) : (
                          <>
                            <FaPaperPlane className="button-icon" />
                            <span className="button-text">Send Feedback</span>
                          </>
                        )}
                      </Button>
                    </Col>
                  </Row>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Contact;