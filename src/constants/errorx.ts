/**
 * 业务错误码定义，值格式需要错误码:错误描述形式
 */
export enum ErrorEnum {
  CODE_500 = '500:服务繁忙，请稍后重试',
  CODE_1021 = '1021:验证码错误',
  CODE_1022 = '1022:登录账号或密码错误',
  CODE_1023 = '1023:输入的旧密码不一致',
  CODE_1024 = '1024:账号已被禁用',
  CODE_1025 = '1025:无权限访问',
  CODE_1026 = '1026:授权已失效，请重新登录',
  CODE_1027 = '1027:更新个人资料功能已被禁用',
  CODE_1028 = '1028:更新个人密码功能已被禁用',
  CODE_1029 = '1029:账号已存在',

  //--------------------system
  CODE_1101 = '1101:禁止操作未授予的角色',
  CODE_1102 = '1102:岗位不存在',
  CODE_1103 = '1103:职称不存在',
  CODE_1104 = '1104:部门不存在',
  CODE_1105 = '1105:该角色存在子级角色',
  CODE_1106 = '1106:该角色正在使用中',
  CODE_1107 = '1107:父级角色不存在',
  CODE_1109 = '1109:禁止将子级角色设置为父级角色',
  CODE_1110 = '1110:父级角色不存在',
  CODE_1112 = '1112:禁止操作系统内置权限菜单',
  CODE_1113 = '1113:该菜单存在子级权限或菜单',
  CODE_1114 = '1114:禁止操作未授予的权限',
  CODE_1115 = '1115:禁止将自身设置为父级菜单',
  CODE_1116 = '1116:禁止将子级菜单设置为父级菜单',
  CODE_1117 = '1117:父级菜单不存在',
  CODE_1118 = '1118:权限节点不可设置为父级菜单',
  CODE_1119 = '1119:该职称正在使用中',
  CODE_1120 = '1120:该岗位正在使用中',
  CODE_1121 = '1121:父级部门不存在',
  CODE_1122 = '1122:该部门存在子级部门',
  CODE_1123 = '1123:该部门正在使用中',
  CODE_1124 = '1124:禁止将自身设置为父级部门',
  CODE_1125 = '1125:禁止将子级部门设置为父级部门',

  //--------------------config
  CODE_1201 = '1201:字典集不存在',
  CODE_1202 = '1202:字典标识已被使用',
  CODE_1203 = '1203:禁止操作系统内置字典配置',
  CODE_1204 = '1204:该字典集存在配置项',
}
