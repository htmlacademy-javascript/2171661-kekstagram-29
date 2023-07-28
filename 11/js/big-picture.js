import {isEscapeKey} from './utils.js';

const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImageElement = bigPictureElement.querySelector('.big-picture__img img');
const likesCountElement = bigPictureElement.querySelector('.likes-count');
const socialCommentsCountElement = bigPictureElement.querySelector('.social__comment-count');
const socialCommentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const body = document.querySelector('body');
const socialCommentsContainer = bigPictureElement.querySelector('.social__comments');
const socialCommentElement = bigPictureElement.querySelector('.social__comment');
const bigPictureDescriptionElement = bigPictureElement.querySelector('.social__caption');
const bigPictureCloseElement = bigPictureElement.querySelector('#picture-cancel');
const commentsFragment = document.createDocumentFragment();
const MAX_COMMENTS_VALUE = 5;

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPictureClose();
  }
};

function bigPictureOpen () {
  bigPictureElement.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onPopupEscKeydown);
}

function bigPictureClose () {
  bigPictureElement.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onPopupEscKeydown);
}

const createBigPicture = ({url, likes, comments, description}) => {
  bigPictureOpen();

  bigPictureImageElement.src = url;
  likesCountElement.textContent = likes;
  bigPictureDescriptionElement.textContent = description;

  let commentsValue = 0;

  const showComment = () => {
    commentsValue += MAX_COMMENTS_VALUE;
    comments.slice(0, commentsValue).forEach(({avatar, name, message}) => {
      const socialCommentElementTemplate = socialCommentElement.cloneNode(true);
      const socialCommentImage = socialCommentElementTemplate.querySelector('.social__picture');
      const socialCommentText = socialCommentElementTemplate.querySelector('.social__text');

      socialCommentImage.src = avatar;
      socialCommentImage.alt = name;
      socialCommentText.textContent = message;

      commentsFragment.append(socialCommentElementTemplate);
    });

    socialCommentsContainer.innerHTML = '';
    socialCommentsContainer.append(commentsFragment);

    if (comments.length <= commentsValue) {
      socialCommentsCountElement.textContent = `${comments.length} из ${comments.length} комментариев`;
      socialCommentsLoaderElement.classList.add('hidden');
    } else {
      socialCommentsCountElement.textContent = `${commentsValue} из ${comments.length} комментариев`;
      socialCommentsLoaderElement.classList.remove('hidden');
    }
  };

  showComment();

  bigPictureCloseElement.addEventListener('click', bigPictureClose);
  socialCommentsLoaderElement.addEventListener('click', () => showComment());
};

export {createBigPicture};
