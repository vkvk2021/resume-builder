import React, {useState, useEffect} from 'react';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@material-ui/core/Button';

const Education = (props) => {
    const {educationInfo, educationKey:eKey, handleChange, prevStep, nextStep} = props;

    const [firstTimeContinueClick, setFirstTimeContinueClick] = useState(false);
    const [inputProps, setInputProps] = useState({schoolNameProps:{}, degreeProps:{}});
    // const [currentYear, setCurrentYear] = useState(()=>{
    //     let today = new Date();
    //     return today.getFullYear();
    // })

    useEffect(()=>{
        const {schoolName, degree} = educationInfo[eKey];
        if(firstTimeContinueClick){
            if(schoolName !== "")  {
                setInputProps(prevInputProps => ({...prevInputProps, schoolNameProps: {error: false, helperText:" "}}));
            }
            if(degree !== "") {
                setInputProps(prevInputProps => ({...prevInputProps, degreeProps: {error: false, helperText:" "}}));
            }
        }
        
    },[educationInfo[eKey]])

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
    
    // const getStartYears = () => {
    //     const span = document.createElement('span')
    //     for(let i =0; i<=20; i++){
    //          span.innerHTML.append(
    //             <MenuItem key={currentYear} value={currentYear}>
    //                 {currentYear.toString()}
    //             </MenuItem>
    //         )
    //         setCurrentYear(prevCurrYear => prevCurrYear - 1);
    //     }
    //     return span;
    // }
    const continueStep = (e) => {
        e.preventDefault();
        const {schoolName, degree} = educationInfo[eKey];
        if(schoolName === "" || degree === ""){

            if(schoolName === "")  {
                setInputProps(prevInputProps => ({...prevInputProps, schoolNameProps: {error: true, helperText:"School name is required"}}));
            }
            // else setInputProps(prevInputProps => ({...prevInputProps, schoolNameProps: {error: false, helperText:" "}}));

            if(degree === "") {
                setInputProps(prevInputProps => ({...prevInputProps, degreeProps: {error: true, helperText:"Degree is required"}}));
            }
            // else setInputProps(prevInputProps => ({...prevInputProps, degreeProps: {error: false, helperText:" "}}));
            
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
                <span className="form-control-title">Education</span>
                <span className="form-control-sub-title">Add your most relevant education, including programs you're currently enrolled in.</span>
                <div>
                    <TextField
                        {...{...inputProps}.schoolNameProps}
                        variant="standard"
                        label="School Name"
                        onChange={handleChange('schoolName', eKey)}
                        defaultValue={educationInfo[eKey]?.schoolName}
                        margin="normal"
                        sx={{width: "47%", marginRight: "6%"}}
                    />
                    <TextField
                        variant="standard"
                        label="School Location"
                        onChange={handleChange('schoolLocation', eKey)}
                        defaultValue={educationInfo[eKey]?.schoolLocation}
                        margin="normal"
                        sx={{width: "47%"}}
                    />
                </div>
                <div>
                    <TextField
                        select
                        variant="standard"
                        label="Start Month"
                        onChange={handleChange('startMonth', eKey)}
                        defaultValue={educationInfo[eKey]?.startMonth ? educationInfo[eKey].startMonth : ""}
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
                        onChange={handleChange('startYear', eKey)}
                        defaultValue={educationInfo[eKey]?.startYear ? educationInfo[eKey].startYear : ""}
                        margin="normal"
                        sx={{width: "47%"}}
                    >
                        {/* getStartYears(); */}
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
                        onChange={handleChange('endMonth', eKey)}
                        defaultValue={educationInfo[eKey]?.endMonth ? educationInfo[eKey].endMonth : ""}
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
                        onChange={handleChange('endYear', eKey)}
                        defaultValue={educationInfo[eKey]?.endYear ? educationInfo[eKey].endYear : ""}
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
                    {...{...inputProps}.degreeProps}
                    variant="standard"
                    label="Degree"
                    onChange={handleChange('degree', eKey)}
                    defaultValue={educationInfo[eKey]?.degree}
                    margin="normal"
                    fullWidth
                />
                <TextField
                    variant="standard"
                    label="Field of Study"
                    onChange={handleChange('fieldOfStudy', eKey)}
                    defaultValue={educationInfo[eKey]?.fieldOfStudy}
                    margin="normal"
                    fullWidth
                />
                <TextField
                    multiline
                    minRows={4}
                    label="Description"
                    onChange={handleChange('description', eKey)}
                    defaultValue={educationInfo[eKey]?.description}
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

export default Education