import React from "react";
import { shallow } from "enzyme";
import MMS_ARP from "./MMS_ARP";

describe("MMS_ARP", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<MMS_ARP />);
    expect(wrapper).toMatchSnapshot();
  });
});
