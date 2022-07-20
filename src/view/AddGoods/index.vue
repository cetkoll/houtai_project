<template>
  <div>
    <Breadcrumb :pathList="$route.matched"></Breadcrumb>
    <el-card>
      <div class="btn"><i class="el-icon-info"></i> 添加商品信息</div>
      <el-steps align-center finish-status="success" :active="active">
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>

      <el-tabs :tab-position="tabPosition">
        <el-tab-pane>
          <template #label>
            <span @click="actZero">基本信息</span>
          </template>
          <el-form :model="addData" :rules="rules" ref="myGoods">
            <el-form-item prop="goods_name" label="商品名称">
              <el-input v-model="addData.goods_name"></el-input>
            </el-form-item>
            <el-form-item prop="goods_price" label="商品价格">
              <el-input v-model="addData.goods_price" type="number"></el-input>
            </el-form-item>
            <el-form-item prop="goods_weight" label="商品重量">
              <el-input v-model="addData.goods_weight" type="number"></el-input>
            </el-form-item>
            <el-form-item prop="goods_number" label="商品数量">
              <el-input v-model="addData.goods_number" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品数量">
              <el-cascader
                v-model="value"
                :options="categoriesList"
                :props="{
                  expandTrigger: 'hover',
                  label: 'cat_name',
                  value: 'cat_id',
                }"
                @change="handleChange"
              ></el-cascader>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane>
          <template #label>
            <span @click="actOne">商品参数</span>
          </template>
          <div style="margin-bottom: 20px">
            <div
              style="margin-bottom: 20px"
              v-for="(item, index) in cateList"
              :key="index"
            >
              <div style="margin-bottom: 20px">{{ item.attr_name }}</div>
              <el-checkbox-group v-model="item.attr_vals">
                <el-checkbox
                  :label="item1"
                  v-for="(item1, index1) in item.attr_vals"
                  :key="index1"
                  border
                  @change="onChecked(item, index)"
                ></el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane>
          <template #label>
            <span @click="actTwo">商品属性</span>
          </template>
          <div>
            <div
              style="margin-bottom: 20px"
              v-for="(item, index) in arrList"
              :key="index"
            >
              <div style="margin-bottom: 20px">{{ item.attr_name }}</div>
              <el-input v-model="item.attr_vals"></el-input>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane>
          <template #label>
            <span @click="active = 3">商品图片</span>
          </template>
          <!-- 图片上传 -->
          <el-upload
            class="upload-demo"
            action="http://liufusong.top:8899/api/private/v1/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
          <el-dialog :visible.sync="updataPictrue">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-tab-pane>
        <el-tab-pane>
          <template #label>
            <span @click="active = 4">商品内容</span>
          </template>
          <QuillText
            @input="description($event)"
            style="margin-bottom: 20px"
          ></QuillText>
          <el-button type="success" @click="addGood">添加商品</el-button>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
import QuillText from './components//QuillText'
import { getCategories, cateList, addGoods } from '@/api/goods'
export default {
  created () {
    this.getCategories()
  },
  data () {
    return {
      arrList: [], //! 商品属性
      fileList: [], //! 图片上传
      dialogImageUrl: '', //! 图片预览的地址
      updataPictrue: false, //! 图片预览弹出层
      tabPosition: 'left', //! 忘了是啥
      active: 0, //! 进度条
      attrs: {},
      addData: {
        attrs: [], //! 商品参数
        pics: [], //! 图片路径
        goods_introduce: '', //! 介绍
        goods_weight: 0, //! 重量
        goods_number: 0, //! 数量
        goods_price: 0, //! 价格
        goods_cat: '', //! 以，分割的分类列表
        goods_name: '' //! 商品名称
      },
      rules: {
        goods_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在2-8之间', trigger: 'blur' }
        ],
        goods_price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' }
        ],
        goods_number: [
          { required: true, message: '请输入商品数量', trigger: 'blur' }
        ],
        goods_weight: [
          { required: true, message: '请输入商品重量', trigger: 'blur' }
        ]
      },
      categoriesList: [],
      value: [],
      cateId: 6,
      cateList: [],
      cateFlag: true
    }
  },
  methods: {
    async getCategories () {
      try {
        const res = await getCategories()
        this.categoriesList = res.data.data
      } catch (error) {
        console.log(error)
      }
    },
    handleChange (value) {
      this.cateId = value[0]
      this.addData.goods_cat = value.join(',')
      console.log(this.addData.goods_cat)
    },
    //! 基本信息
    actZero () {
      this.active = 0
      this.getCategories()
    },
    //! 商品参数
    async actOne () {
      this.active = 1
      try {
        const res = await cateList(this.cateId, 'many')
        res.data.data.forEach(item => {
          const obj = {
            attr_id: item.attr_id,
            attr_value: item.attr_vals
          }
          // attr参数
          this.addData.attrs.push(obj)
          item.attr_vals = item.attr_vals.split(' ')
          this.cateList.push(item)
        })
        console.log(this.addData.attrs)
      } catch (error) {
        console.log(error)
      }
    },
    //! 商品属性
    async actTwo () {
      this.active = 2
      try {
        const res = await cateList(this.cateId, 'only')
        this.arrList = res.data.data
      } catch (error) {
        console.log(error)
      }
    },
    //! 上传图片
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
      this.dialogImageUrl = file.url
      this.updataPictrue = true
    },
    onChecked (item, index) {
      console.log(item, index)
      this.addData.attrs[index].attr_value = item.attr_vals.join(' ')
      console.log(this.addData.attrs)
    },
    description (value) {
      this.addData.goods_introduce = value.ops[0].insert
      console.log(this.addData.goods_introduce)
    },
    addGood () {
      const list = []
      this.arrList.forEach(item => {
        const obj = {
          attr_id: item.attr_id,
          attr_value: item.attr_vals
        }
        list.push(obj)
      })
      this.addData.attrs.push(...list)
      this.$refs.myGoods.validate(async (value) => {
        if (value) {
          try {
            await addGoods(this.addData)
            this.$message.success('创建商品成功')
            this.$router.back()
          } catch (error) {
            this.$message.error('创建失败')
          }
        } else {
          this.$message.error('必选项不能为空')
        }
      })
    }
  },
  computed: {},
  watch: {
    value () {
      if (this.value.length === 0) {
        this.cateId = 6
      }
    }
  },
  filters: {},
  components: { Breadcrumb, QuillText }
}
</script>

<style scoped lang='less'>
.btn {
  width: 100%;
  background-color: #f4f4f5;
  color: #909399;
  height: 42px;
  text-align: center;
  line-height: 42px;
  border-radius: 3px;
  font-size: 14px;
  margin-bottom: 20px;
}
.el-steps {
  margin-bottom: 20px;
}
::v-deep .el-step__title {
  font-size: 14px;
}
</style>
