import React from 'react'
import { List, Segment, Grid, Dropdown } from 'semantic-ui-react'
import { useTranslation } from 'react-i18next';

const CropList = ({ cropList, moveCrop, source, userFarms, cropTypes }) => {
    const { t } = useTranslation("crop-management")
    const onClicked = (cropCycleId) => {
        moveCrop(source, cropCycleId)
    }
    console.log(cropList)

    const list = cropList.length ? (cropList.map(cropItem => {
        let cropDate = new Date(cropItem.startDate)
        return (
            <Segment inverted color='green' key={cropItem._id} className = "crop-indv-list">
                <List.Item className = "crop-indv-listttt">
                    <List.Content>
                        <Grid columns={2}>
                            {/* <Grid.Column width={1}>
                            </Grid.Column> */}
                            <Grid.Row className = "mx-0">
                                <Grid.Column floated = "left" width = {14}>
                                    <List.Header>
                                        {
                                            cropDate.toLocaleString('en-us', { month: 'short' }) + " "
                                        }

                                        {
                                            cropDate.getFullYear() + " "
                                        }

                                        {
                                            userFarms.find(farm =>
                                                cropItem.farmId === farm._id
                                            ).farmName + " "
                                        }

                                        {
                                            cropItem.cropSeeds.map((cropSeed, index) => {
                                                if (index === 0) {
                                                    return `${cropTypes.find(type => type._id === cropSeed.cropId).name}`
                                                }
                                                else {
                                                    return ` & ${cropTypes.find(type => type._id === cropSeed.cropId).name}`
                                                }
                                            })
                                        }

                                    </List.Header>
                                    <Grid.Row className = "mx-0">
                                        <List.Description>
                                            {`${t(source)} ${t("stage")}: `}
                                            {t("irrigation")}
                                        </List.Description>
                                    </Grid.Row>
                                </Grid.Column>
                                {source === "current" ? (
                                <Grid.Column floated="right" width={2}>
                                    <Grid.Row className = "ellipsis-dropdown">
                                        <Dropdown icon="ellipsis vertical">
                                            <Dropdown.Menu >
                                                <Dropdown.Item text={t('toPast')} onClick={() => onClicked(cropItem._id)}  style={{ zindex: '9' }} />
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </Grid.Row>
                                </Grid.Column>
                            ) : (<Grid.Column floated="right" width={2} />)}
                            </Grid.Row>
                        </Grid>
                    </List.Content>
                </List.Item>
            </Segment>

        )
    }
    )) : (<p>
        {t('empty-list')}
    </p>);
    return (
        <div className="cropList">
            <div style={{ overflow: 'auto', maxHeight: '60vh', position: "relative", top: "-40px" }}>
                <Segment.Group horizontal>
                    <List inverted relaxed style={{ width: '100%' }}>
                        {list}
                    </List>
                </Segment.Group>
            </div>
        </div>
    );
}
export default CropList;



