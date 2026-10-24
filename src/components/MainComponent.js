import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import DishDetail from './DishdetailComponent'
import Reservations from './ReservationsComponent';
import { postComment, postFeedback, fetchDishes, fetchPromos, fetchLeaders } from '../redux/ActionCreators';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  dishes: state.dishes,
  promotions: state.promotions,
  leaders: state.leaders
});

const mapDispatchToProps = dispatch => ({
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  postFeedback: (firstname, lastname, telnum, email, agree, contactType, message, feedbackType) => dispatch(postFeedback(firstname, lastname, telnum, email, agree, contactType, message, feedbackType)),
  fetchDishes: () => {dispatch(fetchDishes())},
  fetchPromos: () => {dispatch(fetchPromos())},
  fetchLeaders: () => {dispatch(fetchLeaders())}
});

class Main extends Component {

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

  render() {
    const HomePage = () => {
      // Add safety checks for data
      const featuredDish = this.props.dishes?.dishes?.filter((dish) => dish.featured === true)[0] || null;
      const featuredPromo = this.props.promotions?.promotions?.filter((promo) => promo.featured === true)[0] || null;
      const featuredLeader = this.props.leaders?.leaders?.filter((leader) => leader.featured === true)[0] || null;

      return (
        <Home dish={featuredDish}
          dishes={this.props.dishes?.dishes || []}
          dishesLoading={this.props.dishes?.isLoading || false}
          dishesErrMess={this.props.dishes?.errMess || null}
          promotion={featuredPromo}
          promosLoading={this.props.promotions?.isLoading || false}
          promosErrMess={this.props.promotions?.errMess || null}
          leader={featuredLeader}
          leadersLoading={this.props.leaders?.isLoading || false}
          leadersErrMess={this.props.leaders?.errMess || null}
          />
      );
    }

    const DishWithId = ( {match} ) => {
      const dish = this.props.dishes?.dishes?.filter((dish) => dish._id === match.params.dishId)[0] || null;
      const comments = dish?.comments || [];

      return (
        <DishDetail dish={dish}
                    isLoading={this.props.dishes?.isLoading || false}
                    errMess={this.props.dishes?.errMess || null}
                    comments={comments}
                    commentsErrMess={null}
                    postComment={this.props.postComment} />
      );
    }

    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route exact path="/menu" component={ () => <Menu dishes={this.props.dishes || { dishes: [], isLoading: false, errMess: null }} /> } />
          <Route path="/menu/:dishId" component={ DishWithId } />
          <Route exact path="/contactus" component={ () => <Contact postFeedback={this.props.postFeedback} />} />
          <Route exact path="/reservations" component={Reservations} />
          <Route exact path="/aboutus" component={ () => <About leaders={this.props.leaders || { leaders: [], isLoading: false, errMess: null }} /> } />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
