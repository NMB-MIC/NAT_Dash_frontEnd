import React from "react";
import { shallow } from "enzyme";
import PR_IRB from "./PR_IRB";

describe("PR_IRB", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<PR_IRB />);
    expect(wrapper).toMatchSnapshot();
  });
});
