import "@testing-library/jest-dom";
import "whatwg-fetch";

beforeAll(() => {
  Object.defineProperty(window, "IS_REACT_ACT_ENVIRONMENT", {
    writable: true,
    value: true,
  });
  Object.defineProperty(window, "scrollTo", {
    writable: true,
    value: () => {},
  });
  Object.defineProperty(window, "resizeTo", {
    writable: true,
    value: (width: number, height: number) => {
      Object.assign(window, {
        innerWidth: width,
        innerHeight: height,
      }).dispatchEvent(new Event("resize"));
    },
  });
});
