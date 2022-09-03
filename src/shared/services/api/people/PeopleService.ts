import { Environment } from "../../../environment";
import { Api } from "../axiosConfig";

export interface IListingPeople {
  id: string;
  email: string;
  cityId: number;
  fullName: string;
}

export interface IDetailPeople {
  id: string;
  email: string;
  cityId: number;
  fullName: string;
}

export type TCountTotalPeople = {
  data: IListingPeople[];
  countTotal: number;
};

const getAll = async (
  page = 1,
  filter = ""
): Promise<TCountTotalPeople | Error> => {
  try {
    const urlRelative = `/people?_page=${page}&_limit=${Environment.LINE_LIMIT}&fullName_like=${filter}`;

    const { data, headers } = await Api.get(urlRelative);

    if (data) {
      return {
        data,
        countTotal: Number(headers["x-total-count"] || Environment.LINE_LIMIT),
      };
    }

    return new Error("Erro ao listar os registros.");
  } catch (error) {
    console.log(error);
    return new Error(
      (error as { message: string }).message || "Erro ao listar os registros."
    );
  }
};

const getById = async (id: Number): Promise<IDetailPeople | Error> => {
  try {
    const { data } = await Api.get(`/people/${id}`);

    if (data) {
      return data;
    }

    return new Error("Erro ao consultar o registro.");
  } catch (error) {
    console.log(error);
    return new Error(
      (error as { message: string }).message || "Erro ao consultar o registro."
    );
  }
};

const create = async (
  person: Omit<IDetailPeople, "id">
): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IDetailPeople>("/people", person);

    if (data) {
      return Number(data.id);
    }

    return new Error("Erro ao criar o registro.");
  } catch (error) {
    console.log(error);
    return new Error(
      (error as { message: string }).message || "Erro ao criar o registro."
    );
  }
};

const updateById = async (
  id: number,
  person: IDetailPeople
): Promise<void | Error> => {
  try {
    await Api.put(`/people/${id}`, person);
  } catch (error) {
    console.log(error);
    return new Error(
      (error as { message: string }).message || "Erro ao atualizar o registro."
    );
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete(`/people/${id}`);
  } catch (error) {
    console.log(error);
    return new Error(
      (error as { message: string }).message || "Erro ao apagar o registro."
    );
  }
};

export const PeopleService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
