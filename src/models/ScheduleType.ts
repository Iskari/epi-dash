enum ScheduleType {
  Dispo = 'dispo',
  Event = 'event',
  Sale = 'sale',
  Unknown = 'unknown'
}

export function mapToScheduleType(scheduleType: number) {
  switch (scheduleType) {
    case -1:
      return ScheduleType.Sale
    case 1:
      return ScheduleType.Dispo
    case 7:
      return ScheduleType.Event
    default:
      return ScheduleType.Unknown
  }
}

export default ScheduleType
