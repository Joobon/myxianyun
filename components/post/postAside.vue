<template>
  <div>
    <div class="navs" @mouseleave="hide()">
      <div
        class="nav_item"
        v-for="(item,index) in navList"
        :key="index"
        @mouseenter="show(index)"
        :class="{iii:(showIndex===index)}"
      >
        <span>{{item.type}}</span>
        <i class="el-icon-arrow-right"></i>
      </div>
      <div
        v-for="(item,index) in navList"
        :key="'item_main1-'+index"
        class="item_main1"
        v-show="showIndex===index"
      >
        <ul class="item_main2">
          <li v-for="(item1,index) in item.children" :key="index">
            <a>
              <i>{{index+1}}</i>
              <strong>{{item1.city}}</strong>
              <span>{{item1.desc}}</span>
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div class="tcity">
      <h4>推荐城市</h4>
      <a href="#">
        <img src="../../assets/20191014_IMG_8092.jpg" alt />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navList: [],
      showIndex: ""
    };
  },
  methods: {
    show(index) {
      this.showIndex = index;
    },
    hide() {
      this.showIndex = "";
    }
  },
  mounted() {
    this.$axios({
      url: "/posts/cities"
    }).then(res => {
      console.log(res);
      this.navList = res.data.data;
    });
  }
};
</script>

<style lang='less' scoped>

.navs {
  width: 260px;
  position: relative;
  border-top: 1px solid #ddd;
  border-left: 1px solid #ddd;

  .nav_item {
    display: flex;
    z-index: 9;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #ddd;
    border-right: 1px solid #ddd;
    padding: 0 10px 0 20px;
    font-size: 14px;
    .el-icon-arrow-right {
      font-size: 20px;
      color: #ddd;
    }
  }
  .iii{
  border-right: 1px solid #fff;
  color:orange;
  }
  .item_main1 {
    position: absolute;
    top: -1px;
    left: 259px;
    z-index: 1;

    .item_main2 {
      background-color: #fff;
      box-sizing: border-box;
      width: 350px;
      border: 1px solid #ddd;
      li {
        padding: 5px 20px;
        a {
          display: flex;
          align-items: center;
          font-size: 14px;
          color: #999;
          i {
            color: orange;
            font-size: 24px;
          }
          span:hover {
            text-decoration: underline;
          }
          strong:hover {
            text-decoration: underline;
          }
          strong {
            margin: 0 10px;
            color: orange;
            font-weight: 400;
          }
        }
      }
    }
  }
}
  .tcity {
    width: 260px  ;
    margin-top: 20px;
    img {
      width: 100%;
      height: 160px;
    }
  }

</style>