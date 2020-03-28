import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import NotFound from './NotFound';
import { getVideoSource } from '../actions';
import '../assets/styles/components/Player.scss';

const Player = (props) => {
  const { match, playing } = props;
  const { _id: movieId } = match.params;
  const hasPlaying = Object.keys(playing).length > 0;
  useEffect(() => {
    props.getVideoSource(movieId);
  }, []);

  return hasPlaying ? (
    <div className='Player'>
      <video controls autoPlay>
        <source src={playing.source} type='video/mp4' />
      </video>

      <div className='Player-back'>
        <button type='button' onClick={() => props.history.goBack()}>
          Regresar
        </button>
      </div>
    </div>
  ) : (
    <NotFound />
  );
};

const MapStateToProps = (state) => {
  return {
    playing: state.playing,
  };
};

const MapDispatchToProps = {
  getVideoSource,
};

export default connect(MapStateToProps, MapDispatchToProps)(Player);
