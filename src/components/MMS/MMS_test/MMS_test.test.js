import React from "react";
import { shallow } from "enzyme";
import MMS_test from "./MMS_test";

describe("MMS_test", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<MMS_test />);
    expect(wrapper).toMatchSnapshot();
  });
});
