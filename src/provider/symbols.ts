import type { InjectionKey, Ref } from 'vue'

interface GGanttChartConfig {
  rowHeight: Ref<number>
  chartStart: Ref<string | Date>
  chartEnd: Ref<string | Date>
  dateFormat?: Ref<string | false>
  chartSize: {
    width: Ref<number>
    height: Ref<number>
  }
}

export const CONFIG_KEY = Symbol('CONFIG_KEY') as InjectionKey<GGanttChartConfig>
