import React from 'react'
import { Responsive, Button, Grid, Segment } from 'semantic-ui-react'
import CropList from './croplist'
import CropMenu from './cropmenu'
import TimelineLabel from "../TimelineLabel/TimelineLabel";
import './cropcontainer.scss'
import { Component } from 'react'
import AddCropForm from './addcropform'
import { withTranslation } from 'react-i18next'
import { MenuItem } from '@material-ui/core'


class CropContainer extends Component {
    state = {
        dialogDisp: false,
        cropType: this.props.croptypes.length ? (this.props.croptypes[0]._id) : (""),
        seedType: this.props.seedtypes.length ? (this.props.seedtypes[0]._id) : (""),
        cultivationType: this.props.cultivationtypes.length ? (this.props.cultivationtypes[0]._id) : (""),
        fields: this.props.userFarms.filter(farm => {
            return !!!this.props.currentcropcycles.find(cropCycle => cropCycle.farmId === farm._id)
        }),
        snackbarOpen: false,
        menuActive: "current",
        userCropsList: [],
        cropCurrentList: [],
        cropPastList: []
    }

    clickedIcon = () => {
        return (
            <MenuItem>
                {this.props.t("movecrop")}
            </MenuItem>
        )
    }
    moveCrop = (source, cropCycleId) => {
        if (source === "current") {
            this.moveCropToPast(cropCycleId)
        }
    }

    moveCropToPast = (currentCropId) => {
        const presentCropCycle = this.props.currentcropcycles.find(cropCurrentItem =>
            cropCurrentItem._id === currentCropId)
        presentCropCycle.isPast = true;
        this.props.editCropCycle(presentCropCycle, this.props.userId, this.props.token)
    }

    changeDialogDisp = () => {
        const cropType = this.props.croptypes.length ? (this.props.croptypes[0]._id) : ("")
        const seedType = this.props.seedtypes.length ? (this.props.seedtypes[0]._id) : ("")
        const cultivationType = this.props.cultivationtypes.length ? (this.props.cultivationtypes[0]._id) : ("")
        const bool = this.state.dialogDisp
        this.setState({ dialogDisp: !bool, cropType, seedType, cultivationType });
    }
    changeSnackbarOpen = () => {
        const bool = this.state.snackbarOpen
        this.setState({ snackbarOpen: !bool })
    }
    changeActiveMenu = (newActiveMenu) => {
        this.setState({ menuActive: newActiveMenu })
    }
    onClick = (e) => {
        e.preventDefault();
        this.setState({ dialogDisp: true })
        // return(
        //     <AddCropForm/>
        // )
    }
    onSubmit = (msg) => {
        //e.preventDefault();
        this.props.addCropCycle(msg, this.props.userId, this.props.token)
        // this.setState({snackbarOpen: true})
        // return (<Snackbar open={this.state.snackbarOpen} autoHideDuration={6000} onClose={this.changeSnackbarOpen}>
        //     <Message
        //         compact
        //         content={msg}
        //     />      
        //     </Snackbar>);
    }
    render() {
        const { t } = this.props;
        const sendList = (this.state.menuActive === "current")
            ? (this.props.currentcropcycles ? (this.props.currentcropcycles) : ([]))
            : (this.props.pastcropcycles ? (this.props.pastcropcycles) : ([]));
        const fields = this.props.userFarms.filter(farm => {
            return !!!this.props.currentcropcycles.find(cropCycle => cropCycle.farmId === farm._id)
        })
        const buttonEnabled = fields.length > 0 ? (true) : (false);
        return (
            
            <div>
                <Responsive minWidth={1024}>
                    <Grid container columns={2}>
                        <Grid.Row className="mt-4">
                            <Grid.Column width={8} className="leftCropMenu">
                                <Segment raised style={{ borderRadius: "12px" }}>
                                    <CropMenu menuActive={this.state.menuActive} changeActiveMenu={this.changeActiveMenu} />
                                    
                                        <CropList cropList={sendList} source={this.state.menuActive} moveCrop={this.moveCrop}
                                            userFarms={this.props.userFarms} cropTypes={this.props.croptypes} seedTypes={this.props.seedtypes} />
                                    
                                    <Grid columns={2}>
                                        <Grid.Column>
                                        </Grid.Column>
                                        <Grid.Column textAlign = "center">
                                            {buttonEnabled ? (<Button color="green" className="cropButton" fluid onClick={(e) => this.onClick(e)}> {t('add-button')} </Button>)
                                                : (<Button color="gray" className="cropButton" fluid disabled> {t('add-button')} </Button>)}
                                        </Grid.Column>
                                        <Grid.Column>
                                        </Grid.Column>
                                    </Grid>
                                </Segment>
                                {
                                    fields && fields.length > 0 ? (<AddCropForm open={this.state.dialogDisp} changeDialogDisp={this.changeDialogDisp} onSubmit={this.onSubmit}
                                        fields={fields} fieldId={fields[0]._id} polygon={fields[0].location} center={fields[0].address.location} {...this.props} />)
                                        : null
                                }
                            </Grid.Column>
                            <Grid.Column width={7} className="rightCropMenu">
                                <TimelineLabel {...this.props} />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Responsive>


                <Responsive minWidth = {768} maxWidth = {1023.98}>
                    <Grid container columns={2}>
                        <Grid.Row className="mt-4">
                            <Grid.Column tablet = {8} className="leftCropMenu">
                                <Segment raised style={{ borderRadius: "12px" }}>
                                    <CropMenu menuActive={this.state.menuActive} changeActiveMenu={this.changeActiveMenu} />
                                    <CropList cropList={sendList} source={this.state.menuActive} moveCrop={this.moveCrop}
                                        userFarms={this.props.userFarms} cropTypes={this.props.croptypes} seedTypes={this.props.seedtypes} />
                                    <Grid columns={2}>
                                        <Grid.Column>
                                        </Grid.Column>
                                        <Grid.Column textAlign = "center">
                                            {buttonEnabled ? (<Button color="green" className="cropButton" fluid onClick={(e) => this.onClick(e)}> {t('add-button')} </Button>)
                                                : (<Button color="gray" className="cropButton" fluid disabled> {t('add-button')} </Button>)}
                                        </Grid.Column>
                                        <Grid.Column>
                                        </Grid.Column>
                                    </Grid>
                                </Segment>
                                {
                                    fields && fields.length > 0 ? (<AddCropForm open={this.state.dialogDisp} changeDialogDisp={this.changeDialogDisp} onSubmit={this.onSubmit}
                                        fields={fields} fieldId={fields[0]._id} polygon={fields[0].location} center={fields[0].address.location} {...this.props} />)
                                        : null
                                }
                            </Grid.Column>
                            <Grid.Column tablet={7} className="rightCropMenu">
                                <TimelineLabel {...this.props} />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Responsive>
                
            </div>
        );
    }
}

export default withTranslation('crop-management')(CropContainer);






//     <Container>
            //     <Segment>
            //       <CropMenu menuActive={this.state.menuActive} changeActiveMenu={this.changeActiveMenu}/>
            //       <CropList cropList={sendList} source={this.state.menuActive} moveCrop={this.moveCrop} 
            //       userFarms={this.props.userFarms} cropTypes={this.props.croptypes} seedTypes={this.props.seedtypes}/>
            //       <Grid columns={3}>
            //           <Grid.Column>
            //           </Grid.Column>
            //           <Grid.Column>
            //             {buttonEnabled ? (<Button color="green" fluid onClick={(e) => this.onClick(e)}> {t('add-button')} </Button>) 
            //             : (<Button color="gray" fluid disabled> {t('add-button')} </Button>)}
            //           </Grid.Column>
            //           <Grid.Column>
            //           </Grid.Column>
            //       </Grid>
            //     </Segment>
            //     {
            //         fields ? (<AddCropForm open={this.state.dialogDisp} changeDialogDisp={this.changeDialogDisp} onSubmit={this.onSubmit}
            //             fields={fields} fieldId={fields[0]._id} polygon={fields[0].location} center={fields[0].address.location} {...this.props}/>)
            //             : null 
            //     }
            // </Container>