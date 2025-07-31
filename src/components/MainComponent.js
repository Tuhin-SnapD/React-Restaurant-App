import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import DishDetail from './DishdetailComponent'
import { postComment, postFeedback, fetchDishes, fetchPromos, fetchLeaders } from '../redux/ActionCreators';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  console.log("mapStateToProps called with state:", state);
  return {
    dishes: state.dishes,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = dispatch => ({
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  postFeedback: (firstname, lastname, telnum, email, agree, contactType, message) => dispatch(postFeedback(firstname, lastname, telnum, email, agree, contactType, message)),
  fetchDishes: () => {dispatch(fetchDishes())},
  fetchPromos: () => {dispatch(fetchPromos())},
  fetchLeaders: () => {dispatch(fetchLeaders())}
});

class Main extends Component {

  componentDidMount() {
    console.log("Main component mounted, fetching data...");
    this.props.fetchDishes();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

  render() {
    console.log("Main component render called with props:", this.props);

    const HomePage = () => {
      // Add safety checks for data
      const featuredDish = this.props.dishes?.dishes?.filter((dish) => dish.featured === true)[0] || null;
      const featuredPromo = this.props.promotions?.promotions?.filter((promo) => promo.featured === true)[0] || null;
      const featuredLeader = this.props.leaders?.leaders?.filter((leader) => leader.featured === true)[0] || null;

      console.log("HomePage - featured items:", { featuredDish, featuredPromo, featuredLeader });

      return (
        <Home dish={featuredDish}
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
      console.log("DishWithId called with match:", match);
      console.log("Available dishes:", this.props.dishes?.dishes);
      
      const dish = this.props.dishes?.dishes?.filter((dish) => dish._id === match.params.dishId)[0] || null;
      const comments = dish?.comments || [];

      console.log("Found dish:", dish);
      console.log("Comments:", comments);
      console.log("Comments type:", typeof comments);
      console.log("Comments is array:", Array.isArray(comments));

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
          <Route exact path="/aboutus" component={ () => <About leaders={this.props.leaders || { leaders: [], isLoading: false, errMess: null }} /> } />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
