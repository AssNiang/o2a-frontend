export class Comment {
  _id?: string;
  postId!: string;
  commenterId!: string;
  text!: string;
  likers?: string[];
  reporters?: string[];
  // comments?: string[];
  createdAt?: string;
  updatedAt?: string;
}
