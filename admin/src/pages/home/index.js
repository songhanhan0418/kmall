/*
* @Author: TomChen
* @Date:   2019-04-09 19:29:30
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-14 17:32:46
*/
import { connect } from 'react-redux'
import React,{ Component } from 'react'
import Layout from 'common/layout'
import { Card, Col, Row } from 'antd';
import {actionCreator} from './store'



class Home extends Component{
	componentDidMount(){
		this.props.handleCount()
	}
    render(){
    	const {usernum,productnum,ordernum} = this.props
        return (
        	<div className='Home'>
        		<Layout>
        			<Row gutter={16}>
				      <Col span={8}>
				        <Card title="用户数量" bordered={false}>{usernum}</Card>
				      </Col>
				      <Col span={8}>
				        <Card title="商品数量" bordered={false}>{productnum}</Card>
				      </Col>
				      <Col span={8}>
				        <Card title="订单数量" bordered={false}>{ordernum}</Card>
				      </Col>
				    </Row>
        		</Layout>
        	</div>

        	)
    }	
}


const mapStateToProps = (state)=>{
    return {
    	usernum:state.get('home').get('usernum'),
    	productnum:state.get('home').get('productnum'),
    	ordernum:state.get('home').get('ordernum'),

    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        handleCount:()=>{
            const action =actionCreator.getCountAction()
            dispatch(action)
        }
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Home);