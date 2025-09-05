// // lib/getUsername.ts
// import { cookies } from "next/headers";

// export async function getUsername() {
//   const token = (await cookies()).get("access_token")?.value;
//   if (!token) return "";

//   const res = await fetch("http://localhost:8000/api/users/verfyToken", {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//     cache: "no-store",
//   });

//   if (!res.ok) return "";

//   const data = await res.json();
//   return data.username || "";
// }
