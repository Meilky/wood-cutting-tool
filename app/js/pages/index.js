import { MyCanvas } from "../components/canvas.js";
import { PlankTypes } from "../components/plank-types.js";
import { Preferences } from "../components/preferences.js";

const c = new MyCanvas();
c.start();

const pt = new PlankTypes();
pt.start();

const rf = new Preferences();
rf.start()
