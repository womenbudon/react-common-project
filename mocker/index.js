const Mock = require('mockjs');
Mock.Random.guid()

const mockapi = {
  'get /common/getinspectingmen': Mock.mock({
    'code': 0,
    'message': 'success', 
    'data': {
      "pageSize": 12,
      "currentPage": 1,
      "total|100-1000": 100,
      "list|1-100": [{
        'inspectingManId|+1': 001,
        'inspectingManName|1': ['熊大', '熊二', '萝卜头', '毛毛', '涂涂'],
        'phoneNumber': '12345678901',
        'email|': '1234567890@qq.com',
        'address': '高新区天府三街199号',
        'disposingNumber|1-500': 99,
      }]
    },
  }),

  'post /common/login': Mock.mock({
    'code': 0,
    'message': 'success', 
  }),

  'get /common/user': Mock.mock({
    'code': 0,
    'message': 'success', 
    'data': {
      "pageSize": 12,
      "currentPage": 1,
      "total|100-1000": 100,
      "list|1-100": [{
        'uid': '@guid',
        'name': '熊大',
        'role': '管理员',
        'phone': '13540180818',
        'email': '1378046566@qq.com',
        'address': '天府三街199号太平洋保险金融',
        'status|1': ['正常', '异常'],
      }]
    },
  }),

  'post /common/user': Mock.mock({
    'code': 0,
    'message': 'success', 
  }),

  'put /common/user': Mock.mock({
    'code': 0,
    'message': 'success', 
  }),

  'get /common/role': Mock.mock({
    'code': 0,
    'message': 'success', 
    'data': {
      "pageSize": 10,
      "currentPage": 1,
      "total|100-1000": 100,
      "list|1-100": [{
        'roleid': '@guid',
        'rolename': '熊大',
        'roledesc': '描述描述描述描述描述',
        'status|1': ['正常', '异常'],
      }]
    },
  }),

  'delete /common/user': Mock.mock({
    'code': 0,
    'message': 'success', 
  }),

  'post /common/role': Mock.mock({
    'code': 0,
    'message': 'success', 
  }),

  'put /common/role': Mock.mock({
    'code': 0,
    'message': 'success', 
  }),

  'delete /common/role': Mock.mock({
    'code': 0,
    'message': 'success', 
  }),
}

module.exports = mockapi;
