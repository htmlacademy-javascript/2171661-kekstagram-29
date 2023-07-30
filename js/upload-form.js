import {checkCommentLength} from './utils';
import {checkUniqueElement} from './utils';
import {isEscapeKey} from './utils';
import {showAlert} from './utils';
import {sendData} from 'api.js';
import {successModalOpen} from './user-messages';
import {errorModalOpen} from './user-messages';
import {clearScaleValue} from './image-editor';
import {resetEffect} from './image-editor';

const uploadContainer = document.querySelector('.img-upload');
const uploadForm = uploadContainer.querySelector('.img-upload__form');
const uploadOverlay = uploadContainer.querySelector('.img-upload__overlay');
const uploadInput = uploadContainer.querySelector('#upload-file');
const body = document.querySelector('body');
const uploadCancelButton = uploadContainer.querySelector('#upload-cancel');
const uploadHashtag = uploadContainer.querySelector('.text__hashtags');
const uploadComment = uploadContainer.querySelector('.text__description');
const submitButton = uploadForm.querySelector('.img-upload__submit');
const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAGS_LENGTH = 5;
const HASHTAGS_RE = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

const onPopupEscKeydown = (evt) => {
  if (uploadHashtag === document.activeElement || uploadComment === document.activeElement) {
    return evt;
  }
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    overlayClose();
  }
};

const resetUploadForm = () => {
  uploadInput.value = '';
  uploadHashtag.value = '';
  uploadComment.value = '';
};

function overlayOpen () {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscKeydown);
}

function overlayClose () {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
  uploadForm.reset();
  resetUploadForm();
  clearScaleValue();
  resetEffect();
}

uploadInput.addEventListener('change', overlayOpen);
uploadCancelButton.addEventListener('click', overlayClose);

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error-text',
});

const splitHashtags = (value) => value.toLowerCase().split(' ');

const checkHashtagsLength = (value) => splitHashtags(value).length <= MAX_HASHTAGS_LENGTH;

const validateHashtag = (value) => splitHashtags(value).every((item) => HASHTAGS_RE.test(item)) || value === '';

const checkUniqueHashtags = (value) => checkUniqueElement(splitHashtags(value));

const validateUploadComment = (value) => checkCommentLength(value, MAX_COMMENT_LENGTH);

pristine.addValidator(uploadHashtag, checkHashtagsLength, `Нельзя указать больше ${MAX_HASHTAGS_LENGTH} хэш-тегов`);
pristine.addValidator(uploadHashtag, validateHashtag, 'Хэш-тег начинается с символа #, строка должна состоять из букв и чисел, максимальная длина 20 символов');
pristine.addValidator(uploadHashtag, checkUniqueHashtags, 'Хэш-теги не должны повторяться');
pristine.addValidator(uploadComment, validateUploadComment, `Длина комментария не может составлять больше ${MAX_COMMENT_LENGTH} символов!`);

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправляю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const setUserFormSubmit = (onSuccess) => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          unblockSubmitButton();
          successModalOpen();
        },
        () => {
          showAlert('Не удалось отправить форму. Попробуйте ещё раз');
          unblockSubmitButton();
          errorModalOpen();
        },
        new FormData(evt.target),
      );
    }
  });
};

export {setUserFormSubmit};
export {overlayClose};
