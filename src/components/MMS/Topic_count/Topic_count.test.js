import React from "react";
import { shallow } from "enzyme";
import Topic_count from "./Topic_count";

describe("Topic_count", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Topic_count />);
    expect(wrapper).toMatchSnapshot();
  });
});
