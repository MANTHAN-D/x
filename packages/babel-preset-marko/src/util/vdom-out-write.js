import * as t from "../definitions";

export default function write(method, ...args) {
  return t.callExpression(
    t.memberExpression(t.identifier("out"), t.identifier(method)),
    args
  );
}
