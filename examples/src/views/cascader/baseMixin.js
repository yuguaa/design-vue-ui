import jsonData from '../../json/region.json'
import allRegion from '../../json/allRegion.json'
import allRegionArr from '../../json/allRegionArr.json'
export default {
  data() {
    return {
      options: allRegion,
      form: {
        selectChildValue: [],
        selectValue: [],
        selectLabelInValue: [],
        selectChildLabelInValue: [],
      },
      childValue: [],
      parentValue: [],
      fieldNames: { label: 'name', value: 'code', children: 'areaList' }
    }
  },
  methods: {
    cascaderChange (v, childValue, parentValue) {
        console.log(v, childValue, parentValue)
        this.childValue = childValue
        this.parentValue = parentValue
    }
  }
}
