import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, Badge, Row, Col, Container } from 'reactstrap';
import { Loading } from './LoadingComponent';
import { 
    FaUtensils, 
    FaStar, 
    FaUserTie, 
    FaWineGlass, 
    FaPalette, 
    FaRegStar,
    FaPhone
} from 'react-icons/fa';

function RenderCard({ item, isLoading, errMess, type }) {
  if (isLoading) {
    return (
      <div className="loading-container">
        <Loading />
        <h4>Loading {type}...</h4>
      </div>
    );
  }
  else if (errMess) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <h4>{errMess}</h4>
      </div>
    );
  }
  else if (item) {
    const getTypeIcon = (type) => {
      switch(type) {
        case 'dish':
          return <FaUtensils className="overlay-icon" />;
        case 'promotion':
          return <FaStar className="overlay-icon" />;
        case 'leader':
          return <FaUserTie className="overlay-icon" />;
        default:
          return <FaUtensils className="overlay-icon" />;
      }
    };

    return (
      <Card className="elegant-card home-card">
        {item.label && <Badge className="label-badge">{item.label}</Badge>}
        <div className="card-image-container">
          <CardImg src={item.image} alt={item.name} className="card-image" />
          <div className="card-overlay">
            <div className="overlay-content">
              {getTypeIcon(type)}
            </div>
          </div>
        </div>
        <CardBody className="card-body-sophisticated">
          <CardTitle className="card-title-sophisticated">{item.name}</CardTitle>
          {item.designation && <CardSubtitle className="card-subtitle-sophisticated">{item.designation}</CardSubtitle>}
          <CardText className="card-description-sophisticated">{item.description}</CardText>
          
          {item.price && (
            <div className="price-badge-sophisticated">
              <span className="price-currency">$</span>
              <span className="price-amount">{item.price}</span>
            </div>
          )}
          
          {item.comments && (
            <div className="rating-stars-sophisticated">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="star-container">
                  <FaRegStar className="star-sophisticated" />
                </span>
              ))}
              <span className="review-count-sophisticated">({item.comments.length} reviews)</span>
            </div>
          )}
          

          
          {type === 'leader' && (
            <div className="badge-container-sophisticated">
              <Badge color="info" className="role-badge-sophisticated">{item.abbr}</Badge>
              {item.featured && <Badge color="success" className="featured-badge-sophisticated">Featured</Badge>}
            </div>
          )}
        </CardBody>
      </Card>
    );
  }
  else {
    return <div></div>;
  }
}

function Home(props) {
  return (
    <Container fluid className="home-container-sophisticated">
      {/* Hero Section */}
      <Row className="hero-section-sophisticated">
        <Col>
          <div className="hero-content-sophisticated">
            <div className="hero-badge">
              <FaStar className="hero-badge-icon" />
              <span className="hero-badge-text">Award-Winning Cuisine</span>
            </div>
            <h1 className="hero-title-sophisticated">Welcome to Culinary Excellence</h1>
            <p className="hero-subtitle-sophisticated">
              Experience the pinnacle of gastronomic artistry with our award-winning chefs and carefully curated menu 
              featuring the finest ingredients and innovative techniques that redefine fine dining.
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">15+</span>
                <span className="stat-label">Years of Excellence</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">50+</span>
                <span className="stat-label">Signature Dishes</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">1000+</span>
                <span className="stat-label">Happy Guests</span>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      {/* Featured Content */}
      <Container>
        <Row className="featured-section">
          <Col>
            <div className="section-header">
              <h2 className="section-title">Our Signature Offerings</h2>
              <p className="section-subtitle">
                Discover the artistry behind our most celebrated dishes, exclusive promotions, and the culinary masters who bring them to life.
              </p>
            </div>
          </Col>
        </Row>
        
        <Row className="featured-content-sophisticated">
          <Col lg={4} md={6} className="mb-4">
            <RenderCard 
              item={props.dish} 
              isLoading={props.dishesLoading} 
              errMess={props.dishesErrMess} 
              type="dish" 
            />
          </Col>
          <Col lg={4} md={6} className="mb-4">
            <RenderCard 
              item={props.promotion} 
              isLoading={props.promosLoading} 
              errMess={props.promosErrMess} 
              type="promotion" 
            />
          </Col>
          <Col lg={4} md={6} className="mb-4">
            <RenderCard 
              item={props.leader} 
              isLoading={props.leadersLoading} 
              errMess={props.leadersErrMess} 
              type="leader" 
            />
          </Col>
        </Row>

        {/* Experience Section */}
        <Row className="experience-section">
          <Col lg={6} className="experience-content">
            <h2 className="experience-title">The L'Étoile Experience</h2>
            <p className="experience-description">
              From the moment you step through our doors, you're transported to a world where every detail matters. 
              Our commitment to excellence extends beyond the plate to create an unforgettable dining journey.
            </p>
            <div className="experience-features">
              <div className="feature-item">
                <FaWineGlass className="feature-icon" />
                <div className="feature-content">
                  <h4>Curated Wine Selection</h4>
                  <p>Expertly paired wines from renowned vineyards worldwide</p>
                </div>
              </div>
              <div className="feature-item">
                <FaPalette className="feature-icon" />
                <div className="feature-content">
                  <h4>Artistic Presentation</h4>
                  <p>Every dish is a masterpiece of visual and culinary artistry</p>
                </div>
              </div>
              <div className="feature-item">
                <FaStar className="feature-icon" />
                <div className="feature-content">
                  <h4>Impeccable Service</h4>
                  <p>Attentive, knowledgeable staff dedicated to your satisfaction</p>
                </div>
              </div>
            </div>
          </Col>
          <Col lg={6} className="experience-visual">
            <div className="experience-image-container">
              <img 
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop" 
                alt="Fine Dining Experience" 
                className="experience-image"
              />
              <div className="experience-overlay">
                <div className="overlay-text">
                  <span className="overlay-quote">"Culinary artistry at its finest"</span>
                  <span className="overlay-author">- Food & Wine Magazine</span>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        {/* Call to Action Section */}
        <Row className="cta-section-sophisticated">
          <Col>
            <div className="cta-content-sophisticated">
              <div className="cta-header">
                <h2 className="cta-title">Ready to Experience Fine Dining?</h2>
                <p className="cta-subtitle">
                  Join us for an unforgettable culinary journey. Book your table today and discover 
                  why we're the city's most celebrated restaurant.
                </p>
              </div>
                              <div className="cta-buttons-sophisticated">
                    <Button color="warning" size="lg" className="cta-button-primary">
                        <FaPhone className="button-icon" />
                        <span className="button-text">Call to Reserve</span>
                    </Button>
                </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Home;
