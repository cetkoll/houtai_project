<template>
  <div>
    <el-button
      type="primary"
      size="mini"
      @click="myAddAttr"
      :disabled="attrId === ''"
      >添加{{ activeName === "first" ? "参数" : "属性" }}</el-button
    >
    <el-table style="margin-top: 10px" :data="cateList" border stripe>
      <el-table-column type="expand" v-slot="scope">
        <el-tag
          :key="index"
          v-for="(tag, index) in scope.row.attr"
          closable
          :disable-transitions="false"
          @close="handleClose(tag, scope.row)"
        >
          {{ tag }}
        </el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm(scope.row)"
          @blur="handleInputConfirm(scope.row)"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput"
          >+ New Tag</el-button
        >
      </el-table-column>
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column prop="attr_name" label="分类名称"></el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button type="primary" size="mini" @click="change(scope.row)"
            ><i class="el-icon-edit"></i>编辑</el-button
          >
          <el-button type="danger" size="mini" @click="delAttr(scope.row)"
            ><i class="el-icon-delete"></i>删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="
        (flag ? '添加' : '修改') +
        (activeName === 'first' ? '动态参数' : '静态属性')
      "
      :visible.sync="addVisible"
      width="50%"
    >
      <el-form label-width="120px" :model="addForm" :rules="rules" ref="myAdd">
        <el-form-item
          prop="attr_name"
          :label="activeName === 'first' ? '动态参数名称' : '静态属性名称'"
        >
          <el-input v-model="addForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="addClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { updataAttr, addAttr, delAttr } from '@/api/goods'
export default {
  props: {
    activeName: {
      type: String,
      requried: true
    },
    cateList: {
      type: Array,
      requried: true
    },
    attrId: { // 三级参数的id
      type: [Number, String],
      default: ''
    }
  },
  created () {
  },
  data () {
    return {
      flag: true, //! 用于判断是新增还是修改
      addVisible: false,
      inputVisible: false, //! input显示隐藏
      inputValue: '', //! 添加时的input值
      updataAdd: { //! 更新参数tags
        attr_name: '',
        attr_sel: '',
        attr_vals: ''
      },
      addForm: { //! 添加/删除/修改table参数
        attr_name: '',
        attr_sel: ''
      },
      rules: {
        attr_name: [
          { required: true, message: '名称不能为空', trigger: 'blur' },
          { min: 2, max: 7, message: '长度在2-7之间', trigger: 'blur' }
        ]
      },
      changeattr: { //! 获取table当前行的分类id和参数id
        id: 0,
        attr: 0
      }
    }
  },
  methods: {
    //! 删除参数
    async handleClose (tag, row) {
      row.attr.splice(row.attr.indexOf(tag), 1)
      this.updataAdd.attr_name = row.attr_name
      this.updataAdd.attr_vals = row.attr.join(' ')
      this.updata(row.cat_id, row.attr_id, this.updataAdd)
    },
    //! 显示input框
    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    //! 添加按钮
    myAddAttr () {
      this.addVisible = true
      this.flag = true
      this.addForm.attr_name = ''
    },
    //! 添加参数tags
    handleInputConfirm (row) {
      const inputValue = this.inputValue
      if (inputValue) {
        row.attr.push(inputValue)
        this.updataAdd.attr_name = row.attr_name
        this.updataAdd.attr_vals = row.attr.join(' ')
        console.log(this.updataAdd)
        this.updata(row.cat_id, row.attr_id, this.updataAdd)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    //! 更新参数请求
    async updata (id, attrId) {
      if (this.activeName === 'first') {
        this.updataAdd.attr_sel = 'many'
      } else {
        this.updataAdd.attr_sel = 'only'
      }
      await updataAttr({ id: id, attrId: attrId, data: this.updataAdd })
    },
    //! 弹出框的确认按钮
    addClick () {
      this.$refs.myAdd.validate(async (value) => {
        if (value) {
          if (this.activeName === 'first') {
            this.addForm.attr_sel = 'many'
          } else {
            this.addForm.attr_sel = 'only'
          }
          if (this.flag) {
            await addAttr(this.attrId, this.addForm)
          } else {
            await updataAttr({ id: this.changeattr.id, attrId: this.changeattr.attr, data: this.addForm })
          }
          this.$emit('changeTable')
        } else {
          console.log(222)
        }
      })
      this.addVisible = false
    },
    //! 编辑按钮
    change (row) {
      this.flag = false
      this.addForm.attr_name = row.attr_name
      this.addVisible = true
      this.changeattr.id = row.cat_id
      this.changeattr.attr = row.attr_id
    },
    //! 删除
    delAttr (row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await delAttr(row.cat_id, row.attr_id)
        console.log(res)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.$emit('changeTable')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
