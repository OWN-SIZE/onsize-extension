export const topBottomTextMapper = {
  topLength: '총장',
  shoulder: '어깨 단면',
  chest: '가슴 단면',
  bottomLength: '총장',
  waist: '허리',
  thigh: '허벅지',
  rise: '밑위',
  hem: '밑단',
};

export const topBottomTextConverter = (key: keyof typeof topBottomTextMapper) => {
  return topBottomTextMapper[key];
};
