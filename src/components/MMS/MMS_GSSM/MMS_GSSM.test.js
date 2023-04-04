import React from "react";
import { shallow } from "enzyme";
import MMS_GSSM from "./MMS_GSSM";

describe("MMS_GSSM", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<MMS_GSSM />);
    expect(wrapper).toMatchSnapshot();
  });
});
