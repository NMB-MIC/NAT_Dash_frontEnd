import React from "react";
import { shallow } from "enzyme";
import Dash_ARP from "./Dash_ARP";

describe("Dash_ARP", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Dash_ARP />);
    expect(wrapper).toMatchSnapshot();
  });
});
