import mongoose, { Schema } from 'mongoose';
import { IScheduleDB, scheduleSchema } from './scheduleModel';

interface IFilmDB {
  id: string;
  rating: number;
  director: string;
  tags: string[];
  image: string;
  cover: string;
  title: string;
  about: string;
  description: string;
  schedule: IScheduleDB[];
}

const FilmSchema = new Schema<IFilmDB>({
  id: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  schedule: {
    type: [scheduleSchema],
    required: true,
  },
});

const Film = mongoose.model('film', FilmSchema);
export default Film;
