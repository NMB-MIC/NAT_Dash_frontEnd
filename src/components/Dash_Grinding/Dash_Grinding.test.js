import React from "react";
import { shallow } from "enzyme";
import Dash_Grinding from "./Dash_Grinding";

describe("Dash_Grinding", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Dash_Grinding />);
    expect(wrapper).toMatchSnapshot();
  });
});
