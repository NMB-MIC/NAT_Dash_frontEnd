import React from "react";
import { shallow } from "enzyme";
import PR_MBR from "./PR_MBR";

describe("PR_MBR", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<PR_MBR />);
    expect(wrapper).toMatchSnapshot();
  });
});
