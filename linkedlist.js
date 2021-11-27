const toListItem = (base, parent = null, propName = null) => {
  return {
    base,
    parent,
    propName,
    copy: null,
    children: {},
  }
}

const assign = (...obj) => Object.assign(...obj);

const shallowCopy = obj => {
  if (Array.isArray(obj)) return obj.concat();
  return assign({}, obj);
}

const changeLinkedList = (state, propName, value) => {
  const newValue = { [propName]: value };

  if (state.copy) {
    assign(state.copy, newValue);
  } else {
    state.copy = assign(shallowCopy(state.base), newValue);
  }

  if (state.parent)
    changeLinkedList(state.parent, state.propName, state.copy);
}

const base = {
  value: 'hello',
  inner: {
    message: "hello world"
  }
}

module.exports = {
  toListItem, changeLinkedList
}