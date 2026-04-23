export const financialActivitiesQueryKey = (userId?: number) => [
  "financialActivities",
  userId,
] as const;
