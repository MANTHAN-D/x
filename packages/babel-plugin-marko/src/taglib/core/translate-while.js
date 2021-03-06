import * as t from "../../definitions";

export default function(path) {
  const { node, hub } = path;
  const { rawValue, start, body } = node;
  const [whileNode] = hub.parse(rawValue + ";", start).body;
  whileNode.body = t.blockStatement(body);
  path.replaceWith(whileNode);
}
