const { toListItem, changeLinkedList } = require("./linkedlist");
console.log("ci12345678901234");

const createProxy = (base, revokes, parentState = null, propName = null) => {
  const state = toListItem(base, parentState, propName);

  const handler = {
    get(_, key) {
      const val = state.copy ? state.copy[key] : state.base[key];

      if (typeof val === "object") {
        if (key in state.children) {
          return state.children[key];
        } else {
          const { proxy } = createProxy(val, revokes, state, key);
          state.children[key] = proxy;
          return proxy;
        }
      } else {
        return val;
      }
    },
    set(target, key, newVal) {
      changeLinkedList(state, key, newVal);
    }
  }

  const { proxy, revoke } = Proxy.revocable(state, handler);
  revokes.push(revoke);
  return { proxy, revoke, revokes, state };
}

const produce = (base, fn) => {
  const { proxy, revokes, state } = createProxy(base, []);

  fn(proxy);
  revokes.forEach(revoke => revoke());
  return state.copy || state.base;
}

module.exports = {
  produce,
}