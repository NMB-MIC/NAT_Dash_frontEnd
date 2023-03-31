import React from "react";
import { shallow } from "enzyme";
import MMS_AVS from "./MMS_AVS";

describe("MMS_AVS", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<MMS_AVS />);
    expect(wrapper).toMatchSnapshot();
  });
});
