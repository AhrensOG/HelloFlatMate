import { getRentalPeriodsForFilterPage } from "./controller/getRentalPeriodsForFilterPage";

export async function GET() {
  return await getRentalPeriodsForFilterPage();
}
