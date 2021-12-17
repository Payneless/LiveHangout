//action types
const GET_HANGOUTS = "hangouts/GET_HANGOUTS";
// const GET_HANGOUT = "hangouts/GET_HANGOUT";

//action creators
const get = (payload) => {
  return {
    type: GET_HANGOUTS,
    payload,
  };
};

// const getOne = (payload) => {
//   return {
//     type: GET_HANGOUT,
//     payload: [payload],
//   };
// };

export const getAllHangouts = () => async (dispatch) => {
  const response = await fetch("/api/hangouts/");

  if (response.ok) {
    const hangouts = await response.json();
    dispatch(get(hangouts));
  }
};

// export const getOneHangout = (id) => async (dispatch) => {
//   const response = await fetch(`/api/hangouts/${id}`);

//   if (response.ok) {
//     const hangout = await response.json();
//     dispatch(getOne(hangout));
//   }
// };

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
    // case GET_HANGOUT:
    //   let one = action.payload;
    //   console.log("reducah", one);
    //   newState = { ...state, [one.id]: one };
    //   return newState;
    default:
      return state;
  }
}
