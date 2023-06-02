import {atom} from "recoil";

export const balanceState = atom({
    key: 'balanceState', // unique ID (with respect to other atoms/selectors)
    default: 0, // default value (aka initial value)
});