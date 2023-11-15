import axios from "axios"

export const refreshAccessToken = async () => {
  const response = await axios({
    method: "POST",
    url: `https://127.0.0.1:8080/api/auth/refreshtoken`,
    withCredentials: true,
  })
  console.log(response)
  return response.data
}
