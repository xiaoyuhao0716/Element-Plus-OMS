<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 基础表格
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <div>
          <el-input
            v-model="query.name"
            placeholder="用户名"
            class="handle-input mr10"
          ></el-input>
          <el-button type="primary" :icon="Search" @click="handleSearch"
            >搜索</el-button
          >
        </div>

        <el-button type="primary" :icon="Plus" @click="handleAdd"
          >添加</el-button
        >
      </div>
      <el-table
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
      >
        <el-table-column
          prop="id"
          label="ID"
          width="100"
          align="center"
        ></el-table-column>
        <el-table-column prop="name" label="用户名"></el-table-column>
        <el-table-column label="账户余额">
          <template #default="scope">￥{{ scope.row.money }}</template>
        </el-table-column>
        <el-table-column label="头像(查看大图)" align="center">
          <template #default="scope">
            <el-image
              class="table-td-thumb"
              :src="scope.row.thumb"
              :preview-src-list="[scope.row.thumb]"
            >
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <!-- <el-table-column prop="date" label="注册时间"></el-table-column> -->
        <el-table-column label="操作" width="180" align="center">
          <template #default="scope">
            <el-button
              v-has="'user-edit'"
              :icon="Edit"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑
            </el-button>
            <el-button
              class="red"
              v-has="'user-del'"
              :icon="Delete"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          layout="total, prev, pager, next"
          :current-page="query.pageIndex"
          :page-size="query.pageSize"
          :total="pageTotal"
          @current-change="handlePageChange"
        ></el-pagination>
      </div>
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog title="编辑" v-model="editVisible" width="30%">
      <el-form label-width="70px">
        <el-form-item label="用户名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveEdit">确 定</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 添加弹出框 -->
    <el-dialog title="添加" v-model="addEditVisible" width="30%">
      <el-form label-width="70px">
        <el-form-item label="用户名">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="addForm.address"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addEditVisible = false">取 消</el-button>
          <el-button type="primary" @click="addEdit">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { apiTable } from "../apis/index.js";

import { Delete, Edit, Search, Plus } from "@element-plus/icons-vue";

export default {
  name: "basetable",

  setup() {
    const query = reactive({
      address: "",
      name: "",
      pageIndex: 1,
      pageSize: 10,
    });
    const tableData = ref([]);
    const pageTotal = ref(0);
    // 获取表格数据
    const getData = () => {
      apiTable(query).then((res) => {
        tableData.value = res.data;
        pageTotal.value = res.pageTotal || 50;
      });
    };
    getData();

    //添加
    const handleAdd = () => {
      addEditVisible.value = true;
      query.pageIndex = 1;
      getData();
    };

    // 查询操作
    const handleSearch = () => {
      query.pageIndex = 1;
      getData();
    };
    // 分页导航
    const handlePageChange = (val) => {
      query.pageIndex = val;
      getData();
    };

    // 删除操作
    const handleDelete = (index) => {
      // 二次确认删除
      ElMessageBox.confirm("确定要删除吗？", "提示", {
        type: "warning",
      })
        .then(() => {
          ElMessage.success("删除成功");
          tableData.value.splice(index, 1);
        })
        .catch(() => {});
    };

    // 表格编辑时弹窗和保存
    const editVisible = ref(false);
    let form = reactive({
      name: "",
      address: "",
    });
    let idx = -1;
    const handleEdit = (index, row) => {
      idx = index;
      Object.keys(form).forEach((item) => {
        console.log(item, row[item]);
        form[item] = row[item];
      });
      editVisible.value = true;
    };
    const saveEdit = () => {
      editVisible.value = false;
      ElMessage.success(`修改第 ${idx + 1} 行成功`);
      Object.keys(form).forEach((item) => {
        tableData.value[idx][item] = form[item];
      });
    };

    // 表格添加时弹窗和保存
    const addEditVisible = ref(false);
    let addForm = reactive({
      name: "",
      address: "",
    });

    const addEdit = () => {
      addEditVisible.value = false;
      ElMessage.success(`添加${addForm.name}成功`);
      Object.assign(addForm, { name: "", address: "" });

      // Object.keys(form).forEach((item) => {
      //   tableData.value[idx][item] = form[item];
      // });
    };

    return {
      query,
      tableData,
      pageTotal,
      editVisible,
      form,
      handleSearch,
      handleAdd,
      handlePageChange,
      handleDelete,
      handleEdit,
      saveEdit,
      addForm,
      addEditVisible,
      addEdit,
      Delete,
      Edit,
      Search,
      Plus,
    };
  },
};
</script>

<style scoped>
.handle-box {
  display: flex;
  margin-bottom: 20px;
  justify-content: space-between;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
.mr10 {
  margin-right: 10px;
}
.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}
</style>
