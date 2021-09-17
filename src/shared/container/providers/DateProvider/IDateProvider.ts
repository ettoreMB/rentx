interface IDateProvider {
  dateNow():Date;
  convertToUTC(date: Date): string;
  compareInHours(end_date: Date, start_date: Date): number;
  compareInDays(start_date: Date, end_date: Date): number;
  compareIfBefore(start_date: Date, end_date: Date): boolean;
  addDays(days:number):Date;
  addHours(hours): Date;
}
export {IDateProvider}