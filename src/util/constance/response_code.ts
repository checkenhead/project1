import { CUSTOM_ERROR } from "@/util/constance/response_status";

export const COMMON_CODE = {
  SUCCESS: {
    'OK': 2000,
  },
  ERROR: {
    ...CUSTOM_ERROR,
    'BAD_REQUEST': 4000,
    'NEED_LOGIN': 4001,
    'EXPIRED_TOKEN': 4002,
    'INVALID_TOKEN': 4003,
  }
} as const