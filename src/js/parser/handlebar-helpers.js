import Handlebars from "handlebars";

export default class HandlebarHelpers {
  toLowercase(str) {
    return str.toLowerCase();
  }

  getRandomId() {
    return crypto.randomUUID();
  }

  equals(a, b) {
    return a === b;
  }

  embed(data){
    console.log(data);
    let result = data.html.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
    return new Handlebars.SafeString(result);
  }

  /// Handlebars helper to compare two values
  /// Credit: https://stackoverflow.com/a/16315366
  /// @param {any} v1 - The first value to compare
  /// @param {string} operator - The operator to use for comparison
  /// @param {any} v2 - The second value to compare
  /// @param {object} options - The Handlebars options object
  ifCondition(v1, operator, v2, options) {
    switch (operator) {
      case "==":
        return v1 == v2 ? options.fn(this) : options.inverse(this);
      case "===":
        return v1 === v2 ? options.fn(this) : options.inverse(this);
      case "!=":
        return v1 != v2 ? options.fn(this) : options.inverse(this);
      case "!==":
        return v1 !== v2 ? options.fn(this) : options.inverse(this);
      case "<":
        return v1 < v2 ? options.fn(this) : options.inverse(this);
      case "<=":
        return v1 <= v2 ? options.fn(this) : options.inverse(this);
      case ">":
        return v1 > v2 ? options.fn(this) : options.inverse(this);
      case ">=":
        return v1 >= v2 ? options.fn(this) : options.inverse(this);
      case "&&":
        return v1 && v2 ? options.fn(this) : options.inverse(this);
      case "||":
        return v1 || v2 ? options.fn(this) : options.inverse(this);
      default:
        return options.inverse(this);
    }
  }
}
