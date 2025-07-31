import React from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, Row, Col, Container, Badge } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { FaStar } from 'react-icons/fa';

function RenderLeader({ leader }) {
  return (
    <div className="leader-card-sophisticated">
      <div className="leader-image-container">
        <img src={leader.image} alt={leader.name} className="leader-image" />
        <div className="leader-overlay">
          <div className="leader-badge">
            <span className="leader-role">{leader.abbr}</span>
          </div>
        </div>
      </div>
      <div className="leader-content">
        <h4 className="leader-name">{leader.name}</h4>
        <p className="leader-designation">{leader.designation}</p>
        <p className="leader-description">{leader.description}</p>
        {leader.featured && (
          <Badge className="featured-badge-sophisticated">Featured Leader</Badge>
        )}
      </div>
    </div>
  );
}

function About(props) {
  const leaders = (() => {
    if (props.leaders.isLoading) {
      return (
        <div className="loading-container-sophisticated">
          <Loading />
          <h4>Loading our culinary team...</h4>
        </div>
      );
    }
    else if (props.leaders.errMess) {
      return (
        <div className="error-container-sophisticated">
          <h2>Error</h2>
          <h4>{props.leaders.errMess}</h4>
        </div>
      );
    }
    else {
      return (
        <div className="leaders-grid-sophisticated">
          {props.leaders.leaders.map((leader) => (
            <RenderLeader leader={leader} key={leader.id} />
          ))}
        </div>
      );
    }
  })();

  return (
    <Container fluid className="about-container-sophisticated">
      {/* Hero Section */}
      <Row className="about-hero-sophisticated">
        <Col>
          <div className="hero-content-sophisticated">
            <div className="hero-badge-sophisticated">
              <FaStar className="hero-badge-icon-sophisticated" />
              <span className="hero-badge-text-sophisticated">Our Story</span>
            </div>
            <h1 className="hero-title-sophisticated">The L'Étoile Legacy</h1>
            <p className="hero-subtitle-sophisticated">
              Discover the passion, dedication, and culinary excellence that has made L'Étoile 
              one of the most celebrated dining destinations for over a decade.
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
              <BreadcrumbItem active className="breadcrumb-active-sophisticated">About Us</BreadcrumbItem>
            </Breadcrumb>
          </Col>
        </Row>

        {/* Heritage Section */}
        <Row className="heritage-section-sophisticated">
          <Col lg={7} className="heritage-content">
            <h2 className="section-title-sophisticated">Our Heritage</h2>
            <p className="heritage-description">
              Founded in 2010, L'Étoile has established itself as a beacon of culinary excellence in the heart of the city. 
              What began as a modest bistro has evolved into one of the most prestigious dining destinations, earning three 
              Michelin stars and international acclaim. Our journey reflects a commitment to preserving traditional techniques 
              while embracing contemporary innovation.
            </p>
            <p className="heritage-description">
              The restaurant's foundation was laid by our visionary founder, who transformed a simple kitchen into a laboratory 
              of gastronomic discovery. From our humble beginnings, we have maintained an unwavering dedication to sourcing the 
              finest ingredients, perfecting classic techniques, and creating memorable dining experiences that transcend the ordinary.
            </p>
          </Col>
          <Col lg={5} className="heritage-stats">
            <Card className="stats-card-sophisticated">
              <CardHeader className="stats-header-sophisticated">
                <h3 className="stats-title">Excellence in Numbers</h3>
              </CardHeader>
              <CardBody className="stats-body-sophisticated">
                <div className="stats-grid">
                  <div className="stat-item-sophisticated">
                    <span className="stat-label">Established</span>
                    <span className="stat-value">March 2010</span>
                  </div>
                  <div className="stat-item-sophisticated">
                    <span className="stat-label">Michelin Stars</span>
                    <span className="stat-value">3 Stars</span>
                  </div>
                  <div className="stat-item-sophisticated">
                    <span className="stat-label">Annual Revenue</span>
                    <span className="stat-value">$8.5M</span>
                  </div>
                  <div className="stat-item-sophisticated">
                    <span className="stat-label">Team Members</span>
                    <span className="stat-value">85</span>
                  </div>
                  <div className="stat-item-sophisticated">
                    <span className="stat-label">Wine Selections</span>
                    <span className="stat-value">1,200+</span>
                  </div>
                  <div className="stat-item-sophisticated">
                    <span className="stat-label">Awards</span>
                    <span className="stat-value">15+</span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* Philosophy Section */}
        <Row className="philosophy-section-sophisticated">
          <Col>
            <Card className="philosophy-card-sophisticated">
              <CardBody className="philosophy-body-sophisticated">
                <div className="philosophy-content">
                  <span className="philosophy-quote">"</span>
                  <blockquote className="philosophy-text">
                    Cuisine is not just about feeding the body, but nourishing the soul. Every dish tells a story, 
                    every ingredient has a purpose, and every meal should be a journey of discovery.
                  </blockquote>
                  <footer className="philosophy-author">
                    <cite>Chef Alessandro Rossi</cite>
                    <span className="philosophy-source">L'Étoile Culinary Philosophy, 2024</span>
                  </footer>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* Leadership Section */}
        <Row className="leadership-section-sophisticated">
          <Col>
            <div className="section-header-sophisticated">
              <h2 className="section-title-sophisticated">Culinary Leadership</h2>
              <p className="section-subtitle-sophisticated">
                Meet the passionate culinary artists who bring our vision to life, creating extraordinary 
                dining experiences that leave lasting impressions.
              </p>
            </div>
            {leaders}
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default About;
