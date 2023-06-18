const PHOTOS_COUNT = 25;
const LIKES_MIN_COUNT = 15;
const LIKES_MAX_COUNT = 200;
const COMMENTS_COUNT = 15;
const COMMENTS_TEXT = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Отличный кадр!', 'Меня там точно не хватает!'
];
const DESCRIPTIONS = [
  'На память!', 'Рандом фото вам в ленту )', 'Красота-то какая ! Ляпота!', 'И такое бывает.', 'Отдыхать, так на полную!',
  'Хорошо там где нас нет.', 'Вполне не плохо!', 'Придумайте подпись к фото )'
];
const NAMES = [
  'Николай','Иван','Харитон','Ульяна','Яков','Нина','Егор','Педро','Оля','Никитос','Ягодка','Тихон','Николь','Олег'
];
const AVATAR_COUNT = 6;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const idGenerator = () => {
  let lastGeneratedId = 0;
  return () => {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

const getRandomArrayElement = (array) =>
  array[getRandomInteger(0, array.length - 1)];

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
