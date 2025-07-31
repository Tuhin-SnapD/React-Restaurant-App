import React, { useState } from "react";
import { Card, CardImg, CardTitle, Breadcrumb, BreadcrumbItem, CardBody, CardText, Container, Row, Col, Badge, Button, Modal, ModalBody, ModalHeader, Label } from "reactstrap";
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Loading } from './LoadingComponent';
import { 
    FaEdit, 
    FaUtensils, 
    FaStar, 
    FaRegStar, 
    FaPaperPlane, 
    FaArrowLeft,
    FaComments,
    FaUser
} from 'react-icons/fa';

const CommentForm = ({ dishId, postComment }) => {
    const [isCommentFormModalOpen, setIsCommentFormModalOpen] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const toggleCommentFormModal = () => {
        setIsCommentFormModalOpen(!isCommentFormModalOpen);
    };

    const onSubmit = (values) => {
        console.log("Current State is: " + JSON.stringify(values));
        postComment(dishId, values.rating, values.author, values.comment);
        reset();
        toggleCommentFormModal();
        // Show success message
        alert('Thank you for your review! Your comment has been submitted.');
    };

    return (
        <React.Fragment>
            <Button 
                outline 
                onClick={toggleCommentFormModal} 
                className="comment-button-sophisticated"
            >
                <FaEdit className="button-icon" />
                <span className="button-text">Submit Review</span>
            </Button>
            <Modal isOpen={isCommentFormModalOpen} toggle={toggleCommentFormModal} className="modal-sophisticated">
                <ModalHeader toggle={toggleCommentFormModal} className="modal-header-sophisticated">
                    <FaEdit className="modal-icon" />
                    Share Your Experience
                </ModalHeader>
                <ModalBody className="modal-body-sophisticated">
                    <form onSubmit={handleSubmit(onSubmit)} className="comment-form-sophisticated">
                        <div className="form-group-sophisticated">
                            <Label htmlFor="rating" className="form-label-sophisticated">Rating *</Label>
                            <select
                                {...register("rating", { required: "Please select a rating" })}
                                className="form-select-sophisticated"
                                name="rating"
                                id="rating"
                            >
                                <option value="">Please Select</option>
                                <option value="1">1 - Poor</option>
                                <option value="2">2 - Fair</option>
                                <option value="3">3 - Good</option>
                                <option value="4">4 - Very Good</option>
                                <option value="5">5 - Excellent</option>
                            </select>
                            {errors.rating && <span className="error-message-sophisticated">{errors.rating.message}</span>}
                        </div>
                        
                        <div className="form-group-sophisticated">
                            <Label htmlFor="author" className="form-label-sophisticated">
                                <FaUser className="form-icon" />
                                Your Name *
                            </Label>
                            <input
                                {...register("author", { 
                                    required: "Name is required", 
                                    minLength: { value: 3, message: "Must be greater than 2 characters" },
                                    maxLength: { value: 15, message: "Must be 15 characters or less" }
                                })}
                                id="author"
                                name="author"
                                placeholder="Enter your name"
                                className="form-input-sophisticated"
                            />
                            {errors.author && <span className="error-message-sophisticated">{errors.author.message}</span>}
                        </div>
                        
                        <div className="form-group-sophisticated">
                            <Label htmlFor="comment" className="form-label-sophisticated">
                                <FaComments className="form-icon" />
                                Your Review *
                            </Label>
                            <textarea
                                {...register("comment", { required: "Review is required" })}
                                id="comment"
                                name="comment"
                                rows="6"
                                placeholder="Share your thoughts about this dish..."
                                className="form-textarea-sophisticated"
                            />
                            {errors.comment && <span className="error-message-sophisticated">{errors.comment.message}</span>}
                        </div>
                        
                        <Button 
                            type="submit" 
                            color="warning" 
                            className="submit-button-sophisticated"
                        >
                            <FaPaperPlane className="button-icon" />
                            <span className="button-text">Submit Review</span>
                        </Button>
                    </form>
                </ModalBody>
            </Modal>
        </React.Fragment>
    );
};

function RenderDish({ dish }) {
    console.log("RenderDish called with dish:", dish);
    
    if (dish != null) {
        try {
            return (
                <Col lg={6} className="dish-detail-col">
                    <Card className="dish-detail-card-sophisticated">
                        <div className="dish-image-container-sophisticated">
                            <CardImg src={dish.image} alt={dish.name} className="dish-image-sophisticated" />
                            {dish.label && <Badge className="label-badge-sophisticated">{dish.label}</Badge>}
                            {dish.featured && <Badge className="featured-badge-sophisticated">Featured</Badge>}
                            <div className="dish-overlay-sophisticated">
                                <div className="overlay-content-sophisticated">
                                    <FaUtensils className="overlay-icon-sophisticated" />
                                </div>
                            </div>
                        </div>
                        <CardBody className="dish-body-sophisticated">
                            <CardTitle className="dish-title-sophisticated">{dish.name}</CardTitle>
                            <div className="dish-meta-sophisticated">
                                <span className="dish-category-sophisticated">
                                    <FaUtensils className="category-icon" />
                                    {dish.category}
                                </span>
                                <div className="price-badge-sophisticated">
                                    <span className="price-currency-sophisticated">$</span>
                                    <span className="price-amount-sophisticated">{dish.price}</span>
                                </div>
                            </div>
                            <CardText className="dish-description-sophisticated">{dish.description}</CardText>
                            
                            {/* Average Rating */}
                            {dish.comments && dish.comments.length > 0 && (
                                <div className="dish-rating-sophisticated">
                                    <div className="rating-stars-sophisticated">
                                        {[...Array(5)].map((_, i) => {
                                            const avgRating = dish.comments.reduce((sum, comment) => sum + comment.rating, 0) / dish.comments.length;
                                            return (
                                                <span key={i} className="star-container">
                                                    {i < Math.floor(avgRating) ? 
                                                        <FaStar className="star-filled-sophisticated" /> : 
                                                        <FaRegStar className="star-empty-sophisticated" />
                                                    }
                                                </span>
                                            );
                                        })}
                                    </div>
                                    <span className="rating-text-sophisticated">
                                        {(dish.comments.reduce((sum, comment) => sum + comment.rating, 0) / dish.comments.length).toFixed(1)} 
                                        ({dish.comments.length} reviews)
                                    </span>
                                </div>
                            )}
                        </CardBody>
                    </Card>
                </Col>
            );
        } catch (error) {
            console.error("Error in RenderDish:", error);
            return (
                <Col lg={6}>
                    <div className="error-container-sophisticated">
                        <h2>Error Rendering Dish</h2>
                        <h4>There was an error displaying the dish information.</h4>
                        <p>Error: {error.message}</p>
                    </div>
                </Col>
            );
        }
    }
    else {
        return (
            <Col lg={6}>
                <div className="error-container-sophisticated">
                    <h2>Dish Not Found</h2>
                    <h4>The requested dish could not be found.</h4>
                </div>
            </Col>
        );
    }
}

function RenderComments({ dish, comments, postComment, dishId }) {
    console.log("RenderComments called with:", { dish, comments, dishId });
    
    try {
        // Ensure comments is an array
        const commentsArray = Array.isArray(comments) ? comments : [];
        
        if (!commentsArray || commentsArray.length === 0) {
            return (
                <Col lg={6} className="comments-detail-col">
                    <div className="comments-section-sophisticated">
                        <div className="comments-header-sophisticated">
                            <h4 className="comments-title-sophisticated">
                                <FaComments className="comments-icon" />
                                Guest Reviews
                            </h4>
                            <p className="comments-subtitle-sophisticated">Be the first to review this dish!</p>
                        </div>
                        <div className="no-reviews-sophisticated">
                            <div className="no-reviews-content">
                                <FaStar className="no-reviews-icon" />
                                <p>No reviews yet</p>
                                <p>Share your experience and help others discover this amazing dish!</p>
                            </div>
                        </div>
                        <CommentForm
                            dish={dish}
                            comments={commentsArray}
                            dishId={dishId}
                            postComment={postComment}
                        />
                    </div>
                </Col>
            );
        }
        
        return (
            <Col lg={6} className="comments-detail-col">
                <div className="comments-section-sophisticated">
                    <div className="comments-header-sophisticated">
                        <h4 className="comments-title-sophisticated">
                            <FaComments className="comments-icon" />
                            Guest Reviews
                        </h4>
                        <p className="comments-subtitle-sophisticated">
                            What our guests are saying about this dish
                        </p>
                    </div>
                    <div className="comments-list-sophisticated">
                        {commentsArray.map((comment) => (
                            <div className="comment-item-sophisticated" key={comment._id || comment.id}>
                                <div className="comment-header-sophisticated">
                                    <span className="comment-author-sophisticated">
                                        <FaUser className="author-icon" />
                                        <strong>{comment.author}</strong>
                                    </span>
                                    <div className="comment-rating-sophisticated">
                                        {[...Array(5)].map((_, i) => (
                                            <span key={i} className="star-container">
                                                {i < comment.rating ? 
                                                    <FaStar className="star-filled-sophisticated" /> : 
                                                    <FaRegStar className="star-empty-sophisticated" />
                                                }
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <p className="comment-text-sophisticated">{comment.comment}</p>
                                <p className="comment-date-sophisticated">
                                    {(() => {
                                        try {
                                            const dateValue = comment.date || comment.createdAt || comment.updatedAt;
                                            if (!dateValue) {
                                                return 'Date not available';
                                            }
                                            
                                            const date = new Date(dateValue);
                                            if (isNaN(date.getTime())) {
                                                console.error('Invalid date value:', dateValue);
                                                return 'Date not available';
                                            }
                                            
                                            return new Intl.DateTimeFormat('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: '2-digit'
                                            }).format(date);
                                        } catch (error) {
                                            console.error('Error formatting date:', error, 'Date value:', comment.date);
                                            return 'Date not available';
                                        }
                                    })()}
                                </p>
                            </div>
                        ))}
                    </div>
                    <CommentForm
                        dish={dish}
                        comments={commentsArray}
                        dishId={dishId}
                        postComment={postComment}
                    />
                </div>
            </Col>
        );
    } catch (error) {
        console.error("Error in RenderComments:", error);
        return (
            <Col lg={6}>
                <div className="error-container-sophisticated">
                    <h2>Error Loading Comments</h2>
                    <h4>There was an error loading the comments.</h4>
                    <p>Error: {error.message}</p>
                </div>
            </Col>
        );
    }
}

const DishDetail = (props) => {
    console.log("DishDetail component props:", props);
    
    if (props.isLoading) {
        return (
            <Container fluid className="dish-detail-container-sophisticated">
                <div className="loading-container-sophisticated">
                    <Loading />
                    <h4>Loading dish details...</h4>
                </div>
            </Container>
        );
    }
    else if (props.errMess) {
        return (
            <Container fluid className="dish-detail-container-sophisticated">
                <div className="error-container-sophisticated">
                    <h2>Error</h2>
                    <h4>{props.errMess}</h4>
                </div>
            </Container>
        );
    }
    else if (props.dish == null) {
        return (
            <Container fluid className="dish-detail-container-sophisticated">
                <div className="error-container-sophisticated">
                    <h2>Dish Not Found</h2>
                    <h4>The requested dish could not be found.</h4>
                    <p>Please check the URL or return to the menu.</p>
                    <Link to="/menu" className="btn btn-warning">
                        <FaArrowLeft className="button-icon" />
                        <span className="button-text">Back to Menu</span>
                    </Link>
                </div>
            </Container>
        );
    }
    else if (props.dish != null) {
        return (
            <Container fluid className="dish-detail-container-sophisticated">
                <Container>
                    {/* Breadcrumb */}
                    <Row className="mb-4">
                        <Col>
                            <Breadcrumb className="breadcrumb-sophisticated">
                                <BreadcrumbItem>
                                    <Link to="/menu" className="breadcrumb-link-sophisticated">Menu</Link>
                                </BreadcrumbItem>
                                <BreadcrumbItem active className="breadcrumb-active-sophisticated">
                                    {props.dish.name}
                                </BreadcrumbItem>
                            </Breadcrumb>
                        </Col>
                    </Row>

                    {/* Dish Details */}
                    <Row className="dish-detail-row-sophisticated">
                        <RenderDish dish={props.dish} />
                        <RenderComments 
                            dish={props.dish}
                            comments={props.comments}
                            postComment={props.postComment}
                            dishId={props.dish._id}
                        />
                    </Row>
                </Container>
            </Container>
        )
    }
    else {
        // Default case - should not happen but prevents blank screen
        console.log("DishDetail: Unexpected state - no conditions met");
        return (
            <Container fluid className="dish-detail-container-sophisticated">
                <div className="error-container-sophisticated">
                    <h2>Unexpected Error</h2>
                    <h4>Something went wrong while loading the dish details.</h4>
                    <p>Please try refreshing the page or return to the menu.</p>
                    <Link to="/menu" className="btn btn-warning">
                        <FaArrowLeft className="button-icon" />
                        <span className="button-text">Back to Menu</span>
                    </Link>
                </div>
            </Container>
        );
    }
}

export default DishDetail;