import React, { useState, useEffect } from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import Button from "../CustomButtons/Button.js";
import SearchIcon from "@material-ui/icons/Search";
import styles from "assets/jss/material-dashboard-react/components/headerLinksStyle.js";
import { isConstructorDeclaration } from "typescript";


const useStyles = makeStyles(styles);
export default function Search({ searchClient }) {
    const [clientName, setClientName] = useState("");

    const classes = useStyles();

    function changeClientName(e) {

        setClientName(e.target.value);

    }
    function search() {

        searchClient(clientName);

    }
    const BarStyling = { width: "15rem", background: "white", border: "1px solid black" };


    return (
        <>
            <input
                style={{ width: "10rem", outline: 0, border: 0, borderBottom: "0.5px solid gray", background: "none" }}
                // class="form-control border-0"
                // type="text"
                placeholder={"Search Client"}
                onChange={(e) => changeClientName(e)}
            />
            <Button onClick={search} color="white" aria-label="edit" justIcon round >
                <SearchIcon />
            </Button>

        </>
    );


} 