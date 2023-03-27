import React from "react";
import { shallow } from "enzyme";
import Dash_ORH from "./Dash_ORH";

describe("Dash_ORH", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Dash_ORH />);
    expect(wrapper).toMatchSnapshot();
  });
});
