import React,{useEffect,useState} from "react";
import "antd/dist/antd.css";
import styles from "./TimelineLabel.module.css";
import { Timeline, Typography, Space, Row, Col } from "antd";
import { CheckCircleTwoTone } from "@ant-design/icons";
import TimelineHeading from "../TimelineHeading/TimelineHeading";
import { Container, Grid, Icon } from "semantic-ui-react";
const TimelineLabel = (props) => {
  const { Text } = Typography;
  const dotColor = "green";
  const textType = "secondary";
  const [cc, setCC] = useState();
  const [activities, setActivities] = useState([])
  function chosenCC(ccId) {
    setCC(ccId);
  }
  useEffect(() => {
    if(cc){
    if(props){
      if(props.userActivities){
        if(props.userActivities.length > 0){
            const ccActivities = props.userActivities.filter(act => act.cropCycleId === cc)
            ccActivities.sort(function(a,b){
              
              if(a.logDate < b.logDate)
                return -1 
              if(a.logDate > b.logDate)
                return 1
              else
                return 0
              
            })
            setActivities(ccActivities);  
          }
        }
      }
    }
  }, [cc]);
  return (
    
    <Grid columns={1}>
      <Grid.Row  className="mx-0">
        <Grid.Column>
          <TimelineHeading {...props} chosenCC={chosenCC}/>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row className="mx-0">
        <Grid.Column width={16}>
          <Timeline mode="left" className={styles.timelines}>
            {
              activities.map(activity => {
                const log = new Date(activity.logDate)
                return (
                  <Timeline.Item key={activity._id} color={dotColor} label={log.getDay() + log.toLocaleString('en-us', { month: 'short' })}>
                    <Space direction="vertical">
                      <Text type={textType} className={styles.timelineHeading}>
                        {props.activitytypes.find(type => type._id === activity.activityId).name}
                      </Text>
                      <Text type={textType} className={styles.timelinesdesc}>VIEW SOIL CONDITION | VIEW INFO</Text>
                    </Space>
                  </Timeline.Item>
                );  
              })
            }
            <Timeline.Item color={dotColor} label="12 Jan">
              <Space direction="vertical">
                <Text type={textType} className={styles.timelineHeading}>
                  Tilling
                </Text>
                <Text type={textType} className={styles.timelinesdesc}>VIEW SOIL CONDITION | VIEW INFO</Text>
              </Space>
            </Timeline.Item>
            <Timeline.Item color={dotColor} label="19 Jan">
              <Space direction="vertical">
                <Text type={textType} className={styles.timelineHeading}>
                  1st Weekly Soil Report
                </Text>
                <Text type={textType} className={styles.timelinesdesc}>VIEW SOIL CONDITION </Text>
              </Space>
            </Timeline.Item>
            <Timeline.Item color={dotColor} label="22 Jan">
              <Space direction="vertical">
                <Text type={textType} className={styles.timelineHeading}>
                  Seed sowing
                </Text>
                <Text type={textType} className={styles.timelinesdesc}>VIEW SOIL CONDITION | VIEW INFO</Text>
              </Space>
            </Timeline.Item>
            <Timeline.Item color={dotColor} label="10 Feb">
              <Space direction="vertical">
                <Text type={textType} className={styles.timelineHeading}>
                  Irrigation
                </Text>
                <Text type={textType} className={styles.timelinesdesc}>VIEW SOIL CONDITION | VIEW INFO</Text>
              </Space>
            </Timeline.Item>
            <Timeline.Item color={dotColor} label="16 Feb">
              <Space direction="vertical">
                <Text type={textType} className={styles.timelineHeading}>
                  Irrigation <Icon name="check square"/>
                  Prescribed Action
                </Text>
                <Text type={textType} className={styles.timelinesdesc}>VIEW SOIL CONDITION | VIEW INFO</Text>
              </Space>
            </Timeline.Item>
          </Timeline>
        </Grid.Column>
      </Grid.Row>
    </Grid>
    
    // <CheckCircleTwoTone twoToneColor="#52c41a" />
    
    // <Container fluid>
    //   <Container fluid>
    //     <TimelineHeading {...props} chosenCC={chosenCC}/>
    //   </Container>
    //   <Container textAlign="left" fluid>
    //   <Row>
    //     <Col span={18}>
    //       <Timeline mode="left">
    //         {
    //           activities.map(activity => {
    //             const log = new Date(activity.logDate)
    //             return (
    //             <Timeline.Item key={activity._id} color={dotColor} label={log.getDay() + log.toLocaleString('en-us', { month: 'short' })}>
    //             <Space direction="vertical">
    //               <Text type={textType} className={styles.timelineHeading}>
    //                 {props.activitytypes.find(type => type._id === activity.activityId).name}
    //               </Text>
    //               <Text type={textType}>VIEW SOIL CONDITION | VIEW INFO</Text>
    //             </Space>
    //           </Timeline.Item>
    //             );  
    //           })
    //         }
    //         <Timeline.Item color={dotColor} label="12 Jan">
    //           <Space direction="vertical">
    //             <Text type={textType} className={styles.timelineHeading}>
    //               Tilling
    //             </Text>
    //             <Text type={textType}>VIEW SOIL CONDITION | VIEW INFO</Text>
    //           </Space>
    //         </Timeline.Item>
    //         <Timeline.Item color={dotColor} label="19 Jan">
    //           <Space direction="vertical">
    //             <Text type={textType} className={styles.timelineHeading}>
    //               1st Weekly Soil Report
    //             </Text>
    //             <Text type={textType}>VIEW SOIL CONDITION </Text>
    //           </Space>
    //         </Timeline.Item>
    //         <Timeline.Item color={dotColor} label="22 Jan">
    //           <Space direction="vertical">
    //             <Text type={textType} className={styles.timelineHeading}>
    //               Seed sowing
    //             </Text>
    //             <Text type={textType}>VIEW SOIL CONDITION | VIEW INFO</Text>
    //           </Space>
    //         </Timeline.Item>
    //         <Timeline.Item color={dotColor} label="10 Feb">
    //           <Space direction="vertical">
    //             <Text type={textType} className={styles.timelineHeading}>
    //               Irrigation
    //             </Text>
    //             <Text type={textType}>VIEW SOIL CONDITION | VIEW INFO</Text>
    //           </Space>
    //         </Timeline.Item>
    //         <Timeline.Item color={dotColor} label="16 Feb">
    //           <Space direction="vertical">
    //             <Text type={textType} className={styles.timelineHeading}>
    //               Irrigation <CheckCircleTwoTone twoToneColor="#52c41a" />
    //               Prescribed Action
    //             </Text>

    //             <Text type={textType}>VIEW SOIL CONDITION | VIEW INFO</Text>
    //           </Space>
    //         </Timeline.Item>
    //       </Timeline>
    //     </Col>
    //   </Row>
    //   </Container>
    // </Container>
  );
};

export default TimelineLabel;
