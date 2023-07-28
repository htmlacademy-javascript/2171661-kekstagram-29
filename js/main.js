import {createThumbnails} from './thumbnails.js';
import {getData} from './api.js';

getData((thumbnails) => createThumbnails(thumbnails));
