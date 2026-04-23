const apiRoot = `${import.meta.env.VITE_BACKEND_URL_HUB}/api`;
const activitiesApi = `${apiRoot}/activities`;
const postActivitiesApi = `${activitiesApi}/postActivities`;
const getActivitiesApi = `${activitiesApi}/getActivities`;
const getUserActivitiesApi = `${activitiesApi}/getUserActivities`;
const assignActivityToUserApi = `${activitiesApi}/assignActivityToUser`;
const deleteUserActivityApi = `${activitiesApi}/deleteUserActivities`;

export type Activity = {
  id?: number;
  activityId?: number;
  activity_id?: number;
  activityid?: number;
  userActivityId?: number;
  activityName: string;
  description: string;
  icon: string | null;
};

type UserActivityRecord = {
  id?: number;
  userId: number;
  activityId: number;
  activities?: Activity;
};

const isUserActivityRecord = (
  activity: Activity | UserActivityRecord
): activity is UserActivityRecord => "activities" in activity;

export type PostActivitiesPayload = Activity;

export type PostActivitiesResponse = {
  success: boolean;
  message: string;
  activity?: Activity;
};

export type AssignActivityToUserPayload = {
  userId: number;
  activityId: number;
};

export type AssignActivityToUserResponse = {
  success: boolean;
  message: string;
  activity?: Activity;
};

export type DeleteUserActivityResponse = {
  success: boolean;
  message: string;
};

type ActivitiesWrappedResponse = {
  activities?: Activity[];
  userActivities?: Activity[];
  data?: Array<Activity | UserActivityRecord>;
};

const unwrapActivities = (
  data: Activity[] | ActivitiesWrappedResponse
): Array<Activity | UserActivityRecord> => {
  if (Array.isArray(data)) {
    return data;
  }

  return data.activities ?? data.userActivities ?? data.data ?? [];
};

export const getActivityId = (activity: Activity) =>
  activity.id ?? activity.activityId ?? activity.activity_id ?? activity.activityid;

export const getUserActivityId = (activity: Activity) => activity.userActivityId;

export const getActivities = async (): Promise<Activity[]> => {
  const res = await fetch(getActivitiesApi);

  if (!res.ok) {
    throw new Error("Fetching activities failed");
  }

  const data = (await res.json()) as Activity[] | ActivitiesWrappedResponse;

  return unwrapActivities(data) as Activity[];
};

export const getUserActivities = async (userId: number): Promise<Activity[]> => {
  const res = await fetch(`${getUserActivitiesApi}?userId=${userId}`);

  if (!res.ok) {
    throw new Error("Fetching user activities failed");
  }

  const responseData = (await res.json()) as
    | Activity[]
    | ActivitiesWrappedResponse;
  const activities = unwrapActivities(responseData);

  return activities.map((activity) => {
    if (isUserActivityRecord(activity) && activity.activities) {
      return {
        ...activity.activities,
        activityId: activity.activityId,
        userActivityId: activity.id,
      };
    }

    return activity as Activity;
  });
};

export const assignActivityToUser = async (
  payload: AssignActivityToUserPayload
): Promise<AssignActivityToUserResponse> => {
  const res = await fetch(assignActivityToUserApi, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorData = (await res.json().catch(() => null)) as {
      message?: string;
      error?: string;
    } | null;

    throw new Error(
      errorData?.message ?? errorData?.error ?? "Assigning activity failed"
    );
  }

  return res.json();
};

export const deleteUserActivity = async (
  userActivityId: number
): Promise<DeleteUserActivityResponse> => {
  const res = await fetch(
    `${deleteUserActivityApi}?userActivityId=${userActivityId}`,
    {
      method: "DELETE",
    }
  );

  if (!res.ok) {
    const errorData = (await res.json().catch(() => null)) as {
      message?: string;
      error?: string;
    } | null;

    throw new Error(
      errorData?.message ?? errorData?.error ?? "Deleting activity failed"
    );
  }

  return res.json();
};

export const postActivities = async (
  payload: PostActivitiesPayload
): Promise<PostActivitiesResponse> => {
  const res = await fetch(postActivitiesApi, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      activityName: payload.activityName,
      description: payload.description,
      icon: payload.icon,
    }),
  });

  if (!res.ok) {
    throw new Error("Creating activity failed");
  }

  return res.json();
};
