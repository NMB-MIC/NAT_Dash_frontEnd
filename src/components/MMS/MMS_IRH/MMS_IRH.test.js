import React from "react";
import { shallow } from "enzyme";
import MMS_IRH from "./MMS_IRH";

describe("MMS_IRH", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<MMS_IRH />);
    expect(wrapper).toMatchSnapshot();
  });
});
