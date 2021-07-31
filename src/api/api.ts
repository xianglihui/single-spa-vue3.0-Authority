import qs from "qs";
import * as model from './paramsInterface'
import serves from "@/api/axios";
import { getParams } from "@/utils/toolset";
import { env } from "@/utils";

const baseApi = serves(env.mockServe());
// api接口集合

// 获取权限树
export const getAuthTree = () => baseApi.get('/getFeatureTree')
// 删除权限树权限
export const deletePermission = (body: model.AuthTree.IdeletePermission) => baseApi.delete('/getFeatureTree?' + qs.stringify(body))
// 编辑权限树权限
export const editPermission = (body: model.AuthTree.IeditPermission) => baseApi.patch('/getFeatureTree', body)
// 新增权限树权限
export const addPermission = (body: model.AuthTree.IaddPermission) => baseApi.post('/getFeatureTree', body)

/**
 * 用户管理
 */
// 获取角色列表
export const getRoles = (body: model.Role.IgetRoles) => baseApi.get('/GetAuthRoles' + getParams(body))
// 删除角色
export const deleteRoles = (id: number) => baseApi.delete(`/GetAuthRoles/${id}`)
// 获取个人权限
export const GetRolesById = (id:number) => baseApi.get(`/GetRolePermissionTreeById/${id}`)
// 获取全部权限树
export const features = () => baseApi.get(`/features`)