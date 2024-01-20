export function tabKeyHandler(event) {
  /**
   * Prevent editor.js tab handler
   */
  event.stopPropagation();

  /**
   * Prevent native tab behaviour
   */
  event.preventDefault();

  const textarea = event.target;
  const isShiftPressed = event.shiftKey;
  const caretPosition = textarea.selectionStart;
  const value = textarea.value;
  const indentation = "  ";

  let newCaretPosition;

  /**
   * For Tab pressing, just add an indentation to the caret position
   */
  if (!isShiftPressed) {
    newCaretPosition = caretPosition + indentation.length;

    textarea.value =
      value.substring(0, caretPosition) +
      indentation +
      value.substring(caretPosition);
  } else {
    /**
     * For Shift+Tab pressing, remove an indentation from the start of line
     */
    const currentLineStart = getLineStartPosition(value, caretPosition);
    const firstLineChars = value.substr(currentLineStart, indentation.length);

    if (firstLineChars !== indentation) {
      return;
    }

    /**
     * Trim the first two chars from the start of line
     */
    textarea.value =
      value.substring(0, currentLineStart) +
      value.substring(currentLineStart + indentation.length);
    newCaretPosition = caretPosition - indentation.length;
  }

  /**
   * Restore the caret
   */
  textarea.setSelectionRange(newCaretPosition, newCaretPosition);
}

export function getLineStartPosition(string, position) {
  const charLength = 1;
  let char = "";

  /**
   * Iterate through all the chars before the position till the
   * - end of line (\n)
   * - or start of string (position === 0)
   */
  while (char !== "\n" && position > 0) {
    position = position - charLength;
    char = string.substr(position, charLength);
  }

  /**
   * Do not count the linebreak symbol because it is related to the previous line
   */
  if (char === "\n") {
    position += 1;
  }

  return position;
}
