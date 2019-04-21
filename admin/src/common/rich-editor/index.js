import React ,{ Component } from 'react'
import Simditor from 'simditor'
import $ from 'jquery'

import 'simditor/styles/simditor.css'

class RichEditor extends Component {
	constructor(props){
		super(props);
		this.toolbar=[
			'title',
			'bold',
			'italic',
			'underline',
			'strikethrough',
			'fontScale',
			'color',
			'ol',
			'ul',
			'blockquote',
			'code',
			'table',
			'link',
			'image',
			'hr',
			'indent',
			'outdent',
			'alignment',
		];
		$.ajaxSetup({
			xhrFields:{
				withCredentials: true
			}
		})
	}
	componentDidMount(){
		this.simditor = new Simditor({
			textarea: this.textarea,
			toolbar:this.toolbar,
			upload:{
				url: this.props.url,
				fileKey: 'upload'
			}
		});
	}
	render(){
		return(

			<div className ='RichEditor'>
				<textarea ref={(dom)=>{this.textarea = dom}}></textarea>
			</div>
			)
		
	}
}

export default RichEditor