import { t as _t } from "marko/src/html";
import { r as _marko_renderer, c as _marko_defineComponent } from "marko/src/components/helpers";
import _marko_component from "./template.component.js";

const _marko_template = _t(__filename),
      _marko_componentType = "/babel-preset-marko$1.0.0/test/fixtures-html/custom-tag-separate-assets/template.marko";

_marko_template._ = _marko_renderer(function (input, out, __component, component, state) {
  out.w("<div></div>")
}, {
  ___type: _marko_componentType
})
_marko_template.Component = _marko_defineComponent(_marko_component, _marko_template._)
_marko_template.meta = {
  id: "/babel-preset-marko$1.0.0/test/fixtures-html/custom-tag-separate-assets/template.marko",
  component: "./template.component.js",
  deps: ["./template.style.css", "./template.browser.json"]
}
export default _marko_template;