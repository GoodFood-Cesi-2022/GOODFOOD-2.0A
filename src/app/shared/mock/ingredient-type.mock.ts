import { IngreType } from 'src/app/shared/models/ingredient-type.model';

const mockType1: IngreType = {
  id: 1,
  code: 'fish',
  name: 'fish',
  description: 'description 1',
};

const mockType2: IngreType = {
  id: 2,
  code: 'meat',
  name: 'meat',
  description: 'description 2',
};

const mockTypeArray: IngreType[] = [mockType1, mockType2];

export { mockType1, mockType2, mockTypeArray };
