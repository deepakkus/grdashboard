import React,{useState, useEffect} from 'react'
import {useTranslation} from 'react-i18next'
import {Grid, Dropdown, Icon, Responsive} from 'semantic-ui-react'
// download
function TimelineHeading(props) {
    const {t} = useTranslation("crop-management");
    const [activityOptions, setActivityOptions] = useState([])
    const [chosenCC, setChosenCC] = useState([])
    function activitySelector(e, key){
        props.chosenCC(key.value)
        if(e){
            setChosenCC(key.value) //cc _id
        }
    }

    const getDropdownText = (cropItem) => {
        if(props){
        let cropDate = new Date(cropItem.startDate)        
        return(
            cropDate.toLocaleString('en-us', { month: 'short' })+ " " +
            cropDate.getFullYear()+ " " +
            props.userFarms.find(farm =>
                cropItem.farmId === farm._id
            ).farmName + " " +
            cropItem.cropSeeds.map((cropSeed, index) => {
                if(index===0){
                    return `${props.croptypes.find(type => type._id === cropSeed.cropId).name}`
                }
                else{
                    return ` & ${props.croptypes.find(type => type._id === cropSeed.cropId).name}`
                }
            })
        ); 
        }
    } 
    useEffect(() => {
        if(props){
            if(props.userActivities){
                if(props.userActivities.length){
                    if(activityOptions.length < 1){
                        const copyOptions = [];
                    props.currentcropcycles.map(cc => {
                        copyOptions.push({
                            key: cc._id,
                            value: cc._id,
                            text: getDropdownText(cc)
                        });
                    });
                    setActivityOptions(copyOptions);
                }
                if(activityOptions.length > 1 && activityOptions.length< props.userActivities.length){
                    const copyOptions = [];
                    props.userActivities.map(activity => {
                        copyOptions.push({
                            key: activity._id,
                            value: activity._id,
                            text: activity._id
                        });
                    });
                    setActivityOptions(copyOptions);                    
                }
            }
            }
        }
      });
    //   useEffect(() => {
    //     if(!chosenCC){
    //         if(props.currentcropcycles){
    //             setChosenCC(props.currentcropcycles[0]._id)
    //         }
    //     }
    //   }, [chosenCC])
    return(
       

        <div>
            <Responsive minWidth={1450}>
                <Grid columns={2}>
                    <Grid.Row  className="mx-0">
                        <Grid.Column width={16}>
                            <p style={{color: "#B2AFAF", fontWeight:"bold", fontSize: "20px"}}>
                                {t("Activity Logs Of")}
                            </p>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row className="mx-0 p-0">
                        <Grid.Column width={15}>
                            <span fluid style={{color: "#58CB7C", fontSize: "20px", position:"relative", top:"-1rem"}}>
                                { props ? (props.userActivities ? 
                                (<Dropdown text={t('dropdown-text')} inline onChange={(e, key) => activitySelector(e, key)} 
                                options={activityOptions}/>)
                                : (<Dropdown text={t('empty-option')} disabled/>)) : (null)}
                            </span>
                        </Grid.Column>
                        <Grid.Column width={1}>
                            <Icon name="download"/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid> 
            </Responsive>
            <Responsive minWidth={768} maxWidth={1449}>
                <Grid columns={2}>
                    <Grid.Row  className="mx-0">
                        <Grid.Column width={16}>
                            <p style={{color: "#B2AFAF", fontWeight:"bold", fontSize: "20px"}}>
                                {t("Activity Logs Of")}
                            </p>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row className="mx-0 p-0">
                        <Grid.Column width={14}>
                            <span fluid style={{color: "#58CB7C", fontSize: "20px", position:"relative", top:"-1rem"}}>
                                { props ? (props.userActivities ? 
                                (<Dropdown text={t('dropdown-text')} inline onChange={(e, key) => activitySelector(e, key)} 
                                options={activityOptions}/>)
                                : (<Dropdown text={t('empty-option')} disabled/>)) : (null)}
                            </span>
                        </Grid.Column>
                        <Grid.Column width={2} style={{position: "relative", top: "-10px", right: "20px"}}>
                            <Icon name="download"/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid> 
            </Responsive>
        </div>


        // {/* <Grid.Column floated="left" fluid>
        //         <Grid.Row>
        //             <p style={{color: "gray"}}>
        //                 {t("activity-logs-title")}
        //             </p>
        //         </Grid.Row>
        //         <Grid.Row fluid>
        //             <span fluid style={{color: "green"}}>
        //                 { props ? (props.userActivities ? 
        //                 (<Dropdown text={t('dropdown-text')} inline onChange={(e, key) => activitySelector(e, key)} 
        //                 options={activityOptions}/>)
        //                 : (<Dropdown text={t('empty-option')} disabled/>)) : (null)}
        //             </span>
        //         </Grid.Row>
        //     </Grid.Column>
        //     <Grid.Column floated="right" width={2}>
        //         <Icon className="download"/>
        //     </Grid.Column> */}





    )
} 

export default TimelineHeading;