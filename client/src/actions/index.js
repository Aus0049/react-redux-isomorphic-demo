/**
 * Created by Aus on 2018/2/28.
 */

const HOME_FETCH_LIST = 'HOME_FETCH_LIST';

export const actionsTypes = {
    HOME_FETCH_LIST
};

const homeFetchList = () => ({
    type: HOME_FETCH_LIST,
    payLoad: null,
});

export const actions = {
    homeFetchList
};
