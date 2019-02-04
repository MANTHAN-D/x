import SELF_CLOSING from "self-closing-tags";
import * as t from "../../../../definitions";
import write from "../../../../util/html-out-write";
import withPreviousLocation from "../../../../util/with-previous-location";
import translateAttributes from "./attributes";
import {
  replaceInRenderBody,
  toStatement,
  assertNoParams,
  assertNoArgs
} from "../../../../taglib/core/util";

/**
 * Translates the html streaming version of a standard html element.
 */
export default function(path) {
  const { node } = path;
  const {
    name: { value: tagName },
    body,
    properties,
    handlers
  } = node;

  const attributes = path.get("attributes");
  const tagProperties = properties.slice();

  assertNoParams(path);
  assertNoArgs(path);

  if (handlers) {
    Object.entries(handlers).forEach(
      ([eventName, { arguments: args, once }]) => {
        const delegateArgs = [t.stringLiteral(eventName), args[0]];
        if (args.length > 1) {
          delegateArgs.push(t.arrayExpression(args.slice(1)));
        }

        // TODO: look into only sending this if once is true.
        delegateArgs.push(t.booleanLiteral(once));

        // TODO: why do we output eventName twice.
        tagProperties.push(
          t.objectProperty(
            t.stringLiteral(`on${eventName}`),
            t.callExpression(
              t.memberExpression(
                t.identifier("__component"),
                t.identifier("d")
              ),
              delegateArgs
            )
          )
        );
      }
    );
  }

  if (tagProperties.length) {
    // TODO: prevent escaping this with the attr helper.
    node.attributes.push(
      t.markoAttribute("data-marko", t.objectExpression(tagProperties))
    );

    // TODO: Hack to push to existing attributes path, should revisit,
    attributes.push(path.get("attributes")[attributes.length]);
  }

  let writeStartNode = withPreviousLocation(
    write`<${tagName}${translateAttributes(attributes)}>`,
    node
  );

  if (SELF_CLOSING.indexOf(tagName) !== -1) {
    replaceInRenderBody(path, writeStartNode);
    return;
  }

  let writeEndNode = write`</${tagName}>`;

  const { bodyOnlyIf } = path.node;
  if (bodyOnlyIf) {
    const negatedBodyOnlyIf = t.unaryExpression("!", bodyOnlyIf, true);
    writeStartNode = t.ifStatement(
      negatedBodyOnlyIf,
      t.blockStatement([toStatement(writeStartNode)])
    );
    writeEndNode = t.ifStatement(
      negatedBodyOnlyIf,
      t.blockStatement([toStatement(writeEndNode)])
    );
  }

  let needsBlock;
  for (const childNode of body) {
    if (t.isVariableDeclaration(childNode)) {
      if (childNode.kind === "const" || childNode.kind === "let") {
        needsBlock = true;
        break;
      }
    }
  }

  replaceInRenderBody(
    path,
    [writeStartNode]
      .concat(needsBlock ? t.blockStatement(body.map(toStatement)) : body)
      .concat(writeEndNode)
  );
}