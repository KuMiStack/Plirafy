const activitiesApi = `${import.meta.env.VITE_BACKEND_URL_HUB}/api/activities`;
const postActivitiesApi = `${activitiesApi}/postActivities`;
const getActivitiesApi = `${activitiesApi}/getActivities`;

export type Activity = {
  id?: number;
  activityName: string;
  description: string;
  icon: string;
};

export type PostActivitiesPayload = Activity;

export type PostActivitiesResponse = {
  success: boolean;
  message: string;
  activity?: Activity;
};

type GetActivitiesWrappedResponse = {
  activities?: Activity[];
  data?: Activity[];
};

export const getActivities = async (): Promise<Activity[]> => {
  const res = await fetch(getActivitiesApi);

  if (!res.ok) {
    throw new Error("Fetching activities failed");
  }

  const data = (await res.json()) as Activity[] | GetActivitiesWrappedResponse;

  if (Array.isArray(data)) {
    return data;
  }

  return data.activities ?? data.data ?? [];
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
