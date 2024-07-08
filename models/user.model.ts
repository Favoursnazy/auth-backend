import mongoose from "mongoose";
import { Password } from "../utils/password";

// An interface that describes the properies
// that are required to create a new user
interface UserAttrs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
}

// An interface that describes the properties
// that a user model has.
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// An interface thats describes the properties
// that a User Document has
interface UserDoc extends mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
}

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please add a first name"],
    },
    lastName: {
      type: String,
      required: [true, "Please add a last name"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please add a email"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    phone: {
      type: String,
      required: [true, "Please add a phone number"],
    },
  },
  {
    toJSON: {
      transform(doc, ret: any) {
        ret.userId = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.updatedAt;
        delete ret.createdAt;
      },
      versionKey: false,
    },
    timestamps: true,
  }
);

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);

    done();
  }
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
