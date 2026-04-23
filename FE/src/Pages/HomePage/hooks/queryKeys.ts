export const userActivitiesQueryKey = (userId?: number) => [
  "userActivities",
  userId,
] as const;
