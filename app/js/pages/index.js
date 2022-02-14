import { MyCanvas } from "../components/canvas.js";
import { PlankTypes } from "../components/plank-types.js";
import { Preferences } from "../components/preferences.js";

const c = new MyCanvas();
c.render();

const pt = new PlankTypes();
pt.render();

new Preferences();
