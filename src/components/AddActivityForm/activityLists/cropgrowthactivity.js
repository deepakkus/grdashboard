import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { Grid, Container } from "semantic-ui-react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";



const CropGrowthActivity = (props) => {
    const {landprep, plantseeds, irrigation, cropgrowth, fertilization, harvesting, storage, transportation, marketing} = props;

    return(
        // landprep && <div>hi</div>
        <div>
            <Container>
                <Grid>
                    <Grid.Row columns = {2} className = "mx-0">
                        <Grid.Column>
                            <TextField
                                id="outlined-select-cc"
                                label= "Checking Statistics"
                                fullWidth
                                // className="mr-4 ml-4 mt-2 w-25"
                                variant = "outlined"
                                placeholder = "Checking Statistics"
                                helperText= "Required"
                                // onChange={this.handleCropCycleChange}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                        </Grid.Column>
                        <Grid.Column>
                            <TextField
                                id="outlined-select-cc"
                                label= "Fencing"
                                fullWidth
                                // className="mr-4 ml-4 mt-2 w-25"
                                variant = "outlined"
                                placeholder = "Fencing"
                                helperText= "Required"
                                // onChange={this.handleCropCycleChange}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                        </Grid.Column>
                    </Grid.Row>
                    
                    <Grid.Row columns = {2} className = "ml-0">
                        <Grid.Column>
                            <TextField
                                id="outlined-select-cc"
                                label= "Wire"
                                fullWidth
                                // className="mr-4 ml-4 mt-2 w-25"
                                variant = "outlined"
                                placeholder = "Wire"
                                helperText= "Required" 
                                // onChange={this.handleCropCycleChange}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                        </Grid.Column>
                        <Grid.Column>
                            <TextField
                                id="outlined-select-cc"
                                label= "Wodden"
                                fullWidth
                                // className="mr-4 ml-4 mt-2 w-25"
                                variant = "outlined"
                                placeholder = "Wodden"
                                helperText= "Required"
                                // onChange={this.handleCropCycleChange}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </div>
    )
    
}


export default CropGrowthActivity