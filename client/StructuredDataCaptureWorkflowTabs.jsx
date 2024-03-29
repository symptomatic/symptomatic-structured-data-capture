import React, { Component, useState, useEffect } from 'react';
import { useLocation, useParams } from "react-router-dom";


import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

import {
  fade,
  ThemeProvider,
  MuiThemeProvider,
  withStyles,
  makeStyles,
  createMuiTheme,
  useTheme
} from '@material-ui/core/styles';
import { 
  AppBar, 
  Button, 
  Toolbar, 
  Typography, 
  Input,
  InputLabel,
  TextField,
  InputAdornment,
  FormControl
} from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { green } from '@material-ui/core/colors';

import { get } from 'lodash';



const useStyles = makeStyles(theme => ({
  input: {
    backgroundColor: theme.palette.appBar.main,
    color: theme.palette.appBar.contrastText
  }, 
  searchForm: {
    margin: theme.spacing(1),
    float: 'right',
    marginRight: '10px',
    position: 'absolute',
    bottom: '0px',
    right: '10px'
  }
}));


const useTabStyles = makeStyles(theme => ({
  menu_items: {
    position: 'absolute',
    bottom: '10px',
    left: '0px', 
    display: 'flex', 
    float: 'left', 
    top: '64px', 
    marginTop: '5px', 
    marginLeft: '20px',
    cursor: 'pointer'
  },
  menu_items_right: {
    position: 'absolute',
    bottom: '10px',
    right: '0px', 
    display: 'flex', 
    float: 'right', 
    top: '64px', 
    marginTop: '5px', 
    marginRight: '20px',
    zIndex: 1
  },
  button: {
    margin: theme.spacing(1)
  },
  textField: {
    position: 'absolute',
    right: '20px', 
    width: '200px'
  }
}));



//========================================================================================================

// Global Theming 
  // This is necessary for the Material UI component render layer
  let theme = {
    primaryColor: "rgb(108, 183, 110)",
    primaryText: "rgba(255, 255, 255, 1) !important",

    secondaryColor: "rgb(108, 183, 110)",
    secondaryText: "rgba(255, 255, 255, 1) !important",

    cardColor: "rgba(255, 255, 255, 1) !important",
    cardTextColor: "rgba(0, 0, 0, 1) !important",

    errorColor: "rgb(128,20,60) !important",
    errorText: "#ffffff !important",

    appBarColor: "#f5f5f5 !important",
    appBarTextColor: "rgba(0, 0, 0, 1) !important",

    paperColor: "#f5f5f5 !important",
    paperTextColor: "rgba(0, 0, 0, 1) !important",

    backgroundCanvas: "rgba(255, 255, 255, 1) !important",
    background: "linear-gradient(45deg, rgb(108, 183, 110) 30%, rgb(150, 202, 144) 90%)",

    nivoTheme: "greens"
  }

  // if we have a globally defined theme from a settings file
  if(get(Meteor, 'settings.public.theme.palette')){
    theme = Object.assign(theme, get(Meteor, 'settings.public.theme.palette'));
  }

  const muiTheme = createMuiTheme({
    typography: {
      useNextVariants: true,
    },
    palette: {
      primary: {
        main: theme.primaryColor,
        contrastText: theme.primaryText
      },
      secondary: {
        main: theme.secondaryColor,
        contrastText: theme.errorText
      },
      appBar: {
        main: theme.appBarColor,
        contrastText: theme.appBarTextColor
      },
      cards: {
        main: theme.cardColor,
        contrastText: theme.cardTextColor
      },
      paper: {
        main: theme.paperColor,
        contrastText: theme.paperTextColor
      },
      error: {
        main: theme.errorColor,
        contrastText: theme.secondaryText
      },
      background: {
        default: theme.backgroundCanvas
      },
      contrastThreshold: 3,
      tonalOffset: 0.2
    }
  });



export function GravityWorkflowTabs(props){
  console.log('GravityWorkflowTabs.props', props)
  let value = 0;

  let location = useLocation();
  console.log('GravityWorkflowTabs.location', location)

  function parseIndexFromLocation(pathname){
    switch (pathname) {
      case '/questionnaires':
        return 0;
        break;
      case '/survey':
        return 1;
        break;
      case '/questionnaire-responses':
        return 2;
        break;
      default:
        return 0;
        break;
    }
  }
  let startingIndex = parseIndexFromLocation(location.pathname)

  const classes = useStyles();
  const tabClasses = useTabStyles();
  const [tabIndex, setTabIndex] = useState(0);

  function selectSlide(event, newIndex){
    logger.info('GravityWorkflowTabs.selectSlide', startingIndex);
    setTabIndex(newIndex);    

    switch (newIndex) {
      case 0:
        props.history.replace('/questionnaires')
        break;
      case 1:
        props.history.replace('/survey')
        break;
      case 2:
        props.history.replace('/questionnaire-responses')
        break;
    }   
  }

  let geocodingTab;
  let mapTab;


  return (        
    <div style={{display: 'contents'}}>
      <div >
        <Tabs id="headerNavigationTabs" value={tabIndex} onChange={selectSlide} aria-label="simple tabs example" className={ tabClasses.menu_items }>        
          <Tab id="questionnairesTab" label="Questionnaires" />
          <Tab id="surveyTab" label="Survey" />
          <Tab id="questionnaireResponsesxTab" label="Responses" />
        </Tabs>
        <div id="headerUrl" aria-label="sitename" className={ tabClasses.menu_items_right }>        
          <h3 id="fetchTab">{Session.get('fhirServerEndpoint')}</h3>          
        </div>
      </div>
    </div>
  );
}

export default GravityWorkflowTabs;



