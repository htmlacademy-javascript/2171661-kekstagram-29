import {getRandomInteger} from './utils.js';
import {idGenerator} from './utils.js';
import {getRandomArrayElement} from './utils.js';
import {PHOTOS_COUNT} from './constants.js';
import {LIKES_MIN_COUNT} from './constants.js';
import {LIKES_MAX_COUNT} from './constants.js';
import {COMMENTS_COUNT} from './constants.js';
import {COMMENTS_TEXT} from './constants.js';
import {DESCRIPTIONS} from './constants.js';
import {NAMES} from './constants.js';
import {AVATAR_COUNT} from './constants.js';

const createMessage = () => {
  const messageArray = [];
  const messageLength = getRandomInteger(1, 2);
  for(let i = 0; i < messageLength; i++) {
    messageArray.push(COMMENTS_TEXT[getRandomInteger(0, COMMENTS_TEXT.length - 1)]);
  }
  return messageArray.join(' ');
};

const generateCommentId = idGenerator();

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/${getRandomInteger(1, AVATAR_COUNT)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(NAMES)
});

const getCommentsList = () => {
  const commentsList = [];
  for(let i = 0; i < COMMENTS_COUNT; i++) {
    commentsList.push(createComment(i + 1));
  }
  return commentsList;
};

const createPhoto = (index) => ({
  id: index,
  url: `photos/${index}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(LIKES_MIN_COUNT, LIKES_MAX_COUNT),
  comments: getCommentsList()
});

const getPhotosList = () => {
  const photosArray = [];
  for(let i = 0; i <= PHOTOS_COUNT - 1; i++) {
    photosArray[i] = createPhoto(i + 1);
  }
  return photosArray;
};

getPhotosList();

export {getPhotosList};
