export interface InfoType {
  [key: string]: string | number | undefined;
  size?: string;
  topLength?: number;
  shoulder?: number;
  chest?: number;

  bottomLength?: number;
  waist?: number; // 허리
  thigh?: number; // 허벅지
  rise?: number; // 밑위
  hem?: number; //밑단
}

export type SizeInfoType = InfoType[];
