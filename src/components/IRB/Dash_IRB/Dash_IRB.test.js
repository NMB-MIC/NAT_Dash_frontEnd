import React from "react";
import { shallow } from "enzyme";
import Dash_IRB from "./Dash_IRB";

describe("Dash_IRB", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Dash_IRB />);
    expect(wrapper).toMatchSnapshot();
  });
});
