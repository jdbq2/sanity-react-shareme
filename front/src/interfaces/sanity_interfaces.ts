export interface UserFromSanity {
  userName: string;
  _updatedAt: Date;
  image: string;
  _createdAt: Date;
  _rev: string;
  _type: string;
  _id: string;
}

export interface PinFromSanity {
  image: Image;
  _id: string;
  title?: string;
  about?: string;
  comments?: Comments[] | null;
  destination: string;
  postedBy: PostedBy;
  save: null | Saved[];
}

export interface Saved {
  postedBy: null | PostedBy;
}

export interface Image {
  asset: Asset;
}

export interface Asset {
  url: string;
}

export interface Comments {
  _key: string;
  postedBy: PostedBy;
  comment: string;
}

export interface PostedBy {
  _id: string;
  userName: string;
  image: string;
}
