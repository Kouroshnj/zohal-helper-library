import axios, { AxiosInstance, AxiosError } from "axios";
import type {
  _CheckIbanWithNationalCode,
  _ShahkarInquiryResponse,
  IZohal,
} from "../types/structures";
import { ZohalError } from "./error";
import moment from "jalali-moment";

export class Zohal implements IZohal {
  #baseURL = "https://service.zohal.io/api/v0";
  #token: string;
  #http: AxiosInstance;
  constructor(
    token: string,
    baseURL = "https://service.zohal.io/api/v0/services",
  ) {
    this.#baseURL = baseURL;
    this.#token = token;
    this.#http = axios.create({
      baseURL: this.#baseURL,
      headers: {
        Authorization: "Bearer " + this.#token,
      },
    });
  }

  async shahkarInquiry(mobile: string, nationalCode: string): Promise<boolean> {
    try {
      const result = await this.#http.post<_ShahkarInquiryResponse>(
        "/inquiry/shahkar",
        {
          mobile,
          national_code: nationalCode,
        },
      );
      if (
        (result.status === 200 || result.status === 201) &&
        result.data.result === 1
      )
        return result.data.response_body.data.matched;
    } catch (e) {
      if (!axios.isAxiosError(e)) throw e;

      const err: AxiosError<_ShahkarInquiryResponse> = e;
      if (!err.response) throw new ZohalError(err.message, err.code);

      throw new ZohalError(
        err.response.data.response_body.message,
        err.response.data.response_body.error_code || err.response.status,
      );
    }
  }

  async checkIbanWithNationalCode(
    iban: string,
    nationalCode: string,
    birthDate: Date | string,
  ): Promise<boolean> {
    try {
      const result = await this.#http.post<_ShahkarInquiryResponse>(
        "/inquiry/check_iban_with_national_code",
        {
          IBAN: iban,
          birth_date: moment(birthDate)
            .locale("fa")
            .format("jYYYY/jMM/jDD"),
          national_code: nationalCode,
        },
      );
      if (
        (result.status === 200 || result.status === 201) &&
        result.data.result === 1
      )
        return result.data.response_body.data.matched;
    } catch (e) {
      if (!axios.isAxiosError(e)) throw e;

      const err: AxiosError<_CheckIbanWithNationalCode> = e;
      if (!err.response) throw new ZohalError(err.message, err.code);

      throw new ZohalError(
        err.response.data.response_body.message,
        err.response.data.response_body.error_code || err.response.status,
      );
    }
  }
}
