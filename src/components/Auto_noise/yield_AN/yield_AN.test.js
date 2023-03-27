import React from "react";
import { shallow } from "enzyme";
import Yield_AN from "./yield_AN";

describe("Yield_AN", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Yield_AN />);
    expect(wrapper).toMatchSnapshot();
  });
});
