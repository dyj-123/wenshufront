<template>
<div>

</div>
</template>

<script>
import {login} from "../api/api";

export default {
  name: "Login",
  methods:{
    async handleOnClickLogin(code,url){
      var formdata = new FormData();
      formdata.append("code",code);
      formdata.append("url",url);
      var data = (await(login(formdata))).data;
      if(data.status ===200){//登陆成功
        localStorage.setItem("token", data.data.token);
        // localStorage.setItem("identity", res.data.data.identity);
        // localStorage.setItem("identity2", JSON.stringify(this.identity));
        localStorage.setItem("collegeId", data.data.collegeId);
        localStorage.setItem("collegeName", data.data.collegeName);
        localStorage.setItem("username", data.data.name);

      } else {
        sessionStorage.clear();
        localStorage.clear();
        this.$Notice.warning({ title: "请检查工号或密码是否正确" });
      }


    }
  },
  mounted() {

    let token = localStorage.getItem("token");
    let logout = localStorage.getItem("logout");
    if (token) {
      this.handleOnClickLogin("", "");
    } else if (logout == "comfirm") {
      localStorage.removeItem("logout");
      window.location.href =
          "https://oauth.shu.edu.cn/oauth/logout?retUrl=" + window.location.href;
    } else {
      let code = this.$route.query.code;
      console.log(code)
      if (code) {


        this.handleOnClickLogin(code, document.location.href.split("?")[0]);
      } else {
        // 请求code
        document.location.href =
            "https://oauth.shu.edu.cn/oauth/authorize?response_type=code&client_id=Tp8uecHJi00aHlpufk8Fqp2A_2zpaKzS" +
            "&redirect_uri=http://127.0.0.1:8081/login" +
            "&scope=1";
      }
    }
  }
}


</script>

<style scoped>

</style>