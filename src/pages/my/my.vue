<script setup lang="ts">
import { useMemberStore } from '@/stores'
import { http } from '@/utils/http'

const memberStore = useMemberStore()
const getData = async () => {
  const res = await http<string[]>({
    url: '/member/profile',
    method: 'GET',
    header:{},
  })
  console.log(res, 'res')
}
</script>

<template>
  <view class="my">
    <view>会员信息：{{ memberStore.profile }}</view>
    <button
      @tap="
        memberStore.setProfile({
          nickname: '黑马先锋',
          token: '123412'
        })
      "
      size="mini"
      plain
      type="primary"
    >
      保存用户信息
    </button>
    <button @tap="memberStore.clearProfile()" size="mini" plain type="warn">清理用户信息</button>
    <button class="mini-btn" type="primary" size="mini" @tap="getData()">接口测试</button>
  </view>
</template>

<style lang="scss">
//
</style>
