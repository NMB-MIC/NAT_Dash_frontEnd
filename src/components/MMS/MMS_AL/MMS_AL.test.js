import React from "react";
import { shallow } from "enzyme";
import MMS_AL from "./MMS_AL";

describe("MMS_AL", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<MMS_AL />);
    expect(wrapper).toMatchSnapshot();
  });
});
