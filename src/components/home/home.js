import React, { useState, Component } from "react";


class Home extends Component {


  render() {
    return (
      <div className="content-wrapper">
        {/* <h1
          style={{
            textAlign: "center",
            fontSize: 90,
            fontWeight: "bold",
            // position: "absolute",
            top: 5,
           
          }}
        >  NAT Division

        </h1> */}
        <img
          style={{
            marginTop: 0,
            position: "relative",
            width: "100%",
            opacity: 0.35,
          }}
          src="dist/img/Gallery-Bangpain1.jpg"
          classname="img-circle elevation-2"
          alt="User Image"
        />


      </div>
      //  <img src="dist/img/Gallery-Bangpain1.jpg" />
    )
  };
}

export default Home;
