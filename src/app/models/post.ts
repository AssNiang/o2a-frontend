export class Post{
  _id?: string;
  posterId!: string;
  statut!: string;
  message!: string;
  picture?: string;
  video?: string;
  audio?: string;
  likers?: string[];
  reporters?: string[];
  comments?: string[];
  createdAt?: string;
  updatedAt?: string;
}
