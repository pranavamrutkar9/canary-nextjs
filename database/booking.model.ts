import { Schema, model, models, Document, Model, Types } from "mongoose";
import Event from "./event.model";

/**
 * Interface representing the Booking document in MongoDB.
 */
export interface IBooking extends Document {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: [true, "Event ID is required"],
      index: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
  },
  { timestamps: true }
);

// Pre-save hook to verify the referenced event exists
BookingSchema.pre<IBooking>("save", async function () {
  const eventExists = await Event.findById(this.eventId);
  if (!eventExists) {
    throw new Error(`Referenced Event with ID ${this.eventId} does not exist.`);
  }
});

const Booking = (models.Booking as Model<IBooking>) || model<IBooking>("Booking", BookingSchema);

export default Booking;
