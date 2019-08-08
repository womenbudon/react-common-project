/**
 * @flow
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUserList, addUser, updateUser, deleteUser } from 'modules/userRedux';
import { Input, Button, Table, Modal, Icon, Popconfirm, message, Spin } from 'antd';
import UserFrom from './form';

import './style/user.less';

const Search = Input.Search;

type Props = {
  fetchUserList: typeof fetchUserList,
  addUser: typeof addUser,
  updateUser: typeof updateUser,
  deleteUser: typeof updateUser,
  loading: boolean,
  list: Array<Object>,
};
type State = {
  modalVisible: boolean,
  updateStatus: boolean,
  currentUser: Object,
  name: string,
};
class User extends Component<Props, State> {
  userForm: Object;
  constructor(props: Props) {
    super(props);
    this.state = {
      modalVisible: false,
      updateStatus: false,
      name: '',
      currentUser: {},
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

  initUserList = () => {
    this.props.fetchUserList({ name: this.state.name })
  }

  componentDidMount = () => {
    this.initUserList();
  }

  submitUser = () => {
    this.userForm.validateFields((err, values) => {
      if (err) return;
      const { updateStatus } = this.state;
      const { userid } = this.state.currentUser;
      if (updateStatus) {
        this.props.updateUser({ userid, ...values })
          .then(() => {
            message.success('编辑成功');
          });
      } else {
        this.props.addUser(values)
          .then(() => {
            message.success('新增成功');
          });
      }
      this.userForm.resetFields();
      this.closeModal();
      this.initUserList();
    });
  }

  handleCancel = () => {
    this.userForm.resetFields();
    this.setState({
      modalVisible: false,
    });
  }

  deleteUserInfo = (user) => {
    this.props.deleteUser({ userid: user.userid }).then(() => {
      message.success('删除成功');
      this.initUserList();
    });
  }

  render() {
    const columns = [{
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: '电话',
      dataIndex: 'phone',
      key: 'phone',
    }, {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    }, {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    }, {
      title: '操作',
      dataIndex: 'userid',
      key: 'userid',
      render: (text, record) => (
        <div className="operate-col">
          <Icon
            type="edit"
            style={{ fontSize: 16, color: '#83B6FF', marginRight: 5 }}
            onClick={() => this.showModal({ modalVisible: true, updateStatus: true, currentUser: record })}
          />
          <Popconfirm
            placement="top"
            title="确定要删除吗"
            onConfirm={() => this.deleteUserInfo(record)}
            okText="确定"
            cancelText="取消"
          >
            <Icon type="delete" style={{ fontSize: 16, color: '#FF4A4A' }} />
          </Popconfirm>
        </div>
      ),
    }];

    const { modalVisible, updateStatus, currentUser } = this.state;
    const userList = this.props.list;
    return (
      <div className="user-content-wraper" >
        <Search
          placeholder="输入用户名查询"
          onSearch={value => this.setState({ name: value }, this.initUserList())}
          enterButton
          style={{ width: 350 }}
        />
        <div className="add-btn-wraper">
          <Button type="primary" icon="plus" onClick={() => this.showModal({ modalVisible: true, updateStatus: false })}>新增</Button>
        </div>
        <div className="table-wraper">
          <Spin spinning={this.props.loading}>
            <Table dataSource={userList} columns={columns} />
          </Spin>
        </div>
        <Modal
          title={updateStatus ? '编辑' : '新增'}
          visible={modalVisible}
          onOk={this.submitUser}
          onCancel={this.handleCancel}
        >
          <UserFrom
            user={currentUser}
            ref={(userForm) => { return userForm ? this.userForm = userForm : null }}
          />
        </Modal>
      </div>
    );
  }
}

export default connect(
  (state) => {
    const { userRedux } = state;
    return ({ ...userRedux });
  },
  (dispatch: Dispatch) => bindActionCreators(
    {
      fetchUserList, addUser, updateUser, deleteUser,
    }, dispatch,
  ),
)(User);
