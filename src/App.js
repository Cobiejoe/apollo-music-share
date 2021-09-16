import React from 'react';
import AddSong from './components/AddSong';
import Header from './components/Header';
import SongList from './components/SongList';
import SongPlayer from './components/SongPlayer';
import { Grid, useMediaQuery, Hidden } from '@material-ui/core';
import songReducer from './reducer';

export const SongContext = React.createContext({
  song: {
    id: '43630f48-3c14-417c-8f10-25f901aca95d',
    title: 'Piano Man (Official Music Video)',
    artist: 'Billy Joel',
    thumbnail: 'http://img.youtube.com/vi/gxEPV4kolz0/0.jpg',
    url: 'https://youtu.be/gxEPV4kolz0',
    duration: '342'
  },
  isPlaying: false
});

function App() {
  const inititalSongState = React.useContext(SongContext);
  const [state, dispatch] = React.useReducer(songReducer, inititalSongState)
  const greaterThanSm = useMediaQuery(theme => theme.breakpoints.up('sm'));
  const greaterThanMd = useMediaQuery(theme => theme.breakpoints.up('md'));

  return (
   <SongContext.Provider value={{ state, dispatch }}>
    <Hidden only="xs">
    <Header />
    </Hidden>
    <Grid container spacing={3}>
      <Grid 
        style={{
        paddingTop: greaterThanSm ? 80 : 10
        }} 
        item xs={12} 
        md={7}
      >
        <AddSong />
        <SongList />
      </Grid>
      <Grid style={
            greaterThanMd ? {
            position: 'fixed',
            width: '100%',
            right: 0,
            top: 70
          } : {
            position: 'fixed',
            width: '100%',
            left: 0,
            bottom: 0
          }} item xs={12} md={5}>
        <SongPlayer />
      </Grid>
    </Grid>
   </SongContext.Provider>
  );
}

export default App;
