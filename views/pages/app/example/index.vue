<template>
    <div class="example">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>主页</el-breadcrumb-item>
            <el-breadcrumb-item>测试页面</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="ct-page">
            <el-form :inline="true" :model="form">
                <el-form-item label="某查询条件">
                    <el-select v-model="form.select" placeholder="请选择">
                        <el-option label="不限" value=""></el-option>
                        <el-option label="选择1" value="option1"></el-option>
                        <el-option label="选择2" value="option2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="updateTableData">查询</el-button>
                </el-form-item>

                <div class="example__btn">
                    <el-button type="primary" @click="$router.push('example-form')">添加一行元素</el-button>
                </div>
            </el-form>

            <div class="example__search">
                <el-input
                    placeholder="请输入搜索内容"
                    icon="search"
                    v-model="form.trainingSearch"
                    :on-icon-click="updateTableData('params')">
                </el-input>
            </div>

            <el-table
                :data="tableData"
                border
                style="width: 100%"
                :default-sort = "{prop: 'date', order: 'descending'}">
                <el-table-column
                    prop="date"
                    label="日期"
                    sortable
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="姓名"
                    sortable
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="地址">
                </el-table-column>
            </el-table>

            <el-pagination
                class="pagination"
                @size-change="updateTableData('paging')"
                @current-change="updateTableData('paging')"
                :current-page="paging.currentPage"
                :page-sizes="[10, 25, 50, 100]"
                :page-size="paging.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="paging.totalCount">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import api from './api.js';

export default {
    name: 'example',
    data () {
        return {
            form: {
                select: '', // 课程类型
                trainingState: '', // 课程状态
                trainingSearch: '' // 搜索内容
            },
            tableData: [
                {
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                },
                {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                },
                {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                },
                {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }
            ],
            // 分页信息
            paging: {
                currentPage: 4,
                pageSize: 10,
                totalCount: 200
            }
        };
    },
    methods: {
        updateTableData () {}
    },
    created () {
        api.getExampleData()
        .then((d) => {
            this.tableData = d;
        });
    }
};
</script>

<style lang="less">
.example {
    padding: 20px;
    .el-breadcrumb {
        margin-bottom: 20px;
    }
    .example__search {
        margin-bottom: 20px;
        text-align: right;
        .el-input {
            width: 300px;
        }
    }
    .el-table {
        margin-bottom: 20px;
    }
    .example__btn {
        float: right;
    }
}
</style>
