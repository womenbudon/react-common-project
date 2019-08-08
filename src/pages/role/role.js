/**
 * @flow
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchRoleList, addRole, updateRole, deleteRole } from 'modules/roleRedux';
import { Input, Button, Table, Modal, Icon, Popconfirm, message, Spin } from 'antd';

import RoleForm from './form';
import './style/role.less';

const Search = Input.Search;

type Props = {
  fetchRoleList: typeof fetchRoleList,
  addRole: typeof addRole,
  updateRole: typeof updateRole,
  deleteRole: typeof updateRole,
  loading: boolean,
  list: Array<Object>,
};
type State = {
  modalVisible: boolean,
  currentRole: Object,
  updateStatus: boolean,
  rolename: string,
};
class Role extends Component<Props, State> {
  roleForm: Object;
  constructor(props: Props) {
    super(props);
    this.state = {
      modalVisible: false,
      updateStatus: false,
      rolename: '',
      currentRole: {},
    };
  }

  showModal = (obj) => {
    this.setState({ ...obj });
  }

  closeModal = () => {
    this.setState({
      modalVisible: false,
    });
  }

  handleCancel = () => {
    this.setState({
      modalVisible: false,
    });
  }

  initRoleList = () => {
    this.props.fetchRoleList({ rolename: this.state.rolename })
  }

  submitRole = () => {
    this.roleForm.validateFields((err, values) => {
      if (err) return;
      const { updateStatus } = this.state;
      const { roleid } = this.state.currentRole;
      if (updateStatus) {
        this.props.updateRole({ roleid, ...values })
          .then(() => {
            message.success('编辑成功');
          });
      } else {
        this.props.addRole(values)
          .then(() => {
            message.success('新增成功');
          });
      }
      this.roleForm.resetFields();
      this.closeModal();
      this.initRoleList();
    });
  }

  handleCancel = () => {
    this.roleForm.resetFields();
    this.setState({
      modalVisible: false,
    });
  }

  deleteRoleInfo = (role) => {
    this.props.deleteRole({ roleid: role.roleid }).then(() => {
      message.success('删除成功');
      this.initRoleList();
    });
  }

  componentDidMount = () => {
    this.initRoleList();
  }

  render() {
    const columns = [{
      title: '角色名',
      dataIndex: 'rolename',
      key: 'rolename',
    },
    {
      title: '角色描述',
      dataIndex: 'roledesc',
      key: 'roledesc',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '操作',
      dataIndex: 'roleid',
      key: 'roleid',
      render: (text, record) => (
        <div className="operate-col">
          <Icon
            type="edit"
            style={{ fontSize: 16, color: '#83B6FF', marginRight: 5 }}
            onClick={() => this.showModal({ modalVisible: true, updateStatus: true, currentRole: record })}
          />
          <Popconfirm
            placement="top"
            title="确定要删除吗"
            onConfirm={() => this.deleteRoleInfo(record)}
            okText="确定"
            cancelText="取消"
          >
            <Icon type="delete" style={{ fontSize: 16, color: '#FF4A4A' }} />
          </Popconfirm>
        </div>
      ),
    }];

    const { modalVisible, updateStatus, currentRole } = this.state;
    const roleList = this.props.list;
    return (
      <div className="Role-content-wraper" >
        <Search
          placeholder="输入角色名查询"
          onSearch={value => this.setState({ rolename: value }, this.initRoleList())}
          enterButton
          style={{ width: 350 }}
        />
        <div className="add-btn-wraper">
          <Button
            type="primary"
            icon="plus"
            onClick={() => this.showModal({ modalVisible: true, updateStatus: false })}
          >新增
          </Button>
        </div>
        <div className="table-wraper">
          <Spin spinning={this.props.loading}>
            <Table dataSource={roleList} columns={columns} />
          </Spin>
        </div>
        <Modal
          title={updateStatus ? '编辑' : '新增'}
          visible={modalVisible}
          onOk={this.submitRole}
          onCancel={this.handleCancel}
        >
          <RoleForm
            role={currentRole}
            ref={(roleForm) => { return roleForm ? this.roleForm = roleForm : null }}
          />
        </Modal>
      </div>
    );
  }
}

export default connect(
  (state) => {
    const { RoleRedux } = state;
    return ({ ...RoleRedux });
  },
  (dispatch: Dispatch) => bindActionCreators(
    {
      fetchRoleList, addRole, updateRole, deleteRole,
    }, dispatch,
  ),
)(Role);
