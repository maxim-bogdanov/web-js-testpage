import {
  registerPlugins,
  Plugin
} from "../framework/jquery/plugins/plugins";

class Helpers extends Plugin {
  // eslint-disable-next-line no-useless-constructor
  constructor($element) {
    super($element);
  }
}

registerPlugins({
  name: "helpers",
  Constructor: Helpers,
  selector: ".helpers"
});
