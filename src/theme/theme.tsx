import { extendTheme } from "@chakra-ui/react";
import { CardComponent } from "./additions/card/card.js";
import { buttonStyles } from "./components/button.js";
import { badgeStyles } from "./components/badge.js";
import { inputStyles } from "./components/input.js";
import { progressStyles } from "./components/progress.js";
import { sliderStyles } from "./components/slider.js";
import { textareaStyles } from "./components/textarea.js";
import { switchStyles } from "./components/switch.js";
import { linkStyles } from "./components/link.js";
import { breakpoints } from "./foundations/breakpoints.js";
import { globalStyles } from "./styles.js";
export default extendTheme(
  { breakpoints }, // Breakpoints
  globalStyles,
  badgeStyles, // badge styles
  buttonStyles, // button styles
  linkStyles, // link styles
  progressStyles, // progress styles
  sliderStyles, // slider styles
  inputStyles, // input styles
  textareaStyles, // textarea styles
  switchStyles, // switch styles
  CardComponent // card component
);
