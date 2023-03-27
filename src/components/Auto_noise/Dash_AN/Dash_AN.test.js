import React from "react";
import { shallow } from "enzyme";
import Dash_AN from "./Dash_AN";

describe("Dash_AN", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Dash_AN />);
    expect(wrapper).toMatchSnapshot();
  });
});
