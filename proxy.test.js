const { produce } = require("./proxy");

describe("proxy", () => {
  test("state change 1", () => {
    const state = {
      user: {
        age: 23,
        born: {
          country: "korea",
          city: "daejeon"
        }
      }
    }

    const nextState = produce(state, (draft) => {
      const { user } = draft;

      draft.user.age = 80;
      user.born.country = "France"
      user.age = 70;
    });

    expect(nextState.user.age).toEqual(70);
  });

  test("state change 2", () => {
    const state = {
      user: {
        age: 23,
        born: {
          country: "korea",
          city: "daejeon"
        }
      }
    }

    const nextState = produce(state, (draft) => {
      const { user } = draft;

      draft.user.age = 80;
      user.born.country = "France"
      user.age = 70;
    });

    expect(nextState.user.born.country).toEqual("France");
  });
});