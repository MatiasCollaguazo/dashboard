import {
  isMuiElement
} from "./chunk-HG4T5LTG.js";

// node_modules/@mui/material/utils/isMuiElement.js
var isMuiElement_default = isMuiElement;

// node_modules/@mui/material/InputBase/utils.js
function hasValue(value) {
  return value != null && !(Array.isArray(value) && value.length === 0);
}
function isFilled(obj, SSR = false) {
  return obj && (hasValue(obj.value) && obj.value !== "" || SSR && hasValue(obj.defaultValue) && obj.defaultValue !== "");
}
function isAdornedStart(obj) {
  return obj.startAdornment;
}

export {
  isMuiElement_default,
  isFilled,
  isAdornedStart
};
//# sourceMappingURL=chunk-NT2J2HF6.js.map
