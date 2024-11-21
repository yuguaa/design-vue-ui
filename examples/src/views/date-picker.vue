<template>
  <div>
    <h2>区间不得超过一年</h2>
    <a-range-picker
      v-model="dateRange"
      :disabledDate="disabledDate"
      valueFormat="YYYY-MM-DD"
      :allowClear="false"
      @calendarChange="calendarChange"
      @openChange="dateFocus"
    >
      <a-icon slot="suffixIcon" type="schedule" />
    </a-range-picker>
    <h2>选择不超过七天的范围</h2>
    <a-range-picker
      v-model="dateRange1"
      :disabledDate="disabledDate1"
      valueFormat="YYYY-MM-DD"
      :allowClear="false"
      @calendarChange="calendarChange1"
      @openChange="dateFocus1"
    >
      <a-icon slot="suffixIcon" type="schedule" />
    </a-range-picker>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  data () {
    return {
      dateRange: [],
      dateRange1: [],
      tempDate: undefined,
      tempDate1: undefined
    }
  },
  methods: {
    // 禁用时间
    disabledDate (current) {
      const _tempDate = this.tempDate
      // 不得超过今天
      const exceedDay = current > moment().endOf('days')
      if (!_tempDate) return exceedDay
      // 区间不得超过一年
      const exceedYear =
        current < moment(_tempDate).subtract(1, 'years') ||
        current > moment(_tempDate).add(1, 'years')
      // return false
      // console.log(moment(current).format('YYYY-MM-DD'))
      return exceedDay || exceedYear
    },
    calendarChange (date) {
      this.tempDate = date[0]
    },
    dateFocus () {
      this.tempDate = undefined
    },
    // 禁用时间
    disabledDate1 (current) {
      const _tempDate = this.tempDate1
      // 不得超过今天
      const exceedDay = current > moment().endOf('days')
      if (!_tempDate) return exceedDay
      // 区间不得超过一年
      const exceed7Day =
        current < moment(_tempDate).subtract(7, 'days') ||
        current > moment(_tempDate).add(7, 'days')
      return exceedDay || exceed7Day
    },
    calendarChange1 (date) {
      console.log(date)
      this.tempDate1 = date[0]
    },
    dateFocus1 () {
      this.tempDate1 = undefined
    }
  }
}
</script>
