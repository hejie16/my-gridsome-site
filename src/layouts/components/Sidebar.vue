<template>
  <div>
    <el-card shadow="never">
      <el-menu :default-active="active" @select="onSelect">
        <el-menu-item
          v-for="item in sideBarRouterMap"
          :key="item.path"
        >
          <i :class="item.meta.icon"></i>
          <g-link :to="item.redirect || item.path">
            {{ item.meta.title }}
          </g-link>
        </el-menu-item>
      </el-menu>
      <!-- <g-link v-for="item in sideBarRouterMap" :to="item.path">
        {{ item.meta.title }}
      </g-link> -->
    </el-card>

    <el-card shadow="never" style="margin-top: 20px; text-align: center">
      <div
        v-if="!token"
        style="font-size: 0.9rem; line-height: 1.5; color: #606c71"
      >
        <el-tag type="danger" size="small">&nbsp;</el-tag>&nbsp;&nbsp;
        Token未绑定&nbsp;&nbsp;
      </div>
      <div
        v-if="token"
        style="font-size: 0.9rem; line-height: 1.5; color: #303133"
      >
        <el-tag type="success" size="small">&nbsp;</el-tag>&nbsp;&nbsp;
        Token已绑定&nbsp;&nbsp;
        <el-button type="text" @click="cancellation">注销</el-button>
      </div>
      <div style="margin-top: 10px; text-align: left">
        <el-alert
          title="Token获取"
          type="info"
          description="在 github-> settings-> developerSettings-> personalAccessTokens 勾选gist权限,获取Token. 详情参考README.md"
          :closable="false"
        >
        </el-alert>
      </div>
    </el-card>
  </div>
</template>

<script>
const sideBarRouterMap = [
  {
    path: "/",
    meta: {
      type: "user",
      icon: "el-icon-star-off",
      title: "最新动态",
    },
    children: [
      {
        path: "main",
        meta: { title: "最新动态" },
      },
    ],
  },
  {
    path: "/social",
    redirect: "/social/main",
    meta: {
      type: "user",
      icon: "el-icon-mobile-phone",
      title: "社交圈",
    },
    children: [
      {
        path: "main",
        meta: { title: "社交圈" },
      },
      {
        path: "details/:name",
        meta: { title: "用户资料" },
      },
    ],
  },
  {
    path: "/blog",
    redirect: "/blog/main",
    meta: {
      type: "user",
      icon: "el-icon-edit-outline",
      title: "博客列表",
    },
    children: [
      {
        path: "main",
        meta: { title: "博客列表" },
      },
      {
        path: "add",
        meta: { title: "发表博客" },
      },
      {
        path: "edit/:id",
        meta: { title: "编辑博客" },
      },
      {
        path: "details/:id",
        meta: { title: "博客详情" },
      },
    ],
  },
  {
    path: "/project",
    redirect: "/project/main",
    meta: {
      type: "user",
      icon: "el-icon-service",
      title: "开源项目",
    },
    children: [
      {
        path: "main",
        meta: { title: "项目列表" },
      },
      {
        path: "details/:name",
        meta: { title: "项目详情" },
      },
    ],
  },
  {
    path: "/helper",
    redirect: "/helper/main",
    meta: {
      type: "user",
      icon: "el-icon-printer",
      title: "使用帮助",
      mini: true,
    },
    children: [
      {
        path: "main",
        meta: { title: "使用帮助" },
      },
    ],
  },
  {
    path: "/readme",
    redirect: "/readme/main",
    meta: {
      type: "user",
      icon: "el-icon-document",
      title: "README.md",
    },
    children: [
      {
        path: "main",
        meta: { title: "README.md" },
      },
    ],
  },
  {
    path: "/configure",
    redirect: "/configure/main",
    meta: {
      type: "user",
      icon: "el-icon-setting",
      title: "系统配置",
      LoginRequired: true,
    },
    children: [
      {
        path: "main",
        meta: { title: "系统配置" },
      },
    ],
  },
];

export default {
  name: "Sidebar",
  data() {
    return {
      token: "",
      active: "",
      sideBarRouterMap,
      mini: false,
    };
  },
  methods: {
    onSelect() {},
  },
};
</script>

<style>
</style>