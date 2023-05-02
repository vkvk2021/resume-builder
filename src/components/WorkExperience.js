import React, {useState, useEffect} from 'react';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@material-ui/core/Button';

const WorkExperience = (props) => {
    const {workInfo, workExpKey:wKey, handleChange, prevStep, nextStep} = props;
    
    const [firstTimeContinueClick, setFirstTimeContinueClick] = useState(false);
    const [inputProps, setInputProps] = useState({positionProps:{}, companyNameProps:{}, descriptionProps:{}});

    useEffect(()=>{
        const {position, companyName, description} = workInfo[wKey];
        if(firstTimeContinueClick){
            if(position !== "")  {
                setInputProps(prevInputProps => ({...prevInputProps, positionProps: {error: false, helperText:" "}}));
            }
            if(companyName !== "") {
                setInputProps(prevInputProps => ({...prevInputProps, companyNameProps: {error: false, helperText:" "}}));
            }
            if(description !== "") {
                setInputProps(prevInputProps => ({...prevInputProps, descriptionProps: {error: false, helperText:" "}}));
            }
        }
        
    },[workInfo[wKey]])

    const months = [
        { value: 'January', label: 'January'},
        { value: 'February', label: 'February'},
        { value: 'March', label: 'march'},
        { value: 'April', label: 'April'},
        { value: 'May', label: 'May'},
        { value: 'June', label: 'June'},
        { value: 'July', label: 'July'},
        { value: 'August', label: 'August'},
        { value: 'September', label: 'September'},
        { value: 'October', label: 'October'},
        { value: 'November', label: 'November'},
        { value: 'December', label: 'December'},
      ];
    const years = [
        { value: 2022, label: '2022'},
        { value: 2021, label: '2021'},
        { value: 2020, label: '2020'},
        { value: 2019, label: '2019'},
        { value: 2018, label: '2018'},
        { value: 2017, label: '2017'},
        { value: 2016, label: '2016'},
        { value: 2015, label: '2015'},
        { value: 2014, label: '2014'},
        { value: 2013, label: '2013'},
      ];
    
    
    const continueStep = (e) => {
        e.preventDefault();
        const {position, companyName, description} = workInfo[wKey];
        if(position === "" || companyName === "" || description === ""){

            if(position === "")  {
                setInputProps(prevInputProps => ({...prevInputProps, positionProps: {error: true, helperText:"Position is required"}}));
            }
            // else setInputProps(prevInputProps => ({...prevInputProps, positionProps: {error: false, helperText:" "}}));

            if(companyName === "") {
                setInputProps(prevInputProps => ({...prevInputProps, companyNameProps: {error: true, helperText:"Company Name is required"}}));
            }
            // else setInputProps(prevInputProps => ({...prevInputProps, companyNameProps: {error: false, helperText:" "}}));

            if(description === "") {
                setInputProps(prevInputProps => ({...prevInputProps, descriptionProps: {error: true, helperText:"Description is required"}}));
            }
            // else setInputProps(prevInputProps => ({...prevInputProps, companyNameProps: {error: false, helperText:" "}}));
            
            setFirstTimeContinueClick(true);
            return;
        }
        setFirstTimeContinueClick(false);
        nextStep();
    }

    const previousStep = (e) => {
        e.preventDefault();
        prevStep();
    }

  return (
        <>
            <FormControl fullWidth sx={{position:"relative"}}>
                <span className="form-control-title">Recent Professional Experience</span>
                <span className="form-control-sub-title">Add your most recent job and continue in descending order.</span>
                <div>
                    <TextField
                        {...{...inputProps}.positionProps}
                        variant="standard"
                        label="Position"
                        onChange={handleChange('position', wKey)}
                        defaultValue={workInfo[wKey]?.position}
                        margin="normal"
                        sx={{width: "47%", marginRight: "6%"}}
                    />
                    <TextField
                        {...{...inputProps}.companyNameProps}
                        variant="standard"
                        label="Company Name"
                        onChange={handleChange('companyName', wKey)}
                        defaultValue={workInfo[wKey]?.companyName}
                        margin="normal"
                        sx={{width: "47%"}}
                    />
                </div>
                <div>
                    <TextField
                        select
                        variant="standard"
                        label="Start Month"
                        onChange={handleChange('startMonth', wKey)}
                        defaultValue={workInfo[wKey]?.startMonth ? workInfo[wKey].startMonth: ""}
                        margin="normal"
                        sx={{width: "47%", marginRight: "6%"}}
                    >
                        {months.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        select
                        variant="standard"
                        label="Start Year"
                        onChange={handleChange('startYear', wKey)}
                        defaultValue={workInfo[wKey]?.startYear ? workInfo[wKey].startYear : ""}
                        margin="normal"
                        sx={{width: "47%"}}
                    >
                        {years.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
                <div>
                    <TextField
                        select
                        variant="standard"
                        label="End Month"
                        onChange={handleChange('endMonth', wKey)}
                        defaultValue={workInfo[wKey]?.endMonth ? workInfo[wKey].endMonth : ""}
                        margin="normal"
                        sx={{width: "47%", marginRight: "6%"}}
                    >
                        {months.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        select
                        variant="standard"
                        label="End Year"
                        onChange={handleChange('endYear', wKey)}
                        defaultValue={workInfo[wKey]?.endYear ? workInfo[wKey].endYear : ""}
                        margin="normal"
                        sx={{width: "47%"}}
                    >
                        {years.filter((year,index)=>((index+1)!==years.length)).map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
                
                <TextField
                    {...{...inputProps}.descriptionProps}
                    multiline
                    minRows={4}
                    label="Description"
                    onChange={handleChange('description', wKey)}
                    defaultValue={workInfo[wKey]?.description}
                    margin="normal"
                    fullWidth
                />
                <div className="flex-btn-group">
                    <div className="btn">
                        <Button
                            color="secondary"
                            variant="contained"
                            onClick={(e)=>previousStep(e)}
                            style={{margin:"0 0 0.2em 0"}}
                        >Back
                        </Button>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={(e)=>continueStep(e)}
                            style={{margin:"0 0 0.2em 0.5em"}}
                        >Continue
                        </Button>
                    </div>
                </div>
                
            </FormControl>
        </>
    )
}

export default WorkExperience