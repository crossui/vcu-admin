import request from '@/utils/request';


//修改密码
export const passwordEdit = async (data) => {
  try {
    const res = await request({
      url: 'api/passwordEdit',
      method: 'POST',
      data
    })
    return res;
  } catch (err) {
    return false;
  }
}



//获取后端有权限的菜单
export const commonMenu = async (data) => {
  try {
    const res = await request({
      url: 'api/MenuMgmt/commonMenu',
      method: 'POST',
      data
    })
    return res;
  } catch (err) {
    return false;
  }
}

