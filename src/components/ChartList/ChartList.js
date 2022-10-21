import React from "react";
import { mountGraphData } from "./data";
import ChartCard from "../../components/ChartCard/ChartCard";
import { Segment } from "semantic-ui-react";

export default function ChartList({ ranges, data_7D, data_1M, data_1Y, type }) {
  let data = mountGraphData(data_7D, data_1M, data_1Y, type, ranges);
  console.log({ data });
  console.log(ranges);

  return (
    // <Segment
    //   raised
    //   style={{ overflowX: "hidden", maxHeight: "35.5vh", padding: "0px", border : 0}}
    //   className="right-segment"
    // >
    //   {data &&
    //     data.map((card) => (
    //       <ChartCard card={card} key={card.id} data={card.data} />
    //     ))}
    // </Segment>
    
    <div className="right-segment chart-container" style={{height : "35.0vh", overflowY : "scroll", border : 0, padding : 0, paddingLeft: "5px"}} >
      {data &&
        data.map((card) => (
          <ChartCard card={card} key={card.id} data={card.data} />
      ))}
    </div>
  );
}
