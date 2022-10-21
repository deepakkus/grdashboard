import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from "@material-ui/core/MenuItem";
import {Modal, Button, Grid} from 'semantic-ui-react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Chip from '@material-ui/core/Chip';
import Select from '@material-ui/core/Select';
import MapPolygon from '../MapPolygon/MapPolygon';
import { withTranslation } from 'react-i18next';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import './addcropform.scss';
//import axios from 'axios';

const theme = createMuiTheme({
    palette: {
      primary: {
        light: "#fff",
        main: "#67bc46",
        dark: "#000",
      },
      secondary: {
        main: "#1A960A",
      },
    },
    typography: {
      useNextVariants: true,
    },
        textField: {
        color: "green",    
        '&:hover': {
                backgroundColor: 'green',
          },
          '&$focused': {
            backgroundColor: 'green',
            boxShadow: 'green 0.25 0 0 0 2px',
            borderColor: 'green',
          }
    },
    checkbox: {
        color: 'green',
        '&$checked': {
          color: 'green',
        },
      }
  });

class AddCropForm extends Component {

    state= {
        errorMsg: false,
        // snackbarOpen: false,
        cropType: this.props.cropTypes ? (this.props.croptypes[0]._id) : null,
        seedType: this.props.seedTypes ? (this.props.seedtypes[0]._id) : null,
        cultivationType: this.props.cultivationTypes ? (this.props.cultivationtypes[0]._id) : null,
        startDate: null,
        endDate: null,
        confirmed: false,
        dateError: false,
        chips: [],
        field: this.props.fieldId ? this.props.fieldId : null,
        polygon: null, //=  props.userFarms.location
        center: null//=  props.userFarms.address.location
    }

    handleFieldChange = (e) => {
        this.setState({field: e.target.value,
            polygon: this.props.fields.find(field => e.target.value === field._id).location
                ,center: this.props.fields.find(field => e.target.value === field._id).address.location
        });
    }
    handleCropChange = (e) => {
        this.setState({cropType: e.target.value});
    }
    handleSeedChange = (e) => {
        this.setState({seedType: e.target.value});
    }
    handleStartDateChange = (e) => {
        this.setState({startDate: e.target.value});
    }
    handleEndDateChange = (e) => {
        this.setState({endDate: e.target.value});
    }
    handleCultivationChange = (e) => {
        this.setState({cultivationType: e.target.value});
    }
    handleSnackbarClose = () => {
        // if (reason === 'clickaway') {
        //     return;
        //   }      
          this.setstate({snackbarOpen: false})
    }
    handleCheckBoxChange = () => {
        if(this.state.startDate < this.state.endDate){
            this.setState({confirmed: true})
        }
        else{
            this.setState({confirmed: false})
        }   
    }
    addChip = (chip) => {
        const chips = this.state.chips;
        chips.push(chip);
        this.setState(chips);
    }
    handleDeleteChip = (chip) => {
        const chips = this.state.chips.filter(item => {return item!==chip})
        this.setState({chips});
    }
    handleAddCropSeed = () => {
        let chip = {}
        if(this.state.cropType && this.state.seedType){
            chip = {id: this.state.chips.length+1,
                crop: this.props.croptypes.find(crop => crop._id === this.state.cropType).name,
                seed:this.props.seedtypes.find(seed => seed._id === this.state.seedType).name}
        }
        const boolFound = this.state.chips.find(item => item.crop === chip.crop ? (
            item.seed === chip.seed ? (true) : (false)
        ) 
        : (false))
        if(!boolFound && chip.id)
            this.addChip(chip)
    }

    handleClose = () => {
        this.props.changeDialogDisp();
        this.setState({
            errorMsg: false,
            // snackbarOpen: false,
            cropType: this.props.cropTypes ? (this.props.croptypes[0]._id) : (""),
            seedType: this.props.seedTypes ? (this.props.seedtypes[0]._id) : (""),
            cultivationType: this.props.cultivationTypes ? (this.props.cultivationtypes[0]._id) : (""),
            startDate: "",
            endDate: "",
            confirmed: false,
            dateError: false,
            chips: [],
            field: null,
            polygon: null, //=  props.userFarms.location
            center: null//=  props.userFarms.address.location        
          });    
    };

    handleSubmit = () => {
        if(this.state.confirmed){
            this.props.changeDialogDisp();
            const listCropSeed = []
            this.state.chips.map(chip => {
                listCropSeed.push({cropId: this.props.croptypes.find(crop => crop.name === chip.crop)._id
                    , seedId: this.props.seedtypes.find(seed => seed.name === chip.seed)._id})
            })
            const cropCycle = {
                    cropSeeds: listCropSeed,
                    startDate: this.state.startDate,
                    endDate: this.state.endDate,
                    farmId: this.state.field,
                    cultivationId: this.state.cultivationType,
                    isPast: false
            };
            this.props.onSubmit(cropCycle);
              this.setState({
                errorMsg: false,
                // snackbarOpen: false,
                cropType: this.props.cropTypes ? (this.props.croptypes[0]._id) : (""),
                seedType: this.props.seedTypes ? (this.props.seedtypes[0]._id) : (""),
                cultivationType: this.props.cultivationTypes ? (this.props.cultivationtypes[0]._id) : (""),
                startDate: "",
                endDate: "",
                confirmed: false,
                dateError: false,
                chips: [],
                field: null,
                polygon: null, //=  props.userFarms.location
                center: null//=  props.userFarms.address.location        
              });    
        }
        else{
            this.setState({errorMsg: true})
        }
    };

    componentDidUpdate(){
        if(this.props.croptypes && !this.state.cropType){
            this.setState({cropType: this.props.croptypes ? this.props.croptypes[0]._id : ''})
        }
        if(this.props.seedtypes && !this.state.seedType){
            this.setState({seedType: this.props.seedtypes ?  this.props.seedtypes[0]._id : ''})
        }
        if(this.props.cultivationtypes && !this.state.cultivationType){
            this.setState({cultivationType: this.props.cultivationtypes ?  this.props.cultivationtypes[0]._id : ''})
        }
        if(this.props.fields && !this.state.field)
        {
            this.setState({field: this.props.fields ?  this.props.fields[0]._id : ''})
        }
        if(this.state.field && !this.state.center && !this.state.polygon)
        {
            this.setState({polygon: this.props.fields.find(field => field._id === this.state.field).location, 
                center: this.props.fields.find(field => field._id === this.state.field).address.location})
        }
        if(this.state.startDate && this.state.endDate){
            if(this.state.endDate < this.state.startDate && this.state.dateError === false)
            {
                this.setState({dateError: true, confirmed: false});
            }
                
            if(this.state.endDate > this.state.startDate && this.state.dateError === true){
                this.setState({dateError: false});
            }   
        }
    }
    
    render(){
        const {t} = this.props
    return (
    <MuiThemeProvider theme={theme}>
      <Modal open={this.props.open} onClose={this.handleClose} aria-labelledby="form-dialog-title" style = {{position : "relative"}}>
        <Modal.Header>{t('cc-form-title')}</Modal.Header>
        <Modal.Content>
            <Grid columns={2}>
                <Grid.Column width={4}>
                    <Select 
                    className="farmFields mr-4 mt-2 w-50"
                    defaultValue= {this.props.fieldId}
                    onChange={this.handleFieldChange}
                    >
                    {this.props.fields ? 
                        (this.props.fields.map((option) => (
                        <MenuItem key={option._id} value={option._id}>
                            {option.farmName}
                        </MenuItem>
                        ))) : (<MenuItem disabled>{t('empty-option')}</MenuItem>)}
                    </Select>            
            <MapPolygon editable={false} polygon={this.state.polygon} center={this.state.center} className="mapCrop"/>
            </Grid.Column>
                <Grid.Column width={12}>
                    <Grid.Row>
                        <TextField
                        id="outlined-select-crop"
                        label={t('crop-label')}
                        select
                        defaultValue={this.props.croptypes[0] ? (this.props.croptypes[0]._id) : ("Select a Crop")}
                        onChange = {this.handleCropChange}
                        variant="outlined"
                        className="mr-4 ml-4 mt-2 w-25"
                        helperText={t('crop-helper')}
                        InputLabelProps={{
                        shrink: true,
                        }}
                        >
                            {this.props.croptypes ? 
                            (this.props.croptypes.map((option) => (
                            <MenuItem key={option._id} value={option._id}>
                                {option.name}
                            </MenuItem>
                            ))) : (<MenuItem disabled>{t('empty-option')}</MenuItem>)}

                        </TextField>
                        <TextField
                                id="outlined-select-seed"
                                label={t('seed-label')}
                                select
                                className="mr-4 ml-4 mt-2 w-25"
                                variant="outlined"
                                defaultValue={this.props.seedtypes[0] ? (this.props.seedtypes[0]._id) : ("")}
                                helperText={t('seed-helper')}
                                onChange={this.handleSeedChange}
                                InputLabelProps={{
                                shrink: true,
                                }}
                        >
                            {this.props.seedtypes ? 
                            (this.props.seedtypes.map((option) => (
                            <MenuItem key={option._id} value={option._id}>
                                {option.name}
                            </MenuItem>
                            ))) : (<MenuItem disabled>{t('empty-option')}</MenuItem>)}
                        </TextField>
                        <Button className="semantic-button" color='green' onClick={this.handleAddCropSeed}>
                        {t('add-crop')}
                        </Button>
                    </Grid.Row>
                <Grid.Row>
                    {this.state.chips.map((chip) => (
                        <Chip
                            key= {chip.id}
                            className= "ml-4 my-3"
                            size="small"
                            //icon={}
                            label={chip.crop + ": "+ chip.seed}
                            onDelete={() => this.handleDeleteChip(chip)}
                        />
                    ))}
                </Grid.Row>
                <Grid.Row>
                    <TextField
                        id="sdate"
                        label={t('starting-date-label')}
                        type="date"
                        className="mr-4 ml-4 mt-2 w-25"
                        //defaultValue={new Date().toLocaleDateString()}
                        variant="outlined"
                        helperText={t('starting-date-helper')}
                        onChange={this.handleStartDateChange}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                        <TextField error
                            id="edate"
                            label={t('endDatelabel')}
                            type="date"
                            className="mr-4 ml-4 mt-2 w-25"
                            // defaultValue={new Date()}
                            error={this.state.dateError}
                            variant="outlined"
                            onChange={this.handleEndDateChange}
                            helperText={t('ending-date-error')}
                            InputLabelProps={{
                            shrink: true
                            }}
                        />
                </Grid.Row>
                <Grid.Row>
                    <TextField
                        id="outlined-select-cultivation"
                        label={t('cultivationlabel')}
                        select
                        variant="outlined"
                        className="mr-4 ml-4 mt-2 w-25"
                        defaultValue={this.props.cultivationtypes[0] ? (this.props.cultivationtypes[0]._id) : ("")}
                        helperText={t('cultivation-helper')}
                        onChange={this.handleCultivationChange}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    >
                        {this.props.cultivationtypes ? 
                        (this.props.cultivationtypes.map((option) => (
                        <MenuItem key={option._id} value={option._id}>
                        {option.name}
                        </MenuItem>
                        ))) : (<MenuItem disabled>{t('empty-option')}</MenuItem>)}
                    </TextField>
                    <FormControlLabel
                        className="mr-4 ml-4 w-50"
                        control={<Checkbox checked={this.state.confirmed} 
                        onChange={this.handleCheckBoxChange} name="checked" />}
                        label={t('cc-form-checkbox')}
                    />
                </Grid.Row>
                <Grid.Row>
                    {this.state.errorMsg ? (<p style={{position: 'absolute', color: 'red', left:'25%', right:'25%'}}> {t('ccuncheckederror')} </p>) : ("")}
                </Grid.Row>
            </Grid.Column> 
            </Grid>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.handleClose} color="gray">
          {t('cancel')}
          </Button>
          <Button onClick={this.handleSubmit} color="green">
          {t('submit')}
          </Button>
        </Modal.Actions>
      </Modal>
    </MuiThemeProvider>
 );
}
}

export default withTranslation("crop-management")(AddCropForm);