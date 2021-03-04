import React, { useState,useEffect } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import axios from "axios"
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import SaveTwoToneIcon from '@material-ui/icons/SaveTwoTone'; import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import { TextField } from '@material-ui/core';
// @material-ui/icons
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import Check from "@material-ui/icons/Check";
// core components
import styles from "assets/jss/material-dashboard-react/components/tasksStyle.js";

import { tasks, updateTask } from "variables/general.js";
const useStyles = makeStyles(styles);

export default function Tasks(props) {
  const classes = useStyles();
  const [taskToEdit, setTaskToEdit] = useState();
   
  const [tasks, setTasks] = useState([{content:"sara",id:31231}]);

  function getAllTasks(){
    axios.get('http://localhost:8080/tasks/getList').then((response) => {
      const tasksJson = response.data;
      var arr = [];
      Object.values(tasksJson).map(task => arr.push({ 'content': task.content, 'id': task._id }))
      setTasks(...tasks, arr);

      debugger


    }).catch(err => {


    })
  }
  useEffect(() => {
    getAllTasks();
  }, []);

  function editTask(value) {    
    axios.put('http://localhost:8080/tasks/' + taskToEdit, value)
      .then((response) => {
        debugger

      }
      ).catch(err => {
        debugger

      });

  }

  function removeTask(taskId) {    
    axios.delete('http://localhost:8080/tasks/' + taskId)
      .then(() => {
        getAllTasks();

      }
      ).catch(err => {
        debugger

      });

  }
  
  return (
    <Table className={classes.table}>
      <TableBody>
        {tasks.map(task => (
          <TableRow key={task.id} className={classes.tableRow}>

            <TableCell style={{width:'90%'}} >
              {(taskToEdit === task.id) ?
                < TextField style={{width:'90%'}} onChange={(e) => editTask(e.target.value)} defaultValue={task.content}></TextField>
                : task.content}

            </TableCell>
            <TableCell className={classes.tableActions}>
              {(taskToEdit === task.id) ?
                <Tooltip
                  id="tooltip-top"
                  title="Save Task"
                  placement="top"
                  classes={{ tooltip: classes.tooltip }}
                  onClick={() => setTaskToEdit(-1)}
                >
                  <SaveTwoToneIcon />
                </Tooltip>
                :
                <>
                  <Tooltip
                    id="tooltip-top"
                    title="Edit Task"
                    placement="top"
                    classes={{ tooltip: classes.tooltip }}
                    onClick={() => setTaskToEdit(task.id)}
                  >
                    <IconButton
                      aria-label="Edit"
                      className={classes.tableActionButton}
                    >
                      <Edit
                        className={
                          classes.tableActionButtonIcon + " " + classes.edit
                        }
                      />
                    </IconButton>
                  </Tooltip>
                  <Tooltip
                    id="tooltip-top-start"
                    title="Remove"
                    placement="top"
                    classes={{ tooltip: classes.tooltip }}
                    onClick={() => removeTask(task.id)}
                  >
                    <IconButton
                      aria-label="Close"
                      className={classes.tableActionButton}
                    >
                      <Close
                        className={
                          classes.tableActionButtonIcon + " " + classes.close
                        }
                      />
                    </IconButton>
                  </Tooltip>
                </>}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

Tasks.propTypes = {
  tasksIndexes: PropTypes.arrayOf(PropTypes.number),
  tasks: PropTypes.arrayOf(PropTypes.node),
  rtlActive: PropTypes.bool,
  checkedIndexes: PropTypes.array
};
