import React from "react";
import { shallow } from "enzyme";
import List_User from "./List_User";

describe("List_User", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<List_User />);
    expect(wrapper).toMatchSnapshot();
  });
});
