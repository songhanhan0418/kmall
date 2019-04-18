/*
* @Author: TomChen
* @Date:   2019-04-09 19:29:30
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-14 17:32:46
*/
import { connect } from 'react-redux'
import React,{ Component } from 'react'
import Layout from 'common/layout'
import { Table, Divider, Tag } from 'antd';
import moment from 'moment'
import {actionCreator} from './store'
import './index.css'


const dataSource = [{
  key: '1',
  username: 'admin',
  isAdmin: true,
  email: 'xxx@23.com',
  phone: '1213213123',
  createAt: '2019-4-17 10:10:10',
}, {
  key: '2',
  name: '胡彦祖',
  age: 42,
  address: '西湖区湖底公园1号'
}];

const columns = [{
  title: '用户名',
  dataIndex: 'username',
  key: 'name',
}, {
  title: '是否是管理员',
  dataIndex: 'isAdmin',
  key: 'isAdmin',
  render:isAdmin=>isAdmin ? '是' : '否'
}, {
  title: 'email',
  dataIndex: 'email',
  key: 'email',
},{
  title: '手机',
  dataIndex: 'phone',
  key: 'phone',
},{
  title: '注册时间',
  dataIndex: 'createAt',
  key: 'createAt',
}];

class User extends Component{
    componentDidMount(page){
        this.props.handlePage(1)
    }

    render(){
      const { list,current,pageSize,total,isFetching,handlePage } = this.props
      const dataSource = list.map(user=>{
        return{
                key: user.get('_id'),
                username: user.get('username'),
                isAdmin: user.get('isAdmin'),
                email: user.get('email'),
                phone: user.get('phone'),
                createAt: moment(user.get('createAt')).format('YYYY-MM-DD hh:mm:ss'),
        }
      }).toJS()
        return (
        	<div className='User'>
        		<Layout>
        			<Table 
                    dataSource={dataSource} 
                    columns={columns} 
                    pagination={{
                        current:current,
                        pageSize:pageSize,
                        total:total
                    }}
                    onChange={(page)=>{
                        handlePage(page.current)
                    }}
                    loading={{
                      spinning:isFetching,
                      tip:'正在加载数据'
                    }}
                    />
        		</Layout>
        	</div>

        	)
      }
}


const mapStateToProps = (state)=>{
    return {
        list:state.get('user').get('list'),
        current:state.get('user').get('current'),
        pageSize:state.get('user').get('pageSize'),
        total:state.get('user').get('total'),
        isFetching:state.get('user').get('isFetching')
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        handlePage:(page)=>{
            const action =actionCreator.getPageAction(page)
            dispatch(action)
        }
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(User);