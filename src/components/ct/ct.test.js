import React from "react";
import { shallow } from "enzyme";
import Ct from "./ct";

describe("Ct", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Ct />);
    expect(wrapper).toMatchSnapshot();
  });
});
