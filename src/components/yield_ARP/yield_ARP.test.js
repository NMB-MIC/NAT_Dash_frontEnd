import React from "react";
import { shallow } from "enzyme";
import Yield_ARP from "./yield_ARP";

describe("Yield_ARP", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Yield_ARP />);
    expect(wrapper).toMatchSnapshot();
  });
});
