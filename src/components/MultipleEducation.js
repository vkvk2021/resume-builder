import React, {useState, useEffect} from 'react';
// import useLocalStorage from '../hooks/useLocalStorage';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@material-ui/core/Button';

const MultipleEducation = (props) => {
    const {educationInfo, setEducationInfo, setCurrentDisplayEducationKey, prevStep, nextStep} = props;
    // const [maxKey, setMaxKey] = useState(()=>{
    //     const initialValue = JSON.parse(localStorage.getItem('multipleEduMaxKey'))
    //     return initialValue || 1
    // })

    // useEffect(() => {
    //     localStorage.setItem('multipleEduMaxKey', JSON.stringify(maxKey));
    // }, [maxKey])

    const continueStep = (e) => {
        e.preventDefault();

        setCurrentDisplayEducationKey(0);
        nextStep();
    }

    const previousStep = (e) => {
        e.preventDefault();
        prevStep();
    }

    const addNewEducation = (e) => {
        
        let newEducationInfo = educationInfo;
        let nextId = educationInfo[educationInfo.length - 1].id + 1;
        if(!nextId) nextId = 0;
        newEducationInfo = newEducationInfo.concat({
            id:nextId,
            schoolName: "",
            schoolLocation: "",
            startMonth: "",
            startYear: "",
            endMonth: "",
            endYear: "",
            isPresentlyStudying: false,
            degree: "",
            fieldOfStudy: "",
            description: "",
        })
        setCurrentDisplayEducationKey(newEducationInfo.length - 1);
        setEducationInfo(newEducationInfo);
        prevStep();
    }

    const handleEditEducation = (e, eIndex) => {
        setCurrentDisplayEducationKey(eIndex);
        prevStep();
    }
    const handleDeleteEducation = (e, eIndex) => {
        e.stopPropagation();
        let newEducationInfo = educationInfo;
        newEducationInfo = newEducationInfo.filter((education,index)=>{
            return index!==eIndex
        })
        setEducationInfo(newEducationInfo);
    }
  return (
        <>
            <FormControl fullWidth sx={{position:"relative"}}>
                <span className="form-control-title">Education Summary</span>
                <span className="form-control-sub-title"></span>
                <div>
                    {educationInfo?.map((education, index)=>{
                        return (<div className="review-box" key={education.id} onClick={(e)=>handleEditEducation(e, index)}>
                                    <div className="review-sub-box">
                                        <div className="review-id-box">
                                            {index + 1}
                                        </div>
                                        <div className="review-details-box">
                                            <div>
                                                <div className="review-details-heading">
                                                    <strong>{`${education.schoolName || ''} ${education.degree ? ", "+education.degree : ""}`}</strong>{`${education.startMonth? " | "+education.startMonth: ""} ${ education.startYear || ""}${education.endMonth ? " - "+education.endMonth : ""} ${education.endYear || ""}`}
                                                </div>
                                                <div className="review-details-description">
                                                    {`${education.description}`}
                                                </div>
                                            </div>
                                            <div>
                                                <Button
                                                    color="primary"
                                                    onClick={(e)=>handleDeleteEducation(e, index)}
                                                ><i className="fa fa-trash"></i>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>)
                    })}
                </div>
                <Button
                    color="primary"
                    variant="outlined"
                    onClick={(e)=>addNewEducation(e)}
                    style={{margin:"0.5em 0"}}
                    fullWidth
                >Add More
                </Button>
                
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

export default MultipleEducation