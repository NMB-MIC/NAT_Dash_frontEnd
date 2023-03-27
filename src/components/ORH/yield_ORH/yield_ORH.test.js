import React from "react";
import { shallow } from "enzyme";
import Yield_ORH from "./yield_ORH";

describe("Yield_ORH", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Yield_ORH />);
    expect(wrapper).toMatchSnapshot();
  });
});
