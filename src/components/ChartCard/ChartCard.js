import React from "react";
import { Grid, Segment, Responsive } from "semantic-ui-react";
import { ComposedChart,  AreaChart, Area, LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "./ChartCard.scss";
import Stroke from "ol/style/Stroke";

export default function ChartCard({ card, data }) {
  console.log(card.info)
  return card ? (
    <Segment raised className="right-segment">
      <Grid.Row
        className="spaceBetween"
      >
        {/* <Grid.Column width={6}> */}
        {card ? (
          <div className=" pl-3 gray chartInfo" >
            <h6 className="green" style={{fontSize : "17px" , fontWeight : "bold"}}>{card.name} </h6>
            <div className="">
              <h6 className="size-standard-chart">Low {card.name}</h6>
              {/* <h6 className="size-s1-chart">{card.info && card.info.L} </h6> */}
              <h6 className="size-s1-chart">Apply limestone</h6>
            </div>
            <div className="pt-3">
              <h6 className="size-standard-chart">High {card.name}</h6>
              {/* <h6 className="size-s1-chart">{card.info && card.info.H} </h6> */}
              <h6 className="size-s1-chart">Apply sulphur or gypsum</h6>

            </div>
            <div className="pt-3">
              <h6 className="size-standard-chart">Normal {card.name}</h6>
              <h6 className="size-s1-chart">Maintain</h6>
            </div>
          </div>
        ) : (
          ""
        )}
      
        {data.length && card ? (
          <>
          <Responsive minWidth = {768} maxWidth = {1023.98}>
            <ResponsiveContainer width={250} height={200}>
              <ComposedChart
                width={300}
                
                data={data}
                margin={{ top: 50, right: 30, left: -10, bottom: 0 }}
                className="line-chart"
              >
                <defs>
                <linearGradient id="plotstyle" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1CB973" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#1CB973" stopOpacity={0}/>
                </linearGradient>
                </defs>
                <XAxis dataKey="day" type="category" className="x-axis" tickLine={true} minTickGap={9} tickMargin={7}/>
                <YAxis className="y-axis" />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#1CB973" strokeWidth={4} fillOpacity={1} fill="url(#plotstyle)" />
              </ComposedChart>
            </ResponsiveContainer>
          </Responsive>
          <Responsive minWidth = {1024}>
            <ResponsiveContainer width={400} height={200}>
              <ComposedChart
                width={300}
                
                data={data}
                margin={{ top: 10, right: 30, left: -10, bottom: 0 }}
                className="line-chart"
              >
                <defs>
                <linearGradient id="plotstyle" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1CB973" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#1CB973" stopOpacity={0}/>
                </linearGradient>
                
                </defs>
                <XAxis dataKey="day" type="category" className="x-axis" tickLine={true} minTickGap={9} tickMargin={7}/>
                <YAxis className="y-axis" />
                
                <Tooltip />
                
              

                <Area type="monotone" dataKey="value" stroke="#1CB973" strokeWidth={4} fillOpacity={1} fill="url(#plotstyle)" />
              </ComposedChart>


            </ResponsiveContainer>
          </Responsive>
          </>
        ) : (
          <p style={{ margin: " auto  " }}>No data found </p>
        )}
        
      </Grid.Row>
    </Segment>
  ) : (
    ""
  );
}



