<template>
    <div class="example-form">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
            <el-breadcrumb-item>示例表单</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="ct-page">
            <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="example-form__form">
                <el-form-item label="名称" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="封面">
                    <el-upload
                        class="example-form__uploader"
                        :show-file-list="false"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-success="handleUploadSuccess"
                        :before-upload="beforeUpload">
                        <img v-if="form.imageUrl" :src="form.imageUrl" class="uploader-img">
                        <i v-else class="el-icon-plus example-form__uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="类型" prop="type">
                    <el-select v-model="form.type" placeholder="请选择">
                        <el-option label="日常体能训练" value="1"></el-option>
                        <el-option label="放松练习" value="2"></el-option>
                        <el-option label="单项康复练习" value="5"></el-option>
                        <el-option label="核心力量训练" value="6"></el-option>
                        <el-option label="测试一个新的训练吧" value="8"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="子分类">
                    <el-select v-model="form.subType" placeholder="请选择">
                        <el-option label="无子分类" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="说明">
                    <el-input
                        type="textarea"
                        :autosize="{ minRows: 2, maxRows: 6}"
                        placeholder="请输入内容"
                        v-model="form.summary">
                    </el-input>
                </el-form-item>
                <el-form-item label="时间" prop="time">
                    <el-input placeholder="请输入数字" v-model="form.time">
                        <template slot="append">秒</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="能量值">
                    <el-input v-model="form.energy" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('form')">提交表单</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'example-form',
    data () {
        return {
            form: {
                name: '',
                imageUrl: '',
                type: '',
                subType: '',
                summary: '',
                time: '',
                energy: ''
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: '请输入活动名称',
                        trigger: 'blur'
                    }
                ],
                type: [
                    {
                        required: true,
                        message: '请选择类型',
                        trigger: 'change'
                    }
                ]
            }
        };
    },
    methods: {
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // do something
                } else {
                    return false;
                }
            });
        },
        handleUploadSuccess (res, file) {
            this.form.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeUpload (file) {
            const isPic = file.type.indexOf('image') > -1;
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isPic) {
                this.$message.error('上传头像图片只能是 图片 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isPic && isLt2M;
        }
    }
};
</script>

<style lang="less">
.example-form {
    padding: 20px;
    .el-breadcrumb {
        margin-bottom: 20px;
    }
}
.example-form__form {
    width: 600px;
}
.example-form__uploader {
    .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .el-upload:hover {
        border-color: #20a0ff;
    }
    .uploader-img {
        width: 178px;
        height: 178px;
        display: block;
    }
}
.example-form__uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
</style>
