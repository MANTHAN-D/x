import SELF_CLOSING from "self-closing-tags";
import * as t from "../../../../definitions";
import write from "../../../../util/html-out-write";
import withPreviousLocation from "../../../../util/with-previous-location";
import translateAttributes from "./attributes";
import { replaceInRenderBody, toStatement } from "../../../../taglib/core/util";

/**
 * Translates the html streaming version of a standard html element.
 */
export default function(path) {
  const {
    node: { startTag, children, endTag }
  } = path;

  const tagName = startTag.name.value;
  const attributes = path.get("startTag").get("attributes");

  let writeStartNode = withPreviousLocation(
    write`<${tagName}${translateAttributes(attributes)}>`,
    startTag
  );

  if (SELF_CLOSING.indexOf(tagName) !== -1) {
    replaceInRenderBody(path, writeStartNode);
    return;
  }

  let writeEndNode = withPreviousLocation(write`</${tagName}>`, endTag);

  const { bodyOnlyIf } = path.node;
  if (bodyOnlyIf) {
    writeStartNode = t.ifStatement(
      bodyOnlyIf,
      t.blockStatement([toStatement(writeStartNode)])
    );
    writeEndNode = t.ifStatement(
      bodyOnlyIf,
      t.blockStatement([toStatement(writeEndNode)])
    );
  }

  replaceInRenderBody(path, [writeStartNode, ...children, writeEndNode]);
}