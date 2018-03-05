/**
 * Created by Aus on 2018/2/28.
 */
// action types
const HOME_UPDATE_LIST = 'HOME_UPDATE_LIST';

export const actionsTypes = {
    HOME_UPDATE_LIST
};

// actions
const updateHomeList = (list) => ({
    type: HOME_UPDATE_LIST,
    payload: list
});

export const actions = {
    updateHomeList
};
