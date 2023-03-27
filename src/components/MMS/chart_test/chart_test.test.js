import React from "react";
import { shallow } from "enzyme";
import Chart_test from "./chart_test";

describe("Chart_test", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Chart_test />);
    expect(wrapper).toMatchSnapshot();
  });
});
