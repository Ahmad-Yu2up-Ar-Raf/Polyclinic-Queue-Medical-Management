import { setLogOut, useAuthStore } from "@/store/auth-store"
import ky from "ky"

const BASE_URL_API =
  import.meta.env.VITE_API_URL ?? "http://192.168.100.11:8000/api/v1/"

export const api = ky.create({
  baseUrl: BASE_URL_API,
  hooks: {
    beforeRequest: [
      ({ request }) => {
        const Token = useAuthStore.getState().token

        if (Token) {
          request.headers.set("Authorization", `Bearer ${Token}`)
        }
      },
    ],

    afterResponse: [
      ({ response }) => {
        if (response.status == 405) {
          setLogOut()
          window.location.href = "/login"
        }
      },
    ],
  },
})
