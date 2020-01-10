<template>
  <div>
    <div class="search">
      <input type="text" placeholder="请输入想去的地方，比如：'广州'" v-model="city" />
      <i class="el-icon-search" @click="Go"></i>
    </div>
    <div class="tuijian">
      推荐：
      <span @click="GG(item)" v-for="(item,index) in cityArr" :key="index">{{item}}</span>
      &nbsp;
    </div>
    <div class="gonglue">
      <h4>推荐攻略</h4>
      <span></span>
      <el-button type="primary" @click="$router.push({path:'post/travel'})">
        <i class="el-icon-edit"></i>&nbsp;&nbsp;&nbsp;写游记
      </el-button>
    </div>
    <div class="kuai">
      <div v-for="(post,index) in dataList" :key="index">
        <div v-if="post.images.length>=3" class="main1">
          <div class="jieshao">
            <h4>
              <a href="#">{{post.title}}</a>
            </h4>
            <a href>
              <p v-html="post.summary"></p>
            </a>
          </div>
          <a href class="imgs">
            <img :src="item" v-for="(item,index) in post.images.slice(0,3)" :key="index" alt />
          </a>
          <div class="foot">
            <div class="left">
              <span>
                <i class="el-icon-location-outline"></i>
                {{post.cityName}}&nbsp;by&nbsp;
              </span>
              <div class="user">
                <a href="#">
                  <img :src="`${$axios.defaults.baseURL}${post.account.defaultAvatar}`" alt />
                </a>
                <a href>{{post.account.nickname}}</a>
              </div>
              <i class="el-icon-view">{{post.watch}}</i>
            </div>
            <div class="right">
              <span>{{post.like===null?0:post.like}}赞</span>
            </div>
          </div>
        </div>
        <div v-if="post.images.length<=2 && post.images.length>0" class="main2">
          <a href="#" class="imgs">
            <img :src="item" v-for="(item,index) in post.images.slice(0,1)" :key="index" alt />
          </a>
          <div class="jieshao">
            <h4>
              <a href>{{post.title}}</a>
            </h4>
            <a href="#">
              <p v-html="post.summary"></p>
            </a>
            <div class="foot">
              <div class="left">
                <span>
                  <i class="el-icon-location-outline"></i>
                  {{post.cityName}}&nbsp;by&nbsp;
                </span>
                <div class="user">
                  <a href="#">
                    <img :src="`${$axios.defaults.baseURL}${post.account.defaultAvatar}`" alt />
                  </a>
                  <a href>{{post.account.nickname}}</a>
                </div>
                <i class="el-icon-view">{{post.watch}}</i>
              </div>
              <div class="right">
                <span>{{post.like===null?0:post.like}}赞</span>
              </div>
            </div>
          </div>
        </div>
        <div v-if="post.images.length===0" class="main3">
          <div class="jieshao">
            <h4>
              <a href>"{{post.title}}"</a>
            </h4>
            <a href="#">
               <p v-html="post.summary"></p>
            </a>
            <div class="foot">
              <div class="left">
                <span>
                  <i class="el-icon-location-outline"></i>
                  {{post.cityName}}&nbsp;by&nbsp;
                </span>
                <div class="user">
                  <a href="#">
                    <img :src="`${$axios.defaults.baseURL}${post.account.defaultAvatar}`" alt />
                  </a>
                  <a href>{{post.account.nickname}}</a>
                </div>
                <i class="el-icon-view">{{post.watch}}</i>
              </div>
              <div class="right">
                <span>{{post.like===null?0:post.like}}赞</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-sizes="[2, 4, 6, 8]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cityArr: ["广州", "上海", "北京"],
      city: null,
      postList: [],
      // 当前页
      pageIndex: 1,
      // 每页加载量
      pageSize: 2,
      //  总数
      total: 0
    };
  },
  computed: {
    dataList() {
      return this.postList.slice(
        this.$route.query._start,
        this.$route.query._limit
      );
    }
  },
  methods: {
    GG(item) {
      this.city = item;
      this.getData();
    },
    Go() {
      if (this.city === "") {
        this.getData2()
      } else {
        this.getData();
      }
    },
    getData() {
      this.$axios({
        url: "/posts",
        params: {
          _start: (this.pageIndex - 1) * this.pageSize,
          _limit: this.pageSize,
          city: this.city
        }
      }).then(res => {
        // console.log(res)
        this.postList = res.data.data;
        this.total = res.data.total;
      });
    },
    getData2() {
      this.$axios({
        url: "/posts",
        params: {
          _start: (this.pageIndex - 1) * this.pageSize,
          _limit: this.pageSize
        }
      }).then(res => {
        this.postList = res.data.data;
        this.total = res.data.total;
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.handleCurrentChange(1)
      console.log(this.dataList);
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      if (this.city === "") {
       this.getData2()
      } else {
        this.getData();
      }
    }
  },
  //监听路由参数，跳转城市
  watch: {
    $route() {
      this.city = this.$route.query.city;
      this.handleCurrentChange(1);
    }
  },
  mounted() {
    if (this.$route.query.city !== null) {
      this.city = this.$route.query.city;
      this.getData();
    } else {
      this.getData();
    }
  }
};
</script>

<style lang="less" scoped>
.search {
  border: 3px solid orange;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  line-height: 40px;
  box-sizing: border-box;
  input {
    padding: 0 20px;
    width: 100%;
    height: 100%;
    outline: none;
    border: none;
  }
  i {
    color: orange;
    font-size: 24px;
    line-height: 40px;
    font-weight: 700;
    margin-right: 10px;
  }
}
.tuijian {
  padding: 10px 0;
  font-size: 12px;
  color: #666;
  span {
    margin-right: 5px;
  }
  span:hover {
    color: orange;
    text-decoration: underline;
    cursor: pointer;
  }
}
.gonglue {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
  position: relative;
  span {
    display: block;
    width: 70px;
    border-bottom: 2px solid orange;
    position: absolute;
    left: 0;
    bottom: 0;
  }
  h4 {
    font-weight: 400;
    font-size: 18px;
    color: orange;
  }
}
.main1 {
  padding: 20px 0;
  border-bottom: 1px solid #ddd;
  .jieshao {
    h4 {
      font-size: 18px;
      font-weight: 400;
      a {
        color: #000;
      }
      a:hover {
        color: orange;
      }
    }
    p {
      color: #666;
      font-size: 14px;
      margin-top: 10px;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }
  .imgs {
    margin: 10px 0;
    display: flex;
    justify-content: space-around;
    img {
      width: 33.33%;
      height: 160px;
    }
  }
  .foot {
    display: flex;
    justify-content: space-between;
    .left {
      display: flex;
      align-items: center;
      font-size: 12px;
      color: #999;
      .user {
        display: flex;
        align-items: center;
        margin-right: 10px;
        a {
          color: orange;
          img {
            margin: 0 5px;
            width: 16px;
            height: 16px;
            border-radius: 50px;
          }
        }
      }
    }
    .right {
      font-size: 16px;
      word-spacing: 1px;
      color: orange;
    }
  }
}
.main2 {
  padding: 20px 0;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  .jieshao {
    h4 {
      font-size: 18px;
      font-weight: 400;
      a {
        color: #000;
      }
      a:hover {
        color: orange;
      }
    }
    p {
      color: #666;
      font-size: 14px;
      margin-top: 10px;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .foot {
      display: flex;
      justify-content: space-between;
      margin-top: 30px;
      .left {
        display: flex;
        align-items: center;
        font-size: 12px;
        color: #999;
        .user {
          display: flex;
          align-items: center;
          margin-right: 10px;
          a {
            color: orange;
            img {
              margin: 0 5px;
              width: 16px;
              height: 16px;
              border-radius: 50px;
            }
          }
        }
      }
      .right {
        font-size: 16px;
        word-spacing: 1px;
        color: orange;
      }
    }
  }
  .imgs {
    margin-right: 10px;
    img {
      width: 200px;
      height: 160px;
    }
  }
}
.main3 {
  padding: 20px 0;
  border-bottom: 1px solid #ddd;
  .jieshao {
    h4 {
      font-size: 18px;
      font-weight: 400;
      a {
        color: #000;
      }
      a:hover {
        color: orange;
      }
    }
    p {
      color: #666;
      font-size: 14px;
      margin-top: 10px;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .foot {
      display: flex;
      justify-content: space-between;
      margin-top: 30px;
      .left {
        display: flex;
        align-items: center;
        font-size: 12px;
        color: #999;
        .user {
          display: flex;
          align-items: center;
          margin-right: 10px;
          a {
            color: orange;
            img {
              margin: 0 5px;
              width: 16px;
              height: 16px;
              border-radius: 50px;
            }
          }
        }
      }
      .right {
        font-size: 16px;
        word-spacing: 1px;
        color: orange;
      }
    }
  }
}
.el-pagination {
  margin: 20px 0;
}
</style>