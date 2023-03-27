import React from "react";
import { shallow } from "enzyme";
import PR_AN from "./PR_AN";

describe("PR_AN", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<PR_AN />);
    expect(wrapper).toMatchSnapshot();
  });
});
