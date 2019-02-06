import * as t from "../../../definitions";
import {
  replaceInRenderBody,
  assertNoArgs,
  insertBeforeInRenderBody
} from "../../../taglib/core/util";
import { getAttrs, buildEventHandlerArray } from "./util";

export default function(path) {
  const { node, hub } = path;
  const { options } = hub;
  const { name: expression, key, bodyOnlyIf } = node;

  assertNoArgs(path);

  const foundAttrs = getAttrs(path);
  const renderBodyProp = foundAttrs.properties.find(
    prop => prop.key && prop.key.value === "renderBody"
  );
  const dynamicTagRenderCall = t.callExpression(
    hub.importNamed(
      path,
      `marko/src/runtime/${options.output}/helpers`,
      "d",
      "marko_dynamicTag"
    ),
    [
      expression,
      foundAttrs.properties.length ? foundAttrs : t.nullLiteral(),
      t.identifier("out"),
      hub._componentDefIdentifier,
      key,
      ...buildEventHandlerArray(path)
    ]
  );

  if (bodyOnlyIf && renderBodyProp) {
    const renderBodyIdentifier = path.scope.generateUidIdentifier(
      "dynamic_tag_renderBody"
    );
    insertBeforeInRenderBody(
      path,
      t.variableDeclaration("const", [
        t.variableDeclarator(renderBodyIdentifier, renderBodyProp.value)
      ])
    );

    renderBodyProp.value = renderBodyIdentifier;
    replaceInRenderBody(
      path,
      t.ifStatement(
        bodyOnlyIf,
        t.blockStatement([t.markoTag(renderBodyIdentifier)]),
        t.blockStatement([t.expressionStatement(dynamicTagRenderCall)])
      )
    );
  } else {
    replaceInRenderBody(path, dynamicTagRenderCall);
  }
}
