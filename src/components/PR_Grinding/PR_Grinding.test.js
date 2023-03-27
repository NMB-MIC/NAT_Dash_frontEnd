import React from "react";
import { shallow } from "enzyme";
import PR_Grinding from "./PR_Grinding";

describe("PR_Grinding", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<PR_Grinding />);
    expect(wrapper).toMatchSnapshot();
  });
});
