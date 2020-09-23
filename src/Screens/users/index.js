import React, { useState, useContext } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import Typography from "@material-ui/core/Typography";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import { GbContext } from '../../GbContext/gbContext'
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import PostDetails from '../post_details';
import axios from 'axios';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


const useStyles = makeStyles({
  table: {
    width: "80%",
    margin: "2rem auto"
  },
});

export default function Users({ setActive }) {
  const classes = useStyles();
  const { userData, addData, post } = useContext(GbContext);

  const [activeScreen, setActiveScreen] = useState(true)
  const [userPost, setUserPost] = useState([])
  const [newUser, setNewUser] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    website: ""
  })
  const [userAddress, setUserAddress] = useState({
    street: "",
    suite: "",
    city: "",
    zipcode: "",
    "geo": {
      "lat": "-37.3159",
      "lng": "81.1496"
    }
  })
  const [userCompany, setUserCompany] = useState({
    name: "",
    catchPhrase: "",
    bs: ""
  })
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePostDetails = (post) => {
    setUserPost(post)
    setActiveScreen(false)
  }
  const handleSubmit = (e) => {
    e.preventDefault();


    axios('https://jsonplaceholder.typicode.com/users', {
      method: 'POST',
      body: JSON.stringify({ ...newUser }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => {

        addData([...userData, { ...response.data, ...newUser, address: userAddress, company: userCompany }])
        handleClose()
      })

  }
  const isEmpty = (obj) => {
    for (let key in obj) {
      if (!obj[key])
        return true
    }
    return false;
  }
  console.log(isEmpty(newUser))

  return (
    <>
      {
        activeScreen ?
          <>
            <TableContainer>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>ID</StyledTableCell>
                    <StyledTableCell align="right">Name</StyledTableCell>
                    <StyledTableCell align="right">User Name</StyledTableCell>
                    <StyledTableCell align="right">Posts</StyledTableCell>
                    <StyledTableCell align="right">Details</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userData.length ? userData.map((row, i) => (
                    <StyledTableRow key={row.name} onClick={() => handlePostDetails(post[0].filter(val => val.userId === row.id))}>
                      <StyledTableCell component="th" scope="row">
                        {row.id}
                      </StyledTableCell>
                      <StyledTableCell align="right">{row.name}</StyledTableCell>
                      <StyledTableCell align="right">{row.username}</StyledTableCell>
                      <StyledTableCell align="right">{
                        post[0].length && (post[0].filter(val => val.userId === row.id)).length
                      }
                      </StyledTableCell>
                      <StyledTableCell align="right"><Button size="small" onClick={() => setActive({ id: row.id, active: true })} variant="outlined" color="primary">Details</Button></StyledTableCell>
                    </StyledTableRow>
                  ))
                    :
                    <StyledTableCell colSpan={5} align="center">Loading...</StyledTableCell>

                  }
                </TableBody>
              </Table>
            </TableContainer>
            <div className="w-75 mx-auto">
              <span className="float-right" >Add a User
          <AddCircleOutlinedIcon fontSize="large" style={{ cursor: "pointer" }} onClick={handleClickOpen} />
              </span>
            </div>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"

            >
              <DialogTitle id="alert-dialog-title">{"Add a Post"}</DialogTitle>
              <DialogContent>
                <form style={{ display: "grid" }} autoComplete="off" >
                  <TextField id="outlined-basic" label="Name" className="my-2" size="small" variant="outlined"
                    value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    required
                  />
                  <TextField id="outlined-basic" label="User Name" size="small" variant="outlined"
                    value={newUser.username} onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                    required
                  />
                  <TextField id="outlined-basic" label="Email" type="email" className="my-2" size="small" variant="outlined"
                    value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    required
                  />
                  <TextField id="outlined-basic" label="Phone" type="number" size="small" variant="outlined"
                    value={newUser.phone} onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                    required
                  />
                  <TextField id="outlined-basic" label="Website" size="small" variant="outlined" className="my-2"
                    value={newUser.website} onChange={(e) => setNewUser({ ...newUser, website: e.target.value })}
                    required
                  />


                  <Typography>Address :</Typography>
                  <TextField id="outlined-basic" label="Street" className="my-2" size="small" variant="outlined"
                    value={userAddress.street} onChange={(e) => setUserAddress({ ...userAddress, street: e.target.value })}
                    required
                  />
                  <TextField id="outlined-basic" label="Suite" size="small" variant="outlined"
                    value={userAddress.suite} onChange={(e) => setUserAddress({ ...userAddress, suite: e.target.value })}
                    required
                  />
                  <TextField id="outlined-basic" label="City" className="my-2" size="small" variant="outlined"
                    value={userAddress.city} onChange={(e) => setUserAddress({ ...userAddress, city: e.target.value })}
                    required
                  />
                  <TextField id="outlined-basic" label="Zipcode" className="my-2" size="small" variant="outlined"
                    value={userAddress.zipcode} onChange={(e) => setUserAddress({ ...userAddress, zipcode: e.target.value })}
                    required
                  />






                  <Typography>Company :</Typography>
                  <TextField id="outlined-basic" label="Name" size="small" variant="outlined" className="my-2"
                    value={userCompany.name} onChange={(e) => setUserCompany({ ...userCompany, name: e.target.value })}
                    required
                  />
                  <TextField id="outlined-basic" label="Catch Phrase" size="small" variant="outlined"
                    value={userCompany.catchPhrase} onChange={(e) => setUserCompany({ ...userCompany, catchPhrase: e.target.value })}
                    required
                  />
                  <TextField id="outlined-basic" label="BS" size="small" variant="outlined" className="my-2"
                    value={userCompany.bs} onChange={(e) => setUserCompany({ ...userCompany, bs: e.target.value })}
                    required
                  />


                </form>
              </DialogContent>
              <DialogActions>
                <Button type="button" onClick={handleClose} color="primary" variant="outlined">
                  Close
</Button>
                <Button disabled={isEmpty(newUser) || isEmpty(userAddress) || isEmpty(userCompany)} type="submit" color="primary" variant="outlined" onClick={handleSubmit}>
                  Submit
</Button>
              </DialogActions>
            </Dialog></>
          : <PostDetails posts={userPost} setActiveScreen={setActiveScreen} />
      }
      <style jsx="true">{`
      .MuiDialog-paperWidthSm {
        width: 50%;
    }
      `}</style>
    </>
  );
}
