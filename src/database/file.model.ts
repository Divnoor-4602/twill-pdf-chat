import { Document, Schema, model, Model, models } from "mongoose";

export interface IFile extends Document {
  name: String;
  user: Schema.Types.ObjectId;
  uploadStatus: String;
  url: String;
  key: String;
}

const fileSchema = new Schema(
  {
    name: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    uploadStatus: { type: String, required: true, default: "pending" },
    url: { type: String, required: true },
    key: { type: String, required: true },
  },
  { timestamps: true }
);

const File = models.File || model<IFile>("File", fileSchema);

export default File;
