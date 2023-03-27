import React from "react";
import { shallow } from "enzyme";
import Quality_Report from "./Quality_Report";

describe("Quality_Report", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Quality_Report />);
    expect(wrapper).toMatchSnapshot();
  });
});
