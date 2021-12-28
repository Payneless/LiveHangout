//action types
const GET_HANGOUTS = "hangouts/GET_HANGOUTS";
const GET_HANGOUT = "hangouts/GET_HANGOUT";
const ADD_HANGOUT = "hangouts/ADD_HANGOUT";
const UPDATE_HANGOUT = "hangouts/UPDATE_HANGOUT";
const REMOVE_HANGOUT = "hangouts/REMOVE_HANGOUT";

//action creators
const get = (payload) => {
  return {
    type: GET_HANGOUTS,
    payload,
  };
};

const getOne = (payload) => {
  return {
    type: GET_HANGOUT,
    payload,
  };
};
const add = (payload) => {
  return {
    type: ADD_HANGOUT,
    payload,
  };
};

const update = (payload) => {
  return {
    type: UPDATE_HANGOUT,
    payload,
  };
};

const remove = (payload) => {
  return {
    type: REMOVE_HANGOUT,
    payload,
  };
};

export const getAllHangouts = () => async (dispatch) => {
  const response = await fetch("/api/hangouts/");

  if (response.ok) {
    const hangouts = await response.json();
    dispatch(get(hangouts));
  }
};

export const getOneHangout = (id) => async (dispatch) => {
  const response = await fetch(`/api/hangouts/${id}`);

  if (response.ok) {
    const hangout = await response.json();
    dispatch(getOne(hangout));
  }
};

export const addAHangout = (hangout) => async (dispatch) => {
  const response = await fetch("/api/hangouts/new", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(hangout),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(add(data));
    return data;
  }
};

export const editAHangout = (hangoutId, hangout) => async (dispatch) => {
  const response = await fetch(`/api/hangouts/${hangoutId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(hangout),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(update(data));
    return data;
  }
};

export const deleteHangout = (hangoutId) => async (dispatch) => {
  const response = await fetch(`/api/ahngouts/${hangoutId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(remove(hangoutId));
  }
};

const initialState = {};

export default function hangoutsReducer(state = initialState, action) {
  let newState = {};
  switch (action.type) {
    case GET_HANGOUTS:
      let hangouts = Object.values(action.payload.hangouts);
      hangouts.forEach((hangout) => {
        newState[hangout.id] = hangout;
      });
      return newState;
    case ADD_HANGOUT:
      newState = { ...state, [action.payload.id]: action.payload };
      return newState;
    case UPDATE_HANGOUT:
      return { ...state, [action.payload.id]: action.payload };
    case GET_HANGOUT:
      let one = action.payload;
      newState = { [one.id]: one };
      return newState;
    default:
      return state;
  }
}
