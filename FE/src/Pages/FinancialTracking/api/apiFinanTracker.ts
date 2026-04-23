const apiRoot = `${import.meta.env.VITE_BACKEND_URL_HUB}/api`;
const financialApi = `${apiRoot}/financial`;

const getFinancialActivitiesApi = `${financialApi}/getFinancialActivities`;
const createFinancialActivityApi = `${financialApi}/createFinancialActivity`;
const editFinancialActivityApi = `${financialApi}/editFinancialActivity`;
const addToCurrentAmountApi = `${financialApi}/addToCurrentAmount`;
const deleteFinancialActivityApi = `${financialApi}/deleteFinancialActivity`;

export type FinancialActivity = {
  id: number;
  startDate: string;
  endDate: string;
  financialName: string;
  financialGoal: number;
  currentAmount: number;
  userId: number;
};

export type GetFinancialActivitiesResponse = {
  success?: boolean;
  message?: string;
  financialActivities?: FinancialActivity[];
  activities?: FinancialActivity[];
  data?: FinancialActivity[];
};

export type CreateFinancialActivityPayload = {
  startDate: string;
  endDate: string;
  financialName: string;
  financialGoal: number;
  currentAmount: number;
  userId: number;
};

export type CreateFinancialActivityResponse = {
  success: boolean;
  message: string;
  financialActivity?: FinancialActivity;
  data?: FinancialActivity;
};

export type EditFinancialActivityPayload = {
  id: number;
  financialName?: string;
  financialGoal?: number;
  startDate?: string;
  endDate?: string;
  currentAmount?: number;
};

export type EditFinancialActivityResponse = {
  success: boolean;
  message: string;
  financialActivity?: FinancialActivity;
  data?: FinancialActivity;
};

export type AddToCurrentAmountPayload = {
  id: number;
  amountToAdd: number;
};

export type AddToCurrentAmountResponse = {
  success: boolean;
  message: string;
  financialActivity?: FinancialActivity;
  data?: FinancialActivity;
};

export type DeleteFinancialActivityResponse = {
  success: boolean;
  message: string;
};

const unwrapFinancialActivities = (
  data: FinancialActivity[] | GetFinancialActivitiesResponse
): FinancialActivity[] => {
  if (Array.isArray(data)) {
    return data;
  }

  return data.financialActivities ?? data.activities ?? data.data ?? [];
};

export const getFinancialActivities = async (
  userId: number
): Promise<FinancialActivity[]> => {
  const res = await fetch(`${getFinancialActivitiesApi}?userId=${userId}`);

  if (!res.ok) {
    const errorData = (await res.json().catch(() => null)) as {
      message?: string;
      error?: string;
    } | null;

    throw new Error(
      errorData?.message ??
        errorData?.error ??
        "Fetching financial activities failed"
    );
  }

  const data = (await res.json()) as
    | FinancialActivity[]
    | GetFinancialActivitiesResponse;

  return unwrapFinancialActivities(data);
};

export const createFinancialActivity = async (
  payload: CreateFinancialActivityPayload
): Promise<CreateFinancialActivityResponse> => {
  const res = await fetch(createFinancialActivityApi, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      startDate: payload.startDate,
      endDate: payload.endDate,
      financialName: payload.financialName,
      financialGoal: payload.financialGoal,
      currentAmount: payload.currentAmount,
      userId: payload.userId,
    }),
  });

  if (!res.ok) {
    const errorData = (await res.json().catch(() => null)) as {
      message?: string;
      error?: string;
    } | null;

    throw new Error(
      errorData?.message ??
        errorData?.error ??
        "Creating financial activity failed"
    );
  }

  return res.json();
};

export const editFinancialActivity = async (
  payload: EditFinancialActivityPayload
): Promise<EditFinancialActivityResponse> => {
  const { id, ...body } = payload;

  const res = await fetch(`${editFinancialActivityApi}?id=${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errorData = (await res.json().catch(() => null)) as {
      message?: string;
      error?: string;
    } | null;

    throw new Error(
      errorData?.message ??
        errorData?.error ??
        "Editing financial activity failed"
    );
  }

  return res.json();
};

export const addToCurrentAmount = async (
  payload: AddToCurrentAmountPayload
): Promise<AddToCurrentAmountResponse> => {
  const res = await fetch(`${addToCurrentAmountApi}?id=${payload.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amountToAdd: payload.amountToAdd,
    }),
  });

  if (!res.ok) {
    const errorData = (await res.json().catch(() => null)) as {
      message?: string;
      error?: string;
    } | null;

    throw new Error(
      errorData?.message ??
        errorData?.error ??
        "Adding to current amount failed"
    );
  }

  return res.json();
};

export const deleteFinancialActivity = async (
  id: number
): Promise<DeleteFinancialActivityResponse> => {
  const res = await fetch(`${deleteFinancialActivityApi}?id=${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const errorData = (await res.json().catch(() => null)) as {
      message?: string;
      error?: string;
    } | null;

    throw new Error(
      errorData?.message ??
        errorData?.error ??
        "Deleting financial activity failed"
    );
  }

  return res.json();
};