import _marko_style_merge from "marko/src/runtime/vdom/helper-styleAttr";
import _customTag from "./components/custom-tag.marko";
import { t as _t, d as _marko_dynamicTag } from "marko/src/runtime/vdom/helpers";

const _customTag_tag = _t(_customTag);

import { r as _marko_renderer, c as _marko_defineComponent } from "marko/src/components/helpers";
import { t as _t2 } from "marko/src/runtime/vdom";

const _marko_componentType = "Q4DAGn8u",
      _marko_template = _t2(__filename),
      _marko_component = null;

_marko_template._ = _marko_renderer(function (input, out, _component, component, state) {
  out.be("div", {
    "style": _marko_style_merge({
      color: "green"
    })
  }, "0", component, 0, 4);
  out.ee();
  out.be("div", {
    "style": "color: green"
  }, "1", component, 0, 4);
  out.ee();

  _customTag_tag({
    "style": {
      color: "green"
    }
  }, out, "2");

  _marko_dynamicTag(input.test, {
    "style": {
      color: "green"
    },
    "test": {
      "style": {
        color: "green"
      },
      "renderBody": out => {
        out.t("Hello");
      }
    }
  }, out, _component, "4");
}, {
  ___type: _marko_componentType,
  ___implicit: true
}, _marko_component);
_marko_template.Component = _marko_defineComponent(_marko_component, _marko_template._);
_marko_template.meta = {
  id: _marko_componentType,
  tags: ["./components/custom-tag.marko"]
};
export default _marko_template;