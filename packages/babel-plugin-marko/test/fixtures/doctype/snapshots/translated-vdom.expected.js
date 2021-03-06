import _componentGlobals from "marko/src/components/taglib/component-globals-tag.js";
import { t as _t } from "marko/src/runtime/vdom/helpers";

const _componentGlobals_tag = _t(_componentGlobals);

import _initComponents from "marko/src/components/taglib/init-components-tag.js";

const _initComponents_tag = _t(_initComponents);

import { r as _marko_renderer, c as _marko_defineComponent } from "marko/src/components/helpers";
import { t as _t2 } from "marko/src/runtime/vdom";

const _marko_componentType = "Fr76d7a7",
      _marko_template = _t2(__filename),
      _marko_component = null;

_marko_template._ = _marko_renderer(function (input, out, _component, component, state) {
  out.be("html", null, "5", component, null, 0);
  out.be("head", null, "1", component, null, 0);
  out.be("title", null, "0", component, null, 0);
  out.t("Title of the document");
  out.ee();
  out.ee();
  out.be("body", null, "4", component, null, 0);

  _componentGlobals_tag({}, out, "2");

  out.t("The content of the document......");

  _initComponents_tag({}, out, "3");

  out.ee();
  out.ee();
}, {
  ___type: _marko_componentType,
  ___implicit: true
}, _marko_component);
_marko_template.Component = _marko_defineComponent(_marko_component, _marko_template._);
_marko_template.meta = {
  id: _marko_componentType,
  tags: ["marko/src/components/taglib/component-globals-tag.js", "marko/src/components/taglib/init-components-tag.js"]
};
export default _marko_template;