import { Schema } from 'mongoose';

export interface IScheduleDB {
  id: string;
  daytime: string;
  hall: number;
  rows: number;
  seats: number;
  price: 350;
  taken: string[];
}

export const scheduleSchema = new Schema<IScheduleDB>({
  id: {
    type: String,
    required: true,
  },
  daytime: {
    type: String,
    required: true,
  },
  hall: {
    type: Number,
    required: true,
  },
  rows: {
    type: Number,
    required: true,
  },
  seats: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  taken: {
    type: [String],
    required: true,
  },
});
