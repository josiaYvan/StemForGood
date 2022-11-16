import { atom } from "recoil";

export const UserState = atom({
  key: "state.users",
  default: null,
});

export const PopupState = atom({
  key: "state.popup",
  default: null,
});
