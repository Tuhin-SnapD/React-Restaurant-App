import React, { useState } from 'react';
import {
    Card, CardImg,
    CardTitle, Breadcrumb, BreadcrumbItem, CardBody, CardText, Badge,
    Row, Col, Container, Button, CardSubtitle
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { 
    FaEye, 
    FaUtensils, 
    FaDrumstickBite, 
    FaBirthdayCake, 
    FaSearch, 
    FaStar,
    FaRegStar
} from 'react-icons/fa';

function RenderMenuItem({ dish, onClick }) {
    const averageRating = dish.comments && dish.comments.length > 0 
        ? (dish.comments.reduce((sum, comment) => sum + comment.rating, 0) / dish.comments.length).toFixed(1)
        : 0;

    const getCategoryIcon = (category) => {
        switch(category) {
            case 'appetizer':
                return <FaUtensils className="category-icon" />;
            case 'mains':
                return <FaDrumstickBite className="category-icon" />;
            case 'dessert':
                return <FaBirthdayCake className="category-icon" />;
            default:
                return <FaUtensils className="category-icon" />;
        }
    };

    return (
        <Card className="menu-card-sophisticated elegant-card">
            <Link to={`/menu/${dish._id}`} className="menu-link-sophisticated">
                <div className="image-container-sophisticated">
                    <CardImg src={dish.image} alt={dish.name} className="menu-image-sophisticated" />
                    {dish.label && <Badge className="label-badge-sophisticated">{dish.label}</Badge>}
                    {dish.featured && <Badge className="featured-badge-sophisticated">Featured</Badge>}
                    <div className="menu-overlay-sophisticated">
                        <div className="overlay-content-sophisticated">
                            <FaEye className="overlay-icon-sophisticated" />
                            <span className="overlay-text-sophisticated">View Details</span>
                        </div>
                    </div>
                </div>
            </Link>
            <CardBody className="menu-body-sophisticated">
                <CardSubtitle className="menu-category-sophisticated">
                    {getCategoryIcon(dish.category)}
                    <span className="category-text">{dish.category}</span>
                </CardSubtitle>
                <CardTitle className="menu-title-sophisticated">{dish.name}</CardTitle>
                <CardText className="menu-description-sophisticated">{dish.description}</CardText>
                <div className="menu-footer-sophisticated">
                    <div className="price-badge-sophisticated">
                        <span className="price-currency-sophisticated">$</span>
                        <span className="price-amount-sophisticated">{dish.price}</span>
                    </div>
                    <div className="rating-container-sophisticated">
                        <div className="rating-stars-sophisticated">
                            {[...Array(5)].map((_, i) => (
                                <span key={i} className="star-container">
                                    {i < Math.floor(averageRating) ? 
                                        <FaStar className="star-filled-sophisticated" /> : 
                                        <FaRegStar className="star-empty-sophisticated" />
                                    }
                                </span>
                            ))}
                        </div>
                        <span className="rating-text-sophisticated">
                            {averageRating} ({dish.comments?.length || 0} reviews)
                        </span>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}

const Menu = (props) => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    
    const categories = [
        { id: 'all', name: 'All Dishes', icon: <FaUtensils /> },
        { id: 'appetizer', name: 'Appetizers', icon: <FaUtensils /> },
        { id: 'mains', name: 'Main Courses', icon: <FaDrumstickBite /> },
        { id: 'dessert', name: 'Desserts', icon: <FaBirthdayCake /> }
    ];
    
    const filteredDishes = selectedCategory === 'all' 
        ? props.dishes.dishes 
        : props.dishes.dishes.filter(dish => dish.category === selectedCategory);

    const menu = filteredDishes.map((dish) => {
        return (
            <Col key={dish._id} lg={4} md={6} className="mb-4">
                <RenderMenuItem dish={dish} />
            </Col>
        );
    });

    if (props.dishes.isLoading) {
        return (
            <Container>
                <div className="loading-container-sophisticated">
                    <Loading />
                    <h4>Loading our delicious menu...</h4>
                </div>
            </Container>
        );
    }
    else if (props.dishes.errMess) {
        return (
            <Container>
                <div className="error-container-sophisticated">
                    <h2>Error</h2>
                    <h4>{props.dishes.errMess}</h4>
                </div>
            </Container>
        );
    }
    else {
        return (
            <Container fluid className="menu-container-sophisticated">
                {/* Hero Section */}
                <Row className="menu-hero-sophisticated">
                    <Col>
                        <div className="hero-content-sophisticated">
                            <div className="hero-badge-sophisticated">
                                <FaStar className="hero-badge-icon-sophisticated" />
                                <span className="hero-badge-text-sophisticated">Culinary Excellence</span>
                            </div>
                            <h1 className="hero-title-sophisticated">Our Culinary Creations</h1>
                            <p className="hero-subtitle-sophisticated">
                                Discover our carefully curated selection of dishes, each crafted with the finest 
                                ingredients and executed with precision by our award-winning culinary team.
                            </p>
                            <div className="hero-stats-sophisticated">
                                <div className="stat-item-sophisticated">
                                    <span className="stat-number-sophisticated">{props.dishes.dishes.length}</span>
                                    <span className="stat-label-sophisticated">Signature Dishes</span>
                                </div>
                                <div className="stat-item-sophisticated">
                                    <span className="stat-number-sophisticated">4.9</span>
                                    <span className="stat-label-sophisticated">Average Rating</span>
                                </div>
                                <div className="stat-item-sophisticated">
                                    <span className="stat-number-sophisticated">3</span>
                                    <span className="stat-label-sophisticated">Categories</span>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>

                <Container>
                    {/* Breadcrumb */}
                    <Row className="mb-4">
                        <Col>
                            <Breadcrumb className="breadcrumb-sophisticated">
                                <BreadcrumbItem><Link to="/home" className="breadcrumb-link-sophisticated">Home</Link></BreadcrumbItem>
                                <BreadcrumbItem active className="breadcrumb-active-sophisticated">Menu</BreadcrumbItem>
                            </Breadcrumb>
                        </Col>
                    </Row>

                    {/* Category Filter */}
                    <Row className="mb-4">
                        <Col>
                            <div className="filter-section-sophisticated">
                                <h4 className="filter-title-sophisticated">
                                    <FaSearch className="filter-icon" />
                                    Filter by Category
                                </h4>
                                <div className="category-buttons-sophisticated">
                                    {categories.map(category => (
                                        <Button
                                            key={category.id}
                                            color={selectedCategory === category.id ? 'warning' : 'outline-secondary'}
                                            onClick={() => setSelectedCategory(category.id)}
                                            className={`category-button-sophisticated ${selectedCategory === category.id ? 'active' : ''}`}
                                        >
                                            <span className="category-button-icon">{category.icon}</span>
                                            <span className="category-button-text">{category.name}</span>
                                        </Button>
                                    ))}
                                </div>
                                <div className="results-count-sophisticated">
                                    Showing {filteredDishes.length} of {props.dishes.dishes.length} dishes
                                </div>
                            </div>
                        </Col>
                    </Row>

                    {/* Menu Grid */}
                    <Row className="menu-grid-sophisticated">
                        {menu}
                    </Row>

                    {/* Call to Action */}
                    <Row className="menu-cta-sophisticated">
                        <Col>
                            <div className="cta-content-sophisticated">
                                <h3 className="cta-title-sophisticated">Need help choosing?</h3>
                                <p className="cta-subtitle-sophisticated">
                                    Our expert staff is here to guide you through our menu and create the perfect dining experience.
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Container>
        );
    }
}

export default Menu;