import { hey } from "@acme/socket";

// function unused(badType: string) {
//   // use badType to cause a tsc error in this file
//   // what is something that is not a string?
//   return badType.toExponential();
// }

export function main(name = "world") {
  // eslint-disable-next-line no-console
  console.log(hey(name));
}
