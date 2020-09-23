import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import axios from 'axios';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { GbContext } from '../../GbContext/gbContext';
import NothingToShow from '../../components/nothingtoshow';

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

const PostDetails = ({ posts, setActiveScreen }) => {
    const classes = useStyles();
    const { allCmnts } = useContext(GbContext);
    const [comments, setComment] = useState([])
    const [post, setPost] = useState([])
    const [commentsScreen, setCommentScreen] = useState(false)
    const [newComment, setNewComment] = useState("")

    const individualPost = async (id, post) => {
        const miljao = await allCmnts[0];
        // const comments = await axios(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)

        setComment(miljao.filter(val => val.postId === id))
        setPost(post)


        return setCommentScreen(true)
    }


    const handleSubmit = async (e, postid) => {
        const obj = {
            postId: postid,
            id: allCmnts[0].length + 1,
            name: "Current User",
            email: "currentUser@gmail.com",
            body: newComment,
        }
        allCmnts[1]([...allCmnts[0], obj])
        setComment([...allCmnts[0], obj].filter(val => val.postId === postid))

        setNewComment("");
    }

    return (
        <>

            {     commentsScreen ?
                <Card className={classes.root} style={{ cursor: "pointer" }}>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            <span style={{ cursor: "pointer" }}>
                                <ArrowBackIcon onClick={() => setCommentScreen(false)} /> {post.userId}
                            </span>
                        </Typography>
                        <Typography variant="h4" component="h1">
                            {post.title}
                        </Typography>

                        <Typography variant="body2" component="p">
                            {post.body}
                        </Typography>
                    </CardContent>
                    <CardContent>
                        <div>
                            <TextareaAutosize aria-label="minimum height" value={newComment} onChange={(e) => setNewComment(e.target.value)} rowsMin={3} placeholder="Write your views..." className="w-100" />


                            <Button disabled={!newComment} variant="outlined" size="small" color="primary" onClick={(e) => handleSubmit(e, post.id)}>Comment</Button>

                            <hr />
                        </div>
                        {comments.length ? comments.map((val, i) =>
                            <>
                                <Typography variant="h6" component="h6">

                                    {val.name}
                                </Typography>
                                <Typography className={classes.pos} color="textSecondary">

                                    {val.email}
                                </Typography>

                                <Typography variant="body2" component="p" key={i}>
                                    {val.body}
                                </Typography>
                                <hr />
                            </>
                        )
                            :
                            <NothingToShow />
                        }
                    </CardContent>
                </Card>
                : posts.length ? posts.map((val, i) =>
                    <Card className={classes.root} key={i} style={{ cursor: "pointer" }} onClick={() => individualPost(val.id, val)}>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                <span style={{ cursor: "pointer" }}>
                                    <ArrowBackIcon onClick={() => setActiveScreen(true)} /> {val.userId}
                                </span>
                            </Typography>
                            <Typography variant="h5" component="h2">
                                {val.title}
                            </Typography>

                            <Typography variant="body2" component="p">
                                {val.body}
                            </Typography>
                        </CardContent>
                    </Card>
                ) :
                    <Card className={classes.root}>

                        <CardContent>
                            <span style={{ cursor: "pointer" }}>
                                <ArrowBackIcon onClick={() => setActiveScreen(true)} />
                            </span>
                            <div className="w-100 d-flex justify-content-center">
                                <NothingToShow />
                            </div>
                        </CardContent>

                    </Card>


            }
        </>
    )
}

export default PostDetails;