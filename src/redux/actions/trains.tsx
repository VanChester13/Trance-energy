import { InitData } from "../../types/interfaces";

export const setDataInState = (arr: InitData) => ({
  type: "SET_DATA",
  payload: arr,
});

