export const useGetCreds = ():string | null => {
 return localStorage.getItem("admin");
}