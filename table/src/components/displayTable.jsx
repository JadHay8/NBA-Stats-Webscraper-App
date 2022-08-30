import { data } from "cheerio/lib/api/attributes";
import React from "react";
import "../styles/displayTable.css";
// const json_data = require("../data/stats.json");
// const fs = require("fs");

class DisplayTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data_obj: {},
      list: [],
      // count: 0,
    };

    this.callAPI = this.callAPI.bind(this);
    this.callAPI();
    // this.organize = this.organize.bind(this);
    // this.organize();
  }

  callAPI() {
    // const [data, setData] = useState([]);
    // const getData = () => {
    fetch("./stats.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        // console.log(response);
        return response.json();
      })
      .then((myJson) => {
        // console.log("MY JSON: \n", myJson);
        this.setState(
          {
            data_obj: myJson,
            // count: this.state.count + 1,
          },
          () => {
            // for (const statType in this.state.data_obj) {
            //   // console.log(this.state.list);
            //   // console.log(this.state.data_obj[statType]);
            //   this.setState({
            //     list: this.state.list.push(this.state.data_obj[statType]),
            //   });
            // }
            const temp = [];
            for (const statType in this.state.data_obj) {
              temp.push(this.state.data_obj[statType]);
            }
            this.setState(
              {
                list: temp,
              }
              // () => {
              //   console.log(this.state.list);
              // }
            );
          }
        );
      });

    // console.log("THIS.STATE.LIST \n", this.state.list);
    // };
    // useEffect(() => {
    //   getData();
    // }, []);

    // return (
    //   <div className="App">
    //     {data && data.length > 0 && data.map((item) => <p>{item.about}</p>)}
    //   </div>
    // );
  }

  // callAPI() {
  // fs.readFileSync("../data/stats.jsonyy", "utf8", function (err, data) {
  // try {
  //     data = JSON.parse(data);
  //     console.log(data);
  // this.setState({
  //   list: data.data,
  // });
  //   } catch (e) {
  //     // Catch error in case file doesn't exist or isn't valid JSON
  //   }
  // });
  // }

  // callAPI() {
  //   get("../server2")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       this.setState({
  //         list: data.data,
  //       });
  //     });
  // }

  //   <tr key={stat_type[statType].id}>
  //   <td>{stat_type[statType].name}</td>
  // </tr>

  // organize() {
  // }

  render() {
    // var i = 0;
    let tb_data = this.state.list.map((stat_type) => {
      // let x = () => {
      //   for (var j = 0; j <= 6; j++) {
      //     console.log(j);
      //     if (j == 6) {
      //       console.log("THIS RAN");
      //       return (
      //         <tr className="blank_row">
      //           <td colSpan="8"></td>
      //         </tr>
      //       );
      //     }
      //     const obj = stat_type.data[j];
      //     console.log("else RAAN");
      //     return (
      //       <tr key={obj.id}>
      //         <td>{obj.name}</td>
      //         <td>{obj.team}</td>
      //         <td>{obj.points}</td>
      //         <td>{obj.assists}</td>
      //         <td>{obj.rebounds}</td>
      //         <td>{obj.steals}</td>
      //         <td>{obj.blocks}</td>
      //         <td>{obj.three_pt_pct}</td>
      //       </tr>
      //     );
      //   }
      // };
      // x();
      // if (i == 5) {
      //   i = 0;
      //   return (
      // <tr className="blank_row">
      //   <td colSpan="8"></td>
      // </tr>
      //   );
      // }
      return stat_type.data.map((obj) => {
        return (
          <tr key={obj.id}>
            <td>{obj.name}</td>
            <td>{obj.team}</td>
            <td>{obj.points}</td>
            <td>{obj.assists}</td>
            <td>{obj.rebounds}</td>
            <td>{obj.steals}</td>
            <td>{obj.blocks}</td>
            <td>{obj.three_pt_pct}</td>
          </tr>
        );
        // console.log("OBJ: \t", obj);
        // switch (stat_type.id) {
        //   case 1:
        //     return (
        //       <tr key={stat_type.id}>
        //         <td>{stat_type.id}</td>
        //         <td>{obj.name}</td>
        //         <td>{obj.points}</td>
        //       </tr>
        //     );
        //   case 2:
        //     return (
        //       <tr key={stat_type.id}>
        //         <td>{stat_type.id}</td>
        //         <td>{obj.name}</td>
        //         <td>{obj.assists}</td>
        //       </tr>
        //     );
        //   case 3:
        //     return (
        //       <tr key={stat_type.id}>
        //         <td>{stat_type.id}</td>
        //         <td>{obj.name}</td>
        //         <td>{obj.rebounds}</td>
        //       </tr>
        //     );
        //   case 4:
        //     return (
        //       <tr key={stat_type.id}>
        //         <td>{stat_type.id}</td>
        //         <td>{obj.name}</td>
        //         <td>{obj.steals}</td>
        //       </tr>
        //     );
        //   case 5:
        //     return (
        //       <tr key={stat_type.id}>
        //         <td>{stat_type.id}</td>
        //         <td>{obj.name}</td>
        //         <td>{obj.blocks}</td>
        //       </tr>
        //     );
        //   case 6:
        //     return (
        //       <tr key={stat_type.id}>
        //         <td>{stat_type.id}</td>
        //         <td>{obj.name}</td>
        //         <td>{obj.three_pt_pct}</td>
        //       </tr>
        //     );
        //   default:
        //     return (
        //       <tr key={stat_type.id}>
        //         <td>{stat_type.id}</td>
        //         <td>
        //           {console.log(
        //             "======================DEFAULT=================="
        //           )}
        //         </td>
        //         <td>{obj.name}</td>
        //         <td>{obj.points}</td>
        //       </tr>
        //     );
        // }
      });
      // console.log("hello \t", stat_type.data[0].name);
    });

    // let tb_data = () => {
    //   var i=0;
    //   for (const stat_type in this.state.list) {
    //     stat_type.data[i]

    //   }
    // }

    return (
      <div className="container">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Team</th>
              <th>Points</th>
              <th>Assists</th>
              <th>Rebounds</th>
              <th>Steals</th>
              <th>Blocks</th>
              <th>3pt%</th>
            </tr>
          </thead>
          <tbody>{tb_data}</tbody>
        </table>
      </div>
    );
  }
}

export default DisplayTable;
