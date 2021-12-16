//action types
const GET_HANGOUTS = "hangouts/GET_HANGOUTS";

//action creators
const get = (payload) => {
  return {
    type: GET_HANGOUTS,
    payload,
  };
};

export const getAllHangouts = () => async (dispatch) => {
  console.log("hello");
  const response = await fetch("/api/hangouts");

  if (response.ok) {
    const hangouts = await response.json();
    console.log("hangouts", hangouts);
    dispatch(get(hangouts));
  }
};

const initialState = {};

export default function hangoutsReducer(state = initialState, action) {
  let newState = {};
  switch (action.type) {
    case GET_HANGOUTS:
      let hangouts = Object.values(action.payload.hangouts);
      console.log("--->", hangouts);
      hangouts.forEach((hangout) => {
        newState[hangout.id] = hangout;
      });
      return newState;
    default:
      return state;
  }
}
