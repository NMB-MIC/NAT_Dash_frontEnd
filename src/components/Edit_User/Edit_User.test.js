import React from "react";
import { shallow } from "enzyme";
import Edit_User from "./Edit_User";

describe("Edit_User", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Edit_User />);
    expect(wrapper).toMatchSnapshot();
  });
});
