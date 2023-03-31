import React, { Component } from "react";
import Swal from "sweetalert2";
import { OK, server, key } from "../../../constance/constance";
import { httpClient } from "../../../utils/HttpClient";
import CSVReader from 'react-csv-reader'


class Test_csv extends Component {
  constructor(props) {
    super(props)
    this.state = {
      csv_data: "",
      uploaded: "",
      progress: 0,
    }
  }
  inputCSv = async () => {
    for (let index = 1; index <= this.state.csv_data.length - 1; index++) {
      if (this.state.csv_data[index][0] === "") {
        break
      } else {
        // let input = await httpClient.post(
        //   server.uploadCSV + "/" + this.state.csv_data[index][0] +
        //    "/" + this.state.csv_data[index][1] + 
        //    "/" + this.state.csv_data[index][2]
        //   );
        let input = await httpClient.post(server.uploadCSV, {
          machine: this.state.csv_data[index][0],
          Topic: this.state.csv_data[index][1],
          responsible: this.state.csv_data[index][2],
        })

        await this.setState({ uploaded: this.state.uploaded + 1 });
        await this.setState({
          progress:
            (100 * this.state.uploaded) / (this.state.csv_data.length - 2),
          // Math.round((100 * this.state.uploaded) / (this.state.csv_data.length - 2)),
        });
      }
    }
    if (this.state.progress >= 100) {
      await Swal.fire({
        icon: "success",
        title: "Upload plan Successed",
        // text: { APP_TITLE }.APP_TITLE,
        showConfirmButton: false,
        timer: 1000,
      });
      await window.location.reload(false);
    }
  }

  render() {
    return (<div className="content-wrapper">
      <div className="row">
        <div className="card col-md-12" >
          <div className="card-body">
            <div className="col-md-12">
              <div className="card card-primary">
                <div className="card-header">
                  <h3 className="card-title"> Input Master (CSV File) </h3>
                </div>

                <div className="col-md-12">
                  <div className="card-body">
                    {/* input master topic csv  */}
                    <div className="row">
                      <div className="col-md-1">
                        <CSVReader
                          onFileLoaded={(data, fileInfo) =>
                            this.setState({ csv_data: data })
                          }
                        />

                      </div>
                      <div className="col-md-2"></div>
                      <button onClick={async (e) => {
                        await e.preventDefault();
                        this.inputCSv();
                      }}

                        className="btn btn-primary float-right">
                        Upload
                      </button>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);
  }
}

export default Test_csv;
