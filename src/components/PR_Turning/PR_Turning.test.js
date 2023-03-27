import React from "react";
import { shallow } from "enzyme";
import PR_Turning from "./PR_Turning";

describe("PR_Turning", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<PR_Turning />);
    expect(wrapper).toMatchSnapshot();
  });
});
