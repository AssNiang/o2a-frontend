export class User {

  _id?: string;

  first_name?: string;

  last_name?: string;

  address?: string;

  username!: string;

  email!: string;

  password!: string;
  userStatus!: string;

  // is_locked: boolean = false;

  picture?: string;

  // phone_number: {
  //   type: String,
  //   // validate: [isMobilePhone],
  //   // unique: true,
  //   required: true,
  //   default: "xx xxx xx xx",
  //   max: 20,
  //   minlength: 5,
  //   trim: true,
  //   },

  // date_of_birth?: Date;

  role?: string;

  is_patient: boolean = false;

  // is_specialist: boolean = false;

  // is_admin: boolean = false;

  postLikes?: string[];

  postReports?: string[];

  commentLikes?: string[];

  commentReports?: string[];
}
