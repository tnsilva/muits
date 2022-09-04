import { Api } from "../axiosConfig";

interface IAuth {
  accessToken: string;
}

const auth = async (
  email: string,
  password: string
): Promise<IAuth | Error> => {
  try {
    const { data } = await Api.get<IAuth>("/auth", {
      data: { email, password },
    });

    if (data) {
      return data;
    }

    return new Error("Erro ao fazer login.");
  } catch (error) {
    console.log(error);
    return new Error(
      (error as { message: string }).message || "Erro ao fazer login."
    );
  }
};
export const AuthService = { auth };
