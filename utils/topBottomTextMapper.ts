export const topBottomTextMapper = {
  topLength: '총장',
  shoulder: '어깨 ',
  chest: '가슴 ',
  bottomLength: '총장',
  waist: '허리 ',
  thigh: '허벅지 ',
  rise: '밑위',
  hem: '밑단 ',
};

const measureCheckList = ['chest', 'waist', 'thigh', 'hem'];

export const topBottomTextConverter = (key: keyof typeof topBottomTextMapper, measure: string) => {
  if (key === 'shoulder') {
    const text = topBottomTextMapper[key] + '너비';
    return text;
  }
  if (measureCheckList.includes(key)) {
    const text = topBottomTextMapper[key] + measure;
    return text;
  }
  return topBottomTextMapper[key];
};
