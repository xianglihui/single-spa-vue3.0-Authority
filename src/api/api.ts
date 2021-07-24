import qs from "qs";
import serves from "@/api/axios";
// import { getParams } from "@/utils/toolset";
import { env } from "@/utils";

const baseApi = serves(env.mockServe());
// console.log('baseApi',baseApi)
// api接口集合 getFeatureTree
// export const getAuthTree = () => {
//   baseApi.get("/getFeatureTree");
// };
export const getAuthTree = () => baseApi.get('/getFeatureTree')