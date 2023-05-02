import React, {useState, useEffect, useRef} from 'react';
// import useLocalStorage from '../hooks/useLocalStorage';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@material-ui/core/Button';
import { Box } from '@mui/system';

const ContactInformation = (props) => {
    const {contactInformation, setContactInformation, setImage, handleLinkChange, handleChange, nextStep} = props;

    // const [maxKey, setMaxKey] = useState(()=>{
    //     const initialValue = JSON.parse(localStorage.getItem('linksMaxKey'))
    //     return initialValue || 0
    // })

    // useEffect(() => {
    //     localStorage.setItem('linksMaxKey', JSON.stringify(maxKey));
    // }, [maxKey])
    
    
    const [firstTimeContinueClick, setFirstTimeContinueClick] = useState(false);
    const [inputProps, setInputProps] = useState({firstNameProps:{}, lastNameProps:{}, jobProps:{}, addressProps:{}, cityProps:{}, stateProps:{}, emailProps:{}});
    
    useEffect(()=>{
        const {firstName, lastName, jobTitle, address, city, state, email} = contactInformation;
        if(firstTimeContinueClick){
            if(firstName !== "")  {
                setInputProps(prevInputProps => ({...prevInputProps, firstNameProps: {error: false, helperText:" "}}));
            }
            if(lastName !== "") {
                setInputProps(prevInputProps => ({...prevInputProps, lastNameProps: {error: false, helperText:" "}}));
            }
            if(jobTitle !== "") {
                setInputProps(prevInputProps => ({...prevInputProps, jobProps: {error: false, helperText:" "}}));
            }
            if(address !== "") {
                setInputProps(prevInputProps => ({...prevInputProps, addressProps: {error: false, helperText:" "}}));
            }
            if(city !== "") {
                setInputProps(prevInputProps => ({...prevInputProps, cityProps: {error: false, helperText:" "}}));
            }
            if(state !== "") {
                setInputProps(prevInputProps => ({...prevInputProps, stateProps: {error: false, helperText:" "}})); 
            }
            if(email !== "") {
                setInputProps(prevInputProps => ({...prevInputProps, emailProps: {error: false, helperText:" "}}));
            }
            if(email.match(/^\S+@\S+\.\S+$/)){
                setInputProps(prevInputProps => ({...prevInputProps, emailProps: {error: false, helperText:" "}}));
            }
        }
        
    },[contactInformation])

    const states = [
        {
          value: 'haryana',
          label: 'Haryana',
        },
        {
          value: 'punjab',
          label: 'Punjab',
        },
        {
          value: 'uttarPradesh',
          label: 'Uttar Pradesh',
        },
        {
          value: 'bihar',
          label: 'Bihar',
        },
        {
          value: 'himachalPradesh',
          label: 'Himachal Pradesh',
        },
      ];

    const continueStep = (e) => {
        e.preventDefault();
        const {firstName, lastName, jobTitle, address, city, state, email} = contactInformation;
        if(firstName === "" || lastName === "" ||  jobTitle === "" || address === "" || city === "" || state === "" || email === "" || !email.match(/^\S+@\S+\.\S+$/)){

            if(firstName === "") {
                setInputProps(prevInputProps => ({...prevInputProps, firstNameProps: {error: true, helperText:"First name is required"}}));
            }
            if(lastName === "") {
                setInputProps(prevInputProps => ({...prevInputProps, lastNameProps: {error: true, helperText:"Last name is required"}}));
            }
            if(jobTitle === "") {
                setInputProps(prevInputProps => ({...prevInputProps, jobProps: {error: true, helperText:"Job Title is required"}}));
            }
            if(address === "") {
                setInputProps(prevInputProps => ({...prevInputProps, addressProps: {error: true, helperText:"Address is required"}})); 
            }
            if(city === "") {
                setInputProps(prevInputProps => ({...prevInputProps, cityProps: {error: true, helperText:"City is required"}}));
            }
            if(state === "") {
                setInputProps(prevInputProps => ({...prevInputProps, stateProps: {error: true, helperText:"State is required"}})); 
            }
            if(email === "") {
                setInputProps(prevInputProps => ({...prevInputProps, emailProps: {error: true, helperText:"Email is required"}}));
            }
            else if(!email.match(/^\S+@\S+\.\S+$/)){
                setInputProps(prevInputProps => ({...prevInputProps, emailProps: {error: true, helperText:"Please enter a valid email"}}));
            }
            setFirstTimeContinueClick(true);
            return;
        }
        setFirstTimeContinueClick(false);
        nextStep();
    }
    
    const handleOnImageChange = (e) => {
        const file = e.target.files;
        if (file && file[0] && file[0].type === "image/jpeg" || file[0].type === "image/png") {
            setImage(URL.createObjectURL(file[0]));
        }
    }

    const handleToggleLinks = (e) => {
        const linksDiv = document.querySelector('.links-div');
        const plusIcon = document.querySelector('.plus-icon');
        const minusIcon = document.querySelector('.minus-icon');

        linksDiv.classList.toggle('no-show');
        plusIcon.classList.toggle('no-show');
        minusIcon.classList.toggle('no-show');
        setContactInformation(prevContactInfo => ({...prevContactInfo, showLinks: !(prevContactInfo.showLinks)}));
    }
    const addMoreLinks = (e) => {
        // const maxKeyValue = maxKey;
        let newLinks = contactInformation?.links;
        let nextId = newLinks[newLinks.length - 1]?.id + 1;
        if(!nextId) nextId = 0;
        newLinks = newLinks.concat({id:nextId, label:"", link: ""})
        // console.log("newLinks", newLinks);
        setContactInformation(prevContactInfo => ({...prevContactInfo, links:newLinks}));
        
        // setMaxKey(prevKey=>prevKey+1);
    }

    const handleDeleteLink = (e, linkIndex) => {
        let newLinks = contactInformation?.links;
        newLinks = newLinks.filter((link,index)=>{
            return index!==linkIndex
        })
        setContactInformation(prevContactInfo => ({...prevContactInfo, links:newLinks}));
    }

  return (
        <>
            <FormControl fullWidth>
                <span className="form-control-title">Contact Information</span>
                <span className="form-control-sub-title">Include at minimum your email and phone number</span>
                {/* {console.log("inputProps",inputProps)} */}
                <div>
                    <TextField
                        {...{...inputProps}.firstNameProps}
                        variant="standard"
                        label="First Name"
                        onChange={handleChange('firstName')}
                        defaultValue={contactInformation.firstName}
                        margin="normal"
                        sx={{width: "47%", marginRight: "6%"}}
                    />
                
                    <TextField
                        {...{...inputProps}.lastNameProps}
                        variant="standard"
                        label="Last Name"
                        onChange={handleChange('lastName')}
                        defaultValue={contactInformation.lastName}
                        margin="normal"
                        sx={{width: "47%"}}
                    />
                </div>
                <div style={{display: "flex", alignItems:"center"}}>
                    <TextField
                        {...{...inputProps}.jobProps}
                        variant="standard"
                        label="Job Title"
                        onChange={handleChange('jobTitle')}
                        defaultValue={contactInformation.jobTitle}
                        margin="normal"
                        sx={{width: "47%", marginRight: "6%"}}
                    />
                    {/* <FormControl>
                    <InputLabel id="browse-button-label">Profile Image</InputLabel>
                    <Button
                        labelId="browse-button-label"
                        color="primary"
                        size="small"
                        onClick={(e)=>continueStep(e)}
                        sx={{border: "1px solid blue", marginTop:"40px"}}
                    >Browse
                    </Button>
                    </FormControl> */}
                    <Box component="span">
                        <span style={{color:"#5d5d5d"}}>Profile Image</span>
                        <label className="file-upload" htmlFor="profile-image-file">Browse</label>
                        <input style={{display: "none"}} type="file" id="profile-image-file" name="profile-image-file" onChange={(e)=>handleOnImageChange(e)}></input>
                    </Box>
                </div>
                <TextField
                    {...{...inputProps}.addressProps}
                    variant="standard"
                    label="Address"
                    onChange={handleChange('address')}
                    defaultValue={contactInformation.address}
                    margin="normal"
                    fullWidth
                />
                <div>
                    <TextField
                        {...{...inputProps}.cityProps}
                        variant="standard"
                        label="City"
                        onChange={handleChange('city')}
                        defaultValue={contactInformation.city}
                        margin="normal"
                        sx={{width: "30%", marginRight: "3%"}}
                    />
                    
                    <TextField
                        {...{...inputProps}.stateProps}
                        select
                        variant="standard"
                        label="State"
                        onChange={handleChange('state')}
                        defaultValue={contactInformation.state}
                        margin="normal"
                        sx={{width: "30%", marginRight: "3%"}}
                    >
                        {states.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        variant="standard"
                        label="Zip"
                        onChange={handleChange('zip')}
                        defaultValue={contactInformation.zip}
                        helperText=" "
                        margin="normal"
                        sx={{width: "30%"}}
                    />
                </div>
                <div>
                    <TextField
                        variant="standard"
                        label="Phone"
                        onChange={handleChange('phone')}
                        defaultValue={contactInformation.phone}
                        helperText=" "
                        margin="normal"
                        sx={{width: "47%", marginRight: "6%"}}
                    />
                    
                    <TextField
                        {...{...inputProps}.emailProps}
                        variant="standard"
                        label="Email"
                        onChange={handleChange('email')}
                        defaultValue={contactInformation.email}
                        margin="normal"
                        sx={{width: "47%"}}
                    />
                </div>
                <span className="link-enabler" onClick={(e)=>handleToggleLinks(e)}>
                    <i className="fa-solid fa-plus plus-icon no-show"></i>
                    <i className="fa-solid fa-minus minus-icon"></i>
                     Add Social Portfolio Links 
                </span>
                <div className="links-div">
                    {contactInformation?.links?.map((link, index)=>{
                        return  <div key={link.id}>
                                    <TextField
                                        variant="standard"
                                        label="Label"
                                        onChange={handleLinkChange(index, 'label')}
                                        defaultValue={contactInformation?.links[index]?.label}
                                        margin="normal"
                                        sx={{width: "44%", marginRight: "3%"}}
                                    />
                                    <TextField
                                        variant="standard"
                                        label="Link"
                                        onChange={handleLinkChange(index, 'link')}
                                        defaultValue={contactInformation?.links[index]?.link}
                                        margin="normal"
                                        sx={{width: "44%"}}
                                    />
                                    <Button
                                        color="primary"
                                        onClick={(e)=>handleDeleteLink(e, index)}
                                        style={{width:"9%",verticalAlign:"bottom", marginBottom:"0.2em"}}
                                    ><i className="fa fa-trash"></i>
                                    </Button>  
                                </div>
                        })
                    }
                            <Button
                                color="primary"
                                variant="outlined"
                                onClick={(e)=>addMoreLinks(e)}
                                style={{margin:"1em 0"}}
                                fullWidth
                            >Add One More
                            </Button>
                        
                    
                </div>
                <div className="flex-btn-group">
                    <div className="btn">
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={(e)=>continueStep(e)}
                            style={{margin:"0 0 0.2em 0"}}
                        >Continue
                        </Button>
                    </div>
                </div>
                
            </FormControl>
        </>
    )
}

export default ContactInformation