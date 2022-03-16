import { IDateProvider } from '../interfaces/IDateProvider';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
  compareInHours(start_date: Date, end_date: Date): number {
    return dayjs(this.convertToUTC(end_date)).diff(this.convertToUTC(start_date), "hours");
  }
  convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format();
  }
  dateNow(): Date {
    return dayjs().toDate();
  }
  compareInDays(start_date: Date, end_date: Date): number {
    return dayjs(this.convertToUTC(end_date)).diff(this.convertToUTC(start_date), "days");
  }

  addDays(days: number): Date {
    return dayjs().add(days, "days").toDate();
  }

  addHours(hours: number): Date {
    return dayjs().add(hours, "hours").toDate();
  }
  compareIfBefore(start_date: Date, end_date: Date): boolean {
    return dayjs(start_date).isBefore(end_date);
  }

}

export { DayjsDateProvider };