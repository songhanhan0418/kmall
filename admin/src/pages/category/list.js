
import React,{ Component } from 'react'
import Layout from 'common/layout'
import { Breadcrumb,Button,Table,InputNumber,Divider,Modal,Input  } from 'antd';
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import {actionCreator} from './store'



class CategoryList extends Component{
    constructor(props){
        super(props);
        this.state = {
            pid:this.props.match.params.pid || 0
        }
    }
    componentDidUpdate(preProps,preState){
        const oldPath = preProps.location.pathname;
        const newPath = this.props.location.pathname;
        const newPid = this.props.match.params.pid || 0;
        if(oldPath != newPath){
            this.setState(()=>({pid:newPid}),()=>{
                this.props.handlePage(newPid,1)
            })
        }
    }
    componentDidMount(){
        this.props.handlePage(this.state.pid,1);
    } 
    render(){
        const columns = [{
            title: 'id',
            dataIndex: 'id',
            key: 'id',
        }, {
            title: '分类名称',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '排序',
            dataIndex: 'order',
            key: 'order',
            render:(order,record,pid)=><InputNumber defaultValue={order} onBlur = {(ev)=>{
                //console.log(ev.target.value,record.id,record.pid)
                handleUpdateOrde(record.pid,record.id,ev.target.value)
            }} />
        },{
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => (
            <span>
                <a 
                href="javascript:;"
                onClick={()=>{
                    showUpdateNameModal(record.id,record.name)
                }}
                >修改名称</a>
                {
                    pid == 0
                    ? <span>
                        <Divider type="vertical" />
                        <Link to={"/category/"+record.id} >查看子分类</Link>                    
                    </span>
                    : null
                }

            </span>
          ),       
        }];

      const { 
        list,
        current,
        pageSize,
        total,
        isPageFetching,
        handlePage,
        id,
        newOrder,
        handleUpdateOrde,
        updateNameModealVisible,
        showUpdateNameModal,
        closeUpdateNameModal, 
        updateName,
        handleUpdateNameChange,
        handleUpdateName
        } = this.props

      const {pid} = this.state
      const dataSource = list.map(category=>{
        return{
                key:category.get('_id'),
                id:category.get('_id'),
                name: category.get('name'),
                order: category.get('order'),
                pid: category.get('pid'),
        }
      }).toJS()
        return (
        	<div className='CategoryList'>
        		<Layout>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>分类管理</Breadcrumb.Item>
                        <Breadcrumb.Item>分类列表</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className='clearfix'>
                        <h4 style={{float:'left'}}>父级元素id:{pid}</h4>
                        <Link style={{float:'right'}} to={'/category/add'} >
                            <Button type="primary" >添加分类</Button>
                        </Link>
                    </div>
                    <Table 
                        dataSource={dataSource} 
                        columns={columns} 
                        pagination={{
                            current:current,
                            pageSize:pageSize,
                            total:total
                        }}
                        onChange={(page)=>{
                            handlePage(pid,page.current)
                        }}
                        loading={{
                          spinning:isPageFetching,
                          tip:'正在加载数据'
                        }}
                    />
                    <Modal
                      title="修改分类名称"
                      visible={updateNameModealVisible}
                      onOk={()=>{handleUpdateName(pid)}}
                      onCancel={closeUpdateNameModal}
                      okText = '确认'
                      cancelText = '取消'
                    >
                        <Input 
                        value={updateName}
                        onChange={(ev)=>{
                            handleUpdateNameChange(ev.target.value)
                        }}

                         />
                    </Modal>
        		</Layout>
        	</div>
        	)
      }
}
const mapStateToProps = (state)=>{
    return {
        list:state.get('category').get('list'),
        current:state.get('category').get('current'),
        pageSize:state.get('category').get('pageSize'),
        total:state.get('category').get('total'),
        isPageFetching:state.get('category').get('isPageFetching'),
        updateNameModealVisible:state.get('category').get('updateNameModealVisible'),
        updateName:state.get('category').get('updateName'),

    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        handlePage:(pid,page)=>{
            const action =actionCreator.getPageAction(pid,page)
            dispatch(action)
        },
        handleUpdateOrde:(pid,id,newOrder)=>{
            const action =actionCreator.getUpdateOrderAction(pid,id,newOrder)
            dispatch(action)
        },
        showUpdateNameModal:(updateId,updateName)=>{
            const action =actionCreator.getShowUpdateNameModalAction(updateId,updateName)
            dispatch(action)            
        },
        closeUpdateNameModal:()=>{
            const action =actionCreator.getCloseUpdateNameModalAction()
            dispatch(action)            
        },
        handleUpdateNameChange:(value)=>{
            const action =actionCreator.getUpdateNameChangeAction(value)
            dispatch(action) 
        },
        handleUpdateName:(pid)=>{
            const action =actionCreator.getUpdateNameAction(pid)
            dispatch(action) 
        },
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(CategoryList);