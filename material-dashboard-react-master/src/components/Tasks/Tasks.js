import React, { useState, useEffect } from "react";
import axios from "axios"
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Tooltip, IconButton, Table, TableRow, TableBody, TableCell, TextField } from "@material-ui/core";
// @material-ui/icons
import SaveTwoToneIcon from '@material-ui/icons/SaveTwoTone';
import { Close, Edit } from '@material-ui/icons';
import { FcPlus } from "react-icons/fc";

// core components
import styles from "assets/jss/material-dashboard-react/components/tasksStyle.js";
import { Button } from 'react-bootstrap';

import { connect } from 'react-redux'
import { actions } from '../../redux/actions'

function mapStateToProps(state) {
  // debugger;
  return {
    client: state.clientReducer.client,
    employee: state.employeeReducer.employee
  };
}

const mapDispatchToProps = (dispatch) => ({

  setFirstName: (employee_name) => dispatch(actions.setFirstName(employee_name)),
  setLastName: (employee_last_name) => dispatch(actions.setLastName(employee_last_name)),
  setEmail: (employee_email) => dispatch(actions.setEmail(employee_email)),
  setPhone: (employee_phone) => dispatch(actions.setPhone(employee_phone))

})

export default connect(mapStateToProps, mapDispatchToProps)(function Tasks(props) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const [taskToEdit, setTaskToEdit] = useState();
  const [contentTaskToUpdate, setContentTaskToUpdate] = useState();
  const [newTask, setNewTask] = useState({ content: '', employee_id: props.employee.employee_id });
  const [tasks, setTasks] = useState([]);
  const [showAddTaskRow, setShowAddTaskRow] = useState(false);

  useEffect(() => {
    getAllTasks();
  }, []);

  useEffect(() => { }, [tasks]);

  function getAllTasks() {
    debugger
    axios.get('http://localhost:8080/tasks/getList').then((response) => {
      const tasksJson = response.data;
      debugger
      var arr = [];
      Object.values(tasksJson).map(task => arr.push({ 'content': task.content, 'id': task._id }))
      setTasks(arr);

    }).catch(err => {
      debugger

    })
  }

  function editTask() {
    debugger
    axios.put('http://localhost:8080/tasks/update/' + taskToEdit, { content: contentTaskToUpdate })
      .then((response) => {
        debugger
        setTaskToEdit(-1);
        setContentTaskToUpdate('');
        getAllTasks();

      }
      ).catch(err => {
        debugger

      });

  }

  function addTask() {

    axios.post('http://localhost:8080/tasks/add', newTask)
      .then((response) => {

        getAllTasks();
        setNewTask({ content: '', employee_id: props.employee.employee_id });
        setShowAddTaskRow(false);
      }
      ).catch(err => {
        debugger

      });

  }

  function removeTask(taskId) {
    axios.delete('http://localhost:8080/tasks/delete/' + taskId)
      .then(() => {
        getAllTasks();

      }
      ).catch(err => {
        debugger

      });

  }

  return (
    <Table className={classes.table}>
      <TableBody >

        <Button variant="outline-info" className="mt-2 mb-2" onClick={() => { setShowAddTaskRow(true) }}>
          <FcPlus className=" mb-1 mr-2" /> Add new Task
        </Button>
        {showAddTaskRow === true ?
          <TableRow key="addTaskRow" className={classes.tableRow}>
            <TableCell style={{ width: '90%' }} >
              < TextField style={{ width: '90%' }} onChange={(e) => setNewTask({ ...newTask, content: e.target.value })}  ></TextField>
            </TableCell>
            <TableCell className={classes.tableActions}>
              <Tooltip
                id="tooltip-top"
                title="Save Task"
                placement="top"
                classes={{ tooltip: classes.tooltip }}
                onClick={() => addTask()}
              >
                <SaveTwoToneIcon />
              </Tooltip>

            </TableCell>
          </TableRow>
          : ''
        }
        {tasks.map(task => (
          <TableRow key={task.id} className={classes.tableRow}>

            <TableCell style={{ width: '90%' }} >
              {(taskToEdit === task.id) ?
                < TextField style={{ width: '90%' }} onChange={(e) => setContentTaskToUpdate(e.target.value)} defaultValue={task.content}></TextField>
                : task.content}

            </TableCell>
            <TableCell className={classes.tableActions}>
              {(taskToEdit === task.id) ?
                <Tooltip
                  id="tooltip-top"
                  title="Save Task"
                  placement="top"
                  classes={{ tooltip: classes.tooltip }}
                  onClick={() => editTask(task.id)}
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



});