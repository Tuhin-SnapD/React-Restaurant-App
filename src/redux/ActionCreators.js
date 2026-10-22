import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const addComment = (comment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: comment
});

const getResponseError = (response) =>
  response.json()
    .catch(() => ({}))
    .then(body => {
      const error = new Error(body.error || `Request failed (${response.status})`);
      error.status = response.status;
      return error;
    });

export const postComment = (dishId, rating, author, comment) => (dispatch) => {
  const newComment = {
    dishId: dishId,
    rating: Number(rating),
    author: author,
    comment: comment
  };

  return fetch(baseUrl + 'dishes/' + dishId + '/comments', {
      method: 'POST',
      body: JSON.stringify(newComment),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    })
    .then(response => {
      if (response.ok) {
        return response;
      }
      return getResponseError(response).then(error => { throw error; });
    })
    .then(response => response.json())
    .then(createdComment => {
      dispatch(addComment(createdComment));
      return createdComment;
    });
};

export const fetchDishes = () => (dispatch) => {
  dispatch(dishesLoading(true));
  return fetch(baseUrl + 'dishes')
    .then(response => {
      if (response.ok) {
        return response;
      }
      else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
      var errmess = new Error(error.message);
      throw errmess;
    })
    .then(response => response.json())
    .then(dishes => dispatch(addDishes(dishes)))
    .catch(error => dispatch(dishesFailed(error.message)));
};

export const dishesLoading = () => ({
  type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
  type: ActionTypes.DISHES_FAILED,
  payload: errmess
});

export const addDishes = (dishes) => ({
  type: ActionTypes.ADD_DISHES,
  payload: dishes
});



export const fetchPromos = () => (dispatch) => {
  dispatch(promosLoading(true));
  return fetch(baseUrl + 'promotions')
    .then(response => {
      if (response.ok) {
        return response;
      }
      else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
      var errmess = new Error(error.message);
      throw errmess;
    })
    .then(response => response.json())
    .then(promos => dispatch(addPromos(promos)))
    .catch(error => dispatch(promosFailed(error.message)));
};

export const promosLoading = () => ({
  type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
  type: ActionTypes.PROMOS_FAILED,
  payload: errmess
});

export const addPromos = (promos) => ({
  type: ActionTypes.ADD_PROMOS,
  payload: promos
});

export const fetchLeaders = () => (dispatch) => {
  dispatch(leadersLoading(true));
  return fetch(baseUrl + 'leaders')
    .then(response => {
      if (response.ok) {
        return response;
      }
      else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
      var errmess = new Error(error.message);
      throw errmess;
    })
    .then(response => response.json())
    .then(promos => dispatch(addLeaders(promos)))
    .catch(error => dispatch(leadersFailed(error.message)));
};

export const leadersLoading = () => ({
  type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = (errmess) => ({
  type: ActionTypes.LEADERS_FAILED,
  payload: errmess
});

export const addLeaders = (leaders) => ({
  type: ActionTypes.ADD_LEADERS,
  payload: leaders
});

export const postFeedback = (firstname, lastname, telnum, email, agree, contactType, message, feedbackType = 'general') => (dispatch) => {
  const newFeedback = {
    firstname: firstname,
    lastname: lastname,
    telnum: telnum,
    email: email,
    agree: agree,
    contactType: contactType,
    feedbackType: feedbackType,
    message: message
  };

  return fetch(baseUrl + 'feedback', {
      method: 'POST',
      body: JSON.stringify(newFeedback),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    })
    .then(response => {
      if (response.ok) {
        return response;
      }
      return getResponseError(response).then(error => { throw error; });
    })
    .then(response => response.json());
};
