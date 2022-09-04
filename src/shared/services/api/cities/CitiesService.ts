import { Environment } from "../../../environment";
import { Api } from "../axiosConfig";

export interface IListingCities {
  id: string;
  name: string;
}

export interface IDetailCity {
  id: string;
  name: string;
}

export type TCountTotalCities = {
  data: IListingCities[];
  countTotal: number;
};

const getAll = async (
  page = 1,
  filter = ""
): Promise<TCountTotalCities | Error> => {
  try {
    const urlRelative = `/cities?_page=${page}&_limit=${Environment.LINE_LIMIT}&name_like=${filter}`;

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

const getById = async (id: Number): Promise<IDetailCity | Error> => {
  try {
    const { data } = await Api.get(`/cities/${id}`);

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
  city: Omit<IDetailCity, "id">
): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IDetailCity>("/cities", city);

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
  city: IDetailCity
): Promise<void | Error> => {
  try {
    await Api.put(`/cities/${id}`, city);
  } catch (error) {
    console.log(error);
    return new Error(
      (error as { message: string }).message || "Erro ao atualizar o registro."
    );
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete(`/cities/${id}`);
  } catch (error) {
    console.log(error);
    return new Error(
      (error as { message: string }).message || "Erro ao apagar o registro."
    );
  }
};

export const CitiesService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
