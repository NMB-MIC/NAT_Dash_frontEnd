import React from "react";
import { shallow } from "enzyme";
import MMS_IRR from "./MMS_IRR";

describe("MMS_IRR", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<MMS_IRR />);
    expect(wrapper).toMatchSnapshot();
  });
});
