interface IDateProvider {
  dateNow():Date;
  convertToUTC(date: Date): string;
  compareInHours(end_date: Date, start_date: Date): number;
  compareInDays(start_date: Date, end_date: Date): number;
}
export {IDateProvider}