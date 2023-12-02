
import {makeStyles, withStyles} from "@material-ui/core/styles";
import createStyles from "@material-ui/core/styles/createStyles";
import Radio from "@material-ui/core/Radio";

export const matSwitchStyle = createStyles({
  root: {
    width: '6.4rem',
    height: '3.4rem',
    padding: 0,
    display: 'flex',
    margin: '1rem 0'
  },
  switchBase: {
    padding: 1,
    transform: 'translateX(2px) translateY(2px)',
    color: 'white',
    '&$checked': {
      transform: 'translateX(3.2rem) translateY(2px)',
      color: 'white',
      '& + $track': {
        opacity: 1,
        backgroundColor: '#005078',
        borderColor: 'white',
      },
    },
  },
  thumb: {
    width: '2.8rem',
    height: '2.8rem',
    boxShadow: 'none'
  },
  track: {
    color:'white',
    border: `1px solid #d8d8d8`,
    borderRadius: '1.6rem',
    opacity: 1,
    backgroundColor: '#d8d8d8',
  },
  checked: {},
})

export const matDropDownStyle = makeStyles({
  label: {
    marginLeft: '0.4rem',
    fontSize: '1.2rem',
    color: 'grey',
    "&.Mui-focused": {
      color: 'grey', // to overwrite the default behaviour
    }
  },
  select: {
    width: '20rem',
    color: '#2a2a2a',
    fontSize: '1.6rem',
    borderColor: '#d8d8d8',
    borderStyle: 'solid',
    borderWidth: '1px',
    borderRadius: '0',
    backgroundColor: '#fff',
    "&:hover": {
      borderColor: '#d8d8d8',
    },
    "&:focus": {
      borderRadius: '0',
    },
  },
  selectForOtherFilter:{
    width: '27rem',
  },
  selectForRouterFilter:{
    width: '27rem',
  },
  selectForSdoPositonsFilter:{
    width: '38.7rem',
  },
  selectForSdoRequestFilter:{
  width: '16rem',
  },
  selectForFavourites:{
    width: '29.6rem',
    borderColor: '#000',
    "&:hover": {
      borderColor: '#000',
    }
  },
  icon: {
    background: '#ebebeb',
    color: '#737373',
    width: '4rem',
    height: '4.8rem',
    position: 'absolute',
    userSelect: 'none',
    pointerEvents: 'none',
    top: 0,
    right: 0
  },
  list: {
    borderRadius: '0',
    paddingTop: '0',
    paddingBottom: '0',
    background: 'white',
    "& li.Mui-selected": {
      fontWeight: 700
    }
  }
})

export const matRadio = makeStyles( {
  radioStyle: {
    color: '#005078'
  }
})

export const StyledRadio = withStyles({
  root: {
    color: "#97999c",
    '&$checked' : {
      color: '#005078',
    }
  },
  checked: {}
})(Radio)

export const matAutocompleteStyle = makeStyles({
  endAdornment: {
    display: 'none'
  },
  autocomplete: {
      "& .MuiInput-formControl": {
          marginTop: 0
      },
      "& .MuiAutocomplete-popper": {
          fontSize: "1.6rem"
      },
      "& .MuiSvgIcon-fontSizeSmall" : {
          fontSize: "1.75rem"
      }
  },
  textField: {
      "& .MuiInputBase-root": {
          border: "1px solid rgb(226,226,226)",
          borderRadius: 0,
          height: "5rem",
          paddingLeft:'1rem',
          width: "26rem",
      },
      "& .MuiInput-input": {
          color: '#2a2a2a', 
          fontSize: "1.6rem", 
          fontWeight: 600,
          marginTop: "1.4rem",
      },
      "& .MuiFormLabel-filled": {
          marginTop: '0.7rem',
        },
      "& .Mui-focused": {
          backgroundColor: '#f3f3f3', 
          borderColor: "transparent",
      },
  },
  textFieldLabel: {
      backgroundColor: 'transparent',
      fontSize: "1.6rem",
      fontFamily: "Open Sans",
      fontWeight: 600,
      marginLeft:'1rem',
      marginTop: '-0.7rem',
      zIndex: 3,

      "&.Mui-focused": {
          backgroundColor: 'transparent', 
          borderColor: "transparent",
          marginTop: '0.7rem',
      },
  },
})

export const matTextNumberStyle = makeStyles({
  textField: {
      border: "1px solid rgb(226,226,226)",
      borderRadius: 0,
      height: "5rem",
      width: "14.5rem",

      "& .MuiInput-input": {
        color: '#2a2a2a', 
        fontSize: "1.6rem", 
        fontWeight: 600,
      },
      "& .MuiFormLabel-filled": {
        fontSize: "1.4rem",
      },
      "& .Mui-disabled": {
        backgroundColor: '#f3f3f3'
      }
  },
  textFieldAppNumber: {
    minWidth: "14.5rem",
  },
  textFieldLabel: {
      backgroundColor: 'transparent',
      fontSize: "1.6rem",
      fontFamily: "Open Sans",
      fontWeight: 600,
      paddingLeft:'1rem',
      marginTop: '0.3rem',
      zIndex: 3,

      "&.Mui-focused": {
          backgroundColor: 'transparent', 
          borderColor: "transparent",
          fontSize: "1.4rem",
      },
  },
})