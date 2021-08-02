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
 * 角色管理
 */
// 获取角色列表
export const getRoles = (body: model.Role.IgetRoles) => baseApi.get('/GetAuthRoles' + getParams(body))
// 删除角色
export const deleteRoles = (id: number) => baseApi.delete(`/GetAuthRoles/${id}`)
// 获取个人权限 id：1是admin
export const GetRolesById = (id:number) => baseApi.get(`/GetRolePermissionTreeById/${id}`)
// 获取全部权限树
export const features = () => baseApi.get(`/features`)
// 获取用户权限树
export const GetRolesTreeById = (id:number) => baseApi.get(`/grantedPermissionChildren/${id}`)
// 提交编辑用户权限 json-server局限性 必须要带上id才能请求
export const addRolePermission = (body: any) =>baseApi.patch(`GetRolePermissionTreeById/${body.id}`, body)
// 编辑用户 json-server局限性 必须要带上id才能请求
export const editRole = (body: any) => baseApi.patch(`/GetAuthRoles/${body.id}`,body)
// 创建角色
export const createRole = (body: model.Role.IgetRoles) => baseApi.post('/GetAuthRoles/', body)
// 查看用户 getUserRoles
export const getUserRolesById = (id:number) => baseApi.get(`/getUserRoles/${id}`)

/**
 * 用户管理
 */
// 获取用户
 export const getUsers = (body: model.User.IgetUsers) => baseApi.get('getusers' + getParams(body))
// 禁用用户
export const setUserActiveById = (body:any) => baseApi.patch(`getusers/${body.id}`,body)
// 删除用户
export const deleteUserById = (id:number) => baseApi.delete(`getusers/${id}`)