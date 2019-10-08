(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{101:function(e,t,n){},102:function(e,t,n){},129:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(8),c=n.n(r),i=(n(101),n(18)),l=n(29),s=(n(102),n(20)),u=n.n(s),m=n(74),d=n.n(m),p=n(179),h=n(177),f=n(11),g=n(12),b=n(14),E=n(13),O=n(15),v=n(9),y=n(4),j=n(162),C=function(e,t){return function(n){n({type:"LOADING_UI"}),u.a.post("/user/login",e).then(function(e){S(e.data.token),n(D()),n({type:"CLEAR_ERRORS"}),t.push("/dashboard")}).catch(function(e){n({type:"SET_ERRORS",payload:e.response.data})})}},D=function(){return function(e){e({type:"LOADING_USER"}),u.a.get("/user").then(function(t){e({type:"SET_USER",payload:t.data})}).catch(function(e){console.log("Error setting user."),console.log(e)})}},w=function(){return function(e){N(),e({type:"SET_UNAUTHENTICATED"})}},S=function(e){var t="Bearer ".concat(e);localStorage.setItem("FBIdToken",t),u.a.defaults.headers.common.Authorization=t},N=function(){localStorage.removeItem("FBIdToken"),delete u.a.defaults.headers.common.Authorization},T=function(){return function(e){e({type:"FETCHING_DOCUMENTS"}),u.a.get("/documents").then(function(t){console.log(t.data),e({type:"SET_DOCUMENTS",payload:t.data}),e({type:"FETCHING_COMPLETE"})}).catch(function(e){console.log("Error retrieving documents."),console.log(e)})}},I=function(e,t){var n={handle:e,docID:t};u.a.post("/document/addCollaborator",n).then(function(e){console.log(e.data)}).catch(function(e){console.log(e.response.data)})},_=function(e){function t(e){var n;return Object(f.a)(this,t),(n=Object(b.a)(this,Object(E.a)(t).call(this,e))).state={},n}return Object(O.a)(t,e),Object(g.a)(t,[{key:"componentDidMount",value:function(){var e=this.getTextDocumentRef();setTimeout(function(){},1e4);var t=window.CodeMirror(document.getElementById("firepad-container"),{lineWrapping:!0,lineNumbers:!0});console.log(t);var n=window.Firepad.fromCodeMirror(e,t,{richTextToolbar:!1,richTextShortcuts:!0});console.log(n),n.on("ready",function(){console.log("firepad ready"),n.isHistoryEmpty()&&(console.log("History empty()"),n.setHtml("Collaborative-editing made easy.\n"))})}},{key:"getTextDocumentRef",value:function(){var e=window.firebase.database().ref(),t=this.props.document.activeDocument.docID;return console.log("HASH: "+t),console.log(e),t?e=e.child(t):(e=e.push(),window.location=window.location+"#"+e.key),"undefined"!==typeof console&&console.log("Firebase data: ",e.toString()),e}},{key:"render",value:function(){var e=this.props.classes;return console.log(document.loading),o.a.createElement("div",{className:e.textEditor},o.a.createElement("div",{id:"firepad-container",className:e.firepadContainer}))}}]),t}(a.Component),U={loginUser:C,getDocuments:T},P=Object(v.b)(function(e){return{document:e.document}},U)(Object(y.a)(function(e){return{firepadContainer:{backgroundColor:"#282c34",color:"white",height:"1000px"},textEditor:{}}})(_)),x=function(e){function t(e){var n;return Object(f.a)(this,t),(n=Object(b.a)(this,Object(E.a)(t).call(this,e))).state={},n}return Object(O.a)(t,e),Object(g.a)(t,[{key:"render",value:function(){return o.a.createElement(j.a,{container:!0},o.a.createElement(j.a,{item:!0,xs:2,sm:2,md:2}),o.a.createElement(j.a,{item:!0,xs:8,sm:8,md:8},o.a.createElement(P,null)),o.a.createElement(j.a,{item:!0,xs:2,sm:2,md:2}))}}]),t}(a.Component),k=Object(v.b)(function(e){return{document:e.document}},{})(Object(y.a)(function(e){return{root:{flexGrow:1},paper:{padding:e.spacing(2),textAlign:"right",color:e.palette.text.secondary,height:"80vh"}}})(x)),A=n(21),R=n(166),L=n(176),M=n(163),H=function(e){function t(e){var n;return Object(f.a)(this,t),(n=Object(b.a)(this,Object(E.a)(t).call(this,e))).handleChange=function(e){n.setState(Object(A.a)({},e.target.name,e.target.value))},n.handleSubmit=function(e){e.preventDefault();var t={email:n.state.email,password:n.state.password};n.props.loginUser(t,n.props.history)},n.state={email:"",password:"",errors:{}},n}return Object(O.a)(t,e),Object(g.a)(t,[{key:"render",value:function(){var e=this.props.classes;return o.a.createElement(j.a,{container:!0},o.a.createElement(j.a,{item:!0,sm:!0}),o.a.createElement(j.a,{item:!0,sm:!0,className:e.form},o.a.createElement(M.a,{variant:"h1",className:e.pageTitle},"Login"),o.a.createElement("form",{noValidate:!0,onSubmit:this.handleSubmit},o.a.createElement(L.a,{id:"email",name:"email",type:"email",label:"Email",InputProps:{className:e.input},value:this.state.email,onChange:this.handleChange,fullWidth:!0}),o.a.createElement(L.a,{id:"password",name:"password",type:"password",label:"Password",InputProps:{className:e.input},value:this.state.password,onChange:this.handleChange,fullWidth:!0}),o.a.createElement(R.a,{type:"submit",variant:"contained",color:"primary",className:e.button},"Login"),o.a.createElement(R.a,{color:"primary",component:i.b,to:"/signup"},"Signup"),o.a.createElement("br",null),o.a.createElement("small",null,"Don't have an account? Sign up ",o.a.createElement(i.b,{to:"/signup"},"here.")))),o.a.createElement(j.a,{item:!0,sm:!0}))}}]),t}(a.Component),W={loginUser:C},F=Object(v.b)(function(e){return{UI:e.UI,user:e.user}},W)(Object(y.a)({form:{textAlign:"center",padding:"50px",backgroundColor:"#d3d3d3",color:"black"},pageTitle:{margin:"10px auto 10px auto",fontSize:50},button:{margin:"20px",position:"relative"},customError:{color:"red",fontSize:"0.8rem",marginTop:"10px"}})(H)),G=function(e){function t(e){var n;return Object(f.a)(this,t),(n=Object(b.a)(this,Object(E.a)(t).call(this,e))).handleChange=function(e){n.setState(Object(A.a)({},e.target.name,e.target.value))},n.handleSubmit=function(e){e.preventDefault(),console.log("Signup.js"),console.log(n.state),n.props.signup(n.state)},n.state={handle:"",email:"",confirmEmail:"",password:"",confirmPassword:""},n}return Object(O.a)(t,e),Object(g.a)(t,[{key:"render",value:function(){var e=this.props.classes;return o.a.createElement(j.a,{container:!0},o.a.createElement(j.a,{item:!0,sm:!0}),o.a.createElement(j.a,{item:!0,sm:!0,className:e.form},o.a.createElement(M.a,{variant:"h3",className:e.pageTitle},"Signup"),o.a.createElement("form",{noValidate:!0,onSubmit:this.handleSubmit},o.a.createElement(L.a,{id:"handle",name:"handle",type:"text",label:"User Handle",InputProps:{className:e.input},value:this.state.handle,onChange:this.handleChange,fullWidth:!0}),o.a.createElement(L.a,{id:"email",name:"email",type:"email",label:"Email",InputProps:{className:e.input},value:this.state.email,onChange:this.handleChange,fullWidth:!0}),o.a.createElement(L.a,{id:"confirmEmail",name:"confirmEmail",type:"email",label:"Confirm Email",InputProps:{className:e.input},value:this.state.confirmEmail,onChange:this.handleChange,fullWidth:!0}),o.a.createElement(L.a,{id:"password",name:"password",type:"password",label:"Password",InputProps:{className:e.input},value:this.state.password,onChange:this.handleChange,fullWidth:!0}),o.a.createElement(L.a,{id:"confirmPassword",name:"confirmPassword",type:"password",label:"Confirm Password",InputProps:{className:e.input},value:this.state.confirmPassword,onChange:this.handleChange,fullWidth:!0}),o.a.createElement(R.a,{type:"submit",color:"primary",component:i.b,to:"/login"},"Submit"))),o.a.createElement(j.a,{item:!0,sm:!0}))}}]),t}(a.Component),z={signup:function(e){return function(t){console.log("Signing in"),console.log(e),u.a.post("/user/signup",e).then(function(e){console.log(e),S(e.data.token),t(D())}).catch(function(e){console.log(e),t({type:"SET_ERRORS",payload:e.response.data})})}}},B=Object(v.b)(function(e){return{}},z)(Object(y.a)({form:{textAlign:"center",padding:"50px",backgroundColor:"#d3d3d3",color:"black"},pageTitle:{margin:"10px auto 10px auto",fontSize:50},button:{margin:"20px",position:"relative"}})(G)),V=n(78),J=n.n(V),X=n(82),q=n.n(X),$=n(171),K=n(172),Q=n(173),Y=n(79),Z=n(3),ee=n(80),te=n.n(ee),ne=n(165),ae=n(168),oe=n(169),re=n(170),ce=n(167),ie=n(180),le={horizontal:{display:"flex",flexDirection:"row",overflow:"auto",whiteSpace:"nowrap"},avatar:{width:80,height:80,"&:hover":{color:ce.a[800],cursor:"pointer"}}},se=function(e){function t(){var e,n;Object(f.a)(this,t);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(n=Object(b.a)(this,(e=Object(E.a)(t)).call.apply(e,[this].concat(o)))).validUser=function(e){var t=!0;return 0===e.length&&(t=!1),t},n.inviteFriend=function(){n.validUser(n.props.handle)?n.props.addCollaborator(n.props.handle,n.props.docID):console.log("User must not be empty.")},n}return Object(O.a)(t,e),Object(g.a)(t,[{key:"render",value:function(){var e=this.props.classes;Object(Y.loadCSS)("https://use.fontawesome.com/releases/v5.1.0/css/all.css",document.querySelector("#font-awesome-css"));var t=this.props.users.map(function(t){return o.a.createElement(ae.a,{key:t},o.a.createElement(ie.a,{title:t,"aria-label":t},o.a.createElement(oe.a,{className:e.avatar},o.a.createElement(te.a,{size:50,string:t}))))});return o.a.createElement(ne.a,{className:e.horizontal},o.a.createElement(ae.a,null,o.a.createElement(ie.a,{title:"Add","aria-label":"add"},o.a.createElement(oe.a,{className:e.avatar},o.a.createElement(re.a,{className:Object(Z.a)("fa fa-plus-circle",e.avatar),color:"action",style:{fontSize:80},onClick:this.inviteFriend})))),t)}}]),t}(a.Component),ue={addCollaborator:I},me=Object(v.b)(function(e){return{document:e.document}},ue)(Object(y.a)(le)(Object(l.f)(se))),de=function(e){function t(e){var n;return Object(f.a)(this,t),(n=Object(b.a)(this,Object(E.a)(t).call(this,e))).openDocument=function(e){e.preventDefault(),console.log("Opening document: "+n.props.document.docID),n.props.getDocument(n.props.document.docID),setTimeout(function(){n.props.history.push("/editor")},750)},n.deleteDocument=function(e){e.preventDefault(),n.props.deleteDocument(n.props.document.docID)},n.handleChange=function(e){n.setState(Object(A.a)({},e.target.name,e.target.value))},n.state={handle:""},n}return Object(O.a)(t,e),Object(g.a)(t,[{key:"render",value:function(){var e=this.props.classes;return o.a.createElement($.a,{className:e.card},o.a.createElement(K.a,null,o.a.createElement(q.a,{className:e.deleteForever,color:"secondary",onClick:this.deleteDocument}),o.a.createElement(M.a,{className:e.title,color:"textSecondary",onClick:this.openDocument},this.props.document.docID),o.a.createElement(M.a,{variant:"h5",component:"h2"},this.props.document.title),o.a.createElement(M.a,{variant:"body2",component:"p"},this.props.content),o.a.createElement(L.a,{id:"handle",name:"handle",type:"text",label:"User Handle",InputProps:{className:e.input},value:this.state.handle,onChange:this.handleChange,fullWidth:!0})),o.a.createElement(Q.a,null,o.a.createElement(me,{handle:this.state.handle,docID:this.props.document.docID,users:this.props.document.collaborators})))}}]),t}(o.a.Component),pe={getDocument:function(e){return function(t){t({type:"LOADING_DOCUMENT"}),u.a.get("/document/".concat(e)).then(function(e){t({type:"SET_DOCUMENT",payload:e.data})}).catch(function(e){console.log("Client Error retrieving document."),console.log(e)})}},addCollaborator:I,deleteDocument:function(e){return function(t){console.log("DELETING: "+e),t({type:"LOADING_DOCUMENT"}),u.a.delete("/document",{data:{docID:e}}).then(function(n){t({type:"DELETE_DOCUMENT",payload:e})}).catch(function(e){console.log("Error deleting document"),console.log(e)})}}},he=Object(v.b)(function(e){return{}},pe)(Object(y.a)({card:{minWidth:275,minHeight:275},deleteForever:{float:"right",cursor:"pointer"},title:{fontSize:14,cursor:"pointer"}})(Object(l.f)(de))),fe=function(e){function t(e){var n;return Object(f.a)(this,t),(n=Object(b.a)(this,Object(E.a)(t).call(this,e))).handleChange=function(e){n.setState(Object(A.a)({},e.target.name,e.target.value))},n.createNewDocument=function(){console.log(n.props.user.credentials.handle),n.props.createDocument(n.state.title,n.state.content,n.props.user.credentials.handle)},n.state={title:"",content:""},n}return Object(O.a)(t,e),Object(g.a)(t,[{key:"render",value:function(){var e=this.props.classes;return o.a.createElement($.a,{className:e.card},o.a.createElement(K.a,null,o.a.createElement(M.a,{variant:"h5",component:"h2"},"Create New Document"),o.a.createElement(L.a,{id:"title",name:"title",type:"text",label:"Title",InputProps:{className:e.input},value:this.state.title,onChange:this.handleChange,fullWidth:!0}),o.a.createElement(L.a,{id:"content",name:"content",type:"text",label:"Content",InputProps:{className:e.input},value:this.state.content,onChange:this.handleChange,fullWidth:!0}),o.a.createElement(R.a,{variant:"outlined",className:e.add,onClick:this.createNewDocument},"Submit")))}}]),t}(o.a.Component),ge={createDocument:function(e,t,n){return function(a){u.a.post("/document",{title:e,content:t,handle:n}).then(function(e){a({type:"CREATE_DOCUMENT",payload:e.data})}).catch(function(e){console.log("Error creating document."),console.log(e)})}}},be=Object(v.b)(function(e){return{user:e.user}},ge)(Object(y.a)({card:{minWidth:275,minHeight:275,position:"relative"},title:{fontSize:14},add:{margin:"20px",right:0,bottom:0,position:"absolute"}})(Object(l.f)(fe))),Ee=function(e){function t(){var e,n;Object(f.a)(this,t);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(n=Object(b.a)(this,(e=Object(E.a)(t)).call.apply(e,[this].concat(o)))).state={documents:null},n}return Object(O.a)(t,e),Object(g.a)(t,[{key:"componentDidMount",value:function(){this.props.getDocuments()}},{key:"render",value:function(){var e=this.props.document,t=e.documents,n=(e.loading,this.props.UI.fetching_documents),a=this.props.classes,r=n?o.a.createElement(J.a,{className:a.loading,type:"bars",color:"white"}):t.map(function(e){return o.a.createElement(j.a,{key:e.docID,item:!0,xs:12,sm:6,md:4,lg:3},o.a.createElement(he,{document:e}))});return o.a.createElement(j.a,{container:!0,spacing:10},o.a.createElement(j.a,{item:!0,xs:12,sm:6,md:4,lg:3},o.a.createElement(be,null)),r)}}]),t}(a.Component),Oe={loginUser:C,getDocuments:T},ve=Object(v.b)(function(e){return{document:e.document,UI:e.UI}},Oe)(Object(y.a)({loading:{marginTop:60}})(Ee)),ye=n(174),je=n(175),Ce=function(e){function t(){return Object(f.a)(this,t),Object(b.a)(this,Object(E.a)(t).apply(this,arguments))}return Object(O.a)(t,e),Object(g.a)(t,[{key:"render",value:function(){var e=this.props.classes;return o.a.createElement(ye.a,{position:"absolute"},o.a.createElement(je.a,{className:e.navContainer},o.a.createElement(R.a,{color:"inherit",component:i.b,to:"/"},"Home"),o.a.createElement(R.a,{color:"inherit",component:i.b,to:"/dashboard"},"Dashboard"),o.a.createElement(R.a,{color:"inherit",component:i.b,to:"/",onClick:this.props.logoutUser},"Logout"),o.a.createElement(R.a,{color:"inherit",component:i.b,to:"/login"},"Login")))}}]),t}(a.Component),De={logoutUser:w},we=Object(v.b)(function(e){return{}},De)(Object(y.a)(function(e){return{navContainer:{backgroundColor:"#282c34"}}})(Ce)),Se=function(e){function t(e){var n;return Object(f.a)(this,t),(n=Object(b.a)(this,Object(E.a)(t).call(this,e))).state={user:null,noUserFound:!1},n}return Object(O.a)(t,e),Object(g.a)(t,[{key:"render",value:function(){return o.a.createElement("div",null,"Hello from home")}}]),t}(a.Component),Ne=Object(y.a)({})(Se),Te=n(85),Ie=n(5),_e=function(e){var t=e.component,n=e.authenticated,a=Object(Te.a)(e,["component","authenticated"]);return o.a.createElement(l.b,Object.assign({},a,{render:function(e){return!0===n?o.a.createElement(t,e):o.a.createElement(l.a,{to:"/login"})}}))};_e.prototype={user:n.n(Ie).a.object};var Ue=Object(v.b)(function(e){return{authenticated:e.user.authenticated}})(_e),Pe=n(36),xe=n(83);function ke(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,a)}return n}function Ae(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?ke(n,!0).forEach(function(t){Object(A.a)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ke(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}var Re={authenticated:!1,loading:!1,credentials:{}},Le=n(84);function Me(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,a)}return n}function He(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?Me(n,!0).forEach(function(t){Object(A.a)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Me(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}var We={activeDocument:null,documents:[],loading:!0};function Fe(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,a)}return n}function Ge(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?Fe(n,!0).forEach(function(t){Object(A.a)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Fe(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}var ze={fetching_documents:void 0,ui_errors:void 0,loading:!1,error:void 0},Be=[xe.a],Ve=Object(Pe.c)({UI:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ze,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"FETCHING_DOCUMENTS":return Ge({},e,{fetching_documents:!0});case"FETCHING_COMPLETE":return Ge({},e,{fetching_documents:!1});case"SET_ERRORS":return Ge({},e,{loading:!1,errors:t.payload});case"CLEAR_ERRORS":return Ge({},e,{loading:!1,errors:null});case"LOADING_UI":return Ge({},e,{loading:!0});case"STOP_LOADING_UI":return Ge({},e,{loading:!1});default:return e}},user:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Re,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_AUTHENTICATED":return Ae({},e,{authenticated:!0});case"SET_UNAUTHENTICATED":return Re;case"SET_USER":return Ae({loading:!1,authenticated:!0},t.payload);case"LOADING_USER":return Ae({},e,{loading:!0});default:return e}},document:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:We,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_DOCUMENT":return He({},e,{loading:!0,activeDocument:t.payload});case"SAVE_DOCUMENT":return He({},e);case"SET_CONTENT":return He({},e,{activeDocument:He({},e.activeDocument,{content:t.payload})});case"SET_DOCUMENTS":return He({},e,{loading:!1,documents:t.payload});case"LOADING_DOCUMENT":return He({},e,{loading:!0});case"CREATE_DOCUMENT":return He({},e,{documents:[].concat(Object(Le.a)(e.documents),[t.payload])});case"DELETE_DOCUMENT":return He({},e,{loading:!1,documents:e.documents.filter(function(e){return e.docID!==t.payload})});default:return e}}}),Je=function(){try{var e=localStorage.getItem("state");if(null===e)return;return JSON.parse(e)}catch(t){console.log("Error loading state.")}}(),Xe=Object(Pe.e)(Ve,Je,Object(Pe.d)(Pe.a.apply(void 0,Be),window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__()));Xe.subscribe(function(){!function(e){try{var t=JSON.stringify(e);localStorage.setItem("state",t)}catch(n){console.log("Error saving state.")}}(Xe.getState())});var qe=Xe;u.a.defaults.baseURL="https://us-central1-novafire-c701c.cloudfunctions.net/api";var $e=localStorage.FBIdToken;$e&&(1e3*d()($e).exp<Date.now()?(qe.dispatch(w()),window.location.href="/login"):(qe.dispatch({type:"SET_AUTHENTICATED"}),u.a.defaults.headers.common.Authorization=$e,qe.dispatch(D())));var Ke=Object(p.a)({productionPrefix:"c"});var Qe=function(){return o.a.createElement(h.b,{generateClassName:Ke},o.a.createElement(v.a,{store:qe},o.a.createElement(i.a,null,o.a.createElement(we,null),o.a.createElement("div",{className:"container"},o.a.createElement(l.b,{exact:!0,path:"/",component:Ne}),o.a.createElement(l.b,{exact:!0,path:"/login",component:F}),o.a.createElement(l.b,{path:"/signup",component:B}),o.a.createElement(Ue,{exact:!0,path:"/dashboard",component:ve}),o.a.createElement(Ue,{path:"/editor",component:k})))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(o.a.createElement(Qe,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},96:function(e,t,n){e.exports=n(129)}},[[96,1,2]]]);
//# sourceMappingURL=main.d2768ebb.chunk.js.map