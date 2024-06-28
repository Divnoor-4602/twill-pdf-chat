import { Schema, models, model, Document } from "mongoose";

export interface IUser extends Document {
  kindeId: string;
  email: string;
  joinedAt: Date;
  files: Schema.Types.ObjectId[];
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  stripePriceId?: string;
  stripeCurrentPeriodEnd?: Date;
}

// creating a user schema
const userSchema = new Schema(
  {
    kindeId: { type: String, required: true },
    email: { type: String, required: true },
    stripeCustomerId: { type: String },
    stripeSubscriptionId: { type: String },
    files: [{ type: Schema.Types.ObjectId, ref: "File" }],
    stripePriceId: { type: String },
    stripeCurrentPeriodEnd: { type: Date },
    joinedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// creating a user modle
const User = models.User || model<IUser>("User", userSchema);

export default User;
