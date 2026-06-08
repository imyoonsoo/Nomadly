interface Schedule {
  date: string;
  startTime: string;
  endTime: string;
}

export interface ActivityFormValues {
  title: string;
  category: string;
  description: string;
  address: string;
  price: number | string;
  schedules: Schedule[];
  bannerImageUrl: File | string;
  subImageUrls: Array<File | string>;
}

export type AddressSearchButtonProps = {
  onSelect: (address: string) => void;
};
