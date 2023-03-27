import React from "react";
import { shallow } from "enzyme";
import Alarm_topic from "./alarm_topic";

describe("Alarm_topic", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Alarm_topic />);
    expect(wrapper).toMatchSnapshot();
  });
});
