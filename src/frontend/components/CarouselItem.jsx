import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setUserMovie, deleteUserMovie } from '../actions';
import '../assets/styles/components/CarouselItem.scss';
import playIcon from '../assets/static/play-icon.png';
import plusIcon from '../assets/static/plus-icon.png';
import deleteFav from '../assets/static/remove-icon_a56b8107-2c02-49ed-bead-308031b0dd76.png';

const CarouselItem = (props) => {
  const { id, cover, title, year, contentRating, duration, isList, _id } = props;
  const handleSetFavorite = () => {
    props.setUserMovie(
      {
        id, cover, title, year, contentRating, duration, isList, _id,
      },
    );
  };
  const handleDeleteFavorite = (itemId) => {
    props.deleteUserMovie(itemId);

  };
  return (
    <div className='carousel-item' key={_id}>
      <img className='carousel-item__img' src={cover} alt={title} />
      <div className='carousel-item__details'>
        <div>
          <Link to={`/player/${_id}`}>
            <img
              className='carousel-item__details--img'
              src={playIcon}
              alt='Play Icon'
            />
          </Link>
          {isList ? (
            <img
              className='carousel-item__details--img'
              src={deleteFav}
              alt='Remove Favorite'
              onClick={() => handleDeleteFavorite(_id)}
            />
          ) : (
            <img
              className='carousel-item__details--img'
              src={plusIcon}
              alt='Plus Icon'
              onClick={handleSetFavorite}
            />
          )}

        </div>
        <p className='carousel-item__details--title'>{title}</p>
        <p className='carousel-item__details--subtitle'>
          {`${year} ${contentRating} ${duration}`}
        </p>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  setUserMovie,
  deleteUserMovie,
};

export default connect(null, mapDispatchToProps)(CarouselItem);
