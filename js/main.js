import './api.js';
import './utils.js';
import './thumbnails.js';
import './big-picture.js';
import './upload-form.js';
import './image-editor.js';
import './upload-messages.js';
import './sorting-filters.js';
import './upload-image.js';
import {debounce} from './utils.js';
import {createThumbnails} from './thumbnails.js';
import {getData} from './api.js';
import {getFilters} from './sorting-filters.js';
import {overlayClose} from './upload-form.js';
import {setUserFormSubmit} from './upload-form.js';

const TIMEOUT_DELAY = 500;

getData((thumbnails) => {
  createThumbnails(thumbnails);
  getFilters(thumbnails, debounce(createThumbnails, TIMEOUT_DELAY));
});

setUserFormSubmit(overlayClose);
