import { Picture } from '../models/picture.model';

const picture1: Picture = {
  uuid: 'uuid-1',
  name: 'string',
  size: 10,
  size_unit: 'xxxxxx',
  link: 'string',
  external_link: 'http://localhost:8090/storage/files/string-1.jpg',
};
const picture2: Picture = {
  uuid: 'uuis-2',
  name: 'string',
  size: 10,
  size_unit: 'xxxxxx',
  link: 'string',
  external_link: 'http://localhost:8090/storage/files/string-2.jpg',
};
const picture3: Picture = {
  uuid: 'uuid-3',
  name: 'string',
  size: 10,
  size_unit: 'xxxxxx',
  link: 'string',
  external_link: 'http://localhost:8090/storage/files/string-3.jpg',
};

const mockpictureArray: Picture[] = [picture1, picture2, picture3];

export { picture1, picture2, picture3, mockpictureArray };
