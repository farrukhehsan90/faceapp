import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { GbContext } from '../../GbContext/gbContext'
import TextField from '@material-ui/core/TextField';
import axios from 'axios'

const useStyles = makeStyles({
    root: {
        width: "60%",
        margin: "2rem auto"
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

const UserDetails = ({ setActive, id }) => {
    const classes = useStyles();
    const [data, setData] = useState({})
    const { post, userData } = useContext(GbContext);

    const [loading, setLoading] = useState(true)
    const [postValue, setPostValue] = useState({ userId: id, title: "", body: "" })
    // const fetchedData = async (id) => {
    //     const { data } = await fetchData(id);
    //     setData(data)
    //     setLoading(false)

    // }
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        console.log(postValue, " post value")
        axios('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(postValue),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => {

                post[1]([...post[0], { ...response.data, ...postValue }])
                setPostValue({ userId: id, title: "", body: "" })
                setOpen(false);
            })


    }

    useEffect(() => {
        // fetchedData(id)
        setData(userData.find(val => id === val.id))
        setLoading(false)
    }, []);

    return (
        <>

            {        !loading ? <> <Card className={classes.root}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        <span style={{ cursor: "pointer" }}>
                            <ArrowBackIcon onClick={() => setActive({ active: false, id: id })} /> {data.id}
                        </span>
                    </Typography>
                    <Typography variant="h5" component="h2">
                        {data.name}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        {data.username}
                    </Typography>
                    <Typography variant="body2" component="p">
                        <span>Phone : </span>
                        {data.phone}
                        <br /><span>Email : </span>
                        {data.email}
                        <br />
                        <br />

                        <span>Address </span>
                        <br />
                        <span>Street : </span>
                        {data.address.street}
                        <br />
                        <span>Suite : </span>
                        {data.address.suite}
                        <br />
                        <span>City : </span>
                        {data.address.city}
                        <br />
                        <span>zipcode : </span>
                        {data.address.zipcode}
                        <br />
                        <span>Location : </span>
                        latitude {data.address.geo.lat} {" "}
                        longitude {data.address.geo.lng}
                        <br />
                        <br />
                        <span>Company</span>
                        <br />
                        Name : {data.company.name}
                        <br />
                        Catch Phrase : {data.company.catchPhrase}
                        <br />
                        BS : {data.company.bs}
                        <br />
                        <br />
                        Website : <a>{data.website}</a>
                    </Typography>
                </CardContent>
            </Card>

                <div className="w-75 mx-auto">
                    <span className="float-right" >Add a Post
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
                        <form style={{ display: "grid" }} noValidate autoComplete="off">
                            <TextField id="outlined-basic" label="User Id" size="small" value={data.id} disabled variant="outlined" />
                            <TextField id="outlined-basic" label="Title" className="my-2" size="small" variant="outlined" value={postValue.title} onChange={(e) => setPostValue({ ...postValue, title: e.target.value })} />
                            <TextField id="outlined-basic" label="Body" size="small" variant="outlined" value={postValue.body} onChange={(e) => setPostValue({ ...postValue, body: e.target.value })} />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary" variant="outlined">
                            Close
          </Button>
                        <Button disabled={!postValue.title || !postValue.body} onClick={handleSubmit} color="primary" variant="outlined">
                            Submit
          </Button>
                    </DialogActions>
                </Dialog>

            </> :
                <div> wait.. </div>
            }
        </>
    )
}

export default UserDetails;