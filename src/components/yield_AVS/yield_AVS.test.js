import React from "react";
import { shallow } from "enzyme";
import Yield_AVS from "./yield_AVS";

describe("Yield_AVS", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Yield_AVS />);
    expect(wrapper).toMatchSnapshot();
  });
});
