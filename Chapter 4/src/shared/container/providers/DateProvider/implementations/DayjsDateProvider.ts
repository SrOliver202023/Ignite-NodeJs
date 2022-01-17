import { IDateProvider } from '../IDateProvider';
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

}

export { DayjsDateProvider };