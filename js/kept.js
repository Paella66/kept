!function t(e,a,s){function o(n,i){if(!a[n]){if(!e[n]){var l="function"==typeof require&&require;if(!i&&l)return l(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var p=a[n]={exports:{}};e[n][0].call(p.exports,function(t){var a=e[n][1][t];return o(a?a:t)},p,p.exports,t,e,a,s)}return a[n].exports}for(var r="function"==typeof require&&require,n=0;n<s.length;n++)o(s[n]);return o}({1:[function(t,e){var a=t("react"),s=t("react-bootstrap").Button,o=t("react-bootstrap").Jumbotron,r=a.createClass({displayName:"DefaultContent",render:function(){return o({className:"kept-default"},a.DOM.h1(null,"Welcome to Kept"),a.DOM.p(null,"Your list is currently empty."),a.DOM.p(null,"You can create a ",a.DOM.a({href:"#",onClick:this.props.newItem("text")},"Text"),", a ",a.DOM.a({href:"#",onClick:this.props.newItem("todo")},"Todo")," or",s({bsStyle:"success",bsSize:"large",onClick:this.props.loadSamples},"Load samples"),"."))}});e.exports=r},{react:"M6d2gk","react-bootstrap":"AA3ko0"}],2:[function(t,e){var a=t("react"),s=t("react-bootstrap").Glyphicon,o=a.createClass({displayName:"GlyphIconLink",render:function(){return this.transferPropsTo(a.DOM.a(null,s({glyph:this.props.glyph})))}});e.exports=o},{react:"M6d2gk","react-bootstrap":"AA3ko0"}],3:[function(t,e){var a=t("../utils"),s=t("react"),o=t("../store"),r=t("../mixins/UndoStack"),n=t("./KeptTextForm"),i=t("./KeptTodoForm"),l=t("./KeptMenuBar"),p=t("./KeptItems"),d=t("../data/initial"),u=s.createClass({displayName:"KeptApp",mixins:[r],store:new o,getInitialState:function(){return{items:this.store.load()}},getStateSnapshot:function(){return{items:this.state.items}},setStateSnapshot:function(t){this.setState(t)},_forms:{text:function(t){return n({resetForm:this.resetForm,create:this.create,update:this.update,data:t})},todo:function(t){return i({resetForm:this.resetForm,create:this.create,update:this.update,data:t})}},save:function(t){this.store.save(t),this.snapshot(),this.setState({items:t})},loadSamples:function(){this.save(d)},formCreator:function(t){return function(e){this.setState({form:this._forms[t].call(this,e)})}.bind(this)},newItem:function(t){return this.formCreator(t).bind(null,{})},resetForm:function(){this.setState({form:null})},create:function(t){t.id=a.nextId(this.state.items),this.save(this.state.items.concat([t])),this.resetForm()},edit:function(t){this.formCreator(t.type)(t)},update:function(t){this.save(this.state.items.map(function(e){return e.id===t.id?t:e})),this.resetForm()},remove:function(t){this.save(this.state.items.filter(function(e){return t!==e}))},move:function(t,e){var a=this.state.items.slice(0);a.splice(e,0,a.splice(t,1)[0]),this.save(a)},render:function(){return s.DOM.div(null,l({newItem:this.newItem,loadSamples:this.loadSamples,undo:this.undo,redo:this.redo}),this.state.form,p({items:this.state.items,newItem:this.newItem,loadSamples:this.loadSamples,edit:this.edit,update:this.update,remove:this.remove,move:this.move}))}});e.exports=u},{"../data/initial":13,"../mixins/UndoStack":15,"../store":16,"../utils":17,"./KeptItems":5,"./KeptMenuBar":6,"./KeptTextForm":8,"./KeptTodoForm":10,react:"M6d2gk"}],4:[function(t,e){var a=t("react"),s=t("./GlyphiconLink"),o=t("./KeptText"),r=t("./KeptTodo"),n=t("react-bootstrap").Panel,i=a.createClass({displayName:"KeptEntry",_components:{text:function(t){return o({data:t})},todo:function(t){return r({data:t,update:this.props.update})}},getComponent:function(t){return this._components[t.type].call(this,t)},handleClickEdit:function(){this.props.edit(this.props.itemData)},handleClickDelete:function(){confirm("Are you sure?")&&(this.getDOMNode().classList.add("fade"),this.timeout=setTimeout(function(){this.getDOMNode().classList.remove("fade"),this.props.remove(this.props.itemData)}.bind(this),250))},handleDragStart:function(t){t.dataTransfer.effectAllowed="move",t.dataTransfer.setData("text/plain",this.props.key)},handleDragEnter:function(t){t.preventDefault()},handleDragLeave:function(t){this.unhighlight(),t.preventDefault()},handleOnDragOver:function(t){t.preventDefault(),this.highlight()},handleOnDrop:function(t){t.preventDefault(),this.unhighlight(),this.props.move(t.dataTransfer.getData("text/plain"),this.props.key)},highlight:function(){this.getDOMNode().querySelector(".panel").classList.add("targetted")},unhighlight:function(){this.getDOMNode().querySelector(".panel").classList.remove("targetted")},render:function(){var t=a.DOM.h3(null,this.props.itemData.title||"Untitled",s({href:"#",glyph:"trash",onClick:this.handleClickDelete}),s({href:"#",glyph:"edit",onClick:this.handleClickEdit}));return a.DOM.div({className:"kept-panel",onDragStart:this.handleDragStart,onDragEnter:this.handleDragEnter,onDragOver:this.handleOnDragOver,onDrop:this.handleOnDrop,onDragLeave:this.handleDragLeave,draggable:"true"},n({bsStyle:"primary",header:t},this.getComponent(this.props.itemData)))}});e.exports=i},{"./GlyphiconLink":2,"./KeptText":7,"./KeptTodo":9,react:"M6d2gk","react-bootstrap":"AA3ko0"}],5:[function(t,e){var a=t("react"),s=t("./KeptEntry"),o=t("./DefaultContent"),r=a.createClass({displayName:"KeepItems",render:function(){return this.props.items.length?a.DOM.div({className:"kept-list"},this.props.items.map(function(t,e){return s({key:e,itemData:t,edit:this.props.edit,remove:this.props.remove,update:this.props.update,move:this.props.move})}.bind(this))):o({newItem:this.props.newItem,loadSamples:this.props.loadSamples})}});e.exports=r},{"./DefaultContent":1,"./KeptEntry":4,react:"M6d2gk"}],6:[function(t,e){var a=t("react"),s=a.createClass({displayName:"KeptMenuBar",render:function(){return a.DOM.nav({className:"navbar navbar-default",role:"navigation"},a.DOM.div({className:"container-fluid"},a.DOM.div({className:"navbar-header"},a.DOM.a({className:"navbar-brand",href:"#"},"Kept")),a.DOM.div(null,a.DOM.ul({className:"nav navbar-nav"},a.DOM.li(null,a.DOM.a({href:"#",onClick:this.props.newItem("text")},"Text")),a.DOM.li(null,a.DOM.a({href:"#",onClick:this.props.newItem("todo")},"Todo")),a.DOM.li(null,a.DOM.a({href:"#",onClick:this.props.undo},"Undo")),a.DOM.li(null,a.DOM.a({href:"#",onClick:this.props.redo},"Redo")),a.DOM.li(null,a.DOM.a({href:"#",onClick:this.props.loadSamples},"Load samples"))))))}});e.exports=s},{react:"M6d2gk"}],7:[function(t,e){var a=t("react"),s=t("marked");s.setOptions({renderer:new s.Renderer,gfm:!0,tables:!0,breaks:!1,pedantic:!1,sanitize:!0,smartLists:!0,smartypants:!1});var o=a.createClass({displayName:"KeptText",render:function(){return a.DOM.div({className:"text-entry"},a.DOM.div({className:"text-entry-text",dangerouslySetInnerHTML:{__html:s(this.props.data.text)}}))}});e.exports=o},{marked:"OssCdo",react:"M6d2gk"}],8:[function(t,e){var a=t("react"),s=t("react-bootstrap").Modal,o=a.createClass({displayName:"KeptTextForm",handleCancel:function(){this.props.resetForm()},handleSubmit:function(){var t=parseInt(this.refs.id.getDOMNode().value.trim(),10),e=t?this.props.update:this.props.create;e({type:"text",id:t,title:this.refs.title.getDOMNode().value.trim(),text:this.refs.text.getDOMNode().value.trim()})},componentDidMount:function(){this.getDOMNode().querySelector("textarea").focus()},render:function(){var t=this.props.data;return s({title:"Create new Text",onRequestHide:this.props.resetForm,animation:!1},a.DOM.form({role:"form",onSubmit:this.handleSubmit},a.DOM.div({className:"modal-body"},a.DOM.input({type:"hidden",ref:"id",defaultValue:t.id}),a.DOM.div({className:"form-group"},a.DOM.input({ref:"title",type:"text",className:"form-control",placeholder:"Title",defaultValue:t.title})),a.DOM.div({className:"form-group"},a.DOM.textarea({ref:"text",className:"form-control",placeholder:"Text (accept markdown contents)…",defaultValue:t.text,rows:"8",required:!0}))),a.DOM.div({className:"modal-footer form-group"},a.DOM.button({type:"submit",className:"btn btn-primary"},"Save")," ",a.DOM.a({href:"#",onClick:this.handleCancel},"Cancel"))))}});e.exports=o},{react:"M6d2gk","react-bootstrap":"AA3ko0"}],9:[function(t,e){var a=t("react"),s=t("react-bootstrap").ProgressBar,o=t("./KeptTodoTask"),r=a.createClass({displayName:"KeptTodo",getInitialState:function(){return{tasks:this.props.data.tasks}},componentWillReceiveProps:function(t){this.setState({tasks:t.data.tasks})},clearCompleted:function(){this.updateTasks(this.state.tasks.filter(function(t){return!t.done}))},toggle:function(t){this.updateTasks(this.state.tasks.map(function(e,a){return a!==t?e:(e.done=!e.done,e)}))},updateTasks:function(t){this.setState({tasks:t}),this.props.update({type:"todo",id:this.props.data.id,title:this.props.data.title,tasks:t})},getProgress:function(){var t=this.state.tasks.filter(function(t){return!!t.done}).length;return this.state.tasks.length?Math.round(100*t/this.state.tasks.length):0},render:function(){return a.DOM.div(null,s({now:this.getProgress(),label:"%(percent)s%"}),a.DOM.ul({className:"list-group"},this.state.tasks.map(function(t,e){return o({key:e,data:t,toggle:this.toggle})}.bind(this))),a.DOM.p(null,a.DOM.a({href:"#",onClick:this.clearCompleted},"Clear completed")))}});e.exports=r},{"./KeptTodoTask":11,react:"M6d2gk","react-bootstrap":"AA3ko0"}],10:[function(t,e){var a=t("react"),s=t("react-bootstrap").Modal,o=t("./KeptTodoTaskForm"),r=a.createClass({displayName:"KeptTodoForm",getDefaultEntries:function(){return[{label:""}]},getInitialState:function(){return{tasks:this.props.data&&this.props.data.tasks||this.getDefaultEntries()}},addTask:function(t){t.preventDefault(),this.setState({tasks:this.state.tasks.concat(this.getDefaultEntries())}),setTimeout(this.focusLatestInput,0)},focusLatestInput:function(){var t=this.getDOMNode().querySelectorAll("input[type=text]");t[t.length-1].focus()},handleCancel:function(){this.props.resetForm()},handleSubmit:function(){var t=parseInt(this.refs.id.getDOMNode().value.trim(),10),e=t?this.props.update:this.props.create;e({type:"todo",id:t,title:this.refs.title.getDOMNode().value.trim(),tasks:(this.state.tasks||[]).filter(function(t){return!!t.label})})},updateTask:function(t,e){this.setState({tasks:this.state.tasks.map(function(a,s){return s===t?e:a})})},removeTask:function(t){this.setState({tasks:this.state.tasks.filter(function(e,a){return a!==t})})},componentDidMount:function(){this.focusLatestInput()},render:function(){return console.log("---"),s({title:"Create new Todo",onRequestHide:this.props.resetForm,animation:!1},a.DOM.form({className:"todo-form",role:"form",onSubmit:this.addTask},a.DOM.div({className:"modal-body"},a.DOM.input({type:"hidden",ref:"id",defaultValue:this.props.data.id}),a.DOM.div({className:"form-group"},a.DOM.input({ref:"title",type:"text",className:"form-control",placeholder:"Title",defaultValue:this.props.data.title})),a.DOM.ul({className:"list-group"},this.state.tasks.map(function(t,e){return o({key:e,data:t,updateTask:this.updateTask,removeTask:this.removeTask})},this))),a.DOM.div({className:"modal-footer form-group"},a.DOM.button({className:"btn btn-default",type:"submit"},"Add task")," ",a.DOM.button({className:"btn btn-primary",type:"button",onClick:this.handleSubmit},"Save")," ",a.DOM.a({href:"#",onClick:this.handleCancel},"Cancel"))))}});e.exports=r},{"./KeptTodoTaskForm":12,react:"M6d2gk","react-bootstrap":"AA3ko0"}],11:[function(t,e){var a=t("react"),s=a.createClass({displayName:"KeptTodoTask",handleChange:function(){this.props.toggle(this.props.key)},render:function(){var t=this.props.data;return a.DOM.li({className:"list-group-item"},a.DOM.label({className:t.done?"done":""},a.DOM.input({type:"checkbox",ref:"done",onChange:this.handleChange,checked:t.done?"checked":""}),a.DOM.span({className:"todo-item-label"},t.label)))}});e.exports=s},{react:"M6d2gk"}],12:[function(t,e){var a=t("react"),s=a.createClass({displayName:"KeptTodoTaskForm",handleUpdate:function(){this.props.updateTask(this.props.key,{label:this.refs.label.getDOMNode().value.trim(),done:this.refs.done.getDOMNode().checked})},handleRemove:function(t){t.preventDefault(),this.props.removeTask(this.props.key)},render:function(){var t=this.props.data;return console.log("rendering KeptTodoTaskForm",t.label),a.DOM.li({className:"form-inline list-group-item form-group"},a.DOM.input({ref:"done",type:"checkbox",onChange:this.handleUpdate,checked:t.done?"checked":""}),"   ",a.DOM.input({ref:"label",type:"text",className:"form-control",placeholder:"Label…",defaultValue:t.label,onBlur:this.handleUpdate}),"   ",a.DOM.a({className:"danger",href:"#",onClick:this.handleRemove,title:"Remove task"},a.DOM.span({className:"glyphicon glyphicon-remove"})))}});e.exports=s},{react:"M6d2gk"}],13:[function(t,e){e.exports=[{id:1,type:"text",title:"This is a Text entry",text:"Hello World."},{id:2,type:"text",title:"Lorem ipsum dolor sit amet",text:"**Consectetur adipisicing elit**, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."},{id:3,type:"todo",title:"Today",tasks:[{label:"Walk the dog",done:!0},{label:"Clean the car",done:!1},{label:"Buy a new carpet",done:!1}]},{id:4,type:"text",title:"Ut enim ad minim veniam",text:"Quis nostrud *exercitation ullamco* laboris nisi ut aliquip ex ea commodo consequat."},{id:5,type:"text",title:"Duis aute irure",text:"> Dolor in [reprehenderit](http://google.com/) in voluptate velit esse cillum dolore eu fugiat nulla pariatur."},{id:6,type:"text",title:"Excepteur sint occaecat",text:"    Cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},{id:7,type:"todo",title:"Trip to Paris",tasks:[{label:"Eat cheese",done:!1},{label:"Eat more cheese",done:!1},{label:"See Eiffel Tower",done:!1},{label:"MOAR CHEESE",done:!1}]}]},{}],14:[function(t){var e=t("react"),a=t("./components/KeptApp");e.renderComponent(a(null),document.getElementById("kept"))},{"./components/KeptApp":3,react:"M6d2gk"}],15:[function(t,e){var a={getInitialState:function(){return{undo:[],redo:[]}},snapshot:function(){var t=this.state.undo.concat(this.getStateSnapshot());this.setState({undo:t,redo:[]})},hasUndo:function(){return this.state.undo.length>0},hasRedo:function(){return this.state.redo.length>0},redo:function(){this._undoImpl(!0)},undo:function(){this._undoImpl()},_undoImpl:function(t){var e,a=this.state.undo.slice(0),s=this.state.redo.slice(0);if(t){if(0===s.length)return;e=s.pop(),a.push(this.getStateSnapshot())}else{if(0===a.length)return;e=a.pop(),s.push(this.getStateSnapshot())}this.setStateSnapshot(e),this.setState({undo:a,redo:s})}};e.exports=a},{}],16:[function(t,e){function a(t){t=t||{},this._store=t.store||localStorage}a.prototype={load:function(){var t=this._store.getItem("keep.data");if(!t)return console.error("empty stored kept data:",t),[];try{return JSON.parse(t)||[]}catch(e){return console.error("failed parsing kept data:",t,e),[]}},save:function(t){try{this._store["keep.data"]=JSON.stringify(t)}catch(e){console.error("failed saving keep data",e)}}},e.exports=a},{}],17:[function(t,e,a){function s(t){return Math.max.apply(null,t.concat([0]).map(function(t){return t.id||0}))+1}a.nextId=s},{}]},{},[14]);