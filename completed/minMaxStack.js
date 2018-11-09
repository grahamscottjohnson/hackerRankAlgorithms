// Feel free to add new properties and methods to the class.
class MinMaxStack {
  constructor(value, prevStack = null) {
    if (value === undefined) {
      this.becomeDefaultStack();
    } else {
      this.value = value;
      this.min = this.deriveMin(value, prevStack);
      this.max = this.deriveMax(value, prevStack);
      this.prevStack = prevStack;
    }
  }

  deriveMax(value, prevStack) {
    if (prevStack == null || prevStack.isEmpty()) {
      return value;
    } else {
      return Math.max(value, prevStack.max);
    }
  }

  deriveMin(value, prevStack) {
    if (prevStack == null || prevStack.isEmpty()) {
      return value;
    } else {
      return Math.min(value, prevStack.min);
    }
  }

  peek() {
    return this.value;
  }

  pop() {
    const value = this.value;
    this.becomeCloneOf(this.prevStack);
    return value;
  }

  push(number) {
    const clone = this.clone();
    this.becomeCloneOf(new MinMaxStack(number, clone));
  }

  getMin() {
    return this.min;
  }

  getMax() {
    return this.max;
  }

  clone() {
    return new MinMaxStack(this.value, this.prevStack);
  }

  becomeCloneOf(stack) {
    if (stack == null) {
      this.becomeDefaultStack();
    } else {
      this.value = stack.value;
      this.max = stack.max;
      this.min = stack.min;
      this.prevStack = stack.prevStack;
    }
  }

  becomeDefaultStack() {
    this.value = undefined;
    this.min = undefined;
    this.max = undefined;
    this.prevStack = null;
  }

  isEmpty() {
    return this.value === undefined;
  }
}

// Do not edit the line below.
exports.MinMaxStack = MinMaxStack;
