import * as t from "../../../definitions";
import { buildIfStatement } from "./util";
import { assertAllowedAttributes, toStatement } from "../util";

export default function translate(path) {
  assertAllowedAttributes(path, ["if"]);

  const { ifStatement } = path.node;

  if (!ifStatement) {
    throw path.buildCodeFrameError(
      "Invalid 'else' tag, expected preceding 'if' or 'else if' tag."
    );
  }

  const { startTag, children } = path.node;
  const ifAttr = startTag.attributes.find(attr => attr.name === "if");
  ifStatement.alternate = ifAttr
    ? buildIfStatement(path)
    : t.blockStatement(children.map(toStatement));
  path.remove();
}