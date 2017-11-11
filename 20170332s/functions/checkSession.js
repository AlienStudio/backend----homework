module.exports=function getUserObject(session) {
    if(!session){
        return{flag:false};
    }else if(session.user===null||session.user===undefined){
        session=null;
        return{flag:false};
    }else{
        return{flag:true,name:session.user.Username,Authorization:session.user.Authorization,ID:session.user.ID};
    }
};