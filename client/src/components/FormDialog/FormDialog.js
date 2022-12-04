import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Axios from "axios";
import produce from "immer";


function FormDialog(props) {
    const [editValues, setEditValues] = useState({
        id: props.id,
        title: props.title,
        content: props.content,
    })
    
    const handleClose = () =>{
      props.setOpen(false)
  }
  
    const handleChangeValues = (value) => {
      setEditValues((prevValues) => ({
        ...prevValues,
        [value.target.id]: value.target.value,
      }))
    }
    

    const handleEditPost = () => {
      Axios.put("http://localhost:3001/editPost", {
        id: editValues.id,
        title: editValues.title,
        content: editValues.content,
      }).then(() => {
        props.setListCard(
          props.listCard.map((value) => {
            return value.id == editValues.id
              ? {
                  id: editValues.id,
                  title: editValues.title,
                  content: editValues.content,
                }
              : value;
          })
        );
      });
      handleClose();
    };

    const handleDeletePost = () => {
      Axios.delete(`http://localhost:3001/deletePost/${editValues.id}`).then(() => {
        props.setListCard(
          props.listCard.filter((value) => {
            return value.id != editValues.id;
          })
        );
      });
      handleClose();
    };


    return(
        <div>
        <Dialog
          open={props.open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Editar</DialogTitle>
          <DialogContent>
            <TextField
              disabled
              margin="dense"
              id="id"
              label="id"
              defaultValue={props.id}
              type="text"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Título"
              defaultValue={props.title}
              type="text"
              onChange={handleChangeValues}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="content"
              label="Conteúdo"
              defaultValue={props.content}
              type="text"
              onChange={handleChangeValues}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button color="primary" onClick={() => handleDeletePost()}>
              Excluir
            </Button>
            <Button color="primary" onClick={() => handleEditPost()}>
              Salvar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )














}



export default FormDialog