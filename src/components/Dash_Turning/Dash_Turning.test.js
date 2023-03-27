import React from "react";
import { shallow } from "enzyme";
import Dash_Turning from "./Dash_Turning";

describe("Dash_Turning", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Dash_Turning />);
    expect(wrapper).toMatchSnapshot();
  });
});
