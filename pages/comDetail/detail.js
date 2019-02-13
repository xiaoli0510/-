//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    itemData:{},
    isUnfold:false,//是否展开简介
    isFoldSeeTxt:0,//0=>看过 1=》想看
    isFoldSee:false,//tab切换看过还是想看
    id:'',//影片id
    comArr:[],//短评
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title:options.title
    });
    this.setData({id:options.id});
    this.getDoubanData(options.id,this.getItemData);
  },
  //上拉触底 加载更多
  onReachBottom() {
    this.getDoubanData(this.data.id,this.getItemDataMore);
    // Do something when page reach bottom.
  },
  //封装函数 获取豆瓣数据
  getDoubanData: function (id,resolve) {
    var itemApi = 'https://douban.uieee.com';
    var then = this;
    const path = 'v2/movie/subject/'+id;
    app.douban(itemApi, path, {})
      .then(res => {
        //获取评分的星星个数
        let starCount = Math.round(res.data.rating.average/2);
        res.data.rating.starCount=starCount;
        //获取评分一星二星三星四星五星的数量
        let detailsArr = [];
        let details = res.data.rating.details;
        let allCount = 0;
        //计算总的评分人数
        for(let key in details){
          allCount+=details[key];
        }
        //将percent添加到detailsArr
        for(let key in details){
          let percent = Math.round((details[key]/allCount)*100);
          detailsArr.push(percent);
        }
        detailsArr.reverse();
        res.data.rating.allCount=allCount;
        res.data.rating.detailsArr=detailsArr;
        resolve(res);
      })
      .catch(err => {
        console.log(err)
      })
  },
  //封装获取数据成功后的业务处理
  getItemData:function(res){
    let then = this;
    let comArr = res.data.popular_comments;
    console.log(comArr)
    then.setData({comArr:comArr})
    then.setData({itemData:res.data})
  },
    //封装上拉加载更多短评
    getItemDataMore:function(res){
      let then = this;
      let comArr = then.data.comArr;
      comArr=comArr.concat(res.data.popular_comments);
      then.setData({comArr:comArr})
      then.setData({itemData:res.data})
    },
  //展开简介
  unfoldSum:function(){
    let isUnfold = !this.data.isUnfold;
    this.setData({isUnfold:isUnfold});
  },
  //是否显示想看和看过展开栏
  fold:function(){
    let isFoldSee = !this.data.isFoldSee;
    this.setData({isFoldSee:isFoldSee});
  },
  //tab切换想看和看过
  changeTab:function(e){
    console.log( e.currentTarget)
    let id = e.currentTarget.dataset.id;
    this.setData({isFoldSeeTxt:id});
    this.setData({isFoldSee:false});
    this.getDoubanData(this.data.id,this.getItemData);
  }
})
