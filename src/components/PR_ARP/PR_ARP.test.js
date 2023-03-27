import React from "react";
import { shallow } from "enzyme";
import PR_ARP from "./PR_ARP";

describe("PR_ARP", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<PR_ARP />);
    expect(wrapper).toMatchSnapshot();
  });
});
