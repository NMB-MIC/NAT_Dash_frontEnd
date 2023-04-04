import React from "react";
import { shallow } from "enzyme";
import MMS_AOD from "./MMS_AOD";

describe("MMS_AOD", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<MMS_AOD />);
    expect(wrapper).toMatchSnapshot();
  });
});
