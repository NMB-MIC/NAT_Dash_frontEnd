import React from "react";
import { shallow } from "enzyme";
import Machine_utilization from "./machine_utilization";

describe("Machine_utilization", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Machine_utilization />);
    expect(wrapper).toMatchSnapshot();
  });
});
