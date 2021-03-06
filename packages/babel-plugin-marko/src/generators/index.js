import * as t from "../definitions";
import SELF_CLOSING from "self-closing-tags";
import Printer from "@babel/generator/lib/printer";

const UNENCLOSED_WHITESPACE_TYPES = [
  "LogicalExpression",
  "AssignmentExpression",
  "ConditionalExpression",
  "BinaryExpression",
  "NewExpression",
  "FunctionDeclaration",
  "AssignmentExpression"
];

Object.assign(Printer.prototype, {
  MarkoDocumentType(node) {
    this.token("<!");
    this.token(node.value);
    this.token(">");
  },
  MarkoDeclaration(node) {
    this.token("<?");
    this.token(node.value);
    this.token("?>");
  },
  MarkoCDATA(node) {
    this.token("<![CDATA[");
    this.token(node.value);
    this.token("]]>");
  },
  MarkoComment(node) {
    this.token("<!--");
    this.token(node.value);
    this.token("-->");
  },
  MarkoPlaceholder(node, parent) {
    const parentBody = parent.body;
    const prev = parentBody[parentBody.indexOf(node) - 1];

    if (prev && (t.isMarkoText(prev) || t.isMarkoPlaceholder(prev))) {
      this.removeTrailingNewline();
    }

    this.token(node.escape ? "${" : "$!{");
    this.print(node.value, node);
    this.token("}");
  },
  MarkoScriptlet(node, parent) {
    this.removeTrailingNewline();

    if (!(t.isProgram(parent) && parent.body.indexOf(node) === 0)) {
      this.token("\n");
    }

    this.token(`${node.static ? "static" : "$"} `);

    if (node.body.length === 1) {
      // TODO should determine if node has unenclosed newlines.
      this.print(node.body[0], node);
    } else {
      this.token("{");
      this.newline();
      this.indent();
      this.printSequence(node.body, node);
      this.dedent();
      this.token("}");
    }
  },
  MarkoClass(node) {
    this.token("class");
    this.token(" ");
    this.print(node.body, node);
  },
  MarkoAttribute(node) {
    this.token(node.name);

    if (node.modifier) {
      this.token(":");
      this.token(node.modifier);
    }

    if (node.arguments && node.arguments.length) {
      this.token("(");
      this.printList(node.arguments, node);
      this.token(")");
    }

    if (!t.isBooleanLiteral(node.value) || !node.value.value) {
      this.token("=");
      printWithParansIfNeeded.call(this, node.value, node);
    }
  },
  MarkoSpreadAttribute(node) {
    this.token("...");
    printWithParansIfNeeded.call(this, node.value, node);
  },
  MarkoText(node, parent) {
    const parentBody = parent.body;
    const prev = parentBody[parentBody.indexOf(node) - 1];
    const concatToPrev = prev && t.isMarkoPlaceholder(prev);
    let { value } = node;

    if (concatToPrev) {
      this.removeTrailingNewline();
    }

    const isMultiLine = /[\r\n]/g.test(value);
    const isRootLevel = !concatToPrev && t.isProgram(parent);

    if (isRootLevel) {
      if (isMultiLine) {
        this.token("---\n");
      } else {
        this.token("-- ");
      }
    }

    this.word(value);

    if (isMultiLine && isRootLevel) {
      this.token("\n---");
    }
  },
  MarkoTag(node) {
    const isDynamicTag = !t.isStringLiteral(node.name);
    const tagName = !isDynamicTag && node.name.value;
    const selfClosing = !node.body.length || SELF_CLOSING.includes(tagName);
    const rawValue = node.rawValue;

    if (
      tagName === "style" &&
      /^style(?:\.[^\s]+)?\s*\{[\s\S]*}$/.test(rawValue)
    ) {
      this.token(rawValue);
      return;
    }

    this.token("<");

    if (rawValue) {
      this.token(rawValue);
    } else {
      if (isDynamicTag) {
        this.token("${");
        this.print(node.name, node);
        this.token("}");
      } else {
        this.token(tagName);
      }

      if (node.arguments.length) {
        this.token("(");
        this.printList(node.arguments, node);
        this.token(")");
      }

      if (node.params.length) {
        this.token("|");
        this.printList(node.params, node);
        this.token("|");
      }

      if (node.attributes.length) {
        this.token(" ");
        this.printJoin(node.attributes, node, { separator: spaceSeparator });
      }
    }

    if (selfClosing) {
      this.token("/>");
    } else {
      this.token(">");
      this.newline();
      this.printSequence(node.body, node, { indent: true });
      this.token("</");
      if (!isDynamicTag) {
        this.token(tagName);
      }
      this.token(">");
    }
  }
});

function spaceSeparator() {
  this.token(" ");
}

function printWithParansIfNeeded(value, parent) {
  const needsParans = hasUnenclosedWhitespace(value);

  if (needsParans) {
    this.token("(");
  }

  this.print(value, parent);

  if (needsParans) {
    this.token(")");
  }
}

function hasUnenclosedWhitespace(node) {
  return UNENCLOSED_WHITESPACE_TYPES.includes(node.type);
}
