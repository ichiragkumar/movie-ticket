import { truncate } from 'fs';
import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  email: string;
  movies_bought: boolean;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true},
  movies_bought: { type: Boolean, default: false },
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;