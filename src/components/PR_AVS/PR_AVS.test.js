import React from "react";
import { shallow } from "enzyme";
import PR_AVS from "./PR_AVS";

describe("PR_AVS", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<PR_AVS />);
    expect(wrapper).toMatchSnapshot();
  });
});
