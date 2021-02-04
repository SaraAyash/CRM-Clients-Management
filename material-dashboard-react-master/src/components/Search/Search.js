import React, {useState,useEffect} from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import Button from "../CustomButtons/Button.js";
import SearchIcon from "@material-ui/icons/Search";
import styles from "assets/jss/material-dashboard-react/components/headerLinksStyle.js";
import { isConstructorDeclaration } from "typescript";


const useStyles = makeStyles(styles);
export default function Search(props) {
    const [clientName,setClientName] = useState("");
 
    const classes = useStyles();
 
    function changeClientName(name){
        setClientName({ClientName:name})
    }
// onChange={   (e) => changeClientName(e.target.value)}
    return (
        <div>
            <div className={classes.searchWrapper}>
                <input type="text" placeholder="search client" ></input>

                <Button color="white" aria-label="edit" justIcon round onChange={(e) => props.searchClient({clientName})}>
                    <SearchIcon />
                </Button>

            </div>
            <div>{clientName}</div>
        </div >
    );


}
