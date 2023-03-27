import React from "react";
import { shallow } from "enzyme";
import Dash_MBR from "./Dash_MBR";

describe("Dash_MBR", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Dash_MBR />);
    expect(wrapper).toMatchSnapshot();
  });
});
