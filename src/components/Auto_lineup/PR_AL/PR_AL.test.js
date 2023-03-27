import React from "react";
import { shallow } from "enzyme";
import PR_AL from "./PR_AL";

describe("PR_AL", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<PR_AL />);
    expect(wrapper).toMatchSnapshot();
  });
});
