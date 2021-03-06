import { useMutation } from "@apollo/client";
import { Avatar, IconButton, makeStyles, Typography, useMediaQuery } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React from "react";
import { ADD_OR_REMOVE_FROM_QUEUE } from "../graphql/mutations";

function QueuedSongList({ queue }) {
    console.log({ queue });
    const greaterThanMd = useMediaQuery(theme => theme.breakpoints.up('md'));  

    // hard-coded-song
    // const song = {
    //     title: 'Madness',
    //     artist: 'Muse',
    //     thumbnail: 'http://i3.ytimg.com/vi/Ek0SgwWmF9w/hqdefault.jpg'
    // };

    return (
        greaterThanMd && (
            <div style={{ margin: '10px 0' }}>
                <Typography color="textSecondary" variant="button">
                    QUEUE ({queue.length})
                </Typography>
                {queue.map((song, i) => (
                    <QueuedSong key={i} song={song} />
                ))}
            </div>
        )
    );
}

const useStyles = makeStyles({
    avatar: {
        width: 44,
        height: 44
    },
    text: {
        textOverflow: 'ellipsis',
        overflow: 'hidden'
    },
    container: {
        display: 'grid',
        gridAutoFlow: 'column',
        gridTemplateColumns: '50px auto 50px',
        gridGap: 12,
        alignItems: 'center',
        marginTop: 10
    },
    songInfoContainer: {
        overflow: 'hidden',
        whiteSpace: 'nowrap'
    }
});

function QueuedSong({ song }) {
    const classes = useStyles();
    const [addOrRemoveFromQueue] = useMutation(ADD_OR_REMOVE_FROM_QUEUE, {
        onCompleted: data => {
            localStorage.setItem('queue', JSON.stringify(data.addOrRemoveFromQueue));
        }
    });
    const { thumbnail, artist, title } = song;

    function handleAddOrRemoveFromQueue() {
        addOrRemoveFromQueue({
            variables: { input: { ...song, __typename: 'Song' } }
        });
    }

    return (
        <div className={classes.container}>
            <Avatar className={classes.avatar} src={thumbnail} alt="Song thumbnail" />
            <div className={classes.songInfoContainer}>
                <Typography className={classes.text} variant="subtitle2">
                    {title}
                </Typography>
                <Typography className={classes.text} color="textSecondary" variant="subtitle2">
                    {artist}
                </Typography>
            </div>
            <IconButton onClick={handleAddOrRemoveFromQueue}>
                <Delete color="error" />
            </IconButton>
        </div>
    );
}
 
export default QueuedSongList;