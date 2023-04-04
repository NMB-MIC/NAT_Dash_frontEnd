import React from "react";
import { shallow } from "enzyme";
import MMS_IRB from "./MMS_IRB";

describe("MMS_IRB", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<MMS_IRB />);
    expect(wrapper).toMatchSnapshot();
  });
});
