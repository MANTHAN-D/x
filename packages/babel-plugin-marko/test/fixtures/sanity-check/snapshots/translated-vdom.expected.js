import a from "b";
export { a };
doThings();
andStuff();

function more() {
  abc();
}

import { cl as _marko_class_merge } from "marko/src/runtime/html/helpers";
import _marko_style_merge from "marko/src/runtime/vdom/helper-styleAttr";
import { d as _marko_dynamicTag, t as _t } from "marko/src/runtime/vdom/helpers";
import _other from "./components/other/index.marko";

const _other_tag = _t(_other);

import { r as _marko_renderer, c as _marko_defineComponent } from "marko/src/components/helpers";
import { t as _t2 } from "marko/src/runtime/vdom";

const _marko_componentType = "8f1lFGb_",
      _marko_template = _t2(__filename),
      _marko_component = {
  onCreate() {
    this.stuff();
  }

};

_marko_template._ = _marko_renderer(function (input, out, _component, component, state) {
  out.be("style", {
    "id": "css"
  }, "1", component, null, 4);
  out.t("\n  div {\n    color: ");
  out.t(x);
  out.t(";\n  }\n");
  out.ee();
  out.be("script", null, "2", component, null, 0);
  out.t("\n  var y = ");
  out.t(x);
  out.t(";\n");
  out.ee();

  function _thing(stuff, out) {
    out.be("div", {
      "x": stuff.x
    }, "3", component, 0, 0);
    out.ee();
  }

  var b = thing;
  let c = thing;
  out.be("div", {
    "b": b,
    "c": c
  }, "6", component, null, 0);
  {
    var d = thing;
    let e = thing;
    out.be("div", {
      "d": d,
      "e": e
    }, "5", component, 0, 0);
    out.ee();
  }
  out.ee();
  out.be("div", null, "7", component, 0, 0, {
    "onclick": _component.d("click", "handleClick", [a, b, ...d], false)
  });
  out.ee();
  out.be("div", {
    "id": _component.elId("1")
  }, "8", component, 0, 4);
  out.ee();
  out.be("div", {
    "class": _marko_class_merge(["a", {
      b: c,
      d
    }]),
    "style": _marko_style_merge({
      a: "b"
    })
  }, "9", component, 0, 4);
  out.ee();
  out.e("input", {
    "type": "text"
  }, "10", component, 0, 0);

  _marko_dynamicTag(a, {
    "renderBody": out => {
      out.be("div", null, "11", component, 0, 0);
      out.ee();
    }
  }, out, _component, "@x");

  _marko_dynamicTag(_thing, {
    "x": 1
  }, out, _component, "12");

  _other_tag({
    "renderBody": (out, a) => {
      out.be("div", null, "13", component, 0, 0);
      out.ee();
    }
  }, out, "14", ["click", "handleClick", false, [a, b, ...d]]);

  _other_tag({
    "x": 1,
    ...thing,
    "b": {
      a: 1
    },
    ...c,
    "c": {
      "c": 1,
      "d": {
        "d": 1,
        "renderBody": out => {
          out.be("div", null, "17", component, 0, 0);
          out.ee();
        }
      },
      "renderBody": out => {
        out.be("div", null, "16", component, 0, 0);
        out.ee();
      }
    },
    "renderBody": (out, b) => {
      out.be("div", null, "15", component, 0, 0);
      out.ee();
    }
  }, out, "20");

  out.be("div", {
    "id": "a",
    "class": "b c",
    "a": {
      a: 1
    },
    "c": "${d}",
    ...e,
    ...f()
  }, "27", component, null, 0);
  out.t(a);
  out.be("div", {
    "c": 1
  }, "22", component, 0, 0);
  out.ee();
  out.be("div", {
    "d": 1
  }, "23", component, 0, 0);
  out.ee();

  if (x === a) {
    out.t("a ");
    out.t(b);
  } else if (x === 2) {
    out.t("b");
  } else {
    out.t("c");
  }

  out.ee();
  out.be("div", {
    "b": 1
  }, "28", component, 0, 0);
  out.ee();
  out.be("div", null, "29", component, null, 0);
  out.t("123 abc 123");
  out.ee();
  out.be("span", { ...abc
  }, "30", component, 0, 0);
  out.ee();

  if (cond) {
    out.t("Hello ");
    out.t(planet);
  }

  for (let _i = 0; _i <= 10; _i += 2) {
    const i = _i;
    out.be("div", {
      "c": 1
    }, "32", component, 0, 0);
    out.ee();
  }

  for (const key in obj) {
    const val = obj[key];
    out.be("div", {
      "c": 1
    }, "34", component, 0, 0);
    out.ee();
  }

  let _i2 = -1;

  for (const val of arr) {
    let i = _i2++;
    i;
    out.be("div", {
      "c": 1
    }, `@${val.name}`, component, 0, 0);
    out.ee();

    _other_tag({
      "d": 2
    }, out, `@${val.name}`);
  }

  if (!true) out.be("div", null, "37", component, null, 0);
  out.t("Hi");
  if (!true) out.ee();
}, {
  ___type: _marko_componentType,
  ___implicit: true
}, _marko_component);
_marko_template.Component = _marko_defineComponent(_marko_component, _marko_template._);
_marko_template.meta = {
  id: _marko_componentType,
  deps: [{
    "type": "css",
    "code": "div {\n    color: green;\n  }",
    "path": "./template.marko",
    "virtualPath": "./template.marko.css"
  }],
  tags: ["./components/other/index.marko"]
};
export default _marko_template;