// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiURL: "http://localhost:58929/api",
  login: "auth/login",
  logout: "auth/logout",
  register: "admin/user/register",
  deleteUser : "admin/user/delete",
  editUser : "admin/user/edit",
  updateUser : "user/update",
  reportWeek: "admin/report/timeZones",
  deleteParking: "admin/parking/delete",
  updateParking: "admin/parking/update",
  createParkingLot: "admin/parking/parkinglot",
  allParkinLots: "parking/list",
  employees: "admin/report/employees",
  employeeById : "admin/report/employee?id=",
  employeeByEmail : "admin/report/employee/email?email=",
  userInfo : "user/info",
  parkingById : "admin/report/parkinglot?id="
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
