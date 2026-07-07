export interface IZohal {
  shahkarInquiry(mobile: string, nationalCode: string): Promise<boolean>;
}

export interface _ShahkarInquiryResponse {
  response_body: {
    data: {
      matched: boolean;
    };
    error_code: string | null;
    message: string;
  };
  result: 1 | 6 | number;
}
