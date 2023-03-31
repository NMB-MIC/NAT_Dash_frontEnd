import React from "react";
import { shallow } from "enzyme";
import Test_csv from "./test_csv";

describe("Test_csv", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Test_csv />);
    expect(wrapper).toMatchSnapshot();
  });
});
