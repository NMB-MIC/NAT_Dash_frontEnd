import React from "react";
import { shallow } from "enzyme";
import Dash_AVS from "./Dash_AVS";

describe("Dash_AVS", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Dash_AVS />);
    expect(wrapper).toMatchSnapshot();
  });
});
