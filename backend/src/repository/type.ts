import { filmDto } from '../films/dto/films.dto';

export default interface FilmsRepository {
  findAll(): Promise<filmDto[]>;
  findOne(id: string): Promise<filmDto>;
  findByIdAndUpdateTaken(
    id: string,
    scheduleIndex: number,
    seat: string,
  ): Promise<filmDto>;
}
