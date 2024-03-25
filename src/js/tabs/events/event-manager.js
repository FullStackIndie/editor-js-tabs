export default class EventManager {
  static #eventHandlers = {}; // Private static field to store event handlers

  // Static method to subscribe to an event
  static subscribe(eventName, handler) {
    if (!this.#eventHandlers[eventName]) {
      this.#eventHandlers[eventName] = [];
    }
    this.#eventHandlers[eventName].push(handler);
  }

  // Static method to unsubscribe from an event
  static unsubscribe(eventName, handler) {
    if (this.#eventHandlers[eventName]) {
      const index = this.#eventHandlers[eventName].indexOf(handler);
      if (index !== -1) {
        this.#eventHandlers[eventName].splice(index, 1);
      }
    }
  }

  // Static method to raise an event
  static raiseEvent(eventName, eventData) {
    const handlers = this.#eventHandlers[eventName];
    if (handlers) {
      handlers.forEach((handler) => handler(eventData));
    }
  }
}
