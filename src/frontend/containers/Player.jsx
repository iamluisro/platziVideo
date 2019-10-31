import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getVideoSource } from '../actions';
import '../assets/styles/components/Player.scss';

const Player = (props) => {
  const { id } = props.match.params;
  const hasPlaying = Object.keys(props.playing).length > 0;

  useEffect(() => {
    props.getVideoSource(id);
  }, []);

  return hasPlaying ? (
    <div className='Player'>
      <video controls autoPlay>
        <source src={props.playing.source} type='video/mp4' />
      </video>

      <div className='Player-back'>
        <button type='button' onClick={() => props.history.goBack()}>
                Regresar
        </button>
      </div>
    </div>
  ) : <Redirect to='/404' />;
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
