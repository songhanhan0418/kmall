
import React,{ Component } from 'react'
import Layout from 'common/layout'
import { Breadcrumb,Button,Table,InputNumber,Divider,Modal  } from 'antd';
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import {actionCreator} from './store'



class CategoryList extends Component{

    render(){
        return (
        	<div className='CategoryList'>
        		<Layout>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>商品管理</Breadcrumb.Item>
                        <Breadcrumb.Item>商品列表</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className='clearfix'>
                        <Link style={{float:'right'}} to={'/product/save'} >
                            <Button type="primary" >添加分类</Button>
                        </Link>
                    </div>
                    
        		</Layout>
        	</div>
        	)
      }
}
const mapStateToProps = (state)=>{
    return {
        
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(CategoryList);