import React from "react";
import { shallow } from "enzyme";
import MMS_TB from "./MMS_TB";

describe("MMS_TB", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<MMS_TB />);
    expect(wrapper).toMatchSnapshot();
  });
});
