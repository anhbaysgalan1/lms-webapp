import _ from 'lodash';

const RemoveDuplicate = (list1,list2)=>{
    //Nối 2 list lại với nhau
    const JoinList = _.concat(list1,list2);
    //Sắp xếp tăng dần theo _id
    const sortJoinList = _.sortBy(JoinList,(obj)=>{return obj._id});
    //List dùng để lưu _id trùng
    const list_id_duplicate = []
    //Xử lý nếu gặp trùng thì đút _id vào List trên
    for (let i = 0 ; i < sortJoinList.length -1 ; i++){
        if(_.isEqual(sortJoinList[i],sortJoinList[i+1])){
          list_id_duplicate.push(sortJoinList[i]._id);
        }
    }
    //List đã bỏ các obj trung lặp
    const list_unique = _.sortedUniqBy(sortJoinList,(el)=>{return el._id})
    
    _.map(list_id_duplicate,(index)=>{
      // Query theo ID => tìm ID 
      const removeIndex = list_unique.map((item)=>{return item._id}).indexOf(index)
      list_unique.splice(removeIndex,1);
    });
    return list_unique
}



export {
    RemoveDuplicate,
}