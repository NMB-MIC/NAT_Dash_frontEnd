import React from "react";
import { shallow } from "enzyme";
import Dash_AL from "./Dash_AL";

describe("Dash_AL", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Dash_AL />);
    expect(wrapper).toMatchSnapshot();
  });
});
