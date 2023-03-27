import React from "react";
import { shallow } from "enzyme";
import PR_ORH from "./PR_ORH";

describe("PR_ORH", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<PR_ORH />);
    expect(wrapper).toMatchSnapshot();
  });
});
