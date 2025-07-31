import * as ActionTypes from './ActionTypes';

export const Dishes = (state = { isLoading: true,
    errMess: null,
    dishes:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_DISHES:
            return {...state, isLoading: false, errMess: null, dishes: action.payload};

        case ActionTypes.DISHES_LOADING:
            return {...state, isLoading: true, errMess: null, dishes: []}

        case ActionTypes.DISHES_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        case ActionTypes.ADD_COMMENT:
            const comment = action.payload;
            const dishId = comment.dishId;
            const dishes = state.dishes.map(dish => {
                if (dish._id === dishId) {
                    // Add the new comment to the dish's comments array
                    const updatedComments = [...(dish.comments || []), comment];
                    return { ...dish, comments: updatedComments };
                }
                return dish;
            });
            return { ...state, dishes: dishes };

        default:
            return state;
    }
};