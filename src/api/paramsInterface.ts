
/**
 * common
 */
export namespace Common {
    export interface IStrIDonly {
        id: string;
    }
    export interface INumIDonly {
        id: number;
    }
    export interface IIDonly {
        id: string | number;
    }
    export interface IGetList {
        skipCount: number;
        maxResultCount: number;
        sorting: string;
        filter: string;
    }
    // 省市区
    export interface IgetProvince {
        id?: string;
    }
    export interface IgetCity {
        id?: string;
    }
    export interface IgetArea {
        id?: string;
    }
}

/**
 * 权限树
 */
export namespace AuthTree {
    export interface IauthRole {
        id: string;
    }
    export interface IdeletePermission {
        id: string | number;
    }
    export interface IeditPermission {
        name: string;
        code: string;
        url: string;
        featureType: number;
        orderIndex: number;
        namePinyin: string;
        isCollapse: boolean;
        id: number;
    }
    export interface IaddPermission {
        name: string;
        code: string;
        url: string;
        featureType: number;
        orderIndex: number;
        namePinyin: string;
        isCollapse: boolean;
        parentId: number;
    }
    export interface IsetRolePermission {
        roleIds: string[];
        code: string;
    }
    export interface IgetRoleByPermission {
        name: string;
        roleType: number;
        code: string;
        skipCount: number;
        maxResultCount: number;
        sorting: string;
        filter: string;
    }
}

/**
 * 角色管理
 */
export namespace Role {
    export interface IcreateRole {
        name: string;
        displayName: string;
        isStatic: boolean;
        isDefault: boolean;
        creationIime: any;
        role: number;
        roleName: string;
        description: string;
        id: any;
    }
    export interface IgetRoles {
        name: string;
        role: number | string;
        skipCount: number;
        maxResultCount: number;
        sorting: string;
        filter: string;
    }
    export interface IupdateRole {
        displayName: string;
        requiredPhoneVerificationCode: boolean;
        description: string;
        id: number;
    }
    export interface IdeleteRole {
        id: number;
    }
    export interface IaddRolePermission {
        roleId: number;
        grantedPermissionNames: string[];
    }
    export interface IgetRolePermission {
        id: number;
    }
    export interface IGetRoleUser extends Common.IGetList {
        roleId: string
    }
}

/**
 * 用户管理
 */
export namespace User {
    export interface IgetUsers {
        userName: string;
        name: string;
        isActive: boolean | string;
        role: number;
        skipCount: number;
        maxResultCount: number;
        sorting: string;
        filter: string;
    }
    export interface IcreateUser {
        userName: string;
        assignedRoles: Array<{
            roleId: number;
            role: number;
            roleName: string;
            associatedEntityId: string;
            associatedEntityName: string;
        }>;
        password: string;
        name: string;
        phoneNumber: string;
        adminComment: string;
    }
    export interface IsetActive {
        isActive: boolean;
        id: string;
    }
    export interface IdeleteUser {
        id: string;
    }
    export interface IupdateUser {
        id: string;
        assignedRoles: Array<{
            roleId: number;
            role: number;
            roleName: string;
            associatedEntityId: string;
            associatedEntityName: string;
        }>;
        name: string;
        phoneNumber: string;
        adminComment: string;
    }
    export interface IupdateRole {
        lonsidUserId: string;
        assignedRoles: Array<{
            roleId: number;
            roleType: number;
            roleName: string;
            associatedEntityId: string;
            associatedEntityName: string;
        }>
    }
    export interface IgetDistributors {
        filter: string;
        maxResultCount: number;
        skipCount: number;
    }
    export interface IgetUserDetail {
        id: string;
    }
    export interface IupdatePassword {
        id: string;
        password: string;
    }
    export interface IuserDistribution {
        maxResultCount: number;
        skipCount: number;
        filter: string;
    }
    export interface IdistributionCompanies {
        maxResultCount: number;
        skipCount: number;
        filter: string;
    }
    export interface IserviceCenters {
        maxResultCount: number;
        skipCount: number;
        filter: string;
    }
}

/**
 * 虚拟下单
 */
export namespace Impersonate {
    export interface IgetImpersonationUsers {
        userName: string;
        name: string;
        role: number;
        associatedEntityId: string;
        maxResultCount: number;
        skipCount: number;
        filter: string;
    }
    export interface IimpersonateLogin {
        userId: string;
    }
    export interface IgetDistributionCompanies {
        maxResultCount: number;
        skipCount: number;
        filter: string;
    }
    export interface IgetDistributionCompanies2 {
        maxResultCount: number;
        skipCount: number;
        keyWord: string;
    }
}

/**
 * 微信用户
 */
export namespace WeChat {
    export interface IwechatList {
        maxResultCount: number;
        skipCount: number;
        nickName: string;
        openId: string;
        unionId: string;
    }
}

/**
 * 应用管理
 */
export namespace App {
    export interface IUpdate {
        id?: string;
        name: string;
        icon: string;
        url: string;
        code: string;
    }
}
/**
 * 域账号权限树
 */
export namespace DomainAuthTree {
    export interface IUpdate {
        id?: string;
        code: string;
        name: string;
        parentMenuId: string;
        moduleId: string;
        orderIndex: number;
        icon: string;
        url: string;
    }
    export interface ISetRole {
        roleIds: string[];
        menuIds: string[];
    }
}

/**
 * 域账号角色
 */
export namespace DomainRole {
    export interface IGetRoleAuth {
        roleId: string;
        isLoadMenus: boolean;
    }
    export interface IUpdate {
        id?: string;
        name: string;
        description: string;
    }
    export interface ISetAuth {
        roleId: string;
        roleMenus: string[];
    }
}

/**
 * 域账号用户
 */
export namespace DomainUser {
    export interface IGetUserList extends Common.IGetList {
        userId: string;
        isLoadRoles: boolean;
        isSearch: boolean;
        value: string;
        userAccount: string;
    }
    export interface IGetUserAuth {
        userId: string;
    }
    export interface IGetUserRole extends Common.IGetList {
        userId: string;
        isLoadRoles: boolean;
        isSearch: boolean;
        value: string;
        userAccount: string;
    }
    export interface IFindByName {
        domainName: string;
        skipCount: number;
        maxResultCount: number;
        sorting: string;
        filter: string;
    }
    export interface IDelete {
        ids: string[];
    }
    export interface IUpdate {
        id?: string;
        firstName: string;
        lastName: string;
        domainName: string;
        password: string;
        confirmPassword: string;
        currentUnitId: string;
        telephone: string;
    }
    export interface ISetRole {
        userId: string;
        userRoles: string[];
        userAccount: string;
    }
}

/**
 * 部门管理
 */
export namespace Department {
    export interface IUpdate {
        id: string;
        name: string;
        parentUnitId: string;
        orderIndex: number;
    }
    export interface ISetRole {
        roleIds: number[];
        id: string;
    }
}
