export const UserRoles: roles = {
  ADMIN: 'MyACcess.Admin',
  READALL: 'MyACcess.FlightOperations.Schedule.ReadAll',
  PAIRINGSREAD: 'MyACcess.FlightOperations.Pairings.Read',
  READ: 'MyACcess.FlightOperations.Schedule.Read',
  WRITE: 'MyACcess.FlightOperations.Schedule.Write',
  DBREAD: 'MyACcess.Reports.DBM.Read'
};

export const UserGroups: groups = {
  APP_ADMIN: 'some group code',
  FLIGHT_EMPLOYEES: 'some group code',
  OPPERATION_MANAGER: 'some group code'
};

interface roles {
  ADMIN: String,
  READALL: String,
  PAIRINGSREAD: String,
  READ: String,
  WRITE: String,
  DBREAD: String
}

interface groups {
  APP_ADMIN: String,
  FLIGHT_EMPLOYEES: String,
  OPPERATION_MANAGER: String
}


export const error = {
  AUTH: 401,
  FORBIDDEN: 403,
  TIME_OUT: 504,
  DEFAULT: 500
}

export const pairingStatus = {
  SCHEDULED: 'scheduled.release',
  POSTED: 'pairing.posted',
  FREEZE: 'pairing.freeze',
  CLOSED: 'bidding.closed'
}